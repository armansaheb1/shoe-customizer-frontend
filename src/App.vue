<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<style src="@/vendor/styles/bootstrap.scss" lang="scss"></style>
<style src="@/vendor/styles/appwork.scss" lang="scss"></style>
<style src="@/vendor/styles/theme-corporate.scss" lang="scss"></style>
<style src="@/vendor/styles/colors.scss" lang="scss"></style>
<style src="@/vendor/styles/uikit.scss" lang="scss"></style>
<style src="./style.scss" lang="scss"></style>

<script>
import themeSettings from '@/vendor/libs/theme-settings/theme-settings.js'
export default {
  name: 'app',
  metaInfo: {
    title: 'Index',
    titleTemplate: '%s - Vue Starter'
  },
  updated () {
    // Remove loading state
    setTimeout(() => document.body.classList.remove('app-loading'), 1)
  },
}
</script>
