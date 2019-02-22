<template>
  <div class="transactionDetails">
    <!-- ================     银 行 卡 明 细      ================= -->
    <mt-header title="银 行 卡 明 细" fixed>
      <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
    </mt-header>
    <!-- 卡号详情列表 -->
    <div class="bankDetail">
      <div class="Detail">
        <!-- 银行卡 -->
        <li v-for="item in bankLists" :key="item.e">
          <p>
            <img src="@/assets/image/Mine/Wallet/ic.png">
          </p>
          <p>
            {{item.title}}
            <!-- <span>{{item.status}}</span> -->
          </p>
          <p>{{item.type}}</p>
          <p>{{item.bankNumber}}</p>
        </li>
      </div>
      <ul>
        <li>
          单笔提现额度
          <span>20000元</span>
        </li>
        <li>
          每日提现额度
          <span>200000元</span>
        </li>
      </ul>
      <button @click="show = true">解除绑定</button>
    </div>
    <van-popup v-model="show" :overlay="false">
      <div class="pay_password">
        <!-- 密码输入框 -->
        <div class="password_input">
          <p style="text-align: center">请输入支付密码解绑银行卡</p>
          <van-password-input
            :value="value"
            v-model="value"
            @focus="showKeyboard = true"
            close-button-text="完成"
          />
        </div>
        <!-- 确定框 -->
        <button @click="sumbitPwd()">提交</button>
        <!--键盘-->
        <!--        <van-number-keyboard :show="show" @input="onInput" @delete="onDelete"/> -->
        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="show"
          theme="custom"
          extra-key="."
          close-button-text="完成"
          @blur="show = false"
          @input="onInput"
          @delete="onDelete"
          delete-button-text="删除"
          transition
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
import { PasswordInput, NumberKeyboard } from "vant";
import "@/CSS/alert.css";
export default {
  name: "transactionDetails",
  data() {
    return {
      value: "",
      showKeyboard: true,
      show: false,
      inputValue: "",
      bankLists: [
        {
          title: "中国工商银行",
          type: "储蓄卡",
          bankNumber: "**** **** **** 3560",
          id: "1"
        }
      ]
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      console.log(this.value);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
      console.log(this.value);
    },
    sumbitPwd() {
      if (!this.value) {
        MessageBox("请输入密码");
        return;
      }
      /*    if(!this.value){
          MessageBox("支付密码错误，请重试");
      } */
      /*  if(!this.value){
          MessageBox("您未设置支付密码，请先设置支付密码");
      } */
      this.value = "";
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
@blue: #1c8cff;
.van-popup {
  transform: none;
  button {
    width: 70%;
    height: 1rem;
    margin: 4rem auto;
    position: absolute;
    left: 0;
    right: 0;
    border: none;
    background: @blue;
    color: #fff;
    border-radius: 5px; /* no */
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
.pay_password {
  background: #e2e1e1;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 1.2rem;
  width: 100%;
  height: 100%;
}

.password_input {
  position: fixed;
  left: 0;
  top: 2rem;
  width: 100%;
  height: 2rem;
}
.van-password-input {
  top: 1rem;
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
.bankDetail {
  width: 100%;
  position: absolute;
  top: 1.2rem;
  bottom: 0;
  background: #f5f5f5;
  .Detail {
    width: 100%;
    height: 3rem;
    background: #fff;
    li {
      width: 95%;
      height: 2.5rem;
      border-radius: 5px; /* no */
      margin: 0rem auto;
      padding-top: 0.5rem;
      p:nth-child(1) {
        width: 1rem;
        height: 2.5rem;
        float: left;
        margin-right: 1.5rem;
        img {
          width: 1.5rem;
          margin-left: 0.5rem;
        }
      }
      p:nth-child(3) {
        font-size: 0.35rem;
      }
      p {
        height: 0.7rem;
        font-size: 0.4rem;
        color: #000;
        span {
          float: right;
          margin-right: 0.5rem;
        }
      }
    }
  }
  ul {
    margin-top: 0.5rem;
    width: 100%;
    height: auto;
    background: #fff;
    li {
      width: 90%;
      height: 1.2rem;
      text-align: left;
      margin: 0 auto;
      line-height: 1.2rem;
      border-bottom: 1px solid #d9d9d9; /* no */
      font-size: 0.35rem;
      span {
        float: right;
      }
    }
  }
  button {
    width: 90%;
    height: 1rem;
    border: none;
    position: absolute;
    left: 0;
    right: 0;
    margin: 1rem auto;
    background: #1c8cff;
    color: #fff;
    border-radius: 5px; /* no */
    letter-spacing: 0.05rem;
    font-size: 0.4rem;
    font-weight: 200;
  }
}
</style>
<style lang="less">
.van-password-input__security {
  height: 1.2rem;
  width: 70%;
  margin: 0 auto;
}
.van-number-keyboard {
  height: 6rem;
}
.van-key {
  height: 1.5rem;
  line-height: 1.5rem;
  font-size: 0.4rem;
}
/* .van-key--gray {
  background: none;
} */
</style>
