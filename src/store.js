import { createStore } from "vuex" 

const store = createStore({
  state:{
    currentUser: {},
    currentRole: 'receiptionist'
  }
})

export default store