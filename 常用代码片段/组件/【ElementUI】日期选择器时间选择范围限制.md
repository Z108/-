# ElementUI组件特殊修改

## [日期选择器时间选择范围限制](https://www.cnblogs.com/xjcjcsy/p/7977966.html)

### **单个输入框的**

**组件代码：**

```vue
<el-date-picker
       v-model="value1"
       type="date"
       placeholder="选择日期"
       :picker-options="pickerOptions0">
</el-date-picker>
```

#### 1、 设置选择今天以及今天之后的日期

```vue
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },  
   }     
}    
```

#### **2、 设置选择今天以及今天以前的日期**

```vue
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },  
   }     
}   
```

#### **3、 设置选择今天之后的日期（不能选择当天时间）**

```vue
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },  
   }     
}    
```

#### **4、 设置选择今天之前的日期（不能选择当天）**

```vue
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },  
   }     
}    
```

#### **5、 设置选择三个月之前到今天的日期**

```vue
data (){
   return {
       pickerOptions0: {
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let three = 90 * 24 * 3600 * 1000;
            let threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths;;
          }
        },  
   }     
} 
```

#### 6、daterange范围

```vue
<el-date-picker
                size="mini"
                v-model="form.Date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-value="LastMonth"
                :picker-options="pickerOptions0"
                value-format="yyyy-MM-dd"
                >
</el-date-picker>
```

```vue
data (){
   return {
      // 时间筛选规则
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果不包括今天。就是return time.getTime() > Date.now() - 24*3600*1000;
        },
      },
      LastMonth: this.$config.getLastMonth(), // 上个月1号，展示时间筛选框
   }     
},
methods:{
// 获取上个月1号，用于时间筛选展示
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
}
```



### **两个输入框**

　　**组件代码**

```vue
<el-date-picker
       v-model="value1"
       type="date"
       placeholder="开始日期"
       :picker-options="pickerOptions0">
</el-date-picker>
<el-date-picker
       v-model="value2"
       type="date"
       placeholder="结束日期"
       :picker-options="pickerOptions1">
</el-date-picker>
```

#### 1、 限制结束日期不能大于开始日期

```vue
data(){
    return {
         pickerOptions0: {
                disabledDate: (time) => {
                    if (this.value2 != "") {
                        return time.getTime() > Date.now() || time.getTime() > this.value2;
                    } else {
                        return time.getTime() > Date.now();
                    }

                }
            },
            pickerOptions1: {
                disabledDate: (time) => {
                    return time.getTime() < this.value1 || time.getTime() > Date.now();
                }
            },
    }      
}       
```

　　针对选择范围(type="daterange")的日期筛选，类似于单个输入框的情况，直接使用参数time进行判断



### 特殊日期选择

#### 1、季度选择器

```
  <el-form-item
                label="时间区间："
                prop="selectDate"
                v-if="form.fType == 3"
              >
                <date-picker
                  v-model="form.selectDate"
                  type="quarter"
                  clearable
                  format="yyyy年QQ季度"
                  value-format="yyyy-QQ"
                  placeholder="选择季度"
                  popper-class="quarterPickerPoper"
                  :default-value="new Date()"
                  @focus="datePickerOnfocus"
                >
                </date-picker>
              </el-form-item>
              
 import DatePicker from "@thtf/element-datepicker";             
              
  //季度选择器用的插件有点问题，这边用js调整一下
    datePickerOnfocus() {
      this.$nextTick(() => {
        setTimeout(() => {
          summaryUtil.adjustDatePickerPanerStyle(".quarterPickerPoper");
        }, 200);
      });
    },
  
  
```







## 输入框（自动补全）

### 筛选内容自动补全组件

```vue
		<el-autocomplete
            size="mini"
            clearable
            class="inline-input"
            v-model="form.userName"
            :fetch-suggestions="querySearch"
            placeholder="请输入会员姓名"
            @select="handleSelect"
            @keyup.enter.native="onSubmit(null)"
          ></el-autocomplete>

 		<el-autocomplete
            size="mini"
            clearable
            class="inline-input"
            v-model="form.phone"
            :fetch-suggestions="querySearch1"
            placeholder="请输入手机号"
            @select="handleSelect"
            @keyup.enter.native="onSubmit(null)"
          ></el-autocomplete>
data:{
	form: { userName: "", phone: "", id: "" }, //会员查询
    formData: { startTime: "",endTime: ""},//时间查询
    ForeMemberNameList: [], // 会员姓名&手机号
    ForeMemberPhoneList: [], // 会员手机号
    ForeMemberAndCustom: {}, // 会员基本信息
}

method:
 	querySearch(queryString, cb) {
      if (this.ForeMemberNameList.length > 0) {
        var restaurants = this.ForeMemberNameList;
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        cb(results);
      } else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.querySearch(queryString, cb);
        }, 1000);
      }
    },
    querySearch1(queryString, cb) {
      if (this.ForeMemberPhoneList.length > 0) {
        var restaurants = this.ForeMemberPhoneList;
        var results = queryString
          ? restaurants.filter(this.createFilter(queryString))
          : restaurants;
        cb(results);
      } else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.querySearch(queryString, cb);
        }, 1000);
      }
    },
//单个条件赋值联动
 handleSelect(item) {
      this.form = { userName: item.name, phone: item.phone, id: item.id };
    },
onSubmit(){
    // 会员查询
        if (this.form.userName == "" && this.form.phone == "")
          return this.$message.error("会员姓名&手机号请先至少填写一项！");

        if (this.form.userName && this.form.phone && this.form.id) {
          // 下拉列表选择
          this.params.userName = this.form.userName;
          this.params.phone = this.form.phone;
          this.params.memberId = this.form.id;
        } else {
          // 单个条件筛选
          // 查找符合条件数据
          let filterData = this.ForeMemberNameList.filter(
            (item) =>
              item.name == this.form.userName || item.phone == this.form.phone
          )[0];
          if (!filterData) return this.$message.error("无效会员姓名&手机号！");
          let { id, name, phone } = filterData;
          this.params.userName = name;
          this.params.phone = phone;
          this.params.memberId = id;
        }
        this.checkDate();//筛选接口
}

```



