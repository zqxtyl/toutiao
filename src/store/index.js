import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY='TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user:getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state,data){
      state.user=data
      //数据持久化
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
      setItem(TOKEN_KEY,state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
