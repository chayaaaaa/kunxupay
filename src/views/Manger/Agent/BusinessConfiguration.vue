<template>
  <div class="BusinessConfiguration">
    <!-- ============   业 务 配 置 页 面   =========== -->
    <div class="header">
      <img class="header_left" @click="prev()" src="@/assets/image/Manger/Agents/icn_back@2x.png">
      业务配置
    </div>
    <p>
      <img src="@/assets/image/Manger/Agents/ic-pos.png">CX00001-创鑫机构
    </p>
    <div class="BusinessConfiguration_body">
      <ul>
        <li>普通收款-极速(T+1)
          <van-switch
            size="15px"
            v-model="checked"
            active-color="#1c8cff"
            inactive-color="#D9D9D9"
          />
        </li>
        <!-- 配置详情 -->
        <div class="configDetail" v-if="checked==true">
          <form>
            <ul class="configList">
              <li>
                <img src="@/assets/image/Manger/Agents/ic-ICcard.png">
                普通收款-极速(T+1)
              </li>
              <li>
                <span>工作日费率</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
              <li>
                <span>节假日费率</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
              <li>
                <span>交易限额</span>
                <p>
                  <input type="number">
                  <b>－</b>
                  <input class="input" type="number">
                </p>
              </li>
              <li>
                <span>代理工作日(结算价)</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
              <li>
                <span>代理节假日(结算价)</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
            </ul>
          </form>
        </div>
        <li>个人收款(T+1)
          <van-switch size="15px" v-model="check" active-color="#1c8cff" inactive-color="#D9D9D9"/>
        </li>
        <!-- 配置详情 -->
        <div class="configDetail" v-if="check==true">
          <form>
            <ul class="configList">
              <li>
                <img src="@/assets/image/Manger/Agents/ic-ICcard.png">
                个人收款(T+1)
              </li>
              <li>
                <span>工作日费率</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
              <li>
                <span>节假日费率</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
              <li>
                <span>交易限额</span>
                <p>
                  <input type="number">
                  <b>－</b>
                  <input class="input" type="number">
                </p>
              </li>
              <li>
                <span>代理工作日(结算价)</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
              <li>
                <span>代理节假日(结算价)</span>
                <p>
                  <input type="number">
                  <b>+</b>
                  <input type="number">
                  %
                </p>
              </li>
            </ul>
          </form>
        </div>
      </ul>
    </div>
    <button @click="current=1">提交</button>
    <div class="configSuccessed" v-if="current==1">
      <p>业务配置成功，即时生效</p>
      <ul>
        <li @click="backIndex()">返回首页</li>
        <li @click="backManger()">返回商户管理</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "BusinessConfiguration",
  data() {
    return {
      checked: false,
      check: false,
      current: 0
    };
  },
  methods: {
    prev() {
      this.$router.go(-1);
    },
    backIndex() {
      this.$router.push("/index");
    },
    backManger() {
      this.$router.push("/manger");
    },
  }
};
</script>
<style lang="less" scoped>
@blue: #1c8cff;
// allPages
.BusinessConfiguration {
  background: #f5f5f5;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  /* 头部 */
  .header {
    height: 1.2rem;
    font-size: 0.4rem;
    font-weight: 100;
    background: @blue;
    color: #fff;
    text-align: center;
    line-height: 1.2rem;
    font-weight: 500;
  }
  .header_left {
    width: 0.4rem;
    position: absolute;
    left: 0.5rem;
    top: 0.45rem;
  }
  p {
    color: @blue;
    line-height: 1.2rem;
    margin-left: 0.5rem;
    font-size: 0.38rem;
    img {
      vertical-align: middle;
      width: 0.5rem;
      margin-right: 0.2rem;
    }
  }
  .BusinessConfiguration_body {
    position: absolute;
    width: 100%;
    top: 2.4rem;
    ul {
      width: 100%;
      height: auto;
      background: #fff;
      li {
        width: 90%;
        height: 1.2rem;
        margin: 0 auto;
        line-height: 1.2rem;
        border-bottom: 1px solid #d9d9d9; /* no */
        font-size: 0.38rem;
        .van-switch {
          float: right;
          margin-top: 0.4rem;
        }
        span {
          display: block;
          float: right;
        }
        #input {
          float: right;
          width: 2.2rem;
        }
      }
    }
    .configDetail {
      width: 100%;
      height: 6rem;
      background: #fff;
      .configList {
        width: 100%;
        height: auto;
        li {
          width: 90%;
          height: 1rem;
          line-height: 1rem;
          border: none;
          font-size: 0.35rem;
          img {
            width: 0.55rem;
            vertical-align: middle;
          }
          span {
            float: left;
          }
          p {
            width: 55%;
            height: 1rem;
            line-height: 1rem;
            float: right;
            margin: 0;
            color: #000;
            input {
              width: 1.7rem;
              height: 0.65rem;
              border: 1px solid #07a0e4; /* no */
              border-radius: 5px; /* no */
              text-align: center;
            }
            b {
              color: #07a0e4;
              font-size: 0.5rem;
            }
            .input {
              width: 2rem;
            }
          }
        }
        li:nth-child(1) {
          width: 95%;
          background: #f5f5f5;
          padding-left: 0.5rem;
          color: #1c8cff;
        }
      }
    }
  }
  button {
    position: absolute;
    bottom: 1rem;
    width: 90%;
    height: 1rem;
    margin: 0 auto;
    left: 0;
    right: 0;
    border: none;
    background: #1c8cff;
    border-radius: 5px; /* no */
    color: #fff;
    font-size: 0.37rem;
  }
}
.configSuccessed {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  background: url("~@/assets/image/Manger/Agents/terminal_bg.png") no-repeat;
  background-size: 100% 100%;
  z-index: 300;
  p {
    width: 50%;
    font-size: 0.45rem;
    color: #fff;
    margin: 8.5rem auto;
  }
  ul {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 1.5rem;
    li {
      width: 30%;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background: #242e3e;
      border-radius: 5px; /* no */
      color: #fff;
      font-size: 0.35rem;
    }
    li:nth-child(2) {
      background: NONE;
      border: 1px solid #242e3e; /* no */
      color: #242e3e;
    }
  }
}
</style>