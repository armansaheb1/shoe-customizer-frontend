<template>
  <div style="overflow-y:scroll">
<div class="tabs" id="one">
    <h4 class="d-flex flex-wrap justify-content-between align-items-center pt-3 mb-4">
      اضافه کردن دسته بندی محصولات
    </h4>
      <b-card no-body class="mb-3">

        <b-card-header class="row no-gutters align-items-center">
          <div class="col font-weight-bold" style="text-align:center">مشخصات محصول</div>

        </b-card-header>

          <b-card-body class="py-3">
            <label>نام دسته بندی </label>
            <b-input v-model="name" style="text-align:center"></b-input><br>
            <div style="clear:both"></div><br><br>
            <button @click="submitdetails()" style="float:left" class="btn btn-dark">اضافه کردن بخش ها</button>
            
          </b-card-body>
          <hr class="m-0" >
      </b-card>
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
  },
  methods: {
    async submitdetails () {
      const formdata = new FormData()
      formdata.append('name', this.name)
      await axios
      .post(`/category` , formdata)
      .then(response => {   
        this.$swal('دسته بندی با موفقیت ثبت شد',
        'به صفحه اصلی باز میگردید',
        'success');
      })
    },
  },
  
  data: () => ({
    colors: '#194d33',
    partname : '',
    id: '',
    parts: [],
    materialsall : [],
    materialspen : [],
    patterns: [],
    materials: [],
    matname:[],
    defaultpattern: '',
    patname:[],
    patterns : [],
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