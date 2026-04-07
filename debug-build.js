const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const srcDir = path.join(process.cwd(), 'src');
const cliRoot = path.join(process.cwd(), 'node_modules/@dcloudio/vite-plugin-uni');

// Patch build.js to trace EVERYTHING about inlineConfig
const buildJsPath = path.join(cliRoot, 'dist/cli/build.js');
const originalBuild = fs.readFileSync(buildJsPath, 'utf8');
const patchedBuild = originalBuild.replace(
  'function buildByVite(inlineConfig) {',
  "function buildByVite(inlineConfig) { console.error('[TRACE] buildByVite called'); console.error('[TRACE] inlineConfig keys:', Object.keys(inlineConfig || {}).join(',')); console.error('[TRACE] inlineConfig.plugins:', inlineConfig && inlineConfig.plugins); console.error('[TRACE] typeof inlineConfig.plugins:', typeof (inlineConfig && inlineConfig.plugins)); "
);
fs.writeFileSync(buildJsPath, patchedBuild);
console.log('Patched build.js');

const env = { ...process.env, UNI_INPUT_DIR: srcDir, VITE_ROOT_DIR: srcDir, NODE_ENV: 'production' };
const uniBin = path.join(cliRoot, 'bin/uni.js');
const child = spawn(process.execPath, [uniBin, 'build', '-p', 'h5'], {
  cwd: process.cwd(),
  env,
  stdio: ['pipe', 'pipe', 'pipe']
});
let stderr = '';
child.stderr.on('data', (d) => { stderr += d.toString(); process.stderr.write(d); });
child.stdout.on('data', (d) => { process.stdout.write(d); });
child.on('close', (code) => {
  fs.writeFileSync(buildJsPath, originalBuild);
  console.log('Restored');
  const traceLines = stderr.split('\n').filter(l => l.includes('[TRACE]'));
  console.log('\n=== ALL TRACE LINES ===');
  traceLines.forEach(l => console.log(l));
  console.log('EXIT:', code);
});
