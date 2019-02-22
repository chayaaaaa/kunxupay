<template>
  <!-- =====================   添 加 银 行 卡 页 面   =======================-->
  <div class="addBankCards">
    <mt-header title="添 加 银 行 卡" fixed>
      <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
    </mt-header>
    <!-- ================       选 项 卡      =============== -->
    <div class="tabControl">
      <li @click="current=1" :class="{'cur':current == 1}">个人账户
        <p v-show="current==1"></p>
      </li>
      <li @click="current=2" :class="{'cur':current == 2}">企业账户
        <p v-show="current==2"></p>
      </li>
    </div>
    <!-- 提示栏目 -->
    <div class="list_Reminder" v-show="current==1">请绑定持卡人本人银行卡</div>
    <div class="list_Reminder" v-show="current==2">请绑定法人所属企业账户</div>
    <!-- 输入栏 -->
    <ul class="inputField" v-show="current == 1">
      <mt-field label="持卡人" placeholder="请输入真实姓名" v-model="user"></mt-field>
      <mt-field
        label="身份证号"
        placeholder="请输入身份证号码"
        minlenght="18"
        maxlenght="18"
        type="number"
        v-model="ID"
      ></mt-field>
      <mt-field label="银行名称" readonly>
        <select v-model="bankName">
          <option disabled value>请选择银行</option>
          <option v-for="item in list" v-bind:value="item.value" :key="item.a">{{item.text}}</option>
        </select>
      </mt-field>
      <mt-field label="银行卡号" placeholder="请输入银行卡号" v-model="bankNumber"></mt-field>
      <mt-field label="手机" placeholder="请输入手机预留号" type="tel" v-model="phone">
        <img src="@/assets/image/Mine/Wallet/prompt .png" @click="CAPION()">
      </mt-field>
      <mt-field label="验证码" v-model="captcha" placeholder="请输入验证码">
        <li>发送验证码</li>
      </mt-field>
    </ul>
    <button
      v-show="current == 1"
      type="submit"
      @click.prevent="onSubmit(user,ID,bankName,bankNumber,phone,captcha,selected)"
    >提交</button>
    <ul class="inputField" v-show="current == 2">
      <mt-field label="企业账户" placeholder="请输入企业账户" v-model="corporate"></mt-field>
      <mt-field label="企业账号" placeholder="请输入企业账号" v-model="Identification"></mt-field>
      <mt-field label="银行名称" readonly>
        <select v-model="whatbankName">
          <option disabled value>请选择银行</option>
          <option v-for="item in list" v-bind:value="item.value" :key="item.a">{{item.text}}</option>
        </select>
      </mt-field>
      <mt-field label="开户行" placeholder="请输入开户行" v-model="openbankName"></mt-field>
      <div class="upimg">
        <!-- 营业执照 -->
        <vue-clip
          :img="option.Operating"
          :dataUrlType="option.dataUrlType"
          :accept="option.accept"
          :autoClip="option.autoClip"
          :autoClipWidth="option.autoClipWidth"
          :autoClipHeight="option.autoClipHeight"
          :fixed="option.fixed"
          :outputSize="option.outputSize"
          :theme="option.theme"
          :fixedNumber="option.fixedNumber"
          @finish="Operating"
        ></vue-clip>
        <!-- 开户证明 -->
        <vue-clip
          :img="option.opening "
          :dataUrlType="option.dataUrlType"
          :accept="option.accept"
          :autoClip="option.autoClip"
          :autoClipWidth="option.autoClipWidth"
          :autoClipHeight="option.autoClipHeight"
          :fixed="option.fixed"
          :outputSize="option.outputSize"
          :theme="option.theme"
          :fixedNumber="option.fixedNumber"
          @finish="opening"
        ></vue-clip>
        <button
          type="submit"
          class="btn"
          @click.prevent="next(corporate,Identification,whatbankName,selected,openbankName)"
        >提交</button>
      </div>
    </ul>
  </div>
