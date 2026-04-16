<template>
  <view class="page-low-carbon-main">
    <!-- 头部 -->
    <view class="lc-header">
      <view class="sport-back-btn" @tap="goBack">
        <text class="iconfont icon-chevron-left"></text>
      </view>
      <text class="lc-logo">Life<text class="lc-logo-accent">Eco</text></text>
      <text class="lc-date">{{ currentDate }}</text>
    </view>

    <!-- 中级标签页导航 -->
    <view class="lc-tabs-nav">
      <view 
        v-for="tab in tabs" 
        :key="tab.id"
        class="lc-tab-item"
        :class="{ 'lc-tab-active': currentTab === tab.id }"
        @tap="switchModule(tab.id)"
      >
        <text class="tab-label">{{ tab.label }}</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="lc-content-wrapper">
      <!-- 首页（生活）模块 -->
      <view v-if="currentTab === 'index'" class="lc-module">
        <view class="page-content">
          <!-- 低碳等级卡片 -->
          <view class="lc-asset-card life-asset">
            <view class="asset-inner">
              <view class="asset-left">
                <text class="asset-label">学习生活低碳等级</text>
                <text class="asset-value">LV.5</text>
                <text class="life-recycle-tag">已回收旧物约 24.5kg</text>
              </view>
            </view>
          </view>

          <!-- 子功能页签 -->
          <view class="life-tabs">
            <view class="life-tab" :class="{ 'life-tab-active': lifeSubTab === 'home' }" @click="goTab('home')">首页</view>
            <view class="life-tab" :class="{ 'life-tab-active': lifeSubTab === 'dorm' }" @click="goTab('dorm')">宿舍节能</view>
            <view class="life-tab" :class="{ 'life-tab-active': lifeSubTab === 'study' }" @click="goTab('study')">低碳学习</view>
          </view>

          <!-- 功能网格 -->
          <view v-if="lifeSubTab === 'home'" class="life-grid">
            <view class="life-card">
              <text class="iconfont icon-gift life-card-icon indigo"></text>
              <text class="life-card-name">旧物捐赠</text>
              <text class="life-card-desc">旧书/衣/家电上传</text>
              <button class="life-card-btn">去捐赠</button>
            </view>
            <view class="life-card">
              <text class="iconfont icon-shopping-bag life-card-icon emerald"></text>
              <text class="life-card-name">环保购物</text>
              <text class="life-card-desc">自带布袋/无包装</text>
              <button class="life-card-btn green-btn">打卡</button>
            </view>
            <view class="life-card">
              <text class="iconfont icon-flower life-card-icon green"></text>
              <text class="life-card-name">绿植养护</text>
              <text class="life-card-desc">碳吸附实时记录</text>
              <button class="life-card-btn green-btn">记录</button>
            </view>
            <view class="life-card">
              <text class="iconfont icon-book life-card-icon blue"></text>
              <text class="life-card-name">低碳学习</text>
              <text class="life-card-desc">无纸化/二手教材</text>
              <button class="life-card-btn blue-btn-sm">上传</button>
            </view>
            <!-- 宿舍节能看板（跨列） -->
            <view class="life-card life-card-dark">
              <view class="dark-inner">
                <text class="dark-title">宿舍节能看板</text>
                <view class="dark-tags">
                  <view class="dark-tag">
                    <text class="iconfont icon-temp"></text>
                    <text class="dark-tag-text">空调温控自律</text>
                  </view>
                  <view class="dark-tag">
                    <text class="iconfont icon-night"></text>
                    <text class="dark-tag-text">熄灯打卡</text>
                  </view>
                </view>
              </view>
              <button class="dark-btn">节能打卡</button>
            </view>
            <!-- 无塑日常（跨列） -->
            <view class="life-card life-card-wide">
              <view class="wide-icon-wrap">
                <text class="iconfont icon-no-plastic"></text>
              </view>
              <view class="wide-info">
                <text class="life-card-name">无塑日常</text>
                <text class="life-card-desc">拒绝一次性吸管、水杯记录</text>
              </view>
              <view class="wide-check"></view>
            </view>
          </view>

          <!-- 宿舍节能内容 -->
          <view v-else-if="lifeSubTab === 'dorm'" class="sub-content">
            <!-- 周能耗趋势 -->
            <view class="sub-card">
              <text class="sub-card-title">宿舍周能耗趋势</text>
              <view class="energy-chart">
                <view class="energy-bar-wrap" v-for="(item, i) in energyData" :key="i">
                  <view class="energy-bar" :style="{ height: item.h + 'rpx' }"></view>
                  <text class="energy-bar-label">{{ item.d }}</text>
                </view>
              </view>
            </view>
            <!-- 即时打卡 -->
            <text class="sub-section-title">即时打卡</text>
            <view class="dorm-checkin-grid">
              <view class="dorm-checkin-card">
                <text class="iconfont icon-lightning dorm-checkin-icon yellow-icon"></text>
                <text class="dorm-checkin-name">节约用电</text>
                <text class="dorm-checkin-desc">做到随手关灯</text>
                <button class="dorm-checkin-btn done-btn">打卡成功</button>
              </view>
              <view class="dorm-checkin-card">
                <text class="iconfont icon-water dorm-checkin-icon blue-icon"></text>
                <text class="dorm-checkin-name">节约用水</text>
                <text class="dorm-checkin-desc">缩短淋浴时间</text>
                <button class="dorm-checkin-btn todo-btn">去打卡</button>
              </view>
            </view>
            <!-- 监控列表 -->
            <view class="dorm-monitor-list">
              <view class="dorm-monitor-item">
                <text class="iconfont icon-temp dorm-monitor-icon emerald-icon"></text>
                <text class="dorm-monitor-name">空调温控 (当前 26℃)</text>
                <text class="iconfont icon-check-circle dorm-monitor-check emerald-icon"></text>
              </view>
              <view class="dorm-monitor-item">
                <text class="iconfont icon-night dorm-monitor-icon indigo-icon"></text>
                <text class="dorm-monitor-name">熄灯自律打卡</text>
                <text class="dorm-monitor-hint">23:00 后开启</text>
              </view>
            </view>
            <!-- 节能PK赛 -->
            <view class="dorm-pk-card">
              <text class="dorm-pk-title">节能寝室 PK 赛</text>
              <view class="dorm-pk-row">
                <view>
                  <text class="dorm-pk-hint">本楼栋排名</text>
                  <text class="dorm-pk-rank">No.12</text>
                </view>
                <button class="dorm-pk-btn">查看对比</button>
              </view>
            </view>
            <!-- 节能小妙招 -->
            <text class="sub-section-title">宿舍节能小妙招</text>
            <view class="dorm-tips">
              <view class="dorm-tip yellow-tip">
                <view class="tip-num yellow-num"><text>1</text></view>
                <text class="tip-text">拔掉不常用的电器插头，减少待机功耗。</text>
              </view>
              <view class="dorm-tip green-tip">
                <view class="tip-num green-num"><text>2</text></view>
                <text class="tip-text">利用宿舍阳台自然采光，减少白天开灯。</text>
              </view>
            </view>
          </view>

          <!-- 低碳学习内容 -->
          <view v-else-if="lifeSubTab === 'study'" class="sub-content">
            <!-- 无纸化成就 -->
            <view class="study-achieve-card">
              <text class="study-achieve-label">无纸化学习本学期省下</text>
              <view class="study-achieve-row">
                <text class="study-achieve-num">425</text>
                <text class="study-achieve-unit">张 A4 纸</text>
              </view>
              <text class="study-achieve-sub">相当于保护了 0.05 棵成年树木 🌳</text>
            </view>
            <!-- 分类打卡 -->
            <view class="study-grid">
              <view class="study-card">
                <view class="study-card-icon green-bg">
                  <text class="iconfont icon-tablet"></text>
                </view>
                <text class="study-card-name">无纸化笔记</text>
                <text class="study-card-desc">使用平板/电脑记录</text>
              </view>
              <view class="study-card">
                <view class="study-card-icon blue-bg">
                  <text class="iconfont icon-recycle"></text>
                </view>
                <text class="study-card-name">草稿纸回收</text>
                <text class="study-card-desc">废旧纸张定点回收</text>
              </view>
              <view class="study-card">
                <view class="study-card-icon purple-bg">
                  <text class="iconfont icon-share"></text>
                </view>
                <text class="study-card-name">电子共享</text>
                <text class="study-card-desc">云端传资料免打印</text>
              </view>
              <view class="study-card">
                <view class="study-card-icon amber-bg">
                  <text class="iconfont icon-book"></text>
                </view>
                <text class="study-card-name">二手教材</text>
                <text class="study-card-desc">学长学姐课本转借</text>
              </view>
            </view>
            <!-- 二手教材市场 -->
            <view class="study-market-header">
              <text class="sub-section-title" style="margin-bottom: 0;">二手教材市场</text>
              <view class="study-market-tags">
                <text class="market-tag-active">求购</text>
                <text class="market-tag">转让</text>
              </view>
            </view>
            <view class="study-book-list">
              <view class="study-book-item">
                <view class="study-book-cover">
                  <text class="iconfont icon-book study-book-icon"></text>
                </view>
                <view class="study-book-info">
                  <text class="study-book-title">《高等数学（下）》</text>
                  <text class="study-book-meta">发布者：23级张同学 · 9成新</text>
                  <view class="study-book-footer">
                    <text class="study-book-price free">免费转借</text>
                    <button class="study-book-btn">联系他</button>
                  </view>
                </view>
              </view>
              <view class="study-book-item">
                <view class="study-book-cover">
                  <text class="iconfont icon-book study-book-icon"></text>
                </view>
                <view class="study-book-info">
                  <text class="study-book-title">《计算机组成原理》</text>
                  <text class="study-book-meta">发布者：王学姐 · 含有精美笔记</text>
                  <view class="study-book-footer">
                    <text class="study-book-price points">50 碳汇分</text>
                    <button class="study-book-btn">立即兑换</button>
                  </view>
                </view>
              </view>
            </view>
            <!-- 共享资料 -->
            <text class="sub-section-title">本周热门共享资料</text>
            <view class="study-file-list">
              <view class="study-file-item">
                <text class="iconfont icon-pdf study-file-icon red-icon"></text>
                <view class="study-file-info">
                  <text class="study-file-name">大学物理复习大纲.pdf</text>
                  <text class="study-file-meta">已省下 24 张纸 · 120人下载</text>
                </view>
                <text class="iconfont icon-download study-file-dl"></text>
              </view>
              <view class="study-file-item">
                <text class="iconfont icon-doc study-file-icon blue-icon"></text>
                <view class="study-file-info">
                  <text class="study-file-name">思修期末复习题库.docx</text>
                  <text class="study-file-meta">已省下 15 张纸 · 88人下载</text>
                </view>
                <text class="iconfont icon-download study-file-dl"></text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 运动模块 -->
      <view v-if="currentTab === 'sport'" class="lc-module">
        <view class="page-content">
          <view class="sport-sync-card">
            <view class="sync-left">
              <view class="sync-dot-wrap">
                <view class="sync-dot"></view>
                <text class="sync-label">STEP SYNC ACTIVE</text>
              </view>
              <text class="sync-value">8,432<span class="sync-unit">/10000</span></text>
              <text class="sync-desc">今日步数已同步 · 产出碳汇 +0.84 kg</text>
            </view>
            <view class="sync-icon-wrap">
              <text class="iconfont icon-footprint"></text>
            </view>
          </view>

          <view class="lc-section">
            <view class="lc-section-header">
              <text class="section-title">运动场景打卡</text>
              <text class="section-hint">滑动查看更多</text>
            </view>
            <view class="sport-grid">
              <view class="sport-card blue-card">
                <view class="sport-icon blue-icon">
                  <text class="iconfont icon-run"></text>
                </view>
                <text class="sport-name">户外跑步</text>
              </view>
              <view class="sport-card orange-card">
                <view class="sport-badge-wrap"><text class="sport-badge">专属审核</text></view>
                <view class="sport-icon orange-icon">
                  <text class="iconfont icon-school"></text>
                </view>
                <text class="sport-name">体育课运动</text>
              </view>
              <view class="sport-card purple-card">
                <view class="sport-icon purple-icon">
                  <text class="iconfont icon-dumbbell"></text>
                </view>
                <text class="sport-name">健身塑形</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 出行模块 -->
      <view v-if="currentTab === 'travel'" class="lc-module">
        <view class="page-content">
          <view class="lc-asset-card travel-asset">
            <view class="asset-inner">
              <view class="asset-left">
                <text class="asset-label">本月出行减碳量</text>
                <text class="asset-value">42.8 kg</text>
              </view>
            </view>
            <text class="travel-rank-tag">里程超越 92% 同学</text>
          </view>

          <view class="lc-section">
            <view class="lc-section-header">
              <text class="section-title">出行打卡选项</text>
              <text class="iconfont icon-info"></text>
            </view>
            <view class="travel-list">
              <view class="travel-item">
                <view class="travel-icon indigo-icon">
                  <text class="iconfont icon-bus"></text>
                </view>
                <view class="travel-info">
                  <text class="travel-name">公交地铁</text>
                  <text class="travel-desc">线路选择 · 乘车次数凭证</text>
                </view>
              </view>
              <view class="travel-item">
                <view class="travel-icon green-icon">
                  <text class="iconfont icon-bike"></text>
                </view>
                <view class="travel-info">
                  <text class="travel-name">共享单车/私车</text>
                  <text class="travel-desc">扫码自动记录公里数</text>
                </view>
              </view>
              <view class="travel-item">
                <view class="travel-icon orange-icon-sm">
                  <text class="iconfont icon-walk"></text>
                </view>
                <view class="travel-info">
                  <text class="travel-name">步行通勤</text>
                  <text class="travel-desc">上下学通勤路径校验</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 饮食模块 -->
      <view v-if="currentTab === 'diet'" class="lc-module">
        <view class="page-content">
          <view class="diet-map-card">
            <view class="diet-map-overlay">
              <view class="diet-map-pin">
                <text class="iconfont icon-location pin-icon"></text>
              </view>
              <view class="diet-map-info">
                <text class="diet-map-name">第一学生食堂</text>
                <text class="diet-map-hint">请确保您在食堂范围内打卡</text>
              </view>
              <button class="diet-map-btn">一键签到</button>
            </view>
          </view>

          <view class="lc-section">
            <view class="lc-section-header">
              <text class="section-title">饮食场景打卡</text>
            </view>
            <view class="diet-list">
              <view class="diet-item">
                <view class="diet-left">
                  <view class="diet-icon orange-icon">
                    <text class="iconfont icon-camera"></text>
                  </view>
                  <view class="diet-info">
                    <text class="diet-name">光盘行动</text>
                    <text class="diet-desc">AI拍照识别识别空盘情况</text>
                  </view>
                </view>
                <button class="diet-btn">AI拍摄</button>
              </view>
              <view class="diet-item">
                <view class="diet-left">
                  <view class="diet-icon green-icon">
                    <text class="iconfont icon-leaf"></text>
                  </view>
                  <view class="diet-info">
                    <text class="diet-name">低碳素食</text>
                    <text class="diet-desc">选择全素餐/本地时令餐</text>
                  </view>
                </view>
                <view class="diet-check"></view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 生活模块 -->
      <view v-if="currentTab === 'life'" class="lc-module">
        <view class="page-content">
          <view class="lc-asset-card life-asset">
            <view class="asset-inner">
              <view class="asset-left">
                <text class="asset-label">学习生活低碳等级</text>
                <text class="asset-value">LV.5</text>
                <text class="life-recycle-tag">已回收旧物约 24.5kg</text>
              </view>
            </view>
          </view>

          <!-- 子功能页签 -->
          <view class="life-tabs">
            <view class="life-tab" :class="{ 'life-tab-active': lifeSubTab === 'home' }" @click="goTab('home')">首页</view>
            <view class="life-tab" :class="{ 'life-tab-active': lifeSubTab === 'dorm' }" @click="goTab('dorm')">宿舍节能</view>
            <view class="life-tab" :class="{ 'life-tab-active': lifeSubTab === 'study' }" @click="goTab('study')">低碳学习</view>
          </view>

          <!-- 功能网格 -->
          <view v-if="lifeSubTab === 'home'" class="life-grid">
            <view class="life-card">
              <text class="iconfont icon-gift life-card-icon indigo"></text>
              <text class="life-card-name">旧物捐赠</text>
              <text class="life-card-desc">旧书/衣/家电上传</text>
              <button class="life-card-btn">去捐赠</button>
            </view>
            <view class="life-card">
              <text class="iconfont icon-shopping-bag life-card-icon emerald"></text>
              <text class="life-card-name">环保购物</text>
              <text class="life-card-desc">自带布袋/无包装</text>
              <button class="life-card-btn green-btn">打卡</button>
            </view>
            <view class="life-card">
              <text class="iconfont icon-flower life-card-icon green"></text>
              <text class="life-card-name">绿植养护</text>
              <text class="life-card-desc">碳吸附实时记录</text>
              <button class="life-card-btn green-btn">记录</button>
            </view>
            <view class="life-card">
              <text class="iconfont icon-book life-card-icon blue"></text>
              <text class="life-card-name">低碳学习</text>
              <text class="life-card-desc">无纸化/二手教材</text>
              <button class="life-card-btn blue-btn-sm">上传</button>
            </view>
          </view>

          <!-- 宿舍节能内容 -->
          <view v-else-if="lifeSubTab === 'dorm'" class="sub-content">
            <view class="sub-card">
              <text class="sub-card-title">宿舍周能耗趋势</text>
              <view class="energy-chart">
                <view class="energy-bar-wrap" v-for="(item, i) in energyData" :key="i">
                  <view class="energy-bar" :style="{ height: item.h + 'rpx' }"></view>
                  <text class="energy-bar-label">{{ item.d }}</text>
                </view>
              </view>
            </view>
            <text class="sub-section-title">即时打卡</text>
            <view class="dorm-checkin-grid">
              <view class="dorm-checkin-card">
                <text class="iconfont icon-lightning dorm-checkin-icon yellow-icon"></text>
                <text class="dorm-checkin-name">节约用电</text>
                <text class="dorm-checkin-desc">做到随手关灯</text>
                <button class="dorm-checkin-btn done-btn">打卡成功</button>
              </view>
              <view class="dorm-checkin-card">
                <text class="iconfont icon-water dorm-checkin-icon blue-icon"></text>
                <text class="dorm-checkin-name">节约用水</text>
                <text class="dorm-checkin-desc">缩短淋浴时间</text>
                <button class="dorm-checkin-btn todo-btn">去打卡</button>
              </view>
            </view>
            <view class="dorm-monitor-list">
              <view class="dorm-monitor-item">
                <text class="iconfont icon-temp dorm-monitor-icon emerald-icon"></text>
                <text class="dorm-monitor-name">空调温控 (当前 26℃)</text>
                <text class="iconfont icon-check-circle dorm-monitor-check emerald-icon"></text>
              </view>
              <view class="dorm-monitor-item">
                <text class="iconfont icon-night dorm-monitor-icon indigo-icon"></text>
                <text class="dorm-monitor-name">熄灯自律打卡</text>
                <text class="dorm-monitor-hint">23:00 后开启</text>
              </view>
            </view>
            <view class="dorm-pk-card">
              <text class="dorm-pk-title">节能寝室 PK 赛</text>
              <view class="dorm-pk-row">
                <view>
                  <text class="dorm-pk-hint">本楼栋排名</text>
                  <text class="dorm-pk-rank">No.12</text>
                </view>
                <button class="dorm-pk-btn">查看对比</button>
              </view>
            </view>
            <text class="sub-section-title">宿舍节能小妙招</text>
            <view class="dorm-tips">
              <view class="dorm-tip yellow-tip">
                <view class="tip-num yellow-num"><text>1</text></view>
                <text class="tip-text">拔掉不常用的电器插头，减少待机功耗。</text>
              </view>
              <view class="dorm-tip green-tip">
                <view class="tip-num green-num"><text>2</text></view>
                <text class="tip-text">利用宿舍阳台自然采光，减少白天开灯。</text>
              </view>
            </view>
          </view>

          <!-- 低碳学习内容 -->
          <view v-else-if="lifeSubTab === 'study'" class="sub-content">
            <view class="study-achieve-card">
              <text class="study-achieve-label">无纸化学习本学期省下</text>
              <view class="study-achieve-row">
                <text class="study-achieve-num">425</text>
                <text class="study-achieve-unit">张 A4 纸</text>
              </view>
              <text class="study-achieve-sub">相当于保护了 0.05 棵成年树木 🌳</text>
            </view>
            <view class="study-grid">
              <view class="study-card">
                <view class="study-card-icon green-bg"><text class="iconfont icon-tablet"></text></view>
                <text class="study-card-name">无纸化笔记</text>
                <text class="study-card-desc">使用平板/电脑记录</text>
              </view>
              <view class="study-card">
                <view class="study-card-icon blue-bg"><text class="iconfont icon-recycle"></text></view>
                <text class="study-card-name">草稿纸回收</text>
                <text class="study-card-desc">废旧纸张定点回收</text>
              </view>
              <view class="study-card">
                <view class="study-card-icon purple-bg"><text class="iconfont icon-share"></text></view>
                <text class="study-card-name">电子共享</text>
                <text class="study-card-desc">云端传资料免打印</text>
              </view>
              <view class="study-card">
                <view class="study-card-icon amber-bg"><text class="iconfont icon-book"></text></view>
                <text class="study-card-name">二手教材</text>
                <text class="study-card-desc">学长学姐课本转借</text>
              </view>
            </view>
            <view class="study-market-header">
              <text class="sub-section-title" style="margin-bottom: 0;">二手教材市场</text>
              <view class="study-market-tags">
                <text class="market-tag-active">求购</text>
                <text class="market-tag">转让</text>
              </view>
            </view>
            <view class="study-book-list">
              <view class="study-book-item">
                <view class="study-book-cover"><text class="iconfont icon-book study-book-icon"></text></view>
                <view class="study-book-info">
                  <text class="study-book-title">《高等数学（下）》</text>
                  <text class="study-book-meta">发布者：23级张同学 · 9成新</text>
                  <view class="study-book-footer">
                    <text class="study-book-price free">免费转借</text>
                    <button class="study-book-btn">联系他</button>
                  </view>
                </view>
              </view>
              <view class="study-book-item">
                <view class="study-book-cover"><text class="iconfont icon-book study-book-icon"></text></view>
                <view class="study-book-info">
                  <text class="study-book-title">《计算机组成原理》</text>
                  <text class="study-book-meta">发布者：王学姐 · 含有精美笔记</text>
                  <view class="study-book-footer">
                    <text class="study-book-price points">50 碳汇分</text>
                    <button class="study-book-btn">立即兑换</button>
                  </view>
                </view>
              </view>
            </view>
            <text class="sub-section-title">本周热门共享资料</text>
            <view class="study-file-list">
              <view class="study-file-item">
                <text class="iconfont icon-pdf study-file-icon red-icon"></text>
                <view class="study-file-info">
                  <text class="study-file-name">大学物理复习大纲.pdf</text>
                  <text class="study-file-meta">已省下 24 张纸 · 120人下载</text>
                </view>
                <text class="iconfont icon-download study-file-dl"></text>
              </view>
              <view class="study-file-item">
                <text class="iconfont icon-doc study-file-icon blue-icon"></text>
                <view class="study-file-info">
                  <text class="study-file-name">思修期末复习题库.docx</text>
                  <text class="study-file-meta">已省下 15 张纸 · 88人下载</text>
                </view>
                <text class="iconfont icon-download study-file-dl"></text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, getCurrentPages } from 'vue'

