<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floor.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(nav, index) in floor.navList"
              :key="nav.text"
            >
              <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floor.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="floor.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- <div class="swiper-container" ref="floorSwiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(carouse, index) in floor.carouselList"
                    :key="carouse.id"
                  >
                    <img :src="carouse.imgUrl" />
                  </div>
                </div> -->
                <!-- 如果需要分页器 -->
                <!-- <div class="swiper-pagination"></div> -->

                <!-- 如果需要导航按钮 -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div> -->
              <SlideLoop :bannerList="floor.carouselList"></SlideLoop>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from "swiper";

export default {
  name: "",
  props: ["floor"], //声明接收属性，后面通过这个属性可以获取到属性值，这个floor就是组件对象的数据了

  //在listContainer内部，轮播图直接在这实例化是不行的，最终采用watch+nextTick才完成的
  //而floor当中的轮播图，为啥就直接成功了？
  //它肯定是在页面形成之后才实例化的
  //原因：  刚才在banner的时候，数据是在mounted里面请求的，
  //必须等待数据请求回来，然后根据数据创建好结构，才能实例化swiper

  // 现在我们的floor不需要，因为在floor当中，不存在请求数据，数据早都请求回来了
  // 在Home组件当中请求的数据，而且floor组件的创建必须是根据请求回来的数据vfor才能创建
  // 所以floor中实例化的时候，数据一定是存在的，结构也就不需要等待数据，早早就形成了

  // mounted() {
  // new Swiper(this.$refs.floorSwiper, {
  //   // direction: "vertical", // 垂直切换选项，去掉就代表轮播是水平的

  //   loop: true, // 循环模式选项   无缝的开关

  //   // 如果需要分页器      小圆点
  //   pagination: {
  //     el: ".swiper-pagination",
  //   },

  //   // 如果需要前进后退按钮
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },

  //   // 如果需要滚动条
  //   // scrollbar: {
  //   //   el: ".swiper-scrollbar",
  //   // },
  // });
  // },

  //这里监视，是监视不到数据变化的，因为数据早都过来的 （3 - 3不会变化）
  //而listContainer是可以监视到数据 0 - 4的变化
  // watch: {
  //   floor: {
  //     immediate:true,//无论有没有检测到数据变化，都立即执行一次回调函数
  //     handler(newVal, oldVal) {
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.floorSwiper, {
  //           // direction: "vertical", // 垂直切换选项，去掉就代表轮播是水平的

  //           loop: true, // 循环模式选项   无缝的开关

  //           // 如果需要分页器      小圆点
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },

  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },

  //           // 如果需要滚动条
  //           // scrollbar: {
  //           //   el: ".swiper-scrollbar",
  //           // },
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
