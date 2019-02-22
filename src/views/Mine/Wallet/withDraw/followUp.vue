<template>
  <div class="followUp">
    <!-- ============     提 现 进 度 查 询    ============ -->
    <!-- 进度查询界面 -->
    <mt-header title="提 现 进 度" fixed>
      <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
    </mt-header>
    <!-- 提现进度列表 -->
    <div class="followUpList" v-for="item in type" :key="item.index" @click="current=1">
      <ul>
        <li>{{item.type}}</li>
        <li>{{item.count}}</li>
        <li>{{item.quantity}}</li>
        <li class="li">
          {{item.bank}}
          <span>{{item.bankName}}</span>
        </li>
        <li class="li">
          {{item.state}}
          <span v-if="item.status==0">审核中</span>
          <span v-if="item.status==1">银行处理</span>
          <span v-if="item.status==2">提现失败</span>
          <span v-if="item.status==3">已到账</span>
        </li>
        <li class="li">
          {{item.startTime}}
          <span>{{item.dealTime}}</span>
        </li>
        <li class="li">
          {{item.endTime}}
          <span>{{item.comeTime}}</span>
        </li>
      </ul>
    </div>
    <!-- 状态详细 -->
    <!-- 审核中 -->
    <!--   <div class="underReview" v-if="current==1">
      <mt-header title="提 现 详 情" fixed>
        <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      </mt-header>
      <div class="underReview_Top">
        <img src="@/assets/image/Mine/Wallet/object.png">
        <p>提现申请已提交</p>
      </div>
      <div class="underReview_Detail" v-for="item in Detail" :key="item.key">
        <ul>
          <li>
            {{item.ApplicationDate}}
            <span>{{item.ApplicationDateTime}}</span>
          </li>
          <li>
            {{item.expected}}
            <span>{{item.expectedTime}}</span>
          </li>
          <li>
            {{item.bankCards}}
            <span>{{item.bankName}}</span>
          </li>
          <li>
            {{item.withdrawal}}
            <span>{{item.withdrawalNumber}}</span>
          </li>
          <li>
            {{item.monetType}}
            <span>{{item.type}}</span>
          </li>
          <li>
            {{item.provideInvoice}}
            <span>{{item.YESORNO}}</span>
          </li>
          <li>
            {{item.withdrawalType}}
            <span>{{item.genre}}</span>
          </li>
        </ul>
      </div>
    </div>-->
    <!-- end -->
    <div class="underReview" v-if="current==1">
      <mt-header title="提 现 详 情" fixed>
        <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
      </mt-header>
      <!-- 等待银行处理 -->
      <div class="underReview_Top_Inhandle" v-show="status==1">
        <ul>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-Audit .png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/bank-.png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-AuditSuccess.png">
          </li>
        </ul>
        <li class="li">等待银行处理</li>
      </div>
      <!-- 提现失败 -->
      <div class="underReview_Top_Inhandle" v-show="status==2">
        <ul>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-Audit .png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/bank-.png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/AuditSuccess.png">
          </li>
        </ul>
        <li class="li">提现失败（资金已退回）</li>
      </div>
      <!-- 已到账 -->
      <div class="underReview_Top_Inhandle" v-show="status==3">
        <ul>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-Audit .png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/bank-.png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-cash033.png">
          </li>
        </ul>
        <li class="li">已到账</li>
      </div>
      <!-- 审核中 -->
      <div class="underReview_Top_Inhandle" v-show="status==4">
        <ul>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-Audit .png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-Bank01.png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-AuditSuccess.png">
          </li>
        </ul>
        <li class="li">审核中</li>
      </div>
      <!-- 提现拒绝 -->
      <div class="underReview_Top_Inhandle">
        <ul>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-Audit .png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/reject.png">
          </li>
          <li></li>
          <li>
            <img src="@/assets/image/Mine/Wallet/ic-AuditSuccess.png">
          </li>
        </ul>
        <li class="li">提现拒绝（资金已退回）</li>
      </div>
      <!-- 列表 -->
      <div class="underReview_Detail" v-for="item in Detail" :key="item.key">
        <ul>
          <li>
            {{item.ApplicationDate}}
            <span>{{item.ApplicationDateTime}}</span>
          </li>
          <li>
            {{item.expected}}
            <span>{{item.expectedTime}}</span>
          </li>
          <li>
            {{item.bankCards}}
            <span>{{item.bankName}}</span>
          </li>
          <li>
            {{item.withdrawal}}
            <span>{{item.withdrawalNumber}}</span>
          </li>
          <li>
            {{item.monetType}}
            <span>{{item.type}}</span>
          </li>
          <li>
            {{item.provideInvoice}}
            <span>{{item.YESORNO}}</span>
          </li>
          <li>
            {{item.withdrawalType}}
            <span>{{item.genre}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "followUp",
  data() {
    return {
      current: 0,
      status: "",
      type: [
        {
          type: "余额提现",
          count: "提现金额",
          quantity: "￥200000.00",
          bank: "提现银行",
          bankName: "建设银行(0789)",
          status: "1",
          state: "提现状态",
          startTime: "提现时间",
          endTime: "预计到账时间",
          dealTime: "2017-11-01 11:59:59",
          comeTime: "2017-11-01 11:59:59"
        },
        {
          type: "余额提现",
          count: "提现金额",
          quantity: "￥200000.00",
          bank: "提现银行",
          bankName: "建设银行(0789)",
          status: "0",
          state: "提现状态",
          startTime: "提现时间",
          endTime: "预计到账时间",
          dealTime: "2017-11-01 11:59:59",
          comeTime: "2017-11-01 11:59:59"
        },
        {
          type: "余额提现",
          count: "提现金额",
          quantity: "￥200000.00",
          bank: "提现银行",
          bankName: "建设银行(0789)",
          status: "2",
          state: "提现状态",
          startTime: "提现时间",
          endTime: "预计到账时间",
          dealTime: "2017-11-01 11:59:59",
          comeTime: "2017-11-01 11:59:59"
        },
        {
          type: "余额提现",
          count: "提现金额",
          quantity: "￥200000.00",
          bank: "提现银行",
          bankName: "建设银行(0789)",
          status: "3",
          state: "提现状态",
          startTime: "提现时间",
          endTime: "预计到账时间",
          dealTime: "2017-11-01 11:59:59",
          comeTime: "2017-11-01 11:59:59"
        }
      ],
      Detail: [
        {
          ApplicationDate: "申请时间",
          ApplicationDateTime: "2017-11-01 11:59:59",
          expected: "预计到账时间",
          expectedTime: "2017-11-01 11:59:59",
          bankCards: "到账银行卡",
          bankName: "建设银行 尾号5678",
          withdrawal: "提现金额",
          withdrawalNumber: "￥20,898,26.00",
          monetType: "资金类型",
          type: "押金余额",
          provideInvoice: "提供发票",
          YESORNO: "否",
          withdrawalType: "提现类型",
          genre: "对私"
        }
      ]
    };
  },
  methods: {
    prev() {
      history.go(-1);
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
.followUp {
  position: absolute;
  width: 100%;
  top: 1.2rem;
  bottom: 0;
  background: #f5f5f5;
  .followUpList {
    width: 100%;
    height: 6.5rem;
    background: #fff;
    margin-bottom: 0.4rem;
    ul {
      width: 90%;
      height: auto;
      margin: 0 auto;
      li:nth-child(1) {
        font-size: 0.4rem;
        color: #1c8cff;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
      }
      li:nth-child(2) {
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        color: #606060;
        font-size: 0.3rem;
      }
      li:nth-child(3) {
        text-align: center;
        font-size: 0.5rem;
        font-weight: 600;
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #d9d9d9; /* no */
      }
      li:nth-child(5) {
        span {
          color: red;
        }
      }
      .li {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        span {
          float: right;
        }
      }
    }
  }
  // 状态详细
  //审核中
  .underReview {
    position: fixed;
    top: 1.2rem;
    bottom: 0;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
    .underReview_Top {
      width: 100%;
      height: 4.5rem;
      background: @blue;
      padding-top: 1.5rem;
      img {
        width: 3rem;
        display: block;
        margin: 0 auto;
      }
      p {
        text-align: center;
        font-size: 0.45rem;
        margin-top: 0.5rem;
        color: #fff;
        opacity: 0.9;
        letter-spacing: 3px; /* no */
        font-weight: 300;
      }
    }
    .underReview_Detail {
      width: 100%;
      height: 7rem;
      background: #fff;
      ul {
        width: 90%;
        height: auto;
        margin: 0 auto;
        li {
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.45rem;
          span {
            float: right;
          }
        }
        li:nth-child(4) {
          span {
            color: @blue;
          }
        }
        li:nth-child(6) {
          span {
            color: @blue;
          }
        }
      }
    }
  }
  .underReview_Top_Inhandle {
    width: 100%;
    height: 4rem;
    background: url("~@/assets/image/Mine/Wallet/bj.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 1rem;
    ul {
      width: 80%;
      height: 1.2rem;
      margin: 0 auto;
      li {
        width: 20%;
        height: 1.2rem;
        float: left;
        img {
          width: 1.3rem;
        }
      }
      li:nth-child(2) {
        width: 12%;
        margin-left: 3%;
        margin-right: 5%;
        height: 0.05rem;
        background: #ffffff;
        margin-top: 0.6rem;
        opacity: 0.5;
      }
      li:nth-child(4) {
        width: 12%;
        margin-left: 3%;
        margin-right: 5%;
        height: 0.05rem;
        background: #ffffff;
        margin-top: 0.6rem;
        opacity: 0.5;
      }
    }

    .li {
      text-align: center;
      color: #fff;
      font-size: 0.5rem;
      opacity: 0.9;
      font-weight: 200;
      width: 100%;
      height: 1rem;
      margin-top: 1rem;
    }
  }
}
</style>
<style lang="less">
.mintui {
  font-size: 0.5rem !important;
}
</style>
