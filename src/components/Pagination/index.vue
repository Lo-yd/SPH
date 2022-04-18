<template>
  <div class="pagination">
    <button>上一页</button>
    <button>1</button>
    <button>···</button>
    <button v-for="(page, index) in startAndEnd" :key="index">
      {{ page }}
    </button>
    <button>···</button>
    <button>{{ totalPage }}</button>
    <button>下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    //总页数
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    //计算出起始页码的数
    startNumAndEedNum () {
      const { pageNo, pageSize, total, continues } = this
      let start = 0, end = 0
      if (continues > this.totalPage) {
        start = 1
        end = this.totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > this.totalPage) {
          start = this.totalPage - continues + 1
        }
      }
      return { start, end }
    },
    //页码 continues 基数
    startAndEnd () {
      let arr = []
      for (let i = this.startNumAndEedNum.start; i <= this.startNumAndEedNum.end; i++) {
        arr.push(i)
      }
      return arr
    }
  }
}
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