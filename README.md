## 项目启动

```
npm install
// or
yarn install

npm run dev
//or
yarn run dev
```

# 博客

CSDN：https://blog.csdn.net/sinat_36521655

掘金：https://juejin.im/user/3421335918494775

## 正文

不知不觉vue3.0都进入beta版本，离正式版也快了，之前读了不少vue3.0的文章，但纸上得来终觉浅，现在就上手写个demo吧！！！

完事开头难，第一步就是搭建环境，虽然最新版的@vue/cli3已经支持创建vue3.0的项目，不过自己动手丰衣足食，随便回顾一下webpack的相关配置。

> 文章的源码我放在了[github](https://github.com/DavidChen93/vue3.0-demo.git)上，可自行获取。

## 环境搭建

### 初始化

```
mkdir vue3.0-demo

cd vue3.0-demo

// npm初始化
npm init -y

// git初始化
git init
```

### 添加gitignore文件

创建gitignore文件，copy一份常用的gitignore文件，内容如下:

```
.DS_Store
node_modules/
/dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
/test/unit/coverage/
/test/e2e/reports/
/build/
selenium-debug.log

# 编辑器目录和文件
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
```

### 安装依赖

```
// 安装vue3.0
yarn add vue@next

// 安装webpack
yarn add webpack webpack-cli webpack-dev-server -D

// 安装打包编译依赖
yarn add html-webpack-plugin clean-webpack-plugin -D

// 安装vue文件编译依赖
yarn add vue-loader@next @vue/compiler-sfc -D

// 安装样式编译依赖
yarn add css-loader style-loader less-loader -D

```

### 创建项目目录

```
// 创建相关项目文件夹
mkdir src

// 创建公共入口文件夹
mkdir public

// 创建webpack配置文件
cd > webpack.config.js

// 创建基础文件
cd > src/main.js
cd > public/index.html
cd > src/App.vue

```

### 编写index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vue3.0 demo</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

### 配置webpack.config.js
就是很常见的配置文件，如果实在看不懂，可以先看看[Webpack官方文档](https://www.webpackjs.com/concepts/)。

```javascript
const path = require('path')
// vue-loader 15.x版本后必须要使用这个插件
const { VueLoaderPlugin } = require('vue-loader')
// 将样式和js文件通过link和script写入index.html中
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 删除打包后的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = (env = {}) => ({
  // 当前运行模式
  mode: env.prod ? 'production' : 'development',
  // 调试工具
  devtool: env.prod ? 'source-map' : 'inline-source-map',
  // 打包入口
  entry: resolve('./src/main.js'),
  // 打包出口
  output: {
    path: resolve('./dist'),
    publicPath: '/'
  },
  // 解析模块请求
  resolve: {
    alias: {
      'vue': '@vue/runtime-dom',
      '@': resolve('./src')
    }
  },
  // 模块配置，各种loader
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  // 插件
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html'),
      filename: 'index.html'
    })
  ],
  // 开发服务器
  devServer: {
    publicPath: '/',
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: __dirname,
    overlay: true,
    historyApiFallback: true
  }
})
```

### 编写webpack入口文件main.js

vue3.0挂载方式稍有变动

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用
const app = createApp(App)

// 挂载
app.mount('#app')
```

### 编写APP.vue文件

下面的编写方式是vue3.0的新特性，template可以直接包含多个子节点，不需要使用别的元素标签包裹

```html
<template>
  <h1>我是Home页</h1>
  vue3.0新特性，template可以允许多个标签节点，不需要额外包裹一层
</template>

<script>
export default {
  name: 'App'
}
</script>

```

### 在package.json中添加脚本

```
// 添加脚本
"scripts": {
  "dev": "webpack-dev-server"
}
```

### 启动项目
执行下面的命令:
```
yarn dev

// or

npm run dev
```

成功启动后，访问`http://localhost:8080/`，就可以在浏览器里面看到如下内容。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8eb6f805b7e4ee680af93cc1c5d2be3~tplv-k3u1fbpfcp-zoom-1.image)


## composition API

composition API借鉴了react hooks的思想，将业务逻辑更加内聚化。原理什么的抛开不讲，API工程师只看API好不好用。vue3.0的一个重要特性就是composition API，所以接下来就结合demo，初步了解setup、ref、reactive、computed, toRefs和watchEffect。更多详细内容可以查看[草案](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)。

### setup

setup函数的特性：

- 是使用Composition API的入口；
- 在声明周期beforeCreate事件之前被调用；
- 可以返回一个对象，这个对象的属性被合并到渲染上下文，并可以在模板中直接使用；
- 可以返回一个渲染函数，如下：
  - `return () => h('div', [count.value, object.foo])`
- 接收props对象作为第一个参数，接收来的props对象，可以通过watchEffect监视其变化。
- 接受context对象作为第二个参数，这个对象包含attrs，slots，emit三个属性。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/22f75d58f5c54cf9a0ca17fc854cabc3~tplv-k3u1fbpfcp-zoom-1.image)

### ref

ref用创建一个包装对象，这个对象只具备一个响应式属性value，如果将对象指定为ref的值，该对象将被reactive方法深度遍历。在js代码中需要通过x.value取值以及赋值，但是在模板中自动处理了这个包装对象，不需要单独调用x.value。

举个计数器的例子。
```vue
<template>
  计数器：<span>{{ count }}</span>
  <button @click="countPlus">{{ plusText }}</button>
  <button @click="countMinus">{{ minusText }}</button>
</template>

<script>
import { setup, ref } from 'vue'

export default {
  name: 'Counter',

  setup() {
    // 非响应式基础类型数据
    const plusText = '增加'
    const minusText = '减少'

    const count = ref(0)

    const countPlus = () => {
      count.value++
    }

    const countMinus = () => {
      count.value--
    }

    return {
      plusText,
      minusText,
      count,
      countPlus,
      countMinus
    }
  }
}
</script>
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b14773e2e81741f1b137387de82d7934~tplv-k3u1fbpfcp-zoom-1.image)

### reactive

通过reactive创建响应式对象，这个创建的响应式对象并不是包装对象，不需要使用x.value来取值。reactive等价于 Vue 2.x 的Vue.observable，用于获取一个对象的响应性代理对象

### computed

vue 2.x 中计算属性是非常强大的功能，在 vue3.0 中肯定会保留啦，只不过他变成composition Api之后变成了一个高阶函数。

### watchEffect

在setup时会自动执行一次以收集依赖，在依赖改变时触发传入的函数，非常适合将“副作用”放入回调函数中，比如不知道结果的异步请求。

结合上面三个点，举一个例子。

```
<template>
  <button @click="mulitple">我被点了{{ state.count }}次</button>
  值是{{ result }}
</template>

<script>
import { setup, ref, reactive, computed, watchEffect } from 'vue'

export default {
  name: 'Multiplier',

  setup() {
    const state = reactive({
      count: 0
    })

    const result = ref(1)

    const mulitple = () => {
      state.count++
    }

    // 这里只是举个例子，实际上更适合用computed
    watchEffect(() => {
      result.value *= (state.count + 1)
    })

    return {
      state,
      result,
      mulitple
    }
  }
}
</script>
```

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84fba7faa71d42d4969843be20bd3aea~tplv-k3u1fbpfcp-zoom-1.image)

### toRefs

toRefs将reactive对象转换为普通对象，其中结果对象上的每个属性都是指向原始对象中相应属性的ref引用对象，这在组合函数返回响应式状态时非常有用，这样保证了开发者使用对象解构或拓展运算符不会丢失原有响应式对象的响应。

比如自己自己自定义一个hook用于复用的时候。

```javascript
// usePosition.js
import { reactive, toRefs, onMounted, onUnmounted } from 'vue'

const usePosition = () => {
  const position = reactive({
    x: 0,
    y: 0
  })

  const updatePosition = (e) => {
    position.x = e.pageX
    position.y = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', updatePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
  })
  
  return position
}

