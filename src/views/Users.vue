<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  Users
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
                        <!-- <div class="col text-right">
                          <base-button type="primary" size="sm" @click="openadduser()" icon="fa fa-plus">Add new user</base-button>
                        </div> -->
                      </div>
                    </div>
                    <div class="table-responsive">
                      <base-table class="table align-items-center table-flush" :class="type === 'dark' ? 'table-dark': ''" :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list" :data="sortArrays(usersdata)">
                        <template slot="columns">
                          <th>S. No.</th>
                          <th>Profile Picture</th>
                          <th>Name</th>
                          <th>email</th>
                          <th>Date of registration</th>
                          <th>Request limit</th>
                          <th>Request count</th>
                          <th></th>
                          <th class="text-right">Action</th>
                        </template>
                        <template slot-scope="{row,index}">
                           <td class="budget">
                              <p style="text-transform: capitalize;">{{index+1}}</p>
                            </td>
                            <td class="budget">
                              <img class="avatar img-fluid rounded-circle" :src="row.user_dp">
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;">{{row.user_public_name}}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;white-space:normal;">{{row.user_email}}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;white-space: normal;">{{format_date(row.created_at) }}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize; white-space: normal;">
                                <input
                                  v-if="row.editing"
                                  style="width: 30px;"
                                  v-model="row.request_limit"
                                />
                                <span v-else>{{ row.request_limit }}</span>
                                <base-button v-if="row.editing" class="ml-4" type="primary" size="sm" @click="saveUser(row, index)" icon="fa fa-save" />
                                <base-button v-else class="ml-4" type="primary" size="sm" @click="editUser(index)" icon="fa fa-edit" />
                              </p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;white-space: normal;">{{ row.request_count }}</p>
                            </td>
                            <td class="budget">
                              <!-- <router-link to="/smartplanner" data-toggle="tooltip" title="Smart Planner" class="btn btn-neutral btn-icon cursor-pointer" /> -->
                              <base-button type="primary" size="sm" @click="goToProjectPlan(row)">Send Request</base-button>
                            </td>
                            <td class="text-right">
                             <a class="btn btn-sm btn-round btn-success text-white" :href="'mailto:'+row.user_email"><i class="fa fa-envelope"></i> Email</a>
                              <!-- <base-button type="danger" size="sm" @click="deleteuser(row)" icon="fa fa-trash">Delete</base-button> -->
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
    <!-- <modal :show.sync="model.adduser">
      <h6 slot="header" class="modal-title" id="modal-title-default">Add</h6>
      <template>
        <form @submit.prevent>
         <div class="">
          <div class="row">
            <div class="col-lg-12">
                <base-input alternative="" autocomplete="off" label="Email" placeholder="Email" input-classes="form-control-alternative" v-model="model.user_email" />
            </div>
            <div class="col-lg-12">
                <base-input alternative="" autocomplete="off" label="Create Password" placeholder="Create Password" type="password" input-classes="form-control-alternative" v-model="model.user_password" />
            </div>
            <div class="col-lg-12">
                <base-input alternative="" label="Confirm Password" placeholder="Confirm Password" type="password" input-classes="form-control-alternative" v-model="model.cuser_password" />
            </div>
          </div>
         </div>
        </form>
      </template>

      <template slot="footer">
          <base-button type="primary" id="updatebtn" v-on:click="saveuser()">Create Profile</base-button>
          <base-button type="link" class="ml-auto" @click="model.adduser = false">Close</base-button>
      </template>
    </modal> -->
  </div>
</template>

<script>
  import axios from "axios";
  import moment from 'moment';
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
        usersdata: [],
        auth: { headers: { 'Content-Type':'application/json',
          'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1: { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},

        model: {
          adduser: false,
          user_email: '',
          user_password: '',
          cuser_password: '',
        },
      }
    },
    mounted() {
      axios
        .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"details" :{ "user_type":"General"},"offset" :"0"})
        .then(response => {
          console.log(response);
          if (response.data.details){
            this.usersdata = response.data.details.map(item => {
              return { ...item, editing: false };
            });
          }
        });
    },
    methods: {
      goToProjectPlan(row) {
        this.$router.push({ name: 'smartplanner', params: { user_id: row.user_id } });
        sessionStorage.setItem('selected_user__id', row._id);
      },
      editUser(index) {
        this.usersdata[index].editing = true;
      },
      saveUser(row, index) {
        const querystring = require('querystring');
        axios.post(`${process.env.VUE_APP_API_ENDPOINT}update_request_limit`, querystring.stringify({
          user_id: row.user_id,
          request_limit: row.request_limit,
        }), this.auth1);
        this.usersdata[index].editing = false;
      },
      format_date(value){
          if (value) {
            return moment(String(value)).format("dddd, MMMM Do YYYY")
            }
        },
      openadduser: function() {
        this.model.adduser = true;
      },
      opencategory: function(tcdata) {
        console.log(tcdata);
        this.modals.editcategory = true;
        this.modals.business_category_id=tcdata.business_category_id;
        this.modals.business_category_name=tcdata.business_category_name;
        this.modals.business_category_name_ar=tcdata.business_category_name_ar;
        this.modals.status=tcdata.status;
        this.modals.created_by=tcdata.created_by;
        console.log(this.modals);

      },
      openaddcategory: function() {
        this.model.addcategory = true;
      },
      openaddcity: function() {
        this.citymodel.addcity = true;
        this.citymodel.filter_id=this.cityData.filter_id;
      },
      opencity: function(tcdata) {
        console.log(tcdata);
        this.citymodals.editcity = true;
        this.citymodals.delete_value=tcdata.value_en;
        this.citymodals.delete_value_ar=tcdata.value_ar;
        this.citymodals.filter_value=tcdata.value_en;
        this.citymodals.filter_value_ar=tcdata.value_ar;
        this.citymodals.filter_id=this.cityData.filter_id;
        this.citymodals.optype='Add';
        console.log(this.citymodals);
      },
      deleteuser(row) {
        console.log(row);
        const querystring = require('querystring');
        swal({
            title: 'Delete this user?',
            text: "This action is not reversible.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_business',querystring.stringify({ user_email:row.user_email}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'This user has been deleted.',
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