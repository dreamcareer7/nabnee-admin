<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <div class="row mb-5">
        <div class="col">
          <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
            <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                    Sub Categories
                  </h3>
                </div>
                <div class="col text-right">
                  <base-button type="primary" @click="openaddsubcategory()" size="sm">Add Subcategory</base-button>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <base-table class="table align-items-center table-flush" :class="type === 'dark' ? 'table-dark': ''" :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list" :data="sortArrays(subcategoryData)">
                <template slot="columns">
                  <th>Name</th>
                  <th>Name In Arabic</th>
                  <th></th>
                </template>
                <template slot-scope="{row}">
                    <td class="budget">
                      <p style="text-transform: capitalize;">{{row.business_subcategory_name}}</p>
                    </td>
                    <td class="budget">
                      <p style="text-transform: capitalize;">{{row.business_subcategory_name_ar}}</p>
                    </td>
                    <td class="text-right">
                      <base-button type="primary" size="sm" @click="opensubcategory(row)" icon="fa fa-pencil">Edit</base-button>
                      <base-button type="danger" size="sm" @click="deletesubcategory(row)" icon="fa fa-trash">Delete</base-button>
                    </td>
                </template>
              </base-table>
            </div>
            <!-- <div class="card-footer d-flex justify-content-end"  :class="type === 'dark' ? 'bg-transparent': ''">
              <base-pagination :total="30"></base-pagination>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <!-- modal edit Caption  -->
    <modal :show.sync="modals.editcategory">
          <h6 slot="header" class="modal-title" id="modal-title-default">Edit</h6>
                    <template>
                    <form @submit.prevent>
                      <div class="row">
                        <div class="col-lg-6">
                            <base-input alternative="" label="Subcategory Name" placeholder="Subcategory Name" input-classes="form-control-alternative" v-model="modals.business_subcategory_name" />
                        </div>
                        <div class="col-lg-6">
                            <base-input alternative="" label="Subcategory Name Arabic" placeholder="Subcategory Name Arabic" input-classes="form-control-alternative" v-model="modals.business_subcategory_name_ar" />
                        </div>
                        <div class="col-lg-6">
                            <base-input alternative="" label="Category Name" placeholder="Category Name" input-classes="form-control-alternative" v-model="modals.business_category_name" readonly="" />
                        </div>
                        <div class="col-lg-6">
                            <base-input alternative="" label="Category Name Arabic" placeholder="Category Name Arabic" input-classes="form-control-alternative" v-model="modals.business_category_name_ar" readonly=""/>
                        </div>
                      </div>
                      <div class="row mt-3 mb-4">
                        <div class="col-lg-6">
                           <label class="form-control-label">Status</label>
                            <select  v-model="modals.status" aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off">
                                <option>approved</option>
                                <option>disapprove</option>
                           </select>
                        </div>
                      </div>
                     </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn1" v-on:click="updatesubcategory()">Save changes</base-button>
              <base-button type="link" class="ml-auto" @click="modals.editcategory = false">Close
              </base-button>
          </template>
    </modal>
    <!-- modal add subcategory  -->
    <modal :show.sync="addmodals.addsubcategory">
          <h6 slot="header" class="modal-title" id="modal-title-default">Add Subcategory</h6>
                    <template>
                    <form @submit.prevent>
                     <div class="">
                      <div class="row">
                        <div class="col-lg-6">
                            <base-input alternative="" label="Subcategory Name" placeholder="Subcategory Name" input-classes="form-control-alternative" v-model="addmodals.business_subcategory_name" />
                        </div>
                        <div class="col-lg-6">
                            <base-input alternative="" label="Subcategory Name Arabic" placeholder="Subcategory Name Arabic" input-classes="form-control-alternative" v-model="addmodals.business_subcategory_name_ar"  />
                        </div>
                        <div class="col-lg-6">
                            <base-input alternative="" label="Category Name" placeholder="Category Name" input-classes="form-control-alternative" v-model="addmodals.business_category_name" readonly=""/>
                        </div>
                        <div class="col-lg-6">
                            <base-input alternative="" label="Category Name Arabic" placeholder="Category Name Arabic" input-classes="form-control-alternative" v-model="addmodals.business_category_name_ar" readonly=""/>
                        </div>
                      </div>
                      <div class="row mt-3 mb-4">
                        <div class="col-lg-6">
                           <label class="form-control-label">Status</label>
                            <select  v-model="addmodals.status" aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off">
                                <option>approved</option>
                                <option>disapprove</option>
                           </select>
                        </div>
                      </div>
                     </div>
                    </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn2" v-on:click="addsubcategory()">Save changes</base-button>
              <base-button type="link" class="ml-auto" @click="addmodals.addsubcategory = false">Close
              </base-button>
          </template>
    </modal>
  </div>
</template>

