import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 5,
    user:null,
    forwardUrl:null,
    cartList:[],
  },
  mutations: {
    setUser (state,user) {
      state.user=user;
    },
    setForwardUrl (state,url) {
      state.forwardUrl=url;
    },
    setCartList (state,list) {
      state.cartList = list
    },
    setCartListItem (state,data) {
      console.log('setCartListItem');
      let index = data.index;
      let item = data.item;
      if(!index){
        index = 0;
      }
      if(item){
        state.cartList.splice(index,1,item);
      }else{
        state.cartList.splice(index,1);
      }
    },
    cartListAddItem (state,item){
      state.cartList.push(item);
    },
  },
  actions :{
    /* initWebsocket(context) {
      const wsuri = "ws://127.0.0.1:8081/webSocket/22";
      let websocket = new WebSocket(wsuri);
      context.commit('setWebsocket',websocket);
    } */
  },
  getters :{
    
  }
})