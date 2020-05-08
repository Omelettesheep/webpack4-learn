###  [webpack官网指南](https://www.webpackjs.com/guides/ "webpack指南")
- [起步](#起步)
- [资源管理](#资源管理)
#### 一. <a id="起步">起步</a>
- webpack默认读src/index.js，打包入dist/main.js
- webpack默认打包不会删除dist然后重新生成，只会做替换操作
- 快捷启动webpack, 在package.json中
```js
"build": "webpack"
// npm run build
// npm run build --colors
```

#### 二. <a id="资源管理">资源管理</a>
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

