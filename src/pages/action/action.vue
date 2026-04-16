<template>
  <view class="page-action">
    <!-- Header -->
    <view class="page-header">
      <view class="header-left">
        <text class="page-title">行为打卡</text>
        <text class="page-sub">记录你的低碳足迹，赚取积分</text>
      </view>
      <view class="header-right">
        <text class="header-sub-label">今日已减排</text>
        <text class="header-value">1.85 kg</text>
      </view>
    </view>

    <!-- Categories -->
    <scroll-view class="category-scroll" scroll-x="true">
      <view class="category-tags">
        <view
          class="category-tag"
          :class="{ 'tag-active': activeTab === 'recommend' }"
          @tap="switchTab('recommend')"
        >推荐</view>
        <view
          class="category-tag"
          :class="{ 'tag-active': activeTab === 'sport' }"
          @tap="switchTab('sport')"
        >运动</view>
        <view
          class="category-tag"
          :class="{ 'tag-active': activeTab === 'travel' }"
          @tap="switchTab('travel')"
        >出行</view>
        <view
          class="category-tag"
          :class="{ 'tag-active': activeTab === 'diet' }"
          @tap="switchTab('diet')"
        >饮食</view>
        <view
          class="category-tag"
          :class="{ 'tag-active': activeTab === 'life' }"
          @tap="switchTab('life')"
        >生活</view>
      </view>
    </scroll-view>

    <!-- Content -->
    <view class="content">
      <!-- Recommend Tab (Default) -->
      <view v-if="activeTab === 'recommend'">
        <!-- AI Recognition Tip -->
        <view class="ai-tip">
          <view class="ai-icon">
            <text class="iconfont icon-camera"></text>
          </view>
          <view class="ai-content">
            <text class="ai-title">AI 视觉识别打卡</text>
            <text class="ai-desc">拍照识别垃圾分类、空盘等</text>
          </view>
          <text class="iconfont icon-chevron-right"></text>
        </view>

        <!-- Promotion Card -->
        <view class="promo-card">
          <view class="promo-icon">
            <text class="iconfont icon-bento"></text>
          </view>
          <view class="promo-content">
            <text class="promo-title">低碳光盘行动</text>
            <text class="promo-desc">今日打卡奖励翻倍</text>
          </view>
          <view class="promo-badge">+100</view>
        </view>

        <!-- Action Grid -->
        <view class="action-grid">
          <view class="action-card">
            <text class="iconfont icon-bike"></text>
            <text class="action-title">单车出行</text>
            <text class="action-points">+15 积分/km</text>
          </view>
          <view class="action-card">
            <text class="iconfont icon-cup"></text>
            <text class="action-title">自带水杯</text>
            <text class="action-points">+30 积分/次</text>
          </view>
          <view class="action-card">
            <text class="iconfont icon-shopping"></text>
            <text class="action-title">环保袋购物</text>
            <text class="action-points">+20 积分/次</text>
          </view>
          <view class="action-card card-disabled">
            <text class="iconfont icon-plug"></text>
            <text class="action-title">随手关灯</text>
            <text class="action-points">+5 积分/次</text>
          </view>
        </view>

        <!-- History Timeline -->
        <text class="history-title">打卡历史</text>
        <view class="history-list">
          <view class="history-item">
            <view class="history-dot"></view>
            <view class="history-content">
              <text class="history-text">旧书捐赠记录</text>
              <text class="history-time">2026-04-05 08:30 · 教学楼 3 楼回收站</text>
              <view class="history-images">
                <image class="history-img" src="/static/placeholder.png" mode="aspectFill"></image>
                <image class="history-img" src="/static/placeholder.png" mode="aspectFill"></image>
              </view>
            </view>
          </view>
          <view class="history-item history-pass">
            <view class="history-dot dot-gray"></view>
            <view class="history-content">
              <text class="history-text">校园跑 3.5km</text>
              <text class="history-time">2026-04-04 19:15 · 操场</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Sport Tab -->
      <view v-if="activeTab === 'sport'" class="tab-content">
        <!-- 步数同步卡片 -->
        <view class="sport-sync-card">
          <view class="sync-left">
            <view class="sync-dot-wrap">
              <view class="sync-dot"></view>
              <text class="sync-label">STEP SYNC ACTIVE</text>
            </view>
            <text class="sync-value">8,432<span class="sync-unit">/10000</span></text>
            <text class="sync-desc">今日步数已同步 · 产出碳汇 +0.84 kg</text>
            <view class="sync-badges">
              <view class="sync-badge">
                <text class="badge-label">碳资产</text>
                <text class="badge-value">2,840</text>
              </view>
              <view class="sync-badge">
                <text class="badge-label">减排</text>
                <text class="badge-value">125.4 kg</text>
              </view>
            </view>
          </view>
          <view class="sync-icon-wrap">
            <text class="iconfont icon-footprint"></text>
          </view>
        </view>

        <!-- 运动场景 -->
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
            <view class="sport-card amber-card">
              <view class="sport-icon amber-icon">
                <text class="iconfont icon-basketball"></text>
              </view>
              <text class="sport-name">球类运动</text>
            </view>
            <view class="sport-card cyan-card">
              <view class="sport-icon cyan-icon">
                <text class="iconfont icon-swim"></text>
              </view>
              <text class="sport-name">水上运动</text>
            </view>
            <view class="sport-card green-card">
              <view class="sport-icon green-icon">
                <text class="iconfont icon-bike"></text>
              </view>
              <text class="sport-name">骑行运动</text>
            </view>
          </view>
        </view>
      </view>

      <!-- Travel Tab -->
      <view v-if="activeTab === 'travel'" class="tab-content">
        <!-- 出行碳资产 -->
        <view class="lc-asset-card travel-asset">
          <view class="asset-inner">
            <view class="asset-left">
              <text class="asset-label">本月出行减碳量</text>
              <text class="asset-value">42.8 kg</text>
            </view>
          </view>
          <text class="travel-rank-tag">里程超越 92% 同学</text>
        </view>

        <!-- LBS 监控 -->
        <view class="travel-lbs-card">
          <view class="lbs-icon-wrap">
            <view class="lbs-dot"></view>
            <text class="iconfont icon-location"></text>
          </view>
          <view class="lbs-content">
            <text class="lbs-title">校园 LBS 自动监测中</text>
            <text class="lbs-desc">正在核验：学生活动中心 -> 实验楼</text>
          </view>
        </view>

        <!-- 出行选项 -->
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
            <view class="travel-item">
              <view class="travel-icon purple-icon-sm">
                <text class="iconfont icon-group"></text>
              </view>
              <view class="travel-info">
                <text class="travel-name">拼车共享</text>
                <text class="travel-desc">多人结伴奖励积分 x1.5</text>
              </view>
            </view>
            <view class="travel-item">
              <view class="travel-icon cyan-icon-sm">
                <text class="iconfont icon-scooter"></text>
              </view>
              <view class="travel-info">
                <text class="travel-name">新能源代步</text>
                <text class="travel-desc">电车/滑板车合规打卡</text>
              </view>
            </view>
            <view class="travel-item">
              <view class="travel-icon rose-icon-sm">
                <text class="iconfont icon-school-bus"></text>
              </view>
              <view class="travel-info">
                <text class="travel-name">校车通勤</text>
                <text class="travel-desc">扫码记录校内校车次数</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- Diet Tab -->
      <view v-if="activeTab === 'diet'" class="tab-content">
        <!-- 连续光盘打卡卡片 -->
        <view class="diet-streak-card">
          <view class="streak-inner">
            <view class="streak-left">
              <text class="streak-label">连续光盘打卡</text>
              <text class="streak-value">12 天</text>
              <view class="streak-badge">
                <text class="streak-badge-text">连续打卡奖励积分：+50</text>
              </view>
            </view>
            <view class="streak-icon-bg">
              <text class="iconfont icon-bowl"></text>
            </view>
          </view>
        </view>

        <!-- 食堂定位 -->
        <view class="diet-map-card">
          <map
            class="diet-map"
            :latitude="26.4509"
            :longitude="106.6579"
            :markers="canteenMarkers"
            scale="16"
            :show-location="true"
          ></map>
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

        <!-- 饮食打卡 -->
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
                  <text class="diet-desc">AI 拍照识别识别空盘情况</text>
                </view>
              </view>
              <button class="diet-btn">AI 拍摄</button>
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
            <view class="diet-item">
              <view class="diet-left">
                <view class="diet-icon rose-icon">
                  <text class="iconfont icon-no-plastic"></text>
                </view>
                <view class="diet-info">
                  <text class="diet-name">减外卖减塑</text>
                  <text class="diet-desc">今日未点外卖、拒绝一次性餐盒</text>
                </view>
              </view>
              <view class="diet-check-done">
                <text class="iconfont icon-check"></text>
              </view>
            </view>
            <view class="diet-item">
              <view class="diet-left">
                <view class="diet-icon blue-icon">
                  <text class="iconfont icon-cup"></text>
                </view>
                <view class="diet-info">
                  <text class="diet-name">自带餐具</text>
                  <text class="diet-desc">自带碗筷及杯子用餐打卡</text>
                </view>
              </view>
              <button class="diet-btn-gray">已领</button>
            </view>
            <view class="diet-item">
              <view class="diet-left">
                <view class="diet-icon cyan-icon">
                  <text class="iconfont icon-water"></text>
                </view>
                <view class="diet-info">
                  <text class="diet-name">节水惜食</text>
                  <text class="diet-desc">节约用水、无浪费零食打卡</text>
                </view>
              </view>
              <button class="diet-btn-blue">记录</button>
            </view>
          </view>
        </view>
      </view>

      <!-- Life Tab -->
      <view v-if="activeTab === 'life'" class="tab-content">
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
        <view class="life-sub-tabs">
          <view
            class="life-sub-tab"
            :class="lifeSubTab === 'home' ? 'life-sub-tab-active' : ''"
            @tap="lifeSubTab = 'home'"
          >推荐<view class="life-tab-line"></view></view>
          <view class="life-sub-divider"></view>
          <view
            class="life-sub-tab"
            :class="lifeSubTab === 'dorm' ? 'life-sub-tab-active' : ''"
            @tap="lifeSubTab = 'dorm'"
          >宿舍节能<view class="life-tab-line"></view></view>
          <view class="life-sub-divider"></view>
          <view
            class="life-sub-tab"
            :class="lifeSubTab === 'study' ? 'life-sub-tab-active' : ''"
            @tap="lifeSubTab = 'study'"
          >低碳学习<view class="life-tab-line"></view></view>
        </view>

        <!-- 垃圾分类 AI 核验 -->
        <view class="life-ai-card">
          <view class="life-ai-left">
            <view class="life-ai-icon">
              <text class="iconfont icon-camera"></text>
            </view>
            <view class="life-ai-content">
              <text class="life-ai-title">垃圾分类 AI 核验</text>
              <text class="life-ai-desc">拍照识别并记录碳吸附</text>
            </view>
          </view>
          <button class="life-ai-btn">去拍摄</button>
        </view>

        <!-- 推荐内容 -->
        <view v-if="lifeSubTab === 'home'">
          <!-- 功能网格 -->
          <view class="life-grid">
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
        </view>

        <!-- 宿舍节能内容 -->
        <view v-else-if="lifeSubTab === 'dorm'">
          <!-- 1. 宿舍周能耗趋势图表 -->
          <view class="energy-chart-wrap">
            <view class="energy-chart-card">
              <text class="energy-chart-title">宿舍周能耗趋势</text>
              <view class="energy-bar-group">
                <view class="energy-bar-item" v-for="(item, i) in energyData" :key="i">
                  <view class="energy-bar" :style="{ height: item.h + 'rpx', background: item.color }"></view>
                  <text class="energy-bar-label">{{ item.d }}</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 2. 即时打卡 -->
          <text class="dorm-sub-title">即时打卡</text>
          <view class="dorm-quick-grid">
            <view class="dorm-quick-card">
              <text class="iconfont icon-lightbulb dorm-quick-icon yellow"></text>
              <text class="dorm-quick-name">节约用电</text>
              <text class="dorm-quick-desc">做到随手关灯</text>
              <button class="dorm-quick-btn done-btn">打卡成功</button>
            </view>
            <view class="dorm-quick-card">
              <text class="iconfont icon-water dorm-quick-icon blue"></text>
              <text class="dorm-quick-name">节约用水</text>
              <text class="dorm-quick-desc">缩短淋浴时间</text>
              <button class="dorm-quick-btn outline-btn">去打卡</button>
            </view>
          </view>

          <!-- 3. 监控列表 -->
          <view class="dorm-monitor-list">
            <view class="dorm-monitor-item">
              <view class="dorm-monitor-left">
                <text class="iconfont icon-ac dorm-monitor-icon emerald"></text>
                <text class="dorm-monitor-name">空调温控 (当前 26℃)</text>
              </view>
              <text class="iconfont icon-check-circle dorm-monitor-check emerald"></text>
            </view>
            <view class="dorm-monitor-item">
              <view class="dorm-monitor-left">
                <text class="iconfont icon-night dorm-monitor-icon indigo"></text>
                <text class="dorm-monitor-name">熄灯自律打卡</text>
              </view>
              <text class="dorm-monitor-hint">23:00 后开启</text>
            </view>
          </view>

          <!-- 4. 节能PK赛 -->
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

          <!-- 5. 节能小妙招 -->
          <text class="dorm-sub-title">宿舍节能小妙招</text>
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

          <!-- 6. 减碳量计算器 -->
          <view class="dorm-calc-btn-wrap">
            <button class="dorm-calc-btn">
              <text class="iconfont icon-calculator"></text>
              <text>开启减碳量计算器</text>
            </button>
          </view>
        </view>

        <!-- 低碳学习内容 -->
        <view v-else-if="lifeSubTab === 'study'">
          <view class="study-achievement-card">
            <view class="achievement-header">
              <text class="iconfont icon-file-text achievement-icon"></text>
              <text class="achievement-label">无纸化学习本学期省下</text>
            </view>
            <view class="achievement-num">
              <text class="achievement-big">425</text>
              <text class="achievement-unit">张 A4 纸</text>
            </view>
            <text class="achievement-sub">相当于保护了 0.05 棵成年树木</text>
          </view>
          <view class="study-grid">
            <view class="study-grid-card">
              <view class="study-grid-icon green"><text class="iconfont icon-tablet"></text></view>
              <text class="study-grid-name">无纸化笔记</text>
              <text class="study-grid-desc">使用平板/电脑记录</text>
            </view>
            <view class="study-grid-card">
              <view class="study-grid-icon blue"><text class="iconfont icon-recycle"></text></view>
              <text class="study-grid-name">草稿纸回收</text>
              <text class="study-grid-desc">废旧纸张定点回收</text>
            </view>
            <view class="study-grid-card">
              <view class="study-grid-icon purple"><text class="iconfont icon-share"></text></view>
              <text class="study-grid-name">电子共享</text>
              <text class="study-grid-desc">云端传资料免打印</text>
            </view>
            <view class="study-grid-card">
              <view class="study-grid-icon amber"><text class="iconfont icon-book-refresh"></text></view>
              <text class="study-grid-name">二手教材</text>
              <text class="study-grid-desc">学长学姐课本转借</text>
            </view>
          </view>
          <view class="study-section-header">
            <text class="study-section-title">二手教材市场</text>
            <view class="study-tag-group">
              <text class="study-tag-active">求购</text>
              <text class="study-tag">转让</text>
            </view>
          </view>
          <view class="study-book-card">
            <image class="book-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg" mode="aspectFill"></image>
            <view class="book-info">
              <view class="book-top">
                <text class="book-title">《高等数学（下）》</text>
                <text class="book-meta">发布者：23级张同学 · 9成新</text>
              </view>
              <view class="book-bottom">
                <text class="book-price">免费转借</text>
                <button class="book-btn">联系他</button>
              </view>
            </view>
          </view>
          <view class="study-book-card">
            <image class="book-cover" src="https://modao.cc/agent-py/media/generated_images/2026-04-11/ef7a9241798742cabf574a106d337d07.jpg" mode="aspectFill"></image>
            <view class="book-info">
              <view class="book-top">
                <text class="book-title">《计算机组成原理》</text>
                <text class="book-meta">发布者：王学姐 · 含有精美笔记</text>
              </view>
              <view class="book-bottom">
                <text class="book-price orange">50 碳汇分</text>
                <button class="book-btn">立即兑换</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Floating Action Button -->
    <view class="fab">
      <text class="iconfont icon-plus"></text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('recommend')