export default usePosition


// MousePosition.vue
<template>
  当前鼠标x：{{ x }},y：{{ y }}
</template>

<script>
import usePosition from '@/hooks/usePosition'

export default {
  name: 'MousePosition',

  setup() {
    // 方法一：失去响应式
    // const {x, y} = usePosition()
    // return { x, y }

    // 方法二：失去响应式
    // return { ...usePosition() }

    // 方法三：不使用toRefs时，唯一能保持响应式的方法
    return {
      pos: usePosition()
    }
  }
}
</script>
```

如果使用toRefs就可以解决这个问题，上述方法一和方法二就可以使用了。

```javascript
// usePosition.js
import { reactive, toRefs, onMounted, onUnmounted } from 'vue'

const usePosition = () => {
  // ...
  return toRefs(position)
}

export default usePosition
```

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee6bdd2a97ca415ca095ca9f1fd2abad~tplv-k3u1fbpfcp-zoom-1.image)

## 生命周期钩子函数

vue3.0第二个比较大改动点就是新增生命周期钩子函数，与vue2.x对应关系如下表：

|vue2.x|vue3.0|说明|
|---|---|---|
|beforeCreate|setup|组件创建前|
|created|setup|组件创建完成|
|beforeMount|onBeforeMount|组件挂载前|
|mounted|onMounted|组件挂载完成|
|beforeUpdate|onBeforeUpdate|数据更新，视图更新前|
|updated|onUpdated|数据更新，视图更新渲染完成|
|beforeDestroy|onBeforeUnmount|组件销毁前|
|destroyed|onUnmounted|组件销毁完成|

从上表中可以看出，新增的生命周期钩子函数与原先基本对应，销毁阶段和创建阶段稍有不同。添加`on`前缀后，配合setup函数，显得更加直观。

这些新的生命周期钩子函数使用如下：
```html
<template>
  <button @click="add">{{ count }}</button>
</template>

