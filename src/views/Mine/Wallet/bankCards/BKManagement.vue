<template>
  <div class="BKManagement">
    <!-- =============    银 行 卡 管 理 页 面     ============== -->
    <mt-header title="银 行 卡 管 理" fixed>
      <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      <mt-button slot="right" class="detail" @click="addBankCards()">
        <img src="@/assets/image/Mine/Wallet/Add.png">
      </mt-button>
    </mt-header>
    <!-- 列表 -->
    <div class="BankCardsList">
      <!-- 银行卡 -->
      <li v-for="(item, index) in bankLists" :key="item.index" class="li1" v-show="item.id==2" @click="goToBankDealDetail(index)">
        <p>
          <img src="@/assets/image/Mine/Wallet/ic.png">
        </p>
        <p>
          {{item.title}}
          <span>{{item.status}}</span>
        </p>
        <p>{{item.type}}</p>
        <p>{{item.bankNumber}}</p>
      </li>
      <li v-for="(item, index) in bankLists" :key="item.index" class="li2" v-show="item.id==1" @click="goToBankDealDetail(index)">
        <p>
          <img src="@/assets/image/Mine/Wallet/ic.png">
        </p>
        <p>
          {{item.title}}
          <span>{{item.status}}</span>
        </p>
        <p>{{item.type}}</p>
        <p>{{item.bankNumber}}</p>
      </li>
      <li></li>
    </div>
    <div class="BankCardsBottom">
      <!-- 底部 -->
      <p>
        <img src="@/assets/image/Mine/Wallet/visa.png">申请信用卡
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "BKManagement",
  data() {
    return {
      bankLists: [
        {
          title: "中国工商银行",
          status: "审核中",
          type: "储蓄卡",
          bankNumber: "**** **** **** 3560",
          id: "1"
        },
        {
          title: "中国建设银行",
          status: "审核中",
          type: "储蓄卡",
          bankNumber: "**** **** **** 3560",
          id: "2"
        },
        {
          title: "中国建设银行",
          status: "审核中",
          type: "储蓄卡",
          bankNumber: "**** **** **** 3560",
          id: "1"
        },
        {
          title: "中国工商银行",
          status: "审核中",
          type: "储蓄卡",
          bankNumber: "**** **** **** 3560",
          id: "2"
        },
        {
          title: "中国工商银行",
          status: "审核中",
          type: "储蓄卡",
          bankNumber: "**** **** **** 3560",
          id: "2"
        }
      ]
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    addBankCards() {
      this.$router.push("/addBankCards");
    },
    goToBankDealDetail(){
      this.$router.push("/transactionDetails")
    }
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
  font-size: 0.4rem;
}
.detail {
  font-size: 0.3rem;
  margin-right: 0.3rem;
  img {
    width: 0.5rem;
  }
}
.BankCardsList {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 1.2rem;
  bottom: 1.2rem;
  background: #f1f9ff;
  li {
    width: 95%;
    height: 2.5rem;
    border-radius: 5px; /* no */
    margin: 0.3rem auto;
    padding-top: 0.5rem;
    p:nth-child(1) {
      width: 1rem;
      height: 2.5rem;
      float: left;
      margin-right: 1rem;
      img {
        width: 1rem;
        margin-left: 0.5rem;
      }
    }
    p:nth-child(3) {
      font-size: 0.35rem;
    }
    p {
      height: 0.7rem;
      font-size: 0.4rem;
      color: #fff;
      span {
        float: right;
        margin-right: 0.5rem;
      }
    }
  }
  .li1 {
    background: url("~@/assets/image/Mine/Wallet/BankBule.png") no-repeat;
    background-size: 100% 100%;
  }
  .li2 {
    background: url("~@/assets/image/Mine/Wallet/BankRed.png") no-repeat;
    background-size: 100% 100%;
  }
}
.BankCardsBottom {
  position: fixed;
  height: 1.2rem;
  width: 100%;
  bottom: 0;
  background: #1c8cff;
  line-height: 1.2rem;
  text-align: center;
  color: #fff;
  font-size: 0.4rem;
  p {
    letter-spacing: 0.05rem;
    img {
      vertical-align: middle;
      width: 0.6rem;
      margin-right: 0.2rem;
    }
  }
}
</style>
<style lang="less">
.mint-header-title {
  overflow: visible !important;
}
.mintui {
  font-size: 0.4rem;
}
</style>
