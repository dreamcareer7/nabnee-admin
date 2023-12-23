<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  Country
              </span>

              <!-- all categry table -->
              <div class="row mb-5">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                            Users
                          </h3>
                        </div>
                        <div class="col text-right">
                          <!-- <base-button type="primary" size="sm" @click="openadduser()" icon="fa fa-plus">Add new user</base-button> -->
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <base-table class="table align-items-center table-flush" :class="type === 'dark' ? 'table-dark': ''" :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list" :data="sortArrays(countrydata)">
                        <template slot="columns">
                          <th>S. No.</th>
                          <th>Country Name</th>
                          <th>Code</th>
                          <th>Status</th>
                          <th class="text-right">Action</th>
                        </template>
                        <template slot-scope="{row,index}">
                           <td class="budget">
                              <p style="text-transform: capitalize;">{{index+1}}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;">{{row.country_name}}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;">{{row.code}}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;">{{row.status }}</p>
                            </td>
                            <td class="text-right">
                             <a class="btn btn-sm btn-round btn-success text-white" @click="opencountry(row)"><i class="fa fa-pencil"></i> Edit</a>
                              <base-button type="danger" size="sm" @click="deletecountry(row)" icon="fa fa-pencil">Delete</base-button>
                            </td>
                        </template>
                      </base-table>
                    </div>
                  </div>
                </div>
              </div>
            </tab-pane>
            <tab-pane>
              <span slot="title">
                  Add Country
              </span>

              <!-- all business table -->
              <div class="row">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                      </div>
                    </div>
                    <div class="container">
                      <div class="pb-4">
                        <form @submit.prevent>
                         <div class="">
                          <div class="row">
                            <div class="col-lg-12">
                                <base-input alternative="" label="Country name" placeholder="Country name" input-classes="form-control-alternative" v-model="model.country_name" />
                            </div>
                             <div class="col-lg-12">
                                <base-input alternative="" label="Code" placeholder="Code" input-classes="form-control-alternative" v-model="model.code" />
                            </div>
                            <div class="col-md-12 mb-2">
                              <label class="form-control-label">Status</label>
                                <select
                                  aria-describedby="addon-right addon-left"
                                  addon-left-icon="ni ni-bullet-list-67" v-model="model.status"
                                  class="form-control form-control-alternative"
                                  autocomplete="off"
                                >
                                  <option
                                    value="" >
                                    Select Status
                                  </option>
                                  <option>
                                    approved
                                  </option>
                                  <option>
                                    pending
                                  </option>
                                </select>
                            </div>
                            <div class="col-lg-12">
                              <base-button type="primary" id="saveuserbtn" @click="savecountry()">Save Country</base-button>
                            </div>
                            <!-- business hours end here-->
                          </div>
                         </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tab-pane>
        </div>
      </tabs>
    </div>

    <!-- modal add Category  -->
    <modal :show.sync="editmodal.editcountry">
      <h6 slot="header" class="modal-title" id="modal-title-default">Edit</h6>
      <template>
        <form @submit.prevent>
         <div class="">
          <div class="row">
            <div class="col-lg-12">
                <base-input alternative="" label="Country name" placeholder="Country name" input-classes="form-control-alternative" v-model="editmodal.country_name" />
            </div>
            <div class="col-lg-12">
                <base-input alternative="" label="Code" placeholder="code" input-classes="form-control-alternative" v-model="editmodal.code" />
            </div>
            <div class="col-lg-12">
                 <label class="form-control-label">Status</label>
                  <select
                    aria-describedby="addon-right addon-left"
                    addon-left-icon="ni ni-bullet-list-67" v-model="editmodal.status"
                    class="form-control form-control-alternative"
                    autocomplete="off"
                  >
                    <option
                      value="" >
                      Select Status
                    </option>
                    <option>
                      approved
                    </option>
                    <option>
                      pending
                    </option>
                    <option>
                      disapproved
                    </option>
                  </select>
            </div>
          </div>
         </div>
        </form>
      </template>

      <template slot="footer">
          <base-button type="primary" id="updatebtn" v-on:click="updatecountry()">Update</base-button>
          <base-button type="link" class="ml-auto" @click="editmodal.editcountry = false">Close
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
        countrydata:[],
        auth : { headers: { 'Content-Type':'application/json',
          'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1 : { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},

        model:{
          adduser:false,
          countrt_name:'',
          code:'',
          status :'',
          },
          editmodal:{
            editcountry:false,
            _id:'',
            countrt_name:'',
            code:'',
            status :'',
          }
        }
    },
    mounted () {

      const querystring = require('querystring');
      console.log(this.auth);
      
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_country',{"details" :{},"offset" :"0"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.countrydata=response.data.details;
        }
            
      })
    },
    methods: {
    opencountry: function(tcdata) {
       console.log(tcdata);
       this.editmodal.editcountry = true;
       this.editmodal._id=tcdata._id;
       this.editmodal.country_name=tcdata.country_name;
       this.editmodal.code=tcdata.code;
       this.editmodal.status=tcdata.status;
       console.log(this.editmodal);

    },
    savecountry(){
        const querystring = require('querystring');
         let details={country_name:this.model.country_name,code:this.model.code,status:this.model.status};
         axios.post(process.env.VUE_APP_API_ENDPOINT+'create_country',querystring.stringify(details),this.auth1)
        .then(response => {
          console.log(response);
          document.getElementById("saveuserbtn").classList.remove('btn-primary');
          document.getElementById("saveuserbtn").classList.add('btn-success');
          document.getElementById("saveuserbtn").innerHTML='Loading...';
          setTimeout(function(){
          document.getElementById("saveuserbtn").classList.remove('btn-success');
          document.getElementById("saveuserbtn").classList.add('btn-primary');
          document.getElementById("saveuserbtn").innerHTML="Saved";
          window.location.reload();
        }, 2000);
        })
      },
      
      updatecountry(){
        const querystring = require('querystring');
         let details={id:this.editmodal._id,country_name:this.editmodal.country_name,code:this.editmodal.code,status:this.editmodal.status};
         axios.post(process.env.VUE_APP_API_ENDPOINT+'update_country',querystring.stringify(details),this.auth1)
        .then(response => {
          let _this=this;
          console.log(response);
          document.getElementById("updatebtn").classList.remove('btn-primary');
          document.getElementById("updatebtn").classList.add('btn-success');
          document.getElementById("updatebtn").innerHTML='Loading...';
          setTimeout(function(){
          document.getElementById("updatebtn").classList.remove('btn-success');
          document.getElementById("updatebtn").classList.add('btn-primary');
          document.getElementById("updatebtn").innerHTML="updated";
          _this.editmodal.editcountry =false;
          window.location.reload();
        }, 2000);
        })
      },
    deletecountry(row) {
      console.log(row);
      const querystring = require('querystring');
        swal({
            title: 'Delete this country?',
            text: "This action is not reversible.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_country',querystring.stringify({ id:row._id}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'This country has been deleted.',
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
        return _.orderBy(arrays, 'created_at', 'desc');
    },
    sortbrands(arrays) {
        return _.orderBy(arrays, 'value_en', 'asc');
    },
    


    }
  };
</script>