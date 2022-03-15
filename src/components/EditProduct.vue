<template>
  <div>
<div class="tabs" id="one">
      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col font-weight-bold" style="text-align:center">مشخصات محصول</div>

        </b-card-header>

          <b-card-body class="py-3">
            <label>نام محصول </label>
            <b-input readonly v-model="name" style="text-align:center"></b-input><br>
            <div style="clear:both"></div><br><br>
            
          </b-card-body>
          <hr class="m-0" >
      </b-card>
</div>
<div class="tabs" id="two">

      <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      قسمت های مختلف محصول
    </h4>
    
      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col font-weight-bold" style="text-align:center">مشخصات بخش</div>

        </b-card-header>
        
          <b-card-body class="py-3">
            <label>نام قسمت </label>
            <b-input v-model="partname" style="text-align:center"></b-input><br>
            <label> فایل مدل </label>
            <input id="modelfile" class="form-control" type="file"><br>
            <button @click="submitpart()" style="float:left" class="btn btn-success">اضافه کردن</button><br><br>
            
          </b-card-body>
          <hr class="m-0" >
          <b-card v-if="true" no-body class="mb-3">
      <b-card-header class="row no-gutters align-items-center">
          <div class="col-12">بخش ها</div>
        </b-card-header>
        <b-card-body class="py-3">
          <div  v-for="(item, idx) in parts" v-bind:key="'i' + idx" >

            <div class="col-6 roww" style="float:right"><b-button disabled variant="light">{{item.name}}</b-button></div>
            <div class="col-6 roww"  style="float:right"><b-button variant="danger">X</b-button></div>
            
            </div>

        </b-card-body>
    </b-card>
      </b-card>
</div>
<div class="tabs" id="three">

       <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
     جنس های هر بخش
    </h4>
    <div  v-for="(itemx, idx) in parts" v-bind:key="'p' + idx">

      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col font-weight-bold" style="text-align:center">{{itemx.name}}</div>

        </b-card-header>
        
          <b-card-body class="py-3">
            <div style="width:50%; min-height:100px;margin :  3% 25% ; border-radius: 5px ; border-style: solid ; border-color:#cecece ; border-width:.5px ; text-align:center ; max-height: 150px ; overflow:auto">
              <a style="cursor:pointer"  v-for="(itemmmm, index) in materialsall[idx]" v-bind:key="'dssd' + index" @click="matclick(idx , itemmmm.id , itemmmm.name)" >{{itemmmm.name}}<h3></h3></a>
            </div>

            <div style="width:50%; min-height:100px;margin :  3% 25% ; border-radius: 5px ; border-style: solid ; border-color:#cecece ; border-width:.5px ; text-align:center ; max-height: 150px ; overflow:auto">
              <a style="cursor:pointer"  v-for="(itemmmmm, index) in materialspen[idx]" v-bind:key="'dssdscxz' + index"  @click="matclick2(idx , itemmmmm.id , itemmmmm.name)" >{{itemmmmm.name}}<h3></h3></a>
            </div>
            <button @click="submitmaterials(materialspen[idx] , itemx.id , idx)" style="float:left" class="btn btn-dark">تایید</button>
          </b-card-body>
          <hr class="m-0" >
      </b-card>
    </div>
</div>

  </div>
</template>