const currentTab = ref('index')
const tabs = [
  { id: 'index', label: '推荐' },
  { id: 'sport', label: '运动' },
  { id: 'travel', label: '出行' },
  { id: 'diet', label: '饮食' },
  { id: 'life', label: '生活' }
]

const currentDate = computed(() => {
  const date = new Date()
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
})

const switchModule = (tabId) => {
  currentTab.value = tabId
}

const goBack = () => uni.switchTab({ url: '/pages/action/action' })

const lifeSubTab = ref('home')

const energyData = [
  { d: 'M', h: 80 }, { d: 'T', h: 130 }, { d: 'W', h: 100 },
  { d: 'T', h: 55 }, { d: 'F', h: 48 }, { d: 'S', h: 75 }, { d: 'S', h: 90 }
]

const goTab = (tab) => {
  lifeSubTab.value = tab
}

// 在页面加载时读取URL参数并切换到对应的标签
onMounted(() => {
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    if (currentPage && currentPage.options && currentPage.options.tab) {
      const tabId = currentPage.options.tab
      // 检查这个tab是否存在
      if (tabs.some(t => t.id === tabId)) {
        currentTab.value = tabId
      }
    }
  }
})


</script>

<style scoped>
@import url('../../static/iconfont.css');

.page-low-carbon-main {
  background-color: #fafafa;
  min-height: 100vh;
}

