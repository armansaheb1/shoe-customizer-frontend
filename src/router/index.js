import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import NotFound from '@/components/NotFound'

import globals from '@/globals'

// Layouts
import Layout1 from '@/layout/Layout1'
import Layout2 from '@/layout/Layout2'
import LayoutBlank from '@/layout/LayoutBlank'

Vue.use(Router)
Vue.use(Meta)

const router = new Router({
  base: '/',
  mode: 'history',
  routes: [{
    // Layout 2
    path: '/admin',
    component: Layout2,
    children: [{
      path: '',
      component: () => import('@/components/dashboards/Dashboard1.vue')
    }, {
      path: 'textureadd',
      component: () => import('@/components/textureadd')
    }, {
      path: 'texturecatadd',
      component: () => import('@/components/texturecatadd')
    }, {
      path: 'texturecat/:id',
      component: () => import('@/components/texturecatedit')
    }, {
      path: 'texturecat',
      component: () => import('@/components/texturecat')
    }, {
      path: 'texture',
      component: () => import('@/components/texture')
    }, {
      path: 'add-products',
      component: () => import('@/components/AddProduct')
    }, {
      path: 'products/:id',
      component: () => import('@/components/EditProduct')
    }, {
      path: 'products',
      component: () => import('@/components/products')
    }, {
      path: 'add-category',
      component: () => import('@/components/Addcategory')
    }, {
      path: 'categories/:id',
      component: () => import('@/components/Editcategory')
    }, {
      path: 'categories',
      component: () => import('@/components/categories')
    }, {
      path: 'orders',
      component: () => import('@/components/orders')
    }, {
      path: 'orderproduct/:id',
      component: () => import('@/components/orderproduct')
    }]
  },{
    path: '/',
    component: Layout1,
    children: [{
      path: '',
      component: () => import('@/components/Gallery')
    }, {
      path: 'gallery/:id',
      component: () => import('@/components/GalleryCat')
    }, {
      path: 'page-2',
      component: () => import('@/components/Page2')
    }, {
      path: 'product/:id',
      component: () => import('@/components/product')
    }, {
      path: 'productcheck/:id',
      component: () => import('@/components/productcheck')
    },]
  },{
    path: '/pages/',
    component: LayoutBlank,
    children: [ {
      path: 'product/:id',
      component: () => import('@/components/product')
    },{
      path: 'productcheck/:id',
      component: () => import('@/components/productcheck')
    },]
  }, {
    // 404 Not Found page
    path: '*',
    component: NotFound
  }]
})

router.afterEach(() => {
  // On small screens collapse sidenav
  if (window.layoutHelpers && window.layoutHelpers.isSmallScreen() && !window.layoutHelpers.isCollapsed()) {
    setTimeout(() => window.layoutHelpers.setCollapsed(true, true), 10)
  }

  // Scroll to top of the page
  globals().scrollTop(0, 0)
})

router.beforeEach((to, from, next) => {
  // Set loading state
  document.body.classList.add('app-loading')

  // Add tiny timeout to finish page transition
  setTimeout(() => next(), 10)
})

export default router
