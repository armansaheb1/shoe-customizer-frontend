<template>
  <div style="overflow-y:auto ; overflow-x:hidden">
    <h4 class="font-weight-bold py-3 mb-4">
      Texture Categories
    </h4>

    <div class="row">

      <div class="col">
            <table class="table table-dark">
              <thead>
                <tr>
                  <th style="text-align:center" class="text-muted small col-3">شماره سفارش</th>
                  <th style="text-align:center" class="text-muted small col-3">نوع سفارش</th>
                  <th style="text-align:center" class="text-muted small col-3">زمان ثبت</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in cats" v-bind:key="idx">
                  <td style="text-align:center">
                    <router-link style="color:white" :to="`/admin/orderproduct/${item.uid}`">
                      {{item.uid}}
                    </router-link>
                  </td>
                  <td style="text-align:center">
                    <router-link style="color:white" :to="`/admin/orderproduct/${item.uid}`">
                      {{item.get_item}}
                    </router-link>
                  </td>
                  <td style="text-align:center">
                    <router-link style="color:white" :to="`/admin/orderproduct/${item.uid}`">
                      {{item.get_age}}
                    </router-link>
                  </td>
                  
                </tr>
              </tbody>
            </table>
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
        .get(`/orders`)
        .then(response => {
          this.cats = response.data
        })
    },
  },
  data: () => ({
    cats : []
  })
}
</script>
