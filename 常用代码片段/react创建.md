1、创建react项目

```git
$ cnpm install -g create-react-app
$ create-react-app 项目名
$ cd 项目名/
$ npm start
```

2、安装yarn

```git
npm install -g  yarn
```



3、文件下载

```
 downLoadXLS() {
      this.$http({
        method: "post",
        url:
          this.$http.defaults.toolsURL +
          "/shuxing/commodity/singlechartdownload",
        data: this.singleData,
        responseType: "blob", // 设置响应数据类型为 blob
      }).then((res) => {
          var blob = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
          }); //type这里表示xlsx类型
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
     
          const fileName = "下载.xlsx"; // 文件名字
          downloadElement.download = fileName; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        });
    },
```



