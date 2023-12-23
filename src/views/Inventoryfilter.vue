<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  Categories
              </span>

              <!-- all categry table -->
              <div class="row mb-5">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                            Inventory Categories
                          </h3>
                        </div>
                        <div class="col text-right">
                          <base-button type="primary" size="sm" @click="openaddcategory()" icon="fa fa-plus">Add new category</base-button>
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <base-table class="table align-items-center table-flush" :class="type === 'dark' ? 'table-dark': ''" :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list" :data="sortArrays(categoryData)">
                        <template slot="columns">
                          <th>Name</th>
                          <th>Name in Arabic</th>
                          <th>Status</th>
                          <th></th>
                        </template>
                        <template slot-scope="{row}">
                            <td class="budget">
                              <p style="text-transform: capitalize;">{{row.inventory_category_name}}</p>
                            </td>
                            
                            <td class="budget">
                              <p style="text-transform: capitalize;">{{row.inventory_category_name_ar}}</p>
                            </td>
                            <td class="budget">
                              <p style="display: block;vertical-align: middle;margin-top: 7px;">{{row.status}}</p>
                            </td>
                            <td class="text-right">
                              <base-button type="primary" size="sm" @click="opencategory(row)" icon="fa fa-pencil">Edit</base-button>
                              <base-button type="danger" size="sm" @click="deletecategory(row)" icon="fa fa-pencil">Delete</base-button>
                              <a type="primary" size="sm" :href="'#/viewcategory/'+row._id+'/'+row.inventory_category_id" icon="fa fa-info">View</a>
                            </td>
                        </template>
                      </base-table>
                    </div>
                  </div>
                </div>
              </div>
            </tab-pane>

            <!-- brands -->
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  Brands
              </span>

              <!-- all Brand table -->
              <div class="row mb-5">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                            All Brands
                          </h3>
                        </div>
                        <div class="col text-right">
                          <base-button type="primary" size="sm" icon="fa fa-plus" @click="openaddbrand()">Add new brand</base-button>



                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <base-table class="table align-items-center table-flush" :class="type === 'dark' ? 'table-dark': ''" :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list" :data="sortbrands(brandData.filter_values)">
                        <template slot="columns">
                          <th>Name</th>
                          <th>Name Arabic</th>
                          <th></th>
                        </template>
                        <template slot-scope="{row}">
                            <td class="budget">
                              <p style="text-transform: capitalize;">{{row.value_en}}</p>
                            </td>
                            <td class="budget">
                              <p style="display: block;vertical-align: middle;margin-top: 7px;">{{row.value_ar}}</p>
                            </td>
                            <td class="text-right">
                              <base-button type="primary" size="sm" @click="openbrand(row)" icon="fa fa-pencil">Edit</base-button>
                              <base-button type="danger" size="sm" @click="deletebrand(row)" icon="fa fa-pencil">Delete</base-button>
                            </td>
                        </template>
                      </base-table>
                    </div>
                  </div>
                </div>
              </div>
            </tab-pane>
        </div>
      </tabs>
    </div>
    <!-- modal add Category  -->
    <modal :show.sync="model.addcategory">
          <h6 slot="header" class="modal-title" id="modal-title-default">Add</h6>
                    <template>
                    <form @submit.prevent>
                     <div class="">
                      <div class="row">
                        <div class="col-lg-12">
                            <base-input alternative="" label="Category Name" placeholder="Category Name" input-classes="form-control-alternative" v-model="model.inventory_category_name" />
                        </div>
                        <div class="col-lg-12">
                            <base-input alternative="" label="Category Name Arabic" placeholder="Category Name Arabic" input-classes="form-control-alternative" v-model="model.inventory_category_name_ar" />
                        </div>
                      </div>
                      <div class="row mt-3 mb-4">
                        <div class="col-lg-12.">
                           <label class="form-control-label">Status</label>
                            <select  v-model="model.status" aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off">
                                <option>approved</option>
                                <option>disapprove</option>
                           </select>
                        </div>
                      </div>
                     </div>
                    </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn" v-on:click="savecategory()">Save changes</base-button>
              <base-button type="link" class="ml-auto" @click="model.addcategory = false">Close
              </base-button>
          </template>
    </modal>
        <!-- modal edit category  -->
    <modal :show.sync="modals.editcategory">
          <h6 slot="header" class="modal-title" id="modal-title-default">Edit</h6>
                    <template>
                    <form @submit.prevent>
                     <div class="">
                      <div class="row">
                        <div class="col-lg-12">
                            <base-input alternative="" label="Category Name" placeholder="Category Name" input-classes="form-control-alternative" v-model="modals.inventory_category_name" />
                        </div>
                        <div class="col-lg-12">
                            <base-input alternative="" label="Category Name Arabic" placeholder="Category Name Arabic" input-classes="form-control-alternative" v-model="modals.inventory_category_name_ar" />
                        </div>
                      </div>
                      <div class="row mt-3 mb-4">
                        <div class="col-lg-12.">
                           <label class="form-control-label">Status</label>
                            <select  v-model="modals.status" aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off">
                                <option>approved</option>
                                <option>disapprove</option>
                           </select>
                        </div>
                      </div>
                     </div>
                    </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn1" v-on:click="updatecategory()">Save changes</base-button>
              <base-button type="link" class="ml-auto" @click="modals.editcategory = false">Close
              </base-button>
          </template>
    </modal>
     <!-- modal add brand  -->
    <modal :show.sync="brandmodel.addbrand">
          <h6 slot="header" class="modal-title" id="modal-title-default">Add</h6>
                    <template>
                    <form @submit.prevent>
                     <div class="">
                      <div class="row">
                        <div class="col-lg-12">
                            <base-input alternative="" label="brand Name" placeholder="brand Name" input-classes="form-control-alternative" v-model="brandmodel.filter_value" />
                        </div>
                        <div class="col-lg-12">
                            <base-input alternative="" label="brand Name Arabic" placeholder="brand Name Arabic" input-classes="form-control-alternative" v-model="brandmodel.filter_value_ar" />
                        </div>
                      </div>
                     </div>
                    </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn3" v-on:click="savebrand()">Save changes</base-button>
              <base-button type="link" class="ml-auto" @click="brandmodel.addbrand = false">Close
              </base-button>
          </template>
    </modal>
        <!-- modal edit brand  -->
    <modal :show.sync="brandmodals.editbrand">
          <h6 slot="header" class="modal-title" id="modal-title-default">Edit</h6>
                    <template>
                    <form @submit.prevent>
                     <div class="">
                      <div class="row">
                        <div class="col-lg-12">
                            <base-input alternative="" label="brand Name" placeholder="brand Name" input-classes="form-control-alternative" v-model="brandmodals.filter_value" />
                        </div>
                        <div class="col-lg-12">
                            <base-input alternative="" label="brand Name Arabic" placeholder="brand Name Arabic" input-classes="form-control-alternative" v-model="brandmodals.filter_value_ar" />
                        </div>
                      </div>
                     </div>
                    </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn4" v-on:click="updatebrand()">Save changes</base-button>
              <base-button type="link" class="ml-auto" @click="brandmodals.editbrand = false">Close
              </base-button>
          </template>
    </modal>
  </div>
