import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: {
        id: null,
        name: null,
        accessToken: null
      },
      isLoggedIn: false
    };
  },
  mutations: {},
});

export default store;
