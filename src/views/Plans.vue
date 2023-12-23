<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="nabnee">
        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section-shaped my-0">
                <div class="shape bg-white">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container shape-container d-flex">
                    <div class="col px-0">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 text-center">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <section class="section section-lg pt-lg-0 mt-3">
            <div class="container shape-container d-flex pb-4">
                <div class="col px-0">
                    <div class="row justify-content-center">
                        <div class="col-lg-8 text-center">
                            <h1 class="display-3" v-if="lang=='english'">Saved Plans
                                <!-- <span>(Collection)</span> -->
                            </h1>
                            <h1 class="display-3" v-if="lang=='arabic'">ملفات الأسعار
                                <!-- <span>(مجموعة)</span> -->
                            </h1>
                            <!-- <p class="lead  text-white">The design system comes with four pre-built pages to help you get started faster. You can change the text and images and you're good to go.</p> -->
                            <!-- <div class="btn-wrapper">
                                <base-button tag="a"
                                             href="https://demos.creative-tim.com/argon-design-system/docs/components/alerts.html"
                                             class="mb-3 mb-sm-0"
                                             type="info"
                                             icon="fa fa-code">
                                    Components
                                </base-button>
                                <base-button tag="a"
                                             href="https://www.creative-tim.com/product/argon-design-system"
                                             class="mb-3 mb-sm-0"
                                             type="white"
                                             icon="ni ni-cloud-download-95">
                                    Download HTML
                                </base-button>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="row row-grid">
                          <div class="col-lg-12 mb-5">
                            <div class="col">
                              <div class="card shadow mb-3" v-for="projectplan in projectplanData" :key="projectplan._id">
                                <div
                                  class="card-header border-0 px-2 px-md-4"
                                  style="background-color: #f6f9fc"
                                  >
                                  <div class="row align-items-center">
                                    <div class="col pr-0 pr-md-3">
                                      <h5
                                        class="text-capitalize mb-0"
                                        v-if="projectplan.projectplan_name"
                                      >
                                        {{projectplan.projectplan_name}} ({{ formateDate(projectplan.created_at) }})
                                      </h5>
                                    </div>
                                    <div class="col pl-2 pl-md-3 text-right">
                                      <base-button
                                        type="success"
                                        size="sm"
                                        icon="fa fa-pencil"
                                        outline
                                        class="no-outline"
                                        @click="editplan(projectplan)"
                                        >
                                         <span v-if="lang=='english'">Edit</span><span v-if="lang=='arabic'">تعديل</span>
                                      </base-button>
                                      <base-button
                                        type="danger"
                                        size="sm"
                                        icon="fa fa-trash"
                                        outline
                                        class="no-outline"
                                        @click="deleteprojectplan(projectplan)"
                                        >
                                         <span v-if="lang=='english'">Delete</span><span v-if="lang=='arabic'">حذف</span>
                                      </base-button>
                                    </div>
                                  </div>
                                </div>
                                <div class="container">
                                  <div>
                                    <div class="row mt-3">
                                      <!-- first batch -->
                                      <div
                                        class="col-lg-12 order-lg-1 text-decoration-none mb-2"
                                        style="color: #525f7f"
                                        >
                                        <div class="mb-3">
                                          <div class="card">
                                            <div class="card-header bg-white border-0">
                                              <div class="row align-items-center">
                                                <div class="col-12">
                                                  <p class="mb-0 font-weight-bold" v-if="lang=='english'">
                                                    Quotation Requests
                                                  </p>
                                                  <p class="mb-0 font-weight-bold arabic text-right" v-if="lang=='arabic'">
                                                    طلبات عروض الأسعار
                                                  </p>
                                                </div>
                                                <!-- <div class="col-4 text-right">
                                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                                </div> -->
                                              </div>
                                            </div>
                                            <div class="table-responsive">
                                              <base-table
                                                  thead-classes="thead-light"
                                                  :data="projectplan.projectplan_quotes"
                                                >
                                                  <template slot="columns">
                                                    <th><span v-if="lang=='english'">Item</span><span v-if="lang=='arabic'">الغرض</span></th>
                                                    <th><span v-if="lang=='english'">Type x Qty.</span><span v-if="lang=='arabic'">النوع x الكمية</span></th>
                                                    <th><span v-if="lang=='english'">Price</span><span v-if="lang=='arabic'">السعر</span></th>
                                                    <th><span v-if="lang=='english'">Attachment</span><span v-if="lang=='arabic'">المرفق</span></th>
                                                    <th><span v-if="lang=='english'">Details</span><span v-if="lang=='arabic'">تفاصيل</span></th>
                                                    <th><span v-if="lang=='english'">View Quotations</span><span v-if="lang=='arabic'">مشاهدة عروض الأسعار</span></th>
                                                    <th></th>
                                                  </template>
                                                  <template
                                                    slot-scope="{row,index}"
                                                  >
                                                    <!-- <th class="pr-0 align-middle">
                                                      <base-button
                                                        iconOnly
                                                        type="danger"
                                                        size="sm"
                                                        outline
                                                        icon="fa fa-times"
                                                        class="no-outline"
                                                        >
                                                      </base-button>
                                                    </th> -->
                                                    <th class="align-middle text-capitalize">
                                                      <span class="pr-2 d-none">{{index+1}}.</span>
                                                      <span class="mb-0 font-weight-bold" v-if="row.materiallist_id"><span v-if="lang=='english'">{{row.item_name}}</span><span v-if="lang=='arabic'">{{row.item_name_ar}}</span></span>
                                                    </th>
                                                    <th class="align-middle">
                                                      <span class="mb-0 font-weight-400"><span v-if="lang=='english'">{{row.type}}</span><span v-if="lang=='arabic'">{{row.type_ar}}</span> x {{row.quantity}}</span>
                                                    </th>
                                                    <th class="align-middle">
                                                      <span class="mb-0 font-weight-400" v-if="row.selectedsubmission">
                                                        {{row.selectedsubmission.price}}
                                                        <!-- <select
                                                          v-model="row.quantity"
                                                          :disabled="row.readonly"
                                                          aria-describedby="addon-right addon-left"
                                                          addon-left-icon="ni ni-bullet-list-67"
                                                          class="form-control form-control-alternative"
                                                          autocomplete="off"
                                                          @change="gettotalamount(index)"
                                                          readonly
                                                        >
                                                          <option v-for="x in quantitydata" :key="x">
                                                            {{x}}
                                                          </option>
                                                        </select> -->
                                                      </span>
                                                    </th>
                                                    <th class="align-middle">
                                                      <span class="mb-0 font-weight-400 text-primary d-block" v-for="business_attachments in row.business_attachments" :key="'c'+business_attachments">
                                                       <a v-if="business_attachments" :href="business_attachments" target="_blank">
                                                      <i class="fa fa-download mr-2"></i>download</a></span>
                                                    </th>
                                                    <th class="align-middle">
                                                      <span class="mb-0 font-weight-400">{{row.business_remark}}</span>
                                                    </th>
                                                    
                                                    <th class="align-middle">
                                                      <base-button
                                                        type="success"
                                                        size="sm"
                                                        icon="fa fa-info"
                                                        @click="openallquotations(row,index)"
                                                        >
                                                         Quotations
                                                      </base-button>
                                                    </th>
                                                    <th class="pr-0 align-middle">
                                                      <base-button
                                                        iconOnly
                                                        type="danger"
                                                        size="sm"
                                                        outline
                                                        icon="fa fa-times"
                                                        class="no-outline"
                                                        @click="deletequote(row)"
                                                        >
                                                      </base-button>
                                                    </th>
                                                  </template>
                                                </base-table>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="mb-3">
                                          <div class="card">
                                            <div class="card-header bg-white border-0">
                                              <div class="row align-items-center">
                                                <div class="col-12">
                                                  <p class="mb-0 font-weight-bold" v-if="lang=='english'">
                                                    By Contractor
                                                  </p>
                                                  <p class="mb-0 font-weight-bold arabic text-right" v-if="lang=='arabic'">
                                                    على المقاول
                                                  </p>
                                                </div>
                                                <!-- <div class="col-4 text-right">
                                                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                                                </div> -->
                                              </div>
                                            </div>
                                            <div class="table-responsive">
                                              <base-table
                                                  thead-classes="thead-light"
                                                  :data="projectplan.projectplan_contracts"
                                                >
                                                  <template slot="columns">
                                                    <th><span v-if="lang=='english'">Item</span><span v-if="lang=='arabic'">الغرض</span></th>
                                                    <th><span v-if="lang=='english'">Type</span><span v-if="lang=='arabic'">النوع</span></th>
                                                    <!-- <th>Price</th> -->
                                                    <th><span v-if="lang=='english'">Quantity</span><span v-if="lang=='arabic'">كمية</span></th>
                                                    <th><span v-if="lang=='english'">Price</span><span v-if="lang=='arabic'">الكمية</span></th>
                                                    <th><span v-if="lang=='english'">Remark</span><span v-if="lang=='arabic'">ملاحظة</span></th>
                                                    <th></th>
                                                  </template>
                                                  <template
                                                    slot-scope="{row,index}"
                                                  >
                                                    <th
                                                      class="align-middle text-capitalize"
                                                      scope="row"
                                                    >
                                                      <span class="pr-2 d-none">{{index+1}}.</span>
                                                      <span class="mb-0 font-weight-bold" v-if="lang=='english'">{{row.item_name}}</span>
                                                      <span class="mb-0 font-weight-bold" v-if="lang=='arabic'">{{row.item_name_ar}}</span>
                                                    </th>
                                                    <th class="align-middle">
                                                      <span class="mb-0 font-weight-400" v-if="row.type"><span v-if="lang=='english'">{{row.type}}</span><span v-if="lang=='arabic'">{{row.type_ar}}</span></span>
                                                    </th>
                                                    <th class="align-middle">
                                                      <span class="mb-0 font-weight-400">
                                                        <select
                                                          v-model="row.quantity"
                                                          :disabled="row.readonly"
                                                          aria-describedby="addon-right addon-left"
                                                          addon-left-icon="ni ni-bullet-list-67"
                                                          class="form-control form-control-alternative"
                                                          autocomplete="off"
                                                          @change="gettotalamount(index)"
                                                          readonly
                                                        >
                                                          <option v-for="x in quantitydata" :key="x">
                                                            {{x}}
                                                          </option>
                                                          <!-- <option>
                                                            2
                                                          </option>
                                                          <option>
                                                            3
                                                          </option> -->
                                                        </select>
                                                      </span>
                                                    </th>
                                                    <!-- <th class="align-middle">
                                                      <span class="mb-0 font-weight-400"> {{row.rate}}</span>
                                                    </th>  -->
                                                    <th class="align-middle">
                                                      <span class="mb-0 font-weight-400 text-capitalize" :id="'total'+index"> {{row.total}}</span>
                                                    </th>
                                                    <th class="align-middle">
                                                      <span class="mb-0 h4 font-weight-400">
                                                        <base-input
                                                            :disabled="row.readonly"
                                                            v-model="row.remark"
                                                            placeholder="Write specific remarks"
                                                            class="mb-0"
                                                        />
                                                      </span>
                                                    </th>
                                                    <th class="pr-0 align-middle">
                                                      <base-button
                                                        iconOnly
                                                        type="danger"
                                                        size="sm"
                                                        outline
                                                        icon="fa fa-times"
                                                        class="no-outline"
                                                        @click="deletecontract(row)"
                                                        >
                                                      </base-button>
                                                    </th>
                                                  </template>
                                                </base-table>
                                            </div>
                                          </div>
                                          <div class="col-md-12 col-3 px-0 mt-3">
                                            <download-csv
                                                :data   = "projectplan.json_data"
                                                class   = "btn btn-lg btn-block btn-success export-excel-wrapper">
                                                <span v-if="lang=='english'">Download Data</span>
                                                <span v-if="lang=='arabic'">تنزيل بيانات الأسعار</span>
                                                
                                            </download-csv>
                                           <!--  <download-excel class="btn btn-block btn-success export-excel-wrapper" :data="json_data" :fields="json_fields" :name="projectplan._id"></download-excel> -->
                                            
                                            <!-- <base-button
                                              id="createproject"
                                              type="primary"
                                              icon="fa fa-download"
                                              class="float-center h-100"
                                              block
                                            >
                                              Export Your Plan (PDF/Excel)
                                            </base-button> -->
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                </div>
                              </div>
                              <!-- shimer -->
                              <div class="row shimmer" v-if="planloader">
                                <div class="col-md-3 mt-3 mb-3">
                                  <span class="box-shimmer w-100 shine"></span>
                                </div>
                                <div class="col-md-9 mt-3 mb-3">
                                  <div class="div-shimmer w-100 pr-4">
                                    <span class="line-shimmer w-100 shine"></span>
                                    <span class="line-shimmer w-100 shine"></span>
                                    <span class="line-shimmer w-100 shine"></span>
                                  </div>
                                </div>

                                <div class="col-md-12 mb-3">
                                  <span class="photo-shimmer shine"></span>
                                  <!-- <span class="photo-shimmer shine"></span> -->
                                </div>

                                <div class="col-md-3 mt-2">
                                  <span class="box-shimmer w-100 shine"></span>
                                </div>
                                <div class="col-md-9 mt-2">
                                  <div class="div-shimmer w-100 pr-4">
                                    <span class="line-shimmer w-100 shine"></span>
                                    <span class="line-shimmer w-100 shine"></span>
                                    <span class="line-shimmer w-100 shine"></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="col-lg-7" v-if="projectplanData.length == 0">
                      <!-- <img src="/img/theme/empty_result.png" class="img-fluid"> -->
                      <h5 class="text-center px-3" v-if="lang=='english'">You have not created any plans yet.</h5>
                      <h5 class="text-center px-3" v-if="lang=='arabic'">لا توجد ملفات أسعار\مشاريع محفوظة سابقا</h5>
                      <div class="text-center mt-3">
                        <router-link class="btn btn-success m-auto" :to="`/smartplanner/${$route.params.user_id}`">
                          <i class="fa fa-send"></i> <span v-if="lang=='english'">Create your first plan</span><span v-if="lang=='arabic'">البدء بمشروعك الأول والحصول على أسعار</span>
                        </router-link>
                      </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- modal  collection window -->
        <modal :show.sync="createcollection">
          <p
            id="modal-title-default"
            slot="header"
            class="modal-title"
          >
            Edit collection
          </p>
          <template>
            <form @submit.prevent>
              <div class="row justify-content-center">
                <div class="col-lg-8 mb-3">
                  <label class="form-control-label">Collection Title</label>
                  <base-input
                    placeholder="Collection Title"
                    v-model="collection.collection_name"
                    addon-left-icon="fa fa-commenting-o"
                    class="form-control-alternative"
                  />
                </div>
                <div class="col-lg-8">
                  <label class="form-control-label">Collection Description</label>
                  <base-input
                    placeholder="'Enter description"
                    addon-left-icon="fa fa-commenting"
                    v-model="collection.collection_description"
                    class="form-control-alternative"
                  />
                </div>
              </div>
              <div class="row justify-content-center mt-4">
                <div class="col-lg-8">
                  <base-button
                    @click="updatecollection()"
                    id="savecollectionbtn"
                    size="lg"
                    type="success"
                    class="float-center"
                  >
                    Update
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
      <!-- view received quotations -->
      <modal :show.sync="viewquotations" modalClasses="modal-lg">
        <h6 slot="header" class="modal-title" id="modal-title-default">
          <span v-if="lang=='english'">All Quotations</span>
          <span v-if="lang=='arabic'">جميع عروض الأسعار</span>
        </h6>

        <template>
          <form @submit.prevent> 
            <div class="mb-3 row">
              <div class="col-md-5">
                <p class="mb-0">
                  <span class="font-weight-bold mr-2">
                    <span v-if="lang=='english'">Quantity:</span>
                    <span class="ml-2" v-if="lang=='arabic'">الكمية:</span>
                  </span> <span>{{quotations.quantity}}</span>
                </p>
                <p>
                  <span class="font-weight-bold mr-2" v-if="lang=='english'">Attachment:</span>
                  <span class="font-weight-bold ml-2" v-if="lang=='arabic'">مرفقات:</span>
                  <span v-for="business_attachments in quotations.business_attachments" :key="'a'+business_attachments">
                    <a v-if="business_attachments" :href="business_attachments" target="_blank"><span v-if="lang=='english'">Download file</span><span v-if="lang=='arabic'">تنزيل الملف</span></a>
                  </span>
                </p>
              </div>
              <div class="col-md-7">
                <p>
                  <span class="font-weight-bold mr-2" v-if="lang=='english'">Remarks:</span><span class="font-weight-bold ml-2" v-if="lang=='arabic'">ملاحظات:</span> <span>{{quotations.business_remark}}</span>
                </p>
              </div>
            </div>
            <div class="container">
              <div class="row justify-content-center" v-if="quotesubmission.length == 0">
                <div class="col-md-4">
                  <img src="/img/theme/empty_quote.png" class="img-fluid">
                  <p class="text-center mt-2" v-if="lang=='english'">You have not received any quotes yet.</p>
                  <p class="text-center mt-2" v-if="lang=='arabic'">لم يتم إستلام عروض أسعار بعد</p>
                </div>
              </div>
              <div class="row shadow-sm mb-2 border px-0 py-3" v-for="quotesub in quotesubmission" :key="quotesub._id">
                <div class="col-md-9">
                  <div target="_blank" class="d-flex">
                    <img v-if="!quotesub.created_by.logo" src="https://nabnee.s3.me-south-1.amazonaws.com/1604657005846logo_ixina.png" class="avatar">
                    <img v-if="quotesub.created_by.logo" :src="quotesub.created_by.logo" class="avatar">
                    
                    <div class="d-inline">
                      <span class="ml-3 h5">{{quotesub.created_by.business_name_english}}</span>
                      <a :href='"https://nabnee.com/business/"+quotesub.created_by.user_id' target="_blank" class="small d-block ml-3 font-weight-400"><span v-if="lang=='english'">View Profile</span><span v-if="lang=='arabic'">عرض الصفحة الشخصية</span></a>
                      <!-- <router-link class="small d-block ml-3 font-weight-400" :to="'/business/'+quotesub.created_by.user_id"><i class="fa fa-eye"></i> <span v-if="lang=='english'">View Profile</span><span v-if="lang=='arabic'">عرض الصفحة الشخصية</span></router-link> -->
                    </div>
                  </div>
                </div>
                <div class="col-md-3 align-self-lg-center text-right">
                  <base-button type="success" size="sm" icon="fa fa-plus" v-if="quotations.selectedsubmission._id!=quotesub._id" @click="selectedquote(quotesub)"><span v-if="lang=='english'">Select</span><span v-if="lang=='arabic'">تحديد</span></base-button>
                  <base-button type="success" size="sm" icon="fa fa-check" v-if="quotations.selectedsubmission._id==quotesub._id" @click="selectedquote(quotesub)"><span v-if="lang=='english'">Selected</span><span v-if="lang=='arabic'">المحدد</span></base-button>
                </div>
                <hr class="col-md-11 my-3">
                <div class="col-md-5">
                  <p class="mb-0 pl-1">
                    <span class="font-weight-bold mr-2" v-if="lang=='english'">Price:</span><span class="font-weight-bold ml-2" v-if="lang=='arabic'">السعر:</span> <span>{{quotesub.price}}</span>
                  </p>
                  <p class="pl-1">
                    <span class="font-weight-bold mr-2" v-if="lang=='english'">Attachment:</span>
                    <span class="font-weight-bold ml-2" v-if="lang=='arabic'">مرفقات:</span>
                    <span class="d-block" v-for="attachments in quotesub.attachments" :key="'b'+attachments"><a v-if="attachments" :href="attachments"><span v-if="lang=='english'">Download file</span><span v-if="lang=='arabic'">تنزيل الملف</span></a></span>
                  </p>
                </div>
                <div class="col-md-7">
                  <p><span class="font-weight-bold mr-2" v-if="lang=='english'">Remarks:</span><span class="font-weight-bold ml-2" v-if="lang=='arabic'">ملاحظات:</span> <span>{{quotesub.remark}}</span></p>
                </div>
              </div>
            </div>
          </form>
        </template>

        <template slot="footer">
            <base-button type="primary" id="updatebtn1" @click="viewquotations = false">
              <span v-if="lang=='english'">Close</span>
              <span v-if="lang=='arabic'">أغلق</span>
            </base-button>
        </template>
      </modal>
      <!-- viewedit project plan -->
      <modal :show.sync="editprojectplan">
          <p
            id="modal-title-default"
            slot="header"
            class="modal-title"
          >
            <span v-if="lang=='english'">Edit Plan</span>
            <span v-if="lang=='arabic'">تحرير الخطة</span>
          </p>
          <template>
            <form @submit.prevent>
              <div class="row justify-content-center">
                <div class="col-lg-8 mb-3">
                  <label class="form-control-label" v-if="lang=='english'">Plan Name</label>
                  <label class="form-control-label" v-if="lang=='arabic'">اسم الخطة</label>
                  <base-input
                    placeholder="Collection Title"
                    v-model="project.projectplan_name"
                    addon-left-icon="fa fa-commenting-o"
                    class="form-control-alternative"
                  />
                </div>
              </div>
              <div class="row justify-content-center mt-4">
                <div class="col-lg-8">
                  <base-button
                    @click="updateprojectplan()"
                    id="saveprojectbtn"
                    size="lg"
                    type="success"
                    class="float-center"
                  >
                    <span v-if="lang=='english'">Update</span>
                    <span v-if="lang=='arabic'">تحديث</span>
                  </base-button>
                </div>
              </div>
            </form>
          </template>

          <template slot="footer">
            <base-button
              type="link"
              class="ml-auto mt--3"
              @click="editprojectplan = false"
            >
              <span v-if="lang=='english'">Close</span><span v-if="lang=='arabic'">أغلق</span>
            </base-button>
          </template>
        </modal>
      </div>
    </div>
