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
    <label>Name</label>
    <b-input v-model="name">

    </b-input><br>
    <label>Normal Map</label>
    <input class="form-control" @change="setcolor()" id="normal" type="file"><br>
    <label>Repeat</label>
    <input class="form-control" @input="setcolor()" v-model="repeat" type="number" step=".1"><br>
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
      shininess: 300,
      repeat: 1,
      item: '',
      itemparts : [],
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
    addpic(){
      var file = document.getElementById('pic').files[0]
      var bu = new THREE.TextureLoader().load( file )
      this.obj[0].children[0].material.map = bu
      this.obj[0].children[0].material.color = null
      console.log(this.obj[0].children[0])
    },
    async getitem () {
      await axios
        .post(`/items`, {id: 1})
        .then(response => {
          console.log(response.data)
          this.item = response.data[0]
          if(response.data[0].patina){
            if(response.data[0].patinad){
              this.face = THREE.FaceColors
              this.pat = true
            }
            this.pati = true
          }
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
          }, 5000);
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
    async submit(){
      const formdata = new FormData()
      formdata.append('name', this.name)
      formdata.append('repeat', this.repeat)
      var img = document.getElementById('normal').files[0]
      formdata.append('bumpmap', img, img.name)
      await axios
        .post(`/material`, formdata)
        .then(response => {
          this.$swal('دسته بندی با موفقیت ثبت شد',
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
      document.getElementById('container').appendChild(renderer.domElement)

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
          this.select()
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
      if (document.getElementById('normal').files.length){
        var normal =  URL.createObjectURL(document.getElementById('normal').files[0])
      }else{
        var normal = "http://127.0.0.1:8000/media/bumpmaps/NM_PaintedCalf_FullGrain_nvg4su3.jpg"
      }
      var counter = 0 , code = 0x787878 , shininess = this.shininess, repeat = this.repeat
          var bu = new THREE.TextureLoader().load( normal )
          bu.wrapS = THREE.RepeatWrapping;
          bu.wrapT = THREE.RepeatWrapping;
          bu.repeat.set( repeat, repeat );
      const material = new THREE.MeshPhongMaterial( {normalMap: bu , color: Number(code) , shininess : shininess} );
      this.obj[counter].children[0].material = material
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
    patina(){
      if(this.pat === true){
          this.face = THREE.FaceColors
      }else{
          this.face = false
      }
      for(var counter=0 ;counter<this.model.parts.length ; counter++){
        if(this.model.parts[counter].patina){
          var temp = this.obj[counter].children[0].material.color.getHex()
          var temp2 = this.obj[counter].children[0].material.map
          var temp3 = this.obj[counter].children[0].material.normalMap
          var temp4 = this.obj[counter].children[0].material.shininess
          const bbp =  new THREE.TextureLoader().load(this.model.parts[counter].bumpmap)
          if(this.model.parts[counter].patina){
            var material2 = new THREE.MeshPhongMaterial( {  color: temp , map: temp2 , normalMap : temp3 , shininess : temp4 , vertexColors: this.face} );
          }else{
            var material2 = new THREE.MeshPhongMaterial( {  color: temp , map: temp2 , normalMap : temp3 , shininess : temp4} );
          }
          this.obj[counter].children[0].material = material2;
          }        
        }
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