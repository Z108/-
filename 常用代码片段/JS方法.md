## JS方法

### 1.地址转换

```js
地址转码   encodeURIComponent(url)
地址解析   decodeURIComponent(url)
```



### 2.声明和初始化数组

```
const array = Array(5).fill(''); 
// 输出
(5) ["", "", "", "", ""]

const matrix = Array(5).fill(0).map(() => Array(5).fill(0))
// 输出
(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]
0: (5) [0, 0, 0, 0, 0]
1: (5) [0, 0, 0, 0, 0]
2: (5) [0, 0, 0, 0, 0]
3: (5) [0, 0, 0, 0, 0]
4: (5) [0, 0, 0, 0, 0]
length: 5xxxxxxxxxx const array = Array(5).fill(''); // 输出(5) ["", "", "", "", ""]const matrix = Array(5).fill(0).map(() => Array(5).fill(0))// 输出(5) [Array(5), Array(5), Array(5), Array(5), Array(5)]0: (5) [0, 0, 0, 0, 0]1: (5) [0, 0, 0, 0, 0]2: (5) [0, 0, 0, 0, 0]3: (5) [0, 0, 0, 0, 0]4: (5) [0, 0, 0, 0, 0]length: 5const arr=[]
```

### 2. 求和，最小值和最大值

```
const array  = [5,4,7,8,9,2];
array.reduce((a,b) => a+b);
// 输出: 35
array.reduce((a,b) => a>b?a:b);
// 输出: 9
array.reduce((a,b) => a<b?a:b);
// 输出: 2
const arr=[[1,2,3],[4,5,6],[10,8,9]]
arr.reduce((a,b)=>a+b[0],0)
// 输出:15
const result=[{name:'小明',score:88}]
var sum = result.reduce(function(prev, cur) {
    console.log(prev)    // 0
    console.log(cur)       // {name:'小明',score:88}
    return cur.score + prev;
}, 0);
// 输出:88
```

### 3.排序字符串，数字或对象等数组

```
//字符串数组排序
const stringArr = ["Joe", "Kapil", "Steve", "Musk"]
stringArr.sort();
// 输出
(4) ["Joe", "Kapil", "Musk", "Steve"]

stringArr.reverse();
// 输出
(4) ["Steve", "Musk", "Kapil", "Joe"]

//数字数组排序
const array  = [40, 100, 1, 5, 25, 10];
array.sort((a,b) => a-b);
// 输出
(6) [1, 5, 10, 25, 40, 100]

array.sort((a,b) => b-a);
// 输出
(6) [100, 40, 25, 10, 5, 1]

//对象数组排序
const objectArr = [ 
    { first_name: 'Lazslo', last_name: 'Jamf'     },
    { first_name: 'Pig',    last_name: 'Bodine'   },
    { first_name: 'Pirate', last_name: 'Prentice' }
];
objectArr.sort((a, b) => a.last_name.localeCompare(b.last_name));
// 输出 
(3) [{…}, {…}, {…}]
0: {first_name: "Pig", last_name: "Bodine"}
1: {first_name: "Lazslo", last_name: "Jamf"}
2: {first_name: "Pirate", last_name: "Prentice"}
length: 3
```

### 4.从数组中过滤到虚值

```
const array = [3, 0, 6, 7, '', false];
array.filter(Boolean);
// 输出
(3) [3, 6, 7]
```

### 5. 使用逻辑运算符处理需要条件判断的情况

```
function doSomething(arg1){ 
    arg1 = arg1 || 10; 
// 如果arg1没有值，则取默认值 10
}

let foo = 10;  
foo === 10 && doSomething(); 
// 如果 foo 等于 10，刚执行 doSomething();
// 输出: 10

foo === 5 || doSomething();
// is the same thing as if (foo != 5) then doSomething();
// Output: 10
```

### 6. 去除重复值

```
const array  = [5,4,7,8,9,2,7,5];
array.filter((item,idx,arr) => arr.indexOf(item) === idx);
// or
const nonUnique = [...new Set(array)];
// Output: [5, 4, 7, 8, 9, 2]
```

### 7. 创建一个计数器对象或 Map

```
(1)
let string = 'kapilalipak';

const table={}; 
for(let char of string) {
  table[char]=table[char]+1 || 1;
}
// 输出
{k: 2, a: 3, p: 2, i: 2, l: 2}

(2)
const countMap = new Map();
  for (let i = 0; i < string.length; i++) {
    if (countMap.has(string[i])) {
      countMap.set(string[i], countMap.get(string[i]) + 1);
    } else {
      countMap.set(string[i], 1);
    }
  }
// 输出
Map(5) {"k" => 2, "a" => 3, "p" => 2, "i" => 2, "l" => 2}
```

### 8. 三元运算符

```
function Fever(temp) {
    return temp > 97 ? 'Visit Doctor!'
      : temp < 97 ? 'Go Out and Play!!'
      : temp === 97 ? 'Take Some Rest!';
}

// 输出
Fever(97): "Take Some Rest!" 
Fever(100): "Visit Doctor!"
```