</template>

<script>
  import axios from "axios";
  import _ from 'lodash';
  
  export default {
    name: 'tables',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        categoryData:[],
        brandData:[],
        auth : {
          headers: { 'Content-Type':'application/x-www-form-urlencoded',
          'x-api-key':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdHVzZXIiLCJpYXQiOjE1NDk4OTE1ODQsImV4cCI6MTU4MTQyNzU4NH0.LXjF7LPkGplQj6nWnEgmdyK7GNceoiihf4mKoAmQQqc'}
        },
        modals:{
          editcategory:false,
          inventory_category_name:'',
          inventory_category_id:'',
          inventory_category_name_ar:'',
          status:'approved',
          created_by:'Admin'
          },
        model:{
          addcategory:false,
          inventory_category_name:'',
          inventory_category_id:'',
          inventory_category_name_ar:'',
          status:'approved',
          created_by:'Admin'
        },
        brandmodals:{
          editbrand:false,
          filter_value:'',
          filter_value_ar:'',
          filter_id:'',
          optype:'',
          created_by:'Admin'
          },
        brandmodel:{
          addbrand:false,
          filter_value:'',
          filter_value_ar:'',
          filter_id:'',
          optype:'Add',
          created_by:'Admin'
        },
      }
    },
    mounted () {

      const querystring = require('querystring');
      console.log(this.auth);
      
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_category',querystring.stringify({status:'approved',offset:'0', limit:'50'}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.categoryData=response.data.details;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_filter_all',{ "filters" :{ "filter_name":"brand"}})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.brandData=response.data.details[0];
        this.brandmodals.filter_id=this.brandData.filter_id;
        }
            
      })
    },
    methods: {

    opencategory: function(tcdata) {
       console.log(tcdata);
       this.modals.editcategory = true;
       this.modals.inventory_category_id=tcdata.inventory_category_id;
       this.modals.inventory_category_name=tcdata.inventory_category_name;
       this.modals.inventory_category_name_ar=tcdata.inventory_category_name_ar;
       this.modals.status=tcdata.status;
       this.modals.created_by=tcdata.created_by;
       console.log(this.modals);

    },
    openaddcategory: function() {
       this.model.addcategory = true;
    },
    openaddbrand: function() {
       this.brandmodel.addbrand = true;
       this.brandmodel.filter_id=this.brandData.filter_id;
    },
    openbrand: function(tcdata) {
       console.log(tcdata);
       this.brandmodals.editbrand = true;
       this.brandmodals.delete_value=tcdata.value_en;
       this.brandmodals.delete_value_ar=tcdata.value_ar;
       this.brandmodals.filter_value=tcdata.value_en;
       this.brandmodals.filter_value_ar=tcdata.value_ar;
       this.brandmodals.filter_id=this.brandData.filter_id;
       this.brandmodals.optype='Add';
       console.log(this.brandmodals);

    },

    savecategory() {
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'create_inventory_category',querystring.stringify({inventory_category_name : this.model.inventory_category_name,inventory_category_name_ar:this.model.inventory_category_name_ar,status:this.model.status,created_by:this.model.created_by}),this.auth1).then(response => {
          console.log(response);
          this.message=response.data.message;
          document.getElementById("updatebtn").classList.remove('btn-primary');
          document.getElementById("updatebtn").classList.add('btn-success');
          document.getElementById("updatebtn").innerHTML=this.message;
          setTimeout(function(){
          document.getElementById("updatebtn").classList.remove('btn-success');
          document.getElementById("updatebtn").classList.add('btn-primary');
          document.getElementById("updatebtn").innerHTML="Update";
          window.location.reload()
          }, 2000);
        })

    },
    
    updatecategory() {
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory_category',querystring.stringify({inventory_category_id:this.modals.inventory_category_id,inventory_category_name : this.modals.inventory_category_name,inventory_category_name_ar:this.modals.inventory_category_name_ar,status:this.modals.status,created_by:this.modals.created_by}),this.auth1).then(response => {
        console.log(response);
        this.message=response.data.message;
        document.getElementById("updatebtn1").classList.remove('btn-primary');
        document.getElementById("updatebtn1").classList.add('btn-success');
        document.getElementById("updatebtn1").innerHTML=this.message;
        setTimeout(function(){
        document.getElementById("updatebtn1").classList.remove('btn-success');
        document.getElementById("updatebtn1").classList.add('btn-primary');
        document.getElementById("updatebtn1").innerHTML="Update";
        window.location.reload()
      }, 2000);
      })

    },
    deletecategory(row) {
      const querystring = require('querystring');
        swal({
            title: 'Are you sure?',
            text: "wan't to delete",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { 
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_inventory_category/',querystring.stringify({inventory_category_id:row.inventory_category_id,created_by:this.model.created_by}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'Your file has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result)
              window.location.reload()
            })
            })
           }
        });
    },
    savebrand() {
      const querystring = require('querystring');
      console.log(this.brandmodel);
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory_filter',querystring.stringify({filter_id:this.brandmodel.filter_id,filter_value : this.brandmodel.filter_value,filter_value_ar:this.brandmodel.filter_value_ar,optype:this.brandmodel.optype,created_by:this.brandmodel.created_by}),this.auth1).then(response => {
          console.log(response);
          this.message=response.data.message;
          document.getElementById("updatebtn3").classList.remove('btn-primary');
          document.getElementById("updatebtn3").classList.add('btn-success');
          document.getElementById("updatebtn3").innerHTML=this.message;
          setTimeout(function(){
          document.getElementById("updatebtn3").classList.remove('btn-success');
          document.getElementById("updatebtn3").classList.add('btn-primary');
          document.getElementById("updatebtn3").innerHTML="Update";
          window.location.reload()
          }, 2000);
        })

    },
    
    updatebrand() {
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory_filter',querystring.stringify({filter_id:this.brandmodals.filter_id,filter_value : this.brandmodals.delete_value,filter_value_ar:this.brandmodals.delete_value_ar,optype:'Remove',created_by:this.brandmodals.created_by}),this.auth1).then(response => {
        console.log(response);
        this.message=response.data.message;
        axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory_filter',querystring.stringify({filter_id:this.brandmodals.filter_id,filter_value : this.brandmodals.filter_value,filter_value_ar:this.brandmodals.filter_value_ar,optype:this.brandmodals.optype,created_by:this.brandmodals.created_by}),this.auth1).then(response => {
          console.log()
        })
        document.getElementById("updatebtn4").classList.remove('btn-primary');
        document.getElementById("updatebtn4").classList.add('btn-success');
        document.getElementById("updatebtn4").innerHTML=this.message;
        setTimeout(function(){
        document.getElementById("updatebtn4").classList.remove('btn-success');
        document.getElementById("updatebtn4").classList.add('btn-primary');
        document.getElementById("updatebtn4").innerHTML="Update";
        window.location.reload()
      }, 2000);
      })
    },
    deletebrand(row) {
      const querystring = require('querystring');
      console.log(row);

        swal({
            title: 'Are you sure?',
            text: "wan't to delete",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { 
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory_filter/',querystring.stringify({filter_id:this.brandmodals.filter_id,filter_value : row.value_en,filter_value_ar:row.value_ar,optype:'Remove',created_by:this.brandmodals.created_by}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'Your file has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result)
              window.location.reload()
            })
            })
           }
        });
    },
    sortArrays(arrays) {
        return _.orderBy(arrays, 'inventory_category_name', 'asc');
    },
    sortbrands(arrays) {
        return _.orderBy(arrays, 'value_en', 'asc');
    },
    
    }
  };
</script>