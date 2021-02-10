import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // count: 5,
    // websocket:null,
  },
  mutations: {
/*     setWebsocket (state,websocket) {
      state.websocket=websocket;
    } */
  },
  actions :{
    /* initWebsocket(context) {
      const wsuri = "ws://127.0.0.1:8081/webSocket/22";
      let websocket = new WebSocket(wsuri);
      context.commit('setWebsocket',websocket);
    } */
  }
})