### 9. 循环方法的比较

```
for 和 for..in 默认获取索引，但你可以使用arr[index]。

let arr=[1,2,3,4]
let obj={name:'xxx',age:12,sex:'male'}
for(let i=0;i<arr.length;i++){}//通过arr[i] 获取值
for(item in obj){}//通过item 获取value值{key:value} 推荐对象

for..in也接受非数字，所以要避免使用。

forEach, for...of 直接得到元素。
arr.forEach(item,index,arr=>{})//item：值 index:下标 arr:原数组
for(item of arr){} item:值  推荐数组
forEach 也可以得到索引，但 for...of 不行。
```

### 10. 合并两个对象

```
//解构赋值
const user = { 
 name: 'Kapil Raghuwanshi', 
 gender: 'Male' 
 };
const college = { 
 primary: 'Mani Primary School', 
 secondary: 'Lass Secondary School' 
 };
const skills = { 
 programming: 'Extreme', 
 swimming: 'Average', 
 sleeping: 'Pro' 
 };

const summary = {...user, ...college, ...skills};

// 合并多个对象
gender: "Male"
name: "Kapil Raghuwanshi"
primary: "Mani Primary School"
programming: "Extreme"
secondary: "Lass Secondary School"
sleeping: "Pro"
swimming: "Average"

//ES6方法
const summary = Object.assign(user,college,skills);//如果键值相同，后面的会覆盖前面的
```

### 11. 箭头函数

```
const person = {
name: 'Kapil',
sayName() {
    return this.name;
    }
}
person.sayName();
// 输出
"Kapil"

const person = {
name: 'Kapil',
sayName : () => {
    return this.name;
    }
}
person.sayName();
// Output
"
```

### 13. 可选的链

```
const user = {
  employee: {
    name: "Kapil"
  }
};
user.employee?.name;
// Output: "Kapil"
user.employ?.name;
// Output: undefined
user.employ.name
// 输出: VM21616:1 Uncaught TypeError: Cannot read property 'name' of undefined
```

### 13.洗牌一个数组

```
const list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
list.sort(() => {
    return Math.random() - 0.5;
});
// 输出
(9) [2, 5, 1, 6, 9, 8, 4, 3, 7]
// 输出
(9) [4, 1, 7, 5, 3, 8, 2, 9, 6]
```

### 14.双问号语法

```
const foo = null ?? 'my school';
// 输出: "my school"

const baz = 0 ?? 42;
// 输出: 0
```

### 15.剩余和展开语法

```
function myFun(a,  b, ...manyMoreArgs) {
   return arguments.length;
}
myFun("one", "two", "three", "four", "five", "six");

// 输出: 6

const parts = ['shoulders', 'knees']; 
const lyrics = ['head', ...parts, 'and', 'toes']; 

lyrics;
// 输出: 
(5) ["head", "shoulders", "knees", "and", "toes"]
```

### 16.默认参数

```
const search = (arr, low=0,high=arr.length-1) => {
    return high;
}
search([1,2,3,4,5]);

// 输出: 4
```

### 17.进制转换

```
const num = 10;
num.toString(2);
// 输出: "1010"
num.toString(16);
// 输出: "a"
num.toString(8);
// 输出: "12"
```

### 18. 使用解构来交换两个数

```
let a = 5;
let b = 8;
[a,b] = [b,a]

[a,b]
// 输出
(2) [8, 5]
```

### 19. 单行的回文数检查

```
function checkPalindrome(str) {
  return str == str.split('').reverse().join('');
}
checkPalindrome('naman');
// 输出: true
```

### 20.将Object属性转换为属性数组

```
const obj = { a: 1, b: 2, c: 3 };

Object.entries(obj);
// Output
(3) [Array(2), Array(2), Array(2)]
0: (2) ["a", 1]
1: (2) ["b", 2]
2: (2) ["c", 3]
length: 3

Object.keys(obj);
(3) ["a", "b", "c"]

Object.values(obj);
(3) [1, 2, 3]
```

### 21、解决一个变量有多个值(JS的数据劫持)

```
1、a==1&&a==12
	let a = {
		i: 1,
		valueOf: function() {
			if (this.i === 1) {
				this.i++
				return 1
			}else{
				return 12
			}
		}
	}
	if (a == 1 && a == 12) {
		console.log(666)
	}
	
2、a==1&&a==2&&a==3
(1) 
	
     
(2) 

```



## 数组方法

### 1、取两\多个数组交集

```
1、
function fun(arr,brr){
	let s=ner Set(arr)
	return [...new Set(brr)].filter(x=>s.has(x))
}
2、
let arr = [
      [1, 2, 3, 4],
      [3, 4, 6],
      [4, 5],
      [4, 5, 8, 9],
      [4, 5, 2, 7],
      [4, 5, 3],
      [4, 5, 0],
    ];

arr.reduce((a, b) => a.filter(c => b.includes(c))) // [4]

```

