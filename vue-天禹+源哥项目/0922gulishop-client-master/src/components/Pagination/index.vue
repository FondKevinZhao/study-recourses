<template>
  <div class="pagination">
    <!-- 上一页并不是什么时候都能点击，当当前页就是第一页的时候，那么就应该禁用不能点击 -->
    <button :disabled="currentPageNo === 1" @click="$emit('changePageNo',currentPageNo - 1)">上一页</button>
    <!-- 这个1不是永远可以显示，因为我们下面会显示连续页码，如果连续页面刚好就是1-5，那么这个1就不要了，要不就重复了-->
    <!-- 这个1要显示，那么start就不能是1，不能是1就一定大于1 -->
    <button v-if="startEnd.start > 1" @click="$emit('changePageNo',1)">1</button>
    <!-- 这个三点也不是永远可以显示的 当start的值比2大的时候，这个三点永远显示-->
    <button v-if="startEnd.start > 2">···</button>

    <!-- 这里是用来显示连续页的 -->
    <!-- vfor遍历的时候，可以是遍历一个数组，还可以遍历一个数字 -->
    <!-- vfor可以和vif同时使用，vfor优先级比vif高  （面试题原题） -->
    <button
      :class="{ active: currentPageNo === page }"
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      @click="$emit('changePageNo',page)"
    >
      {{ page }}
    </button>

    <!-- 这个三点页不是永远显示的，当end比总页码-1 还要小，后面的三点才会显示 -->
    <button v-if="startEnd.end < totalPageNo - 1">···</button>
    <button v-if="startEnd.end < totalPageNo" @click="$emit('changePageNo',totalPageNo)">{{ totalPageNo }}</button>
    <button :disabled="currentPageNo === totalPageNo" @click="$emit('changePageNo',currentPageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNo: Number,
    total: {
      type: Number,
      default: 0, 
      //必须给一个默认值，否则会报一个错误，说total是undefined
      //searchInfo是根据请求回来的数据，请求回来的数据是需要时间的
      //当searchInfo没回来的时候就是空对象，因此传递过来就是undefiend
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    continueNo: {
      type: Number,
      required: true,
    },
  },

  computed: {
    //计算总页码
    totalPageNo() {
      let { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },

    //计算连续页的起始位置和结束位置（小学数学）
    startEnd() {
      let { continueNo, currentPageNo, totalPageNo } = this;
      let start = 0;
      let end = 0;
      if (continueNo >= totalPageNo) {
        //假设传递的连续页数比我最大的页码还要大，代表我根本没有那么多连续页
        start = 1;
        end = totalPageNo;
      } else {
        //正常情况
        start = currentPageNo - Math.floor(continueNo / 2);
        end = currentPageNo + Math.floor(continueNo / 2);

        
        //非正常情况
        if (start <= 0) {
          //再左侧非正常情况，需要把计算的start和end修正一下
          start = 1;
          end = continueNo; //end += 1 - start
        }

        if (end > totalPageNo) {
          //再右侧非正常情况，需要把计算的start和end修正一下
          end = totalPageNo;
          start = totalPageNo - continueNo + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
