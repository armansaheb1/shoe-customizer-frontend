<template>
  <div>
    <h4 class="font-weight-bold py-3 mb-4">
      Texture Categories
    </h4>

    <div class="row">

      <div class="col">
        <b-card no-body>

          <b-card-header class="py-3">
            <router-link to="/admin/texturecatadd" class="btn btn-primary"><i class="ion ion-md-add"></i>&nbsp; Add Category</router-link>&nbsp;
          </b-card-header>

          <div v-for="(item, idx) in cats" v-bind:key="idx">
            <b-card-body>
              <p class="text-muted small">{{item.name}}</p>

                <div  class="task-list-item">
                  <div> <h5> </h5>
                  Repeat : {{item.repeat}}
                  </div>
                  <a v-if="item.bumpmap !== null" :href="`http://127.0.0.1:8000${item.bumpmap}`" target="_blank">
                    <div :style="`width:200px; height:200px ; background: url('http://127.0.0.1:8000${item.bumpmap}'); background-size:300% 300%`"></div>
                  </a>
                  <div v-else style="width:200px; height:200px ; background:grey"></div>
                  
                  
                    <b-dropdown variant="default btn-xs rounded-pill icon-btn borderless md-btn-flat hide-arrow" class="task-list-actions" :right="!isRtlMode">
                      <template slot="button-content"><i class="ion ion-ios-more"></i></template>
                      <b-dropdown-item :to="'/admin/texturecat/' + item.id">Edit</b-dropdown-item>
                      <b-dropdown-item @click="del(item.id)">Remove</b-dropdown-item>
                    </b-dropdown>
                  </div>

            </b-card-body>
            <hr class="m-0" >
          </div>

        </b-card>
      </div>
    </div>

  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/tasks.scss" lang="scss"></style>

<script>
import axios from 'axios'
import draggable from 'vuedraggable/src/vuedraggable'

export default {
  name: 'pages-task-list',
  metaInfo: {
    title: 'Task list - Pages'
  },
  components: {
    draggable
  },
  mounted(){
    this.getcats()
  },
  methods:{
    async getcats(){
      await axios
        .get(`/material`)
        .then(response => {
          this.cats = response.data
        })
    },
    async del(id){
      await axios
        .delete(`/material/${id}`)
        .then(response => {
          this.cats = response.data
          this.getcats()
        })
    }
  },
  data: () => ({
    cats : []
  })
}
</script>
