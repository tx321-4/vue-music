# vue-music

>  Vue 音乐App
## [原文转载：http://ustbhuangyi.com/music/](http://ustbhuangyi.com/music/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目总结
## 技术栈
* vue
* babel-runtime    ES 语法转义
* fastclick  解决移动端点击 300ms 延迟
* babel-polyfill  ES6 API转义
* jsonp  跨域读取数据
* better-scroll 解决移动端各种滚动场景需求的插件
* axios 是一个基于 promise 的 HTTP 库
* vue-Lazyload 图片懒加载的插件
* js-base64 第三方库 base64 解码

安装 `stylus `、`stylus-loader`
```bash
yarn add stylus stylus-loader
```
* `src`中新建文件夹 api、common(fonts、image、js、stylus)、store
* webpack.base.conf.js 中 引入 common 地址
```bash
 resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'common': resolve('src/common')  #引入 common
    }
  },
```
## https://icomoon.io/ 图标制作网站

## eslint
```bash
    # 文件末尾强制换行(就是代码结尾处,要来个空格,相当于加一行,设置为0就可以了) 
    'eol-last': 0,
    # 格式化函数时，函数名称或function关键字与开始参数之间允许有空格
    'space-before-function-paren': 0
```

## 难点：better-scroll初始化后不能无缝滚动
  * 版本问题
  ```javascript
  // 0.1.15中可以正常运行
  this.slider = new BScroll(this.$refs.slider, {
    scrollX: true,
    scrollY: false,
    momentum: false,
    snap: true,
    snapLoop: this.loop,
    snapThreshold: 0.3,
    snapSpeed: 400
  }

  改为
  this.slider = new BScroll(this.$refs.slider, {
    scrollX: true,
    scrollY: false,
    momentum: false,
    snap: {
      loop: this.loop,
      threshold: 0.3,
      speed: 400
    }
  }
  ```

  ## 导航切换时，推荐页面的recommend的生命周期会再走一遍
  * 解决方法是 在 app.vue 里 添加 `keep-alive`
  ```vue
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  ```

  ## 难点：better-scroll 自动轮播最后一张后，无法跳到第一张
  * 版本问题 [原文转载：https://juejin.im/post/5bbc3b17f265da0aed563bcf](https://juejin.im/post/5bbc3b17f265da0aed563bcf)
  ```javascript
  _play () {
      let pageIndex = this.currentPageIndex + 1;
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    },
  改为
  _play () {
    this.timer = setTimeout(() => {
      this.slider.next();
    }, this.interval);
  },
  ```

  ## vue-music_/api/getDiscList接口报404错误解决
  * vue-cli 移除了 dev-server.js 
  * 需要在webpack.dev.conf 中配置相关代码
  * [原文转载：https://www.ljwit.com/archives/web/726.html](https://www.ljwit.com/archives/web/726.html)

  ## better-scroll 滑动一点后，滑动速度过快
  * 解决方法 滚动开始之前触发 ---清除定时器
  ```javascript
  this.slider.on('beforeScrollStart', () => {
    if (this.autoPlay) {
      clearTimeout(this.timer);
    }
  });
  ```