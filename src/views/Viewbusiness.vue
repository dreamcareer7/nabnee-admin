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
                    Business Details
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
                      <img v-if="!design.cover_image" src="img/noimage.png" alt="Image"
                        class="card-img-top">
                        <img v-if="design.cover_image" :src="design.cover_image" alt="Image"
                        class="card-img-top">
                    </div>
                    <div class="card-body">
                      <div class="row mt-1 m-0 inventory_creator">
                        <div class="col-md-3 pr-1">
                          <img class="mt-0 img-fluid rounded-circle" :src="design.logo">
                        </div>
                        <div class="col-md-9">
                          <p class="mb-0">{{design.business_name_english}}</p>
                          <p class="mb-0">@<span style="font-weight: bold;">{{design.user_name}}</span></p>
                        </div>
                      </div>
                      <h4 class="card-title mt-4 mb-2">
                        Business Name <span v-if="design.business_name_arabic" >{{design.business_name_arabic}}</span>
                      </h4>
                      <p class="mt-3">
                        <span style="font-weight: bold;">Business Rating:</span> {{design.ratings.toFixed(2)}} ⭐ 
                      </p>
                      <p class="mb-3" v-if="design.business_description_english">
                        <span style="font-weight: bold;">Description: </span> {{design.business_description_english}}
                      </p>
                      <p class="mb-3" v-if="design.business_description_arabic">
                        <span style="font-weight: bold;">Description Arabic: </span> {{design.business_description_arabic}}
                      </p>
                      <p v-if="design.business_category">
                        <span style="font-weight: bold;">Category: </span>{{design.business_category.business_category_name}}
                      </p>
                      <p v-if="design.business_category">
                        <span style="font-weight: bold;">Category Arabic: </span>{{design.business_category.business_category_name_ar}}
                      </p>
                      <p v-if="design.business_subcategory">
                        <span style="font-weight: bold;">Sub-category: </span>{{design.business_subcategory.business_subcategory_name}}
                      </p>
                      <p v-if="design.business_subcategory">
                        <span style="font-weight: bold;">Sub-category Arabic: </span>{{design.business_subcategory.business_subcategory_name_ar}}
                      </p>
                      <a @click="openbusinesshours(design.business_hours)" class="btn btn-sm btn-primary text-white" style="cursor: pointer;">Business Hours</a>
                      <a @click="openleisurehours(design.leisure_hours)" class="btn btn-sm btn-primary text-white" style="cursor: pointer;">Break Hours</a>
                      <div class="mt-4">
                        <a @click="copylink(design._id)" id="copylink" class="btn btn-sm btn-primary text-white" style="cursor: pointer;">Invite link</a>
                        <a target="_blank" :href="'https://www.facebook.com/'+design.fb_link" class="btn btn-sm btn-round btn-primary" v-if="design.fb_link && design.fb_link!=' '"><i class="fa fa-facebook"></i></a>
                        <a target="_blank" :href="'https://www.twitter.com/'+design.twitter_link" class="btn btn-sm btn-round btn-info" v-if="design.twitter_link && design.twitter_link!=' '"><i class="fa fa-twitter"></i></a>
                        <a target="_blank" :href="'https://www.instagram.com/'+design.instagram_link" class="btn btn-sm btn-round btn-warning" v-if="design.instagram_link && design.instagram_link!=' '"><i class="fa fa-instagram"></i></a>
                        <a target="_blank" :href="'http://'+design.web_link" class="btn btn-sm btn-round btn-success" v-if="design.web_link && design.web_link!=' '"><i class="fa fa-globe"></i></a>
                        <a target="_blank" :href="'https://www.youtube.com/'+design.youtube_link" class="btn btn-sm btn-round btn-danger" v-if="design.youtube_link && design.youtube_link!=' '"><i class="fa fa-youtube"></i></a>
                      </div>
                      <hr>
                      <base-button @click="promotebusiness(design)" type="warning" size="sm" icon="fa fa-star" v-if="!design.business_featured">Promote</base-button>
                      <base-button @click="promotebusiness(design)" type="warning" size="sm" icon="fa fa-star" v-if="design.business_featured">Demote</base-button>
                      <base-button class="" type="danger" size="sm" @click="deleteDesign(design)" icon="fa fa-trash">Delete</base-button>
                    </div>
                  </article>
                </div>
                <div class="col-8">
                  <p>Ratings</p>
                  <div class="media media-comment" v-for="(comments,index) in commentsdata">
                    <img alt="Image placeholder" :src="comments.user_dp" class="avatar avatar-lg media-comment-avatar rounded-circle">
                    <div class="media-body"> 
                      <div class="media-comment-text">
                        <p class="mt-0"><span style="font-weight: bold;">@{{comments.user_name}}</span> rated this business {{comments.rating}} ⭐</p>
                        <p class="text-sm lh-160">{{comments.comment}}</p> 
                        <div class="icon-actions">
                          <!-- <base-button type="primary" class="btn-sm btn-danger" icon="fa fa-trash" id="" v-on:click="deletecomment(comments)">Delete Comment</base-button> -->
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
    <modal :show.sync="businesshours">
          <h6 slot="header" class="modal-title" id="modal-title-default">Business Hours</h6>

          
                    <template>
                      <form @submit.prevent> 
                        <div class="mt-3">
                        <div class="row" >
                          <div class="col-lg-4">
                              <p class="h5">Day</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="h5">Opening Time</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="h5">Closing Time</p>
                          </div>
                        </div>
                        <div class="row mt-3" v-for="(hours,index) in businesshoursdata" >
                          <div class="col-lg-4">
                              <p class="mb-0">{{hours.day}}</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="mb-0">{{hours.from}}</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="mb-0">{{hours.to}}</p>
                          </div>
                        </div>
                        </div>
                      </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn1" @click="businesshours = false">Close
              </base-button>
          </template>
    </modal>
    <!-- modal leisurehours -->
    <modal :show.sync="leisurehours">
          <h6 slot="header" class="modal-title" id="modal-title-default">Break Hours</h6>
                    <template>
                      <form @submit.prevent> 
                        <div class="mt-3">
                        <div class="row" >
                          <div class="col-lg-4">
                              <p class="h5">Day</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="h5">From</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="h5">To</p>
                          </div>
                        </div>
                        <div class="row mt-3" v-for="(leisure,index) in leisurehoursdata" >
                          <div class="col-lg-4">
                              <p class="mb-0">{{leisure.day}}</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="mb-0">{{leisure.from}}</p>
                          </div>
                          <div class="col-lg-4">
                              <p class="mb-0">{{leisure.to}}</p>
                          </div>
                        </div>
                        </div>
                      </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn1" @click="leisurehours = false">Close
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
        commentsdata: [],
        deleteitem:false,
        businesshours:false,
        leisurehours:false,
        businesshoursdata:[],
        leisurehoursdata:[],
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
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_by_id',{"user_id":this.$route.params.id},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.design=response.data.details[0];
        //this.commentsdata=response.data.details[0].user_reviews;
        if(this.design.user_reviews){
          let j=0;
        for (let i = 0; i < this.design.user_reviews.length; i++) {

            axios.post(process.env.VUE_APP_API_ENDPOINT+'read_business_by_oid',{"user_oid":response.data.details[0].user_reviews[i].comment_by},this.auth).then(response1 => {
            console.log(response1);
            if(response1.data.details){
              
              console.log(j)
              console.log(this.design.user_reviews[j]);
              console.log(response.data.details[0].user_reviews[i].rating);
              var pair = {user_dp: response1.data.details[0].user_dp,user_name:response1.data.details[0].user_name,comment:this.design.user_reviews[j].comment,rating:this.design.user_reviews[j].rating};
              this.commentsdata.push(pair);
              j++;

             }
            })
          
          }
          console.log(this.commentsdata);
         }

       }
      })
    },

    methods: {
      openbusinesshours(row){
        console.log(row)
        this.businesshours=true;
        this.businesshoursdata=JSON.parse(row);
      },
      copylink(id){
        var inp =document.createElement('input');
        document.body.appendChild(inp)
        inp.value ='https://nabnee.page.link/?link=https://nabnee.com/newbusinessuser/'+id+'&apn=com.nabnee.app&st=Nabnee&utm_source=AndroidApp'
        inp.select();
        document.execCommand('copy',false);
        inp.remove();
        document.getElementById("copylink").classList.remove('btn-primary');
        document.getElementById("copylink").classList.add('btn-success');
        document.getElementById("copylink").innerHTML='Link copied!';
        setTimeout(function(){
          document.getElementById("copylink").classList.remove('btn-success');
          document.getElementById("copylink").classList.add('btn-primary');
          document.getElementById("copylink").innerHTML="Invite link";
        }, 2000);
      },
      openleisurehours(row){
        console.log(row)
        this.leisurehours=true;
        this.leisurehoursdata=JSON.parse(row);
      },
      promotebusiness(row){
        let featured=0;
        let firsttitle='';
        let firsttext='';
        let secondtitle='';
        let secondtext='';
        if(row.business_featured==0){
           featured=1;
            firsttitle='Are you sure?';
            firsttext='You want to promote this listing?';
            secondtitle='Promoted!';
            secondtext='Your listing has been promoted.';

        }else{
           firsttitle='Are you sure?';
           firsttext='You want to remove promotion form this listing?';
           secondtitle='Demoted!';
           secondtext='Your listing has been demoted.';
        }
      const querystring = require('querystring');
        swal({
            title: firsttitle,
            text: firsttext,
            icon: 'info',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'update_business_profile',querystring.stringify({ user_email:row.user_email,business_featured:featured}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title: secondtitle,
              text: secondtext,
              icon:'success',
             }).then((result) => {
              console.log(result)
              window.location.reload()
            })
            })
           }
        });

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
            axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory_public1',{"comment" : { "comment" :row.comment,"comment_by" : row.comment_by,"_id" : row._id},"item_id" : this.$route.params.id,optype : "Remove"},this.auth)
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
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_business',querystring.stringify({ user_email:row.user_email}),this.auth1)
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
  .design-image-inner {

  }
  .inventory_creator {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 5px;
    background-color: #fafafa;
}
</style>
