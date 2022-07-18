<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="(address, index) in userAddressList"
        :key="address.id"
      >
        <span
          class="username"
          :class="{ selected: address.isDefault === '1' }"
          >{{ address.consignee }}</span
        >
        <p @click="changeDefault(address, userAddressList)">
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-if="address.isDefault === '1'">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="(detail, index) in detailArrayList"
          :key="detail.skuId"
        >
          <li>
            <img
              :src="detail.imgUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </li>
          <li>
            <p>
              {{ detail.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ detail.orderPrice }}</h3>
          </li>
          <li>X{{ detail.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="message"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ tradeInfo.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ tradeInfo.totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ tradeInfo.totalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ defaultAddress.fullAddress }}</span>
        收货人：<span>{{ defaultAddress.consignee }}</span>
        <span>{{ defaultAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a href="javascript:;" @click="submitOrder" class="subBtn">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return {
      message: "", //收集用户输入的留言信息
    };
  },
  //组件内守卫
  //组件内守卫，它的执行时机是在created之前的，也就是说组件还没创建呢
  //因此如果这个守卫内部使用到this，不能直接使用
  //如果你非要使用组件对象实例，那么在守卫当中得传一个回调函数
  // next(vm => {
  //   // 通过 `vm` 访问组件实例
  // })

  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建

  //   next((vm) => {
  //     //vm就是你的this
  //     if (from.path === "/shopcart") {
  //       let message = vm.message;
  //       next();
  //     } else {
  //       alert("只有从购物车界面才能跳转到交易页面（创建订单");
  //       next(false);
  //     }
  //   });
  // },

  mounted() {
    this.getUserAddressList();
    this.getTradeInfo();
  },
  methods: {
    //请求获取用户收货地址
    getUserAddressList() {
      this.$store.dispatch("getUserAddressList");
    },
    //请求获取交易页面信息
    getTradeInfo() {
      this.$store.dispatch("getTradeInfo");
    },
    //点击修改默认地址(排它)
    changeDefault(address, userAddressList) {
      userAddressList.forEach((item) => (item.isDefault = "0"));
      address.isDefault = "1";
    },

    //点击提交订单逻辑
    async submitOrder() {
      //首先要发请求创建订单
      //准备参数
      let tradeNo = this.tradeInfo.tradeNo; //交易编号，是在交易页面信息当中
      let tradeInfo = {
        consignee: this.defaultAddress.consignee,
        consigneeTel: this.defaultAddress.phoneNum,
        deliveryAddress: this.defaultAddress.fullAddress,
        paymentWay: "ONLINE",
        orderComment: this.message,
        orderDetailList: this.detailArrayList,
      };
      const result = await this.$API.reqSubmitOrder(tradeNo, tradeInfo);
      if (result.code === 200) {
        //请求成功会返回订单编号
        alert("创建订单成功，准备去往支付页面");
        //可以跳转到支付页面，需要把返回的订单编号给带上
        this.$router.push("/pay?orderNum=" + result.data);
      }
    },
  },
  computed: {
    ...mapGetters(["detailArrayList"]),

    ...mapState({
      userAddressList: (state) => state.user.userAddressList,
      tradeInfo: (state) => state.trade.tradeInfo,
    }),

    //点击哪一个地址，需要计算最终收货的地址信息，在最下方  find  findIndex
    //find    找到符合条件的某一项
    //findIndex  找到符合条件的某一项的下标

    defaultAddress() {
      return this.userAddressList.find((item) => item.isDefault === "1") || {};
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;

        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>