const lifeSubTab = ref('home')

const energyData = [
  { d: 'M', h: 120, color: '#FACC15' },
  { d: 'T', h: 200, color: '#FACC15' },
  { d: 'W', h: 150, color: '#FACC15' },
  { d: 'T', h: 80,  color: '#FACC15' },
  { d: 'F', h: 70,  color: '#FACC15' },
  { d: 'S', h: 110, color: '#FACC15' },
  { d: 'S', h: 130, color: '#FACC15' }
]

const switchTab = (tab) => {
  activeTab.value = tab
}

const canteenMarkers = [{
  id: 1,
  latitude: 26.4509,
  longitude: 106.6579,
  width: 40,
  height: 50,
  callout: { content: '第一学生食堂', color: '#f97316', fontSize: 12, borderRadius: 8, padding: 8, display: 'ALWAYS', bgColor: '#fff7ed' }
}]
</script>

<style scoped>
.page-action {
  background-color: #fff;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 32rpx 30rpx 24rpx;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.page-title {
  font-size: 44rpx;
  font-weight: 800;
  color: #1f2937;
}

.page-sub {
  font-size: 24rpx;
  color: #9ca3af;
  margin-top: 8rpx;
}

.header-right {
  text-align: right;
}

.header-sub-label {
  display: block;
  font-size: 20rpx;
  color: #d1d5db;
}

