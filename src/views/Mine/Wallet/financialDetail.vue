<template>
  <!-- ================   资 金 明 细 页 面    ================== -->
  <div class="financialDetail">
    <mt-header title="资 金 明 细" fixed>
      <mt-button icon="back" @click="prev()" class="header_left" slot="left"></mt-button>
    </mt-header>
    <!-- 列表 -->
    <div class="financialDetail_list">
      <li v-for="item in detail" :key="item.a">
        <p>
          {{item.type}}
          <span class="Minus" v-if="item.status==1">{{item.money}}</span>
          <span v-if="item.status==2">{{item.money}}</span>
        </p>
        <p>{{item.time}}</p>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: "financialDetail",
  data() {
    return {
      status: 0,
      detail: [
        {
          type: "分润收益",
          money: "+200",
          time: "2018-07-26 11:36:42",
          status: "2"
        },
        {
          type: "刷卡返现",
          money: "+2.56",
          time: "2018-07-26 11:36:42",
          status: "2"
        },
        {
          type: "押金返现",
          money: "+2.56",
          time: "2018-07-26 11:36:42",
          status: "2"
        },
        {
          type: "机具返现",
          money: "+2.56",
          time: "2018-07-26 11:36:42",
          status: "2"
        },
        {
          type: "余额提现",
          money: "+2.56",
          time: "2018-07-26 11:36:42",
          status: "2"
        },
        {
          type: "代扣税点",
          money: "-200",
          time: "2018-07-26 11:36:42",
          status: "1"
        },
        {
          type: "退款",
          money: "+200",
          time: "2018-07-26 11:36:42",
          status: "2"
        },
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
  font-size: 0.4rem;
  font-weight: 100;
  background: @blue;
}
.header_left {
  margin-left: 0.3rem;
}
/* 列表 */
.financialDetail_list {
  width: 100%;
  height: auto;
  background: #fff;
  position: absolute;
  top: 1.2rem;
  bottom: 0;
  li {
    width: 90%;
    height: 1.45rem;
    border-bottom: 1px solid #d9d9d9; /* no */
    margin: 0 auto;
    p {
      width: 100%;
      height: 0.7rem;
      line-height: 0.7rem;
      color: #606060;
      span {
        float: right;
        font-size: 0.4rem;
        color: #06a253;
        line-height: 1.45rem;
      }
    }
    .Minus {
      color: red;
    }
    p:nth-child(1) {
      font-size: 0.4rem;
      color: #222222;
    }
  }
}
</style>
