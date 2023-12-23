<template>
  <div>
    <base-header
      class="header pb-0 pt-5 pt-lg-8 d-flex align-items-center bg-success"
      style="min-height: 50px; background-size: cover; background-position: center top;"
    >
      <span class="bg-gradient-default opacity-8" />
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
                    Post Details
                  </h3>
                </div>
                <div class="col-7 text-left" />
              </div>
            </div>
            <template>
              <div class="pl-lg-12">
                <div class="row">
                  <div class="col-lg-6 mb-2">
                    <h3 class="mb-3">English Version</h3>
                    <div>
                      <article class="card mb-2">
                        <img v-if="blogData.blog_img==''" src="img/noimage.png" alt="Image"
                          class="card-img-top">
                        <img v-if="blogData.blog_img" :src="blogData.blog_img" alt="Image"
                          class="card-img-top">
                        <div class="card-body">
                          <h4 class="card-title">
                            {{blogData.blog_title}}
                          </h4>
                          <p class="card-text blog_text_body" v-html="blogData.blog_body" >
                          </p> 
                          <!-- <a target="_self" href="#/posts/details/1" class="btn btn-primary">View</a>
                                            <a target="_self" href="#/posts/edit/1" class="btn btn-primary">Edit</a> -->
                        </div><!----><!---->
                      </article>
                    </div>
                  </div>
                  <!-- arabic blog view -->
                  <div class="col-lg-6 mb-2">
                    <h3 class="mb-3">Arabic Version</h3>
                    <div>
                      <article class="card mb-2">
                        <img v-if="blogData.blog_img==''" src="img/noimage.png" alt="Image"
                          class="card-img-top">
                        <img v-if="blogData.blog_img" :src="path+''+blogData.blog_img" alt="Image"
                          class="card-img-top">
                        <div class="card-body">
                          <h4 class="card-title" style="direction: rtl;text-align: right;">
                            {{blogData.blog_title_ar}}
                          </h4>
                          <span class="card-text blog_text_body_ar blog_text_body" v-html="blogData.blog_body_ar" style="direction: rtl;">
                          </span>
                          <!-- <a target="_self" href="#/posts/details/1" class="btn btn-primary">View</a>
                                            <a target="_self" href="#/posts/edit/1" class="btn btn-primary">Edit</a> -->
                        </div><!----><!---->
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    name: 'Add Question',
     components: {
    },
    props:['id'],
    data() {
      return {
        
        blogData: [],
        auth : {
          headers: { 'Content-Type':'application/json'}
        },
         statuses: {
         1: {id: 'pending', val: 'pending'},
         2: {id: 'approved',val: 'approved'}
        },
        model: {option_type:'text'},
        message:'',
        options:'',
        path:'',
        test_type:[{nature:'',amount:''}]
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
    
  },
  };
</script>
<style>
  .blog_text_body img {
    max-width: 100%;
  }
  .blog_text_body_ar p {
    text-align: right;
    direction: rtl;
  }
</style>
