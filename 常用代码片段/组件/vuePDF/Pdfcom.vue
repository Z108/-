<template>
  <div class="Pdfcom">
    <div class="control">
      <button class="btn" @click.stop="prePage">上一页</button>
      <button class="btn" @click.stop="nextPage">下一页</button>
      <button class="btn" @click.stop="clock">顺时针旋转</button>
      <button class="btn" @click.stop="counterClock">逆时针旋转</button>
      <button class="btn" @click.stop="printAll">打印全部</button>
      <button class="btn" @click.stop="pdfPrint">部分打印</button>
      <button class="btn">{{ pageNum }}/{{ pageTotalNum }}</button>
      <button class="btn">进度：{{ loadedRatio }}</button>
      <button class="btn">加载成功: {{ curPageNum }}</button>
    </div>
    <div class="pdfwp">
      <pdf
        ref="pdf"
        :src="url"
        :page="pageNum"
        :rotate="pageRotate"
        @password="password"
        @progress="loadedRatio = $event"
        @page-loaded="pageLoaded($event)"
        @num-pages="pageTotalNum = $event"
        @error="pdfError($event)"
        @link-clicked="page = $event"
      ></pdf>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import pdf from "vue-pdf";
export default {
  props: ["url"],
  name: "Home",
  components: {
    pdf,
  },
  data() {
    return {
      pageTotalNum: 1, //总页数
      pageRotate: 0, //旋转
      loadedRatio: 0, //加载进度
      curPageNum: 0, //
      pageNum: 1, //当前页
      password: "", //打开受密码保护的 PDF 时调用的回调
    };
  },
  methods: {
    //上一页
    prePage() {
      var p = this.pageNum;
      p = p > 1 ? p - 1 : this.pageTotalNum;
      this.pageNum = p;
    },
    //下一页
    nextPage() {
      if (this.pageTotalNum > 1) {
        this.pageNum++;
        if (this.pageNum > this.pageTotalNum) {
          return (this.pageNum = 1);
        }
      } else {
        alert("无信息");
      }
    },
    //顺时针旋转
    clock() {
      this.pageRotate += 90;
    },
    //逆时针旋转
    counterClock() {
      this.pageRotate -= 90;
    },
    pageLoaded(e) {
      this.curPageNum = e;
    },
    pdfError(error) {
      console.error(error);
    },
    printAll() {
      this.$refs.pdf.print();
    },
  },
};
</script>
<style scoped>
.control {
  width: 90%;
  position: sticky;
  top: 10px;
  left: 50px;
  z-index: 22;
}
.btn {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  width: 100px;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 20px;
  background-color: blanchedalmond;
}
.pdfwp {
  clear: both;
  border: 1px solid #ccc;
  width: 50%;
  margin: 10px auto;
}
</style>