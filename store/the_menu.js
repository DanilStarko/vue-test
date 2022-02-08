import Vue from 'vue';

export default {
  namespaced: true,
  state() {
    return {
      menu: [],
      isVisibleMenu: false,
    };
  },
  mutations: {
    SET_MENU(state, menu) {
      Vue.set(state, 'menu', menu);
    },
    SET_IS_VISIBLE_MENU(state) {
      state.isVisibleMenu = !state.isVisibleMenu;
    },
  },
  getters: {
    menuList: (state) => state.menu ?? [],
    isVisibleMenu: (state) => state.isVisibleMenu,
  },
};
