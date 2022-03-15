<template>
  <div id="elem" v-if="model.parts.length" style="background:white">
    <img hidden src="" id="patimg" alt="">
        <b-navbar id="blacknav" toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x" style="background:#000!important;padding:0!important;direction:ltr">
          <a style="margin-left:1%;font:14px 'arial' ; color:white ; font-weight:bold!important" href="/pages/gallery">
          <img style="height:20px;margin-right:3px " src="https://s3alugroup.s3.amazonaws.com/b4w/common/templates/126/interface/icons/arrow_back.png"  alt="">
          محصولات
          </a>
          <a class="d-none d-sm-block" style="margin-left:10px;margin-right:10px;font-size:28px ; color:white ">|</a>
          <a class="d-none d-sm-block" style="font:14px 'Yekan' ; color:white" href="#">
          {{item.name}}
          </a>
          
           <a style="position:absolute;width:100%;text-align:center ;margin-left:1%;font:10px 'Yekan' ; color:white ; font-weight:bold!important; text-align:center" href="/">
          <img style="height:50px; border-radius:50% ; background:#ececec ; margin:1.5%" src="data:image/png;base64,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"  alt=""><br>
          </a>
           
           

          <div style="; position:absolute ; right:30px ; width:40%">
            <a @click="submit()" style="font:10px 'Yekan' ; color:white ; font-weight:bold!important; text-align:center ; float:right" href="#">
              <i style="margin-top:5px; font-size:20px" class="fas fa-check-circle fa-2x d-none d-sm-block"></i>
           ثبت سفارش
          </a>
            <a class="d-none d-sm-block" style="margin-left:15px;margin-right:15px;font-size:28px ; color:white ; float:right">|</a>
            <a class="d-none d-sm-block" @click="openFullscreen()" style="font:10px 'Yekan' ; color:white ; font-weight:bold!important; text-align:center ; float:right" href="#">
             <i style="margin-top:5px; font-size:20px" class="fas fa-expand-arrows-alt fa-2x"></i><br>
           تمام صفحه
          </a>
          
          </div>
           
    <b-collapse is-nav id="app-layout-navbar" style="padding:0!important">
      <!-- Divider -->
      <hr class="d-lg-none w-100 my-2">
      <a class="bt" href="" style="width:40px; height:45px;color:#ececec;padding-top:3px">
      </a>
    </b-collapse>
  </b-navbar>
    <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x " style="background:#cccccc!important;padding:0!important ; box-shadow:none!important ; border-style:none  ;padding: 0 8%">
    <i @click="slide2('right')" class="fas fa-chevron-right fa-2x md-light" style="cursor:pointer;position:absolute ; right:10px ; margin: 0 ; margin-top:0 ;color:#dcdcdc!important" ></i>
    <i @click="slide2('left')" class="fas fa-chevron-left fa-2x md-light" style="cursor:pointer;position:absolute ; left:10px ; margin: 0 ; margin-top:0 ;color:#dcdcdc!important" ></i>

    <div class="scrollmenu tabi" is-nav id="app-layout-navbar" style="padding:0!important ; box-shadow:none!important; overflow:hidden">
      <!-- Divider -->
      
      <a   v-for="(item, key, idx) in model.parts[counter].bump" v-bind:key="idx" :id="'tab' + key + '-' + counter" @click="setbump(item.pic ,key)" class="bt tabha" style="height:40px; padding: 0 10px">
        <h5 style="padding:10px;width:100%;100%;text-align:center;font-family:'Sahel', sans-serif;"> {{item.name}} </h5>
      </a>


    </div>
  </b-navbar>
  
  <div v-for="(itemm , idxx) in model.parts" v-bind:key="idxx" style="width:100%">
    
    <b-navbar hidden v-for="(item ,key , idx) in itemm" v-bind:key="idx" :id="'nav' + idx + '-' + idxx" toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x navha" style="background:transparent!important;z-index: 1; box-shadow:none!important ; white-space: nowrap!important ; overflow-x:hidden ;width:92%; margin:auto">
      <i @click="slide('right')" class="fas fa-chevron-right fa-3x" style="cursor:pointer;position:fixed ; right:10px ; margin: 0 ; margin-top:-40px ;" ></i>
    <i @click="slide('left')" class="fas fa-chevron-left fa-3x" style="cursor:pointer;position:fixed ; left:10px ; margin: 0 ; margin-top:-40px ;" ></i>
    <div is-nav id="" style="box-shadow:none ; width:auto ; height:110px!important ;  min-width:100% ;white-space: nowrap!important">
      <!-- Divider -->

      <a  v-for="(item, key , idx ) in model.parts[counter].bump[bumped].colors" v-bind:key="idx" style="width:70px; height:100px;margin:5px;margin-right:15px;margin-left:15px;display: inline-block;">
        <div class="aaaa2" v-if="item.icon && item.code && !item.pic" @click="setcolor(counter , item.code , item.shininess)" :style="`cursor:pointer;width:100%;height:60px;border-radius:4px;;float:right;;background-size:100% 100%;background:url('` + item.icon + `')`" alt=""></div>
        <h5 v-if="item.icon && item.code && !item.pic" style="padding-top:70px;width:100%;height:40px;text-align:center;font-family:'Sahel', sans-serif"> {{key}}</h5>


        <div class="aaaa2" v-if="item.icon && item.pic && !item.code" @click="setcolor2(counter , item.pic , item.shininess)" :style="`cursor:pointer;width:100%;height:60px;border-radius:4px;;float:right;;background-size:100% 100%;background:url('` + item.icon + `')`" alt=""></div>
        <h5 v-if="item.icon && item.pic && !item.code" style="padding-top:70px;width:100%;height:40px;text-align:center;font-family:'Sahel', sans-serif"> {{key}}</h5>

        <div class="aaaa2" v-if="item.icon && item.code && item.pic" @click="setcolor3(counter , item.pic, item.code , item.shininess)" :style="`cursor:pointer;width:100%;height:60px;border-radius:4px;;float:right;;background-size:100% 100%;background:url('` + item.icon + `')`" alt=""></div>
        <h5 v-if="item.icon && item.code && item.pic" style="padding-top:70px;width:100%;height:40px;text-align:center;font-family:'Sahel', sans-serif"> {{key}}</h5>

        <div v-if="item.code && !item.icon && !item.pic" @click="setcolor(counter , item.code , item.shininess)" :style="'cursor:pointer;width:100%;height:60px;border-radius:2px;background-size:100% 100%;background:#' + item.code.replace('0x' , '')" alt=""></div>
        <h5 v-if="item.code && !item.icon && !item.pic" style="padding-top:10px;width:100%;height:40px;text-align:center;font-family:'Sahel', sans-serif;"> {{key}}</h5>

        <div class="aaaa" v-if="item.pic && !item.icon && !item.code" @click="setcolor2(counter , item.pic , item.shininess)" :style="`cursor:pointer;width:100%;height:60px;border-radius:4px;;float:right;;background-size:100% 100%;background:url('` + item.pic + `')`" alt=""></div>
        <h5 v-if="item.pic && !item.icon && !item.code" style="padding-top:70px;width:100%;height:40px;text-align:center;font-family:'Sahel', sans-serif"> {{key}}</h5>

        <div class="aaaa2" v-if="item.code && item.pic && !item.icon" @click="setcolor3(counter , item.pic, item.code , item.shininess)" :style="'cursor:pointer;width:100%;height:60px;border-radius:2px;background-size:100% 100%;background:#' + item.code.replace('0x' , '')" alt=""></div>
        <h5 v-if="item.code && item.pic && !item.icon" style="padding-top:70px;width:100%;height:40px;text-align:center;font-family:'Sahel', sans-serif"> {{key}}</h5>
      </a>

    </div>
    </b-navbar>
  </div>
   <div style="position:absolute ; width:100% ; top:85px ; background:white">

    <div id="container" style="background:white ; height:600px ; float:left;mrgin-top:0px ;width:100%">

    </div>

  </div>
  <div style="position:absolute ; left:20px ; top : 31% ; width: 250px ; height: 300px ; background:#ececec">
    <h4 style="width: 100%; margin:0 ;text-align:center ; padding:5px">Camera Settings</h4>
    <hr style="margin:0">
    <label style="width: 100%; margin:0 ;text-align:center ; padding:5px">ZOOM</label>
    <b-input @change="camresize()" v-model="camsize" step="0.02" type="number"></b-input>
     <label style="width: 100%; margin:0 ;text-align:center ; padding:5px">Y POSITION</label>
    <b-input @change="scenechange()" v-model="sceney" step="5" type="number"></b-input>
  </div>
  <div style="position:absolute ; right:20px ; top : 31% ; width: 250px ; height: 300px ; background:#ececec">
    <h4 style="width: 100%; margin:0 ;text-align:center ; padding:5px">Scene Settings</h4>
    <hr style="margin:0">
    <label style="width: 100%; margin:0 ;text-align:center ; padding:5px">LIGHT POWER</label>
    <b-input @change="lightchange()" v-model="lightint" step="0.005" type="number"></b-input>

    <label style="width: 100%; margin:0 ;text-align:center ; padding:5px">LIGHT COLOR</label>
    <b-input @change="lightchange()" v-model="lightred" class="bg-danger"></b-input>
    <b-input @change="lightchange()" v-model="lightgreen" class="bg-success"></b-input>
    <b-input @change="lightchange()" v-model="lightblue" class="bg-primary"></b-input>
  </div>
  <div style="width:300px;height:120px; z-index:1 ; position:absolute ; bottom:0 ; left:0">
    <h5 style="text-align:center">انتخاب بخش ها</h5>
    <article style="width:25.5%;height:100%;float:left; margin: .25%">
      <svg @click="prev()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;;width:50%;margin:25%;cursor:pointer" xml:space="preserve">
  <g>
    <g>
      <path d="M466.811,210.812H154.283l114.691-114.69c17.618-17.619,17.618-46.288,0-63.907c-8.536-8.536-19.883-13.235-31.954-13.235    c-12.07,0-23.418,4.701-31.953,13.235L13.236,224.047C4.7,232.583,0,243.931,0,256.001s4.7,23.417,13.236,31.953l191.832,191.832    c8.535,8.536,19.883,13.236,31.953,13.236c12.071,0,23.419-4.7,31.954-13.234c17.618-17.619,17.618-46.288,0-63.907    l-114.691-114.69h312.528c24.918,0,45.189-20.271,45.189-45.189S491.729,210.812,466.811,210.812z M466.811,280.791H129.66    c-4.126,0-7.844,2.485-9.423,6.296c-1.579,3.811-0.706,8.198,2.211,11.115L254.55,430.303c9.667,9.666,9.667,25.393,0,35.059    c-4.682,4.682-10.907,7.261-17.529,7.261c-6.621,0-12.847-2.578-17.529-7.261L27.659,273.53    c-4.682-4.682-7.261-10.908-7.261-17.529s2.578-12.847,7.261-17.529L219.491,46.639c4.682-4.682,10.908-7.261,17.529-7.261    c6.622,0,12.847,2.578,17.529,7.261c9.667,9.666,9.667,25.393,0,35.059L122.449,213.799c-2.917,2.917-3.79,7.305-2.211,11.115    c1.579,3.81,5.299,6.296,9.423,6.296h337.11c13.67,0,24.79,11.121,24.79,24.79C491.602,269.67,480.481,280.791,466.811,280.791z"/>
    </g>
  </g>
  <g>
    <g>
      <path d="M152.042,140.166c-3.984-3.983-10.442-3.983-14.425,0l-3.06,3.06c-3.983,3.984-3.983,10.442,0,14.425    c1.991,1.992,4.602,2.987,7.212,2.987s5.221-0.995,7.213-2.987l3.06-3.06C156.024,150.607,156.024,144.149,152.042,140.166z"/>
    </g>
  </g>
  <g>
    <g>
      <path d="M126.034,166.174c-3.984-3.983-10.442-3.983-14.425,0l-80.574,80.574c-3.983,3.984-3.983,10.442,0,14.425    c1.991,1.992,4.602,2.987,7.212,2.987s5.221-0.995,7.213-2.987l80.574-80.574C130.016,176.615,130.017,170.17,126.034,166.174z"/>
    </g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
  <g>
  </g>
      </svg>
    </article>
    <article style="width:46.5%;height:100%;float:left; margin: .25%">
      <br>
      <h3 style="text-align:center">{{model.parts[counter].name}}</h3>
    </article>
    <article style="width:25.5%;height:100%;float:left; margin: .25%">
      <svg @click="next()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;width:50%;margin:25%;cursor:pointer" xml:space="preserve">
