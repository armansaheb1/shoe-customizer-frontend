<template>
  <sidenav :orientation="orientation" :class="curClasses">

    <!-- Brand demo (see src/demo.css) -->
    <div class="app-brand demo" v-if="orientation !== 'horizontal'">
      <span class="app-brand-logo demo bg-primary">
        
      </span>
      <router-link to="/" class="app-brand-text demo sidenav-text font-weight-normal ml-2"></router-link>
    </div>
    <div class="sidenav-divider mt-0" v-if="orientation !== 'horizontal'"></div>

    <!-- Links -->
    <div class="sidenav-inner" :class="{ 'py-1': orientation !== 'horizontal' }">
      <sidenav-header>
        منو محصولات
      </sidenav-header>
      <!-- Pages -->
      <sidenav-menu icon="ion ion-logo-buffer">
        <template slot="link-text"> دسته بندی های پارچه</template>
        <sidenav-router-link to="/admin/texturecatadd">اضافه کردن دسته بندی</sidenav-router-link>
        <sidenav-router-link to="/admin/texturecat">مدیریت دسته بندی</sidenav-router-link>
      </sidenav-menu>


      <sidenav-menu icon="ion ion-logo-buffer">
        <template slot="link-text">پارچه ها</template>
        <sidenav-router-link to="/admin/textureadd">اضافه کردن پارچه</sidenav-router-link>
        <sidenav-router-link to="/admin/texture">مدیریت پارچه</sidenav-router-link>
      </sidenav-menu>

      <sidenav-menu icon="ion ion-logo-buffer">
        <template slot="link-text">دسته بندی محصولات</template>
        <sidenav-router-link to="/admin/add-category">اضافه کردن دسته بندی</sidenav-router-link>
        <sidenav-router-link to="/admin/categories">مدیریت دسته بندی</sidenav-router-link>
      </sidenav-menu>

      <sidenav-menu icon="ion ion-logo-buffer">
        <template slot="link-text">محصولات</template>
        <sidenav-router-link to="/admin/add-products">اضافه کردن محصولات</sidenav-router-link>
        <sidenav-router-link to="/admin/products">مدیریت محصولات</sidenav-router-link>
      </sidenav-menu>
      <sidenav-divider>
      </sidenav-divider>
       <sidenav-header>
        سفارشات
      </sidenav-header>

        <sidenav-router-link icon="ion ion-logo-buffer" to="/admin/orders">سفارشات</sidenav-router-link>

        <sidenav-divider>
      </sidenav-divider>
       <sidenav-header>
        تنظیمات
      </sidenav-header>
    </div>
  </sidenav>
</template>

<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'

export default {
  name: 'app-layout-sidenav',
  components: {
    /* eslint-disable vue/no-unused-components */
    Sidenav,
    SidenavLink,
    SidenavRouterLink,
    SidenavMenu,
    SidenavHeader,
    SidenavBlock,
    SidenavDivider
    /* eslint-enable vue/no-unused-components */
  },

  props: {
    orientation: {
      type: String,
      default: 'vertical'
    }
  },

  computed: {
    curClasses () {
      let bg = this.layoutSidenavBg

      if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
        bg = bg
          .replace(' sidenav-dark', '')
          .replace(' sidenav-light', '')
          .replace('-darker', '')
          .replace('-dark', '')
      }

      return `bg-${bg} ` + (
        this.orientation !== 'horizontal'
          ? 'layout-sidenav'
          : 'layout-sidenav-horizontal container-p-x flex-grow-0'
      )
    }
  },

  methods: {
    isMenuActive (url) {
      return this.$route.path.indexOf(url) === 0
    },

    isMenuOpen (url) {
      return this.$route.path.indexOf(url) === 0 && this.orientation !== 'horizontal'
    },

    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    }
  }
}
</script>
