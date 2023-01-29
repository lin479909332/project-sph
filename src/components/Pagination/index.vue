<template>
  <div class="pagination">
    <!-- 上面部分 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start >= 2"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start >= 3">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(n, index) in continues"
      :key="index"
      @click="$emit('getPageNo', n + startNumAndEndNum.start - 1)"
      :class="{ active: pageNo == n + startNumAndEndNum.start - 1 }"
    >
      {{ n + startNumAndEndNum.start - 1 }}
    </button>

    <!-- 下面部分 -->
    <button v-if="totalPage - startNumAndEndNum.end >= 2">···</button>
    <button
      v-if="totalPage > startNumAndEndNum.end"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  name: "Pagination",
  /*
  pageNo:当前页码
  pageSize:页面大小（一页包含几个数据）
  total:一共有多少条数据
  continues：连续页码
  */
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //最大页码，通过计算 总数/页面大小 后向上取整获得
    totalPage() {
      //Math.ceil 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算起始页码和结束页码
    startNumAndEndNum() {
      //解构赋值
      const { continues, totalPage, pageNo } = this;
      //起始页码和结束页面的变量初始号
      let start = 0,
        end = 0;
      //情况1 连续页码数大于总页码数
      if (continues > totalPage) {
        //将start修正为第1页，end修正为总页码数
        start = 1;
        end = totalPage;
      } else {
        //情况2（大部分正常情况的）例如当前页面为8 连续页码数为5 则为 6 7 8 9 10
        //start为起始页码 减去 连续页码除以2后向下取整
        start = pageNo - parseInt(continues / 2);
        //end为起始页码 加上 连续页码除以2后向下取整
        end = pageNo + parseInt(continues / 2);
        // start小于1的情况，过前的页面，避免start出现0和负数
        if (start < 1) {
          //start修正为1，end修正尾连续页码数
          start = 1;
          end = continues;
        }
        // end大于总页码的情况
        if (end > totalPage) {
          //将end修正为最后一页（即总页码数）
          end = totalPage;
          //start 修正为总页码数减去连续页码+1
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
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
