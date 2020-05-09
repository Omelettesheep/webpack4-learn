###  [webpack官网指南](https://www.webpackjs.com/guides/ "webpack指南")
学到一半发现中文文档实在是太旧了，跟着[英文文档](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free)来吧
- [起步](#起步)
- [资源管理](#资源管理)
- [管理输出](#管理输出)
- [开发](#开发)
- [代码分割](#代码分割)
- [模块热替换](#模块热替换)
### 一. <a id="起步">起步</a>
- webpack默认读src/index.js，打包入dist/main.js
- webpack默认打包不会删除dist然后重新生成，只会做替换操作
- 快捷启动webpack, 在package.json中
```js
"build": "webpack"
// npm run build
// npm run build --colors
```

### 二. <a id="资源管理">资源管理</a>
1. 加载css
- css-loader读取css文件，style-loader将css内容注入js（将css内容用字符串组成注入html-head的style中，想单独输出css可使用webpack plugin）
- loader的执行顺序是由后到前的

>*如果使用plugin，在webpack3中可采用ExtractTextPlugin，在webpack4中使用`mini-css-extract-plugin`*
```js
//待学习
"mini-css-extract-plugin"
```


2. 加载图片&字体文件
- [file-loader](https://www.webpackjs.com/loaders/file-loader/): 输出文件的文件名是根据文件内容计算得出的hash值
- [url-loader](https://www.webpackjs.com/loaders/url-loader/): 可以将文件编码成base64注入js或者css, 在fallback中可指定其他情况下采用的编译方式，默认file-loader
```js
//待学习
"image-webpack-loader"
```

- 上述所有内容中最出色之处是，以这种方式加载资源，你可以以更直观的方式将模块和资源组合在一起。无需依赖于含有全部资源的 /assets 目录，而是将资源与代码组合在一起,这种配置方式会使你的代码更具备可移植性

- 你仍然可以将这些资源存储在公共目录(base directory)中，甚至配合使用 alias 来使它们更方便 import 导入。

### 三. <a id="管理输出">管理输出</a>
- webpack会从入口文件开始递归找出所有依赖，将其入口和依赖打包到一个文件中

- 如果有多个Bundle的输出，如何解决在html中动态插入bundle包？使用[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
> 这边有个问题，官网写的例子是
![官网多bundle例子](https://pic.rmb.bdstatic.com/0757a03f520fa7e70ab0ce9c3b4fcdc7.png "官网多bundle例子")
可是我用这种方案只能打包出来一个main.bundle.js，需要把index.js进行改名才能正常打出两个包。。。不知道是啥问题
>
>![我把index.js改名成了app.js](https://pic.rmb.bdstatic.com/8f8d140536ac0e0738b1e1784e6ca85d.png "我把index.js改名成了app.js")
上图是我把index.js改名成了app.js
- HtmlWebpackPlugin 会重新生成一个html，并且自动把bundle插入html中。可以支持配置html的title，模板，名称等等

- HtmlWebpackPlugin中有个minify配置项，如果开启就会使用 [html-minifier-terser](https://github.com/DanielRuf/html-minifier-terser) 进行压缩，也会有一系列配置项。

```js
// 待学习
"html-webpack-template",
"html-minifier-terser"
```

- 清理输出文件[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
> 中文官方文档还没更新，新的用法如下
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    // ......
    plugins: [
        new CleanWebpackPlugin()
    ],
    // ......
};
```
- 本章节待深入todo: 

[Manifest](https://www.webpackjs.com/concepts/manifest/)

[缓存指南](https://www.webpackjs.com/guides/caching/)

[代码分离指南](https://www.webpackjs.com/guides/code-splitting/)

### 四. <a id="开发">开发</a>
1. [source map](https://www.webpackjs.com/configuration/devtool/)
当 webpack 打包源代码时，如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle中，而其中一个源文件包含一个错误，那么堆栈跟踪就会简单地指向到 bundle.js。source map功能将编译后的代码映射回原始源代码。
```
// 待学习
"source map需要细看"
```
2. 代码发生变化后自动编译代码：
- webpack's Watch Mode （会自动重新编译，但是不会帮助刷新浏览器，如果你没有自己起服务的话
```js
// 然鹅我没有重新生成html，是因为用了CleanWebpackPlugin这个插件，webpack误以为html没有用，从dist里删除了

// package.json文件中
"scripts": {
    "watch": "webpack --watch", // 这里
    "build": "webpack"
  },
```
- [webpack-dev-server](https://www.webpackjs.com/configuration/dev-server/)细节看官方文档
```js
// 安装
npm install --save-dev webpack-dev-server
// 配置
module.exports = {
    entry: {
        app: './src/app.js',
        print: './src/print.js',
    },
    devtool: 'inline-source-map',
    devServer: { // 这里
        contentBase: './dist'
    },
    ......
};
```
这边又遇到了一个版本问题，https://github.com/webpack/webpack-dev-server/issues/2029

原因是[webpack-cli](https://www.npmjs.com/package/webpack-cli)和webpack-dev-server会有不兼容，不要4.x.x的webpack-cli，它还在deta阶段.

- [webpack-dev-middleware](https://www.webpackjs.com/guides/development/#%E4%BD%BF%E7%94%A8-webpack-dev-middleware)
它可以把 webpack 处理后的文件传递给一个服务器(server)。 webpack-dev-server 在内部使用了它，同时，它也可以作为一个单独的包来使用，以便进行更多自定义设置来实现更多的需求

### 五. <a id="代码分割">代码分割</a>——代码分割+按需加载
> 本章节 安装了webpack-bundle-analyzer来观察打包结果

1. 从入口处分离
    
    ```js
        entry: {
        app: './src/app.js',
        another: './src/another-module.js'
    },
    ```
    优点：最简单和直观

    缺点：（1）重复模块会被重复打包（2）不能将核心的应用程序逻辑进行动态的代码拆分

    下图是打包结果，可以看到Lodash被重复打包了
    ![entry point](https://pic.rmb.bdstatic.com/1f0ea7dc1ad368e72eef4e521e94260e.png "entry point重复打包")

    下一步就是利用splitChunksPlugin进行去重

2. 去重: 

    （1）5.x.x的版本新增了一个dependOn，不过我现在用的4，而且5还在deta版本, 用法大概是下面酱
    ![dependOn](https://pic.rmb.bdstatic.com/60e7cc0e559a4dbea644f977d741cd6f.png "dependOn")

    （2）利用SplitChunksPlugin（3.x 是CommonsChunkPlugin）去重和分离chunk

    可以把公共依赖提取到其中一个有依赖的chunk中，或者提取到一个新chunk中
    ```js
     optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    ```
    从下图可以看到lodash被单独提取成一个包
    ![splitChunksPlugin去重后](https://pic.rmb.bdstatic.com/5295c790b6c757de291b9b54c7d48cd9.png "splitChunksPlugin去重后")

    （3）一些其他loader

    [mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin): 分离css(3.x用的ExtractTextPlugin)

    [bundle-loader](https://webpack.js.org/loaders/bundle-loader/)、promise-loader:用于分离代码和延迟加载生成的 bundle


3. 动态导入：通过模块的内联函数调用来分离代码import()、require.ensure.

### 六. <a id="模块热替换">模块热替换</a>
- 不加载整个网页的情况下，将已更新的模块替换并重新执行一次实现实时预览，默认不开启
- 基本用法
```js
    // 配置
    devServer: {
        contentBase: './dist',
        hot: true // 这里
    },
    plugins: [
     new webpack.NamedModulesPlugin(), // 这里
     new webpack.HotModuleReplacementPlugin() // 这里
    ],

    // 使用
    if(module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the updated printMe module');
        // printMe();
        document.body.removeChild(element);
        element = component(); // 重新渲染页面后，component 更新 click 事件处理
        document.body.appendChild(element);
    })
}
```
- emmm还是有点坑的，如官网[问题](https://www.webpackjs.com/guides/hot-module-replacement/#%E9%97%AE%E9%A2%98)。。。感觉需要意会下，就是在使用中需要一个重新渲染和绑定的过程

- css的热更新（css-loader和style-loader

- 一些[其他的代码和框架](https://www.webpackjs.com/guides/hot-module-replacement/#%E5%85%B6%E4%BB%96%E4%BB%A3%E7%A0%81%E5%92%8C%E6%A1%86%E6%9E%B6)

    [React Hot Loader](https://github.com/gaearon/react-hot-loader)：实时调整 react 组件。

- 本章节待学习项目

    [概念 - 模块热替换(Hot Module Replacement)](https://www.webpackjs.com/concepts/hot-module-replacement/)

    [API - 模块热替换(Hot Module Replacement)](https://www.webpackjs.com/api/hot-module-replacement/)




