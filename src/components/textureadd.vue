<template>
<div>
  <div id="elem"  style="background:white">
    <img hidden src="" id="patimg" alt="">

   <div style="position:absolute ; width:40% ; top:85px ; background:white">

    <div id="container" style="background:white ; height:600px ; float:left;mrgin-top:0px ;width:100%">

    </div>

  </div>
   

  </div>
  <div style="position:absolute ; text-align:center;padding:10px; width:30% ; top:85px ;height:600px; background:white ; left: 10px">
    <label for="">Material</label>
    <select v-model="mat" @change="matchange()" class="form-control" style="text-align:center" name="" id="">
      <option v-for="(item , idx) in mats" v-bind:key="idx" :value="item">{{item.name}}</option>
    </select>
    <label>Name</label>
    <b-input v-model="name">

    </b-input><br>
    <b-form-group>
      <label for="color">Color</label>
      <input id="color" @change="ctypechange()" v-model="colortype" value="color" type='radio' name="color">
      <label for="picture">Picture</label>
      <input id="color" @change="ctypechange()" v-model="colortype" value="pic" type='radio' name="color">
    </b-form-group>
    <label v-if="colortype === 'pic'">Picture</label>
    <input v-if="colortype === 'pic'" class="form-control" @change="changeval()" id="pic" type="file"><br>
    <label v-if="colortype === 'color'">Color</label>
    <input v-if="colortype === 'color'" v-model="color" class="form-control" @change="changeval()" ><br>
    <label>Shininess</label>
    <input class="form-control" @input="changeval()" v-model="shininess" type="number" step=".01"><br>

    <b-button variant="success" @click="submit()">Submit</b-button>



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
      name: '',
      normal: '',
      shininess: 300,
      colortype: false,
      mats: [],
      mat: {},
      color: '757575',
      repeat: 1,
      item: '',
      mod: '',
      obj: [],
      patl : false,
      scene: '',
      selectedPiece : '',
      lights:[],
      bumped: 0,
      col: [],
      shiny:0,
      render: '',
      bump: '',
      face : false,
      pat: false,
      pati: false,
      part : '',
      lightpower: 0.3,
      ii:0,
      counter: 0,
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
    this.getmats()
    this.hi()
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
    ctypechange(){
      if(this.colortype === 'pic'){

      }else{
        this.setcolor()
      }
    },
    matchange(){
      this.normal = this.mat.bumpmap
      if(this.colortype === 'pic'){
        this.setcolor2()
      }else{
        this.setcolor()
      }
    },
    addpic(){
      var file = document.getElementById('pic').files[0]
      var bu = new THREE.TextureLoader().load( file )
      this.obj[0].children[0].material.map = bu
      this.obj[0].children[0].material.color = null
      console.log(this.obj[0].children[0])
    },
    async getmats(){
      await axios
        .get(`/material`)
        .then(response => {
          this.mats = response.data
        })
    },
    async submit(){
      const formdata = new FormData()
      formdata.append('material', this.mat.id)
      formdata.append('name', this.name)
      formdata.append('shininess', this.shininess)
      if(this.colortype === 'pic'){
        var img = document.getElementById('pic').files[0]
        formdata.append('texture', img, img.name)
        formdata.append('type', 'pattern')
      }else{
        formdata.append('color', '0x' + this.color)
        formdata.append('type', 'color')
      }
      await axios
        .post(`/pattern`, formdata)
        .then(response => {
          this.$swal(' پارچه با موفقیت ثبت شد',
            'success');
        })
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
      const scene = new THREE.Scene()
      this.scene = scene
      scene.background = new THREE.Color( 'white' );

      const AmbientLight = new THREE.AmbientLight( 'white' , .25)
      scene.add(AmbientLight)

      const DirectionalLight61 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight61)
      DirectionalLight61.position.y = 6


      DirectionalLight61.position.z = -6
      DirectionalLight61.position.x = 6
      scene.add(DirectionalLight61)


      const DirectionalLight62 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight62)
      DirectionalLight62.position.y = 6

      
      DirectionalLight62.position.z = -6
      DirectionalLight62.position.x = 0
      scene.add(DirectionalLight62)


      const DirectionalLight63 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight63)
      DirectionalLight63.position.y = 6

      
      DirectionalLight63.position.z = -6
      DirectionalLight63.position.x = -6
      scene.add(DirectionalLight63)


      const DirectionalLight64 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight64)
      DirectionalLight64.position.y = 6

      
      DirectionalLight64.position.z = 0
      DirectionalLight64.position.x = 6
      scene.add(DirectionalLight64)


      const DirectionalLight65 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight65)
      DirectionalLight65.position.y = 6

      
      DirectionalLight65.position.z = 0
      DirectionalLight65.position.x = -6
      scene.add(DirectionalLight65)


      const DirectionalLight66 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight66)
      DirectionalLight66.position.y = 6

      
      DirectionalLight66.position.z = 6
      DirectionalLight66.position.x = 6
      scene.add(DirectionalLight66)



      const DirectionalLight67 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight67)
      DirectionalLight67.position.y = 6

      
      DirectionalLight67.position.z = 6
      DirectionalLight67.position.x = 0
      scene.add(DirectionalLight67)


      const DirectionalLight68 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight68)
      DirectionalLight68.position.y = 6

      
      DirectionalLight68.position.z = 6
      DirectionalLight68.position.x = -6
      scene.add(DirectionalLight68)


      const DirectionalLight01 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight01)
      DirectionalLight01.position.y = 0


      DirectionalLight01.position.z = -6
      DirectionalLight01.position.x = 6
      scene.add(DirectionalLight01)


      const DirectionalLight02 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight02)
      DirectionalLight02.position.y = 0

      
      DirectionalLight02.position.z = -6
      DirectionalLight02.position.x = 0
      scene.add(DirectionalLight02)


      const DirectionalLight03 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight03)
      DirectionalLight03.position.y = 0

      
      DirectionalLight03.position.z = -6
      DirectionalLight03.position.x = -6
      scene.add(DirectionalLight03)


      const DirectionalLight04 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight04)
      DirectionalLight04.position.y = 0

      
      DirectionalLight04.position.z = 0
      DirectionalLight04.position.x = 6
      scene.add(DirectionalLight04)


      const DirectionalLight05 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight05)
      DirectionalLight05.position.y = 0

      
      DirectionalLight05.position.z = 0
      DirectionalLight05.position.x = -6
      scene.add(DirectionalLight05)


      const DirectionalLight06 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight06)
      DirectionalLight06.position.y = 0

      
      DirectionalLight06.position.z = 6
      DirectionalLight06.position.x = 6
      scene.add(DirectionalLight06)



      const DirectionalLight07 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight07)
      DirectionalLight07.position.y = 0

      
      DirectionalLight07.position.z = 6
      DirectionalLight07.position.x = 0
      scene.add(DirectionalLight07)


      const DirectionalLight08 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLight08)
      DirectionalLight08.position.y = 0

      
      DirectionalLight08.position.z = 6
      DirectionalLight08.position.x = -6
      scene.add(DirectionalLight08)



      const DirectionalLightn61 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn61)
      DirectionalLightn61.position.y = -6


      DirectionalLightn61.position.z = -6
      DirectionalLightn61.position.x = 6
      scene.add(DirectionalLightn61)


      const DirectionalLightn62 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn62)
      DirectionalLightn62.position.y = -6

      
      DirectionalLightn62.position.z = -6
      DirectionalLightn62.position.x = 0
      scene.add(DirectionalLightn62)


      const DirectionalLightn63 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn63)
      DirectionalLightn63.position.y = -6

      
      DirectionalLightn63.position.z = -6
      DirectionalLightn63.position.x = -6
      scene.add(DirectionalLightn63)


      const DirectionalLightn64 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn64)
      DirectionalLightn64.position.y = -6

      
      DirectionalLightn64.position.z = 0
      DirectionalLightn64.position.x = 6
      scene.add(DirectionalLightn64)


      const DirectionalLightn65 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn65)
      DirectionalLightn65.position.y = -6

      
      DirectionalLightn65.position.z = 0
      DirectionalLightn65.position.x = -6
      scene.add(DirectionalLightn65)


      const DirectionalLightn66 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn66)
      DirectionalLightn66.position.y = -6

      
      DirectionalLightn66.position.z = 6
      DirectionalLightn66.position.x = 6
      scene.add(DirectionalLightn66)



      const DirectionalLightn67 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn67)
      DirectionalLightn67.position.y = -6

      
      DirectionalLightn67.position.z = 6
      DirectionalLightn67.position.x = 0
      scene.add(DirectionalLightn67)


      const DirectionalLightn68 = new THREE.DirectionalLight( 'white' , .1)
      this.lights.push(DirectionalLightn68)
      DirectionalLightn68.position.y = -6

      
      DirectionalLightn68.position.z = 6
      DirectionalLightn68.position.x = -6
      scene.add(DirectionalLightn68)



      const DirectionalLight13 = new THREE.AmbientLight( 'white' , .02)
      scene.add(DirectionalLight13)
      const frustumSize = 800;
      var aspect = 500 / 500


      const camera = new THREE.OrthographicCamera(
        frustumSize * aspect / - 3.1,
        frustumSize * aspect / 3.1,
        frustumSize / 3.1,
        frustumSize / - 3.1,
        .1,
        2000
      )
      camera.zoom = 1;
      camera.translateZ(190)
      camera.position.x = 0;
      camera.position.y = 20;
      camera.position.z = -270;
      camera.updateProjectionMatrix()

      var mouse, raycaster;

      mouse = new THREE.Vector2();
      raycaster = new THREE.Raycaster();

      
      
      

      const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true , SSAO: true})
      renderer.setSize(500, 500)
      setTimeout(() => {
        document.querySelector('#container').appendChild(renderer.domElement)
      }, 4000);

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.target.set(0, 0 , 0)
      controls.minPolarAngle = 0; // radians
		  controls.maxPolarAngle = Math.PI; // radians
      controls.minAzimuthAngle = 0
      controls.maxAzimuthAngle = [0,Math.PI]
      controls.rotateSpeed = 0.8
      controls.enableZoom = false
      controls.enableDamping = true;

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
          }
          
        })

      function onMouseMove( event ) {
        var canvasBounds = renderer.domElement.getBoundingClientRect();
        mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;;
        mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
    
      }
      window.addEventListener( 'mousemove', onMouseMove, false );
      this.loadm()
      window.addEventListener('resize', onWindowResize, false)
      function onWindowResize() {
          camera.aspect = 500 / 500
          renderer.setSize(500, 500)
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
    loadm(){
            let fbxLoader = new FBXLoader();
            fbxLoader.load('/spher.fbx', (object) => {
              object.position.y = object.position.y -150
            this.obj.push(object)
              this.setcolor()
              this.scene.add(this.obj[0])
          })          
      },
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },
    setcolor() {
      var counter = 0 , code = '0x' + this.color , repeat = this.repeat , normal = this.normal
      if (this.normal){
        var normal =  'http://127.0.0.1:8000' + this.normal
      }else{
        var normal = ''
      }
        if(normal === ''){
          normal = null
        }else{
          var bu = new THREE.TextureLoader().load( normal )
          bu.wrapS = THREE.RepeatWrapping;
          bu.wrapT = THREE.RepeatWrapping;
          bu.repeat.set( repeat, repeat );
        }
      const material = new THREE.MeshPhongMaterial( {normalMap: bu , color: Number(code) , shininess : this.shininess} );
      this.obj[counter].children[0].material = material
    },
    setcolor2(){
      var counter = 0 , code = '0x' + this.color , repeat = this.repeat , normal = this.normal
      if (this.normal){
        var normal =  'http://127.0.0.1:8000' + this.normal
      }else{
        var normal = ''
      }
      this.$loading(true)
      if(normal === ''){
          bu = null
      }else{
        var bu = new THREE.TextureLoader().load( normal )
        bu.wrapS = THREE.RepeatWrapping;
        bu.wrapT = THREE.RepeatWrapping;
        bu.repeat.set( repeat, repeat );
      }
      if(document.getElementById('pic').files.length){
        var code = URL.createObjectURL(document.getElementById('pic').files[0])
      }else{
        var code = null
      }
      if (document.getElementById('pic').files.length){
        const texture2 = new THREE.TextureLoader().load(code , (texture) =>{
          texture2.wrapS = THREE.RepeatWrapping;
          texture2.wrapT = THREE.RepeatWrapping;
          texture2.repeat.set( repeat, repeat );
          console.log(bu)
          var material = new THREE.MeshPhongMaterial( { map: texture2 , normalMap: bu , shininess: this.shininess} );
          this.obj[counter].children[0].material = material
          this.$loading(false)
        });
      }
    },
    setbump( link ,idx){
      this.bumped = idx
      this.bump = link
      document.querySelectorAll('.tabha').forEach(item => {
        item.style.background = '#cccccc'
      })
      document.getElementById('tab' + this.bumped+ '-' + this.counter).style.background = '#ececec'
    },
    changeval(){
      if(this.colortype === 'pic'){
          this.setcolor2()
      }else{
        this.setcolor()
      } 
    },
    shine(){
      for (var i=0 ; i < this.obj.length ; i++){
        this.obj[i].children[0].material.shininess = parseInt(this.shiny)
      }
    },
    light(){
      for (var i=0 ; i < this.lights.length ; i++){
        this.lights[i].intensity = this.lightpower
      }
    },
    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },

    lighter(){
      if(!this.patl){
      this.patl = true
      var newcol = new THREE.Color(0x333333)
        var newcol2 = new THREE.Color(0x666666)
        var col = this.obj[0].children[0].geometry.attributes.color.array
        
        for(var i = 0 ; i < col.length ; i++){
          this.col.push(col[i])
          if(col[i] < newcol2.r)
          col[i] = col[i] + newcol.r
        }
        this.obj[0].children[0].geometry.attributes.color.needsUpdate = true
      }
    },
    darker(){
      if(this.patl){
        this.patl = false
        var col = this.obj[0].children[0].geometry.attributes.color.array
        
        for(var i = 0 ; i < col.length ; i++){
          col[i] = this.col[i]
        }
        this.obj[0].children[0].geometry.attributes.color.needsUpdate = true
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
div.scrollmenu {
  direction: rtl;
  background-color: #cccccc;
  overflow: auto;
  white-space: nowrap;
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