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
    <div class="BankCardsList" v-if="showbanklist == true">
      <!-- 银行卡 -->
      <li
        v-for="(item, index) in deviceList"
        :key="item.index"
        class="li2"
        v-show="item.cardType==0"
        @click="goToBankDealDetail(index,item)"
      >
        <p>
          <img :src="item.iconPath">
        </p>
        <p>
          {{item.bankName}}
          <span v-if="item.status == 0">待验证</span>
          <span v-if="item.status == 1">验证通过</span>
          <span v-if="item.status == 2">验证不通过</span>
          <span v-if="item.status == 3">已解绑</span>
        </p>
        <p v-if="item.cardType==0">个人账户</p>
        <p v-if="item.cardType==1">企业账户</p>
        <p>{{item.cardNo}}</p>
      </li>
      <li
        v-for="(item, index) in deviceList"
        :key="index"
        class="li1"
        @click="goToBankDealDetail(index)"
        v-show="item.cardType==1"
      >
        <p>
          <img :src="item.iconPath">
        </p>
        <p>
          {{item.bankName}}
          <span v-if="item.status == 0">待验证</span>
          <span v-if="item.status == 1">验证通过</span>
          <span v-if="item.status == 2">验证不通过</span>
          <span v-if="item.status == 3">已解绑</span>
        </p>
        <p v-if="item.cardType==0">个人账号</p>
        <p v-if="item.cardType==1">企业账号</p>
        <p>{{item.cardNo}}</p>
      </li>
      <li></li>
    </div>
    <div class="noNotification" v-if="nothing == true">
      <img src="@/assets/image/Mine/nothing.png">
      <p>还没有添加银行卡~</p>
    </div>
    <div class="BankCardsBottom">
      <!-- 底部 -->
      <p @click="CAPION()">
        <img src="@/assets/image/Mine/Wallet/visa.png">申请信用卡
      </p>
    </div>
  </div>
</template>
<script>
import { MessageBox, Toast } from "mint-ui";
import "@/CSS/alert.css";
import {
  returnAuthStatus,
  checkToken,
  getRefreshToken,
  BASE_URL
} from "@/api/api.js";
const axios = require("axios");
export default {
  name: "BKManagement",
  data() {
    return {
      pageNumber: 0, // 当前页
      deviceList: [], // 银行卡数据列表
      nothing: false, //没有数据
      showbanklist: true // 银行卡数据
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    addBankCards() {
      this.$router.push("/addBankCards");
    },
    goToBankDealDetail(index, item) {
      console.log(index);
      console.log(item);
      this.$router.push({
        name: "transactionDetails",
        params: {
          id: index,
          item: item
        }
      });
    },
    CAPION() {
      MessageBox("暂未开放");
    }
  },
  mounted() {
    getRefreshToken();
    let data = {
      access_token: JSON.parse(window.localStorage.getItem("token"))
        .access_token,
      qdcrmUserId: JSON.parse(window.localStorage.getItem("userInfo"))
        .qdcrmUserId,
      pageNum: this.pageNumber + 1
    };
    axios
      .get(`${BASE_URL}/msmng/api/bankcard/showBankCardList`, {
        params: data
      })
      .then(response => {
        console.log(response.data);
        console.log(response.data.data);
        if (response.data.data == 0) {
          this.nothing = true;
          this.showbanklist = false;
        } else {
          this.deviceList = response.data.data;
          console.log(this.deviceList);
          this.nothing = false;
          this.showbanklist = true;
        }
      })
      .catch(function(err) {
        Toast(err.message);
      });
  }
};
</script>
<style lang="less" scoped>
@blue: #1c8cff;
.BKManagement {
  background: #f1f9ff;
  width: 100%;
  height: 100%;
}
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
.noNotification {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: 0.3rem;
  text-align: center;
  background: #f1f9ff;
  img {
    display: block;
    width: 30%;
    margin: 0 auto;
    margin-top: 40%;
  }
  p {
    margin-top: 0.3rem;
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
