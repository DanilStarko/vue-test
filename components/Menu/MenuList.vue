<template>
  <client-only>
    <PerfectScrollbar class="site-navigation" tag="ul">
      <MenuItem
        v-for="item in menuList"
        :key="item.id"
        :item="item"
      />
    </PerfectScrollbar>
  </client-only>
</template>

<script>
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css';
import { mapGetters } from 'vuex';
import MenuItem from './MenuItem';

export default {
  name: 'MenuList',
  components: {
    MenuItem,
  },
  computed: {
    ...mapGetters('the_menu', ['menuList']),
  },
};
</script>

<style lang="scss">
@import "~assets/variables.scss";

.site-navigation {
  display: flex;
  flex-direction: column;
  grid-area: site-navigation;
  list-style-type: none;
  width: 100%;
  height: calc(100vh - 153px);
  background: rgb(255, 255, 255);
  overflow-y: scroll;
  z-index: 1;
  position: absolute;
  top: -1000%;
  padding-left: 0;
  transition: all 0.3s linear;

  &.active {
    top: 100%;
  }
  @media screen and (min-width: $screen-md) {
    height: calc(100vh - 84px);
  }
}
</style>