<script>
import axios from 'axios'
import Swatches from 'vue-color/src/components/Chrome.vue'
export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'Forum list - Pages'
  },
  components: {
    'swatches-picker': Swatches,
  },
  mounted(){
    this.materialscheck()
    this.get_materials()
    this.init()
  },
  methods: {
    init(){
      this.id = this.$route.params.id
      this.get_item()
      this.get_parts()
      
    },
    async get_item () {
      await axios
      .get(`/item/${this.id}`)
      .then(response => {   
        this.name = response.data[0].name
      })
    },
    async get_parts(){
       await axios
      .get(`/parts/${this.id}`)
      .then(response => {   
        this.parts = response.data
        var i = 0
        for (var item of response.data){
          this.get_material(item.id , i)
          i++
        }
      })
    },
    async get_material(id , i){
       await axios
      .get(`/materials/${id}`)
      .then(response => {   
        this.materialspen[i] = response.data
        this.materialsall[i] = this.materialsalls.filter(item => !(this.materialspen[i].map(x => x.name).includes(item.name)));
        console.log(this.materials)
      })
    },
    async get_materials(id){
      
       await axios
      .get(`/material`)
      .then(response => {   
        this.materialsalls = response.data
      })
    },
    matclick(idx , id , name){
      if(!this.materialspen[idx]){
        this.materialspen[idx] = []
      }
      this.materialspen[idx].push({id: id , name: name})
      this.materialsall[idx] = this.materialsall[idx].filter(item => !(item.id === id));
    },
    matclick2(idx , id , name){
      this.materialsall[idx].push({id: id , name: name})
      this.materialspen[idx] = this.materialspen[idx].filter(item => !(item.id === id));
    },
    async get_pattern(id){
       await axios
      .get(`/patterns/${id}`)
      .then(response => {   
        this.patterns[id] = response.data
      })
    },
    async submitpart () {
      var formdata = new FormData()
      formdata.append('item', this.id)
      formdata.append('name', this.partname)
      var file = document.querySelector('#modelfile').files[0]
      formdata.append('model', file)
      await axios
      .post(`/part` , formdata)
      .then(response => {   
        this.get_parts()
      })
    },
    async submitmaterials (materials , id , idx) {
      var mat = []
      for (var item of materials){
      console.log(mat)
      var formdata = new FormData()
      formdata.append('part', id)
      formdata.append('materials', item.id)
      await axios
      .post(`/itemmaterial` , formdata)
      .then(response => {   
      })
      }
      this.parts.splice(idx , 1)
      if(this.parts.length < 1){
        this.$swal('محصول با موفقیت ثبت شد',
        'به صفحه اصلی باز میگردید',
        'success');
      }
    },
    async submitpatterns (id) {
      var formdata = new FormData()
      if(this.patterntype === 'تصویر'){
        var img = document.getElementById('picfile').files[0]
        formdata.append('texture', img, img.name)
        formdata.append('type', 'pattern')
      }
      if(this.patterntype === 'رنگ'){
        formdata.append('color', '0x' + this.colors.hex.replace("#" , ''))
        formdata.append('type', 'color')
      }
      formdata.append('material', id)
      formdata.append('name', this.patname[id])
      await axios
      .post(`/pattern` , formdata)
      .then(response => {   
        this.get_pattern(id)
      })
    },
    materialscheck() {
      var mat = this.materialspen
      this.materialspen = []
      this.materialspen = mat
      var mat2 = this.materialsall
      this.materialsall = []
      this.materialsall = mat2
      setTimeout(() => {
        this.materialscheck()
      }, 1000);
    },
    tab(id){
    if(id === 'three'){
      if(!this.parts.length){
        alert('no parts')
        return
      }
    }
    if(id === 'four'){
      if(!this.parts.length){
        alert('no materials')
        return
      }
    }
    document.querySelectorAll('.tabs').forEach(item =>{
      item.hidden = false
    })
    document.getElementById(id).hidden = false
  },
  },
  
  data: () => ({
    colors: '#194d33',
    partname : '',
    id: '',
    parts: [],
    materialsall : [],
    materialsalls : [],
    materialspen : [],
    patterns: [],
    materials: [],
    matname:[],
    patname:[],
    shininess:[],
    partid: '',
    name : '',
    patterntype: 'رنگ',
    forumPath: [
      { text: 'Forums', active: true }
    ],
  })
}
</script>
<style>
.roww{
  padding:20px; text-align:center;
  border-bottom: solid .5px #ececec;
}
.roww:hover{
  background: #ececec;
}
</style>
<style src="vue-color-gradient-picker/dist/index.css" lang="css" />