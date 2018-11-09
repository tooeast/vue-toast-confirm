早就萌生了发npm包的想法，之前一直认为这是个很高大上的事情，其实自己操作之后发现也比较简单，所以在这里记录一下自己的发包流程以及遇到的一些坑。

> 好多文章讲的不细致，以至于走了很多的弯路

**我发布的是一个使用Vue开发的弹框组件**

### 工具介绍 

由于使用Vue开发，所以使用到的有 ```vue-cli``` 、 ```webpack-simple``` 。使用 ```webpack-simple``` 的原因是更加轻量，设置起来也更加容易，方便于发包，推荐大家使用，当然可以在自己的开发环境中先开发好插件，然后再复制到 ```webpack-simple``` 中。

### 基本流程

1. 首先选择一个文件夹创建 ```webpack-simple``` 项目，使用命令。

    ```bash
    vue init webpack-simple xxx(your project name)
    ```
    然后进入目录安装依赖

    ```bash
    cd xxx(your project name)

    npm install
    ```

2. 创建好之后在 ```src``` 目录下新建一个文件夹，来开发自己的插件，项目结构如图

    ![alt](https://sansiro.me/upload/312cb381d27801e0cfe8186b387ba6fb-WX20181010-174112@2x.png)

    > 图中的 ```libs``` 就是创建的目录，来开发插件，为了方便整理，最好将所需要的文件都放在同一目录下。

    在 ```libs``` 中开发自己的插件，并且可以在 ```main.js``` 中调用，来本地调试。

3. 插件开发过程。
    
    插件想要能够在文件中被使用，必须要有一个 ```install``` 的函数，所以在 ```libs``` 目录下新建一个 ```index.js``` 文件，基本结构如下：

    ```javascript
    const pulginName = {
        install () {

        }
    }

    export default pulginName
    
    ```

    这里的 ```install``` 是必须的。以下是我的 ```index.js``` 内容:

    ```javascript
      import Vue from 'vue'
      import Toast from './Toast.vue'
      import Confirm from './Confirm.vue'

      const vdialog = {
      vm: null,
      create (VueOpt, defaultOpt, opt) {
        opt = {
          ...defaultOpt,
          ...opt
        }
        let Dialogs = Vue.extend(VueOpt, opt)
        this.vm = new Dialogs({el: document.createElement('div')})

        Object.assign(this.vm, opt)

        document.body.appendChild(this.vm.$el)

        this.vm.$on('close', () => {
          this.close()
        })
      },
      close () {
        document.body.removeChild(this.vm.$el)
        this.vm.$destroy()
        this.vm = null
      },
      install () {
        Vue.prototype.$toast = (opt = {}) => {
          let defaultOpt = {
            msg: '提示',
            type: 'warnning',
            duration: 800
          }

          this.create(Toast, defaultOpt, opt)
        }
        Vue.prototype.$confirm = (opt = {}) => {
          let defaultOpt = {
            type: '',
            title: '标题',
            content: '内容...',
            confirmText: '确定',
            cancelText: '',
            confirm: () => {
              this.close()
            },
            cancel: () => {
              this.close()
            }
          }

          this.create(Confirm, defaultOpt, opt)
        }
        Vue.prototype.$close = () => {
          this.close()
        }
      }
    }

    export default vdialog

    ```

    可以看到我们添加了 ```$toast``` 、 ```$confirm``` 、 ```$close``` 三个全局函数到 ```Vue``` 上。引入了两个文件就是插件的主要内容，这里举例 ```Toast.vue``` 的内容:
    
    ```html
    <template>
      <div class="vdialog">
        <div class="mask"></div>
        <div class="area" @click="closeDialog">
          <i class="top-icon" :class="getShowType"></i>
          <p>{{ msg }}</p>
        </div>
      </div>
    </template>

    <script>
    export default {
      name: 'vdialog',
      props: {
        msg: {
          type: String
        },
        type: {
          type: String
        },
        duration: {
          type: Number
        }
      },
      computed: {
        getShowType () {
          return `icon-${this.type}`
        },
        getDuration () {
          return this.duration
        }
      },
      mounted () {
        setTimeout(() => {
          this.timeLine()
        })
      },
      methods: {
        timeLine () {
          setTimeout(() => {
            this.closeDialog()
          }, this.getDuration)
        },
        closeDialog () {
          this.$emit('close')
        }
      }
    }
    </script>

    <style lang="scss" scoped>
    // scss ...
    </style>

    ```
    在 ```main.js``` 中引入我们的插件，就可以使用了。

    ```javascript
    import Vue from 'vue'
    import App from './App.vue'

    import vdialog from './libs'

    Vue.use(vdialog)

    new Vue({
      el: '#app',
      render: h => h(App)
    })
    ```
    首先 ```import``` 然后 ```Vue.use()``` 来全局注册插件。

4. 打包前配置

    打包的任务当然是交给 ```webpack-simple``` 来完成，找到文件 ```webpack.config.js``` 修改其中内容:

    ```javascript
    var path = require('path')
    var webpack = require('webpack')

    module.exports = {
      entry: './src/libs/index.js',  // 将入口修改为自己插件的 index.js 文件位置，从 index.js 文件开始打包
      // entry: './src/main.js',  // 最好将原来的配置注释起来，因为一会儿还要测试，再改回来
      output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vue-toast-confirm.js',  // 将 filename 改为自己插件的名字，当然是希望打包完是自己插件的名字啊
        // filename: 'build.js',
        library: 'vue-toast-confirm',  // 这一项是将来执行 import 的时候的名称 ，例如 import xxx from vue-toast-confirm
        libraryTarget: 'umd',  // 构建方式，建议使用服务端和浏览器端都支持的 umd 
        umdNamedDefine: true   // 构建过程中对模块命名
      },
      // 将 vue 设置为外部依赖，不打包在自己的包里。并且对各种打包方式后的 Vue 依赖设置名称，否则会出现插件中 Vue.prototype 声明的全局函数找不到的情况。
      externals: {
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue'
        }
      },
      resolve: {
          extensions: ['', '.js', '.vue']
      },
      // 其他的内容不变
    }

    ```
    配置好文件之后就可以执行 ```npm run build``` 来编译打包项目了，打包之后的文件在 ```dist``` 文件夹中，通常会有 ```.js``` 和 ```.js.map``` 两个文件，如果有其他文件的话也会引入。

5. 插件配置并发布

    进入 ```dist``` 文件夹，执行 ```npm init``` 来创建 ```package.json``` 文件，过程中会需要输入包名等，按需输入即可。然后创建 ```README.md``` 来说明自己的插件（最好用英文，哈哈）。

    一切准备妥当，接下来就是万众瞩目的时刻了，依然在 ```dist``` 目录下，执行 ```npm publish``` 来发布。
    当然在这之前你需要有一个 ```npm``` 账号，并且验证了邮箱，否则不允许发包。在自己的电脑上要登陆 ```npm``` 账号，```npm login``` 。如果不知道电脑上登陆的是哪个账号的话，执行 ```npm whoami``` 。

记录自己的第一次发 ```npm``` 包的坎坷。
