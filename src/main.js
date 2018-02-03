import Vue from 'vue'
import Layout from './components/layout'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import IndexPage from './pages/index'
import Detail from './pages/detail'
import FoodDetail from './pages/detail/foodDetail'
import OrderList from './pages/detail/orderList'
import News from './pages/news/news.vue'
import News1 from './pages/news/news1.vue'
import News2 from './pages/news/news2.vue'
import News3 from './pages/news/news3.vue'
import News4 from './pages/news/news4.vue'
import AbourOur from './pages/abourOur.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router)
Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    isLogin (state, name) {
      state.user = name
    }
  }
})
// 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  {
    path: '/',
    component: IndexPage
  },
  {
    path: '/aboutOur',
    component: AbourOur
  },
  {
    path: '/detail',
    component: Detail,
    redirect: './detail/zou/zou1',
    children: [
      {
        path: ':category/:foodName',
        component: FoodDetail
      }
    ]
  },
  {
    path: '/orderList',
    component: OrderList
  },
  {
    path: '/news',
    redirect: './news/01',
    component: News,
    children: [
      {
        path: '01',
        component: News1
      },
      {
        path: '02',
        component: News2
      },
      {
        path: '03',
        component: News3
      },
      {
        path: '04',
        component: News4
      }
    ]
  }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes // （缩写）相当于 routes: routes
})

// 全局导航钩子
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    // console.log(isEmptyObject(store.state.user))
    if (!isEmptyObject(store.state.user)) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

function isEmptyObject (obj) {
  for (var key in obj) {
    return false
  }
  return true
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: {Layout}
})
