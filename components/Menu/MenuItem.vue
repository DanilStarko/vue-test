<template>
  <li
    class="site-navigation__item"
    :class="{ 'site-navigation__item--submenu': isExistSubMenu }"
    @click="isShowSubMenu = !isShowSubMenu"
  >
    <!--    я так и не понял почему нельзя его использовать absolute_url и как сделать нужно,-->
    <!--    т.к. ссылка там вроде нормально построена, от родительской категории -->
    <nuxt-link v-if="!isExistSubMenu" class="site-navigation__panel--link" :to="item.absolute_url" @click.native="hideMenu">
      <span v-if="item.thumbnail && item.thumbnail.length" class="site-navigation__thumbnail">
        <img :src="item.thumbnail" :alt="item.name">
      </span>
      <span>{{ item.name }}</span>
    </nuxt-link>
    <div v-else class="site-navigation__panel" :class="{ 'site-navigation__panel--active': isShowSubMenu }">
      <span class="site-navigation__icon" :class="{ 'site-navigation__icon--active': isShowSubMenu }">
        <ArrowDown />
      </span>
      <div v-if="item.thumbnail && item.thumbnail.length" class="site-navigation__thumbnail">
        <img :src="item.thumbnail" :alt="item.name">
      </div>
      <nuxt-link class="site-navigation__link" :to="item.absolute_url" @click.native="hideMenu">
        <span>{{ item.name }}</span>
      </nuxt-link>
    </div>
    <ul v-if="isExistSubMenu && isShowSubMenu" class="site-navigation__submenu" @click.stop>
      <MenuItem
        v-for="subItem in item.submenu"
        :key="subItem.id"
        :item="subItem"
      />
    </ul>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';
import ArrowDown from '~/components/Icons/ArrowDown';

export default {
  name: 'MenuItem',
  components: {
    ArrowDown,
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isShowSubMenu: false,
    };
  },
  computed: {
    isExistSubMenu() {
      return this.item.submenu && this.item.submenu.length;
    },
  },
  methods: {
    ...mapMutations('the_menu', ['SET_IS_VISIBLE_MENU']),
    hideMenu() {
      this.SET_IS_VISIBLE_MENU();
    },
  },
};
</script>

<style lang="scss">
@import "~assets/variables.scss";

.site-navigation {

  &__item {
    display: block;
    width: 100%;
    position: relative;
    color: #333;

    &--submenu {
      height: unset;
    }

    &--submenu .site-navigation__panel {
      padding-left: 10px;
    }

    &--submenu .site-navigation__submenu {
      padding-left: 10px;
    }
  }

  &__thumbnail {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__icon {
    transition: 0.3s linear;
    display: flex;

    svg {
      width: 25px;
      height: 25px;
      padding: 5px;
    }

    &--active {
      transform: rotate(180deg);
    }

    &--active svg {
      fill: #ffffff;
    }
  }

  &__panel {
    padding: .75rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #e6e6e6;
    min-height: 65px;

    &--link {
      padding: .75rem 1rem;
      cursor: pointer;
      color: inherit;
      display: flex;
      align-items: center;
      border-bottom: 0.5px solid #e6e6e6;
    }

    &--active {
      background-color: rgb(130, 0, 255);
    }

    &--active .site-navigation__link {
      color: #fff;

      &:hover,
      &:active {
        color: #ffffff;
        text-decoration: underline;
      }
    }

    &--link .site-navigation__thumbnail {
      margin-left: 25px;
    }

    &--link span {
      color: #333333;

      &:hover,
      &:active {
        color: inherit;
        text-decoration: underline;
      }
    }
  }

  &__link {
    color: inherit;

    &:hover,
    &:active {
      color: inherit;
      text-decoration: underline;
    }
  }

  &__submenu {
    padding-left: 0;
  }
}
@media screen and (min-width: $screen-md) {
  .site-navigation {
    &__item {
      &--submenu .site-navigation__panel {
        padding-left: 20px;
      }

      &--submenu .site-navigation__submenu {
        padding-left: 20px;
      }
    }

    &__thumbnail {
      margin-right: 10px;
    }

    &__panel {
      &--link {
        &:hover,
        &:active {
          background-color: rgb(130, 0, 255);
          color: rgb(255, 255, 255);
          text-decoration: none;
        }
      }

      &--link {
        &:hover span,
        &:active span{
          color: rgb(255, 255, 255);
        }
      }

      &--link span {
        &:hover,
        &:active {
          text-decoration: underline;
        }
      }

      &:hover,
      &:active {
        background-color: rgb(130, 0, 255);
        color: rgb(255, 255, 255);
      }

      &:hover .site-navigation__icon svg {
        fill: #fff;
      }
    }
  }
}
</style>
