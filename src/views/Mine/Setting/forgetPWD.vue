<template>
  <div class="forgetPWD">
      <!-- =================      设 置 页 面        ================= -->
      <mt-header title="设 置" fixed>
        <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      </mt-header>
     <!-- 忘记密码 -->
    <div class="forgetPWD">
      <mt-header title="忘 记 密 码" fixed>
        <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      </mt-header>
      <div class="inputList">
        <p>请输入验证后修改支付密码</p>
        <van-cell-group>
          <van-field v-model="phone" type="tel" label="手机号" placeholder="请输入手机号"/>
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
            <van-button slot="button" size="small" type="primary">获取验证码</van-button>
          </van-field>
        </van-cell-group>
        <button class="accomplish" @click="sumbitPWD()">完成</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  name: "forgetPWD",
  data() {
    return {
      phone: "",
      sms: ""
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    // 忘记密码
    sumbitPWD() {
      if (!this.phone) {
        Toast("请输入手机号");
        return;
      }
      if (!this.sms) {
        Toast("请输入验证码");
        return;
      }
    },
  }
};
</script>
<style lang="less" scoped>
@blue: #1c8cff;
/* 头部 */
.mint-header {
  height: 1.2rem;
  font-size: 0.45rem;
  font-weight: 100;
  background: @blue;
}
.header_left {
  margin-left: 0.3rem;
  font-size: 0.5rem;
}
.forgetPWD {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  .inputList {
    width: 100%;
    margin-top: 1.2rem;
    p {
      height: 1rem;
      line-height: 1rem;
      margin-left: 0.5rem;
      color: #606060;
    }
    .van-cell {
      height: 1.2rem;
      line-height: 1rem;
      font-size: 0.35rem;
    }
  }
  .accomplish {
    width: 90%;
    height: 1.2rem;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0.8rem auto;
    border: none;
    border-radius: 5px; /* no */
    background: #1c8cff;
    color: #fff;
    font-size: 0.4rem;
  }
  .van-button--primary {
    border: none;
    background: #fff;
    color: #1c8cff;
    border: 1px solid #1c8cff; /* no */
  }
  .van-button--small {
    width: 2rem;
    height: 0.8rem;
    border-radius: 5px; /* no */
    font-size: 0.3rem;
  }
}
</style>
<style lang="less">
.van-field .van-cell__title {
  max-width: 2rem;
  margin-left: 0.3rem;
}
.mint-header-title {
  height: 0.5rem;
}
</style>
