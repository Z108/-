# 模拟ES6方法封装

## 一、字符串

### 1、format方法

```js

if(!String.prototype.format ){
    String.prototype.format = function() {
        var e = arguments;
        return this.replace(/{(\d+)}/g,function(t, n) {
            return typeof e[n] != "undefined" ? e[n] : t;
        })
    };
}



例子：
var template = "今天的天气很{0},大家一起去{1}！";
alert(template.format("晴朗","郊游"));
//今天的天气很晴朗,大家一起去郊游！

```



## 二、数组

### 1、forEach

```js
if (!Array.prototype.forEach && typeof Array.prototype.forEach !== "function") {
    Array.prototype.forEach = function(callback, context) {
       // 遍历数组,在每一项上调用回调函数，这里使用原生方法验证数组。
       if (Object.prototype.toString.call(this) === "[object Array]") {
           var i,len;
           //遍历该数组所有的元素
           for (i = 0, len = this.length; i < len; i++) {
               if (typeof callback === "function"  && Object.prototype.hasOwnProperty.call(this, i)) {
                   if (callback.call(context, this[i], i, this) === false) {
                       break; // or return;
                   }
               }
           }
       }
    };
}

例子：
var drinks = ['雪碧','可乐','脉动','红牛','农夫山泉'];
        
var context = {
    str1 : '【',
    str2 : '】'
};
        
drinks.forEach(function(item){
    console.log(this.str1 + item + this.str2);
},context);
//【雪碧】【可乐】...【农夫山泉】
```

### 2、**indexOf**

```

//获取某元素在数组中第一次出现的下标
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
          if (k in O && O[k] === searchElement) {
            return k;
          }
          k++;
        }
        return -1;
      };
    }
    
 例子：
 var index = drinks.indexOf('雪碧');
alert(index);//0
```

lastIndexOf

```

//获取某元素在数组中最后一次出现的下标
if (!Array.prototype.lastIndexOf) {
      Array.prototype.lastIndexOf = function(searchElement /*, fromIndex*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var n, k,
        t = Object(this),
        len = t.length >>> 0;
    if (len === 0) {
      return -1;
    }

    n = len - 1;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) {
        n = 0;
      }
      else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    for (k = n >= 0
          ? Math.min(n, len - 1)
          : len - Math.abs(n); k >= 0; k--) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}

```

3、isArray

```
1、取巧方法：
var Array = function(){

}

Array.isArray = function(obj){
    return obj.constructor.toString().indexOf('Array') != -1;
}

var result = Array.isArray([]); 
alert(result); //true

2、模拟java中的ArrayList
//模拟ArrayList
function ArrayList(){
    var arr = []; //用于保存数据的数组
    var length = 0; //数组的长度，默认为0
    
    /**
     * 判断是否为空
     */
    this.isEmpty = function(){
        return length == 0;
    }
    
    /**
     * 获取列表长度
     */
    
    this.size = function(){
        return length;
    }
    
    /** 
    * 判断对象中是否包含给定对象
    */ 
    this.contains = function(obj){
        if(arr.indexOf(obj) != -1){
            return true;
        }
        return false;
    }
    
    /** 
    * 新增
    */
   this.add = function(obj){
    length = length + 1;
    arr.push(obj);
   }
   
   /**
    * 删除
    * 参数1  obj ：需要删除的元素
    * 参数2  deleteAll：是否全部删除，否则默认删除第一个匹配项
    */
   this.remove = function(obj,deleteAll){
        var len = arr.length;
        for(var i = 0 ;i < len ;i++){
            if(arr[i] == obj){
                arr.splice(i,1);
                length = length - 1;
                if(!deleteAll){
                    break;
                }
            }
        }
   }
   
   
   /**
    * 根据索引获取对应的元素
    */
   this.get = function(index){
    if(index > length - 1){
        return null;
    }
    return arr[index];
   }
   
   /**
    * 获取列表数组
    */
   this.toArray = function(){
     return arr;
   }
   
   /**
    * 获取某一个元素的角标
    * 如果只出现一次，就返回一个数字，如果大于一次，就返回数组
    */
   this.indexOf = function(obj){
     var rstArr = [];
     var count = 0;
     for(var i = 0 ;i < length ;i++){
        if(obj == arr[i]){
            rstArr[count++] = i;
        }
     }
     if(count == 1){
        return rstArr[0];
     }
     return rstArr;
   }
   
   this.toString = function(){
    return arr.toString();  
   }
}

//测试代码
var list = new ArrayList();
list.add('张三');
list.add('李四');
list.add('王五');
list.add('赵六');
list.add('王五');
console.log(list.size());
console.log(list.toString());
console.log(list.contains('张三'));
list.remove('王五',true); //null,undefined,''
console.log(list.toString());
console.log(list.get(0));
console.log(list.get(1));
console.log(list.get(2));
console.log(list.size());

console.log(list.toArray());
list.add('张三');
list.add('张三');
console.log(list.toArray());
console.log(list.indexOf('张三'));
console.log(list.indexOf('赵六'));

```

