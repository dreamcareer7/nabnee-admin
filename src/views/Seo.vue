<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col">
          <div class="card shadow mb-3" :class="''">
            <div class="p-3 border-0" :class="''">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0" :class="''">
                    Pages Meta Details
                  </h3>
                </div>
                <div class="col text-right">
                  <base-button type="primary" @click="addmetapopup"><i class="fas fa-plus"></i> Add new page meta</base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 mb-3" v-for="meta, index in metaData" :key="meta.metadata_id">
          <!-- Basic with list group -->
          <div class="card shadow">
            <!-- Card image -->
            <img alt="Image placeholder" class="card-img-top" v-if="meta.og_image" :src="meta.og_image" width="100">
            <!-- List group -->
            <ul class="list-group list-group-flush">
              <li class="list-group-item small">Page name: {{meta.page_name}}</li>
              <li class="list-group-item small">Page URL: {{meta.page_url}}</li>
              <li class="list-group-item small">Meta title: {{meta.meta_title}}</li>
              <li class="list-group-item small">Meta description: {{meta.meta_description}}</li>
              <li class="list-group-item small">OG type name: {{meta.og_type}}</li>
            </ul>
            <!-- Card body -->
            <div class="card-body p-3">
              <h3 class="card-title mb-3 small">OG title: {{meta.og_title}}</h3>
              <p class="card-text mb-4">OG description: {{meta.og_description}}</p>
              <base-button type="primary" size="sm" @click="editmetapopup(meta)" >Edit</base-button>
              <base-button type="danger" size="sm" @click="deletemeta(meta)">Delete</base-button>
            </div>
          </div>
        </div>

        <!-- shimmer starts here -->
        <div class="col-md-12" v-if="metaData.length==0 && !datanotfound">
          <div class="row justify-content-center">
            <div class="col-lg-12 mt-3">
                <div class="card border-0 shadow">
                   <div class="card-body pt-2 pb-1">
                        <div class="row">
                            <div class="col-md-3 col-3 mt-1 mb-1">
                                <span class="circle-shimmer shine"></span>
                            </div>
                            <div class="col-md-9 col-9 mt-1 mb-1">
                                <div class="div-shimmer w-100 mt-0 pr-4">
                                  <span class="line-shimmer w-100 shine"></span>
                                  <span class="line-shimmer w-100 shine"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="card border-0 shadow">
                   <div class="card-body pt-2 pb-1">
                        <div class="row">
                            <div class="col-md-3 col-3 mt-1 mb-1">
                                <span class="circle-shimmer shine"></span>
                            </div>
                            <div class="col-md-9 col-9 mt-1 mb-1">
                                <div class="div-shimmer w-100 mt-0 pr-4">
                                  <span class="line-shimmer w-100 shine"></span>
                                  <span class="line-shimmer w-100 shine"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="card border-0 shadow">
                   <div class="card-body pt-2 pb-1">
                        <div class="row">
                            <div class="col-md-3 col-3 mt-1 mb-1">
                                <span class="circle-shimmer shine"></span>
                            </div>
                            <div class="col-md-9 col-9 mt-1 mb-1">
                                <div class="div-shimmer w-100 mt-0 pr-4">
                                  <span class="line-shimmer w-100 shine"></span>
                                  <span class="line-shimmer w-100 shine"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="card border-0 shadow">
                   <div class="card-body pt-2 pb-1">
                        <div class="row">
                            <div class="col-md-3 col-3 mt-1 mb-1">
                                <span class="circle-shimmer shine"></span>
                            </div>
                            <div class="col-md-9 col-9 mt-1 mb-1">
                                <div class="div-shimmer w-100 mt-0 pr-4">
                                  <span class="line-shimmer w-100 shine"></span>
                                  <span class="line-shimmer w-100 shine"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <!-- shimmer ends here -->
        <!-- no result found -->
        <div class="col-md-12">
          <div class="card-footer justify-content-center shadow" id="noresult" v-if="datanotfound">
            <div class="col-md-3 mx-auto mt-4 text-center">
                <img src="img/dashboard_no_item.jpg" class="img-fluid">
                <p class="mt-4">No meta deta found.</p>
                <base-button type="primary" outline @click="addmetapopup"><i class="fas fa-plus"></i> Add page meta</base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- create meta popup -->
    <modal :show.sync="addmeta" size="lg">
      <p
        id="modal-title-default"
        slot="header"
        class="modal-title"
      >
        <span>Create new meta</span>
      </p>
      <template>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-6">
              <base-input label="Page name" placeholder="Page name" v-model="metamodal.page_name" input-classes="" />
            </div>
            <div class="col-md-6">
              <base-input label="Page URL" placeholder="e.g, /about" v-model="metamodal.page_url" input-classes="" />
            </div>
            <div class="col-md-6">
              <base-input label="Meta Title" placeholder="e.g, Weight, Size, Pieces etc" v-model="metamodal.meta_title" input-classes="" />
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Meta Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea3" rows="2" v-model="metamodal.meta_description"></textarea>
            </div>
            <div class="col-md-6 meta_tags">
              <label class="form-control-label">Meta Keywords</label>
              <textarea class="form-control" id="exampleFormControlTextarea3" rows="2" v-model="metamodal.meta_keyword"></textarea>
            </div>
            <div class="col-md-6 meta_tags">
              <base-input label="OG Title" placeholder="e.g, Weight, Size, Pieces etc" v-model="metamodal.og_title" input-classes="" />
            </div>
            <div class="col-md-6 meta_tags">
              <base-input label="OG Type" placeholder="e.g, Weight, Size, Pieces etc" v-model="metamodal.og_type" input-classes="" />
            </div>
            <div class="col-md-6 meta_tags">
              <label class="form-control-label">OG Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea3" rows="2" v-model="metamodal.og_description"></textarea>
            </div>
            <div class="col-lg-6 mt-2">
              <label class="form-control-label">OG Image</label>
              <input
                  id="file"
                  ref="myFiles"
                  type="file"
                  aria-describedby="addon-right addon-left"
                  alternative=""
                  class="form-control form-control-alternative"
                  name="img"
                  @change="hadleimage($event,'addmeta')"
                >
                <base-progress type="success" v-model="uploadPercentage" label="File uploaded"></base-progress>
                <div class="position-relative" v-if="metamodal.og_image">
                  <base-button
                    type="danger"
                    size="sm"
                    class="position-absolute btn-icon-only"
                    @click="deleteogimage(metamodal)"
                    style="right: 0px;top: -5px;font-size: x-small;width: 1.3rem; height: 1.3rem;"
                    round
                    >
                    <i class="fas fa-times"></i>
                </base-button>
                  <img :src="metamodal.og_image" style="max-width: 100px" class="img-fluid rounded shadow mt-2 card-body">
                </div>
            </div>
          </div>
        </form>
      </template>

      <template slot="footer">
        <base-button
          @click="createmeta()"
          type="success"
          id="createmetabtn"
          class="float-center"
        >
          <span>Create Meta</span>
        </base-button>
        <base-button
          type="link"
          class="ml-auto"
          @click="addmeta = false"
        >
          <span>Close</span>
        </base-button>
      </template>
    </modal>

    <!-- edit meta popup -->
    <modal :show.sync="editmeta" size="lg">
      <p
        id="modal-title-default"
        slot="header"
        class="modal-title"
      >
        <span>Edit Meta</span>
      </p>
      <template>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-6">
              <base-input label="Page name" placeholder="Page name" v-model="editmetamodal.page_name" input-classes="" />
            </div>
            <div class="col-md-6">
              <base-input label="Page URL" placeholder="e.g, /about" v-model="editmetamodal.page_url" input-classes="" />
            </div>
            <div class="col-md-6">
              <base-input label="Meta Title" placeholder="e.g, Weight, Size, Pieces etc" v-model="editmetamodal.meta_title" input-classes="" />
            </div>
            <div class="col-md-6">
              <label class="form-control-label">Meta Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea3" rows="2" v-model="editmetamodal.meta_description"></textarea>
            </div>
            <div class="col-md-6 meta_tags">
              <label class="form-control-label">Meta Keywords</label>
              <textarea class="form-control" id="exampleFormControlTextarea3" rows="2" v-model="editmetamodal.meta_keyword"></textarea>
            </div>
            <div class="col-md-6 meta_tags">
              <base-input label="OG Title" placeholder="e.g, Weight, Size, Pieces etc" v-model="editmetamodal.og_title" input-classes="" />
            </div>
            <div class="col-md-6 meta_tags">
              <base-input label="OG Type" placeholder="e.g, Weight, Size, Pieces etc" v-model="editmetamodal.og_type" input-classes="" />
            </div>
            <div class="col-md-6 meta_tags">
              <label class="form-control-label">OG Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea3" rows="2" v-model="editmetamodal.og_description"></textarea>
            </div>
            <div class="col-lg-6 mt-2">
              <label class="form-control-label">OG Image</label>
              <input
                  id="file"
                  ref="myFiles"
                  type="file"
                  aria-describedby="addon-right addon-left"
                  alternative=""
                  class="form-control form-control-alternative"
                  name="img"
                  @change="hadleimage($event,'editmeta')"
                >
                <base-progress type="success" v-model="uploadPercentage" label="File uploaded"></base-progress>
                <div class="position-relative" v-if="editmetamodal.og_image">
                  <base-button
                    type="danger"
                    size="sm"
                    class="position-absolute btn-icon-only"
                    @click="deleteogimage(editmetamodal)"
                    style="right: 0px;top: -5px;font-size: x-small;width: 1.3rem; height: 1.3rem;"
                    round
                    >
                    <i class="fas fa-times"></i>
                </base-button>
                  <img :src="editmetamodal.og_image" style="max-width: 100px" class="img-fluid rounded shadow mt-2 card-body">
                </div>
            </div>
          </div>
        </form>
      </template>

      <template slot="footer">
        <base-button
          @click="updateoffer()"
          type="success"
          id="updateestorebtn"
          class="float-center"
        >
          <span>Update Mata</span>
        </base-button>
        <base-button
          type="link"
          class="ml-auto"
          @click="editmeta = false"
        >
          <span>Close</span>
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import axios from "axios";
  import VueSwal from 'vue-swal';
  import _ from 'lodash';
  // Charts
  // import * as chartConfigs from '@/components/Charts/config';
  // import LineChart from '@/components/Charts/LineChart';
  // import BarChart from '@/components/Charts/BarChart';
  import moment from 'moment';
  // import { Tabs } from '@/components';
  // import { BasePagination } from '@/components/Tabs/Tabs';

  // Components
  // import BaseProgress from '@/components/BaseProgress';
  // import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  // import StatsCard from '@/components/Cards/StatsCard';
  import { required, minLength, between } from 'vuelidate/lib/validators';

  export default {
    components: {
      // ActivityFeed,
      // Tabs,
      // LineChart,
      // BarChart,
      // BaseProgress,
      // StatsCard,
      // TaskList,
      // PageVisitsTable,
      // SocialTrafficTable,
      // LightTable,
      // UserList,
      // ProgressTrackList
    },
    data() {
      return {
        addmeta: false,
        datanotfound:false,
        editmeta: false,
        uploadPercentage:0,
        pagepermission:{},
        metaData:[],
        storeData:[],
        regionData:[],
        metamodal:{
          metadata_id:'',
          page_name:'',
          page_url:'',
          metadata_id:'',
          meta_title : '',
          meta_description : '',
          meta_keyword : '',
          og_title : '',
          og_type : '',
          og_image : '',
          og_description : '',
          created_by:localStorage.getItem('_id'),
          status:'approved',
        },
        editmetamodal:{
          metadata_id:'',
          page_name:'',
          page_url:'',
          metadata_id:'',
          meta_title : '',
          meta_description : '',
          meta_keyword : '',
          og_title : '',
          og_type : '',
          og_image : '',
          og_description : '',
          created_by:localStorage.getItem('_id'),
          status:'',
        },
        radios: {
          radio1: 'checked',
          radio2: 'checked'
        },
        auth : {
          headers: { 'Content-Type':'application/x-www-form-urlencoded',
          'Authorization':'caption#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}
        },
        auth1 : { headers: { 'Content-Type':'application/json',
          'Authorization':'caption#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}
        },
      };
    },
    validations: {
      metamodal: {
        offer_code:{
          required
        },
        offer_type:{
          required
        },
        min_amount:{
          required
        },
        expires_on:{
          required
        },
        offer_value:{
          required
        },
      },
      editmetamodal: {
        offer_code:{
          required
        },
        offer_type:{
          required
        },
        min_amount:{
          required
        },
        expires_on:{
          required
        },
        offer_value:{
          required
        },
      },

    },
    mounted() {
      this.pagepermission=JSON.parse(localStorage.getItem(this.$router.currentRoute.path));
      console.log(this.pagepermission);
      const querystring = require('querystring');
      console.log(this.auth);
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_metadata',{ "details" :{}},this.auth1)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.metaData=response.data.details;
        }else{
            this.metaData=[];
            this.datanotfound=true;
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_store',{ "details" :{}},this.auth1)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.storeData=response.data.details;
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_region',{ "details" :{}},this.auth1)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.regionData=response.data.details;
        }
            
      })
    },
    methods: {

      addmetapopup(row){
        console.log(row);
        this.addmeta=true;
      },
      editmetapopup(row){
        this.editmetamodal=row;
        console.log(this.editmetamodal);
        this.editmeta=true;
        // }
      },
      hadleimage: function(event,type) {
            // Reference to the DOM input element
            this.uploadPercentage =0;
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if(input.files[0].size < 5000000){

            const fd= new FormData();
            fd.append('image',input.files[0],input.files[0].name);
            axios
            .post(process.env.VUE_APP_API_ENDPOINT+'image-upload',fd,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)})
            .then(response => {
              console.log(response);
              if(type=='addmeta'){
                this.metamodal.og_image=response.data.imageUrl;
                console.log(this.metamodal.og_image);
              } else if(type=='editmeta'){
                this.editmetamodal.og_image=response.data.imageUrl;
                console.log(this.editmetamodal.og_image);
              }
                
            })

            }else{

            swal({
              title:'File too large!',
              text: 'Your file is larger than 5 MB. Please upload images which are less than 5 MB.',
              icon:'warning',
              }).then((result) => {
               
              })
            }
      },
      createmeta(){
        const querystring = require('querystring');
           axios.post(process.env.VUE_APP_API_ENDPOINT+'create_metadata',querystring.stringify({page_name : this.metamodal.page_name,page_url : this.metamodal.page_url,meta_title : this.metamodal.meta_title,meta_description : this.metamodal.meta_description,meta_keyword : this.metamodal.meta_keyword,og_url : this.metamodal.og_url,og_type : this.metamodal.og_type,og_title : this.metamodal.og_title,og_description:this.metamodal.og_description,og_image:this.metamodal.og_image,status:this.metamodal.status}),this.auth)
          .then(response => {
            console.log(response);
            this.message=response.data.message;
            document.getElementById("createmetabtn").classList.remove('btn-primary');
            document.getElementById("createmetabtn").classList.add('btn-success');
            document.getElementById("createmetabtn").innerHTML='Updated';
            setTimeout(function(){
            document.getElementById("createmetabtn").classList.remove('btn-success');
            document.getElementById("createmetabtn").classList.add('btn-primary');
            document.getElementById("createmetabtn").innerHTML="Update";
          }, 2000);

            window.location.reload()

          })

      },
      updateoffer(){
        const querystring = require('querystring');
        axios.post(process.env.VUE_APP_API_ENDPOINT+'update_metadata',querystring.stringify({metadata_id : this.editmetamodal.metadata_id,page_name : this.editmetamodal.page_name,page_url : this.editmetamodal.page_url,meta_title : this.editmetamodal.meta_title,meta_description : this.editmetamodal.meta_description,meta_keyword : this.editmetamodal.meta_keyword,og_url : this.editmetamodal.og_url,og_type : this.editmetamodal.og_type,og_title : this.editmetamodal.og_title,og_description:this.editmetamodal.og_description,og_image:this.editmetamodal.og_image,status:this.editmetamodal.status}),this.auth)
        .then(response => {
          console.log(response);
          this.message=response.data.message;
          document.getElementById("createmetabtn").classList.remove('btn-primary');
          document.getElementById("createmetabtn").classList.add('btn-success');
          document.getElementById("createmetabtn").innerHTML='Updated';
          setTimeout(function(){
          document.getElementById("createmetabtn").classList.remove('btn-success');
          document.getElementById("createmetabtn").classList.add('btn-primary');
          document.getElementById("createmetabtn").innerHTML="Update";
        }, 2000);
          window.location.reload()
        })
      },
      deletemeta(row) {
        console.log(row);
        const querystring = require('querystring');
          swal({
              title: 'Are you sure?',
              text: "wan't to delete",
              icon: 'warning',
              buttons: {cancel: true,confirm: true}
          }).then((result) => { // <--
            if (result) {
              console.log('result cloud',result)
              axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_metadata',querystring.stringify({metadata_id :row.metadata_id}),this.auth)
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
      format_datetime(value){
        if(value) {
          return moment.utc(new Date(value)).format("LLL")
        }
      },
      change_offer_type(type){
          if(this.metamodal.offer_type=='FlatOnCart' && type=='add'){
            document.getElementById("max_amount").classList.add('d-none');
          }
          if(this.metamodal.offer_type=='PercentageOnCart' && type=='add'){
            document.getElementById("max_amount").classList.remove('d-none');
          }

          if(this.editmetamodal.offer_type=='FlatOnCart' && type=='edit'){
            document.getElementById("edit_max_amount").classList.add('d-none');
          }
          if(this.editmetamodal.offer_type=='PercentageOnCart' && type=='edit'){
            document.getElementById("edit_max_amount").classList.add('d-none');
          }
      },
      deleteogimage(index){
        this.metamodal.og_image='';
        this.uploadPercentage =0;
      },
    },
    
  };
</script>
<style>
  .search-input .form-group {
    display: inline-block;
    margin-bottom: 0px;
  }
</style>