## 表格

### 跨页多选

```vue
 <el-table
            ref="multipleTable"
            :data="tableData"
            border
            size="mini"
            :row-key="getRowKeys" *
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              :reserve-selection="true" *
              type="selection"
              width="40"
            >
            </el-table-column>
 </el-table>
//返回数据id *
  getRowKeys(row) {
      return row.id;
    },
    // 批量选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },



```



### 后端排序

```
 <el-table
      :data="tableData"
      @sort-change="sorTable" //*
    >
      <el-table-column
        label="企业分类"
        sortable="custom"  //*
        prop="businessType"
      ></el-table-column>
  </el-table>
  
  //排序方法
   sorTable({ prop, order }) {
      this.params.fieldOrder = prop; //true String  排序字段
      this.params.order = order == "ascending" ? 1 : 2; // true number  1:升序  2降序
      this.requestTable()
    },
```



### 改变单个单元格背景颜色

```
 <el-table :cell-style="yellowBg"></el-table>
 
methods中：
    // 未指派时，背景变黄
rowIndex是第几行，columnIndex是第几列
    yellowBg ({row, column, rowIndex, columnIndex}) {
      if (row.statusName === '未指派' && columnIndex === 2) {
        return {
          background: '#eceb3c'
        }
      }
    },
————————————————
版权声明：本文为CSDN博主「Akatsuki233」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Akatsuki233/article/details/100311040
```

## 文件上传

### 1、带显示文件名称

```
<el-input
                  v-model="ruleForm.fileName"
                  disabled
                  placeholder="请选择"
                  @input="inputChange"
                  ><template slot="append">
                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      ref="upload"
                      :on-change="uploadFile"
                      action="/"
                      :http-request="uploadSectionFile"
                      :before-upload="beforeAvatarUpload"
                    >
                      <el-button
                        slot="trigger"
                        type="primary"
                        style="background: #66b1ff; color: #fff"
                        >选择</el-button
                      >
                    </el-upload></template
                  >
                </el-input>
                
//解决部分文件名不更新问题
inputChange() {
      //强制刷新
      this.$forceUpdate();
    },     
// 文件上传
    uploadFile(file) {
      this.reportFile = file.raw; // 获取文件的信息
      this.ruleForm.fileName = JSON.parse(JSON.stringify(file.name));
      this.disable = true;
      setTimeout(() => {
        this.disable = false;
      });
    },    
 // 文件类型限制
    beforeAvatarUpload(file) {
      const doc = /msword$/.test(file.type);
      const docx = /wordprocessingml.document$/.test(file.type);
      const xlsx =
        /vnd.openxmlformats-officedocument.spreadsheetml.sheet$/.test(
          file.type
        );
      const pdf = /pdf$/.test(file.type);
      // 因存在多种zip压缩类型（application/x-zip-compressed,application/zip 等），故改为后缀名校验类型
      const zip = /.zip$/.test(file.name);
      const xls = /vnd.ms-excel$/.test(file.type);
      // const ppt = /vnd.ms-powerpoint$/.test(file.type);
      // const pptx =
      //   /vnd.openxmlformats-officedocument.presentationml.presentation$/.test(
      //     file.type
      //   );
      const flag = doc || docx || xlsx || xls || zip || pdf;
      if (!flag) {
        this.$alert(
          "上传文件只能是 doc、docx、xls、xlsx、zip、pdf 格式!",
          "警告",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        );
        this.ruleForm.wordName = "";
        this.ruleForm.fileName = "";
        //  this.ruleForm.wordName = "";
        // this.ruleForm.fileName = "";
      }
      this.ruleForm.fileType =
        doc || docx
          ? "wordId"
          : xlsx || xls
          ? "excelId"
          : pdf
          ? "pdfId"
          : zip
          ? "zipId"
          : null;
      return flag;
    },  
// 文件上传接口
    async uploadSectionFile() {
      let formdata = new FormData();
      formdata.append("file", this.reportFile);
      formdata.append("fileId", "");
      let data = await upload(formdata);
      this.ruleForm.fileId = data;
    },    
    
```

