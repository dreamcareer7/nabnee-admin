<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  All Businesses
              </span>

              <!-- all businesses table -->
              <div class="row">
                <div class="col">
                  <div class="card shadow">
                    <div class="card-header border-0" style="background-color: #f9f9f9">
                      <div class="row align-items-center">
                        <div class="col-2">
                          <p class="mb-0">Filter Business</p>
                        </div>
                        <div class="col-3">
                          <select aria-describedby="addon-right addon-left" v-model="modals.business_category" class="form-control form-control-alternative" autocomplete="off" @change="getsubcategories($event)">
                               <option value="" disabled="">Select category</option>
                               <option v-for="category in categories" :value="category._id" :key="category.business_category_name">
                                                 {{ category.business_category_name }}
                               </option>
                          </select>
                        </div>
                        <div class="col-3">
                          <select  aria-describedby="addon-right addon-left" v-model="modals.business_subcategory" class="form-control form-control-alternative" autocomplete="off" @change="filterbusiness()">
                               <option value="" >Select sub-category</option>
                               <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory.business_subcategory_name">
                                                 {{ subcategory.business_subcategory_name }}
                              </option>
                          </select>
                        </div>
                        <div class="col-3">
                          <select  aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off" @change="filtercitybusiness()" v-model="modals.business_city">
                              <option value="" disabled="" >Select city</option>
                              <option v-for="city in cities" :value="city.value_en" :key="city.value_en">
                                                 {{ city.value_en+'('+city.value_ar+')' }}
                               </option>
                           </select>
                        </div>
                        <div class="col text-right">
                          <a @click="cleardata()" class="btn btn-sm btn-primary text-white">Clear</a>
                        </div>
                      </div>
                    </div>
                    <div class="container mt-3" v-if="!deleteitem">
                      <div class="row pb-4">
                        <div class="col-lg-4 mb-2" v-for="(business,index) in businessData" >
                          <div>
                            <article class="card mb-2" >
                              <div class="business-image">
                                <img v-if="!business.cover_image" src="img/noimage.png" alt="Image"
                                  class="card-img-top">
                                <img v-if="business.cover_image" :src="business.cover_image" alt="Image"
                                  class="card-img-top">
                              </div>
                              <div class="card-body">
                                <h4 class="card-title">
                                  {{business.business_name_english}}
                                </h4>
                                <a target="_self" :href="'#/viewbusiness/'+business.user_id" class="btn btn-sm btn-primary"><i class="fa fa-briefcase"></i> View Business</a>
                                <base-button type="danger" size="sm" @click="deletebusiness(business)" icon="fa fa-trash">Delete</base-button>
                                <a target="_self" :href="'#/editbusiness/'+business.user_id" class="btn btn-sm btn-primary"><i class="fa fa-pencil"></i> Edit</a>

                               <!--  <base-button type="primary" size="sm" @click="openbusiness(business)" icon="fa fa-pencil">Edit</base-button> -->
                                <!-- <base-button type="danger" size="sm" @click="deletebusiness(business)" icon="fa fa-pencil">Delete</base-button> -->
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-footer d-flex justify-content-end" v-if="!deleteitem">
                        <nav aria-label="Page navigation example">
                          <ul class="pagination">
                            <li class="page-item">
                              <a class="page-link"  @click="previouspage()"> <span aria-hidden="true"><i aria-hidden="true" class="fa fa-angle-left"></i></span> </a>
                            </li>
                            <li class="page-item d-flex">
                              <p class="mb-0 px-1">PAGE</p>
                              <input size="4" class="mx-1 p-2 text-center" style="border: 1px solid #e9ecff;border-radius: 5px !important;background-color: #e9ecff;width: 4em;" type="number" name="page_no" id="page_no">
                              <base-button block type="primary" class="px-3 mx-1" title="GO" size="sm" @click="gotopage()">GO</base-button>
                            </li>
                            <li class="page-item">
                              <a  @click="nextpage()"  class="page-link"> <span aria-hidden="true"><i aria-hidden="true" class="fa fa-angle-right"></i></span> </a>
                            </li>
                          </ul>
                        </nav> 
                    </div>
                    <div class="row" v-if="deleteitem">
                        <div class="col-lg-12">
                          <article class="card mb-2" >
                            <center>
                              <div class="col-5">
                                <div>
                                  <img  src="img/dashboard_no_item.jpg" alt="Image" class="card-img-top">
                                </div>
                                 <a @click="cleardata()"><base-button type="primary" size="lg" block class="mb-5 mt-3" icon="fa fa-image">Clear Search</base-button></a>
                              </div>
                            </center>
                          </article>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </tab-pane>
            <!-- search business -->
            <tab-pane>
                <span slot="title">
                    Search Businesses
                </span>

                <!-- all business table -->
                <div class="row">
                  <div class="col">
                    <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                      <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                          <!-- <div class="col">
                            <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                              Search Hacks 
                            </h3>
                          </div> -->
                          <div class="col-md-12 d-flex text-center">
                            <div class="col-md-2">
                              
                            </div>
                            <div class="col-md-6">
                              <base-input alternative="" 
                              class="mb-0" 
                              label="" 
                              placeholder="Search business" 
                              input-classes="form-control-alternative" 
                              v-model="search" />
                            </div>
                            <div class="col-md-1">
                              <base-button class="ml-2" type="primary" id="updatebtn" v-on:click="searchbusiness()">Search</base-button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="container" v-if="!sdeleteitem">
                        <div class="row pb-4">
                          <div class="col-lg-4 mb-2" v-for="(business,index) in searchData" >
                            <div>
                             <article class="card mb-2" >
                              <div class="business-image">
                                <img v-if="!business.cover_image" src="img/noimage.png" alt="Image"
                                  class="card-img-top">
                                  <img v-if="business.cover_image" :src="business.cover_image" alt="Image"
                                  class="card-img-top">
                              </div>
                              <div class="card-body">
                                <h4 class="card-title">
                                  {{business.business_name_english}}
                                </h4>
                                <a target="_self" :href="'#/viewbusiness/'+business.user_id" class="btn btn-sm btn-primary"><i class="fa fa-briefcase"></i> View Business</a>
                                <base-button type="danger" size="sm" @click="deletebusiness(business)" icon="fa fa-trash">Delete</base-button>
                              </div>
                            </article>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row" v-if="sdeleteitem">
                        <div class="col-lg-12">
                          <article class="card mb-2" >
                            <center>
                              <div class="col-5">
                                <div class="design-image">
                                  <img  src="img/dashboard_no_item.jpg" alt="Image" class="card-img-top">
                                </div>
                                 <a @click="cleardata()"><base-button type="primary" size="lg" block class="mb-5 mt-3" icon="fa fa-image">Clear Search</base-button></a>
                              </div>
                            </center>
                          </article>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>
            </tab-pane>
            <!-- add business -->
            <tab-pane>
              <span slot="title">
                  Add Businesses user
              </span>

              <!-- all business table -->
              <div class="row">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <!-- <div class="col">
                          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                            Search Hacks 
                          </h3>
                        </div> -->
                      </div>
                    </div>
                    <div class="container">
                      <div class="pb-4">
                        <form @submit.prevent>
                         <div class="">
                          <div class="row">
                            <div class="col-lg-12">
                                <base-input alternative="" label="Email" placeholder="Email" input-classes="form-control-alternative" v-model="model.user_email" />
                                <div
                                    v-if="$v.model.user_email.$error"
                                    class="error h5 text-danger mt-2 pl-1"
                                  >
                                    Field is required.
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Create Password" placeholder="Create Password" type="password" input-classes="form-control-alternative" v-model="model.user_password" />
                                <div
                                    v-if="$v.model.user_password.$error"
                                    class="error h5 text-danger mt-2 pl-1"
                                  >
                                    Field is required.
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Confirm Password" placeholder="Confirm Password" type="password" input-classes="form-control-alternative" v-model="model.cuser_password" />
                                <div
                                    v-if="$v.model.cuser_password.$error"
                                    class="error h5 text-danger mt-2 pl-1"
                                  >
                                    Field is required.
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Username" placeholder="Username" input-classes="form-control-alternative" v-model="model.user_name" @change="isValidusername()" />
                                <div
                                    v-if="$v.model.user_name.$error"
                                    class="error h5 text-danger mt-2 pl-1"
                                  >
                                    Field is required.
                                </div>
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
                                <base-input alternative="" label="Business Name (English)" placeholder="Business Name (English)" input-classes="form-control-alternative" v-model="model.user_businessname" />
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
                                <base-input alternative="" label="Business Description (English)" placeholder="Business Description (English)" input-classes="form-control-alternative" v-model="model.user_businessdescription" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Business Email" placeholder="Business Email" input-classes="form-control-alternative" v-model="model.user_businessemail" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Business Name (Arabic)" placeholder="Business Name (Arabic)" input-classes="form-control-alternative" v-model="model.user_businessnamearabic" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Business Description (Arabic)" placeholder="Business Description (Arabic)" input-classes="form-control-alternative" v-model="model.user_businessdescriptionarabic" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="No of quotes allowed" placeholder="No of quotes allowed" input-classes="form-control-alternative" v-model="model.noofquotes" />
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
                              <div
                                  v-if="$v.model.business_category.$error"
                                  class="error h5 text-danger mt-2 pl-1"
                                >
                                  Field is required.
                              </div>
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
                                <base-input alternative="" label="Business Address (English)" placeholder="Business Address (English)" input-classes="form-control-alternative" v-model="model.user_businessaddressenglish" />
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
                                <base-input alternative="" label="Business GPS Address (Link)" placeholder="Business GPS Address" input-classes="form-control-alternative" v-model="model.gpslink" />
                            </div>
                            <div class="col-md-12 mb-2">
                          <label class="form-control-label">Country</label>
                           <select  aria-describedby="addon-right addon-left" v-model="model.user_country" class="form-control form-control-alternative" autocomplete="off">
                                <option value="" >Select country</option>
                                <option v-for="country in countrydata" :key="country._id" :value="country.country_name">{{country.country_name}}</option>
                           </select>
                     </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Business Address (Arabic)" placeholder="Business Address (Arabic)" input-classes="form-control-alternative" v-model="model.user_businessaddressarabic" />
                            </div>
                            <div class="col-12">
                              <select  aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off" @change="filtercitybusiness()" v-model="model.business_city">
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
                                  <vue-timepicker id="startPicker"  v-model="day.from" format="hh:mm A"></vue-timepicker>
                                </div>
                                <div class="col-lg-4 col-5 mb-3">
                                  <vue-timepicker id="endPicker" v-model="day.to" format="hh:mm A" @change="sameastime();checktime(day.from,day.to,'add')"></vue-timepicker>
                                </div>
                                <div class="col-lg-2 col-2">
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
                                </div>
                              </div>
                              <div id="ltimev" style="color: red;"></div>
                            </div>

                            <div class="col-lg-12">
                                <base-input alternative="" label="Website" placeholder="Website" input-classes="form-control-alternative" v-model="model.user_website" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="https://facebook.com/" placeholder="username only" input-classes="form-control-alternative" v-model="model.cuser_facebook" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="https://instagram.com/" placeholder="username only" input-classes="form-control-alternative" v-model="model.user_instagram" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="https://youtube.com/" placeholder="channel_id" input-classes="form-control-alternative" v-model="model.user_youtube" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="https://twitter.com/" placeholder="twitter handle only" input-classes="form-control-alternative" v-model="model.user_twitter" />
                            </div>
                            <div class="col-lg-12 mt-2 mb-3">
                              <label class="form-control-label">Send email with link</label>
                              <base-checkbox class="" type="checkbox" id="mike" v-model="selected">Yes</base-checkbox>
                            </div> 
                            <div class="col-lg-12 mt-2 mb-3">
                              <label class="form-control-label">Email language</label>
                              <select  aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off" v-model="language">
                                  <option value="newbusinessuserprofile">English</option>
                                  <option value="newbusinessuserprofile_ar">Arabic</option>
                               </select>
                            </div> 
                            
                            <div class="col-lg-12">
                              <base-button type="primary" id="saveuserbtn" :disabled="$v.model.$error || usernamelength || username || specialcharacter" @click="$v.model.$touch();saveuser()">Create Profile</base-button>
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

    <!-- modal edit business  -->
    <modal :show.sync="modals.editbusiness">
          <h6 slot="header" class="modal-title" id="modal-title-default">Edit</h6>
                    <template>
                    <form @submit.prevent>
                    <div class="">
                      <div class="row">
                        <div class="col-lg-6">
                             <label class="form-control-label">Category</label>
                              <select  aria-describedby="addon-right addon-left" v-model="modals.item_category" class="form-control form-control-alternative" autocomplete="off" @change="getsubcategories($event)">
                               <option value="" disabled="">Select</option>
                               <option v-for="category in categories" :value="category._id+'#'+category.business_category_name" :key="category.business_category_name">
                                                 {{ category.business_category_name }}
                               </option>
                              </select>
                        </div>
                        <div class="col-lg-6">
                             <label class="form-control-label">Sub-category</label>
                              <select  aria-describedby="addon-right addon-left" v-model="modals.item_subcategory" class="form-control form-control-alternative" autocomplete="off">
                               <option value="" >Select</option>
                               <option v-for="subcategory in subcategories" :value="{'sub_id':subcategory._id,'name':subcategory.subcat_name}" :key="subcategory.subcat_name">
                                                 {{ subcategory.subcat_name }}
                               </option>
                              </select>
                        </div>
                        <div class="col-lg-6">
                             <label class="form-control-label">Item Name</label>
                              <input type="text" aria-describedby="addon-right addon-left" alternative="" class="form-control form-control-alternative" v-model="modals.item_name">
                        </div>
                        <div class="col-lg-6">
                             <label class="form-control-label">Item Name Arabic</label>
                             <input type="text" aria-describedby="addon-right addon-left" alternative="" class="form-control form-control-alternative" v-model="modals.item_name_ar">
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-lg-6">
                              <label class="form-control-label">Item Description English</label>
                              <textarea rows="5" aria-describedby="addon-right addon-left" v-model="modals.item_description" class="form-control form-control-alternative" autocomplete="off"></textarea>  
                        </div>
                        <div class="col-lg-6">
                              <label class="form-control-label">Item Description Arabic</label>
                              <textarea rows="5" aria-describedby="addon-right addon-left" v-model="modals.item_description_ar" class="form-control form-control-alternative" autocomplete="off"></textarea>  
                        </div>
                      </div>
                      <div class="row mt-3" id="optionsid">
                        <div class="col-lg-6">
                          <div>
                            <div>
                              <label class="typo__label">Tags</label>
                              <input type="text" aria-describedby="addon-right addon-left" alternative="" class="form-control form-control-alternative" v-model="modals.item_tags"  id="file" ref="myFiles" name="img">
                            </div>
                          </div>
                          
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-6">
                          <label class="form-control-label">Item Mentions</label>
                          <span class="form-control d-flex form-control-alternative disabled" style="overflow-x: scroll; background-color: #ececec; cursor: not-allowed;"><p v-for="mention in modals.item_mentions">@{{mention.user_name}} &nbsp;</p></span>
                        </div>
                        <div class="col-lg-6">
                           <label class="form-control-label">Status</label>
                            <select  aria-describedby="addon-right addon-left" class="form-control form-control-alternative" autocomplete="off" v-model="modals.status">
                              <option value="" disabled="">Select</option>
                               <option v-for="stat in status" :value="stat.val" :key="stat.val">{{ stat.val }}
                               </option>
                           </select>
                        </div>
                      </div>
                    </div>
                  </form>
                    </template>

          <template slot="footer">
              <base-button type="primary" id="updatebtn1" v-on:click="updatebusiness()">Save changes</base-button>
              <base-button type="link" class="ml-auto" @click="modals.editbusiness = false">Close
              </base-button>
          </template>
    </modal>
  </div>