<script>
import { setup, ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

export default {
  name: 'LifeCycle',

  beforeCreate() {
    console.log('beforeCreate')
  },

  created() {
    console.log('created')
  },

  setup() {
    console.log('setup')

    const count = ref(0)

    const add = () => {
      count.value++
    }

    onBeforeMount(() => {
      console.log('beforeMounted')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('beforeMounted')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })

    return {
      count,
      add
    }
  }
}
</script>
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bbc627dc6af4c8ebf8437bf0c5773aa~tplv-k3u1fbpfcp-zoom-1.image)
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ede6c8c43c14c879fe8ecc8d4339b93~tplv-k3u1fbpfcp-zoom-1.image)

从图中可以知道，setup钩子函数的触发时间在beforeCreate之前，同时旧的生命周期钩子函数也依然可以用

## 双向绑定v-model

在vue2.x中，我们想要在一个组件上面创建多个双向绑定的属性就要使用.sync修饰符，vue3.0在v-model原有语法糖上，增加了v-model:xxx的用法，实现多属性双向绑定，具体用法如下：

```html
<!-- MyInput.vue -->
<template>
  数字：<input type="number" :value="number" @input="numberInput" />
  文本：<input type="text" :value="text" @input="textInput" />
</template>

<script>
import { setup } from 'vue'
export default {
  name: 'MyInput',

  props: {
    number: Number,
    text: String
  },

  setup(props, ctx) {
    console.log(ctx)
    const numberInput = e => {
      ctx.emit('update:number', e.target.value)
    }

    const textInput = e => {
      ctx.emit('update:text', e.target.value)
    }

    return {
      numberInput,
      textInput
    }
  }
}
</script>


<!-- MyForm.vue -->
<template>
  <my-input v-model:number="number" v-model:text="text" />
  <p>数字:{{number}}</p>
  <p>文本:{{text}}</p>
</template>

<script>
import MyInput from '@/components/MyInput.vue'
import { setup, ref } from 'vue'
export default {
  name: 'MyForm',

  components: {
    MyInput
  },

  setup() {
    const text = ref('')
    const number = ref(0)

    return {
      text,
      number
    }
  }
}
</script>

```

其效果如下：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46f878d22886425abeb200be2c2024c9~tplv-k3u1fbpfcp-zoom-1.image)

## vue-router

上面举了这么多例子，不如把它弄成一个单页应用吧，撸起袖子就干。

按照下面的目录创建文件夹以及文件：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e32065a2350048d2b3cf979c63116ae6~tplv-k3u1fbpfcp-zoom-1.image)

然后安装vue-router
```
npm install vue-router@next -D

// or

yarn add vue-router@next -D
```

在`src/router/index.js`文件写入如下内容:

```javascript
import {
  createRouter,
  createWebHistory, 
  createWebHashHistory
} from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/counter',
    component: () => import('@/views/Counter.vue'),
    name: 'counter',
    meta: {
      title: '计数器-ref API'
    }
  },
  {
    path: '/mousePosition',
    component: () => import('@/views/MousePosition.vue'),
    name: 'mousePosition',
    meta: {
      title: '鼠标坐标-reactive API'
    }
  },
  {
    path: '/multiplier',
    component: () => import('@/views/Multiplier.vue'),
    name: 'multiplier',
    meta: {
      title: '乘法器-watchEffect API'
    }
  },
  {
    path: '/lifeCycle',
    component: () => import('@/views/LifeCycle.vue'),
    name: 'lifeCycle',
    meta: {
      title: '生命周期'
    }
  },
  {
    path: '/form',
    component: () => import('@/views/MyForm.vue'),
    name: 'form',
    meta: {
      title: '多值双向绑定v-model'
    }
  }
]

const router = createRouter({
  // 使用hash模式的路由，url带#标识
  history: createWebHashHistory(),
  // 使用history模式的路由，跟正常的url一样，需要后台配置
  // history: createWebHistory(),
  routes
})

export default router
```

然后我们新建一个菜单组件，逻辑很简单，获取上面写的路由，简单处理输出成菜单。

```html
<!-- src/components/Menu.vue -->
<template>
  <ul>
    <li v-for="menu in menus" :key="menu.path">
      <router-link :to="menu.path">{{ menu.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import router from '@/router'
import { setup, computed } from 'vue'

export default {
  name: 'Menu',

  setup() {
    // 计算属性
    const menus = computed(() => {
      // 获取所有路由信息
      const routes = router.getRoutes()

      const res = []
      routes.forEach(route => {
        res.push({
          name: route.meta.title,
          path: route.path
        })
      })

      return res
    })

    return {
      menus
    }
  }
}
</script>

```

最后再次启动它吧，体验vue3.0带来的快乐吧。

## 总结

初步上手体验了一下vue3.0，从风格上明显可以感觉出来在向react靠拢，但是又无法摆脱"对象形式"的书写方式，给人一种不上不下的奇怪感觉，不过总归算是踏除了第一步，肯定就会有更好的第二步。
