<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.user.userInfo.name">
            <span>欢迎您：</span>
            <a href="javascript:;">{{$store.state.user.userInfo.name}}</a>
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
          </p>

          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <!-- <a href="###">登录</a> -->
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###" class="register">免费注册</a> -->
          </p>

        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <!-- <a href="###">我的订单</a> -->
          <router-link to="/shopcart">我的购物车</router-link>
          <!-- <a href="###">我的购物车</a> -->
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyword: "",
    };
  },

  mounted() {
    this.$bus.$on("clearKeyword", this.clearKeyword);
  },

  methods: {
    toSearch() {
      //一、路由传参种类：params参数和query参数
      // params参数是属于路径的一部分，路由当中匹配的时候，path路径是要照顾到这个参数的
      // query 参数是在路径后面，以？分割 ，？后面的  a = b & c = d就是你的query参数
      //query参数是不属于路径的一部分，路由匹配的时候，path路径不需要关心我这个参数

      //二、路由路径带参数的三种写法
      // 1、字符串写法
      // this.$router.push('/search/'+this.keyword + '?keyword1=' + this.keyword.toUpperCase())
      // 2、模板字符串
      // this.$router.push(`/search/${this.keyword}?keyword1=${this.keyword.toUpperCase()}`)
      // 3、对象写法（重点）
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword },
      //   query: { keyword1: this.keyword.toUpperCase() },
      // });

      // 面试1
      //指定params参数时可不可以用path和params配置的组合?（对象写法）
      //如果传递的参数只有query参数，没有params参数，那么我们可以不用name,可以使用path
      //如果传递的参数包含params参数，就不能使用path去配合，只能用name去配合
      //对象写法，最好以后写name,因为name既能和params去配合也能和query去配合
      //而path，只能和query去配合，不能和params配合

      // this.$router.push({
      //   // path:'/search',
      //   name:'search',
      //   params: { keyword: this.keyword },
      //   query: { keyword1: this.keyword.toUpperCase() },
      // });

      // 面试2   如何让params参数可传可不传   路由配置path路径后面占位后+？

      // 面试3   如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
      // 1、不传params参数
      // 2、首先必须在params参数可传可不传的前提下，当传递的参数是空串的时候，传递成undefined,就不出问题

      let location = {
        name: "search",
        params: { keyword: this.keyword || undefined },
        // query: { keyword1: this.keyword.toUpperCase() },
      };

      //跳转之前一样的，也得判断之前过来有没有带query参数，有的话这次一起带上（合并参数）
      if (this.$route.query) {
        location.query = this.$route.query;
      }

      //如果是从home页跳search页，就push
      //如果是search页跳search页，就replace
      if (this.$route.path !== "/home") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }

      // 面试问题5: 路由组件能不能传递props数据?
      // 可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
      // 实现: props: (route)=>({keyword1:route.params.keyword, keyword2: route.query.keyword })

      // 面试6 ，vue-router使用的是3.1.0以上的版本，如果多次点击使用编程式导航，而参数没发生变化
      //会报NavigationDuplicated的警告错误
      //解决1，但是不好
      // this.$router.push({
      //   name: "search",
      //   params: { keyword: this.keyword || undefined},
      //   query: { keyword1: this.keyword.toUpperCase() },
      // }).catch(() => {});

      //解决2，修改路由器对象，原型的方法
    },

    clearKeyword() {
      this.keyword = "";
    },
    //退出登录
    async logout(){
      try {
        await this.$store.dispatch('userLogout')
        alert('退出登录成功')
        this.$router.push('/')
      } catch (error) {
        alert('退出登录失败')
      }
      
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