</template>
<script>
const axios = require("axios");
import qs from "qs";
import { VueClip } from "vue-pic-clip";
import { Toast, MessageBox } from "mint-ui";
import "@/CSS/alert.css";
export default {
  inject: ["reload"],
  name: "addBankCards",
  data() {
    return {
      current: 1,
      // 个人
      user: "", // 姓名
      ID: "", // 身份证号码
      bankName: "", // 银行
      bankNumber: "", // 卡号
      phone: "", // 预留手机号
      captcha: "", // 验证码
      selected: "", // 选择银行
      // 企业
      corporate: "", // 企业账户
      Identification: "", // 企业账号
      whatbankName: "", //银行名称
      openbankName: "", // 开户行
      list: [
        {
          text: "中国工商银行",
          value: "1"
        },
        {
          text: "中国建设银行",
          value: "2"
        },
        {
          text: "工商银行",
          value: "3"
        },
        {
          text: "工商银行",
          value: "4"
        },
        {
          text: "工商银行",
          value: "5"
        }
      ],
      option: {
        Operating: require("@/assets/image/Mine/Wallet/charter.png"), // 营业执照
        opening: require("@/assets/image/Mine/Wallet/Account .png"), // 开户证明
        accept: "image/png, image/jpeg, image/jpg, image/gif", // 可上传的图片类型
        outputSize: 0.7, // 压缩质量
        autoClip: true, // 是否开启截图框
        dataUrlType: "base64", // 数据类型
        canMoveBox: true, // 截图框是否可以移动
        fixed: true, // 截图框是否开启固定宽高比
        fixedNumber: [1, 0.6], // 宽高比 w/h
        fixedNumber3: [0.3, 0.5], // 宽高比 w/h
        theme: "rect", // 样式风格，默认rect:方形，circle:圆形
        clipImg: "" // 裁剪后的图片
      }
    };
  },
  methods: {
    prev() {
      history.go(-1);
    },
    CAPION() {
      MessageBox("与银行预留手机保持一致");
    },
    showPopup() {
      this.popupVisible = true;
    },
    // 营业执照
    Operating(name, url) {
      // 完成上传图片，返回图片名称、数据
      console.log("data", url);
      let formData = new FormData();
      let Operating = url.slice(23);
      formData.append("files1", Operating);
      console.log("files1", Operating);
      console.log(Operating);
      formData.append("name", name);
      console.log("name", name);
      window.localStorage.setItem("Operating", JSON.stringify(Operating));
    },
    // 开户证明
    opening(name, url) {
      // 完成上传图片，返回图片名称、数据
      console.log("data", url);
      let formData = new FormData();
      let opening = url.slice(23);
      formData.append("files1", opening);
      console.log("files1", opening);
      console.log(opening);
      formData.append("name", name);
      console.log("name", name);
      window.localStorage.setItem("opening", JSON.stringify(opening));
    },
    onSubmit() {
      if (!this.user) {
        Toast("请输入真实姓名");
        return;
      }
      if (!this.ID) {
        Toast("请输入身份证号码");
        return;
      }
      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.ID)) {
        Toast("身份证号填写有误");
        return false;
      }
      if (!this.bankName) {
        Toast("请选择银行");
        return;
      }
      if (!this.bankNumber) {
        Toast("请输入银行卡号");
        return;
      }
      if (!this.phone) {
        Toast("请输入预留手机号");
        return;
      }
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)) {
        Toast("手机号码格式有误，请重填");
        return;
      }
      if (!this.captcha) {
        Toast("请输入验证码");
        return;
      }
      let user = this.user;
      console.log(user);
      let BankCardsMsg = this.$qs.stringify({
        user: this.user,
        ID: this.ID,
        bankName: this.bankName,
        bankNumber: this.bankNumber,
        phone: this.phone,
        captcha: this.captcha
      });
    },
    next() {
      let OPERATING = JSON.parse(window.localStorage.getItem("Operating"));
      console.log(OPERATING);
      let OPENING = JSON.parse(window.localStorage.getItem("opening"));
      console.log(OPENING);
      if (!this.corporate) {
        Toast("请输入企业账户");
        return;
      }
      if (!this.Identification) {
        Toast("请输入企业账号");
        return;
      }
      if (!this.whatbankName) {
        Toast("请选择银行");
        return;
      }
      if (!this.openbankName) {
        Toast("请输入开户行");
        return;
      }
      if (!this.OPERATING) {
        Toast("请上传营业执照");
        return;
      }
      if (!this.OPENING) {
        Toast("请上传开户证明");
        return;
      }
    }
  },
  /* 注册组件 */
  components: {
    VueClip
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
.tabControl {
  position: absolute;
  top: 1.2rem;
  width: 100%;
  height: 1.2rem;
  background: #fff;
  li {
    width: 50%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    float: left;
    color: #9b9b9b;
    font-size: 0.38rem;
    p {
      width: 0.5rem;
      height: 0.05rem;
      background: #1c8cff;
      margin: 0 auto;
    }
  }
}
.cur {
  color: #1c8cff !important;
}
.list_Reminder {
  position: absolute;
  top: 2.45rem;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #f5f5f5;
  color: #606060;
  text-indent: 0.5rem;
  font-size: 0.35rem;
}
.inputField {
  width: 100%;
  height: auto;
  position: absolute;
  background: #fff;
  top: 3.45rem;
  select {
    width: 3rem;
    height: 0.5rem;
    border: none;
    appearance: none;
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari 和 Chrome */
    background: transparent;
    outline: none;
    background: url("~@/assets/image/Mine/Wallet/more.png") no-repeat right;
    background-size: 0.5rem;
    direction: rtl;
    padding-right: 0.7rem;
  }
  .mint-cell {
    width: 90%;
    height: 1.2rem;
    border-bottom: 1px solid #d9d9d9; /* no */
    margin: 0 auto;
    font-size: 0.4rem;
  }
  li {
    width: 2.5rem;
    height: 0.7rem;
    background: #1c8cff;
    border-radius: 5px; /* no */
    text-align: center;
    line-height: 0.7rem;
    color: #fff;
    font-size: 0.35rem;
    margin-left: 0.5rem;
  }
  img {
    width: 0.5rem;
    margin-left: 0.3rem;
  }
}
.addBankCards {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
}
button {
  position: absolute;
  width: 90%;
  height: 1rem;
  bottom: 5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  border: none;
  background: #1c8cff;
  color: #fff;
  font-size: 0.4rem;
  letter-spacing: 0.2rem;
  border-radius: 5px; /* no */
}
.CloseBank {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #000;
}
.alertDetail {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 1.2rem;
  bottom: 0;
  background: #fff;
  li {
    width: 90%;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #d9d9d9; /* no */
    margin: 0 auto;
    font-size: 0.4rem;
  }
  p {
    width: 100%;
    height: 1.4rem;
    background: #ceebff;
    text-align: center;
    span {
      position: absolute;
      left: 0;
      right: 0;
      top: 0.2rem;
      margin: 0 auto;
      width: 90%;
      height: 1rem;
      background: #fff;
      text-align: center;
      line-height: 1rem;
      border-radius: 5px; /* no */
      box-shadow: 0px 2px 5px rgb(133, 154, 156); /* no */
    }
  }
}
.upimg {
  width: 100%;
  height: 8rem;
  position: absolute;
  top: 4.8rem;
  background: #fff;
  .clip[data-v-29874490] {
    height: 50%;
  }
}
.btn {
  bottom: -1.2rem;
}
</style>
<style lang="less">
.mint-header-title {
  overflow: visible !important;
}
.mintui {
  font-size: 0.4rem !important;
}
.mint-field-core {
  font-size: 0.35rem !important;
  direction: rtl !important;
}
.mint-cell-text {
  font-size: 0.38rem;
}
.mint-field .mint-cell-title {
  width: 2.45rem;
}
.mint-header-title {
  overflow: visible !important;
}
.mintui {
  font-size: 0.4rem;
}
.mint-cell-title {
  width: 2rem !important;
}
.picture {
  img {
    width: 50%;
  }
}
.clip .icon[data-v-29874490] {
  border: none;
}
</style>