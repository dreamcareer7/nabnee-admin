<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  All Materials
              </span>

              <!-- all categry table -->
              <div class="row mb-5">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                            Materials
                          </h3>
                        </div>
                        <div class="col text-right">
                          <!-- <base-button type="primary" size="sm" @click="openadduser()" icon="fa fa-plus">Add new user</base-button> -->
                        </div>
                      </div>
                    </div>
                    <div class="table-responsive">
                      <base-table class="table align-items-center table-flush" :class="type === 'dark' ? 'table-dark': ''" :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'" tbody-classes="list" :data="sortArrays(materialdata)">
                        <template slot="columns">
                          <th>S. No.</th>
                          <th>Material Name(English)</th>
                          <th>Material Name(Arabic)</th>
                          <th>Type</th>
                          <th>Picture</th>
                          <th>Status</th>
                          <th class="text-right">Action</th>
                        </template>
                        <template slot-scope="{row,index}">
                           <td class="budget">
                              <p style="text-transform: capitalize;">{{index+1}}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;">{{row.item_name}}</p>
                            </td>
                             <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;">{{row.item_name_ar}}</p>
                            </td>
                            <td class="budget">
                              <p class="mb-0" style="text-transform: capitalize;">{{row.type}} ({{row.type_ar}})</p>
                            </td>
                            <td class="budget">
                              <img :src="row.item_image" class="avatar" style="height: 60px;width: 60px;">
                            </td>
                            <td class="budget">
                              <span v-if="row.status=='disapproved'" class="badge badge-dot mr-4 badge-danger">
                                <i class="bg-danger"></i>
                                <span class="status">{{row.status}}</span>
                              </span>
                              <span v-if="row.status=='approved'" class="badge badge-dot mr-4 badge-success">
                                <i class="bg-success"></i>
                                <span class="status">{{row.status}}</span>
                              </span>
                            </td>
                            <td class="text-right">
                             <a class="btn btn-sm btn-round btn-success text-white" @click="openmaterial(row)"><i class="fa fa-pencil"></i> Edit</a>
                              <base-button type="danger" size="sm" @click="deletematerial(row)" icon="fa fa-pencil">Delete</base-button>
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
                  Add Material
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
                                <base-input alternative="" label="Material name" placeholder="Material name" input-classes="form-control-alternative" v-model="model.item_name" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Material arabic name" placeholder="Material arabic name" input-classes="form-control-alternative" v-model="model.item_name_ar" />
                            </div>
                             <div class="col-lg-12">
                                <label class="form-control-label">Material Image</label>
                                <input
                                  type="file"
                                  ref="file1"
                                  accept="image/*" 
                                  placeholder="Material Image"
                                  class="form-control form-control-alternative"
                                  multiple="multiple"
                                  @change="addhadleimage($event,'add','file')"

                                />
                                <base-progress type="success" :value="uploadPercentage" label="Image uploaded"></base-progress>
                                <img v-if="model.item_image" :src="model.item_image" class="img-fluid">
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Material type" placeholder="Material type" input-classes="form-control-alternative" v-model="model.type" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Material type Arabic" placeholder="Material type Arabic" input-classes="form-control-alternative" v-model="model.type_ar" />
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
                              <base-button type="primary" id="saveuserbtn" @click="savematerial()">Save Material</base-button>
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
                <base-input alternative="" label="Material name" placeholder="Material name" input-classes="form-control-alternative" v-model="editmodal.item_name" />
            </div>
            <div class="col-lg-12">
                <base-input alternative="" label="Material arabic name" placeholder="Material name" input-classes="form-control-alternative" v-model="editmodal.item_name_ar" />
            </div>
            <div class="col-lg-12">
                <label class="form-control-label">Material Image</label>
                <input
                  type="file"
                  ref="file2"
                  accept="image/*" 
                  placeholder="Material Image"
                  class="form-control form-control-alternative"
                  multiple="multiple"
                  @change="edithadleimage($event,'add','file')"

                />
                <base-progress type="success" :value="uploadPercentage" label="Image uploaded"></base-progress>
                 <img v-if="editmodal.item_image" :src="editmodal.item_image" class="img-fluid">
            </div>
            <div class="col-lg-12">
                <base-input alternative="" label="Material type" placeholder="Material type" input-classes="form-control-alternative" v-model="editmodal.type" />
            </div>
            <div class="col-lg-12">
                <base-input alternative="" label="Material type Arabic" placeholder="Material type Arabic" input-classes="form-control-alternative" v-model="editmodal.type_ar" />
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
          <base-button type="primary" id="updatebtn" v-on:click="updatematerial()">Update</base-button>
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
        materialdata:[],
        uploadPercentage:0,
        auth : { headers: { 'Content-Type':'application/json',
          'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1 : { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},

        model:{
          adduser:false,
          item_name:'',
          item_image:'',
          item_name_ar:'',
          type:'',
          type_ar:'',
          quantity:'',
          unit:'',
          created_by:'Admin',
          status:'approved'
          },
          editmodal:{
            editcountry:false,
            item_id:'',
            item_name:'',
            item_image:'',
            item_name_ar:'',
            type:'',
            type_ar:'',
            quantity:'',
            unit:'',
            created_by:'Admin',
            status:'approved'
          }
        }
    },
    mounted () {

      const querystring = require('querystring');
      console.log(this.auth);
      
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_materiallist',{"details" :{},"offset" :"0"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.materialdata=response.data.details;
        }
            
      })
    },
    methods: {
    openmaterial: function(tcdata) {
       console.log(tcdata);
       this.editmodal.editcountry = true;
       this.editmodal.item_id=tcdata.item_id;
       this.editmodal.item_name=tcdata.item_name;
       this.editmodal.type=tcdata.type;
       this.editmodal.item_image=tcdata.item_image;
       this.editmodal.status=tcdata.status;
       console.log(this.editmodal);

    },
    savematerial(){
        const querystring = require('querystring');
         let details={item_name:this.model.item_name,item_image:this.model.item_image,item_name_ar:this.model.item_name_ar,type:this.model.type,type_ar:this.model.type_ar,created_by:this.model.created_by,quantity:this.model.quantity,status:this.model.status};
         axios.post(process.env.VUE_APP_API_ENDPOINT+'create_materiallist',querystring.stringify(details),this.auth1)
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
      
      updatematerial(){
        const querystring = require('querystring');
         let details={item_id:this.editmodal.item_id,item_name:this.editmodal.item_name,item_image:this.editmodal.item_image,item_name_ar:this.editmodal.item_name_ar,type:this.editmodal.type,type_ar:this.editmodal.type_ar,created_by:this.editmodal.created_by,quantity:this.editmodal.quantity,status:this.editmodal.status};
         axios.post(process.env.VUE_APP_API_ENDPOINT+'update_materiallist',querystring.stringify(details),this.auth1)
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
    deletematerial(row) {
      console.log(row);
      const querystring = require('querystring');
        swal({
            title: 'Delete this material?',
            text: "This action is not reversible.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_materiallist',querystring.stringify({ item_id:row.item_id}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'This material has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result)
              window.location.reload()
            })
            })
           }
        });
      },
      async addhadleimage(event,type,uploatype) {
            // Reference to the DOM input element
            console.log(event);
            console.log(type);
            console.log(this.$refs.file1.files);

            
            this.uploadPercentage=0;
            if(uploatype=='file'){
              for( var i = 0; i < this.$refs.file1.files.length; i++ ){
                  let file = this.$refs.file1.files[i];
                  console.log(file);
                  await this.upload(file,type);
                  
                  
              }
            }

    },
     async edithadleimage(event,type,uploatype) {
            // Reference to the DOM input element
            console.log(event);
            console.log(type);
            console.log(this.$refs.file2.files);
            this.uploadPercentage=0;
            if(uploatype=='file'){
              for( var i = 0; i < this.$refs.file2.files.length; i++ ){
                  let file = this.$refs.file2.files[i];
                  console.log(file);
                  await this.upload(file,'edit');
                  
                  
              }
            }

    },
    upload(file,type){
      console.log(file);
      console.log(file);
      let fd = new FormData();
      fd.append('image',file,file.name);
      axios.post(process.env.VUE_APP_API_ENDPOINT+'image-upload',fd,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)}).then(response => {
        // console.log(response);
        //this.imagearr.push(response.data.imageUrl);
        //this.editimagearr=this.modals.item_img;
        //this.editimagearr.push(response.data.imageUrl);
        // console.log(this.imagearr);
        if(type=='add'){
          this.model.item_image=response.data.imageUrl;
          console.log(this.model.item_image);
          //document.getElementById('addimage').value= null;
        }else{
          this.editmodal.item_image=response.data.imageUrl;
          console.log(this.editmodal.item_image);
          //document.getElementById('editimage').value= null;
        }
        
     })

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