.header-value {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #059669;
}

/* Category Scroll */
.category-scroll {
  padding: 0 30rpx;
  white-space: nowrap;
}

.category-tags {
  display: flex;
  gap: 24rpx;
  padding-bottom: 16rpx;
}

.category-tag {
  padding: 12rpx 32rpx;
  background-color: #f3f4f6;
  color: #6b7280;
  border-radius: 50rpx;
  font-size: 28rpx;
  white-space: nowrap;
}

.tag-active {
  background-color: #10b981;
  color: #fff;
  font-weight: 600;
}

/* Content */
.content {
  padding: 0 30rpx;
}

/* AI Tip */
.ai-tip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #3b82f6, #4f46e5);
  padding: 32rpx;
  border-radius: 32rpx;
  margin-top: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.2);
}

.ai-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  color: #fff;
}

.ai-content {
  flex: 1;
  margin-left: 24rpx;
}

.ai-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

.ai-desc {
  display: block;
  font-size: 22rpx;
  color: rgba(255,255,255,0.8);
  margin-top: 4rpx;
}

.ai-tip .iconfont:last-child {
  font-size: 40rpx;
  color: #fff;
}

/* Promo Card */
.promo-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff7ed;
  border: 4rpx solid #fed7aa;
  padding: 32rpx;
  border-radius: 32rpx;
  margin-top: 32rpx;
}

