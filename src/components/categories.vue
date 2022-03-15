<template>
  <div style="overflow-y:auto ; overflow-x:hidden">
    <h4 class="font-weight-bold py-3 mb-4">
      Texture Categories
    </h4>

    <div class="row">

      <div class="col">
        <b-card no-body>

          <b-card-header class="py-3">
            <router-link to="/admin/add-products" class="btn btn-primary"><i class="ion ion-md-add"></i>&nbsp; Add Category</router-link>&nbsp;
          </b-card-header>

          <div v-for="(item, idx) in cats" v-bind:key="idx">
            <b-card-body>
              <p class="text-muted small">{{item.name }}</p>

                <div  class="task-list-item">
                  <div> <h5> </h5>
                 
                  </div>
                  <a :href="item.get_pic" target="_blank">
                    <div :style="`width:200px; height:200px ; background: url('${item.get_pic}'); background-size:100% 100%`"></div>
                  </a>  
                  
                    <b-dropdown variant="default btn-xs rounded-pill icon-btn borderless md-btn-flat hide-arrow" class="task-list-actions" :right="!isRtlMode">
                      <template slot="button-content"><i class="ion ion-ios-more"></i></template>
                      <b-dropdown-item :to="'/admin/products/' + item.id">Edit</b-dropdown-item>
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
        .get(`/items`)
        .then(response => {
          this.cats = response.data
        })
    },
    async del(id){
      await axios
        .delete(`/item/${id}`)
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
