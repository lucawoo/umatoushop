import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/index.vue'
import Detail from '@/pages/detail.vue'
import News from '@/pages/news/news.vue'
import News1 from '@/pages/news/news1.vue'
import News2 from '@/pages/news/news2.vue'
import News3 from '@/pages/news/news3.vue'
import News4 from '@/pages/news/news4.vue'
import AbourOur from '@/pages/abourOur.vue'
import FoodDetail from '@/pages/detail/foodDetail.vue'
import OrderList from '@/pages/orderList/orderList.vue'
// import OrderList from '@/pages/detail/orderList.vue'
import OrderSubmit from '@/pages/orderSubmit/orderSubmit.vue'
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
    path: '/orderSubmit',
    component: OrderSubmit
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
})