.promo-icon {
  font-size: 80rpx;
}

.promo-content {
  flex: 1;
  margin-left: 24rpx;
}

.promo-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #9a3412;
}

.promo-desc {
  display: block;
  font-size: 22rpx;
  color: #c2410c;
  margin-top: 4rpx;
}

.promo-badge {
  background-color: #fed7aa;
  color: #9a3412;
  padding: 12rpx 24rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: bold;
}

/* Action Grid */
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-top: 32rpx;
}

.action-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, #fff 100%);
  padding: 32rpx;
  border-radius: 32rpx;
  border: 2rpx solid #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.action-card text:first-child {
  font-size: 80rpx;
}

.action-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 16rpx;
}

.action-points {
  font-size: 22rpx;
  color: #10b981;
  font-weight: bold;
  margin-top: 8rpx;
}

.card-disabled {
  opacity: 0.6;
}

/* History Section */
.history-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #374151;
  margin-top: 64rpx;
  margin-bottom: 24rpx;
}

.history-list {
  padding-bottom: 40rpx;
}

.history-item {
  display: flex;
  align-items: flex-start;
  padding-bottom: 32rpx;
}

.history-dot {
  width: 16rpx;
  height: 16rpx;
  background-color: #10b981;
  border-radius: 50%;
  margin-top: 8rpx;
  flex-shrink: 0;
  box-shadow: 0 0 0 8rpx rgba(16, 185, 129, 0.1);
}

.dot-gray {
  background-color: #d1d5db;
  box-shadow: 0 0 0 8rpx rgba(209, 213, 219, 0.1);
}

.history-pass {
  opacity: 0.7;
}

.history-content {
  margin-left: 24rpx;
  flex: 1;
}

.history-text {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #374151;
}

.history-time {
  display: block;
  font-size: 22rpx;
  color: #9ca3af;
  margin-top: 4rpx;
}

.history-images {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
}

.history-img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  background-color: #f3f4f6;
}

/* Floating Action Button */
.fab {
  position: fixed;
  bottom: 200rpx;
  right: 64rpx;
  width: 112rpx;
  height: 112rpx;
  background-color: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56rpx;
  color: #fff;
  box-shadow: 0 16rpx 32rpx rgba(16, 185, 129, 0.4);
  z-index: 100;
}

.fab:active {
  transform: scale(0.9);
  transition: transform 0.1s;
}

/* Tab Content Animation */
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sport Styles */
.sport-sync-card {
  background: #fff;
  border-radius: 32rpx;
  padding: 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2rpx solid #f0fdf4;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.sync-dot-wrap {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 8rpx;
}

.sync-dot {
  width: 16rpx;
  height: 16rpx;
  background: #10b981;
  border-radius: 50%;
}

.sync-label {
  font-size: 18rpx;
  font-weight: bold;
  color: #10b981;
}

.sync-value {
  font-size: 60rpx;
  font-weight: 900;
  color: #1f2937;
  line-height: 1;
  display: block;
  margin-bottom: 8rpx;
}

.sync-unit {
  font-size: 28rpx;
  font-weight: normal;
  color: #9ca3af;
}

.sync-desc {
  font-size: 20rpx;
  color: #9ca3af;
}

/* Pill Badges */
.sync-badges {
  display: flex;
  gap: 12rpx;
  margin-top: 16rpx;
}

.sync-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(16, 185, 129, 0.1);
  padding: 8rpx 16rpx;
  border-radius: 50rpx;
}

.badge-label {
  font-size: 20rpx;
  color: #059669;
  font-weight: 400;
}

.badge-value {
  font-size: 22rpx;
  color: #047857;
  font-weight: 700;
  margin-top: 2rpx;
}

.sync-icon-wrap {
  width: 112rpx;
  height: 112rpx;
  border: 8rpx solid #f0fdf4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sync-icon-wrap .iconfont { font-size: 56rpx; color: #10b981; }

.lc-section { margin-top: 8rpx; }

.lc-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rpx 24rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #1f2937;
}

.section-hint {
  font-size: 20rpx;
  color: #10b981;
  font-weight: bold;
}

.sport-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
}

.sport-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  position: relative;
  transition: all 0.2s;
}

