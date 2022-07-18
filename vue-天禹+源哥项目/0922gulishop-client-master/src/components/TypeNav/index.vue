<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="isShow = true">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                :class="{ item_on: currentIndex === index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="moveInItem(index)"
              >
                <h3>
                  <!-- =右侧，只要出现[],就代表一个新的数组来了
                只要出现了{}就代表一个新的对象来了
                只要出现了function就代表一个新的函数来了 -->

                  <!-- 第一种写法：所有的a标签换成router-link，会卡，因为组件标签太多了，导致内存当中组件对象很多，所以效率不高 -->
                  <!-- <router-link
                  :to="{
                    name: 'search',
                    query: {
                      category1Id: c1.categoryId,
                      categoryName: c1.categoryName,
                    },
                  }"
                  >{{ c1.categoryName }}</router-link
                > -->

                  <!-- 第二种写法：把声明式导航改为编程式导航,click事件，点击之后，是需要调用函数的，同样
                每个a标签都添加了点击事件，那么内存中就会定义很多个函数，内存占用也是比较大的，效率虽然
                比声明式导航强，但是还是不够好-->
                  <!-- <a
                  href="javascript:;"
                  @click="
                    $router.push({
                      name: 'search',
                      query: {
                        category1Id: c1.categoryId,
                        categoryName: c1.categoryName,
                      },
                    })
                  "
                  >{{ c1.categoryName }}</a
                > -->

                  <!-- 事件委派处理：找公共的离自己最近的祖先元素，这个祖先元素只有一个 -->
                  <a
                    href="javascript:;"
                    :data-category1Id="c1.categoryId"
                    :data-categoryName="c1.categoryName"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            category2Id: c2.categoryId,
                            categoryName: c2.categoryName,
                          },
                        }"
                        >{{ c2.categoryName }}</router-link
                      > -->

                        <!-- <a
                        href="javascript:;"
                        @click="
                          $router.push({
                            name: 'search',
                            query: {
                              category2Id: c2.categoryId,
                              categoryName: c2.categoryName,
                            },
                          })
                        "
                        >{{ c2.categoryName }}</a
                      > -->
                        <a
                          href="javascript:;"
                          :data-category2Id="c2.categoryId"
                          :data-categoryName="c2.categoryName"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <!-- <router-link
                          :to="{
                            name: 'search',
                            query: {
                              category3Id: c3.categoryId,
                              categoryName: c3.categoryName,
                            },
                          }"
                          >{{ c3.categoryName }}</router-link
                        > -->

                          <!-- <a
                          href="javascript:;"
                          @click="
                            $router.push({
                              name: 'search',
                              query: {
                                category3Id: c3.categoryId,
                                categoryName: c3.categoryName,
                              },
                            })
                          "
                          >{{ c3.categoryName }}</a
                        > -->
                          <a
                            href="javascript:;"
                            :data-category3Id="c3.categoryId"
                            :data-categoryName="c3.categoryName"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import _ from 'lodash'  //这样引入会把整个lodash全部引入，打包后体积比较大
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  //组件在挂载完成的时候，就立马发请求获取数据，存储到vuex里面，而不是直接在vue组件里面
  mounted() {
    // dispatch是分发和触发的意思，和emit单词意思一样
    // 本质其实就是在调用指定的action函数

    // 如果发请求在这发，只要home和search切换，每一次
    //home和search内部都需要重新创建typeNav组件，mounted就会重新执行
    //请求就会重复发，而三级分类列表数据是一样的，没必要发那么多次

    // this.$store.dispatch("getCategoryList");

    if (this.$route.path !== "/home") {
      //证明这个组件是在search里面的，需要i一上来就隐藏sort
      this.isShow = false;
    }
  },

  methods: {
    // _.throttle(renewToken, 300000, { 'trailing': false });

    //没节流的时候
    // moveInItem(index){
    //   this.currentIndex = index
    //   console.log(index)
    // }

    //节流后，传递的函数不能用箭头函数，因为箭头函数内部this不是组件对象

    moveInItem: throttle(
      function (index) {
        this.currentIndex = index;
        console.log(index);
      },
      20,
      { trailing: false }
    ),

    //事件委派click的回调函数
    toSearch(event) {
      //event是什么，就是浏览器调用函数传递过来的事件对象，代表你传递的$event，只能在模板里面出现
      let targetNode = event.target; //获取我们的目标元素（真正发生事件的元素）
      // console.log(targetNode);
      let data = targetNode.dataset; //获取当前目标元素身上data-属性   组成的对象
      // console.log(data)
      // 怎么知道点击的是不是a标签？
      //如果是a标签，那么data一定是有categoryname的
      //如果点的不是a标签，那么data就没有categoryname的
      // 参数怎么携带，要携带携带哪些个的参数？
      //如果点的是a标签，那么参数已经带过来了，就在我们的data当中
      let { category1id, category2id, category3id, categoryname } = data;

      if (categoryname) {
        // categoryname存在证明点击的就是a标签
        let location = {
          name: "search",
        };
        let query = {
          categoryName: categoryname,
        };

        //确定是一级还是二级还是三级的id
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        //找到所有的query参数以后，最后把query放到location里面
        location.query = query;
        // 最终把location对象就构造好了，跳转


        //跳转之前，要合并原来过来时候带的params参数
        //看看之前过来有没有params参数，有的话这次跳就一起带上
        if(this.$route.params){
          location.params = this.$route.params
        }

        //如果是从home页跳search页，就push
        //如果是search页跳search页，就replace
        if(this.$route.path !== '/home'){
          this.$router.replace(location);
        }else{
          this.$router.push(location);
        }
      }
    },

    moveOutDiv() {
      this.currentIndex = -1;
      //移出外部咱们自己添加的div，得去判断是在home页面移出还是在search页面移出
      if (this.$route.path !== "/home") {
        //证明这个组件是在search里面的，需要让sort隐藏
        this.isShow = false;
      }
    },
  },

  // event是事件对象
  // 每一次触发事件的时候，系统（浏览器内核）都会把这一次触发事件相关的所有信息，封装为一个对象
  // 在浏览器调用回调函数的时候，自动传递给回调函数的第一个形参

  // 回调函数：自己定义的  自己没调用  最后执行了

  // box.onclick = function(event){
  //   // event ?
  // }

  //从vuex当中把数据捞到vue组件当中使用
  //以后只要从vuex拿的是数据(state和getters当中的东西)，都在computed当中拿，
  //以后只要从vuex拿的是方法(mutations和actions当中的东西)，都在methods当中去拿，一般用的很少
  computed: {
    //函数内部可以是数组也可以是对象
    //是数组必须要满足条件：
    //1、数据直接就是总的state当中的数据，不能是模块里面的
    //2、数组当中的名字必须和state当中的名字一致
    // ...mapState(['categoryList'])
    //不能这么干，因为categoryList，不是state.categoryList,而是state.home.categoryList

    ...mapState({
      // 必须使用对象，而且返回的是state.home.categoryList
      categoryList: (state) => state.home.categoryList,
    }),

    // ...mapGetters([])
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background:skyblue;
      z-index: 999;

      &.sort-enter{
        height: 0;
        opacity: 0;
      }
      &.sort-enter-to{
        height: 461px;
        opacity: 1;
      }
      &.sort-enter-active{
        transition: all .5s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 616px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
