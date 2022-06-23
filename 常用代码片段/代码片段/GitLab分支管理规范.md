# 						GitLab分支管理规范

**一、主分支Master**

所有提供给用户使用的正式版本，都在这个主分支上发布。

![img](http://www.ruanyifeng.com/blogimg/asset/201207/bg2012070503.png)



**二、开发分支Develop**

![img](http://www.ruanyifeng.com/blogimg/asset/201207/bg2012070504.png)

这个分支可以用来生成代码的最新隔夜版本（nightly）。如果想正式对外发布，就在Master分支上，对Develop分支进行"合并"



**三、临时性分支**

版本库的两条主要分支：Master和Develop。前者用于正式发布，后者用于日常开发。常设分支只需要这两条就够了，不需要其他了。

除了常设分支以外，还有一些临时性分支，用于应对一些特定目的的版本开发。临时性分支主要有三种：

> 　　* 功能（feature）分支
>
> 　　* 预发布（release）分支
>
> 　　* 修补bug（fixbug）分支

这三种分支都属于临时性需要，使用完以后，应该删除，使得代码库的常设分支始终只有Master和Develop。



**四、 功能分支**（feature）



第一种是功能分支，它是为了开发某种特定功能，从Develop分支上面分出来的。开发完成后，要再并入Develop。

![img](http://www.ruanyifeng.com/blogimg/asset/201207/bg2012070507.png)

功能分支的名字，可以采用feature-*的形式命名



**五、预发布分支**

第二种是预发布分支，它是指发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试。

预发布分支是从Develop分支上面分出来的，预发布结束以后，必须合并进Develop和Master分支。它的命名，可以采用release-*的形式。



**六、修补bug分支**

最后一种是修补bug分支。软件正式发布以后，难免会出现bug。这时就需要创建一个分支，进行bug修补。

修补bug分支是从Master分支上面分出来的。修补结束以后，再合并进Master和Develop分支。它的命名，可以采用fixbug-*的形式。

![img](http://www.ruanyifeng.com/blogimg/asset/201207/bg2012070508.png)

参考链接：http://www.ruanyifeng.com/blog/2012/07/git.html

https://blog.csdn.net/weixin_33717117/article/details/91390610





![img](https://pic4.zhimg.com/80/v2-c5cfba5849f0b31c5b680ac356a6047b_720w.jpg)

参考链接：https://zhuanlan.zhihu.com/p/93125600





### Commit注释规范

提交的格式：`type: message`，注意中间使用 `:` 分割（后面带有一个空格），内容不超过 50 字。

`type` 用于指定提交的 commit 的类别，下面只允许以下几个动词原语。

- `add` - 新增加的功能等描述。
- `fix` - 修复某个 bug 的描述。
- `update` - 在原有的基础上更新代码的描述。
- `change` - 类似 update，唯一区别是 change 是重写了代码（带有颠覆性）。
- `docs` - 更新/新增文档时的描述。
- `test` - 增加/修改测试示例代码。
- `release` - 发布新的版本时使用。
- `merge` - 在解决代码冲突，合并分支时使用。
- `chore` - 构建过程或辅助工具的变动。
- `create` - 初次创建项目时使用。
- `remove` - 移除文件、代码时使用。

type 的作用是为了区分，并且能根据 type 做有效的 commit logger 数据统计。

`message` 用于指定提交的描述文字，需要注意几个事项。

- 使用中文表述。
- 保证有明确的语义化说明。
- 保证表述内容简短。
- 以动词开头，比如：更新，增加，修复等。

正确的示例：

```git
fix: 修复登录邮箱格式验证错误的问题。
update: 优化 Button 组件样式。
test: 添加搜索模块的单元测完。
release: 发布 v0.1.12 版本。
remove: 移除多余的 console.log 代码。
```

错误的示例：

```git
fix: 修复一个大 BUG。    
update: 更新代码。       // 表述不清楚。更新了什么代码，改变了什么功能？
添加搜索模块的单元测完。             // 没有写 type。
add: 更新 API 文档用户信息接口说明。 // type 使用错误。
```

参考链接：https://www.dazhuanlan.com/2019/10/27/5db594a9ee620/