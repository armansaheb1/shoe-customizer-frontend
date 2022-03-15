<template>
  <div>
    <h4 class="font-weight-bold py-3 mb-4">
      کفش ها
    </h4>

    <gallery v-if="!isIE10Mode" :images="galleryImageLinks" :index="galleryIndex" @close="galleryIndex = null" :options="galleryOptions"></gallery>

    <!-- IE10 fallback -->
    <b-modal v-if="isIE10Mode" :visible="galleryFallback" @hidden="galleryIndex=null" size="xl" hide-footer hide-header content-class="bg-transparent" body-class="p-0">
      <button class="close position-absolute text-white opacity-100 px-3" style="font-size:40px;right:0" @click="galleryIndex=null">&times;</button>
      <img v-if="galleryIndex!==null" :src="galleryImageLinks[galleryIndex]" class="mw-100 rounded">
    </b-modal>

    <!-- Images -->
    <div class="row form-row" v-masonry transition-duration="0.3s" item-selector=".gallery-thumbnail" column-width=".gallery-sizer" :origin-left="isRtlMode ? 'false' : 'true'">

      <!-- Add this element to properly relayout grid -->
      <div class="gallery-sizer col-sm-6 col-md-6 col-xl-3 position-absolute"></div>

      <div v-masonry-tile v-for="(image, i) in galleryImages" :key="i" class="gallery-thumbnail col-sm-6 col-md-6 col-xl-3 mb-2">
        <a :href="image.href" class="img-thumbnail img-thumbnail-zoom-in">
          <span class="img-thumbnail-overlay bg-dark opacity-25"></span>
          <span class="img-thumbnail-content display-4 text-white">
            <i class="ion ion-md-arrow-forward"></i>
          </span>
          <img style=background:white :src="image.url" :alt="image.altText" class="img-fluid">
        </a>
      </div>

    </div>
    <!-- / Images -->

  </div>
</template>

<style src="@/vendor/libs/vue-gallery/vue-gallery.scss" lang="scss"></style>

<script>
import Vue from 'vue'
import { VueMasonryPlugin } from 'vue-masonry/index.js'
import axios from 'axios'

Vue.use(VueMasonryPlugin)

export default {
  name: 'pages-gallery',
  metaInfo: {
    title: 'Gallery - Pages'
  },
  components: {
    gallery: () => import('vue-gallery').then(m => m.default).catch(() => {})
  },
  mounted(){
    this.getitem()
  },
  methods: {
      async getitem () {
      await axios
        .get(`/catitems/${this.$route.params.id}`)
        .then(response => {
          this.originalGalleryImages = response.data
          console.log(response)
        })
    }
  },
  data: () => ({
    curTag: 'all',
    galleryIndex: null,
    originalGalleryImages: [
    ],
    galleryOptions: {
      // =======================================================================
      // RTL-only fix: Disable touch events and fix positioning
      //
      onopen: function () {
        if (document.documentElement.getAttribute('dir') !== 'rtl' &&
               document.body.getAttribute('dir') !== 'rtl') return

        const prototype = Object.getPrototypeOf(this)
        const galleryTranslateX = prototype.translateX

        prototype.translateX = function (index, x, speed) {
          x = this.touchStart && this.touchStart.x ? x : -1 * x
          galleryTranslateX.call(this, index, x, 0, speed)
        }

        prototype.positionSlide = function (index) {
          const slide = this.slides[index]
          slide.style.width = this.slideWidth + 'px'
          if (this.support.transform) {
            slide.style.right = index * -this.slideWidth + 'px'
            this.move(
              index,
              this.index > index
                ? -this.slideWidth
                : this.index < index ? this.slideWidth : 0,
              0
            )
          }
        }

        prototype.ontouchstart = function () {}
        prototype.ontouchmove = function () {}
        prototype.ontouchend = function () {}
        prototype.ontouchcancel = function () {}
      }
      // END ===================================================================
    }
  }),
  computed: {
    galleryImages () {
      const images = this.curTag === 'all'
        ? this.originalGalleryImages
        : this.originalGalleryImages.filter(img => img.tag === this.name)

      return images.map(img => {
        return Object.assign({}, img, { url: img.get_pic , href:'/pages/product/' + img.id})
      })
    },

    galleryImageLinks () {
      return this.galleryImages.map(img => img.url)
    },

    galleryFallback () {
      return this.galleryIndex !== null
    }
  }
}
</script>
