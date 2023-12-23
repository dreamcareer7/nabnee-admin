<template>
  <div>
    <base-header
      class="header pb-0 pt-5 pt-lg-8 d-flex align-items-center bg-success"
      style="min-height: 50px; background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="bg-gradient-default opacity-8" />
      <!-- Header container -->
    </base-header>

    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-xl-12 order-xl-1">
          <card
            shadow
            type="secondary"
          >
            <div
              slot="header"
              class="bg-white border-0"
            >
              <div class="row align-items-center">
                <div class="col-5">
                  <h3 class="mb-0">
                    Edit Blog
                  </h3>
                </div>
                <div class="col-7 text-left" />
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-12">
                      <base-input
                        v-model="blogData.blog_title" alternative="" label="Title" placeholder="Title" input-classes="form-control-alternative"
                      />  
                    </div>
                    <div class="col-lg-12">
                      <base-input
                        v-model="blogData.blog_title_ar" alternative="" label="Title Arabic" placeholder="Title Arabic" input-classes="form-control-alternative"
                      />  
                    </div>
                  </div>  

                  <div class="row mt-3">

                    <div class="col-lg-4">
                      <label class="form-control-label">image</label>
                      <img v-if="blogData.blog_img==''" src="img/noimage.png" alt="Image"
                        class="card-img-top">
                      <img v-if="blogData.blog_img" :src="blogData.blog_img" alt="Image"
                        class="card-img-top">
                      <input type="file" @change="previewImage" accept="image/*">
                    </div>
                  </div>               

                  <div class="row mt-3">
                    <div class="col-lg-12">
                      <label class="form-control-label">Body</label>
                      <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="blogData.blog_body" />  
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-lg-12">
                      <label class="form-control-label">Body Arabic</label>
                      <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="blogData.blog_body_ar" />  
                    </div>
                  </div>
                  <div class="row mt-5">
                    <div class="col-lg-6">
                      <label class="form-control-label">Status</label>
                      <select
                        v-model="blogData.status" aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off" >
                        <option v-for="status in statuses" :key="status.id" :value="status.val" > {{ status.val }} </option> </select>
                    </div>
                    <div class="col-lg-6">
                      <label class="form-control-label">Image upload status</label><br>
                       <progress style="width: 100%; height: 2em;" max="100" :value.prop="uploadPercentage"></progress>
                    </div>
                  </div>

                  <div class="text-center mt-3">
                    <base-button id="updatebtn" type="primary" @click="updatepost()"> Update </base-button>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import { VueEditor } from "vue2-editor";
  export default {
    name: 'AddQuestion',
    components: { VueEditor },
    props:['id'],
    data() {
      return {
        blogData: {created_by:'admin'},
        uploadPercentage: 0,
        message:'',
        auth : {
          headers: { 'Content-Type':'application/json'}
        },
        auth1 : {
          headers: { 'Content-Type':'application/x-www-form-urlencoded'}
        },
        path:'',
         statuses: {
         1: {id: 'pending', val: 'pending'},
         2: {id: 'approved',val: 'approved'}
        }
      }
    },
    mounted () {

      this.path=process.env.VUE_APP_API_ENDPOINT;

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_blog_all',{"details":{"blog_id":this.$route.params.id},"offset" : "0"},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.blogData=response.data.details[0];
        }
      })
    },
    methods: {
    previewImage: function(event) {
            // Reference to the DOM input element
            this.uploadPercentage =0;
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if(input.files[0].size < 5000000){

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
            axios
            .post(process.env.VUE_APP_API_ENDPOINT+'image-upload',fd,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)})
            .then(response => {
              console.log(response);
              this.blogData.blog_img=response.data.imageUrl;
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
      if(file.size < 5000000){

      var formData = new FormData();
      formData.append("image", file);

      axios.post(process.env.VUE_APP_API_ENDPOINT+'image-upload',formData,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)})
        .then(response => {
              console.log(response);
              let url = response.data.imageUrl; // Get url from response
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
    updatepost() {
       const querystring = require('querystring');

    axios
      .post(process.env.VUE_APP_API_ENDPOINT+'update_blog',{blog_id:this.$route.params.id,blog_title:this.blogData.blog_title,blog_body:this.blogData.blog_body,blog_title_ar:this.blogData.blog_title_ar,blog_body_ar:this.blogData.blog_body_ar,blog_img:this.blogData.blog_img,status:this.blogData.status,created_by:'Admin'},this.auth)
      .then(response => {
        console.log(response);
        this.message=response.data.message;
        document.getElementById("updatebtn").classList.remove('btn-primary');
        document.getElementById("updatebtn").classList.add('btn-success');
        document.getElementById("updatebtn").innerHTML="Blog Updated";
        setTimeout(function(){
        document.getElementById("updatebtn").classList.remove('btn-success');
        document.getElementById("updatebtn").classList.add('btn-primary');
        document.getElementById("updatebtn").innerHTML="Update";
        window.location.reload();
      }, 2000);
      })
    }
  },
  };
</script>
<style></style>
