<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list">
          <li
            v-for="(trademark, index) in trademarkList"
            :key="trademark.tmId"
            @click="searchForTrademark(trademark)"
          >
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      <!-- <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div> -->
    </div>
    <div
      class="type-wrap"
      v-for="(attr, index) in attrsList"
      :key="attr.attrId"
    >
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index">
            <a href="javascript:;" @click="searchForProps(attrValue,attr)">{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SearchSelector",
  computed: {
    ...mapGetters(["attrsList", "trademarkList"]),
  },

  methods:{
    // 点击品牌的回调
    searchForTrademark(trademark){
      //讲道理，在这个回调当中，我们需要把searchParams当中的参数trademark改完
      //需要发请求获取搜索结果数据
      //但是前面我们相干的都不能在子组件当中去做，因为searchParams和发请求的所有数据都是在父组件当中的
      //如果非要在子组件当中完成，通信比较麻烦
      //最终我们决定，当用户点击品牌，我们把品牌传递给父组件，在父组件当中修改searchParams和发请求是最简单的

      //子向父
      // props（传函数）   自定义事件
      this.$emit('searchForTrademark',trademark) //用户点击把trademark传递给父组件，在父组件当中去干活
    },

    //点击平台属性值的回调
    searchForProps(attrValue,attr){
      this.$emit('searchForProps',attrValue,attr)
    }
  }
};
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>