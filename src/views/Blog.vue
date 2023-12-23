<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  Blogs
              </span>

              <!-- all hacks table -->
              <div class="row mb-5">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <div class="col">
                          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                            Title
                          </h3>
                        </div>
                        <div class="col text-right">
                          <base-button type="primary" size="sm">See all</base-button>
                        </div>
                      </div>
                    </div>
                    <div class="container">
                      <div class="row pb-4">
                        <div class="col-lg-4 mb-2" v-for="(post,index) in postData" >
                          <div>
                            <article class="card mb-2" style="max-width: 20rem;" >
                              <img v-if="post.blog_img==''" src="img/noimage.png" alt="Image"
                                class="card-img-top">
                                <img v-if="post.blog_img" :src="post.blog_img" alt="Image"
                                class="card-img-top">
                              <div class="card-body">
                                <h4 class="card-title">
                                  {{post.blog_title}}
                                </h4>
                                <!-- <p class="card-text" v-html="post.blog_body">
                                </p> --> 
                                <a target="_self" :href="'#/blog/details/'+post.blog_id" class="btn btn-primary" >View</a>
                                <a target="_self" :href="'#/blog/edit/'+post.blog_id" class="btn btn-primary" >Edit</a>
                                <a target="_self" @click="deletepost(post)" class="btn btn-danger text-white" >Delete</a>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="card-footer d-flex justify-content-end"  :class="type === 'dark' ? 'bg-transparent': ''">
                      <base-pagination :total="30"></base-pagination>
                    </div> -->
                  </div>
                </div>
              </div>

            </tab-pane>

            <!-- add caption Category -->
            <tab-pane>
                <span slot="title">
                    <i class="ni ni-calendar-grid-58"></i>
                    Add New
                </span>
                <template>
                  <form @submit.prevent>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-12">
                      <base-input
                        v-model="model.blog_title"
                        alternative=""
                        label="Title"
                        placeholder="Title"
                        input-classes="form-control-alternative"
                      />  
                    </div>
                    <div class="col-lg-12">
                      <base-input
                        v-model="model.blog_title_ar"
                        alternative=""
                        label="Title Arabic"
                        placeholder="Title Arabic"
                        input-classes="form-control-alternative"
                      />  
                    </div>
                 </div>
                  <div class="row mt-3">
                    <div class="col-lg-6">     
                      <div class="file-upload-form">
                        Upload an image file:
                          <div class="row">
                            <div class="col-8">
                              <input 
                              type="file" 
                              accept="image/*"
                              @change="previewImage" 
                              >
                            </div>
                          </div>
                      </div>
                      <div v-if="imageData.length > 0" class="image-preview img-fluid mt-3">
                          <img 
                          class="preview img-fluid shadow rounded  " 
                          :src="imageData"
                          >
                      </div>
                    </div>
                  </div>       

                  <div class="row mt-3">
                    <div class="col-lg-12">
                      <label class="form-control-label">Body</label>
                      <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.blog_body" /> 
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-lg-12">
                      <label class="form-control-label">Body Arabic</label>
                      <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.blog_body_ar" /> 
                    </div>
                  </div>
                  <div class="row mt-5">
                    <div class="col-lg-6">
                      <label class="form-control-label">Status</label>
                      <select
                        v-model="model.status"
                        aria-describedby="addon-right addon-left"
                        class="form-control form-control-alternative"
                        autocomplete="off"
                      >
                        <option
                          v-for="status in statuses"
                          :key="status.id"
                          :value="status.val"
                        >
                          {{ status.val }}
                        </option>
                      </select>
                    </div>
                    <div class="col-lg-6">
                      <label class="form-control-label">Image upload status</label><br>
                       <progress style="width: 100%; height: 2em;" max="100" :value.prop="uploadPercentage"></progress>
                    </div>
                  </div>
                  <div class="text-center mt-3">
                    <base-button
                      id="updatebtn"
                      type="primary"
                      @click="saveblog()"
                    >
                      Save
                    </base-button>
                  </div>
                </div>
              </form>
                </template>
            </tab-pane>
        </div>
      </tabs>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { VueEditor } from "vue2-editor";
  import VueSwal from 'vue-swal';
  export default {
    name: 'tables',
    components: { VueEditor },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        postData: [],
        uploadPercentage: 0,
        auth : { headers: { 'Content-Type':'application/json',
          'Authorization':'ExamInsta#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1 : { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'ExamInsta#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        imageData: "" ,
        model:{ blog_title:'',
                blog_title_ar:'',
                blog_body:'',
                blog_body_ar:'',
                blog_img:'',
                status:'approved',
                created_by:'Admin'
              },
         statuses: {
         1: {id: 'pending', val: 'pending'},
         2: {id: 'approved',val: 'approved'}
        },
        message:'',
        selectedimage:''
      }
    },
    mounted () {

      const querystring = require('querystring');
      this.path=process.env.VUE_APP_API_ENDPOINT;
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_blog_all',{"details":{},"offset" : "0"},this.auth)
      .then(response => {
        console.log(response);
        this.postData=response.data.details;
      })

      
      // axios
      // .post('https://api.captionplus.app/get_captions_submitted_admin',querystring.stringify({status:'pending',offset:'0', limit:'50'}),this.auth)
      // .then(response => {
      //   console.log(response);
      //   if(response.data.caption_data){
      //   this.usercaptionData=response.data.caption_data;
      //   }
            
      // })
    },
    methods: {

    previewImage: function(event) {
            this.uploadPercentage =0;
            console.log(event.target);
            // Reference to the DOM input element
            var input = event.target;
            console.log(input.files[0].size);
            if(input.files[0].size < 5000000){
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.imageData = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);

                this.selectedimage=input.files[0];
            }

            const fd= new FormData();
            fd.append('image',this.selectedimage,this.selectedimage.name);
            axios.post(process.env.VUE_APP_API_ENDPOINT+'image-upload',fd,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)})
            .then(response => {
              console.log(response);
              this.model.blog_img=response.data.imageUrl;
            })

          }else{

            swal({
              title:'File to large!',
              text: 'Your file is larger than 5 MB. Please upload images which are less than 5 MB.',
              icon:'warning',
             }).then((result) => {
               
            })

          }

    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      this.uploadPercentage =0;

      console.log(file.size)
      if(file.size < 5000000){
      var formData = new FormData();
      formData.append("image", file);

      axios.post(process.env.VUE_APP_API_ENDPOINT+'image-upload',formData,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)})
        .then(response => {
              console.log(response);
              let url =response.data.imageUrl; // Get url from response
              Editor.insertEmbed(cursorLocation, "image", url);
              resetUploader();
            }).catch(err => {
          console.log(err);
           });
       }else{

         swal({
              title:'File to large!',
              text: 'Your file is larger than 5 MB. Please upload images which are less than 5 MB.',
              icon:'warning',
             }).then((result) => {
               
            })

          }
        
    },
    saveblog() {
      const querystring = require('querystring');
       console.log(this.model);
       axios.post(process.env.VUE_APP_API_ENDPOINT+'create_blog',{blog_title:this.model.blog_title,blog_body:this.model.blog_body,blog_title_ar:this.model.blog_title_ar,blog_body_ar:this.model.blog_body_ar,blog_img:this.model.blog_img,status:this.model.status,created_by:this.model.created_by},this.auth)
      .then(response => {
        console.log(response);
        this.message=response.data.message;
        document.getElementById("updatebtn").classList.remove('btn-primary');
        document.getElementById("updatebtn").classList.add('btn-success');
        document.getElementById("updatebtn").innerHTML='Blog Saved';
        setTimeout(function(){
        document.getElementById("updatebtn").classList.remove('btn-success');
        document.getElementById("updatebtn").classList.add('btn-primary');
        document.getElementById("updatebtn").innerHTML="Save";
        window.location.reload()
      }, 2000);
      })

    },
    deletepost(row) {
      console.log(row);
      const querystring = require('querystring');
        swal({
            title: 'Delete this item?',
            text: "This action is not reversible.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_blog',querystring.stringify({blog_id:row.blog_id,created_by:row.created_by}),this.auth1)
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
  },
  };
</script>