# vue-music

>  Vue 音乐App

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