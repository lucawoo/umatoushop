import Vue from 'vue'
import Vuex from 'Vuex'
import { MessageBox } from 'mint-ui'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 数据保存本地防止刷新消失
    goodDetails: localStorage['goodDetails'] ? JSON.parse(localStorage['goodDetails']) : [],
    carts: localStorage['carts'] ? JSON.parse(localStorage['carts']) : [],
    orders: localStorage['orders'] ? JSON.parse(localStorage['orders']) : [],
    address: localStorage['address'] ? JSON.parse(localStorage['address']) : [],
    user: null
  },
  mutations: {
    // 登录
    isLogin (state, name) {
      state.user = name
    },
    // 加入购物车
    addcarts: (state, data) => {
      state.carts.push(data)
      localStorage.setItem('carts', JSON.stringify(state.carts))
    },
    // 购物之后加入订单,先加入的订单放在最前面
    addorder: (state, data) => {
      var newOrdersList = []
      newOrdersList.push(data)
      for (var i = 0; i < state.orders.length; i++) {
        newOrdersList.push(state.orders[i])
      }
      state.orders = newOrdersList
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },
    // 删除购物车商品
    shanchu: (state, index) => {
      MessageBox.confirm('确定删除该商品么？').then(action => {
        state.carts.splice(index, 1)
        localStorage.setItem('carts', JSON.stringify(state.carts))
      })
    },
    // 清空购物车
    settlement: (state, data) => {
      state.carts = []
      localStorage.setItem('carts', JSON.stringify(state.carts))
    },

    // 订单删除
    odefault: (state, index) => {
      MessageBox.confirm('确定删除该订单么？').then(action => {
        state.orders.splice(index, 1)
        localStorage.setItem('orders', JSON.stringify(state.orders))
      })
    },

    // 数量加
    add (state, index) {
      state.carts[index].buyNum++
    },
    // 数量减
    reduce (state, index) {
      if (state.carts[index].buyNum === 1) {
        state.carts[index].buyNum = 1
      } else {
        state.carts[index].buyNum--
      }
    },
    // 保存地址,新增的地址放在集合的第一个元素上
    saveAddress (state, data) {
      var newAddressList = []
      newAddressList.push(data)
      for (var i = 0; i < state.address.length; i++) {
        newAddressList.push(state.address[i])
      }
      state.address = newAddressList
      localStorage.setItem('address', JSON.stringify(state.address))
    },
    // 删除地址
    delAddress (state, index) {
      MessageBox.confirm('确定删除该地址么？').then(action => {
        state.address.splice(index, 1)
        localStorage.setItem('address', JSON.stringify(state.address))
      })
    }
  },
  getters: {
    sum: state => {
      var sum = 0
      state.carts.forEach((cart) => {
        sum += cart.price * cart.buyNum
      })
      return sum
    }
  }
})
export default store
