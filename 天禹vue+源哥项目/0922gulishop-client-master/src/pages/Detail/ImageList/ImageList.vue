<template>
  <div class="swiper-container" ref="imgSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img
          :src="img.imgUrl"
          :class="{ active: index === defaultIndex }"
          @click="changeDefaultIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      defaultIndex: 0,// 小图组件哪个图片有橙色边框的参考数据
    };
  },
  methods: {
    changeDefaultIndex(index) {
      this.defaultIndex = index;
      //把当前这个index传递给zoom
      this.$bus.$emit("changeDefaultIndex", index);
    },
  },
  watch: {
    imgList: {
      immediate: true, //这里加它没什么用，就是为了让和floor的代码一致
      handler(newVal, oldVal) {
        //当数据一旦有变化，那么我们就去实例化swiper,但是发现不行
        //我们就得考虑是不是页面还是没形成呢？答案是肯定的，也就说有了数据，上面页面才开始v-for形成结构
        //得等结构完全形成之后再去实例化

        //在最近的一次页面更新完成之后，执行nextTick当中传递的回调函数
        // nextTick是页面最近的一次更新完成之后才会执行
        // updated 是只要页面有数据更新，那么就会执行，执行不关心是不是最近一次更新
        this.$nextTick(() => {
          new Swiper(this.$refs.imgSwiper, {
            
            slidesPerView:4,   //一个视图放几张
            slidesPerGroup:4,  //切换一组，几张图片

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>