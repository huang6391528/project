const { spawn } = require('child_process');
const path = require('path');

const srcDir = path.join(process.cwd(), 'src');
const env = {
  ...process.env,
  UNI_INPUT_DIR: srcDir,
  VITE_ROOT_DIR: srcDir
};

const uniBin = path.join(process.cwd(), 'node_modules', '@dcloudio', 'vite-plugin-uni', 'bin', 'uni.js');
const args = ['build', '-p', 'mp-weixin'].concat(process.argv.slice(2));

const child = spawn(process.execPath, [uniBin].concat(args), {
  stdio: 'inherit',
  cwd: process.cwd(),
  env
});

child.on('exit', (code) => process.exit(code || 0));
child.on('error', (err) => { console.error(err); process.exit(1); });
