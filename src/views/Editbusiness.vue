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
                    Edit Business User
                  </h3>
                </div>
                <div class="col-7 text-left" />
              </div>
            </div>
            <template>
              <form @submit.prevent>
                 <div class="">
                  <div class="row">
                    <div class="col-lg-12">
                        <base-input alternative="" label="Email" placeholder="Email" input-classes="form-control-alternative" v-model="model.user_email" autocomplete="off" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Create Password" placeholder="Create Password" type="password" input-classes="form-control-alternative" v-model="model.user_password" autocomplete="off" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Username" placeholder="Username" input-classes="form-control-alternative" v-model="model.user_name" @change="isValidusername()" />
                        <div
                            v-if="username"
                            class="error h5 text-danger pt-1 pl-1"
                          >
                            Username already exist 
                        </div>
                        
                        <div
                            v-if="usernamelength"
                            class="error h5 text-danger pt-1 pl-1"
                          >
                            Username length not less than 4 
                        </div>
                        <div
                            v-if="specialcharacter"
                            class="error h5 text-danger pt-1 pl-1"
                          >
                           Special character not allowed  
                        </div>

                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business Name (English)" placeholder="Business Name (English)" input-classes="form-control-alternative" v-model="model.business_name_english" />
                    </div>
                    <div class="col-lg-12">
                      <base-input
                        type="file"
                        alternative=""
                        label="Logo"
                        placeholder="Logo"
                        @change="hadleimage"
                        input-classes="form-control-alternative"
                      />
                    </div>
                    <div class="col-10 col-md-4 card-body offset-md-1 card shadow" v-if="model.logo">
                      Logo:
                      <img
                        :src="model.logo"
                        class="img-fluid"
                      >
                    </div>
                    <div class="col-lg-12" >
                      <base-input
                        type="file"
                        alternative=""
                        label="Cover Image"
                        placeholder="Cover Image"
                        @change="hadleicon"
                        input-classes="form-control-alternative"
                      />
                    </div>
                    <div class="col-10 col-md-4 card-body offset-md-1 card shadow" v-if="model.cover_image">
                      Cover Image:
                      <img
                        :src="model.cover_image"
                        class="img-fluid"
                      >
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business Description (English)" placeholder="Business Description (English)" input-classes="form-control-alternative" v-model="model.business_description_english" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="No of quotes allowed" placeholder="Business Description (English)" input-classes="form-control-alternative" v-model="model.noofquotes" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business Email" placeholder="Business Email" input-classes="form-control-alternative" v-model="model.business_email" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business Name (Arabic)" placeholder="Business Name (Arabic)" input-classes="form-control-alternative" v-model="model.business_name_arabic" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business Description (Arabic)" placeholder="Business Description (Arabic)" input-classes="form-control-alternative" v-model="model.business_description_arabic" />
                    </div>
                    <div class="col-lg-12">
                      <hr>
                    </div>
                    <div class="col-md-12 mb-2">
                      <label class="form-control-label">Business Category</label>
                      <select aria-describedby="addon-right addon-left" v-model="model.business_category" class="form-control form-control-alternative" autocomplete="off" @change="getbusinesssubcategories($event)">
                           <option value="" disabled="">Select category</option>
                           <option v-for="category in categories" :value="category._id" :key="category.business_category_name">
                                             {{ category.business_category_name }}
                           </option>
                      </select>
                    </div>
                    
                    <div class="col-md-12 mb-2">
                      <label class="form-control-label">Business Sub-category</label>
                      <select  aria-describedby="addon-right addon-left" v-model="model.business_subcategory" class="form-control form-control-alternative" autocomplete="off" @change="filterbusiness()">
                           <option value="" >Select sub-category</option>
                           <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory.business_subcategory_name">
                                             {{ subcategory.business_subcategory_name }}
                          </option>
                      </select>
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business Address (English)" placeholder="Business Address (English)" input-classes="form-control-alternative" v-model="model.address" />
                    </div>
                    <div class="col-lg-12">
                      <label class="form-control-label">Business GPS Address (Google Map API)</label>
                              <vue-google-autocomplete
                                    ref="address"
                                    id="map"
                                    classname="form-control mb-0"
                                    placeholder="Business GPS Address"
                                    v-on:placechanged="getAddressData"
                                    types="establishment" 
                                >
                                </vue-google-autocomplete>
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business GPS Address (Direct map link)" placeholder="Business GPS Address" input-classes="form-control-alternative" v-model="model.gpslink" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Business Address (Arabic)" placeholder="Business Address (Arabic)" input-classes="form-control-alternative" v-model="model.address_ar" />
                    </div>
                    <div class="col-md-12 mb-2">
                          <label class="form-control-label">Country</label>
                           <select  aria-describedby="addon-right addon-left" v-model="model.user_country" class="form-control form-control-alternative" autocomplete="off">
                                <option value="" >Select country</option>
                                <option v-for="country in countrydata" :key="country._id" :value="country.country_name">{{country.country_name}}</option>
                             
                           </select>
                     </div>
                    <div class="col-12">
                      <label class="form-control-label">Business City</label>
                      <select  aria-describedby="addon-right addon-left" class="form-control form-control-alternative" label="Business City" autocomplete="off" @change="filtercitybusiness()" v-model="model.business_city">
                          <option value="" disabled="" >Select city</option>
                          <option v-for="city in cities" :value="city.value_en" :key="city.value_en">
                                             {{ city.value_en+'('+city.value_ar+')' }}
                           </option>
                       </select>
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Phone" placeholder="Phone" input-classes="form-control-alternative" v-model="model.user_phone" />
                    </div>
                    <!-- business hours -->
                    <div class="col-lg-12 d-flex mt-4 mb-4">
                      <label class="form-control-label">Business Hours</label>
                    </div>
                    <div class="col-md-12 mt-2 mb-4" @click="sameastime()">
                      <base-checkbox class="" type="checkbox" id="sameas" v-model="checkvalue"><span class="mt-3">Same time for all days</span></base-checkbox> 
                    </div>
                    <div class="col-md-12 mb-1" v-for="(day,index) in business_hours" :key="'bu'+index">
                      <span class="mb-2 d-block text-sm">{{day.day}}</span>
                      <div class="row">
                        <div class="col-lg-4 col-5 mb-3">
                          <vue-timepicker id="endPicker" v-model="day.from" format="hh:mm A" ></vue-timepicker>
                        </div>
                        <div class="col-lg-4 col-5 mb-3">
                          <vue-timepicker id="endPicker" v-model="day.to" format="hh:mm A"  @change="sameastime();checktime(day.from,day.to,'add')"></vue-timepicker>
                        </div>
                        <div class="col-lg-2 col-2">
                          <!-- <base-button
                            size="sm"
                            outline
                            class="mt-1 no-outline"
                            type="danger"
                            icon="fa fa-times"
                            @click="removeday(index)"
                          >
                          </base-button> -->
                        </div>
                      </div>
                      <div id="timev" style="color: red;"></div>
                    </div>
                    <div class="col-lg-12">
                      <hr>
                    </div>

                    <!-- leisure_hours  -->
                    <div class="col-lg-12 d-flex mt-4 mb-4">
                      <label class="form-control-label">Leisure Hours</label>
                      <!-- <div class="select-day">
                        <a class="cursor-pointer days active" id="Monday" @click="lselectday('Monday')">Mon</a>
                      </div>

                      <div class="select-day">
                        <a class="cursor-pointer days" id="Tuesday" @click="lselectday('Tuesday')">Tue</a>
                      </div>

                      <div class="select-day">
                        <a class="cursor-pointer days" id="Wednesday" @click="lselectday('Wednesday')">Wed</a>
                      </div>

                      <div class="select-day">
                        <a class="cursor-pointer days" id="Thursday" @click="lselectday('Thursday')">Thu</a>
                      </div>

                      <div class="select-day">
                        <a class="cursor-pointer days" id="Friday" @click="lselectday('Friday')">Fri</a>
                      </div>

                      <div class="select-day">
                        <a class="cursor-pointer days" id="Saturday" @click="lselectday('Saturday')">Sat</a>
                      </div>

                      <div class="select-day">
                        <a class="cursor-pointer days" id="Sunday" @click="lselectday('Sunday')">Sun</a>
                      </div> -->
                    </div>
                    <div class="col-md-12 mt-2 mb-4" @click="lsameastime()">
                      <base-checkbox class="" type="checkbox" v-model="lcheckvalue" id="lsameas"><span class="mt-3">Same time for all days</span></base-checkbox> 
                    </div>
                    <div class="col-md-12 mb-1" v-for="(day,index) in leisure_hours" :key="'le'+index">
                      <span class="mb-2 d-block text-sm">{{day.day}}</span>
                      <div class="row">
                        <div class="col-lg-4 col-5 mb-3">
                          <vue-timepicker id="startPicker"  v-model="day.from" format="hh:mm A"></vue-timepicker>
                        </div>
                        <div class="col-lg-4 col-5 mb-3">
                          <vue-timepicker id="endPicker" v-model="day.to" format="hh:mm A" @change="lsameastime();lchecktime(day.from,day.to,'add')"></vue-timepicker>
                        </div>
                        <div class="col-lg-2 col-2">
                          <!-- <base-button
                            size="sm"
                            outline
                            class="mt-1 no-outline"
                            type="danger"
                            icon="fa fa-times"
                            @click="lremoveday(index)"
                          >
                          </base-button> -->
                        </div>
                      </div>
                      <div id="ltimev" style="color: red;"></div>
                    </div>

                    <div class="col-lg-12">
                        <base-input alternative="" label="Website" placeholder="Website" input-classes="form-control-alternative" v-model="model.web_link" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Facebook" placeholder="Facebook Link" input-classes="form-control-alternative" v-model="model.fb_link" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Instagram" placeholder="Instagram" input-classes="form-control-alternative" v-model="model.instagram_link" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Youtube" placeholder="Youtube" input-classes="form-control-alternative" v-model="model.youtube_link" />
                    </div>
                    <div class="col-lg-12">
                        <base-input alternative="" label="Twitter" placeholder="Twitter" input-classes="form-control-alternative" v-model="model.twitter_link" />
                    </div>
                    <div class="col-lg-12">
                    <label class="form-control-label">Send Mail</label>
                    <base-checkbox class="" type="checkbox" id="mike" v-model="selected">Yes</base-checkbox>
                    </div> 

                    <div class="col-lg-12">
                      <base-button :disabled="usernamelength || username || specialcharacter" type="primary" id="saveuserbtn" @click="updatebusiness()">Update Business</base-button>
                    </div>
                    <!-- business hours end here-->
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
  import VueSwal from 'vue-swal';
  import VueTimepicker from 'vue2-timepicker';
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import 'vue2-timepicker/dist/VueTimepicker.css'
  import moment from 'moment';
  export default {
    name: 'AddQuestion',
    components: { VueTimepicker,VueGoogleAutocomplete},
    props:['id'],
    data() {
      return {
        selected:false,
        checkvalue :false,
        username:false,
        usernamelength:false,
        specialcharacter:false,
        lcheckvalue:false,
        countrydata:[],
        gpslink:'',
        address:'',
        searchData:[],
        categories: [],
        subcategories:[],
        cities:[],
        businessData:[],
        uploadPercentage: 0,
        business_hours:[{day:"Mon",from:'',to:''},{day:"Tue",from:'',to:''},{day:"Wed",from:'',to:''},{day:"Thu",from:'',to:''},{day:"Fri",from:'',to:''},{day:"Sat",from:'',to:''},{day:"Sun",from:'',to:''}],
        leisure_hours:[{day:"Mon",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Tue",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Wed",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Thu",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Fri",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Sat",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Sun",from:{hh:"",mm:""},to:{hh:"",mm:""}}],
        model:{
                user_id :'',
                user_type : '',
                user_name : '',
                user_public_name : '',
                user_email : '',
                user_fcm : '',
                user_gid : '',
                user_fid : '',
                user_dp : '',
                user_password : '',
                user_permissions :'',
                user_phone : '',
                user_language : '',
                user_country : '',
                user_status : '',
                business_name_english : '',
                business_name_arabic  :'',
                business_category : '',
                business_subcategory : '',
                business_email : '',
                business_type : '',
                business_brand : '',
                business_brand_ar : '',
                business_space : '',
                business_space_ar : '',
                business_city : '',
                business_city_ar : '',
                business_hours : '',
                leisure_hours : '',
                location_lat : '',
                location_long : '',
                address : '',
                address_ar : '',
                logo : '',
                noofquotes:'',
                cover_image : '',
                business_description_english : '',
                business_description_arabic : '',
                web_link : '',
                fb_link : '',
                instagram_link : '',
                youtube_link : '',
                twitter_link : '',
                ratings : '',
                business_featured :'',
                user_likes : '',
                business_user_since : '',
                gpslink:''
               },
        message:'',
        auth : { headers: { 'Content-Type':'application/json',
          'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1 : { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        path:'',
         statuses: {
         1: {id: 'pending', val: 'pending'},
         2: {id: 'approved',val: 'approved'}
        }
      }
    },
    mounted () {

      this.path=process.env.VUE_APP_API_ENDPOINT;

      const querystring = require('querystring');
      console.log(this.auth);
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"details" :{ "user_type":"Business"},"offset" :"0"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.businessData=response.data.details;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_category',{"status":"approved"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.categories=response.data.details;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_filter_all',{ "filters" :{ "filter_name":"city"}})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.cities=response.data.details[0].filter_values;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_by_id',{"user_id":this.$route.params.id},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.model=response.data.details[0];
        if(this.model.user_country){
           //this.model.user_country=localStorage.getItem('country_name');
        }
        if(this.model.business_category){
          this.model.business_category=this.model.business_category._id;
          axios.post(process.env.VUE_APP_API_ENDPOINT+'read_business_subcategory',querystring.stringify({ business_category_oid:this.model.business_category }),this.auth1).then(response => {
        console.log(response);
        if(response.data.details){
        this.subcategories=response.data.details;
        //this.model.category_name=response.data.subcategory_data[0].category_name;
        }
        })
        }
        if(this.model.business_subcategory){
          this.model.business_subcategory=this.model.business_subcategory._id;
        }
        if(this.model.business_hours){
          this.business_hours=JSON.parse(this.model.business_hours);
        }
        console.log(this.business_hours);
        if(this.model.leisure_hours){
          this.leisure_hours=JSON.parse(this.model.leisure_hours);
        }
        this.model.gpslink='';
        console.log(this.model)
        }
      })
    },
    methods: {
    getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
            let place=document.getElementById("map").value;
            console.log(this.address);
            this.model.address=place;
            this.model.user_country=this.address.country;
    },
    hadleimage: function(event) {
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
              //console.log(response);
                  this.model.logo=response.data.imageUrl;
               
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
    
    hadleicon: function(event) {
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
              //console.log(response);
                  this.model.cover_image=response.data.imageUrl;
                  console.log(this.model.cover_image);
               
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
    checktime(start_time,end_time,type)
    {
      // console.log(start_time);
      let start_time1=start_time.hh+":"+start_time.mm+" "+start_time.A;
      let end_time1=end_time.hh+":"+end_time.mm+" "+end_time.A;
        var startTime = moment(start_time1, "HH:mm a");
        var endTime = moment(end_time1, "HH:mm a");
        if (endTime.hour() < startTime.hour())
        {
            console.log("Batch start time can't be greater than batch end time");
            if(type=='edit'){
              document.getElementById("edittimev").innerHTML="Batch start time can't be greater than batch end time";
            }else{
              document.getElementById("timev").innerHTML="Batch start time can't be greater than batch end time";
            }
            
            
        }
        else if (endTime.hour() == startTime.hour() && endTime.minute() <= startTime.minute())
        {
            console.log("Batch start time can't be equal or greater than batch end time");
             if(type=='edit'){
            document.getElementById("edittimev").innerHTML="Batch start time can't be equal or greater than batch end time";
            }else{
            document.getElementById("timev").innerHTML="Batch start time can't be equal or greater than batch end time";
           }
        }else{
           if(type=='edit'){
              document.getElementById("edittimev").innerHTML="";
            }else{
              document.getElementById("timev").innerHTML="";
            }

        }
        return false;
    },
    sameastime(){
       console.log('reach same as'); 
       console.log(this.business_hours);
      let start_time=this.business_hours[0].from;
      let end_time=this.business_hours[0].to;
      var inputElements = document.getElementById('sameas');
      console.log(inputElements);
      if (inputElements.checked) {
        for (var i = 0; i < this.business_hours.length; i++) {
          this.business_hours[i].from=start_time;
          this.business_hours[i].to=end_time;
          console.log(this.business_hours[i]);
        }
       }

      // console.log(this.days);
      
    },
    selectday(value){
      const index = this.days.map(e => e.day).indexOf(value);
      // console.log(index);
      if(index==-1){
        document.getElementById(value).classList.add('active');
        this.days.push({day:value,start_time:{hh:"",mm:"",A:""},end_time:{hh:"",mm:"",A:""}});
        // console.log(this.days);
      }else{
        this.days.splice(index,1);
        document.getElementById(value).classList.remove('active');
        // console.log(this.days);
      }
      
    },
    removeday(index){
      document.getElementById(this.days[index].day).classList.remove('active');
      this.days.splice(index,1);
      // console.log(this.days);
    }, 
    lchecktime(start_time,end_time,type)
    {
      // console.log(start_time);
      let start_time1=start_time.hh+":"+start_time.mm+" "+start_time.A;
      let end_time1=end_time.hh+":"+end_time.mm+" "+end_time.A;
        var startTime = moment(start_time1, "HH:mm a");
        var endTime = moment(end_time1, "HH:mm a");
        if (endTime.hour() < startTime.hour())
        {
            console.log("Batch start time can't be greater than batch end time");
            if(type=='edit'){
              document.getElementById("ledittimev").innerHTML="Batch start time can't be greater than batch end time";
            }else{
              document.getElementById("ltimev").innerHTML="Batch start time can't be greater than batch end time";
            }
            
            
        }
        else if (endTime.hour() == startTime.hour() && endTime.minute() <= startTime.minute())
        {
            console.log("Batch start time can't be equal or greater than batch end time");
             if(type=='edit'){
            document.getElementById("ledittimev").innerHTML="Batch start time can't be equal or greater than batch end time";
            }else{
            document.getElementById("ltimev").innerHTML="Batch start time can't be equal or greater than batch end time";
           }
        }else{
           if(type=='edit'){
              document.getElementById("ledittimev").innerHTML="";
            }else{
              document.getElementById("ltimev").innerHTML="";
            }

        }
        return false;
    },
    lsameastime(){
      // console.log('reach same as');
      // console.log(this.days);
      let start_time=this.leisure_hours[0].from;
      let end_time=this.leisure_hours[0].to;
      var inputElements = document.getElementById('lsameas');
      if (inputElements.checked) {
        for (var i = 0; i < this.leisure_hours.length; i++) {
          this.leisure_hours[i].from=start_time;
          this.leisure_hours[i].to=end_time;
          console.log(this.leisure_hours[i]);
        }
       }

      // console.log(this.days);
      
    },
    lselectday(value){
      const index = this.ldays.map(e => e.day).indexOf(value);
      // console.log(index);
      if(index==-1){
        document.getElementById(value).classList.add('active');
        this.ldays.push({day:value,start_time:{hh:"",mm:"",A:""},end_time:{hh:"",mm:"",A:""}});
        // console.log(this.days);
      }else{
        this.ldays.splice(index,1);
        document.getElementById(value).classList.remove('active');
        // console.log(this.days);
      }
      
    },
    lremoveday(index){
      document.getElementById(this.ldays[index].day).classList.remove('active');
      this.ldays.splice(index,1);
      // console.log(this.days);
    }, 
    updatebusiness(){
      document.getElementById("saveuserbtn").innerHTML='Loading...';
      let lat='';
      let long='';
      let business_hours=this.business_hours;
      // for (var i = 0; i < this.business_hours.length; i++) {
      //     business_hours[i].from=this.business_hours[i].from.hh+':'+this.business_hours[i].from.mm+' '+this.business_hours[i].from.A;
      //     business_hours[i].to=this.business_hours[i].to.hh+':'+this.business_hours[i].to.mm+' '+this.business_hours[i].to.A;
      //     console.log(business_hours[i]);
      //   }
       let leisure_hours=this.leisure_hours;
       // for (var i = 0; i < this.leisure_hours.length; i++) {
       //    leisure_hours[i].from=this.leisure_hours[i].from.hh+':'+this.leisure_hours[i].from.mm+' '+this.leisure_hours[i].from.A;
       //    leisure_hours[i].to=this.leisure_hours[i].to.hh+':'+this.leisure_hours[i].to.mm+' '+this.leisure_hours[i].to.A;
       //    console.log(leisure_hours[i]);
       //  }
        // business_hours=JSON.stringify(business_hours);
        // leisure_hours=JSON.stringify(leisure_hours);
        if(this.address){

            lat=this.address.latitude;
            long=this.address.longitude;
            console.log(lat);
            console.log(long);
          
        }else if(this.model.gpslink){

            let links=this.model.gpslink.split('@');
          if(links[1]){
            let latlong=links[1].split(',');
            lat=latlong[0];
            long=latlong[1];
            console.log(lat);
            console.log(long);
          }

        }
      const querystring = require('querystring');
      
            axios.post(process.env.VUE_APP_API_ENDPOINT+'update_business_profile',{ user_email:this.model.user_email,user_password:this.model.user_password,user_type:"Business",user_name:this.model.user_name,user_country:this.model.user_country,business_name_english:this.model.business_name_english,business_description_english:this.model.business_description_english,business_email:this.model.business_email,business_name_arabic:this.model.business_name_arabic,business_description_arabic:this.model.business_description_arabic,business_category:this.model.business_category,business_subcategory:this.model.business_subcategory,address:this.model.address,noofquotes:this.model.noofquotes,address_ar:this.model.address_ar,business_city:this.model.business_city,user_phone:this.model.user_phone,web_link:this.model.web_link,fb_link:this.model.fb_link,instagram_link:this.model.instagram_link,youtube_link:this.model.youtube_link,twitter_link:this.model.twitter_link,business_hours:business_hours,leisure_hours:leisure_hours,logo:this.model.logo,cover_image:this.model.cover_image,location_lat:lat,location_long:long},this.auth)
          .then(response => {
            
            console.log(response.data.user_details);
            if (this.selected) {
            let username=''; 
            let subject_body='New business user link';
            let html_body = '';

            axios.post(process.env.VUE_APP_API_ENDPOINT+'send_mail',{email:this.model.user_email,user_name:username,subject_body:subject_body,type:'newbusinessuserprofile',_id:response.data.user_details[0]._id},this.auth)
             .then(response => {
               console.log(response.data);
               })

              }
              document.getElementById("saveuserbtn").classList.remove('btn-primary');
              document.getElementById("saveuserbtn").classList.add('btn-success');
              document.getElementById("saveuserbtn").innerHTML='Updated';
              setTimeout(function(){
              document.getElementById("saveuserbtn").classList.remove('btn-success');
              document.getElementById("saveuserbtn").classList.add('btn-primary');
              document.getElementById("saveuserbtn").innerHTML="Update business";
              window.location.reload()
            }, 2000);
            })
            

    },
    getsubcategories(event){
       const querystring = require('querystring');
       //this.filtercategorybusiness();
       axios.post(process.env.VUE_APP_API_ENDPOINT+'read_business_subcategory',querystring.stringify({ business_category_oid:this.modals.business_category }),this.auth1).then(response => {
        console.log(response);
        if(response.data.details){
        this.subcategories=response.data.details;
        //this.model.category_name=response.data.subcategory_data[0].category_name;
        }
            
      })
      },
      isValidusername(){
        const querystring = require('querystring');
        console.log(this.model.user_name.length);
        if(this.model.user_name.length < 4)
        {
          this.usernamelength=true;
          this.username=false;
           this.specialcharacter=false;
        }
        else if(/[$&+,:;=\\\\?@#|/'<>.^*() %!-]/.test(this.model.user_name))
        {
         this.usernamelength=false;
         this.username=false;
         this.specialcharacter=true;
        }else{
        axios.post(process.env.VUE_APP_API_ENDPOINT+'search_business_user_name',{ user_name:this.model.user_name },this.auth).then(response => {
          console.log(response);
          if(response.data.details){
            this.username=true;
            this.usernamelength=false;
            this.specialcharacter=false;
            //this.model.category_name=response.data.subcategory_data[0].category_name;
          }else{
            this.username=false;
            this.usernamelength=false;
            this.specialcharacter=false;
          }
        })
       }
        
     },
    getbusinesssubcategories(event){
     const querystring = require('querystring');
     axios.post(process.env.VUE_APP_API_ENDPOINT+'read_business_subcategory',querystring.stringify({ business_category_oid:this.model.business_category }),this.auth1).then(response => {
      console.log(response);
      if(response.data.details){
      this.subcategories=response.data.details;
      //this.model.category_name=response.data.subcategory_data[0].category_name;
      }
          
    })
    },
    filterbusiness() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"offset":"0","details":{"user_type":"Business","business_category":this.modals.business_category,"business_subcategory":this.modals.business_subcategory}})
      .then(response => {
        console.log(response);
        if(response.data.details){
          this.deleteitem=false;
        this.businessData=response.data.details;
        }else if(response.data.message=="Data not found"){
          this.businessData=[];
          this.deleteitem=true;
        }
            
      })
    },
  },
  };
</script>
<style></style>