.lc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80rpx 24rpx 24rpx 16rpx;
  background: #fff;
  gap: 16rpx;
}

.sport-back-btn {
  width: 64rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sport-back-btn .iconfont {
  font-size: 34rpx;
  color: #1f2937;
}

.lc-logo {
  font-size: 40rpx;
  font-weight: 900;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.lc-logo-accent { color: #8b5cf6; }

.lc-date {
  font-size: 20rpx;
  color: #9ca3af;
  font-weight: bold;
}

/* 标签页导航 */
.lc-tabs-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f3f4f6;
  overflow-x: auto;
}

.lc-tab-item {
  padding: 12rpx 24rpx;
  font-size: 28rpx;
  color: #9ca3af;
  white-space: nowrap;
  border-bottom: 4rpx solid transparent;
  transition: all 0.3s ease;
}

.lc-tab-item.lc-tab-active {
  color: #10b981;
  border-bottom-color: #10b981;
  font-weight: 600;
}

.tab-label {
  display: inline-block;
}

/* 内容区域 */
.lc-content-wrapper {
  overflow: hidden;
}

.lc-module {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 1;
  }
}

.page-content {
  padding: 0 24rpx 200rpx;
}

/* 碳资产卡片 */
.lc-asset-card {
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
  margin-bottom: 24rpx;
  margin-top: 24rpx;
}

.life-asset { background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%); }
.travel-asset { background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); }

