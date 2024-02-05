import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: {
        id: null,
        name: null,
        accessToken: null
      }
    };
  },
  mutations: {},
});

export default store;
