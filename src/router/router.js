const routes = [
  {
    path: '/',
    component: resolve => require(['@/components/login.vue'], resolve),
  }, { // 登录页面
    path: '/login',
    component: resolve => require(['@/components/login.vue'], resolve),
    meta: {
      required: false,  // 添加该字段，表示进入这个路由是需要登录的
    },
  }, { // 主页
    path: '/index',
    component: resolve => require(['@/views/index/index.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 平台管理页面
    path: '/manger',
    component: resolve => require(['@/views/Manger/manger.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 我的页面
    path: '/mine',
    component: resolve => require(['@/views/Mine/mine.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 代理信息
    path: '/QueryAgent',
    component: resolve => require(['@/views/Manger/Agent/QueryAgent.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 代理结算信息
    path: '/settleaccount',
    component: resolve => require(['@/views/Manger/Agent/settleaccount.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 代理录入
    path: '/entry',
    component: resolve => require(['@/views/Manger/Agent/entry.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 录入代理信息成功页面
    path: '/successedPage',
    component: resolve => require(['@/views/Manger/Agent/successedPage.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 代理利润页面
    path: '/agentProfit',
    component: resolve => require(['@/views/Manger/Agent/agentProfit.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 代理利润详情页面
    path: '/checkedIn',
    name: 'checkedIn',
    component: resolve => require(['@/views/Manger/Agent/checkedIn.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 商户信息页面
    path: '/BusinessInformation',
    component: resolve => require(['@/views/Manger/Agent/BusinessInformation.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 代理详细页面
    path: '/AgentDetails',
    name: 'AgentDetails',
    component: resolve => require(['@/views/Manger/Agent/AgentDetails.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 押金返现页面
    path: '/retrunDeposit',
    component: resolve => require(['@/views/Manger/Agent/retrunDeposit.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 业务配置页面
    path: '/BusinessConfiguration',
    component: resolve => require(['@/views/Manger/Agent/BusinessConfiguration.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // MOPS活动页面
    path: '/MPOSactivity',
    component: resolve => require(['@/views/Manger/Agent/MPOSactivity.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 代理信息导航栏页面
    path: '/agentTab',
    component: resolve => require(['@/components/agentTab.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 会员交易页面
    path: '/tradeOrder',
    component: resolve => require(['@/views/Manger/Order/tradeOrder.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 交易订单页面
    path: '/memberDeal',
    component: resolve => require(['@/views/Manger/Order/memberDeals.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 会员信息页面
    path: '/memberInfo',
    component: resolve => require(['@/views/Manger/Order/memberInfo.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 返现活动页面
    path: '/cashBack',
    component: resolve => require(['@/views/Manger/Order/cashBack.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 会员信息页面
    path: '/searchPage',
    component: resolve => require(['@/views/Manger/Order/searchPage.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 交易详情页面
    path: '/dealDetail',
    component: resolve => require(['@/views/Manger/Order/dealDetail.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 终端信息页面
    path: '/terminalInfo',
    component: resolve => require(['@/views/Manger/Terminal/terminalInfo.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 终端转移页面
    path: '/removeTerminal',
    component: resolve => require(['@/views/Manger/Terminal/removeTerminal.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 实名认证页面
    path: '/Identification',
    component: resolve => require(['@/views/Mine/Identification/Identification.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 实名认证页面
    path: '/back',
    component: resolve => require(['@/views/Mine/Identification/back.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 实名认证页面
    path: '/submitImgPage',
    component: resolve => require(['@/views/Mine/Identification/submitImgPage.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 实名认证状态页面
    path: '/statusPages',
    component: resolve => require(['@/views/Mine/Identification/statusPages.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 实名认证提交页面
    path: '/submitSuccessPage',
    component: resolve => require(['@/views/Mine/Identification/submitSuccessPage.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 消息通知页面
    path: '/Notification',
    component: resolve => require(['@/views/Mine/Notification/Notification.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 排行榜页面
    path: '/Ranking',
    component: resolve => require(['@/views/Mine/Ranking/Ranking.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 设置页面
    path: '/Setting',
    component: resolve => require(['@/views/Mine/Setting/Setting.vue'], resolve),
    meta: {
      required: true,
    }
  }, {
    // 设置页面
    path: '/forgetPWD',
    component: resolve => require(['@/views/Mine/Setting/forgetPWD.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 钱包页面
    path: '/Wallet',
    component: resolve => require(['@/views/Mine/Wallet/Wallet.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 银行卡管理页面
    path: '/BKManagement',
    component: resolve => require(['@/views/Mine/Wallet/bankCards/BKManagement.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 添加银行卡页面
    path: '/addBankCards',
    component: resolve => require(['@/views/Mine/Wallet/bankCards/addBankCards.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 银行卡明细页面
    path: '/transactionDetails',
    name: 'transactionDetails',
    component: resolve => require(['@/views/Mine/Wallet/bankCards/transactionDetails.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 提现页面
    path: '/withDraw',
    component: resolve => require(['@/views/Mine/Wallet/withDraw/withDraw.vue'], resolve),
    meta: {
      required: true,
    }
  }, { // 提现进度查询页面
    path: '/followUp',
    component: resolve => require(['@/views/Mine/Wallet/withDraw/followUp.vue'], resolve),
    meta: {
      required: true,
    }
  },
]

export default routes