<script>
  import axios from "axios";
  import _ from 'lodash';
  
  export default {
    name: 'viewCategory',
    props:['id'],
    data() {
      return {
        subcategoryData: [],
        captionData: [],
        captionData1: [],
        type:'',
         auth : {
          headers: { 'Content-Type':'application/x-www-form-urlencoded',
          'x-api-key':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdHVzZXIiLCJpYXQiOjE1NDk4OTE1ODQsImV4cCI6MTU4MTQyNzU4NH0.LXjF7LPkGplQj6nWnEgmdyK7GNceoiihf4mKoAmQQqc'}
        },
        modals:{
          editcategory:false,
          business_subcategory_id:'',
          business_subcategory_name:'',
          business_subcategory_name_ar:'',
          business_category_name:'',
          business_category_name_ar:'',
          business_category_oid:'',
          created_by:'Admin',
          status:'approved'
          },
          addmodals:{
          addsubcategory:false,
          business_subcategory_name:'',
          business_subcategory_name_ar:'',
          business_category_name:'',
          business_category_name_ar:'',
          business_category_oid:this.$route.params.id,
          created_by:'Admin',
          status:'approved'
          },
        status:{
         0: {val: 'approved'},
         1: {val: 'rejected'},
         2: {val: 'pending'},
         3: {val: 'suspended'}
        },
      }
      
    },
    mounted () {
      const querystring = require('querystring');
      axios.post(process.env.VUE_APP_API_ENDPOINT+'read_business_category_admin',{
      "details" : {"_id": this.$route.params.id}},this.auth1)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.categoryData=response.data.details[0];
        console.log(this.categoryData);
        this.addmodals.business_category_name=this.categoryData.business_category_name;
        this.addmodals.business_category_name_ar=this.categoryData.business_category_name_ar;
        this.addmodals.business_category_oid=this.categoryData._id;
        this.modals.business_category_name=this.categoryData.business_category_name;
        this.modals.business_category_name_ar=this.categoryData.business_category_name_ar;
        this.modals.business_category_oid=this.categoryData._id;

        }
            
      })

     axios.post(process.env.VUE_APP_API_ENDPOINT+'read_business_subcategory',querystring.stringify({business_category_oid:this.$route.params.id}),this.auth1)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.subcategoryData=response.data.details;

        }
            
      })
    },
    methods: {
    openaddsubcategory: function() {
       this.addmodals.addsubcategory = true;
       this.addmodals.business_category_oid=this.$route.params.id;
       console.log(this.addmodals);

    },
    opensubcategory: function(tcdata) {
       console.log(tcdata);
       this.modals.editcategory = true;
       this.modals.business_subcategory_id=tcdata.business_subcategory_id;
       this.modals.business_subcategory_name=tcdata.business_subcategory_name;
       this.modals.business_subcategory_name_ar=tcdata.business_subcategory_name_ar;
       this.modals.created_by=tcdata.created_by;
       this.modals.status=tcdata.status;
       console.log(this.modals);

    },
    getsubcategories(event){
      const querystring = require('querystring');
         console.log(event.target.value);
         let cat=event.target.value.split('#');
         console.log(cat);
         this.model.category_name=cat[1];
         this.model.category=cat[0];

         axios
      .post(process.env.VUE_APP_API_ENDPOINT+'subcategories',querystring.stringify({ category_id:cat[0],token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdHVzZXIiLCJpYXQiOjE1NDk4OTE1ODQsImV4cCI6MTU4MTQyNzU4NH0.LXjF7LPkGplQj6nWnEgmdyK7GNceoiihf4mKoAmQQqc' }),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.subcategory_data){
        this.subcategories=response.data.subcategory_data;
        this.model.category_name=response.data.subcategory_data[0].category_name;
        }
            
      })

      },
    updatesubcategory() {
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_business_subcategory',querystring.stringify({business_subcategory_id:this.modals.business_subcategory_id,business_subcategory_name : this.modals.business_subcategory_name,business_subcategory_name_ar:this.modals.business_subcategory_name_ar,business_category_oid:this.modals.business_category_oid,status:this.modals.status,created_by:this.modals.created_by}),this.auth1)
      .then(response => {
        console.log(response);
        this.message=response.data.message;
        document.getElementById("updatebtn1").classList.remove('btn-primary');
        document.getElementById("updatebtn1").classList.add('btn-success');
        document.getElementById("updatebtn1").innerHTML='Updated';
        setTimeout(function(){
        document.getElementById("updatebtn1").classList.remove('btn-success');
        document.getElementById("updatebtn1").classList.add('btn-primary');
        document.getElementById("updatebtn1").innerHTML="Update";
        window.location.reload()
      }, 2000);

      })

    },
    addsubcategory() {
      const querystring = require('querystring');
      console.log(this.addmodals);
       axios.post(process.env.VUE_APP_API_ENDPOINT+'create_business_subcategory',querystring.stringify({business_subcategory_name : this.addmodals.business_subcategory_name,business_subcategory_name_ar:this.addmodals.business_subcategory_name_ar,business_category_oid:this.addmodals.business_category_oid,status:this.addmodals.status,created_by:this.addmodals.created_by}),this.auth1)
      .then(response => {
        console.log(response);
        this.message=response.data.message;
        document.getElementById("updatebtn2").classList.remove('btn-primary');
        document.getElementById("updatebtn2").classList.add('btn-success');
        document.getElementById("updatebtn2").innerHTML='Saved';
        setTimeout(function(){
        document.getElementById("updatebtn2").classList.remove('btn-success');
        document.getElementById("updatebtn2").classList.add('btn-primary');
        document.getElementById("updatebtn2").innerHTML="Save";
        window.location.reload()
      }, 2000);

        //window.location.reload()

      })

    },
    deletesubcategory(row) {
      console.log(row);
      const querystring = require('querystring');
        swal({
            title: 'Are you sure?',
            text: "wan't to delete",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_business_subcategory',querystring.stringify({business_subcategory_id:row.business_subcategory_id,created_by:row.created_by}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'Your item has been deleted.',
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
        return _.orderBy(arrays, 'business_subcategory_name', 'asc');
    },
    

    }
  };
</script>
