<template>
  <div class="Wallet">
    <!-- =================      我 的 钱 包 页 面        ================= -->
    <mt-header title="我 的 钱 包" fixed v-show="current==1 || current==2">
      <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      <mt-button slot="right" class="detail" @click="current=3">明细</mt-button>
    </mt-header>
    <!-- 账户余额 -->
    <div class="Balance" v-show="current==1 || current==2">
      <p>
        <img src="@/assets/image/Mine/ic-balance.png">账户余额
      </p>
      <p>￥55069.58</p>
      <ul>
        <li @click="goToBankCardPages()">银行卡</li>
        <li @click="goTowithDrawPages()">提现</li>
      </ul>
    </div>
    <!-- 自营余额 & 下级余额 -->
    <div class="remaining" v-show="current==1 || current==2">
      <ul>
        <li @click="current=1" :class="{'curr':current == 1}">自营余额
          <p v-show="current==1"></p>
        </li>
        <li @click="current=2" :class="{'curr':current == 2}">下级余额
          <p v-show="current==2"></p>
        </li>
      </ul>
    </div>
    <!-- 详细 -->
    <div class="remaining_detail" v-show="current==1 || current==2">
      <li>总余额(元)</li>
      <li v-if="current==1">25600.58</li>
      <li v-if="current==2">28888.58</li>
      <ul class="left">
        <p>服务费返现(元)</p>
        <p v-if="current==1">25600.58</p>
        <p v-if="current==2">28888.58</p>
        <p>激活奖励(元)</p>
        <p v-if="current==1">25600.58</p>
        <p v-if="current==2">28888.58</p>
      </ul>
      <ul class="right">
        <p>刷卡奖励(元)</p>
        <p v-if="current==1">25600.58</p>
        <p v-if="current==2">28888.58</p>
        <p>分润收益(元)</p>
        <p v-if="current==1">25600.58</p>
        <p v-if="current==2">28888.58</p>
      </ul>
    </div>
    <!-- 资金明细 -->
    <financialDetail v-show="current==3"></financialDetail>
  </div>
</template>
<script>
import financialDetail from "@/views/Mine/Wallet/financialDetail.vue";
export default {
  name: "Wallet",
  data() {
    return {
      current: 1
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    goToBankCardPages(){
      this.$router.push('/BKManagement')
    },
    goTowithDrawPages(){
       this.$router.push('/withDraw')
    }
  },
  /* 注册组件 */
  components: {
    financialDetail
  }
};
</script>
<style lang="less" scoped>
@blue: #1c8cff;
/* 头部 */
.mint-header {
  height: 1.2rem;
  font-size: 0.4rem;
  font-weight: 100;
  background: @blue;
}
.header_left {
  margin-left: 0.3rem;
}
.detail {
  font-size: 0.3rem;
  margin-right: 0.3rem;
}
/* 账户余额 */
.Balance {
  width: 100%;
  position: absolute;
  top: 1.2rem;
  height: 4rem;
  background: @blue;
  text-align: center;
  color: #fff;
  img {
    width: 0.5rem;
    vertical-align: middle;
    margin-right: 0.1rem;
  }
  p {
    width: 100%;
    margin-top: 0.3rem;
    font-size: 0.35rem;
  }
  p:nth-child(2) {
    font-size: 0.5rem;
  }
  p:nth-child(1) {
    margin-top: 0.5rem;
  }
  ul {
    width: 100%;
    height: 1rem;
    position: absolute;
    bottom: 0.3rem;
    li {
      height: 1rem;
      width: 50%;
      float: left;
      line-height: 1rem;
      font-size: 0.4rem;
      vertical-align: middle;
      img {
        width: 0.6rem;
        margin-right: 0.2rem;
      }
    }
    li:nth-child(1) {
      border-right: 1px solid #8accff; /* no */
      width: 48.7%;
      background: url("~@/assets/image/Mine/ic-bank.png") no-repeat;
      background-position: 25% center;
      background-size: 0.6rem;
    }
    li:nth-child(2) {
      background: url("~@/assets/image/Mine/ic-put.png") no-repeat;
      background-position: 30% center;
      background-size: 0.6rem;
    }
  }
}
/* 自营余额 & 下级余额 */
.remaining {
  width: 100%;
  height: 1.2rem;
  position: absolute;
  top: 5.2rem;
  ul {
    li {
      width: 50%;
      height: 1.2rem;
      line-height: 1.2rem;
      float: left;
      text-align: center;
      color: #9b9b9b;
      font-size: 0.4rem;
      p {
        width: 10%;
        height: 0.05rem;
        background: #1c8cff;
        margin: 0 auto;
      }
    }
  }
  .curr {
    color: #1c8cff;
  }
}
.remaining_detail {
  width: 100%;
  height: 7rem;
  position: absolute;
  top: 6.42rem;
  background: #f5f5f5;
  text-align: center;
  li {
    width: 100%;
    font-size: 0.4rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #1c8cff;
  }
  li:nth-child(1) {
    margin-top: 1rem;
    color: #70b4f0;
  }
  li:nth-child(2) {
    margin-top: 0.3rem;
    font-size: 0.5rem;
  }
  ul {
    width: 50%;
    height: 3rem;
    float: left;
    margin-top: 1rem;
  }
  .left {
    width: 48.7%;
    border-right: 1px solid #d9d9d9; /* no */
    p {
      width: 100%;
      font-size: 0.35rem;
      color: #9b9b9b;
    }
    p:nth-child(2) {
      color: #606060;
      font-size: 0.45rem;
      margin-top: 0.3rem;
    }
    p:nth-child(3) {
      margin-top: 0.8rem;
    }
    p:nth-child(4) {
      color: #606060;
      font-size: 0.45rem;
      margin-top: 0.3rem;
    }
  }
  .right {
    p {
      width: 100%;
      font-size: 0.35rem;
      color: #9b9b9b;
    }
    p:nth-child(2) {
      color: #606060;
      font-size: 0.45rem;
      margin-top: 0.3rem;
    }
    p:nth-child(3) {
      margin-top: 0.8rem;
    }
    p:nth-child(4) {
      color: #606060;
      font-size: 0.45rem;
      margin-top: 0.3rem;
    }
  }
}
</style>
<style lang="less">
.mint-header-title {
  height: 1rem;
  line-height: 1rem;
}
</style>
