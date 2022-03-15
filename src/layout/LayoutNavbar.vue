<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

    <!-- Brand demo (see demo.css) -->
    <b-navbar-brand to="/" class="app-brand demo d-lg-none py-0 mr-4">
      <span class="app-brand-logo demo bg-primary">
        <img src="https://logos-download.com/wp-content/uploads/2016/04/Clarks_logo_logotype.png" alt="">
      </span>
      <span class="app-brand-text demo font-weight-normal ml-2">Keramati</span>
    </b-navbar-brand>

    <!-- Sidenav toggle (see demo.css) -->

    <b-navbar-toggle target="app-layout-navbar"></b-navbar-toggle>

    <b-collapse is-nav id="app-layout-navbar" style="text-align:center">
      <!-- Divider -->
      <hr class="d-lg-none my-2">
        <img style="height:30px ; margin:auto;margin-top:10px;margin-bottom:10px" src="https://logos-download.com/wp-content/uploads/2016/04/Clarks_logo_logotype.png" alt="">

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'app-layout-navbar',

  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },

    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    }
  }
}
</script>
