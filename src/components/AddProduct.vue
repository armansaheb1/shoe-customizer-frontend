<template>
  <div style="overflow-y:scroll">
<div class="tabs" id="one">
    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      اضافه کردن محصول
    </h4>
      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col font-weight-bold" style="text-align:center">مشخصات محصول</div>

        </b-card-header>

          <b-card-body class="py-3">
            <label>نام محصول </label>
            <b-input v-model="name" style="text-align:center"></b-input><br>
            <label>دسته بندی محصول </label><br>
            <select  class="form-control" v-model="category">
              <option value="" disabled>دسته بندی را انتخاب کنید</option>
              <option v-for="(item,idx) in cat" v-bind:key="'o' + idx" :value="item.id">{{item.name}}</option>
            </select><br>
            <label>تصویر محصول </label>
            <input id="picfile" class="form-control" type="file"><br>
            <div style="clear:both"></div><br><br>
            <button @click="submitdetails()" style="float:left" class="btn btn-dark">اضافه کردن بخش ها</button>
            
          </b-card-body>
          <hr class="m-0" >
      </b-card>
</div>
<div hidden class="tabs" id="two">

      <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      قسمت های مختلف محصول
    </h4>
    
      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col font-weight-bold" style="text-align:center">مشخصات بخش</div>

        </b-card-header>
        
          <b-card-body class="py-3">
            <label>شناسه محصول </label>
            <b-input readonly v-model="id" style="text-align:center"></b-input><br>
            <form id="addpartform">
            <label>نام قسمت </label>
            <b-input v-model="partname" style="text-align:center"></b-input><br>
            <label> فایل مدل </label>
            <input id="modelfile" class="form-control" type="file"><br>
            <label> فایل نقشه برجستگی </label>
            <input id="bumpfile" class="form-control" type="file"><br>
            <label>پارچه پیش فرض</label>
            <select class="form-control" v-model="defaultpattern">
              <option v-for="(item , idx) in patterns" v-bind:key="idx" :value="item.id">{{item.get_material + ' - ' + item.name}}</option>
            </select><br><br>
            <button type="button" @click="submitpart()" style="float:left" class="btn btn-success">اضافه کردن</button><br><br>
            </form>
          </b-card-body>
          <hr class="m-0" >
          <b-card v-if="true" no-body class="mb-3">
      <b-card-header class="row no-gutters align-items-center">
          <div class="col-12" style="text-align:center">بخش ها</div>
        </b-card-header>
        <b-card-body class="py-3">
          <div  v-for="(item, idx) in parts" v-bind:key="'i' + idx" class="col-12 roww">{{item.name}}</div>
          <hr>
        </b-card-body>
    </b-card>
      </b-card>
                  <button @click="tab('three')" style="float:left" class="btn btn-dark">تنظیم متریال</button>

</div>
<div hidden class="tabs" id="three">

       <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
     جنس های هر بخش
    </h4>
    <div  v-for="(itemx, idx) in parts" v-bind:key="'p' + idx">

      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col font-weight-bold" style="text-align:center">{{itemx.name}}</div>

        </b-card-header>
        
          <b-card-body class="py-3">
            <label>شناسه قسمت </label>
            <b-input readonly v-model="itemx.id" style="text-align:center"></b-input><br>
            <div style="width:50%; min-height:100px;margin :  3% 25% ; border-radius: 5px ; border-style: solid ; border-color:#cecece ; border-width:.5px ; text-align:center ; max-height: 150px ; overflow:auto">
              <a style="cursor:pointer"  v-for="(itemmmm, index) in materialsall[idx]" v-bind:key="'dssd' + index" @click="matclick(idx , itemmmm.id , itemmmm.name)" >{{itemmmm.name}}<h3></h3></a>
            </div>

            <div style="width:50%; min-height:100px;margin :  3% 25% ; border-radius: 5px ; border-style: solid ; border-color:#cecece ; border-width:.5px ; text-align:center ; max-height: 150px ; overflow:auto">
              <a style="cursor:pointer"  v-for="(itemmmmm, index) in materialspen[idx]" v-bind:key="'dssdscxz' + index"  @click="matclick2(idx , itemmmmm.id , itemmmmm.name)" >{{itemmmmm.name}}<h3></h3></a>
            </div>
            <button @click="submitmaterials(materialspen[idx] , itemx.id , idx)" style="float:left" class="btn btn-dark">اضافه کردن</button>
          </b-card-body>
          <hr class="m-0" >
      </b-card>
    </div>
</div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pages-forums-list',
  metaInfo: {
    title: 'Forum list - Pages'
  },
  mounted(){
    this.materialscheck()
    this.get_materials()
    this.get_patterns()
    this.getcat()
  },
  methods: {
    async getcat(){
      await axios
        .get(`/category`)
        .then(response => {
          this.cat = response.data
        })
    },
    async submitdetails () {
      const formdata = new FormData()
      formdata.append('item', this.id)
      formdata.append('name', this.name)
      formdata.append('cat', this.category)
      var img = document.getElementById('picfile').files[0]
      formdata.append('pic', img, img.name)
      await axios
      .post(`/item` , formdata)
      .then(response => {   
        this.id = response.data.id
        this.tab('two')
      })
    },
    async get_patterns(){
      await axios
      .get(`/pattern`)
      .then(response => {   
        this.patterns = response.data
      })
    },
    async get_parts(){
       await axios
      .get(`/parts/${this.id}`)
      .then(response => {   
        this.parts = response.data
        this.get_materials(response.data.length - 1)
      })
    },
    async get_material(id){
       await axios
      .get(`/materials/${id}`)
      .then(response => {   
        this.materials[id] = response.data
        console.log(this.materials)
      })
    },
    async get_materials(id){
       await axios
      .get(`/material`)
      .then(response => {   
        this.materialsall.push(response.data)
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
      this.$loading(true)
      var formdata = new FormData()
      formdata.append('item', this.id)
      formdata.append('name', this.partname)
      formdata.append('default', this.defaultpattern)
      var file = document.querySelector('#modelfile').files[0]
      formdata.append('model', file)
      var files = document.querySelector('#bumpfile').files[0]
      formdata.append('bumpmap', files)
      alert(this.defaultpattern)

      await axios
      .post(`/part` , formdata)
      .then(response => {   
        this.parts = response.data
        this.partname = ''
        document.querySelector('#addpartform').reset();
        this.$loading(false)
      })
    },
    async submitmaterials (materials , id , idx) {
      var mat = []
      for (var item of materials){
      console.log(mat)
      var formdata = new FormData()
      formdata.append('part', id)
      formdata.append('material', item.id)
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
      item.hidden = true
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
    materialspen : [],
    category: '',
    patterns: [],
    materials: [],
    matname:[],
    defaultpattern: '',
    patname:[],
    patterns : [],
    shininess:[],
    cat:[],
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