### 1. 国内使用npm存在的问题

* 安装npm后，默认的远程仓库地址为：http://registry.npmjs.org ：
* 国内使用npm存在的问题：npm的远程服务器在国外，所以有时候难免出现访问过慢，甚至无法访问的情况。
* 为了解决这个问题，我们有以下几个解决办法

### 2. 使用淘宝的 cnpm 代替npm

> 阿里云·淘宝为我们搭建了一个国内的npm服务器，它目前是每隔10分钟将国外npm仓库的所有内容“搬运”回国内的服务器上，这样我们直接访问淘宝的国内服务器就可以了，它的地址是：https://registry.npm.taobao.org

#### 第一种使用方法：直接安装 cnpm
安装淘宝提供的cnpm，并更改服务器地址为淘宝的国内地址，命令：``` npm install -g cnpm --registry=https://registry.npm.taobao.org
```，以后安装直接采用```cpm```替代```npm```，例如原生npm命令为：```npm install uniq --save```，cnpm命令为：```cnpm install uniq --save```

#### 第二种使用方法：替换npm仓库地址为淘宝镜像地址
命令：```npm config set registry https://registry.npm.taobao.org```，查看是否更改成功：```npm config get registry ```，以后安装时，依然用npm命令，但是实际是从淘宝国内服务器下载的

### 3. 使用yarn代替npm          npm i yarn -g

> Yarn发布于2016年10月，截至当前2019年1月，gitHub上的Start数量为：34.3k，已经超过npm很多了，yarn使用本地缓存，需互联网连接就能安装本地已经缓存的依赖项，安装方法：```npm install -g yarn```
命令举例：

1. 添加依赖包：```yarn add [package] --dev```
2. 全局安装：```yarn global add xxx```





