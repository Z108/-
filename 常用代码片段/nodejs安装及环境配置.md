## 		nodejs安装及环境配置

### 1、官网下载nodejs

 [节点.js (nodejs.org)](https://nodejs.org/en/) 

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\1640438782248.png" alt="1640438782248" style="zoom:50%;" />



### 2、安装

![97cxm713v1](C:\Users\Administrator\Desktop\97cxm713v1.png)

修改安装目录

![5iz9uv1xtg](C:\Users\Administrator\Desktop\5iz9uv1xtg.png)

### 3、检验安装是否成功 

win+r 输入cmd 打开命令窗 输入 node -v   和 npm -v 查看版本号

![微信图片_20211225213042](C:\Users\Administrator\Desktop\微信图片_20211225213042.png)

### 4、查询修改全局、缓存路径

```
查询
查询全局：npm config get prefix
查询缓存：npm config get cache
// 以D盘为例
修改全局：npm config set prefix "D:\NodeJs\node_global" 
修改缓存：npm config set cache "D:\NodeJs\node_cache"
```

### 5、配置环境变量

​	1、打开环境变量：  我的电脑右键点击属性，打开高级系统设置>环境变量(N)...  

​	2、用户变量删除nodejs 默认配置 Path 删除 最后一个 npm结尾的地址后并添加 D:\NodeJs\node_global

​	3、系统变量添加   变量名：NODE_PATH  变量值： D:\NodeJs\node_global\node_modules  

​	4、点击确认保存

### 6、安装淘宝镜像

```
 方法：
 	1、直接修改当前npm地址  
 	查看当前npm地址: npm config get registry 
 	修改npm 地址:npm config set registry=https://registry.npm.taobao.org
 	2、直接安装cnpm 淘宝镜像
 	npm install -g cnpm --registry=https://registry.npm.taobao.org
 
 注：1、如果版本有问题：运行 npm install -g npm 更新版本
 	2、安装完成后重新按第四点(查询修改全局、缓存路径)看一下路径
 	cnpm config set prefix D:\NodeJs\node_global
 	cnpm config set cache D:\NodeJs\node_cache
 	
 
```

### 5、安装依赖

```
安装vue：pm install -g vue
安装vue-cli:cnpm install -g @vue/cli
安装yarn：cnpm install -g yarn
安装typescript：cnpm install -g typescript
查看全局依赖目录：pm list -global
查看vue版本:vue -V

```