<g>
	<g>
		<path d="M498.766,224.046L306.933,32.215c-8.535-8.536-19.882-13.235-31.953-13.235c-12.07,0-23.418,4.701-31.953,13.235    c-17.618,17.619-17.618,46.288,0,63.907l114.69,114.69H45.189C20.271,210.812,0,231.083,0,256.001s20.271,45.189,45.189,45.188    h312.527l-114.69,114.69c-17.618,17.619-17.618,46.288,0,63.907c8.535,8.536,19.883,13.236,31.953,13.236    c12.071,0,23.418-4.7,31.954-13.234l191.832-191.833C507.3,279.418,512,268.07,512,256.001    C512,243.931,507.3,232.583,498.766,224.046z M484.342,273.529L292.509,465.362c-4.682,4.682-10.907,7.261-17.529,7.261    c-6.622,0-12.847-2.578-17.529-7.261c-9.667-9.666-9.667-25.393,0-35.059l132.101-132.101c2.916-2.917,3.789-7.304,2.21-11.115    c-1.578-3.81-5.296-6.296-9.422-6.296H45.189c-13.67,0-24.79-11.121-24.79-24.79c0-13.669,11.12-24.79,24.79-24.79h337.1    c4.126,0,7.844-2.485,9.422-6.296c1.579-3.811,0.706-8.198-2.21-11.115L257.449,81.698c-9.667-9.666-9.667-25.393,0-35.059    c4.682-4.682,10.907-7.261,17.529-7.261c6.622,0,12.847,2.578,17.529,7.261l191.833,191.832    c4.682,4.682,7.261,10.908,7.261,17.529C491.602,262.622,489.023,268.847,484.342,273.529z"/>
	</g>
