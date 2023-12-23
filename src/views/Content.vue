<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  Terms of use
              </span>
              <div class="row mb-5">
                <div class="col">
                  <div class="card shadow" :class="''">
                    <div class="card-header border-0" :class="''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="''">
                            Terms & conditions policy content
                          </h3>
                        </div>
                        <div class="col text-right">
                          
                        </div>
                      </div>
                    </div>
                    <div class="card-body border-top">
                      <div class="row">
                        <div class="col-lg-12 mt-2">
                          <vue-editor :editorToolbar="customToolbar" v-model="model.terms_conditions_policy" />
                        </div>
                        <div class="col-lg-12 mt-3">
                          <base-button
                            @click="savecontent()"
                            id="savecontent"
                            type="primary"
                            class="float-center"
                            block
                            size="lg"
                          >
                            <span>Save Terms & Conditions</span>
                          </base-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tab-pane>
            <!-- search Design -->
            <tab-pane>
                <span slot="title">
                    Privacy Policy
                </span>
                <div class="row mb-5">
                  <div class="col">
                    <div class="card shadow" :class="''">
                      <div class="card-header border-0" :class="''">
                        <div class="row align-items-center">
                          <div class="col">
                            <h3 class="mb-0" :class="''">
                              Privacy policy content
                            </h3>
                          </div>
                          <div class="col text-right">
                            
                          </div>
                        </div>
                      </div>
                      <div class="card-body border-top">
                        <div class="row">
                          <div class="col-lg-12 mt-2">
                            <vue-editor :editorToolbar="customToolbar" v-model="model.privacy_policy" />
                          </div>
                          <div class="col-lg-12 mt-3">
                            <base-button
                              @click="savecontent()"
                              id="savecontent"
                              type="primary"
                              class="float-center"
                              block
                              size="lg"
                            >
                              <span>Save Privacy Policy</span>
                            </base-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </tab-pane>
            <tab-pane>
              <span slot="title">
                  Data protection
              </span>
              <div class="row mb-5">
                <div class="col">
                  <div class="card shadow" :class="''">
                    <div class="card-header border-0" :class="''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="''">
                            Data protection content
                          </h3>
                        </div>
                        <div class="col text-right">
                          
                        </div>
                      </div>
                    </div>
                    <div class="card-body border-top">
                      <div class="row">
                        <div class="col-lg-12 mt-2">
                          <vue-editor :editorToolbar="customToolbar" v-model="model.return_refund_policy"/>
                        </div>
                        <div class="col-lg-12 mt-3">
                          <base-button
                            @click="savecontent()"
                            id="savecontent"
                            type="primary"
                            class="float-center"
                            block
                            size="lg"
                          >
                            <span>Save Data Protection</span>
                          </base-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </tab-pane>
        </div>
      </tabs>
    </div>
  </div>