</template>
<script>
  import axios from "axios";
  import VueTimepicker from 'vue2-timepicker';
  import moment from 'moment';
  import 'vue2-timepicker/dist/VueTimepicker.css'
  import VueGoogleAutocomplete from 'vue-google-autocomplete';
  import { required, minLength, between,integer,minValue } from 'vuelidate/lib/validators';
  export default {
    name: 'tables',
    components:{VueTimepicker,VueGoogleAutocomplete},
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        search:'',
        selected:false,
        address:'',
        language:'newbusinessuserprofile',
        checkvalue :false,
        username:false,
        usernamelength:false,
        specialcharacter:false,
        lcheckvalue:false,
        searchData:[],
        categories: [],
        subcategories:[],
        cities:[],
        countrydata:[],
        businessData: [],
        reportedcaption: [],
        business_hours:[{day:"Mon",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Tue",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Wed",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Thu",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Fri",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Sat",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Sun",from:{hh:"",mm:""},to:{hh:"",mm:""}}],
        leisure_hours:[{day:"Mon",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Tue",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Wed",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Thu",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Fri",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Sat",from:{hh:"",mm:""},to:{hh:"",mm:""}},{day:"Sun",from:{hh:"",mm:""},to:{hh:"",mm:""}}],
        offset:0,
        u_offset:0,
        deleteitem:false,
        sdeleteitem:false,
        r_offset:0,
        modals:{
         editbusiness:false,
         stats:false,
         business_name:'',
         business_name_ar:'',
         business_description_ar:'',
         business_description:'',
         business_type:'business',
         business_visibility:'Public',
         business_category:'',
         business_subcategory:'',
         business_space:'',
         business_city:'',
         business_cost:'',
         business_theme_color:'',
         business_tags:'',
         optype:'Add',
         business_img:'',
         business_mentions:'',
         business_rate:'',
         created_by: '',
         status:''
         },
        model:{item_name:'',
               item_name_ar:'',
               item_description_ar:'',
               item_description:'',
               item_type:'business',
               item_visibility:'Public',
               item_category:'',
               item_subcategory:'',
               item_space:'',
               item_brand:'',
               item_cost:'',
               item_theme_color:'',
               item_tags:'',
               optype:'Add',
               item_img:'',
               item_mentions:'',
               item_rate:'',
               created_by: '',
               status:'',
                user_email:'',
                user_password:'',
                user_name:'',
                user_businessname:'',
                user_country:localStorage.getItem('country_name'),
                user_businessdescription:'',
                user_businessemail:'',
                user_businessnamearabic:'',
                user_businessdescriptionarabic:'',
                business_category:'',
                business_subcategory:'',
                user_businessaddressenglish:'',
                user_businessaddressarabic:'',
                business_city:'',
                user_phone:'',
                user_website:'',
                cuser_facebook:'',
                user_instagram:'',
                user_youtube:'',
                user_twitter:'',
                logo:'',
                cover_image:'',
                gpslink:'',
               },
        status:{
         0: {val: 'approved'},
         1: {val: 'rejected'},
         2: {val: 'pending'},
         3: {val: 'suspended'}
        },
        auth : { headers: { 'Content-Type':'application/json',
          'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1 : { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
      }
    },
    validations: {
      model: {
        user_email: {
          required
        },
        user_password:{
          required
        },
        cuser_password:{
          required
        },
        business_category:{
          required
        },
        user_name :{
          required
        },
      },

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
      .post(process.env.VUE_APP_API_ENDPOINT+'read_country',{"details" :{"status":"approved"},"offset" :"0"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.countrydata=response.data.details;
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

      

    },
    methods: {
    getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
            let place=document.getElementById("map").value;
            console.log(this.address);
            this.model.user_businessaddressenglish=place;
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
    },
    selectday(value){
      const index = this.days.map(e => e.day).indexOf(value);
      if(index==-1){
        document.getElementById(value).classList.add('active');
        this.days.push({day:value,start_time:{hh:"",mm:"",A:""},end_time:{hh:"",mm:"",A:""}});
      }else{
        this.days.splice(index,1);
        document.getElementById(value).classList.remove('active');
      }
      
    },
    removeday(index){
      document.getElementById(this.days[index].day).classList.remove('active');
      this.days.splice(index,1);
    }, 
    lchecktime(start_time,end_time,type)
    {
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

    deletebusiness(row) {
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
              window.location.reload()
            })
            })
           }
        });
    },
    saveuser(){
      if(this.$v.model.$error===false){
      document.getElementById("saveuserbtn").innerHTML='Loading...';
      let lat='';
      let long='';
      let business_hours=this.business_hours;
       let leisure_hours=this.leisure_hours;

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
      if(this.model.user_password==this.model.user_password){
       axios.post(process.env.VUE_APP_API_ENDPOINT+'register_business',querystring.stringify({ user_email:this.model.user_email,user_password:this.model.user_password,user_type:"Business",user_name:this.model.user_name}),this.auth1)
          .then(response => {
            let details ={user_email:this.model.user_email,user_password:this.model.user_password,user_type:"Business",user_name:this.model.user_name,business_name_english:this.model.user_businessname,business_description_english:this.model.user_businessdescription,noofquotes:this.model.noofquotes,business_email:this.model.user_businessemail,business_name_arabic:this.model.user_businessnamearabic,business_description_arabic:this.model.user_businessdescriptionarabic,address:this.model.user_businessaddressenglish,address_ar:this.model.user_businessaddressarabic,user_phone:this.model.user_phone,web_link:this.model.user_website,fb_link:this.model.cuser_facebook,instagram_link:this.model.user_instagram,youtube_link:this.model.user_youtube,twitter_link:this.model.user_twitter,business_hours:business_hours,leisure_hours:leisure_hours,logo:this.model.logo,cover_image:this.model.cover_image,location_lat:lat,location_long:long};
            if(this.model.business_category){
              details.business_category=this.model.business_category;
            }
            if(this.model.business_subcategory){
              details.business_subcategory=this.model.business_subcategory;
            }
            if(this.model.user_country){
              details.user_country=this.model.user_country;
            }
            if(this.model.business_city){
              details.business_city=this.model.business_city;
            }
            
            axios.post(process.env.VUE_APP_API_ENDPOINT+'update_business_profile',details,this.auth)
          .then(response1 => {
            
            console.log(response.data.user_details);
            if (this.selected) {
            let username=''; 
            let subject_body='New business user link';
            let html_body = '';

            axios.post(process.env.VUE_APP_API_ENDPOINT+'send_mail',{email:this.model.user_email,user_name:username,subject_body:subject_body,type:this.language,_id:response.data.user_details[0]._id},this.auth)
             .then(response => {
               console.log(response.data);
               })

              }
              document.getElementById("saveuserbtn").classList.remove('btn-primary');
              document.getElementById("saveuserbtn").classList.add('btn-success');
              document.getElementById("saveuserbtn").innerHTML='saved';
              setTimeout(function(){
              document.getElementById("saveuserbtn").classList.remove('btn-success');
              document.getElementById("saveuserbtn").classList.add('btn-primary');
              document.getElementById("saveuserbtn").innerHTML="Create Profile";
              window.location.reload()
            }, 2000);
            })
            
          })
      }else{
         swal({
              title:'Error',
              text: 'Password and confirm password not match',
              icon:'warning',
             }).then((result) => {
              console.log(result)
              window.location.reload()
            })
      }
     }
    },
    openbusiness: function(tcdata) {
      const querystring = require('querystring');
       console.log(tcdata);
       this.modals.editbusiness = true;
       this.modals.item_name=tcdata.item_name;
       this.modals.item_name_ar=tcdata.item_name_ar;
       this.modals.item_description_ar=tcdata.item_description_ar;
       this.modals.item_description=tcdata.item_description;
       this.modals.item_visibility=tcdata.item_visibility;
       this.modals.item_category=tcdata.item_category._id+'#'+tcdata.item_category.business_category_name;

       this.modals.item_space=tcdata.item_space;
       this.modals.item_brand=tcdata.item_brand;
       this.modals.item_cost=tcdata.item_cost; 
       this.modals.item_theme_color=tcdata.item_theme_color;
       if(tcdata.item_tags.length>0){
        this.modals.item_tags=tcdata.item_tags.toString();
       }
       this.modals.item_img=tcdata.item_img;
       this.modals.item_mentions=tcdata.item_mentions;
       this.modals.created_by=tcdata.created_by._id;
       this.modals.status=tcdata.status;

       this.modals.item_id=tcdata.item_id;

       console.log(this.modals);

    },
    getsubcategories(event){
       const querystring = require('querystring');
       this.filtercategorybusiness();
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
      }
          
    })
    },
    updatebusiness() {
      console.log(this.modals);
      let tags=[];
       if(this.modals.item_category){
        let item_category=this.modals.item_category.split('#'); 
        this.modals.item_category=item_category[0];
       }
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_business',querystring.stringify({item_id:this.modals.item_id,item_name : this.modals.item_name,item_name_ar:this.modals.item_name_ar,item_description:this.modals.item_description,item_tags:this.modals.item_tags,item_type:this.modals.item_type,item_visibility:this.modals.item_visibility,item_category:this.modals.item_category,item_subcategory:this.modals.item_subcategory,item_cost: this.modals.item_cost,created_by: this.modals.created_by,status: this.modals.status}),this.auth1)
      .then(response => {
        console.log(response);
        this.message=response.data.message;
        document.getElementById("updatebtn1").classList.remove('btn-primary');
        document.getElementById("updatebtn1").classList.add('btn-success');
        document.getElementById("updatebtn1").innerHTML='Updated';
        setTimeout(function(){
        document.getElementById("updatebtn1").classList.remove('btn-success');
        document.getElementById("updatebtn1").classList.add('btn-primary');
        document.getElementById("updatebtn1").innerHTML="Update";
        window.location.reload()
      }, 2000);
      })

    },

    previouspage(){

      console.log(this.auth);
      if(this.offset>=0){
      --this.offset;
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"details" :{ "user_type":"Business"},"offset" :this.offset})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.businessData=response.data.details;
        }      
      })
    }

    },
    gotopage(){

      const querystring = require('querystring');
      console.log(this.auth);
      if(document.getElementById("page_no").value){
      this.offset=document.getElementById("page_no").value;
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"details" :{ "user_type":"Business"},"offset" :this.offset})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.businessData=response.data.details;
        }      
      })

      }

    },
    nextpage(){
      this.offset=this.offset+1;
      const querystring = require('querystring');
      console.log(this.auth);
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"details" :{ "user_type":"Business"},"offset" :this.offset})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.businessData=response.data.details;
        }      
      })
    },
    searchbusiness() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"details" :{ "user_type":"Business"},"offset" :"0","search_type":"search_business","offset":"0","search_term":this.search,"business_name_english":this.search})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.sdeleteitem=false;
        this.searchData=response.data.details;
        }else if(response.data.message=="Data not found"){
          this.searchData=[];
          this.sdeleteitem=true;
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
    filtercategorybusiness() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"offset":"0","details":{"user_type":"Business","business_category":this.modals.business_category}})
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
    filtercitybusiness() {
      console.log(this.modals.item_brand);
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"offset":"0","details":{"user_type":"Business","business_city":this.modals.business_city}})
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
    cleardata() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_all',{"details" :{ "user_type":"Business"},"offset" :"0"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.businessData=response.data.details;
        this.modals.item_category='';
        this.modals.item_subcategory='';
        this.modals.item_brand='';
        this.subcategories=[];
        this.deleteitem=false;
        }
            
      })
    },


    }
  };
</script>

<style>
@media (min-width: 576px) {
.modal-dialog {
    max-width: 700px;
    margin: 1.75rem auto;
}
}
.business-image {
  max-height: 200px;
  overflow: hidden;
}
.business-image img {
  min-height: 200px;
}
.select-day {
  display: table-cell;
  text-align: center;
}
.days {
    border: 1px solid #ccc;
    padding: 8px 23px;
    border-radius: 1.375rem;
    background-color: #f7f7f7;
}
.days.active {
  background: #00B4DB;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white !important;
  border: none;
}
.vue__time-picker {
    width: 100%;
    -webkit-box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
    box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
    border: 0;
    -webkit-transition: -webkit-box-shadow .15s ease;
    transition: -webkit-box-shadow .15s ease;
    transition: box-shadow .15s ease;
    transition: box-shadow .15s ease, -webkit-box-shadow .15s ease;
    border-radius: 0.375rem;
}
.vue__time-picker input.display-time .is-empty{
    width: 100%;
    border-color: transparent;
    padding: 1.2em .5em;
    border-radius: 2.3rem;
}

</style>
