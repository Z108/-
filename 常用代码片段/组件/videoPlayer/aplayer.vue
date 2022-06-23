<template>
  <!-- 指定 lrcType 为 0，表示禁用歌词 -->
  <aplayer :audio="audio" :lrcType="0" />
</template>

<script>
export default {
  props: ["datas","url","cover"],
  mounted(){
      console.log(this.datas,this.url,this.cover)
  },
  data() {
    return {
      audio: {
        name: this.datas.title, //名称
        artist: this.datas.speaker, //作者
        url:this.datas.audioUrl, //地址
        cover: this.datas.picturesUrl[0], // 封面图片
        lrc: "", //歌词
      },
    };
  },
};
//Api
// https://aplayer.netlify.app/docs/api/
</script>