</template>
<script>
  // Charts
  //import * as chartConfigs from '@/components/Charts/config';
  //import LineChart from '@/components/Charts/LineChart';
  //import BarChart from '@/components/Charts/BarChart';

  //import { Tabs } from '@/components';
  //import { BasePagination } from '@/components/Tabs/Tabs';

  // Components
  //import BaseProgress from '@/components/BaseProgress';
  // import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb';
  //import StatsCard from '@/components/Cards/StatsCard';
  //import { required, minLength, between } from 'vuelidate/lib/validators';
  import VueSwal from 'vue-swal';
  import axios from "axios";
  import { VueEditor } from "vue2-editor";

  export default {
    components: {
      // ActivityFeed,
      //Tabs,
      //LineChart,
      //BarChart,
      //BaseProgress,
      //StatsCard,
      VueEditor
      // TaskList,
      // PageVisitsTable,
      // SocialTrafficTable,
      // LightTable,
      // UserList,
      // ProgressTrackList
    },
    data() {
      return {
        addstore: false,
        editstore: false,
        addregion: false,
        editregion: false,
        addarea: false,
        editarea: false,
        datanotfound:false,
        uploadPercentage:0,
        pagepermission:{},
        storeData:[],
        regionData:[],
        areaData:[],
        allregionData :[],
        selectstore:'',
        selectpin:'',
        customToolbar: [[{ header: [false, 1, 2, 3, 4, 5, 6] }],
          ["bold", "italic", "underline", "strike"], // toggled buttons
          [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" }
          ],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          ["link", "image", "video"],
          ["clean"]],
        model:{
          content_id : '',
          page_name : 'homepage',
          hero_title : '',
          hero_description : '',
          hero_banner : '',
          why_us_title : '',
          why_us_description : '',
          image_1_title : '',
          image_2_title : '',
          image_1_subtitle : '',
          image_2_subtitle : '',
          image_1 : '',
          image_2 : '',
          services_title : '',
          services_description : '',
          block_1_title : '',
          block_1_description : '',
          block_1_icon : '',
          block_2_title : '',
          block_2_description : '',
          block_2_icon : '',
          block_3_title : '',
          block_3_description : '',
          block_3_icon : '',
          privacy_policy : '',
          terms_conditions_policy : '',
          return_refund_policy : '',
          created_by : localStorage.getItem('_id'),
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
      // model: {
      //   store_name:{
      //     required
      //   },
      //   store_img:{
      //     required
      //   },
      //   shipping_charge:{
      //     required
      //   },
      // }

    },
    mounted() {
      
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_content',{ "details" :{}},this.auth1)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.model=response.data.details[0];
        }
            
      })
    },
    methods: {

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
              if(type=='hero_banner'){
                this.model.hero_banner=response.data.imageUrl;
                console.log(this.model.hero_banner);
              }if(type=='image_1'){
                this.model.image_1=response.data.imageUrl;
                console.log(this.model.image_1);
              }if(type=='image_2'){
                this.model.image_2=response.data.imageUrl;
                console.log(this.model.image_2);
              }if(type=='block_1_icon'){
                this.model.block_1_icon=response.data.imageUrl;
                console.log(this.model.block_1_icon);
              }if(type=='block_2_icon'){
                this.model.block_2_icon=response.data.imageUrl;
                console.log(this.model.block_2_icon);
              }if(type=='block_3_icon'){
                this.model.block_3_icon=response.data.imageUrl;
                console.log(this.model.block_3_icon);
              }
              //else{
              //   this.storemodal.store_img=response.data.imageUrl;
              //   console.log(this.storemodal.store_img);
              // }
                
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
    savecontent(){
        const querystring = require('querystring');
        if(!this.model.content_id){
           axios.post(process.env.VUE_APP_API_ENDPOINT+'create_content',this.model,this.auth1)
          .then(response => {
            console.log(response);
            this.message=response.data.message;
            document.getElementById("savecontent").classList.remove('btn-primary');
            document.getElementById("savecontent").classList.add('btn-success');
            document.getElementById("savecontent").innerHTML='Updated';
            setTimeout(function(){
            document.getElementById("savecontent").classList.remove('btn-success');
            document.getElementById("savecontent").classList.add('btn-primary');
            document.getElementById("savecontent").innerHTML="Update";
          }, 2000);

            window.location.reload()

          })
        }else{

          axios.post(process.env.VUE_APP_API_ENDPOINT+'update_content',this.model,this.auth1)
          .then(response => {
            console.log(response);
            this.message=response.data.message;
            document.getElementById("savecontent").classList.remove('btn-primary');
            document.getElementById("savecontent").classList.add('btn-success');
            document.getElementById("savecontent").innerHTML='Updated';
            setTimeout(function(){
            document.getElementById("savecontent").classList.remove('btn-success');
            document.getElementById("savecontent").classList.add('btn-primary');
            document.getElementById("savecontent").innerHTML="Update";
          }, 2000);

            window.location.reload()

          })

        }
      },
      updateestore(){
        if(this.$v.editstoremodal.$error===false){
        const querystring = require('querystring');
           axios.post(process.env.VUE_APP_API_ENDPOINT+'update_store_details',querystring.stringify({store_id : this.editstoremodal.store_id,store_name : this.editstoremodal.store_name,store_img:this.editstoremodal.store_img,store_status:this.editstoremodal.store_status,created_by:this.editstoremodal.created_by,shipping_charge:this.editstoremodal.shipping_charge,store_code: this.editstoremodal.store_code}),this.auth)
          .then(response => {
            console.log(response);
            this.message=response.data.message;
            document.getElementById("createstorebtn").classList.remove('btn-primary');
            document.getElementById("createstorebtn").classList.add('btn-success');
            document.getElementById("createstorebtn").innerHTML='Updated';
            setTimeout(function(){
            document.getElementById("createstorebtn").classList.remove('btn-success');
            document.getElementById("createstorebtn").classList.add('btn-primary');
            document.getElementById("createstorebtn").innerHTML="Update";
          }, 2000);

            window.location.reload()

          })
        }
      },
    getstore_name(val){
      const search = this.storeData.find(element => element.store_id === val);
      if(search){
        return search.store_name;
      }
    },
    getfilterdata(){
          localStorage.setItem('selectstore',this.selectstore);
          let details={ "details" :{}};
          if(this.selectstore){
              details.details.region_store=this.selectstore;

            }

          axios
            .post(process.env.VUE_APP_API_ENDPOINT+'read_region',details,this.auth1)
            .then(response => {
              console.log(response);
              if(response.data.details){
              this.regionData=response.data.details;
              }else{
                this.regionData=[];
              }
                  
            })
            let adetails={ "details" :{}};
             if(this.selectstore){
               adetails.details.area_store=this.selectstore;

             }
             if(this.selectpin){
               adetails.details.area_region=this.selectpin;

             }
            axios
            .post(process.env.VUE_APP_API_ENDPOINT+'read_area',adetails,this.auth1)
            .then(response => {
              console.log(response);
              if(response.data.details){
              this.areaData=response.data.details;
              }else{
                this.areaData=[];
              }
                  
            })
         
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
