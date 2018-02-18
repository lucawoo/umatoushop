import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index.vue'
import Detail from '@/pages/detail.vue'
import FoodDetail from '@/pages/detail/foodDetail.vue'
import OrderList from '@/pages/detail/orderList.vue'
import News from '@/pages/news/news.vue'
import News1 from '@/pages/news/news1.vue'
import News2 from '@/pages/news/news2.vue'
import News3 from '@/pages/news/news3.vue'
import News4 from '@/pages/news/news4.vue'
import AbourOur from '@/pages/abourOur.vue'
Vue.use(Router)

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
export default new Router({
  routes
  // routes: [
    // { path: '/',name: 'Home',component: Home },
    // { path: '/Home',name: 'Home', component: Home},
    // { path: '/cart',name: 'cart',component: cart },
    // { path: '/my',name: 'my',component: my },
    // { path: '/goodDetail', name: 'goodDetail',component: goodDetail },
    // { path: '/order',name: 'order',component: order },
    // { path: '/author', name: 'author',component: author },
    // { path: '/choose' ,name:'choose' ,component:choose},
    // { path: '/information' ,name:'information' ,component:information},
    // { path: '/news' ,name:'news' ,component:news},
    // { path: '/parts' ,name:'parts' ,component:parts}
  // ]
})
