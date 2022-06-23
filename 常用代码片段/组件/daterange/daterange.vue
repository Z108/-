<!-- 时间范围选择 
    选择今天之前的日期
    数据格式 yyyy-MM-dd
-->
<template>
  <el-date-picker
    size="mini"
    v-model="datePicker"
    type="daterange"
    :range-separator="separator"
    :start-placeholder="startPlaceholder"
    :default-value="LastMonth"
    :end-placeholder="endPlaceholder"
    :picker-options="pickerOptions0"
    :value-format="format"
    @change='getDate'
  >
  </el-date-picker>
</template>

<script>
export default {
  components: {},
  prop:{
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    size:{
      type: String,
      default: "mini",
    },
    separator:{
      type: String,
      default: "至",
    },
    startPlaceholder:{
      type: String,
      default: "开始日期",
    },
    endPlaceholder:{
      type: String,
      default: "结束日期",
    },
  },
  data() {
    return {
      pickerOptions0: {//格式，禁用不符合条件的日期
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果不包括今天。就是return time.getTime() > Date.now() - 24*3600*1000;
        },
      },
      LastMonth: this.getLastMonth(),//上个月1号
      datePicker: null,//日期数据 [yyyy-MM-dd,yyyy-MM-dd]
    };
  },

  mounted() {},

  methods: {
    // 获取上个月1号，给组件以默认值
    getLastMonth() {
      const target = new Date();
      let yy, MM;
      if (target.getMonth() <= 0) {
        yy = target.getFullYear() - 1;
        MM = 12;
      } else {
        yy = target.getFullYear();
        MM = target.getMonth();
      }
      return [`${yy}-${MM}-01`];
    },
    getDate(val){
      console.log(val);
      this.$emit("getDate",this.datePicker)
    }
  },
};
</script>
<style lang='less' scoped>
</style>