.asset-inner {
  position: relative;
  z-index: 1;
}

.asset-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.asset-label {
  font-size: 24rpx;
  opacity: 0.9;
}

.asset-value {
  font-size: 48rpx;
  font-weight: 900;
}

.life-recycle-tag {
  font-size: 20rpx;
  opacity: 0.85;
}

.travel-rank-tag {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  background: rgba(255,255,255,0.2);
  color: #fff;
  padding: 8rpx 16rpx;
  border-radius: 32rpx;
  font-size: 20rpx;
  backdrop-filter: blur(10px);
}

/* 生活页签 */
.life-tabs {
  display: flex;
  gap: 16rpx;
  margin-bottom: 24rpx;
  overflow-x: auto;
  padding-bottom: 8rpx;
}

.life-tab {
  padding: 12rpx 28rpx;
  border-radius: 24rpx;
  font-size: 26rpx;
  color: #6b7280;
  white-space: nowrap;
  background: #f3f4f6;
  transition: all 0.2s;
}

.life-tab-active {
  background: #10b981;
  color: #fff;
  font-weight: 600;
}

/* 子内容区 */
.sub-content {
  padding-bottom: 40rpx;
}

.sub-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.sub-card-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #1f2937;
  display: block;
  margin-bottom: 20rpx;
}

