<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
      <tabs :fill="false" class="flex-column flex-md-row">
        <div>
            <tab-pane>
              <span slot="title">
                  <i class="ni ni-cloud-upload-96"></i>
                  All Designs
              </span>

              <!-- all hacks table -->
              <div class="row">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" style="background-color: #f9f9f9">
                      <div class="row align-items-center">
                        <div class="col-2">
                          <p class="mb-0">Filter Designs</p>
                        </div>
                        <div class="col-4">
                          <select  aria-describedby="addon-right addon-left" v-model="modals.item_category" class="form-control form-control-alternative" autocomplete="off" @change="getsubcategories($event)">
                               <option value="" disabled="">Select category</option>
                               <option v-for="category in categories" :value="category._id" :key="category.inventory_category_name">
                                                 {{ category.inventory_category_name }}
                               </option>
                          </select>
                        </div>
                        <div class="col-4">
                          <select  aria-describedby="addon-right addon-left" v-model="modals.item_subcategory" class="form-control form-control-alternative" autocomplete="off" @change="filterDesign()">
                               <option value="" >Select sub-category</option>
                               <option v-for="subcategory in subcategories" :value="subcategory._id" :key="subcategory.inventory_subcategory_name">
                                                 {{ subcategory.inventory_subcategory_name }}
                          </option>
                        </select>
                        </div>
                        <div class="col text-right">
                          <a @click="cleardata()" class="btn btn-sm btn-primary btn-white">Clear</a>
                        </div>
                      </div>
                    </div>
                    <div class="container mt-3" v-if="!deleteitem">
                      <div class="row pb-4">
                        <div class="col-lg-4 mb-2" v-for="(design,index) in designData" >
                          <div>
                            <article class="card mb-2" >
                              <div class="design-image">
                                <img v-if="design.item_img==''" src="img/noimage.png" alt="Image"
                                  class="card-img-top">
                                  <img v-if="design.item_img!=''" :src="design.item_img[0]" alt="Image"
                                  class="card-img-top">
                              </div>
                              <div class="card-body">
                                <h4 class="card-title">
                                  {{design.item_name}}
                                </h4>
                                <a target="_self" :href="'#/viewcomments/'+design.item_id" class="btn btn-sm btn-primary"><i class="fa fa-image"></i> View Design</a>
                                <base-button type="danger" size="sm" @click="deleteDesign(design)" icon="fa fa-trash">Delete</base-button>
                                <base-button type="success" size="sm" @click="openDesign(design)" icon="fa fa-pencil">Edit</base-button>
                                
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
                                <div class="">
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
            <!-- search Design -->
            <tab-pane>
                <span slot="title">
                    Search Designs
                </span>

                <!-- all Design table -->
                <div class="row">
                  <div class="col">
                    <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                      <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                          <div class="col-md-12 d-flex text-center">
                            <div class="col-md-2">
                              
                            </div>
                            <div class="col-md-6">
                              <base-input alternative="" 
                              class="mb-0" 
                              label="" 
                              placeholder="Search Design" 
                              input-classes="form-control-alternative" 
                              v-model="search" />
                            </div>
                            <div class="col-md-1">
                              <base-button class="ml-2" type="primary" id="updatebtn" v-on:click="searchDesign()">Search</base-button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="container" >
                        <div class="row pb-4">
                          <div class="col-lg-4 mb-2" v-for="(design,index) in searchData" >
                            <div>
                             <article class="card mb-2" >
                              <div class="design-image">
                                <img v-if="design.item_img==''" src="img/noimage.png" alt="Image"
                                  class="card-img-top">
                                  <img v-if="design.item_img" :src="design.item_img[0]" alt="Image"
                                  class="card-img-top">
                              </div>
                              <div class="card-body">
                                <h4 class="card-title">
                                  {{design.item_name}}
                                </h4>
                                <a target="_self" :href="'#/viewcomments/'+design.item_id" class="btn btn-sm btn-primary"><i class="fa fa-image"></i> View Design</a>
                                <base-button type="danger" size="sm" @click="deleteDesign(design)" icon="fa fa-trash">Delete</base-button>
                              </div>
                            </article>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </tab-pane>
            <tab-pane>
              <span slot="title">
                  Add Design
              </span>

              <!-- all business table -->
              <div class="row">
                <div class="col">
                  <div class="card shadow" :class="type === 'dark' ? 'bg-default': ''">
                    <div class="card-header border-0" :class="type === 'dark' ? 'bg-transparent': ''">
                      <div class="row align-items-center">
                        <div class="col-md-12">Basic Details</div>
                      </div>
                    </div>
                    <div class="container">
                      <div class="pb-4">
                        <form @submit.prevent>
                         <div class="">
                          <div class="row px-2">
                            <div class="col-lg-12">
                                <base-input alternative="" label="Item Name" placeholder="Item Name" input-classes="form-control-alternative" v-model="model.item_name" />
                                <div
                                    v-if="$v.model.item_name.$error"
                                    class="error h5 text-danger mt--4 pl-1"
                                  >
                                    Field is required.
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Item Name Arabic" placeholder="Item Name Arabic" type="text" input-classes="form-control-alternative" v-model="model.item_name_ar" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Item Description (English)" placeholder="Item Description (English)" input-classes="form-control-alternative" v-model="model.item_description" />
                            </div>
                            <div class="col-lg-12">
                                <base-input alternative="" label="Item Description (Arabic)" placeholder="Item Description (Arabic)" input-classes="form-control-alternative" v-model="model.item_description_ar" />
                            </div>
                            <div class="col-md-12">
                              <hr class="dashed">
                            </div>
                            <div class="col-md-12">Upload Image</div>
                            <div class="col-lg-12">
                              <div class="">
                                     <base-progress type="success" :value="uploadPercentage" label="File uploaded"></base-progress>
                                      <input
                                        type="file"
                                        ref="file1"
                                        accept="image/*" 
                                        id="addimage"
                                        placeholder="User DP"
                                        class="form-control form-control-alternative"
                                        multiple="multiple"
                                        @change="addhadleimage($event,'add','file')"
                                      />
                                      <div
                                          v-if="$v.model.item_img.$error"
                                          class="error h5 text-danger mt-2 pl-1"
                                        >
                                          Field is required.
                                      </div>
                                </div>
                            </div>
                            <div class="col-12">
                              <div class="col-lg-4" v-for="(img,index) in model.item_img" :key="img">
                                <span class="delete-image cursor-pointer" @click="deleteimage(index)"><i class="fa fa-trash text-white"></i></span>
                                      <img v-if="img" :src="img" class="rounded shadow img-fluid">
                              </div>
                            </div>
                            <div class="col-md-12">
                              <hr class="dashed">
                            </div>
                            <div class="col-md-12 mb-2">Business tagging</div>
                            <div class="col-lg-12 mb-2">
                                      <label class="form-control-label">Bisiness User</label>
                                      <select
                                        aria-describedby="addon-right addon-left"
                                        addon-left-icon="ni ni-bullet-list-67" v-model="model.user_id"
                                        class="form-control form-control-alternative"
                                        autocomplete="off"
                                        @change="getprojectdata()"
                                      >
                                        <option
                                          value=""
                                        >
                                          Select Business
                                        </option>
                                        <option
                                          v-for="(collections,index) in businessuserdata"
                                          :key="index"
                                          :value="collections._id">
                                          {{ collections.business_name_english }}
                                        </option>
                                      </select>
                                      <div
                                          v-if="$v.model.user_id.$error"
                                          class="error h5 text-danger mt-2 pl-1"
                                        >
                                          Field is required.
                                      </div>
                            </div>
                            <div class="col-lg-12 mb-2">
                                   <label class="form-control-label">Projects</label>
                                      <select
                                        aria-describedby="addon-right addon-left"
                                        addon-left-icon="ni ni-bullet-list-67" v-model="model.project_id"
                                        class="form-control form-control-alternative"
                                        autocomplete="off"
                                      >
                                        <option
                                          value=""
                                        >
                                          Select folder
                                        </option>
                                        <option
                                          v-for="(collections,index) in collectionData"
                                          :key="index"
                                          :value="collections.project_id">
                                          {{ collections.project_name }}
                                        </option>
                                      </select>
                                      <div
                                          v-if="$v.model.project_id.$error"
                                          class="error h5 text-danger mt-2 pl-1"
                                        >
                                          Field is required.
                                      </div>
                            </div>
                            <div class="col-lg-12" >
                                     <base-button
                                        id="sendnoti"
                                        size="lg"
                                        @click="createcollectionwindow()"
                                        type="primary"
                                        icon="fa fa-plus"
                                        class="float-center"
                                        block
                                      >
                                        Create new project
                                      </base-button>
                            </div>
                            <div class="col-md-12">
                              <hr class="dashed">
                            </div>
                            <div class="col-md-12 mb-2">Categorization</div>
                            <div class="col-lg-12 mb-2">
                              <label class="form-control-label">Select category</label>
                                  <select
                                        aria-describedby="addon-right addon-left"
                                        addon-left-icon="ni ni-bullet-list-67" v-model="model.item_category"
                                        class="form-control"
                                        autocomplete="off"
                                        @change="getsubcategoriesadd()"
                                      >
                                        <option
                                          value=""
                                        >
                                          Select category
                                        </option>
                                        <option v-for="category in categories" :key="category.inventory_category" :value="category._id">
                                          {{category.inventory_category_name}}
                                        </option>
                                        <!-- <option>
                                          Option two
                                        </option> -->
                                  </select>
                                  <div
                                      v-if="$v.model.item_category.$error"
                                      class="error h5 text-danger mt-2 pl-1"
                                    >
                                      Field is required.
                                  </div>
                              
                            </div>
                            <div class="col-lg-12">
                              <label class="form-control-label">Select sub-category</label>
                                <select
                                  aria-describedby="addon-right addon-left"
                                  addon-left-icon="ni ni-bullet-list-67" v-model="model.item_subcategory"
                                  class="form-control"
                                  autocomplete="off"
                                >
                                  <option
                                    value=""
                                  >
                                    Select sub-category
                                  </option>
                                  <option v-for="subcategory in subcategories" :key="subcategory.inventory_subcategory" :value="subcategory._id">
                                    {{subcategory.inventory_subcategory_name}}
                                  </option>
                                  <!-- <option>
                                    Option two
                                  </option> -->
                                </select>
                            </div>
                            <div class="col-md-12">
                              <hr class="dashed">
                            </div>
                            <div class="col-md-12 mb-2">Other Details</div>
                            <div class="col-lg-12">
                               <div class="row justify-content-center" v-if="model.item_type=='Product'">
                                    <div class="col-lg-3">
                                        <label class="form-control-label">Currency</label>
                                      <select
                                        aria-describedby="addon-right addon-left"
                                        addon-left-icon="ni ni-bullet-list-67" v-model="model.item_space"
                                        class="form-control"
                                        autocomplete="off"
                                      >
                                        <option
                                          value=""
                                        >
                                          Select currency
                                        </option>
                                        <option>
                                          BHD
                                        </option>
                                        <option>
                                          OMR
                                        </option>
                                      </select>
                                    </div>
                                    <div class="col-lg-4">
                                        <label class="form-control-label">Prpduct Cost</label>
                                        <base-input
                                            v-model="model.item_cost"
                                            placeholder="type here"
                                            class="mb-0"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                               <div class="col-lg-7" v-if="model.item_type=='Product'">
                                  <label class="form-control-label">Brand</label>
                                <select
                                  aria-describedby="addon-right addon-left"
                                  addon-left-icon="ni ni-bullet-list-67" v-model="model.item_brand"
                                  class="form-control"
                                  autocomplete="off"
                                >
                                  <option value="" disabled="" >Select brand</option>
                                  <option v-for="brand in brands" :value="brand.value_en" :key="brand.value_en">
                                                   {{ brand.value_en+'('+brand.value_ar+')' }}
                                  </option>
                                  <!-- <option>
                                    Armani
                                  </option> -->
                                </select>
                              </div>
                            </div>
                            <div class="col-lg-12 mb-2">
                                <label class="form-control-label">Add Tags</label>
                                <!-- <base-input
                                    placeholder="type here"
                                    class="mb-0"
                                    v-model="model.item_tags"
                                /> -->
                                <multiselect  aria-describedby="addon-right addon-left" v-model="model.item_tags" tag-placeholder="Add Tag" placeholder="Search tag" label="tag" track-by="tag" :options="tagData" :multiple="true" :taggable="true" @tag="addTag" ></multiselect>
                                <!-- <div class="mt-2 mb-4">
                                    <badge type="primary">Tag 1</badge>
                                    <badge type="primary">Tag 2</badge>
                                    <badge type="primary">Tag 3</badge>
                                    <badge type="primary">Tag 4</badge>
                                </div> -->
                            </div>
                            <div class="col-md-12 mb-2">
                              <label class="form-control-label">Search Users</label>
                                <multiselect  aria-describedby="addon-right addon-left" v-model="model.item_mentions" tag-placeholder="Search users" placeholder="Select user" label="business_name_english" track-by="_id" :options="userData" :multiple="true" :taggable="true" ></multiselect>
                            </div>
                            <div class="col-lg-12">
                              <base-button type="primary" id="saveuserbtn" :disabled="$v.model.$error" @click="$v.model.$touch();saveitem()">Save Item</base-button>
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
    <!-- edit design modal -->
    <modal :show.sync="modals.editdesign" class="bg-white full-modal">
          <h6 slot="header" class="modal-title" id="modal-title-default">Edit</h6>
                    <template>
                        <form @submit.prevent>
                           <div class="">
                            <div class="row card shadow py-3">
                              <div class="col-md-12"><p class="border-bottom">Basic Details</p></div>
                              <div class="col-lg-12">
                                  <base-input alternative="" label="Item Name" placeholder="Item Name" input-classes="form-control-alternative" v-model="modals.item_name" />
                                  <div
                                      v-if="$v.modals.item_name.$error"
                                      class="error h5 text-danger mt--4 pl-1"
                                    >
                                      Field is required.
                                  </div>
                              </div>
                              <div class="col-lg-12">
                                  <base-input alternative="" label="Item Name Arabic" placeholder="Item Name Arabic" type="text" input-classes="form-control-alternative" v-model="modals.item_name_ar" />
                              </div>
                              <div class="col-lg-12">
                                  <base-input alternative="" label="Item Description (English)" placeholder="Item Description (English)" input-classes="form-control-alternative" v-model="modals.item_description" />
                              </div>
                              <div class="col-lg-12">
                                  <base-input alternative="" label="Item Description (Arabic)" placeholder="Item Description (Arabic)" input-classes="form-control-alternative" v-model="modals.item_description_ar" />
                              </div>
                            </div>
                            <div class="row py-3 card shadow mt-3">
                              <div class="col-md-12"><p class="border-bottom mb-0">Upload Image</p></div>
                              <div class="col-lg-12">
                                <div class="div">
                                       <base-progress type="success" :value="uploadPercentage" label="File uploaded"></base-progress>
                                        <input
                                          type="file"
                                          ref="file2"
                                          accept="image/*" 
                                          id="editimage"
                                          placeholder="User DP"
                                          class="form-control form-control-alternative"
                                          multiple="multiple"
                                          @change="edithadleimage($event,'add','file')"
                                        />
                                        <div
                                            v-if="$v.modals.item_img.$error"
                                            class="error h5 text-danger mt-2 pl-1"
                                          >
                                            Field is required.
                                        </div>
                                  </div>
                              </div>
                              <div class="col-12">
                                <div class="row">
                                  <div class="col-lg-4 mt-4" v-for="(img,index) in modals.item_img" :key="img">
                                       <span class="delete-image cursor-pointer" @click="editdeleteimage(index)"><i class="fa fa-trash text-white"></i></span>
                                        <img v-if="img" :src="img" class="rounded shadow img-fluid">
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row py-3 card shadow mt-3">
                              <div class="col-md-12"><p class="border-bottom">Business User Details</p></div>
                              <div class="col-lg-12" >
                                        <label class="form-control-label">Business User</label>
                                        <select
                                          aria-describedby="addon-right addon-left"
                                          addon-left-icon="ni ni-bullet-list-67" v-model="modals.user_id"
                                          class="form-control form-control-alternative"
                                          autocomplete="off"
                                          @change="editgetprojectdata()"
                                        >
                                          <option
                                            value=""
                                          >
                                            Select Business
                                          </option>
                                          <option
                                            v-for="(collections,index) in businessuserdata"
                                            :key="index"
                                            :value="collections._id">
                                            {{ collections.business_name_english }}
                                          </option>
                                        </select>
                                        <div
                                            v-if="$v.modals.user_id.$error"
                                            class="error h5 text-danger mt-2 pl-1"
                                          >
                                            Field is required.
                                        </div>
                              </div>
                              <div class="col-lg-12" >
                                     <label class="form-control-label">Projects</label>
                                        <select
                                          aria-describedby="addon-right addon-left"
                                          addon-left-icon="ni ni-bullet-list-67" v-model="modals.project_id"
                                          class="form-control form-control-alternative"
                                          autocomplete="off"
                                        >
                                          <option
                                            value=""
                                          >
                                            Select folder
                                          </option>
                                          <option
                                            v-for="(collections,index) in collectionData"
                                            :key="index"
                                            :value="collections.project_id">
                                            {{ collections.project_name }}
                                          </option>
                                        </select>
                                        <div
                                            v-if="$v.modals.item_img.$error"
                                            class="error h5 text-danger mt-2 pl-1"
                                          >
                                            Field is required.
                                        </div>
                              </div>
                              <div class="col-lg-12 mt-2" >
                                     <base-button
                                        id="sendnoti"
                                        size="lg"
                                        @click="createcollectionwindow()"
                                        type="primary"
                                        icon="fa fa-plus"
                                        class="float-center"
                                        block
                                      >
                                        Create new project
                                      </base-button>
                              </div>
                            </div>
                            <div class="row py-3 card shadow mt-3">
                              <!-- <div class="col-md-12"><p class="border-bottom mb-0">Upload Image</p></div> -->
                              <div class="col-lg-12" >
                                <label class="form-control-label">Select category</label>
                                    <select
                                          aria-describedby="addon-right addon-left"
                                          addon-left-icon="ni ni-bullet-list-67" v-model="modals.item_category"
                                          class="form-control"
                                          autocomplete="off"
                                          @change="editgetsubcategoriesadd()"
                                        >
                                          <option
                                            value=""
                                          >
                                            Select category
                                          </option>
                                          <option v-for="category in categories" :key="category.inventory_category" :value="category._id">
                                            {{category.inventory_category_name}}
                                          </option>
                                          <!-- <option>
                                            Option two
                                          </option> -->
                                    </select>
                                    <div
                                        v-if="$v.modals.item_category.$error"
                                        class="error h5 text-danger mt-2 pl-1"
                                      >
                                        Field is required.
                                    </div>
                                
                              </div>
                              <div class="col-lg-12">
                                <label class="form-control-label">Select sub-category</label>
                                <select
                                  aria-describedby="addon-right addon-left"
                                  addon-left-icon="ni ni-bullet-list-67" v-model="modals.item_subcategory"
                                  class="form-control"
                                  autocomplete="off"
                                >
                                  <option
                                    value=""
                                  >
                                    Select sub-category
                                  </option>
                                  <option v-for="subcategory in subcategories" :key="subcategory.inventory_subcategory" :value="subcategory._id">
                                    {{subcategory.inventory_subcategory_name}}
                                  </option>
                                  <!-- <option>
                                    Option two
                                  </option> -->
                                </select>
                              </div>
                              <div class="col-lg-12">
                                 <div class="row justify-content-center" v-if="modals.item_type=='Product'">
                                      <div class="col-lg-3">
                                        <label class="form-control-label">Currency</label>
                                        <select
                                          aria-describedby="addon-right addon-left"
                                          addon-left-icon="ni ni-bullet-list-67" v-model="modals.item_space"
                                          class="form-control"
                                          autocomplete="off"
                                        >
                                          <option
                                            value=""
                                          >
                                            Select currency
                                          </option>
                                          <option>
                                            BHD
                                          </option>
                                          <option>
                                            OMR
                                          </option>
                                        </select>
                                      </div>
                                      <div class="col-lg-4">
                                          <label class="form-control-label">Product Cost</label>
                                          <base-input
                                              v-model="modals.item_cost"
                                              placeholder="type here"
                                              class="mb-0"
                                          />
                                      </div>
                                  </div>
                              </div>
                              <div class="col-lg-12">
                                 <div class="col-lg-7" v-if="modals.item_type=='Product'">
                                    <label class="form-control-label">Brand</label>
                                  <select
                                    aria-describedby="addon-right addon-left"
                                    addon-left-icon="ni ni-bullet-list-67" v-model="modals.item_brand"
                                    class="form-control"
                                    autocomplete="off"
                                  >
                                    <option value="" disabled="" >Select brand</option>
                                    <option v-for="brand in brands" :value="brand.value_en" :key="brand.value_en">
                                                     {{ brand.value_en+'('+brand.value_ar+')' }}
                                    </option>
                                    
                                  </select>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                  <label class="form-control-label">Add Tags</label>
                                  
                                  <multiselect  aria-describedby="addon-right addon-left" v-model="modals.item_tags" tag-placeholder="Add Tag" placeholder="Search tag" label="tag" track-by="tag" :options="tagData" :multiple="true" :taggable="true" @tag="editTag" ></multiselect>
                                  
                              </div>
                              <div class="col-md-12 mb-2">
                                <label class="form-control-label">Search Users</label>
                                  <multiselect  aria-describedby="addon-right addon-left" v-model="modals.item_mentions" tag-placeholder="Search users" placeholder="Select user" label="business_name_english" track-by="_id" :options="userData" :multiple="true" :taggable="true" ></multiselect>
                              </div>
                              <div class="col-lg-12">
                                
                              </div>
                              <!-- business hours end here-->
                            </div>
                            <div class="row mt-3">
                              <div class="col-md-12 px-0">
                                <base-button type="primary" id="updateuserbtn" :disabled="$v.modals.$error" @click="$v.modals.$touch();updateitem()">Update Item</base-button>
                              </div>
                            </div>
                           </div>
                          </form>

                </template>

          <template slot="footer">
              <!-- <base-button type="primary" id="updatebtn1" v-on:click="updateDesign()">Save changes</base-button> -->
              <base-button type="link" class="ml-auto" @click="modals.editdesign = false">Close
              </base-button>
          </template>
    </modal>
    <modal :show.sync="createcollection">
      <p
        id="modal-title-default"
        slot="header"
        class="modal-title"
      >
        New projects
      </p>
      <template>
        <form @submit.prevent>
          <div class="row justify-content-center">
            <div class="col-lg-8 mb-3">
              <label class="form-control-label">Project Title</label>
              <base-input
                placeholder="Collection Title"
                v-model="collection.project_name"
                addon-left-icon="fa fa-commenting-o"
                class="form-control-alternative"
              />
            </div>
            <div class="col-lg-8">
              <label class="form-control-label">Project Description</label>
              <base-input
                placeholder="'Enter description"
                addon-left-icon="fa fa-commenting"
                v-model="collection.project_description"
                class="form-control-alternative"
              />
            </div>
          </div>
          <div class="row justify-content-center mt-4">
            <div class="col-lg-8">
              <base-button
                @click="saveprojects()"
                id="savecollectionbtn"
                size="lg"
                type="success"
                icon="fa fa-plus"
                class="float-center"
              >
                Save
              </base-button>
            </div>
          </div>
        </form>
      </template>

      <template slot="footer">
        <base-button
          type="link"
          class="ml-auto mt--3"
          @click="createcollection = false"
        >
          Close
        </base-button>
      </template>
    </modal>
  </div>