.sport-card:active { transform: scale(0.96); background: #f9f9f9; }

.sport-badge-wrap {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
}

.sport-badge {
  font-size: 16rpx;
  background: #f97316;
  color: #fff;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  font-weight: bold;
}

.sport-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.sport-icon .iconfont { font-size: 40rpx; color: #fff; }

.blue-icon { background: #3b82f6; }
.orange-icon { background: #f97316; }
.purple-icon { background: #8b5cf6; }
.amber-icon { background: #f59e0b; }
.cyan-icon { background: #06b6d4; }
.green-icon { background: #10b981; }

.sport-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 6rpx;
}

.sport-desc {
  display: block;
  font-size: 20rpx;
}

/* Diet Styles */
.diet-streak-card {
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(249, 115, 22, 0.3);
  margin: 0 30rpx 24rpx;
}

.streak-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.streak-left {
  display: flex;
  flex-direction: column;
}

.streak-label {
  font-size: 20rpx;
  opacity: 0.8;
}

.streak-value {
  font-size: 60rpx;
  font-weight: 900;
  margin-top: 4rpx;
  line-height: 1;
}

.streak-badge {
  display: inline-block;
  margin-top: 16rpx;
  background: rgba(255, 255, 255, 0.2);
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  font-size: 18rpx;
}

.streak-badge-text {
  font-weight: 600;
}

.streak-icon-bg {
  opacity: 0.2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.streak-icon-bg .iconfont {
  font-size: 56rpx;
  color: #fff;
}

.diet-map-card {
  border-radius: 32rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  position: relative;
  box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
}

.diet-map {
  width: 100%;
  height: 480rpx;
  border-radius: 32rpx;
}

.diet-map-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10rpx);
  padding: 24rpx 32rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.diet-map-pin {
  width: 72rpx;
  height: 72rpx;
  background: #fff7ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pin-icon { font-size: 36rpx; color: #ea580c; }

.diet-map-info { flex: 1; }

.diet-map-name {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.diet-map-hint {
  display: block;
  font-size: 18rpx;
  color: #9ca3af;
}

.diet-map-btn {
  background: #f97316;
  color: #fff;
  font-size: 22rpx;
  font-weight: 700;
  padding: 16rpx 28rpx;
  border-radius: 50rpx;
  border: none;
  flex-shrink: 0;
  box-shadow: 0 4rpx 12rpx rgba(249,115,22,0.3);
}

.diet-list { display: flex; flex-direction: column; gap: 16rpx; }

.diet-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.diet-left { display: flex; align-items: center; gap: 24rpx; flex: 1; }

.diet-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.diet-icon .iconfont { font-size: 36rpx; }

.orange-icon { background: #fff7ed; }
.orange-icon .iconfont { color: #ea580c; }
.green-icon { background: #ecfdf5; }
.green-icon .iconfont { color: #059669; }
.rose-icon { background: #fff1f2; }
.rose-icon .iconfont { color: #e11d48; }
.blue-icon { background: #eff6ff; }
.blue-icon .iconfont { color: #3b82f6; }
.cyan-icon { background: #ecfeff; }
.cyan-icon .iconfont { color: #0891b2; }

.diet-info { flex: 1; }

.diet-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.diet-desc {
  display: block;
  font-size: 20rpx;
  color: #9ca3af;
}

.diet-btn {
  background: #f97316;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.diet-btn-gray {
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 20rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.diet-btn-blue {
  background: #3b82f6;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.diet-check {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #10b981;
  flex-shrink: 0;
}

.diet-check-done {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.diet-check-done .iconfont {
  font-size: 28rpx;
  color: #fff;
}

/* Travel Styles */
.lc-asset-card {
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.1);
  margin-bottom: 24rpx;
}

.travel-asset { background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); }

.asset-inner {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}

.asset-left { display: flex; flex-direction: column; }

.asset-label {
  font-size: 20rpx;
  opacity: 0.7;
}

.asset-value {
  font-size: 60rpx;
  font-weight: 900;
  margin-top: 4rpx;
  line-height: 1;
}

.travel-rank-tag {
  display: inline-block;
  margin-top: 24rpx;
  background: rgba(255,255,255,0.2);
  padding: 8rpx 20rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  position: relative;
  z-index: 1;
}

.travel-lbs-card {
  background: #eff6ff;
  border-radius: 32rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  border: 2rpx solid #dbeafe;
  margin-bottom: 24rpx;
}

.lbs-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  background: #3b82f6;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.lbs-dot {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  width: 20rpx;
  height: 20rpx;
  background: #3b82f6;
  border-radius: 50%;
}

.lbs-icon-wrap .iconfont { font-size: 48rpx; color: #fff; }

.lbs-content { flex: 1; }

.lbs-title {
  display: block;
  font-size: 22rpx;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 4rpx;
}

.lbs-desc {
  display: block;
  font-size: 18rpx;
  color: #60a5fa;
}

.travel-list { display: flex; flex-direction: column; gap: 16rpx; }

.travel-item {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.travel-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.travel-icon .iconfont { font-size: 48rpx; }

.indigo-icon { background: #eef2ff; }
.indigo-icon .iconfont { color: #4f46e5; }
.green-icon { background: #ecfdf5; }
.green-icon .iconfont { color: #059669; }
.orange-icon-sm { background: #fff7ed; }
.orange-icon-sm .iconfont { color: #ea580c; }
.purple-icon-sm { background: #f5f3ff; }
.purple-icon-sm .iconfont { color: #7c3aed; }
.cyan-icon-sm { background: #ecfeff; }
.cyan-icon-sm .iconfont { color: #0891b2; }
.rose-icon-sm { background: #fff1f2; }
.rose-icon-sm .iconfont { color: #e11d48; }

.travel-info { flex: 1; }

.travel-name {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.travel-desc {
  display: block;
  font-size: 20rpx;
  color: #9ca3af;
}

/* Life Styles */
.life-asset { background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%); }

.life-recycle-tag {
  display: inline-block;
  margin-top: 16rpx;
  background: rgba(255,255,255,0.2);
  padding: 6rpx 16rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
}

/* 子功能页签 */
.life-sub-tabs {
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  margin-top: 32rpx;
}

.life-sub-divider {
  width: 2rpx;
  height: 28rpx;
  background: #E5E7EB;
  flex-shrink: 0;
}

.life-sub-tab {
  font-size: 26rpx;
  font-weight: 400;
  color: #9CA3AF;
  padding: 12rpx 20rpx;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.life-tab-line {
  display: none;
  width: 60rpx;
  height: 6rpx;
  margin-top: 6rpx;
  background: linear-gradient(135deg, #7c3aed, #a855f7, #c084fc);
  border-radius: 3rpx;
  box-shadow: 0 0 12rpx rgba(124, 58, 237, 0.5);
}

/* 激活态 */
.life-sub-tab-active {
  font-size: 30rpx;
  font-weight: 700;
  color: #7c3aed;
}

.life-sub-tab-active .life-tab-line {
  display: block;
}

/* 垃圾分类 AI 核验 */
.life-ai-card {
  margin: 32rpx 30rpx;
  padding: 24rpx;
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border-radius: 32rpx;
  border: 4rpx solid #e9d5ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.life-ai-left {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.life-ai-icon {
  width: 80rpx;
  height: 80rpx;
  background: #7c3aed;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.life-ai-icon .iconfont {
  font-size: 40rpx;
  color: #fff;
}

.life-ai-content {
  display: flex;
  flex-direction: column;
}

.life-ai-title {
  font-size: 24rpx;
  font-weight: bold;
  color: #6b21a8;
}

.life-ai-desc {
  font-size: 18rpx;
  color: #9333ea;
  margin-top: 4rpx;
}

.life-ai-btn {
  background: #7c3aed;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  padding: 16rpx 32rpx;
  border-radius: 20rpx;
  border: none;
}

.life-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12rpx;
}

.life-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  display: flex;
  flex-direction: column;
}

.life-card-icon {
  font-size: 48rpx;
  margin-bottom: 12rpx;
}

.life-card-icon.indigo { color: #4f46e5; }
.life-card-icon.emerald { color: #059669; }
.life-card-icon.green { color: #22c55e; }
.life-card-icon.blue { color: #3b82f6; }

.life-card-name {
  font-size: 24rpx;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4rpx;
}

.life-card-desc {
  font-size: 18rpx;
  color: #9ca3af;
  margin-bottom: 16rpx;
}

.life-card-btn {
  width: 100%;
  border: 2rpx solid #e0e7ff;
  color: #4f46e5;
  font-size: 18rpx;
  font-weight: bold;
  padding: 12rpx;
  border-radius: 12rpx;
  background: none;
  margin-top: auto;
}

.green-btn { border-color: #d1fae5; color: #059669; }
.blue-btn-sm { border-color: #dbeafe; color: #3b82f6; }

.life-card-dark {
  background: #1f2937;
  color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column: span 2;
}

.dark-inner { flex: 1; }

.dark-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 12rpx;
}

.dark-tags { display: flex; gap: 24rpx; }

.dark-tag {
  display: flex;
  align-items: center;
  gap: 6rpx;
}

.dark-tag .iconfont {
  font-size: 24rpx;
  color: #60a5fa;
}

.dark-tag .iconfont:last-child { color: #fbbf24; }

.dark-tag-text {
  font-size: 20rpx;
  color: #d1d5db;
}

.dark-btn {
  background: #7c3aed;
  color: #fff;
  font-size: 18rpx;
  font-weight: bold;
  padding: 12rpx 24rpx;
  border-radius: 16rpx;
  border: none;
  flex-shrink: 0;
}

.life-card-wide {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-column: span 2;
}

.wide-icon-wrap {
  width: 80rpx;
  height: 80rpx;
  background: #f3f4f6;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wide-icon-wrap .iconfont { font-size: 36rpx; color: #9ca3af; }

.wide-info { flex: 1; margin-left: 16rpx; }

.wide-check {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 4rpx solid #8b5cf6;
  flex-shrink: 0;
}

/* Dorm tab */
.dorm-room-card {
  background: #fff; border-radius: 32rpx; padding: 32rpx; margin: 24rpx;
  display: flex; justify-content: space-between; align-items: flex-end;
}
.room-label {
  display: block; font-size: 24rpx; color: #94a3b8;
  margin-bottom: 8rpx;
}
.room-name { display: block; font-size: 48rpx; font-weight: 900; color: #1f2937; }
.room-rank { display: flex; align-items: center; gap: 6rpx; }
.rank-icon { font-size: 28rpx; color: #22c55e; }
.rank-text { font-size: 24rpx; font-weight: 700; color: #22c55e; }
.dorm-ac-card {
  margin: 0 24rpx 24rpx; background: #eff6ff; border-radius: 32rpx;
  padding: 32rpx; overflow: hidden;
}
.ac-top {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 32rpx;
}
.ac-left { display: flex; align-items: center; gap: 16rpx; }
.ac-icon-wrap {
  width: 64rpx; height: 64rpx; background: #3b82f6; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.ac-icon-wrap .iconfont { font-size: 32rpx; color: #fff; }
.ac-label { font-size: 28rpx; font-weight: 700; color: #374151; }
.ac-toggle {
  width: 96rpx; height: 48rpx; background: #e5e7eb; border-radius: 24rpx;
  position: relative; padding: 6rpx;
}
.toggle-thumb {
  width: 36rpx; height: 36rpx; background: #fff; border-radius: 50%;
  position: absolute; right: 6rpx; top: 6rpx;
  box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1); transition: right 0.2s;
}
.toggle-thumb.on { right: 48rpx; }
.ac-dial-wrap { display: flex; justify-content: center; margin-bottom: 24rpx; }
.ac-dial {
  width: 256rpx; height: 256rpx; border-radius: 50%;
  border: 8rpx solid rgba(255,255,255,0.5);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #f59e0b, #3b82f6);
  background-size: 200% 200%; animation: dialGradient 6s linear infinite;
}
@keyframes dialGradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.ac-temp-num { font-size: 72rpx; font-weight: 900; color: #1d4ed8; }
.ac-temp-unit { font-size: 28rpx; color: #1d4ed8; margin-top: -8rpx; }
.ac-temp-sub { font-size: 20rpx; color: #93c5fd; margin-top: 4rpx; }
.ac-hint {
  background: rgba(59,130,246,0.1); border-radius: 24rpx;
  padding: 20rpx 24rpx; display: flex; align-items: center; gap: 12rpx;
}
.ac-hint-icon { font-size: 28rpx; color: #3b82f6; }
.ac-hint-text { font-size: 20rpx; color: #1e40af; }
.dorm-section-title {
  margin: 0 24rpx 24rpx; font-size: 28rpx; font-weight: 700; color: #1f2937;
}
.dorm-checkin-card {
  margin: 0 24rpx 16rpx; background: #fff; border-radius: 24rpx;
  padding: 24rpx; display: flex; align-items: center;
  justify-content: space-between; border: 1px solid #f9fafb;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
}
.dorm-checkin-card.done { opacity: 0.6; }
.checkin-left { display: flex; align-items: center; gap: 20rpx; }
.checkin-icon-wrap {
  width: 80rpx; height: 80rpx; border-radius: 16rpx;
  display: flex; align-items: center; justify-content: center;
}
.checkin-icon-wrap .iconfont { font-size: 36rpx; }
.checkin-icon-wrap.yellow { background: #fefce8; }
.checkin-icon-wrap.yellow .iconfont { color: #eab308; }
.checkin-icon-wrap.blue { background: #eff6ff; }
.checkin-icon-wrap.blue .iconfont { color: #3b82f6; }
.checkin-icon-wrap.indigo { background: #eef2ff; }
.checkin-icon-wrap.indigo .iconfont { color: #6366f1; }
.checkin-icon-wrap.rose { background: #fff1f2; }
.checkin-icon-wrap.rose .iconfont { color: #f43f5e; }
.checkin-info { display: flex; flex-direction: column; gap: 4rpx; }
.checkin-title { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.checkin-desc { font-size: 20rpx; color: #9ca3af; }
.checkin-btn-active {
  background: #22c55e; color: #fff; font-size: 22rpx; font-weight: 700;
  padding: 12rpx 28rpx; border-radius: 50rpx; border: none;
  box-shadow: 0 4rpx 12rpx rgba(34,197,94,0.3);
}
.checkin-btn-outline {
  background: transparent; color: #22c55e; font-size: 22rpx;
  font-weight: 700; padding: 12rpx 28rpx; border-radius: 50rpx; border: 2rpx solid #22c55e;
}
.checkin-btn-done {
  background: #f3f4f6; color: #9ca3af; font-size: 22rpx;
  font-weight: 700; padding: 12rpx 28rpx; border-radius: 50rpx; font-style: italic;
}
.dorm-rank-card {
  margin: 32rpx 24rpx; background: #0f172a; border-radius: 32rpx; padding: 32rpx;
}
.rank-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24rpx;
}
.rank-title { font-size: 28rpx; font-weight: 700; color: #fff; }
.rank-arrow { font-size: 32rpx; color: #64748b; }
.rank-item {
  display: flex; align-items: center; gap: 16rpx; margin-bottom: 20rpx;
}
.rank-item:last-child { margin-bottom: 0; }
.rank-num {
  font-size: 28rpx; font-weight: 900; font-style: italic;
  width: 48rpx; text-align: center;
}
.rank-num-gold { color: #fbbf24; }
.rank-num-gray { color: #64748b; }
.rank-bar-wrap { flex: 1; }
.rank-bar-label { display: flex; justify-content: space-between; margin-bottom: 8rpx; }
.rank-name { font-size: 20rpx; color: #94a3b8; }
.rank-val { font-size: 20rpx; color: #94a3b8; }
.rank-bar {
  width: 100%; height: 8rpx; background: rgba(255,255,255,0.1);
  border-radius: 4rpx; overflow: hidden;
}
.rank-bar-fill { height: 100%; border-radius: 4rpx; }
.rank-bar-fill.green {
  width: 85%; background: #22c55e; box-shadow: 0 0 16rpx rgba(34,197,94,0.6);
}
.rank-bar-fill.gray { width: 80%; background: rgba(255,255,255,0.4); }

/* Study tab */
.study-achievement-card {
  margin: 24rpx; background: linear-gradient(135deg, #fb923c, #f97316);
  border-radius: 32rpx; padding: 32rpx; color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(249, 115, 22, 0.2);
}
.achievement-header {
  display: flex; align-items: center; gap: 12rpx; margin-bottom: 16rpx;
}
.achievement-icon { font-size: 32rpx; }
.achievement-label { font-size: 26rpx; font-weight: 500; opacity: 0.9; }
.achievement-num {
  display: flex; align-items: baseline; gap: 12rpx; margin-bottom: 16rpx;
}
.achievement-big { font-size: 80rpx; font-weight: 900; }
.achievement-unit { font-size: 26rpx; opacity: 0.9; }
.achievement-sub { font-size: 22rpx; opacity: 0.75; }
.study-grid {
  margin: 0 24rpx 24rpx; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16rpx;
}
.study-grid-card {
  background: #f9fafb; border-radius: 24rpx; padding: 28rpx;
  display: flex; flex-direction: column; align-items: center; border: 1px solid #f3f4f6;
}
.study-grid-icon {
  width: 80rpx; height: 80rpx; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; margin-bottom: 12rpx;
}
.study-grid-icon .iconfont { font-size: 36rpx; }
.study-grid-icon.green { background: #f0fdf4; }
.study-grid-icon.green .iconfont { color: #16a34a; }
.study-grid-icon.blue { background: #eff6ff; }
.study-grid-icon.blue .iconfont { color: #2563eb; }
.study-grid-icon.purple { background: #faf5ff; }
.study-grid-icon.purple .iconfont { color: #9333ea; }
.study-grid-icon.amber { background: #fffbeb; }
.study-grid-icon.amber .iconfont { color: #d97706; }
.study-grid-name {
  font-size: 26rpx; font-weight: 700; color: #374151; margin-bottom: 4rpx;
}
.study-grid-desc { font-size: 18rpx; color: #9ca3af; }
.study-section-header {
  margin: 0 24rpx 16rpx; display: flex; justify-content: space-between; align-items: center;
}
.study-section-title { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.study-tag-group { display: flex; gap: 8rpx; }
.study-tag-active {
  background: #22c55e; color: #fff; font-size: 20rpx; font-weight: 700;
  padding: 6rpx 16rpx; border-radius: 50rpx;
}
.study-tag {
  background: #f3f4f6; color: #9ca3af; font-size: 20rpx; font-weight: 700;
  padding: 6rpx 16rpx; border-radius: 50rpx;
}
.study-book-card {
  margin: 0 24rpx 16rpx; display: flex; gap: 16rpx;
  background: #f9fafb; border-radius: 24rpx; padding: 16rpx;
}
.book-cover { width: 120rpx; height: 144rpx; border-radius: 16rpx; flex-shrink: 0; }
.book-info {
  flex: 1; display: flex; flex-direction: column; justify-content: space-between;
}
.book-top { display: flex; flex-direction: column; gap: 6rpx; }
.book-title { font-size: 28rpx; font-weight: 700; color: #1f2937; }
.book-meta { font-size: 20rpx; color: #9ca3af; }
.book-bottom { display: flex; justify-content: space-between; align-items: center; }
.book-price { font-size: 26rpx; font-weight: 700; color: #16a34a; }
.book-price.orange { color: #ea580c; }
.book-btn {
  background: #1f2937; color: #fff; font-size: 20rpx; font-weight: 700;
  padding: 8rpx 24rpx; border-radius: 50rpx; border: none; line-height: 1.8;
}
.study-doc-section { margin: 32rpx 24rpx 0; }
.study-doc-list {
  margin-top: 16rpx; display: flex; flex-direction: column; gap: 12rpx;
}
.study-doc-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20rpx; border: 1px solid #f3f4f6; border-radius: 20rpx;
}
.doc-left { display: flex; align-items: center; gap: 16rpx; }
.doc-icon-pdf { font-size: 48rpx; color: #ef4444; }
.doc-icon-word { font-size: 48rpx; color: #3b82f6; }
.doc-info { display: flex; flex-direction: column; gap: 4rpx; }
.doc-name { font-size: 22rpx; font-weight: 700; color: #374151; }
.doc-meta { font-size: 18rpx; color: #9ca3af; }
.doc-download { font-size: 48rpx; color: #d1d5db; }

/* Dorm tab - 完全匹配 energy.html */
.energy-chart-wrap { padding: 24rpx; }
.energy-chart-card {
  background: #fff; border-radius: 24rpx; padding: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.energy-chart-title {
  display: block; font-size: 22rpx; font-weight: 700; color: #1f2937; margin-bottom: 16rpx;
}
.energy-bar-group {
  display: flex; align-items: flex-end; justify-content: space-around;
  height: 160rpx; padding: 0 8rpx;
}
.energy-bar-item {
  display: flex; flex-direction: column; align-items: center;
  justify-content: flex-end; gap: 8rpx; flex: 1;
}
.energy-bar {
  width: 36rpx; border-radius: 10rpx; min-height: 10rpx;
}
.energy-bar-label { font-size: 20rpx; color: #9ca3af; }

.dorm-sub-title {
  display: block; padding: 8rpx 24rpx; margin-bottom: 16rpx;
  font-size: 26rpx; font-weight: 700; color: #1f2937;
}

.dorm-quick-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 16rpx;
  padding: 0 24rpx; margin-bottom: 16rpx;
}
.dorm-quick-card {
  background: #fff; border-radius: 32rpx; padding: 24rpx;
  display: flex; flex-direction: column; align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.dorm-quick-icon { font-size: 56rpx; margin-bottom: 8rpx; }
.dorm-quick-icon.yellow { color: #fbbf24; }
.dorm-quick-icon.blue { color: #60a5fa; }
.dorm-quick-name {
  font-size: 22rpx; font-weight: 700; color: #374151; margin-bottom: 4rpx;
}
.dorm-quick-desc { font-size: 18rpx; color: #9ca3af; margin-bottom: 12rpx; }
.dorm-quick-btn {
  width: 100%; padding: 12rpx; border-radius: 16rpx;
  font-size: 18rpx; font-weight: 700; margin-top: 8rpx;
}
.dorm-quick-btn.done-btn { background: #fbbf24; color: #fff; border: none; }
.dorm-quick-btn.outline-btn {
  background: transparent; color: #60a5fa; border: 2rpx solid #60a5fa;
}

.dorm-monitor-list {
  padding: 0 24rpx; margin-bottom: 16rpx; display: flex; flex-direction: column; gap: 12rpx;
}
.dorm-monitor-item {
  background: #fff; border-radius: 24rpx; padding: 20rpx 24rpx;
  display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
}
.dorm-monitor-left { display: flex; align-items: center; gap: 16rpx; }
.dorm-monitor-icon { font-size: 44rpx; }
.dorm-monitor-icon.emerald { color: #10b981; }
.dorm-monitor-icon.indigo { color: #6366f1; }
.dorm-monitor-name { font-size: 22rpx; font-weight: 700; color: #374151; }
.dorm-monitor-check { font-size: 44rpx; }
.dorm-monitor-check.emerald { color: #10b981; }
.dorm-monitor-hint {
  font-size: 18rpx; color: #9ca3af; font-style: italic;
}

.dorm-pk-card {
  margin: 0 24rpx 16rpx;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  border-radius: 32rpx; padding: 24rpx; color: #fff;
}
.dorm-pk-title { font-size: 22rpx; font-weight: 700; margin-bottom: 16rpx; }
.dorm-pk-row {
  display: flex; justify-content: space-between; align-items: flex-end;
}
.dorm-pk-hint { font-size: 18rpx; opacity: 0.7; margin-bottom: 4rpx; }
.dorm-pk-rank {
  font-size: 36rpx; font-weight: 900; font-style: italic;
}
.dorm-pk-btn {
  background: rgba(255,255,255,0.2); color: #fff;
  font-size: 18rpx; font-weight: 700; padding: 8rpx 20rpx;
  border-radius: 50rpx; border: none;
}

.dorm-tips {
  padding: 0 24rpx; margin-bottom: 16rpx; display: flex; flex-direction: column; gap: 12rpx;
}
.dorm-tip {
  border-radius: 20rpx; padding: 16rpx 20rpx;
  display: flex; align-items: center; gap: 16rpx;
}
.dorm-tip.yellow-tip { background: #fefce8; }
.dorm-tip.green-tip { background: #f0fdf4; }
.tip-num {
  width: 48rpx; height: 48rpx; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.tip-num.yellow-num { background: #fde68a; }
.tip-num.yellow-num text { color: #a16207; font-size: 20rpx; font-weight: 700; }
.tip-num.green-num { background: #bbf7d0; }
.tip-num.green-num text { color: #15803d; font-size: 20rpx; font-weight: 700; }
.tip-text { font-size: 20rpx; color: #374151; flex: 1; }

.dorm-calc-btn-wrap { padding: 0 24rpx 32rpx; }
.dorm-calc-btn {
  width: 100%; background: #fff; border: 4rpx dashed #d1d5db;
  padding: 28rpx; border-radius: 32rpx;
  font-size: 22rpx; font-weight: 700; color: #9ca3af;
  display: flex; align-items: center; justify-content: center; gap: 12rpx;
}
.dorm-calc-btn .iconfont { font-size: 36rpx; }
</style>
