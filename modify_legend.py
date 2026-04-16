import re

file_path = r'd:\Cursor\Windows_projects\contest\src\pages\run\run.vue'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 找到校园跑Tab的图例部分，只保留马拉松训练
old = '''            <view class="calendar-legend">
              <view class="legend-item">
                <view class="legend-dot green"></view>
                <text class="legend-text">自由跑</text>
              </view>
              <view class="legend-item">
                <view class="legend-dot dark-green"></view>
                <text class="legend-text">晨跑</text>
              </view>
              <view class="legend-item">
                <view class="legend-dot purple-ring"></view>
                <text class="legend-text">马拉松训练</text>
              </view>
              <view class="legend-item">
                <view class="legend-dot future"></view>
                <text class="legend-text">未到/未打卡</text>
              </view>
            </view>'''

new = '''            <view class="calendar-legend">
              <view class="legend-item">
                <view class="legend-dot purple-ring"></view>
                <text class="legend-text">马拉松训练</text>
              </view>
            </view>'''

content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
