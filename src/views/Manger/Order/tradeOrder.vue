<template>
  <div class="tradeOrder">
    <!-- ================     交 易 订 单     ================ -->
    <mt-header title="交 易 订 单" fixed>
      <mt-button icon="back" @click="prev()" slot="left"></mt-button>
    </mt-header>
    <!-- 弹出层 -->
    <mt-popup v-model="showOrgan" popup-transition="popup-fade">
      <!-- title -->
      <div class="title">选 择 代 理 商</div>
      <!--       <select
        class="select"
        v-model="optionValue"
        :label-in-value="true"
        @change="getIdValue($event)"
      >
        <option selected="selected" disabled="disabled" style="display: none" value>请选择代理商</option>
        <option
          v-for="(item,index) in queryAgents"
          :key="index"
          :value="item.id"
          :label="item.text"
        >{{item.text}}</option>
      </select>-->
      <van-picker :columns="queryAgents" @change="onChange"/>
      <div class="box cancel" @click="cancel()">取消</div>
      <div class="box Confirm" @click="Confirm()">确认</div>
    </mt-popup>
    <!-- 选择栏 -->
    <div class="Choice">
      <!--       <li class="Cli" @click="showOrgan = true">{{showText}}</li> -->
      <li class="Cli" @click="showOrgan = true" v-if="display==true">{{showText}}</li>
      <li class="Cli" @click="showOrgan = true" v-if="showThis==true">{{textvalue}}</li>
      <div class="CicTime">
        <el-date-picker
          v-model="rangeTime"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @blur="getValue()"
        ></el-date-picker>
      </div>
      <div class="showDetail">
        <div class="left">
          <p>
            <img src="@/assets/image/Manger/Trade/fanxian.png">总交易额
          </p>
          <p v-if="deviceList.data!='0'">
            {{totalMoney}}
            <span>元</span>
          </p>
          <p v-if="deviceList.data=='0'">暂无数据</p>
        </div>
        <div class="right">
          <p>
            <img src="@/assets/image/Manger/Trade/jihuo.png">交易笔数
          </p>
          <p v-if="deviceList.data!='0'">
            {{totalNum}}
            <span>笔</span>
          </p>
          <p v-if="deviceList.data=='0'">0</p>
        </div>
      </div>
    </div>
    <!-- 列表头部 -->
    <ul class="listTop">
      <li>业务类型</li>
      <li>交易时间</li>
      <li>交易额</li>
      <li>状态</li>
    </ul>
    <!-- 列表 -->
    <ul class="listTal" v-if="showList == true">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多数据了~"
          loading-text="加载中"
          @load="onLoad"
          :offset="30"
        >
          <li v-for="item in deviceList" :key="item.a">
            <span>{{ item.bizType }}</span>
            <span class="spa">{{ item.createTime }}</span>
            <span class="span">{{ item.payMoneyAmount }}</span>
            <span>{{item.status}}</span>
          </li>
        </van-list>
      </van-pull-refresh>
    </ul>
    <!-- 列表 -->
    <ul class="listTal" v-if="showQueryList == true">
      <li v-for="item in querymemberDeals" :key="item.a">
        <span>{{ item.bizType }}</span>
        <span class="spa">{{ item.createTime }}</span>
        <span class="span">{{ item.payMoneyAmount }}</span>
        <span>{{item.status}}</span>
      </li>
      <P>没有更多数据了~</P>
    </ul>
    <ul class="nothing" v-if="showNothing == true">
      <img src="@/assets/image/Manger/Trade/nothing.png">
      <p>未获取到数据，请重新设置查询条件</p>
    </ul>
    <!--    tabbar -->
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item @click="jumpToTradeOrder()">
          <span>交易订单</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal">
        </van-tabbar-item>
        <van-tabbar-item @click="jumpToMemberDeal()">
          <span>会员交易</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icon.active2 : icon.normal2">
        </van-tabbar-item>
        <van-tabbar-item @click="jumpToMemberInfo()">
          <span>会员信息</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icon.active3 : icon.normal3">
        </van-tabbar-item>
        <van-tabbar-item @click="jumpToCashBack()">
          <span>返现活动</span>
          <img slot="icon" slot-scope="props" :src="props.active ? icon.active4 : icon.normal4">
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import "@/CSS/tabbar.css";
import "@/CSS/Order.css";
import { Toast } from "mint-ui";
const axios = require("axios");
import {
  getQueryTradeOrder,
  checkToken,
  getRefreshToken,
  BASE_URL
} from "@/api/api.js";
export default {
  name: "tradeOrder",
  data() {
    return {
      active: 0,
      cur: 0,
      /* 选择弹框 */
      showOrgan: false,
      display: true,
      showThis: false,
      value: "",
      data: "",
      /* 时间选择器的值 */
      rangeTime: "",
      /* 下拉加载 */
      pageNumber: 0, // 当前页
      showList: true, // 显示列表
      showNothing: false, // 没有数据
      totalMoney: "", // 总金额
      totalNum: "", // 总笔数
      listDetails: [], // 初始化数据
      deviceList: [], //用于存放加载的数据
      totalPage: 0, // 总数page
      pageNumber: 0, // 当前页
      loading: false, //控制上拉加载的加载动画
      finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, //控制下拉刷新的加载动画
      valueLength: "", // 数据长度
      showListPages: true, // 原始数据
      showQueryList: false, // 查询数据
      nothing: false, // 没有数据
      startTime: "", // 开始时间
      endTime: "", // 结束时间
      querymemberDeals: [],
      optionValue: "", //选择代理商的value
      queryAgents: [], // 储存代理商数据
      showText: JSON.parse(window.localStorage.getItem("userInfo")).name, // 总代理
      loading: false,
      finished: false,
      /* tabbar */
      icon: {
        normal: require("@/assets/image/Manger/Trade/icon01.png"),
        active: require("@/assets/image/Manger/Trade/icon01_choice.png"),
        normal2: require("@/assets/image/Manger/Trade/icon02.png"),
        active2: require("@/assets/image/Manger/Trade/icon02_choice.png"),
        normal3: require("@/assets/image/Manger/Trade/icon03.png"),
        active3: require("@/assets/image/Manger/Trade/icon03_choice.png"),
        normal4: require("@/assets/image/Manger/Trade/icon04.png"),
        active4: require("@/assets/image/Manger/Trade/icon04_choice.png")
      }
    };
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    jumpToTradeOrder() {
      this.$router.push("/tradeOrder");
    },
    jumpToMemberDeal() {
      this.$router.push("/memberDeal");
    },
    jumpToMemberInfo() {
      this.$router.push("/memberInfo");
    },
    jumpToCashBack() {
      this.$router.push("/cashBack");
    },
    getValue() {
      this.startTime = this.rangeTime["0"];
      this.endTime = this.rangeTime[1];
      console.log(this.startTime);
      console.log(this.endTime);
      let queryData = {
        qdcrmUserId: JSON.parse(window.localStorage.getItem("userInfo"))
          .qdcrmUserId,
        access_token: JSON.parse(window.localStorage.getItem("token"))
          .access_token,
        gmtStart: this.startTime,
        gmtEnd: this.endTime,
        currentPage: this.pageNumber + 1,
        number: Math.random()
      };
      axios
        .get(`${BASE_URL}/msmng/api/order/queryTradeOrder`, {
          params: queryData
        })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            let _this = this;
            let listDetails = response.data.data.orderQueryList;
            _this.querymemberDeals = listDetails;
            _this.valueLength = response.data.data.paginator.length;
            console.log(_this.querymemberDeals);
            console.log(_this.valueLength);
            _this.totalNum = response.data.data.totalNum;
            _this.totalMoney = response.data.data.totalMoney;
            if (_this.valueLength == 0) {
              _this.showList = false;
              _this.showNothing = true;
            } else {
              _this.showList = false;
              _this.showQueryList = true;
              _this.showNothing = false;
            }
          } else {
            let _this = this;
            _this.showList = false;
            _this.showQueryList = false;
            _this.showNothing = true;
          }
        })
        .catch(function(err) {
          Toast(err.message);
        });
    },
    Confirm() {
      let queryData = {
        qdcrmUserId: this.value,
        access_token: JSON.parse(window.localStorage.getItem("token"))
          .access_token,
        gmtStart: this.startTime,
        gmtEnd: this.endTime,
        currentPage: this.pageNumber + 1,
        number: Math.random()
      };
      axios
        .get(`${BASE_URL}/msmng/api/order/queryTradeOrder`, {
          params: queryData
        })
        .then(response => {
          console.log(response.data);
          if (response.data.code == 200) {
            let _this = this;
            let listDetails = response.data.data.orderQueryList;
            _this.querymemberDeals = listDetails;
            _this.valueLength = response.data.data.paginator.length;
            console.log(_this.querymemberDeals);
            console.log(_this.valueLength);
            _this.totalNum = response.data.data.totalNum;
            _this.totalMoney = response.data.data.totalMoney;
            _this.showList = false;
            _this.showNothing = true;
          } else if (response.data.code == 400) {
            let _this = this;
            _this.showList = false;
            _this.showQueryList = true;
            _this.showNothing = false;
          }
        })
        .catch(function(err) {
          Toast(err.message);
        });
      this.showOrgan = false;
      this.display = false;
      this.showThis = true;
    },
    cancel() {
      this.showOrgan = false;
    },
    onChange(picker, value, index) {
      this.textvalue = value.text;
      this.value = value.id;
      console.log(value);
      console.log(this.textvalue);
      console.log(this.value);
      console.log(index);
    },
    getIdValue(event) {
      this.value = event.target.value;
      console.log(this.value);
    },
    // 下拉刷新上拉加载
    init() {
      // 当前页数
      let data = {
        currentPage: this.pageNumber + 1
      };
      let self = this;
      getQueryTradeOrder(data)
        .then(response => {
          getRefreshToken();
          let res = response.data.data.orderQueryList;
          console.log(res);
          // 用 data 里定义的空数组储存得到的数据
          self.deviceList = res;
          console.log(self.deviceList);
          // 储存总页数
          self.totalPage = response.data.data.paginator.pages;
          // 向数组中追加内容
          self.deviceList = self.deviceList.concat(res);
          // 取消刷新动画
          self.isLoading = false;
        })
        .catch({
          function(error) {
            Toast(response.message);
          }
        });
    },
    //下拉刷新
    onRefresh() {
      let self = this;
      setTimeout(() => {
        self.totalPage = 0;
        self.pageNumber = 0;
        Toast({
          message: "刷新成功"
        });
        this.isLoading = false;
        self.init(); //加载数据
      }, 500);
    },
    //页面初始化之后会触发一次，在页面往下加载的过程中会多次调用【上拉加载】
    onLoad() {
      getRefreshToken();
      let self = this;
      setTimeout(() => {
        let data = this.$qs.stringify({
          currentPage: self.pageNumber + 1
        });
        window.sessionStorage.setItem("page", JSON.stringify(data));
        getQueryTradeOrder(data)
          .then(response => {
            if (response.code == 200) {
              console.log(response.data);
              let data = response.data.data;
              let res = data.orderQueryList;
              console.log(res);
              self.totalPage = data.paginator.pages;
              console.log(self.totalPage);
              self.deviceList = self.deviceList.concat(res);
              self.loading = false;
              self.pageNumber++;
              self.totalNum = data.totalNum;
              self.totalMoney = data.totalMoney;
              self.valueLength = data.paginator.length;
              console.log(self.valueLength);
              if (self.pageNumber >= self.totalPage) {
                self.finished = true;
              } else {
                self.finished = false;
              }
              if (self.valueLength == 0) {
                self.showList = false;
                self.showNothing = true;
              }
            } else {
              console.log(response.data);
              this.data = response.data;
              self.showList = false;
              self.showNothing = true;
            }
          })
          .catch({
            function(error) {
              Toast(response.message);
            }
          });
      }, 500);
    }
  },
  mounted() {
    let queryData = {
      qdcrmUserId: JSON.parse(window.localStorage.getItem("userInfo"))
        .qdcrmUserId,
      access_token: JSON.parse(window.localStorage.getItem("token"))
        .access_token
    };
    axios
      .get(`${BASE_URL}/msmng/api/agent/getAgentTree`, {
        params: queryData
      })
      .then(response => {
        this.queryAgents = response.data.data;
        console.log(this.queryAgents);
        /*         this.text = this.queryAgents.text;
        this.id = this.queryAgents.id;
        console.log(this.text); */
      })
      .catch(function(err) {
        Toast(err.message);
      });
  },
  /* 注册组件 */
  components: {}
};
</script>
<style lang="less" scoped>
@blue: #1c8cff;
/* 头部 */
.tradeOrder {
  background: #f5f5f5;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
/* 代理商选择 */
.select {
  width: 50%;
  height: 1rem;
  margin-left: 25%;
  margin-bottom: 1rem;
  margin-top: 1rem;
  border: none;
  border-top: 1px solid #1c8cff; /* no */
  border-bottom: 1px solid #1c8cff; /* no */
  background: #fff;
  outline: none;
  option {
    outline: none;
    border: 1px solid #1c8cff; /* no */
  }
}
  /* 时间选择栏 */
  .Choice {
    width: 100%;
    height: 3.36rem;
    .Cli {
      overflow: hidden;
     /*  white-space: nowrap; */
    }
  }
/* 没有数据 */
.nothing {
  width: 100%;
  position: absolute;
  top: 6.2rem;
  bottom: 0;
  text-align: center;
  img {
    margin-top: 2rem;
    width: 4rem;
  }
  p {
    margin-top: 0.5rem;
  }
}
/* 列表 */

.listTal {
  li {
    width: 90%;
    height: 1.1rem;
    text-align: center;
    line-height: 1.1rem;
    border-bottom: 1px solid #d9d9d9; /* no */
    margin-left: 5%;
    span {
      display: inline-block;
      width: 24%;
      font-size: 0.35rem;
      overflow: hidden;
      white-space: nowrap;
      img {
        width: 0.5rem;
        vertical-align: middle;
      }
    }
    .span {
      color: #e3383e;
      font-weight: 700;
    }
    .spa {
      width: 23%;
      margin-left: 0.8%;
    }
  }
  p {
    height: 2.5rem;
    line-height: 1rem;
    text-align: center;
    background: #f5f5f5;
  }
}
</style>
<style lang="less">
.van-picker__columns {
  margin-bottom: -1.5rem;
  .van-picker-column {
    margin-top: -1rem;
  }
  .van-hairline--top-bottom {
    width: 30% !important;
    margin-left: 35%;
  }

  .van-hairline--top-bottom::after {
    border: 1px solid #1c8cff !important;
    border-left: none !important;
    border-right: none !important;
  }
  .van-picker__frame,
  .van-picker__loading .van-loading {
    top: 32%;
  }
}
.van-list__finished-text,
.van-list__loading-text {
  height: 2.5rem;
  line-height: 1rem;
}
</style>