</template>

<script>
  import axios from "axios";
  import VueSwal from 'vue-swal';
  import moment from 'moment';
  
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
        json_fields: {
          "Complete name": "name", //Normal field
          Telephone: "phone.mobile", //Supports nested properties
          "Telephone 2": {
            field: "phone.landline",
            //Custom callback function
            callback: value => {
              return `Landline Phone - ${value}`;
            }
          }
        },
        json_data: [{
            name: "Tony Peña",
            city: "New York",
            country: "United States",
            birthdate: "1978-03-15",
            phone: {
              mobile: "1-541-754-3010",
              landline: "(541) 754-3010"
            }
          },
          {
            name: "Thessaloniki",
            city: "Athens",
            country: "Greece",
            birthdate: "1987-11-23",
            phone: {
              mobile: "+1 855 275 5071",
              landline: "(2741) 2621-244"
            }
          }
        ],
        json_meta: [
          [{
            " key ": " charset ",
            " value ": " utf- 8 "
          }]
        ],
        search:'',
        qindex:'',
        deleteitem:false,
        project:{projectplan_name:'',projectplan_id:''},
        editprojectplan:false,
        createcollection:false,
        planloader:true,
        quotations:[],
        quotesubmission:[],
        viewquotations:false,
        projectplanData:[],
        quantitydata:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        offset:0,
        u_offset:0,
        r_offset:0,
        lang:localStorage.getItem('lang') || 'english',
        collection:{
            collection_id:'',
            collection_name:'',
            collection_description:'',
            created_by:'',
        },
        auth : { headers: { 'Content-Type':'application/json',
          'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
        auth1 : { headers: { 'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'nabnee#' + localStorage.getItem('accessToken'),
          '_id':localStorage.getItem('_id')}},
      }
    },
    mounted () {
      if(!localStorage.getItem('accessToken')){
          this.$router.push('/login');
       }
      this.path=process.env.VUE_APP_API_ENDPOINT;
      const querystring = require('querystring');
      console.log(this.auth);
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_projectplan',{"details":{"created_by": sessionStorage.getItem('selected_user__id'),"status" :"approved"}},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.projectplanData=response.data.details;
        this.json_data=[];
        for(let x in this.projectplanData) { 
          this.projectplanData[x].json_data=[]
          for(let y in this.projectplanData[x].projectplan_contracts) { 
            // console.log(this.supportwiseservey);
            this.projectplanData[x].json_data.push({'Material': this.projectplanData[x].projectplan_contracts[y].item_name,'Type': this.projectplanData[x].projectplan_contracts[y].type,'Quantity': this.projectplanData[x].projectplan_contracts[y].quantity,'Price': this.projectplanData[x].projectplan_contracts[y].total,'Remarks': this.projectplanData[x].projectplan_contracts[y].remark,'QuotationFrom': ' '});
            }
            for(let z in this.projectplanData[x].projectplan_quotes){
            // console.log(this.supportwiseservey);
            let jdata={'Material': this.projectplanData[x].projectplan_quotes[z].item_name,'Type': this.projectplanData[x].projectplan_quotes[z].type,'Quantity': this.projectplanData[x].projectplan_quotes[z].quantity};
            if(this.projectplanData[x].projectplan_quotes[z].selectedsubmission.price){
               jdata.Price= this.projectplanData[x].projectplan_quotes[z].selectedsubmission.price;
             }else{
              jdata.Price= '';
              
             }
             if(this.projectplanData[x].projectplan_quotes[z].selectedsubmission.remark){
               jdata.Remarks= this.projectplanData[x].projectplan_quotes[z].selectedsubmission.remark;
             }else{
              jdata.Remarks= '';
             }
             if(this.projectplanData[x].projectplan_quotes[z].selectedsubmission.created_by){
               jdata.QuotationFrom= this.projectplanData[x].projectplan_quotes[z].selectedsubmission.created_by.business_name_english+'('+this.projectplanData[x].projectplan_quotes[z].selectedsubmission.created_by.user_phone+')';
            }else{
              jdata.QuotationFrom= '';
            }
           
            this.projectplanData[x].json_data.push(jdata);
            }
            this.projectplanData[x].json_data.push({'Material':' ','Type':'','Quantity':'','Price':'','Remarks': '','QuotationFrom': 'created from nabnee.com'});
            
            //this.projectplanData[x].json_data=this.json_data;
          }
          this.planloader=false;
        // console.log(this.saveditems);
        }else{
          this.planloader=false;
          this.projectplanData=[];
        }
            
      })
    },
    methods: {
      formateDate(value) {
        if (value) {
          return moment(String(value)).format("dddd, MMMM Do YYYY, HH:mm A");
        }
      },
     getalldata(){
      const querystring = require('querystring');
      console.log(this.auth);
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_projectplan',{"details":{"created_by":sessionStorage.getItem('selected_user__id'),"status" :"approved"}},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.projectplanData=response.data.details;
        this.json_data=[];
        for(let x in  this.projectplanData) { 
          this.projectplanData[x].json_data=[]
          for(let y in  this.projectplanData[x].projectplan_contracts) { 
            console.log(x);
            // console.log(this.supportwiseservey);
            this.projectplanData[x].json_data.push({'Material': this.projectplanData[x].projectplan_contracts[y].item_name,'Type': this.projectplanData[x].projectplan_contracts[y].type,'Quantity': this.projectplanData[x].projectplan_contracts[y].quantity,'Price': this.projectplanData[x].projectplan_contracts[y].total,'Remarks': this.projectplanData[x].projectplan_contracts[y].remark,'QuotationFrom': ' '});
            }
            for(let z in  this.projectplanData[x].projectplan_quotes){  
            console.log(x);
            // console.log(this.supportwiseservey);
            let jdata={'Material': this.projectplanData[x].projectplan_quotes[z].item_name,'Type': this.projectplanData[x].projectplan_quotes[z].type,'Quantity': this.projectplanData[x].projectplan_quotes[z].quantity};
            if(this.projectplanData[x].projectplan_quotes[z].selectedsubmission.price){
               jdata.Price= this.projectplanData[x].projectplan_quotes[z].selectedsubmission.price;
             }else{
              jdata.Price= '';
              
             }
             if(this.projectplanData[x].projectplan_quotes[z].selectedsubmission.remark){
               jdata.Remarks= this.projectplanData[x].projectplan_quotes[z].selectedsubmission.remark;
             }else{
              jdata.Remarks= '';
             }
             if(this.projectplanData[x].projectplan_quotes[z].selectedsubmission.created_by){
               jdata.QuotationFrom= this.projectplanData[x].projectplan_quotes[z].selectedsubmission.created_by.business_name_english+'('+this.projectplanData[x].projectplan_quotes[z].selectedsubmission.created_by.user_phone+')';
            }else{
              jdata.QuotationFrom= '';
            }
           
            this.projectplanData[x].json_data.push(jdata);
            }

            //this.projectplanData[x].json_data=this.json_data;
          }
          this.planloader=false;
        // console.log(this.saveditems);
        }else{
          this.planloader=false;
          this.projectplanData=[];
        }
            
      })

     },
     deleteprojectplan(row) {
      console.log(row);
      const querystring = require('querystring');
        

      if(this.lang=='english'){
        swal({
            title: 'Delete this plan?',
            text: "This action is not reversible.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_projectplan',querystring.stringify({ projectplan_id:row.projectplan_id}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'Your plan has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result);
              this.getalldata();
             })
            })
           }
        });

      }else{

        swal({
            title: 'هل تود الحذف ؟',
            text: "هذه العملية تؤدي لحذف كامل.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_projectplan',querystring.stringify({ projectplan_id:row.projectplan_id}),this.auth1)
          .then(response => {
            console.log(response);
            swal({
              title:'تم الحذف',
              text: '',
              icon:'success',
             }).then((result) => {
              console.log(result);
              this.getalldata();
             })
            })
           }
        });

      }
    },
    deletematerial(row,position) {
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
            let _this=this;
            swal({
              title:'Deleted!',
              text: 'Your material has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result)
              _this.materialData.splice(position, 1);
              
            })
           }
        });
    },
    deletecontract(row,position) {
      console.log(row);
      const querystring = require('querystring');
        

      if(this.lang=='english'){
        swal({
            title: 'Delete this entry?',
            text: "You can re-add this material from above table.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_contract',querystring.stringify({ contract_id:row.contract_id}),this.auth1)
          .then(response => {
            let _this=this;
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'Your entry has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result)
              window.location.reload();
              // let index = _this.materialData.findIndex(x => x._id ===row.materiallist_id._id);
              // //window.location.reload()
              // console.log(index);
              // _this.contractData.splice(position, 1);
              // _this.materialData[index].readonly=true;
              
            })
            })
           }
        });

      }else{

        swal({
            title: 'حذف هذا الإدخال؟',
            text: "يمكنك إعادة إضافة هذا المقال من الجدول أعلاه.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_contract',querystring.stringify({ contract_id:row.contract_id}),this.auth1)
          .then(response => {
            let _this=this;
            console.log(response);
            swal({
              title:'تم الحذف',
              text: '',
              icon:'success',
             }).then((result) => {
              console.log(result)
              window.location.reload();
              // let index = _this.materialData.findIndex(x => x._id ===row.materiallist_id._id);
              // //window.location.reload()
              // console.log(index);
              // _this.contractData.splice(position, 1);
              // _this.materialData[index].readonly=true;
              
            })
            })
           }
        });

      }
    },
    deletequote(row) {
      console.log(row);
      const querystring = require('querystring');
        swal({
            title: 'Delete this quote?',
            text: "This action is not reversible.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_quote',querystring.stringify({ quote_id:row.quote_id}),this.auth1)
          .then(response => {
            let _this=this;
            console.log(response);
            swal({
              title:'Deleted!',
              text: 'Your quote has been deleted.',
              icon:'success',
             }).then((result) => {
              console.log(result)
              // let index = _this.materialData.findIndex(x => x._id ===row.materiallist_id._id);
              //window.location.reload()
              //console.log(index);
              // _this.quoteData.splice(position, 1);
              // _this.materialData[index].readonly=true;
              window.location.reload();
              
            })
            })
           }
        });
    },
    editcollection(row){
        console.log(row);
        this.collection.collection_id=row.collection_id;
        this.collection.collection_name=row.collection_name;
        this.collection.collection_description=row.collection_description;
        this.collection.created_by=row.created_by._id;
        this.createcollection=true;
    },
    updatecollection() {
      console.log(this.collection);
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_collection',querystring.stringify({collection_id:this.collection.collection_id,collection_name:this.collection.collection_name,collection_description:this.collection.collection_description,created_by:this.collection.created_by}),this.auth1)
      .then(response => {
        let ref=this;
        console.log(response);
        this.message=response.data.message;
        document.getElementById("savecollectionbtn").classList.remove('btn-primary');
        document.getElementById("savecollectionbtn").classList.add('btn-success');
        document.getElementById("savecollectionbtn").innerHTML='Updated';
        setTimeout(function(){
        document.getElementById("savecollectionbtn").classList.remove('btn-success');
        document.getElementById("savecollectionbtn").classList.add('btn-primary');
        document.getElementById("savecollectionbtn").innerHTML="Updated";
        ref.createcollection = false;
        window.location.reload();
      }, 2000);
      })

    },
    removecollection(row){
      console.log(row);
      const querystring = require('querystring');
        swal({
            title: 'Do you want to delete?',
            text: "This action is not reversible.",
            icon: 'warning',
            buttons: {cancel: true,confirm: true,}
        }).then((result) => { // <--
          if (result) {
            console.log('result cloud',result)
            axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_collection',querystring.stringify({collection_id:row.collection_id,created_by: sessionStorage.getItem('selected_user__id')}),this.auth1)
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
     openallquotations(row,x){
      console.log(row)
      this.quotations=row;
      this.qindex=x;
      this.quotesubmission=[];
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_quotesubmission',{"details":{"quote_id":row._id,"status" :"approved"}},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.quotesubmission=response.data.details;
        this.planloader=false;
        // console.log(this.saveditems);
        }
            
      })
      this.viewquotations=true;
      },
      selectedquote(row){
      console.log(row)
      axios.post(process.env.VUE_APP_API_ENDPOINT+'update_quote',{quote_id:this.quotations.quote_id,selectedsubmission:row._id},this.auth)
      .then(response => {
       console.log(response);
        this.getalldata();
        this.viewquotations=false;
      })
     
      },
      editplan(row){
      console.log(row)
      this.project=row;
      this.editprojectplan=true;
      },
      updateprojectplan() {
      console.log(this.project);
      const querystring = require('querystring');
       axios.post(process.env.VUE_APP_API_ENDPOINT+'update_projectplan',querystring.stringify({projectplan_id:this.project.projectplan_id,projectplan_name:this.project.projectplan_name}),this.auth1)
      .then(response => {
        let ref=this;
        console.log(response);
        this.message=response.data.message;
        document.getElementById("saveprojectbtn").classList.remove('btn-primary');
        document.getElementById("saveprojectbtn").classList.add('btn-success');
        document.getElementById("saveprojectbtn").innerHTML='Updated';
        setTimeout(function(){
        document.getElementById("saveprojectbtn").classList.remove('btn-success');
        document.getElementById("saveprojectbtn").classList.add('btn-primary');
        document.getElementById("saveprojectbtn").innerHTML="Updated";
        ref.editprojectplan = false;
        window.location.reload();
      }, 2000);
      })

     },

    }
  };
</script>
<style>
.business_description {
  display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height:68px;
}
/*.collection-items:nth-child(1) {
    display: none;
}*/

</style>
