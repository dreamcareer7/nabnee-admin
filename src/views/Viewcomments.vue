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
                    Design Details
                  </h3>
                </div>
                <div class="col-7 text-left" />
              </div>
            </div>
            <template class="bg-white">
              <div class="row" v-if="!deleteitem">
                <div class="col-lg-4">
                  <article class="card mb-2" >
                    <div class="design-image-inner">
                      <img v-if="design.item_img==''" src="img/noimage.png" alt="Image"
                        class="card-img-top">
                        <img v-if="design.item_img" :src="design.item_img[0]" alt="Image"
                        class="card-img-top">
                    </div>
                    <div class="card-body">
                      <h4 class="card-title mb-2">
                        {{design.item_name}} <span v-if="design.item_name_ar" >({{design.item_name_ar}})</span>
                      </h4>
                      <p class="mb-3" v-if="design.item_description">
                        <span style="font-weight: bold;">Description: </span> {{design.item_description}}
                      </p>
                      <p class="mb-3" v-if="design.item_description_ar">
                        <span style="font-weight: bold;">Description Arabic: </span> {{design.item_description_ar}}
                      </p>
                      <p v-if="design.item_category">
                        <span style="font-weight: bold;">Category: </span>{{design.item_category.inventory_category_name}}
                      </p>
                      <p v-if="design.item_category">
                        <span style="font-weight: bold;">Category Arabic: </span>{{design.item_category.inventory_category_name_ar}}
                      </p>
                      <p v-if="design.item_subcategory">
                        <span style="font-weight: bold;">Sub-category: </span>{{design.item_subcategory.inventory_subcategory_name}}
                      </p>
                      <p v-if="design.item_subcategory">
                        <span style="font-weight: bold;">Sub-category Arabic: </span>{{design.item_subcategory.inventory_subcategory_name_ar}}
                      </p>
                      <div class="row mt-3 m-0 inventory_creator">
                        <div class="col-md-3 pr-1">
                          <img class="mt-0 img-fluid rounded-circle" :src="design.created_by.logo">
                        </div>
                        <div class="col-md-9">
                          <p class="mb-0">{{design.created_by.business_name_english}}</p>
                          <p class="mb-0">@<span style="font-weight: bold;">{{design.created_by.user_name}}</span></p>
                        </div>
                      </div>
                      <!-- Page Content -->
                      <div class="mt-4">
                        <div class="row text-center text-lg-left">
                          <div class="col-lg-4 col-md-4 col-6" v-for="(image,index) in design.item_img">
                            <a @click="openimage(image)" class="d-block mb-4 h-100">
                                  <img class="img-fluid img-thumbnail" :src="image" alt="" >
                            </a>
                          </div>
                        </div>

                      </div>
                      <!-- /.container -->
                      <hr>
                      <base-button class="mt-3" type="danger" size="sm" @click="deleteDesign(design)" icon="fa fa-trash">Delete</base-button>
                    </div>
                  </article>
                </div>
                <div class="col-8" v-if="!deleteitem">
                  <div class="row mb-4">
                      <div class="col-xl-4 col-lg-6 px-1">
                          <stats-card title="Likes"
                                      type="gradient-red"
                                      :sub-title="' '+design.item_likes+' '"
                                      icon="fa fa-thumbs-up"
                                      class="mb-4 mb-xl-0"
                          >
                          </stats-card>
                      </div>
                      <div class="col-xl-4 col-lg-6 px-1">
                          <stats-card title="Comments"
                                      type="gradient-orange"
                                      :sub-title="' '+design.item_comments.length+' '"
                                      icon="fa fa-comment"
                                      class="mb-4 mb-xl-0"
                          >
                          </stats-card>
                      </div>
                      <div class="col-xl-4 col-lg-6 px-1">
                          <stats-card title="Shares"
                                      type="gradient-green"
                                      :sub-title="' '+design.item_shares+' '"
                                      icon="fa fa-share"
                                      class="mb-4 mb-xl-0"
                          >
                          </stats-card>
                      </div>
                      <!-- <div class="col-xl-3 col-lg-6 px-1">
                          <stats-card title="Total Saved"
                                      type="gradient-info"
                                      sub-title="49,65%"
                                      icon="fa fa-bookmark"
                                      class="mb-4 mb-xl-0"
                          >
                          </stats-card>
                      </div> -->
                  </div>
                  <p>Comments</p>
                  <div class="media media-comment" v-for="(comments,index) in design.item_comments">
                    <img alt="Image placeholder" :src="comments.user_dp" class="avatar avatar-lg media-comment-avatar rounded-circle">
                    <div class="media-body">
                      <div class="media-comment-text">
                        <h6 class="h5 mt-0">{{comments.user_public_name}}</h6>
                        <p class="text-sm lh-160">{{comments.comment}}</p>
                        <div class="icon-actions">
                          <base-button type="primary" class="btn-sm btn-danger" icon="fa fa-trash" id="" v-on:click="deletecomment(comments)">Delete Comment</base-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="row" v-if="deleteitem">
                <div class="col-lg-12">
                  <article class="card mb-2" >
                    <center>
                      <div class="col-5">
                        <div class="design-image">
                          <img  src="img/dashboard_no_item.jpg" alt="Image" class="card-img-top">
                        </div>
                         <a href="#/design"><base-button type="primary" size="lg" block class="mb-5 mt-3" icon="fa fa-image">Go Back</base-button></a>
                      </div>
                    </center>
                  </article>
                </div>
            </div>
          </template>
          </card>
        </div>
      </div>
    </div>
      <!-- modal Stats -->
    <modal :show.sync="imageview">
          <h6 slot="header" class="modal-title" id="modal-title-default">Enlarged View</h6>

          
                    <template>
                          <img class="img-fluid img-thumbnail" :src="imagesrc" alt="" >
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn1" @click="imageview = false">Close
              </base-button>
          </template>
    </modal>
  </div>
</template>
<script>
  import axios from "axios";
  import VueSwal from 'vue-swal';
  export default {
    name: 'Add Question',
     components: {
    },
    props:['id'],
    data() {
      return {
        design: [],
        deleteitem:false,
        imageview:false,
        imgsrc:'',
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
        test_type:[{nature:'',amount:''}],
        auth : { headers: { 'Content-Type':'application/json',
          'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1 : { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
      }
    },
    mounted () {
      this.path=process.env.VUE_APP_API_ENDPOINT;
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_by_id',{"item_id":this.$route.params.id},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.design=response.data.details[0];
        }
      })

    },
    methods: {

      openimage(imgsrc){
        this.imageview=true;
        this.imagesrc=imgsrc;

      },

      deletecomment(row) {
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
            axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory_public',{"comment" : { "comment" :row.comment,"comment_by" : row.comment_by,"_id" : row._id},"item_id" : this.$route.params.id,optype : "Remove"},this.auth)
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

    deleteDesign(row) {
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
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_inventory',querystring.stringify({ item_id:row.item_id,created_by:row.created_by._id}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'Your file has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result)
              this.deleteitem=true;
            })
            })
           }
        });
    },
    
  },
  };
</script>
<style>
  .card-body {
    background-color: white;
  }
  .inventory_creator {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 5px;
    background-color: #fafafa;
  }
  .modal-content {
    width: 100%;
  }
  @media (min-width: 576px) {
    .modal-dialog {
        max-width: 500px;
        margin: 1.75rem auto;
        width: auto;
    }
  }
  .card-stats .card-body {
    padding: 1rem 1.5rem;
    background-color: #fafafa;
    border: 1px solid #cccccca3;
    border-radius: 5px;
  }
</style>
