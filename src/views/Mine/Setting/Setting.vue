<template>
  <div class="Setting">
    <div class="set">
      <!-- =================      设 置 页 面        ================= -->
      <mt-header title="设 置" fixed v-if="current==1">
        <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      </mt-header>
      <ul class="settingPwd" v-if="current==1">
        <li @click="current=2">
          支付密码
          <span>未设置 ></span>
        </li>
      </ul>
      <button class="loginOut" v-if="current==1" @click="loginOut()">退出登录</button>
    </div>
    <!-- 支付密码 -->
    <div class="payPassWord" v-if="current==2">
      <mt-header title="支 付 密 码 设 置" fixed>
        <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      </mt-header>
      <div class="inputList">
        <p>请输入原密码以验证身份</p>
        <van-cell-group>
          <van-field v-model="oldpassword" type="password" label="原密码" placeholder="请输入原密码"/>
        </van-cell-group>
        <p>设置支付密码，用以支付验证</p>
        <van-cell-group>
          <van-field v-model="newpassword" type="password" label="新密码" placeholder="请输入新密码"/>
        </van-cell-group>
        <van-cell-group>
          <van-field v-model="surepassword" type="password" label="确认密码" placeholder="请确认新密码"/>
        </van-cell-group>
        <button class="accomplish" @click="sumbit()">完成</button>
        <span @click="current=3">忘记密码？</span>
      </div>
    </div>
    <!-- 忘记密码 -->
    <div class="forgetPWD" v-if="current==3">
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
  name: "Setting",
  data() {
    return {
      current: 1,
      oldpassword: "",
      newpassword: "",
      surepassword: "",
      phone: "",
      sms: ""
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    // 设置密码
    sumbit() {
      console.log(this.oldpassword);
      console.log(this.newpassword);
      console.log(this.surepassword);
      if (!this.oldpassword) {
        Toast("请输入原密码");
        return;
      }
      if (!this.newpassword) {
        Toast("请输入新密码");
        return;
      }
      if (!this.surepassword) {
        Toast("请确认新密码");
        return;
      }
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
    // 退出登录
    loginOut() {
      window.localStorage.removeItem("userInfo"); //清除文件
      window.localStorage.removeItem("token"); //清除文件
      window.localStorage.removeItem("merchantId"); //清除文件
      window.localStorage.removeItem("access_token"); //清除文件
      window.localStorage.removeItem("qdcrmUserId"); //清除文件
      this.$router.push("/login");
    }
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
/* allPages */
.set {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
  .settingPwd {
    width: 100%;
    height: auto;
    background: #fff;
    position: absolute;
    top: 1.2rem;
    li {
      width: 80%;
      margin: 0 auto;
      height: 1.2rem;
      line-height: 1.2rem;
      border-bottom: 1px solid #d9d9d9; /* no */
      background: url("~@/assets/image/Mine/Wallet/ic-pwd.png") no-repeat left;
      background-size: 0.5rem;
      padding-left: 10%;
      font-size: 0.4rem;
      span {
        float: right;
        font-size: 0.35rem;
        color: #9b9b9b;
      }
    }
  }
  .loginOut {
    width: 90%;
    height: 1.2rem;
    position: absolute;
    top: 3.5rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    border: none;
    border-radius: 5px; /* no */
    background: #1c8cff;
    color: #fff;
    font-size: 0.4rem;
    letter-spacing: 0.1rem;
  }
}
// 支付密码
.payPassWord {
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
  span {
    float: right;
    display: block;
    margin-top: 2.5rem;
    margin-right: 0.5rem;
    color: #1c8cff;
  }
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