</template>
<script>
  import axios from "axios";
  import VueSwal from 'vue-swal';
  import Multiselect from 'vue-multiselect';
  import { required, minLength, between,integer,minValue } from 'vuelidate/lib/validators';
  export default {
    name: 'tables',
    components: {Multiselect
    },
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        search:'',
        searchData:[],
        categories: [],
        subcategories:[],
        collectionData:[],
        businessuserdata:[],
        imagearr:[],
        editimagearr:[],
        userData:[],
        brands:[],
        deleteitem:false,
        createcollection:false,
        uploadPercentage:0,
        tagData:[],
        designData:[],
        reportedcaption: [],
        offset:0,
        u_offset:0,
        r_offset:0,
        modals:{
         editdesign:false,
         stats:false,
         item_name:'',
         item_name_ar:'',
         project_id:'',
         user_id:'',
         item_description_ar:'',
         item_description:'',
         item_type:'Design',
         item_visibility:'Public',
         item_category:'',
         item_subcategory:'',
         item_space:'',
         item_brand:'',
         item_cost:'',
         item_theme_color:'',
         item_tags:[],
         optype:'Add',
         item_img:'',
         item_mentions:'',
         item_rate:'',
         created_by: '',
         status:'approved'
         },
         collection:{
            project_name:'',
            project_description:'',
            collection_type:'',
            status:'approved',
            created_by:'',
         },
        model:{item_name:'',
               item_name_ar:'',
               item_description_ar:'',
               item_description:'',
               item_type:'Design',
               item_visibility:'Public',
               item_category:'',
               item_subcategory:'',
               item_space:'',
               item_brand:'',
               user_id:'',
               item_cost:'',
               item_theme_color:'',
               item_tags:[],
               optype:'Add',
               item_img:'',
               item_mentions:'',
               item_rate:'',
               created_by: '',
               status:'approved'
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
        item_name: {
          required
        },
        user_id:{
          required
        },
        project_id:{
          required
        },
        item_category:{
          required
        },
        item_img:{
          required
        }
      },
      modals: {
        item_name: {
          required
        },
        user_id:{
          required
        },
        project_id:{
          required
        },
        item_category:{
          required
        },
        item_img:{
          required
        }
      },

    },
    mounted () {
      this.path=process.env.VUE_APP_API_ENDPOINT;
      const querystring = require('querystring');
      console.log(this.auth);
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"details" :{ "item_type":"Design"},"offset" :"0"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.designData=response.data.details;
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_businessuser_all',{"details" :{ "user_type":"Business"},"offset" :"0"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.businessuserdata=response.data.details;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_businessuser_all',{ "details" :{},"offset" : "0"},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        let userData=response.data.details;
        for (var i = 0; i < userData.length; i++) {
            if(userData[i].business_name_english){
                this.userData.push({"_id":userData[i]._id,"business_name_english":userData[i].business_name_english});
            }
        }
        console.log(this.userData);
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_tag_all',{},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.tagData=response.data.details;
        //this.userData=this.tagData;
        }
            
      })

      


      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_category',{"status":"approved"})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.categories=response.data.details;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_filter_all',{ "filters" :{ "filter_name":"brand"}})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.brands=response.data.details[0].filter_values;
        }
            
      })

      

    },
    methods: {
      addTag (newTag) {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT+'create_tag',{"tag":newTag})
          .then(response => {
            console.log(response);
            let _ref=this;
            if(response.data.details){
                
               axios
                  .post(process.env.VUE_APP_API_ENDPOINT+'read_tag_all',{},_ref.auth)
                  .then(response => {
                    console.log(response);
                    if(response.data.details){
                     _ref.tagData=response.data.details;
                    }
                        
                  })
                  _ref.model.item_tags.push(response.data.details);

            }
                
          })
       },
       editTag (newTag) {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT+'create_tag',{"tag":newTag})
          .then(response => {
            console.log(response);
            let ref=this;
            if(response.data.details){
                
               axios
                  .post(process.env.VUE_APP_API_ENDPOINT+'read_tag_all',{},ref.auth)
                  .then(response => {
                    console.log(response);
                    if(response.data.details){
                     ref.tagData=response.data.details;
                    }
                        
                  })
                  ref.modals.item_tags.push(response.data.details);

            }
                
          })
       },
       createcollectionwindow: function() {
           console.log("collection window");
           this.createcollection = true;
           
       },
       deleteimage(index){
           this.model.item_img.splice(index,1);
           this.uploadPercentage=0;
       },
       editdeleteimage(index){
           this.modals.item_img.splice(index,1);
           this.uploadPercentage=0;
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
      let fd = new FormData();
      fd.append('image',file,file.name);
      axios.post(process.env.VUE_APP_API_ENDPOINT+'image-upload',fd,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)}).then(response => {
        // console.log(response);
        // console.log(this.imagearr);
        if(type=='add'){
          this.imagearr.push(response.data.imageUrl);
          this.model.item_img=this.imagearr;
          console.log(this.model.item_img);
          document.getElementById('addimage').value= null;
        }else{
          this.editimagearr=this.modals.item_img;
          this.editimagearr.push(response.data.imageUrl);
          this.modals.item_img=this.editimagearr;
          console.log(this.modals.item_img);
          document.getElementById('editimage').value= null;
        }
        
     })

    },
    getprojectdata(){
      this.collection.created_by=this.model.user_id;
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_project_by_user',{"created_by":this.model.user_id,"status" :"approved"},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
          this.collectionData=response.data.details;
        }else{
          this.collectionData=[];
        }
            
      })
    },
    editgetprojectdata(){
      this.collection.created_by=this.modals.user_id;
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_project_by_user',{"created_by":this.modals.user_id,"status" :"approved"},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
          this.collectionData=response.data.details;
        }else{
          this.collectionData=[];
        }
            
      })
    },
    saveprojects() {
      console.log(this.collection);
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'create_project',querystring.stringify({project_name:this.collection.project_name,project_description:this.collection.project_description,created_by: this.collection.created_by,status: this.collection.status}),this.auth1)
      .then(response => {
        console.log(response);
        axios
          .post(process.env.VUE_APP_API_ENDPOINT+'read_project_by_user',{"created_by":this.collection.created_by,"status" :"approved"},this.auth)
          .then(response => {
            console.log(response);
            if(response.data.details){
              this.collectionData=response.data.details;
            }
                
          })
        this.message=response.data.message;
        let ref=this;
        document.getElementById("savecollectionbtn").classList.remove('btn-primary');
        document.getElementById("savecollectionbtn").classList.add('btn-success');
        document.getElementById("savecollectionbtn").innerHTML='Saved';
        setTimeout(function(){
        document.getElementById("savecollectionbtn").classList.remove('btn-success');
        document.getElementById("savecollectionbtn").classList.add('btn-primary');
        document.getElementById("savecollectionbtn").innerHTML="Save";
        ref.createcollection = false;
        
      }, 2000);
      })

    },
  saveitem(){
    if(this.$v.model.$error===false){
    const querystring = require('querystring');
       let item_mentions='';
       let item_imgs='';
       let item_tags='';
       if(this.model.item_mentions.length >0){
          for (var i = 0; i < this.model.item_mentions.length; i++) {
              item_mentions+=this.model.item_mentions[i]._id+',';
          }
          var item_mention = item_mentions.substring(0, item_mentions.length-1);
       }
       if(this.model.item_img.length >0){
          for (var i = 0; i < this.model.item_img.length; i++) {
              item_imgs+=this.model.item_img[i]+',';
          }
          var item_img = item_imgs.substring(0, item_imgs.length-1);
       }
       if(this.model.item_tags.length >0){
          for (var i = 0; i < this.model.item_tags.length; i++) {
              item_tags+=this.model.item_tags[i].tag+',';
          }
          var item_tag = item_tags.substring(0, item_tags.length-1);
       }
       console.log(item_tag);
       console.log(item_img);
       console.log(item_mention);

       let details={item_name:this.model.item_name,item_description:this.model.item_description,item_name_ar:this.model.item_name_ar,item_description_ar:this.model.item_description_ar,item_type:this.model.item_type,item_visibility:this.model.item_visibility,item_space:this.model.item_space,item_cost:this.model.item_cost,optype:this.model.optype,created_by: this.model.user_id,status: this.model.status};
           if(item_mention){
             details.item_mentions=item_mention;
           }
           if(item_img){
             details.item_img=item_img;
           }
           if(item_tag){
             details.item_tags=item_tag;
           }
           if(this.model.item_brand){
             details.item_brand=this.model.item_brand;
           }
           if(this.model.item_category){
             details.item_category=this.model.item_category;
           }
           if(this.model.item_subcategory){
             details.item_subcategory=this.model.item_subcategory;
           }

         axios.post(process.env.VUE_APP_API_ENDPOINT+'create_inventory',querystring.stringify(details),this.auth1)
        .then(response => {
          //item_tags:this.model.item_tags,
          console.log(response);
          if(response.data.details){

          axios.post(process.env.VUE_APP_API_ENDPOINT+'update_project',querystring.stringify({project_id:this.model.project_id,user_oid :this.model.user_id,created_by:this.model.user_id,optype:"Add",items:response.data.details._id}),this.auth1)
            .then(response => {
              console.log(response);
            })
          }
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
       }
      },
      updateitem(){
        if(this.$v.modals.$error===false){
       const querystring = require('querystring');
       let item_mentions='';
       let item_imgs='';
       let item_tags='';
       if(this.modals.item_mentions.length >0){
          for (var i = 0; i < this.modals.item_mentions.length; i++) {
              item_mentions+=this.modals.item_mentions[i]._id+',';
          }
          var item_mention = item_mentions.substring(0, item_mentions.length-1);
       }
       if(this.modals.item_img.length >0){
          for (var i = 0; i < this.modals.item_img.length; i++) {
              item_imgs+=this.modals.item_img[i]+',';
          }
          var item_img = item_imgs.substring(0, item_imgs.length-1);
       }
       if(this.modals.item_tags.length >0){
          for (var i = 0; i < this.modals.item_tags.length; i++) {
              item_tags+=this.modals.item_tags[i].tag+',';
          }
          var item_tag = item_tags.substring(0, item_tags.length-1);
       }
       console.log(item_tag);
       console.log(item_img);
       console.log(item_mention);


       let details={item_id:this.modals.item_id,item_name:this.modals.item_name,item_description:this.modals.item_description,item_name_ar:this.modals.item_name_ar,item_description_ar:this.modals.item_description_ar,item_type:this.modals.item_type,item_visibility:this.modals.item_visibility,item_space:this.modals.item_space,item_cost:this.modals.item_cost,optype:this.modals.optype,created_by: this.modals.user_id,status: this.modals.status};
           if(item_mention){
             details.item_mentions=item_mention;
           }
           if(item_img){
             details.item_img=item_img;
           }
           if(item_tag){
             details.item_tags=item_tag;
           }
           if(this.modals.item_brand){
             details.item_brand=this.modals.item_brand;
           }
           if(this.modals.item_category){
             details.item_category=this.modals.item_category;
           }
           if(this.modals.item_subcategory){
             details.item_subcategory=this.modals.item_subcategory;
           }

         axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory',querystring.stringify(details),this.auth1)
        .then(response => {
          //item_tags:this.modals.item_tags,
          console.log(response);
          if(response.data.details){

          axios.post(process.env.VUE_APP_API_ENDPOINT+'update_project',querystring.stringify({project_id:this.modals.project_id,user_oid :this.modals.user_id,created_by:this.modals.user_id,optype:"Add",items:response.data.details._id}),this.auth1)
            .then(response => {
              console.log(response);
            })
          }
          document.getElementById("updateuserbtn").classList.remove('btn-primary');
          document.getElementById("updateuserbtn").classList.add('btn-success');
          document.getElementById("updateuserbtn").innerHTML='Loading...';
          setTimeout(function(){
          document.getElementById("updateuserbtn").classList.remove('btn-success');
          document.getElementById("updateuserbtn").classList.add('btn-primary');
          document.getElementById("updateuserbtn").innerHTML="Saved";
          window.location.reload();
        }, 2000);
        })
       }
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
              window.location.reload()
            })
            })
           }
        });
    },
    openDesign: function(tcdata) {
      const querystring = require('querystring');
       console.log(tcdata);
       let tags=[];
       this.modals.project_id='';
       if(tcdata.created_by){
        axios
          .post(process.env.VUE_APP_API_ENDPOINT+'read_project_by_user',{"created_by":tcdata.created_by._id,"status" :"approved"},this.auth)
          .then(response => {
            console.log(response);
            if(response.data.details){
            this.collectionData=response.data.details;
              for (var i = 0; i < this.collectionData.length; i++) {
                  for (var j = 0; j < this.collectionData[i].project_items.length; j++) {
                      if(this.collectionData[i].project_items[j]._id==tcdata._id){
                          this.modals.project_id=this.collectionData[i].project_id;
                          this.modals.project_id1=this.collectionData[i].project_id;
                      }
                  }
              }
            }
                
          })

       this.modals.created_by=tcdata.created_by._id;
       this.modals.user_id=tcdata.created_by._id;
       this.collection.created_by=tcdata.created_by._id;

       }
       
       this.modals.item_name=tcdata.item_name;
       this.modals._id=tcdata._id;
       this.modals.item_name_ar=tcdata.item_name_ar;
       this.modals.item_description_ar=tcdata.item_description_ar;
       this.modals.item_description=tcdata.item_description;
       this.modals.item_visibility=tcdata.item_visibility;
       //this.modals.item_category=tcdata.item_category._id;
       if(tcdata.item_subcategory){
          this.modals.item_subcategory=tcdata.item_subcategory._id;
       }
       if(tcdata.item_category){
         this.modals.item_category=tcdata.item_category._id;
         axios.post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_subcategory',querystring.stringify({ inventory_category_oid:this.modals.item_category }),this.auth1).then(response => {
          console.log(response);
            if(response.data.details){
            this.subcategories=response.data.details;
            //this.modals.category_name=response.data.subcategory_data[0].category_name;
            }
              
          })
       }

       this.modals.item_space=tcdata.item_space;
       this.modals.item_brand=tcdata.item_brand;
       this.modals.item_cost=tcdata.item_cost; 
       this.modals.item_theme_color=tcdata.item_theme_color;
        for (var i = 0; i < tcdata.item_tags.length; i++) {
                tags.push({tag:tcdata.item_tags[i]});
            }
            
       this.modals.item_tags=tags;
       this.modals.item_img=tcdata.item_img;
       this.modals.item_mentions=tcdata.item_mentions;
       this.modals.status=tcdata.status;
       // if(tcdata.sub_category[0]){
       //  this.modals.sub_category={'sub_id':tcdata.sub_category[0].subcat_id,'name':tcdata.sub_category_name[0]};
       //  //this.modals.sub_category=tcdata.sub_category[0].subcat_id;
       //  this.model.sub_category_name=tcdata.sub_category_name[0];
       // }
       this.modals.item_id=tcdata.item_id;
       this.modals.editdesign = true;
       console.log(this.modals);

    },
    getsubcategories(event){
       const querystring = require('querystring');
       this.filtercategoryDesign();
       axios.post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_subcategory',querystring.stringify({ inventory_category_oid:this.modals.item_category }),this.auth1).then(response => {
        console.log(response);
        if(response.data.details){
        this.subcategories=response.data.details;
        //this.model.category_name=response.data.subcategory_data[0].category_name;
        }
            
      })
      },
      getsubcategoriesadd(event){
       const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_subcategory',querystring.stringify({ inventory_category_oid:this.model.item_category }),this.auth1).then(response => {
        console.log(response);
        if(response.data.details){
        this.subcategories=response.data.details;
        //this.model.category_name=response.data.subcategory_data[0].category_name;
        }
            
        })
      },
      
      editgetsubcategoriesadd(event){
       const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_subcategory',querystring.stringify({ inventory_category_oid:this.modals.item_category }),this.auth1).then(response => {
        console.log(response);
        if(response.data.details){
        this.subcategories=response.data.details;
        //this.model.category_name=response.data.subcategory_data[0].category_name;
        }
            
        })
      },
    updateDesign() {
      console.log(this.modals);
      let tags=[];
       // if(this.modals.item_tags){
       //  tags=this.modals.item_tags.split(','); 
       // }
       if(this.modals.item_category){
        let item_category=this.modals.item_category.split('#'); 
        this.modals.item_category=item_category[0];
       }
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_inventory',querystring.stringify({item_id:this.modals.item_id,item_name : this.modals.item_name,item_name_ar:this.modals.item_name_ar,item_description:this.modals.item_description,item_tags:this.modals.item_tags,item_type:this.modals.item_type,item_visibility:this.modals.item_visibility,item_category:this.modals.item_category,item_subcategory:this.modals.item_subcategory,item_cost: this.modals.item_cost,created_by: this.modals.created_by,status: this.modals.status}),this.auth1)
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
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"details" :{ "item_type":"Design"},"offset" :this.offset})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.designData=response.data.details;
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
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"details" :{ "item_type":"Design"},"offset" :this.offset})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.designData=response.data.details;
        }      
      })

      }

    },
    nextpage(){
      this.offset=this.offset+1;
      const querystring = require('querystring');
      console.log(this.auth);
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"details" :{ "item_type":"Design"},"offset" :this.offset})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.designData=response.data.details;
        }      
      })
    },
    searchDesign() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"details" :{ "item_type":"Design"},"offset" :"0","item_name":this.search})
      .then(response => {
        console.log(response);
        if(response.data.details){
          this.deleteitem=false;
        this.searchData=response.data.details;
        }else if(response.data.message=="Data not found"){
          this.productData=[];
          this.deleteitem=true;
        }   
      })
    },
    filterDesign() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"offset":"0","details":{"item_type":"Design","item_category":this.modals.item_category,"item_subcategory":this.modals.item_subcategory}})
      .then(response => {
        console.log(response);
        if(response.data.details){
          this.deleteitem=false;
        this.designData=response.data.details;
        }else if(response.data.message=="Data not found"){
          this.designData=[];
          this.deleteitem=true;
        }
            
      })
    },
    filtercategoryDesign() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"offset":"0","details":{"item_type":"Design","item_category":this.modals.item_category}})
      .then(response => {
        console.log(response);
        if(response.data.details){
          this.deleteitem=false;
        this.designData=response.data.details;
        }else if(response.data.message=="Data not found"){
          this.designData=[];
          this.deleteitem=true;
        }
            
      })
    },
    cleardata() {
      const querystring = require('querystring');
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_inventory_all',{"offset":"0","details":{"item_type":"Design"}})
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.designData=response.data.details;
        this.modals.item_category='';
        this.modals.item_subcategory='';
        this.subcategories=[];
        this.deleteitem=false;
        }
            
      })
    },

    }
  };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
@media (min-width: 576px) {
.modal-dialog {
    max-width: 700px;
    margin: 1.75rem auto;
}
}
.design-image {
  max-height: 200px;
  overflow: hidden;
}
.design-image img {
    min-height: 200px;
}
</style>