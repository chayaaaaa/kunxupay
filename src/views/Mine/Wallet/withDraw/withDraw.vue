<template>
  <div class="withDraw">
    <!-- ===========   提 现 页 面   =========== -->
    <mt-header title="提 现" fixed>
      <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      <mt-button slot="right" class="detail" @click="CAIPS()">进度查询</mt-button>
    </mt-header>
    <div class="content">
      <!-- ========  内 容  ======== -->
      <ul>
        <li>
          到账银行卡
          <span @click="showBankCards=true">{{this.message2}}</span>
        </li>
        <li>
          资金类型
          <span class="sp" @click="showBankTypes=true">{{this.message}}</span>
        </li>
        <li>提现金额</li>
        <li>
          ￥
          <input type="number" v-model="moneyCount" v-if="current==0">
          <input type="number" v-model="allmoney" v-if="current==1" @click="current=0">
        </li>
        <li>
          当前可提现余额{{allmoney}}
          <span class="span" @click="current=1">全部提现</span>
        </li>
        <button @click="startWithDraw()" v-if="current==0">提现</button>
        <button @click="startAllWithDraw()" v-if="current==1">提现</button>
        <p>预计7个工作日内到账</p>
      </ul>
    </div>
    <van-popup v-model="showBankTypes" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="请选择资金类型"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
        confirm-button-text="确定"
        cancel-button-text="取消"
      />
    </van-popup>
    <van-popup v-model="showBankCards" position="bottom" :overlay="true">
      <van-picker
        show-toolbar
        title="请选择到账银行卡"
        :columns="list"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChangeThis"
        confirm-button-text="确定"
        cancel-button-text="取消"
      />
    </van-popup>
    <van-popup v-model="show" position="bottom">
      <li>请输入支付密码</li>
      <li>押金提现</li>
      <li>￥20000000</li>
      <li>额外扣除￥6.00税点</li>
      <!-- 密码输入框 -->
      <van-password-input :value="value" @focus="showKeyboard = true"/>
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="show"
        theme="custom"
        close-button-text="完成"
        @blur="show = false"
        @input="onInput"
        @delete="onDelete"
        delete-button-text="删除"
      />
    </van-popup>
  </div>
</template>
<script>
import { PasswordInput, NumberKeyboard } from "vant";
import { Toast, MessageBox } from "mint-ui";
import { Popup, Picker } from "vant";
import "@/CSS/alert.css";
export default {
  name: "withDraw",
  data() {
    return {
      showBankTypes: false,
      showBankCards: false,
      value: "",
      result: "999999",
      showKeyboard: true,
      moneyCount: "",
      show: false,
      message: "请选择资金类型",
      message2: "请选择银行卡",
      columns: ["分润收益", "服务费返现", "激活奖励", "刷卡奖励"],
      list: ["工商银行", "建设银行", "网商银行", "平安银行"],
      allmoney: "1000",
      current: 0
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    onInput(key) {
      console.log(this.value);
      this.value = (this.value + key).slice(0, 6);
      console.log(this.value);
      /*       if (this.value.lenght !== 6) {
        Toast("请输入6位数密码");
        return;
      }
      if (this.value != "666666") {
        MessageBox("支付密码错误，请重试");
        return;
      } */
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
      console.log(this.value);
    },
    // 关闭提现
    hideWithdraw() {
      this.allmoney = "";
    },
    onChange(Picker, value, index) {
      this.message = value;
      console.log(index);
    },
    onChangeThis(Picker, value, index) {
      this.message2 = value;
      console.log(index);
    },
    onConfirm(value, index) {
      this.showBankTypes = false;
      this.showBankCards = false;
    },
    onCancel() {
      this.showBankTypes = false;
      this.showBankCards = false;
    },
    // 输入提现
    startWithDraw() {
      this.value = "";
      if (this.moneyCount <= 2) {
        Toast("金额小于固定手续费不可提现");
        return;
      }
      this.show = true;
    },
    // 全部提现
    startAllWithDraw() {
      this.value = "";
      if (this.allmoney <= 2) {
        Toast("金额小于固定手续费不可提现");
        return;
      }
      this.show = true;
    },
    // 提现进度查询
    CAIPS() {
      this.$router.push("/followUp");
    }
  }
};
</script>
<style lang="less" scoped>
@blue: #1c8cff;
/* allPages */
.withDraw {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  .van-popup--bottom {
    top: 4rem;
    bottom: 5rem;
    width: 90%;
    .van-password-input {
      margin-top: -2rem;
    }
    li {
      width: 90%;
      height: 1.2rem;
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.45rem;
      margin: 0 auto;
      border-bottom: 1px solid #d9d9d9; /* no */
    }
    li:nth-child(2) {
      border: none;
      font-size: 0.4rem;
      height: 1rem;
      line-height: 1rem;
    }
    li:nth-child(3) {
      border: none;
      height: 0.5rem;
      line-height: 0.5rem;
    }
    li:nth-child(4) {
      border: none;
      color: #606060;
      font-size: 0.3rem;
      height: 1rem;
      line-height: 1rem;
    }
  }

  /* 头部 */
  .mint-header {
    height: 1.2rem;
    font-size: 0.45rem;
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
  .content {
    position: absolute;
    top: 1.2rem;
    width: 100%;
    height: 8rem;
    background: #fff;
    ul {
      width: 100%;
      height: auto;
      li {
        width: 90%;
        height: 1rem;
        line-height: 1rem;
        margin: 0 auto;
        font-size: 0.4rem;
        span {
          margin-left: 1.5rem;
          color: #1c8cff;
        }
        .span {
          display: block;
          float: right;
          width: 2rem;
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          border: 1px solid #1c8cff; /* no */
          margin-top: 0.3rem;
          border-radius: 5px; /* no */
        }
        .sp {
          margin-left: 1.9rem;
        }
      }
      li:nth-child(3) {
        height: 1rem;
        border-top: 1px solid #d9d9d9; /* no */
      }
      li:nth-child(4) {
        height: 1.2rem;
        border-bottom: 1px solid #d9d9d9; /* no */
        font-size: 0.6rem;
        input {
        }
      }
      li:nth-child(5) {
        height: 1.5rem;
        line-height: 1.5rem;
        color: #606060;
      }
      button {
        width: 80%;
        height: 1rem;
        background: #1c8cff;
        border: none;
        color: #fff;
        border-radius: 5px; /* no */
        margin: 0 auto;
        position: absolute;
        left: 0;
        right: 0;
      }
      p {
        text-align: center;
        margin-top: 1.5rem;
        color: #606060;
      }
    }
  }
}
</style>
<style lang="less">
.van-picker__toolbar {
  height: 1rem !important;
  line-height: 1rem !important;
}
.van-password-input__security {
  width: 75%;
  height: 1rem;
  margin: 2rem auto;
  border: 1px solid #d9d9d9; /* no */
}
</style>

