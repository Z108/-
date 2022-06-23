git --version 查看git版本

设置用户名、密码

git config --blobal user.name "XXX"

git config --blobal user.email "xxx@xxx.com"

cd ~/.ssh 查找是否存在ssh密钥

ssh-keygen -t rsa -C"xxx@xxx.com" 生成密钥

c:\users\yourUsername\.ssh\ 下生成id_rsa、id_rsa.pub

gitHub/gitLab/gittee 个人中心settings添加ssh密钥 使用id——rsa。pub



拉取代码

```git
git clone 地址
```

切换分支

```
git fetch
git branch	
git branch 分支名  				  (创建分支) 
git checkout origin 切换的分支名		(切换分支)
git checkout -b 分支名    			  (创建并切换分支)
```

gitHub 删除文件

```git
git rm -r --cached 文件名  
git commit -m '删除了target' 
git push -u origin 分支名
```

提交代码

```git
git add .
git commit -m "备注"
git pull origin 分支名  
手动解决冲突 
git add .
git commit -m "merge"
git push origin 分支名  
```



临时拉取修改

```
git stash
git pull origin 分支名
git stash pop
```



删除本地分支

```
git remotr show origin  //展示所有信息
git remote prune origin xxx  删除本地分支
git branch -d xxx

git push origin :refs/heads/xxx 删除远程branch(可改tags)分支  
```

合并分支

```git
B合A分支
git checkout B  切换到B分支
git merge A    把A分支合到B分支上
解决冲突         
git add .       保存并提交 见提交代码
```

修改git 提交记录

```git
git add .
git commit --amend
:i  编辑
Esc 退出编辑
：wq + Enter 退出并保存修改
```

查看最近提交详细信息

```
git log --stat
```

git 配置

```
git config core.ignorecase false 取消忽略大小写
git mv -f OldFileNameCase newfilenamecase  // e.g： git mv -f lottery Lottery (将文件夹名修改为Lottery)    修改文件名
```