.sub-section-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  display: block;
  margin: 20rpx 0 16rpx;
}

/* 能耗图表 */
.energy-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 140rpx;
  gap: 8rpx;
}

.energy-bar-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 6rpx;
}

.energy-bar {
  width: 100%;
  background: #facc15;
  border-radius: 6rpx;
  min-height: 10rpx;
}

.energy-bar-label {
  font-size: 18rpx;
  color: #9ca3af;
}

/* 宿舍打卡 */
.dorm-checkin-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.dorm-checkin-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.dorm-checkin-icon {
  font-size: 48rpx;
  margin-bottom: 10rpx;
}

.dorm-checkin-name {
  font-size: 26rpx;
  font-weight: 600;
  color: #1f2937;
}

.dorm-checkin-desc {
  font-size: 20rpx;
  color: #9ca3af;
  margin-top: 4rpx;
  text-align: center;
}

.dorm-checkin-btn {
  margin-top: 16rpx;
  width: 100%;
  border-radius: 16rpx;
  font-size: 22rpx;
  font-weight: 600;
  padding: 12rpx 0;
  border: none;
}

.done-btn { background: #facc15; color: #fff; }
.todo-btn { background: #fff; color: #3b82f6; border: 2rpx solid #3b82f6 !important; }

/* 监控列表 */
.dorm-monitor-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.dorm-monitor-item {
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx 24rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.dorm-monitor-icon { font-size: 36rpx; }
.dorm-monitor-name { flex: 1; font-size: 26rpx; font-weight: 600; color: #1f2937; }
.dorm-monitor-check { font-size: 32rpx; }
.dorm-monitor-hint { font-size: 22rpx; color: #9ca3af; font-style: italic; }
.emerald-icon { color: #10b981; }
.indigo-icon { color: #6366f1; }

/* PK赛 */
.dorm-pk-card {
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border-radius: 24rpx;
  padding: 28rpx;
  color: #fff;
  margin-bottom: 20rpx;
}

.dorm-pk-title { font-size: 26rpx; font-weight: 700; display: block; margin-bottom: 16rpx; }

.dorm-pk-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.dorm-pk-hint { font-size: 20rpx; opacity: 0.7; display: block; }
.dorm-pk-rank { font-size: 48rpx; font-weight: 900; font-style: italic; display: block; }

.dorm-pk-btn {
  background: rgba(255,255,255,0.2);
  color: #fff;
  border: none;
  border-radius: 30rpx;
  padding: 12rpx 24rpx;
  font-size: 22rpx;
}

/* 节能小妙招 */
.dorm-tips { display: flex; flex-direction: column; gap: 12rpx; }

.dorm-tip {
  border-radius: 16rpx;
  padding: 16rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.yellow-tip { background: #fefce8; }
.green-tip { background: #f0fdf4; }

.tip-num {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: 700;
  flex-shrink: 0;
}

.yellow-num { background: #fde68a; color: #92400e; }
.green-num { background: #a7f3d0; color: #065f46; }

.tip-text { font-size: 22rpx; color: #374151; flex: 1; }

/* 低碳学习 */
.study-achieve-card {
  background: linear-gradient(135deg, #f97316, #fb923c);
  border-radius: 24rpx;
  padding: 32rpx;
  color: #fff;
  margin-bottom: 20rpx;
}

.study-achieve-label { font-size: 24rpx; display: block; margin-bottom: 12rpx; }

.study-achieve-row {
  display: flex;
  align-items: baseline;
  gap: 8rpx;
  margin-bottom: 12rpx;
}

.study-achieve-num { font-size: 72rpx; font-weight: 900; line-height: 1; }
.study-achieve-unit { font-size: 26rpx; }
.study-achieve-sub { font-size: 20rpx; opacity: 0.8; display: block; }

.study-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.study-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.study-card-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #fff;
  margin-bottom: 4rpx;
}

.green-bg { background: #d1fae5; color: #059669 !important; }
.blue-bg { background: #dbeafe; color: #2563eb !important; }
.purple-bg { background: #ede9fe; color: #7c3aed !important; }
.amber-bg { background: #fef3c7; color: #d97706 !important; }

.study-card-icon text { color: inherit; }

.study-card-name { font-size: 24rpx; font-weight: 700; color: #1f2937; }
.study-card-desc { font-size: 18rpx; color: #9ca3af; text-align: center; }

.study-market-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rpx 0 16rpx;
}

.study-market-tags { display: flex; gap: 8rpx; }
.market-tag-active { background: #10b981; color: #fff; font-size: 20rpx; padding: 6rpx 16rpx; border-radius: 20rpx; }
.market-tag { background: #f3f4f6; color: #9ca3af; font-size: 20rpx; padding: 6rpx 16rpx; border-radius: 20rpx; }

.study-book-list { display: flex; flex-direction: column; gap: 16rpx; margin-bottom: 20rpx; }

.study-book-item {
  background: #f9fafb;
  border-radius: 20rpx;
  padding: 20rpx;
  display: flex;
  gap: 20rpx;
}

.study-book-cover {
  width: 100rpx;
  height: 120rpx;
  background: #e5e7eb;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.study-book-icon { font-size: 40rpx; color: #9ca3af; }

.study-book-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.study-book-title { font-size: 26rpx; font-weight: 700; color: #1f2937; }
.study-book-meta { font-size: 20rpx; color: #9ca3af; }

.study-book-footer { display: flex; justify-content: space-between; align-items: center; }
.study-book-price { font-size: 26rpx; font-weight: 700; }
.study-book-price.free { color: #10b981; }
.study-book-price.points { color: #f97316; }

.study-book-btn {
  background: #1f2937;
  color: #fff;
  border: none;
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
  font-size: 20rpx;
}

.study-file-list { display: flex; flex-direction: column; gap: 12rpx; }

.study-file-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}

.study-file-icon { font-size: 40rpx; }
.red-icon { color: #ef4444; }
.blue-icon { color: #3b82f6; }

.study-file-info { flex: 1; }
.study-file-name { font-size: 24rpx; font-weight: 600; color: #1f2937; display: block; }
.study-file-meta { font-size: 20rpx; color: #9ca3af; display: block; margin-top: 4rpx; }
.study-file-dl { font-size: 36rpx; color: #d1d5db; }

/* 生活网格 */
.life-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.life-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.life-card-icon {
  font-size: 40rpx;
  margin-bottom: 8rpx;
}

.life-card-name {
  font-size: 26rpx;
  color: #1f2937;
  font-weight: 600;
  text-align: center;
}

.life-card-desc {
  font-size: 20rpx;
  color: #9ca3af;
  text-align: center;
}

.life-card-btn {
  margin-top: 12rpx;
  background: #f3f4f6;
  border: none;
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  font-size: 20rpx;
  color: #6b7280;
}

.green-btn { background: #d1fae5; color: #047857; }
.blue-btn-sm { background: #dbeafe; color: #1e40af; }

/* 运动模块 */
.sport-sync-card {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 24rpx;
  padding: 32rpx 24rpx;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24rpx 0;
  box-shadow: 0 8rpx 24rpx rgba(16, 185, 129, 0.2);
}

.sync-left {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.sync-dot-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.sync-dot {
  width: 8rpx;
  height: 8rpx;
  background: #fff;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.sync-label {
  font-size: 20rpx;
  letter-spacing: 2rpx;
}

.sync-value {
  font-size: 44rpx;
  font-weight: 900;
}

.sync-unit {
  font-size: 28rpx;
}

.sync-desc {
  font-size: 20rpx;
  opacity: 0.9;
}

.sync-icon-wrap {
  font-size: 80rpx;
  opacity: 0.2;
}

.lc-section {
  margin-bottom: 24rpx;
}

.lc-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #1f2937;
}

.section-hint {
  font-size: 20rpx;
  color: #9ca3af;
}

.sport-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.sport-card {
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  color: #fff;
  position: relative;
}

.blue-card { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
.orange-card { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }
.purple-card { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }

.sport-badge-wrap {
  position: absolute;
  top: 12rpx;
  left: 12rpx;
}

.sport-badge {
  background: rgba(255,255,255,0.3);
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 16rpx;
  font-size: 18rpx;
  font-weight: 600;
}

.sport-icon {
  font-size: 48rpx;
}

.sport-name {
  font-size: 26rpx;
  font-weight: 600;
}

.sport-desc {
  font-size: 20rpx;
  opacity: 0.9;
}

/* 出行模块 */
.travel-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.travel-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  gap: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.travel-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
}

.indigo-icon { background: #6366f1; }
.green-icon { background: #10b981; }
.orange-icon-sm { background: #f97316; }
.rose-icon-sm { background: #f43f5e; }

.travel-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.travel-name {
  font-size: 26rpx;
  color: #1f2937;
  font-weight: 600;
}

.travel-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

/* 饮食模块 */
.diet-map-card {
  position: relative;
  height: 300rpx;
  border-radius: 24rpx;
  overflow: hidden;
  background: #f3f4f6;
  margin: 24rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.diet-map-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.diet-map-pin {
  width: 80rpx;
  height: 80rpx;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #fff;
}

.pin-icon {
  font-size: 40rpx;
}

.diet-map-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.diet-map-name {
  font-size: 28rpx;
  color: #1f2937;
  font-weight: 600;
}

.diet-map-hint {
  font-size: 20rpx;
  color: #6b7280;
}

.diet-map-btn {
  background: #10b981;
  color: #fff;
  border: none;
  border-radius: 20rpx;
  padding: 12rpx 24rpx;
  font-size: 24rpx;
  font-weight: 600;
  margin-top: 8rpx;
}

.diet-list {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.diet-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.diet-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
  flex: 1;
}

.diet-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
}

.orange-icon { background: #f97316; }

.diet-info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.diet-name {
  font-size: 26rpx;
  color: #1f2937;
  font-weight: 600;
}

.diet-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

.diet-btn {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  font-size: 20rpx;
  white-space: nowrap;
}

.diet-check,
.diet-check-done {
  width: 24rpx;
  height: 24rpx;
  border: 2rpx solid #d1d5db;
  border-radius: 50%;
}

.diet-check-done {
  background: #10b981;
  border-color: #10b981;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16rpx;
}
</style>