</g>
<g>
	<g>
		<path d="M377.444,143.226l-3.06-3.06c-3.985-3.983-10.441-3.983-14.425,0c-3.983,3.984-3.983,10.442,0,14.425l3.06,3.06    c1.992,1.992,4.601,2.987,7.212,2.987c2.611,0,5.22-0.995,7.213-2.987C381.427,153.667,381.427,147.209,377.444,143.226z"/>
	</g>
</g>
<g>
	<g>
		<path d="M480.966,246.748l-80.574-80.574c-3.985-3.983-10.441-3.983-14.425,0c-3.983,3.984-3.983,10.442,0,14.425l80.574,80.574    c1.992,1.992,4.601,2.987,7.212,2.987c2.611,0,5.22-0.995,7.213-2.987C484.949,257.189,484.949,250.731,480.966,246.748z"/>
	</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
      </svg>
    </article>
  </div>
  
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss"></style>

<script>
import Switches from 'vue-switches';
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import axios from 'axios';
import LayoutNavbar from '../layout/LayoutNavbar'

export default {
  name: 'pages-authentication-login-v1',
  components: {
    'app-layout-navbar': LayoutNavbar,
    Switches
  },
  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  metaInfo: {
    title: 'Login v1 - Pages'
  },
  data: () => ({
      item: '',
      itemparts : [],
      mod: '',
      obj: [],
      scene: '',
      sceney: 0,
      selectedPiece : '',
      lights:[],
      lightsys:[],
      controls:[],
      lightint: .1,
      lightred: 'ff',
      lightgreen: 'ff',
      lightblue: 'ff',
      bumped: 0,
      shiny:0,
      render: '',
      bump: '',
      pat: false,
      camsize: 1,
      part : '',
      lightpower: 0.3,
      ii:0,
      counter: 0,
      camera: {},
      parts: [],
      model : {
        name: 'aa',
        amount: 5,
        parts: []
      }
  }),
  beforeMount(){
    this.$loading(true)
  },
  mounted () {
    this.getitem()
  },
  watch: {
    pat:{
      handler: function() {
            this.patina();
        },
        deep: true
    }
  },
  methods: {
    async getitem () {
      await axios
        .post(`/items`, {id: this.$route.params.id})
        .then(response => {
          this.item = response.data[0]
          this.getitemmaterials()
        })
    },
    async getitemparts () {
      await axios
        .get(`/itemparts/${this.item.id}`)
        .then(response => {
          this.itemparts = response.data
          setTimeout(() => {
            this.hi()
          }, 3000);
        })
    },
    async getitemmaterials () {
      await axios
        .get(`/itemmaterials/${this.item.id}`)
        .then(response => {
          this.model.parts = response.data
          setTimeout(() => {
            this.getitemparts()
          }, 1500);
          
        })
    },
    submit(){
      this.$swal('سفارش شما با موفقیت ثبت شد',
        ' کد پیگیری شما : Sh-254001',
        'success');
      },
    openFullscreen() {
      var elem = document.getElementById("elem");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }, 
    hi() {
      document.querySelector('.navha').hidden = false
      document.querySelector('.tabha').style.background = '#ececec'
      const scene = new THREE.Scene()
      this.scene = scene
      scene.background = new THREE.Color( 'white' );

      const AmbientLight = new THREE.AmbientLight( 'white' , .25)
      scene.add(AmbientLight)

      const DirectionalLight = new THREE.DirectionalLight( 0xffffff , this.lightint)
      DirectionalLight.position.z = -6
      DirectionalLight.position.y = 6
      DirectionalLight.position.x = 0
      DirectionalLight.target.y = 1
      scene.add(DirectionalLight)



      const DirectionalLight2 = new THREE.DirectionalLight( this.lightcolor  , this.lightint)
      DirectionalLight2.position.z = -6
      DirectionalLight2.position.y = 6
      DirectionalLight2.position.x = -6
      DirectionalLight2.target.y = 1
      scene.add(DirectionalLight2)



      const DirectionalLight3 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight3)
      this.lightsys.push(6)
      DirectionalLight3.position.z = -6
      DirectionalLight3.position.y = 6
      DirectionalLight3.position.x = 6
      DirectionalLight3.target.y = 1
      scene.add(DirectionalLight3)
      


      const DirectionalLight4 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight4)
      this.lightsys.push(6)
      DirectionalLight4.position.z = -6
      DirectionalLight4.position.y = 6
      DirectionalLight4.position.x = 6
      DirectionalLight4.target.y = 0
      scene.add(DirectionalLight4)


      const DirectionalLight5 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight5)
      this.lightsys.push(6)
      DirectionalLight5.position.z = 0
      DirectionalLight5.position.y = 6
      DirectionalLight5.position.x = 0
      DirectionalLight5.target.y = 0
      scene.add(DirectionalLight5)



      const DirectionalLight6 = new THREE.DirectionalLight( this.lightcolor , .05)
      DirectionalLight6.position.z = 0
      DirectionalLight6.position.y = 12
      DirectionalLight6.position.x = 3
      DirectionalLight6.target.y = 0
      scene.add(DirectionalLight6)


      const DirectionalLightb = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb)
      this.lightsys.push(1)
      DirectionalLightb.position.z = -6
      DirectionalLightb.position.y = 1
      DirectionalLightb.position.x = 0
      DirectionalLightb.target.y = 1
      scene.add(DirectionalLightb)



      const DirectionalLightb2 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb2)
      this.lightsys.push(1)
      DirectionalLightb2.position.z = -6
      DirectionalLightb2.position.y = 1
      DirectionalLightb2.position.x = -6
      DirectionalLightb2.target.y = 1
      scene.add(DirectionalLightb2)



      const DirectionalLightb3 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb3)
      this.lightsys.push(1)
      DirectionalLightb3.position.z = -6
      DirectionalLightb3.position.y = 1
      DirectionalLightb3.position.x = 6
      DirectionalLightb3.target.y = 1
      scene.add(DirectionalLightb3)
      


      const DirectionalLightb4 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb4)
      this.lightsys.push(1)
      DirectionalLightb4.position.z = -6
      DirectionalLightb4.position.y = 1
      DirectionalLightb4.position.x = 6
      DirectionalLightb4.target.y = 0
      scene.add(DirectionalLightb4)


      const DirectionalLightb5 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb5)
      this.lightsys.push(1)
      DirectionalLightb5.position.z = 0
      DirectionalLightb5.position.y = 1
      DirectionalLightb5.position.x = 0
      DirectionalLightb5.target.y = 0
      scene.add(DirectionalLightb5)



      const DirectionalLightb7 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb7)
      this.lightsys.push(1)
      DirectionalLightb7.position.z = 6
      DirectionalLightb7.position.y = 1
      DirectionalLightb7.position.x = 0
      DirectionalLightb7.target.y = 1
      scene.add(DirectionalLightb7)



      const DirectionalLightb8 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb8)
      this.lightsys.push(1)
      DirectionalLightb8.position.z = 6
      DirectionalLightb8.position.y = 1
      DirectionalLightb8.position.x = -6
      DirectionalLightb8.target.y = 1
      scene.add(DirectionalLightb8)



      const DirectionalLightb9 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb9)
      this.lightsys.push(1)
      DirectionalLightb9.position.z = 6
      DirectionalLightb9.position.y = 1
      DirectionalLightb9.position.x = 6
      DirectionalLightb9.target.y = 1
      scene.add(DirectionalLightb9)
      


      const DirectionalLightb10 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb10)
      this.lightsys.push(1)
      DirectionalLightb10.position.z = 6
      DirectionalLightb10.position.y = 1
      DirectionalLightb10.position.x = 6
      DirectionalLightb10.target.y = 0
      scene.add(DirectionalLightb10)


      const DirectionalLightb11 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLightb11)
      this.lightsys.push(-6)
      DirectionalLightb11.position.z = 0
      DirectionalLightb11.position.y = -6
      DirectionalLightb11.position.x = 0
      DirectionalLightb11.target.y = 0
      scene.add(DirectionalLightb11)


      const DirectionalLight7 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight)
      this.lightsys.push(6)
      DirectionalLight7.position.z = 6
      DirectionalLight7.position.y = 6
      DirectionalLight7.position.x = 0
      DirectionalLight7.target.y = 1
      scene.add(DirectionalLight7)



      const DirectionalLight8 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight8)
      this.lightsys.push(6)
      DirectionalLight8.position.z = 6
      DirectionalLight8.position.y = 6
      DirectionalLight8.position.x = -6
      DirectionalLight8.target.y = 1
      scene.add(DirectionalLight8)



      const DirectionalLight9 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight9)
      this.lightsys.push(6)
      DirectionalLight9.position.z = 6
      DirectionalLight9.position.y = 6
      DirectionalLight9.position.x = 6
      DirectionalLight9.target.y = 1
      scene.add(DirectionalLight9)
      


      const DirectionalLight10 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight10)
      this.lightsys.push(6)
      DirectionalLight10.position.z = 6
      DirectionalLight10.position.y = 6
      DirectionalLight10.position.x = 6
      DirectionalLight10.target.y = 0
      scene.add(DirectionalLight10)


      const DirectionalLight11 = new THREE.DirectionalLight( 0xffffff , this.lightint)
      this.lights.push(DirectionalLight11)
      this.lightsys.push(-6)
      DirectionalLight11.position.z = 0
      DirectionalLight11.position.y = -6
      DirectionalLight11.position.x = 0
      DirectionalLight11.target.y = 0
      scene.add(DirectionalLight11)




      const DirectionalLight12 = new THREE.DirectionalLight( this.lightcolor , .05)
      DirectionalLight12.position.z = 0
      DirectionalLight12.position.y = 12
      DirectionalLight12.position.x = -3
      DirectionalLight12.target.y = 0
      scene.add(DirectionalLight12)

      const DirectionalLight13 = new THREE.AmbientLight( this.lightcolor , .02)
      scene.add(DirectionalLight13)
      const frustumSize = 600;
      var aspect = window.innerWidth / 650


      const camera = new THREE.OrthographicCamera(
        frustumSize * aspect / - 3.1,
        frustumSize * aspect / 3.1,
        frustumSize / 3.1,
        frustumSize / - 3.1,
        this.lightint,
        2000
      )
      camera.translateZ(190)
      camera.position.x = 0;
      camera.position.y = 20;
      camera.position.z = -190;
      this.camera = camera
      console.log(camera)
      this.camera.updateProjectionMatrix()
      

      var mouse, raycaster;

      mouse = new THREE.Vector2();
      raycaster = new THREE.Raycaster();

      
      
      

      const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true , SSAO: true})
      renderer.setSize(window.innerWidth, 650)
      document.querySelector('#container').appendChild(renderer.domElement)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(30, 0 , 0)
      controls.minPolarAngle = 0; // radians
		  controls.maxPolarAngle = Math.PI; // radians
      controls.minAzimuthAngle = 0
      controls.maxAzimuthAngle = [0,Math.PI]
      controls.rotateSpeed = 0.8
      controls.enableZoom = false
      controls.enableDamping = true;
      this.controls = controls

      function onClick() {
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          var selectedPiece = intersects[0].object
          return selectedPiece.name;
        }else{
          return false
        }
      }
      var drag = false
      window.addEventListener('mousedown', ()=>{
        drag = false
      });
      document.addEventListener(
        'mousemove', () => drag = true);
  
      document.addEventListener(
        'mouseup', () => {
          if(drag === false){
            this.selectedPiece = onClick()
          this.select()
          }
          
        })

      function onMouseMove( event ) {
        var canvasBounds = renderer.domElement.getBoundingClientRect();
        mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;;
        mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
    
      }
      window.addEventListener( 'mousemove', onMouseMove, false );
      this.loadm(0)
      window.addEventListener('resize', onWindowResize, false)
      function onWindowResize() {
          camera.aspect = window.innerWidth / 650
          renderer.setSize(window.innerWidth, 650)
          render()
      }

      const stats = Stats()
      function animate() {
          requestAnimationFrame(animate)

          controls.update()

          render()

          stats.update()
      }
      
      
      function render() {
          
         // camera.lookAt(this.obj[0].position);
          renderer.render(scene, camera)
      }
      this.render = renderer

      animate()
      this.$loading(false)
    },
    camresize(){
      this.camera.zoom = this.camsize
      this.camera.updateProjectionMatrix()
    },
    scenechange(){
      this.scene.position.y = this.sceney
      for (var i=0 ; i < this.lights.length ; i++){
        this.lights[i].target.y = this.sceney
      }
    },
    lightchange(){
      for (var i=0 ; i < this.lights.length ; i++){
        this.lights[i].intensity = this.lightint
        this.lights[i].color.setHex( '0x' + this.lightred + this.lightgreen + this.lightblue )
      }
    },
    loadm(counter){
            let fbxLoader = new FBXLoader();
            fbxLoader.load(this.model.parts[counter].model, (object) => {
            if(window.innerWidth > 400){
              object.position.y = object.position.y 
              object.position.x = object.position.x + 15
            }
            if(window.innerWidth < 400){
            object.position.y = object.position.y
            object.position.x = object.position.x + 20
            object.scale.y = 0.6
            object.scale.x = 0.6
            object.scale.z = 0.6
            }
            this.obj.push(object)
              if(this.model.parts[counter].default.code){
                this.setcolor(counter , this.model.parts[counter].default.code , this.model.parts[counter].default.shininess)
              }else{
                this.setcolor2(counter , this.model.parts[counter].default.pic , this.model.parts[counter].default.shininess)
              }
              this.scene.add(this.obj[counter])
              console.log(this.obj[counter])
              if (counter < this.model.parts.length){
                counter++
                this.loadm(counter)
              }
          })          
      },
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },
    select() {
      if(!this.selectedPiece){
        return
      }
      var jj = 0
      for(var item of this.obj){
        if(item.children[0].name === this.selectedPiece){
          this.counter = jj
        }
        jj++
      }
      if(this.counter > this.obj.length - 1){
        this.counter = 0
      }
        var temp = this.obj[this.counter].children[0].material.color.getHex()
        var temp2 = this.obj[this.counter].children[0].material.map
        var temp3 = this.obj[this.counter].children[0].material.normalMap
        var temp4 = this.obj[this.counter].children[0].material.shininess
      const color2 = new THREE.Color( 0x88ccff );
      const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
      const material = new THREE.MeshPhongMaterial( {bumpMap: bbp ,  color: color2} );
      this.obj[this.counter].children[0].material = material;
      setTimeout(() => {
          const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
          const material2 = new THREE.MeshPhongMaterial( {bumpMap: bbp ,  color: temp , map: temp2 , normalMap : temp3 , shininess : temp4} );
          this.obj[this.counter].children[0].material = material2;
      }, 300);
      document.querySelectorAll('.navha').forEach(item => {
        item.hidden = true
      })
      this.bumped = 0
      document.getElementById('nav' + this.bumped + '-' + this.counter).hidden = false
      document.querySelectorAll('.tabha').forEach(item => {
        item.style.background = '#cccccc'
      })
      document.getElementById('tab' + '0' + '-' + this.counter).style.background = '#ececec'

    },
    next() {
      this.counter = this.counter + 1
      if(this.counter > this.obj.length - 1){
        this.counter = 0
      }
      var temp = this.obj[this.counter].children[0].material.color.getHex()
        var temp2 = this.obj[this.counter].children[0].material.map
        var temp3 = this.obj[this.counter].children[0].material.normalMap
        var temp4 = this.obj[this.counter].children[0].material.shininess
        const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
      const color2 = new THREE.Color( 0x88ccff );
      const material = new THREE.MeshPhongMaterial( {bumpMap: bbp ,  color: color2} );
      this.obj[this.counter].children[0].material = material;
      setTimeout(() => {
        const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
          const material2 = new THREE.MeshPhongMaterial( {bumpMap: bbp ,  color: temp , map: temp2 , normalMap : temp3 , shininess : temp4} );
          this.obj[this.counter].children[0].material = material2;
      }, 300);
      document.querySelectorAll('.navha').forEach(item => {
        item.hidden = true
      })
      this.bumped = 0
      document.getElementById('nav' + this.bumped + '-' + this.counter).hidden = false
            document.querySelectorAll('.tabha').forEach(item => {
        item.style.background = '#cccccc'
      })
      document.getElementById('tab' + '0' + '-' + this.counter).style.background = '#ececec'
    },
    prev() {
      this.counter = this.counter - 1
      if(this.counter < 0){
        this.counter = this.obj.length - 1
      }
      var temp = this.obj[this.counter].children[0].material.color.getHex()
        var temp2 = this.obj[this.counter].children[0].material.map
        var temp3 = this.obj[this.counter].children[0].material.normalMap
        var temp4 = this.obj[this.counter].children[0].material.shininess
        const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
      const color2 = new THREE.Color( 0x88ccff );
      const material = new THREE.MeshPhongMaterial( {bumpMap: bbp ,  color: color2} );
      this.obj[this.counter].children[0].material = material;
      setTimeout(() => {
        const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
          const material2 = new THREE.MeshPhongMaterial( {bumpMap: bbp ,  color: temp , map: temp2 , normalMap : temp3 , shininess : temp4} );
          this.obj[this.counter].children[0].material = material2;
      }, 300);
      document.querySelectorAll('.navha').forEach(item => {
        item.hidden = true
      })
      this.bumped = 0
      document.getElementById('nav' + this.bumped + '-' + this.counter).hidden = false
            document.querySelectorAll('.tabha').forEach(item => {
        item.style.background = '#cccccc'
      })
      document.getElementById('tab' + '0' + '-' + this.counter).style.background = '#ececec'
    },
    setcolor(counter , code , shininess) {
      if(this.bump){
        const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
        var bu = new THREE.TextureLoader().load( this.model.parts[counter].bump[0].pic )
        bu.wrapS = THREE.RepeatWrapping;
        bu.wrapT = THREE.RepeatWrapping;
        bu.repeat.set( 4, 4 );
        const material = new THREE.MeshPhongMaterial( {bumpMap: bbp ,normalMap: bu , color: Number(code) , shininess : shininess} );
      }
      const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
      const material = new THREE.MeshPhongMaterial( {bumpMap: bbp ,color: Number(code) , shininess : shininess} );
      this.obj[counter].children[0].material = material
    },
    setcolor2(counter , code , shininess) {
      this.$loading(true)
      if(!this.bump){
        this.bump = this.model.parts[counter].bump[0].pic
      }
      var bu = new THREE.TextureLoader().load( this.bump )
        bu.wrapS = THREE.RepeatWrapping;
        bu.wrapT = THREE.RepeatWrapping;
        bu.repeat.set( 2.5, 2.5 );
      const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
      const texture2 = new THREE.TextureLoader().load(code , (texture) =>{
        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set( 2.5, 2.5 );
        const material = new THREE.MeshPhongMaterial( {bumpMap: bbp , map: texture2 , normalMap: bu} );
        this.obj[counter].children[0].material = material
        this.obj[counter].children[0].material.shininess = shininess
        this.$loading(false)
      });
      
    },
    setcolor3(counter ,pic, code , shininess) {
      this.$loading(true)
      if(!this.bump){
        this.bump = this.model.parts[counter].bump[0].pic
      }
      var bu = new THREE.TextureLoader().load( this.bump )
      bu.repeat.x = 5
      bu.repeat.y = 5
      const bbp =  new THREE.TextureLoader().load(this.model.parts[this.counter].bumpmap)
      const texture2 = new THREE.TextureLoader().load(pic , (texture) =>{
        const material = new THREE.MeshPhongMaterial( {bumpMap: bbp , AlphaMap: texture2 , normalMap: bu , color: Number(code)} );
        this.obj[counter].children[0].material = material
        this.obj[counter].children[0].material.shininess = shininess
        this.$loading(false)
      });
      
    },
    setbump( link ,idx){
      this.bumped = idx
      this.bump = link
      document.querySelectorAll('.tabha').forEach(item => {
        item.style.background = '#cccccc'
      })
      document.getElementById('tab' + this.bumped+ '-' + this.counter).style.background = '#ececec'
    },
    shine(){
      for (var i=0 ; i < this.obj.length ; i++){
        this.obj[i].children[0].material.shininess = parseInt(this.shiny)
      }
    },
    light(){
      
    },
    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },
    patina(){
      if(this.pat === true){
        alert(1)
        for(var item of this.model.parts){
          if(item.patina){
            alert(2)
            mergeImages([this.bump, item.patina])
            .then(b64 => {
              alert()
              var bu = new THREE.TextureLoader().load( b64 )
      
              this.obj[counter].children[0].material.normalMap = bu
            })
          }
        }
        
      }
    },
    slide(direction){
      document.querySelectorAll('.navha').forEach(container =>{
        var scrollCompleted = 0;
        var slideVar = setInterval(function(){
            if(direction == 'left'){
                container.scrollLeft -= 30;
            } else {
                container.scrollLeft += 30;
            }
            scrollCompleted += 10;
            if(scrollCompleted >= 100){
                window.clearInterval(slideVar);
            }
        }, 50);
      })
    },
    slide2(direction){
      var container = document.querySelector('.tabi')
        var scrollCompleted = 0;
        var slideVar = setInterval(function(){
            if(direction == 'left'){
                container.scrollLeft -= 30;
            } else {
                container.scrollLeft += 30;
            }
            scrollCompleted += 10;
            if(scrollCompleted >= 100){
                window.clearInterval(slideVar);
            }
        }, 50);
    }
  }
}
</script>
<style>
body{
  overflow:hidden
}
input{
  text-align: center;
}
div.scrollmenu {
  direction: rtl;
  background-color: #cccccc;
  overflow: auto;
  white-space: nowrap;
}
.navbar-light{
  color: #cdcdcd!important
}
div.scrollmenu a {
  display: inline-block;
  color: #444;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

div.scrollmenu a:hover {
  background-color: #777;
}
.navha::-webkit-scrollbar {
  width: 10px;
}
.navha::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
.navha::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
.navha::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
.aaaa{
  background-size: 200% 200%!important;
}
.aaaa2{
  background-size: 100% 100%!important;
}
@media only screen and (max-width: 768px) {
  #blacknav {
    height:50px
  }
}
</style>