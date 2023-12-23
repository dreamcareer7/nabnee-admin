<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="nabnee">
      <div class="position-relative">
        <!-- shape Hero -->
        <section class="section-shaped my-0">
            <div class="shape shape-skew bg-white">
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
                            <h1 v-if="lang=='english'" class="display-3">Smart Planner
                                <span>Plan for your users' dream home</span>
                            </h1>
                            <h1 v-if="lang=='arabic'" class="display-3 ">المُخَطِّط الذكي
                                <span>خَطِّط ماليا لبناء بيتك. احصل على عروض أسعار</span>
                            </h1>
                            <router-link :to="`/plans/${this.$route.params.user_id}`"><span v-if="lang=='english'">Saved Plans</span><span v-if="lang=='arabic'">عرض ملفات الأسعار المحفوظة</span> <i class="fa fa-chevron-right"></i></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 1st Hero Variation -->
      </div>
      <section class="section section-lg pt-lg-0 mt-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-9 col-8" id="initialdiv">
              <base-input
                  v-model="project_name"
                  placeholder="Name the project"
                  class="mb-0"
                  v-if="lang=='english'"
              />
              <base-input
                  v-model="project_name"
                  placeholder="اسم المشروع"
                  class="mb-0"
                  v-if="lang=='arabic'"
              />
              <span class="danger" v-if="projecterror"><span v-if="lang=='english'">project name required</span><span v-if="lang=='arabic'">اسم المشروع مطلوب</span></span>
            </div>
            <div class="col-md-3 col-4" id="initialdiv1">
              <base-button
                id="createproject"
                type="primary"
                icon="fa fa-send"
                class="float-center h-100"
                @click="startplaning()"
                block
              >
                <span v-if="lang=='english'">Start <span class="d-none d-md-inline">Planning</span></span>
                <span v-if="lang=='arabic'">ابدء <span class="d-none d-md-inline">التخطيط</span></span>
              </base-button>
            </div>
            <div class="col-md-12 d-none" id="createplan">
              <base-button
                type="primary"
                icon="fa fa-plus"
                class="float-center h-100 no-outline"
                outline
                @click="createnewplan()"
              >
                <span v-if="lang=='english'">Create New Plan</span> <span v-if="lang=='arabic'">قم بإنشاء خطة جديدة</span> 
              </base-button>
            </div>
            <div class="col-md-12 mt-2 d-none" id="plandetails">
              <div class="card shadow mt-3">
                <div class="card-header border-0">
                  <div class="row align-items-center">
                    <div class="col-10">
                      <h5 class="mb-0 font-weight-bold">
                        <span v-if="lang=='english'">Add Details</span><span v-if="lang=='arabic'">أضف التفاصيل</span>
                      </h5>
                    </div>
                    <!-- <div class="col-4 text-right">
                        <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                    </div> -->
                  </div>
                </div>
                <div class="table-responsive">
                  <base-table
                      thead-classes="thead-light"
                      :data="materialData"
                    >
                      <template slot="columns">
                        <th></th>
                        <th><span v-if="lang=='english'">Item</span><span v-if="lang=='arabic'">بند</span></th>
                        <th></th>
                        <th></th>
                        <th><span v-if="lang=='english'">type</span><span v-if="lang=='arabic'">اكتب</span></th>
                        <th><span v-if="lang=='english'">Quantity</span><span v-if="lang=='arabic'">كمية</span></th>
                        <!-- <th>Rate</th> -->
                        <th><span v-if="lang=='english'">Total</span><span v-if="lang=='arabic'">مجموع</span></th>
                        <th><span v-if="lang=='english'">Remark</span><span v-if="lang=='arabic'">ملاحظة</span></th>
                      </template>
                      <template
                        slot-scope="{row,index}"
                      >
                        <th class="pr-0 align-middle">
                          <base-button
                            iconOnly
                            type="danger"
                            size="sm"
                            outline
                            icon="fa fa-times"
                            class="no-outline"
                            @click="deletematerial(row,index)"
                            >
                          </base-button>
                        </th>
                        <th
                          class="align-middle text-capitalize pl-2"
                          scope="row"
                        >
                          <span class="pr-2 d-none">{{index+1}}.</span>
                          <span class="mb-0 font-weight-bold" v-if="lang=='english'">{{row.item_name}}</span>
                          <span class="mb-0 font-weight-bold" v-if="lang=='arabic'">{{row.item_name_ar}}</span>
                        </th>
                        <th class="align-middle">
                          <base-button
                            type="success"
                            :id="'c'+row._id"
                            size="sm"
                            icon="ni ni-briefcase-24"
                            @click="startcontract(index)"
                            >
                             <span v-if="lang=='english'">By Contractor</span>
                             <span v-if="lang=='arabic'">على المقاول</span>
                          </base-button>
                        </th>
                        <th class="align-middle">
                          <base-button
                            type="success"
                            :id="'q'+row._id"
                            size="sm"
                            icon="ni ni-send"
                            @click="openstartquote(row,index)"
                            >
                             <span v-if="lang=='english'">Get quote</span>
                             <span v-if="lang=='arabic'">طلب عروض أسعار</span>
                          </base-button>
                        </th>
                        <th class="align-middle">
                          <span class="mb-0 font-weight-400" v-if="row.type"> <span v-if="lang=='english'">{{row.type}}</span><span v-if="lang=='arabic'">{{row.type_ar}}</span></span>
                        </th>
                        <th class="align-middle">
                          <span class="mb-0 font-weight-400">
                            <select
                              v-model="row.userquantity"
                              :disabled="row.readonly"
                              aria-describedby="addon-right addon-left"
                              addon-left-icon="ni ni-bullet-list-67"
                              class="form-control form-control-alternative"
                              autocomplete="off"
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
                          <span class="mb-0 font-weight-400">₹ {{row.rate}}</span>
                        </th> -->
                        <th class="align-middle">
                          <span class="mb-0 font-weight-400 text-capitalize" :id="'total'+index"><base-input
                                :disabled="row.readonly"
                                v-model="row.total"
                                type="Number"
                                placeholder="Amount e.g, 1400"
                                class="mb-0"
                            /></span>
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
                      </template>
                    </base-table>
                </div>
              </div>
              <div class="col-md-12 col-3 mb-5 mt-3 px-0 text-right">
                <base-button
                  id="saveplan"
                  type="primary"
                  icon="fa fa-check"
                  class="float-center h-100"
                  @click="saveplan()"
                >
                  <span v-if="lang=='english'">Save Plan</span><span v-if="lang=='arabic'">حفظ</span>
                </base-button>
              </div>
              <div class="card shadow d-none" id="savedplandetails">
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
                       {{projectplan.projectplan_name}}
                      </h5>
                    </div>
                    <div class="col pl-2 pl-md-3 text-right">
                      
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
                        <div class="mb-3" id="planquotes">
                          <div class="card">
                            <div class="card-header bg-white border-0">
                              <div class="row align-items-center">
                                <div class="col-10">
                                  <p class="mb-0 font-weight-bold">
                                    <span v-if="lang=='english'">Quotation Requests</span><span v-if="lang=='arabic'">طلبات الاقتباس</span>
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
                                  :data="quoteData"
                                >
                                  <template slot="columns">
                                    <th><span v-if="lang=='english'">Item</span><span v-if="lang=='arabic'">بند</span></th>
                                    <th><span v-if="lang=='english'">Type x Qty.</span><span v-if="lang=='arabic'">اكتب x الكمية</span></th>
                                    <th><span v-if="lang=='english'">Price</span><span v-if="lang=='arabic'">السعر</span></th>
                                    <th><span v-if="lang=='english'">Attachment</span><span v-if="lang=='arabic'">المرفق</span></th>
                                    <th><span v-if="lang=='english'">Details</span><span v-if="lang=='arabic'">تفاصيل</span></th>
                                    <th><span v-if="lang=='english'">View Quotations</span><span v-if="lang=='arabic'">عرض الاقتباسات</span></th>
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
                                      <span class="pr-2 d-none">{{index+1}}.</span><span class="mb-0 font-weight-bold" v-if="row.item_name"><span v-if="lang=='english'"> {{row.item_name}}</span><span v-if="lang=='arabic'"> {{row.item_name_ar}}</span></span>
                                    </th>
                                    <th class="align-middle">
                                      <span class="mb-0 font-weight-400"><span v-if="lang=='english'">{{row.type}}</span><span v-if="lang=='arabic'">{{row.type_ar}}</span> x {{row.quantity}}</span>
                                    </th>
                                    <th>
                                      OMR {{row.quantity*row.rate}}
                                    </th>
                                    <th class="align-middle">
                                      <span class="mb-0 font-weight-400 text-primary" v-for="business_attachments in row.business_attachments" :key="business_attachments">
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
                                    <th>
                                      <base-button
                                        iconOnly
                                        type="danger"
                                        size="sm"
                                        outline
                                        icon="fa fa-times"
                                        class="no-outline"
                                        @click="deletequote(row,index)"
                                        >
                                      </base-button>
                                    </th>
                                  </template>
                                </base-table>
                            </div>
                          </div>
                        </div>
                        <div class="mb-3 d-none" id="plancontract">
                          <div class="card">
                            <div class="card-header bg-white border-0">
                              <div class="row align-items-center">
                                <div class="col-10">
                                  <p class="mb-0 font-weight-bold">
                                    By Contract
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
                                  :data="contractData"
                                >
                                  <template slot="columns">
                                    <th><span v-if="lang=='english'">Item</span><span v-if="lang=='arabic'">بند</span></th>
                                    <th><span v-if="lang=='english'">Type x Qty.</span><span v-if="lang=='arabic'">اكتب x الكمية</span></th>
                                    <th><span v-if="lang=='english'">Price</span><span v-if="lang=='arabic'">السعر</span></th>
                                    <!-- <th>Total</th> -->
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
                                      <span class="mb-0 font-weight-400" v-if="row.type"><span v-if="lang=='english'">{{row.type}}</span><span v-if="lang=='arabic'">{{row.type_ar}}</span> x {{row.quantity}}</span>
                                    </th>
                                    <!-- <th class="align-middle">
                                      <span class="mb-0 font-weight-400">₹ {{row.rate}}</span>
                                    </th> -->
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
                                        @click="deletecontract(row,index)"
                                        >
                                      </base-button>
                                    </th>
                                  </template>
                                </base-table>
                            </div>
                          </div>
                          <div class="col-md-12 col-3 px-0 mt-3">
                            <!-- <download-csv
                                :data   = "json_data"
                                class   = "btn btn-block btn-lg btn-success export-excel-wrapper">
                                <span v-if="lang=='english'">Download Data</span><span v-if="lang=='arabic'">تحميل البيانات</span>
                                
                            </download-csv> -->
                            <router-link :to="`/plans/${this.$route.params.user_id}`" class="btn btn-block btn-success"><span v-if="lang=='english'">View Saved Plans</span><span v-if="lang=='arabic'">View saved price files</span> <i class="fa fa-chevron-right"></i></router-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- shimer -->
                  <div class="row shimmer d-none">
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
        </div>
        <!-- <base-alert type="success" class="alert-confirmation">
          <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
          <span class="alert-inner--text"><strong>Removed!</strong> If you did this action by mistake, you can undo!</span>
          <base-button size="sm" type="white" outline class="font-weight-bold no-outline position-absolute text-right" style="right: 30px;" icon="fa fa-repeat">UNDO</base-button>
        </base-alert> -->
      </section>

      <!-- request quotation -->
      <modal :show.sync="startquote">
        <h6 slot="header" class="modal-title" id="modal-title-default">
          <span v-if="lang=='english'">Request Quotation for {{material_name}}</span>
          <span class="arabic" v-if="lang=='arabic'">طلب تسعيرة لـ {{material_name}}</span>
        </h6>

        <template>
          <form @submit.prevent> 
            <div class="row">
              <div class="col-lg-12 mb-3">
                <label class="form-control-label" v-if="lang=='english'">Quantity</label>
                <label class="form-control-label" v-if="lang=='arabic'">كمية</label>
                <base-input
                    v-model="quote.quantity"
                    placeholder="quantity"
                    input-classes=""
                    class="mb-0"
                  />
                </div>
              <div class="col-md-12">
                <label class="form-control-label" v-if="lang=='english'">Details of requirement</label>
                <label class="form-control-label" v-if="lang=='arabic'">تفاصيل المتطلبات</label>
                <textarea
                  v-model="quote.remark"
                  aria-describedby="addon-right addon-left"
                  class="form-control"
                  autocomplete="off"
                  rows="4"
                />
              </div>
              <div class="col-lg-12 mt-2">
                <label class="form-control-label" v-if="lang=='english'">Attach File</label>
                <label class="form-control-label" v-if="lang=='arabic'">أرفق ملف</label>
                <input
                  type="file"
                  ref="file"
                  id="imagefile"
                  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                  placeholder="User DP"
                  class="form-control form-control-alternative"
                  multiple="multiple"
                  @change="hadleimage($event)"
                />
                <base-progress type="success" :value="uploadPercentage" label="File uploaded"></base-progress>
              </div>
              <div class="col-md-12">
                <base-button type="success" id="sendquote" icon="fa fa-send" @click="sendquery()"><span v-if="lang=='english'">Send query</span><span v-if="lang=='arabic'">ارسال الطلب</span></base-button>
              </div>
            </div>
          </form>
        </template>

        <template slot="footer">
            <base-button type="secondary" id="updatebtn1" @click="startquote = false"><span v-if="lang=='arabic'">اغلاق</span><span v-if="lang=='english'">Close</span>
            </base-button>
        </template>
      </modal>

      <!-- view received quotations -->
      <modal :show.sync="viewquotations" modalClasses="modal-lg">
        <h6 slot="header" class="modal-title" id="modal-title-default">
          <span v-if="lang=='english'">All Quotations</span>
          <span v-if="lang=='arabic'">كل الاقتباسات</span>
        </h6>

        <template>
          <form @submit.prevent> 
            <div class="mb-3 row">
              <div class="col-md-5">
                <p class="mb-0"><span class="font-weight-bold mr-2">Quantity:</span> <span>{{quotations.quantity}}</span></p><p><span class="font-weight-bold mr-2">Attachment:</span> <span v-for="business_attachments in quotations.business_attachments" :key="business_attachments"><a v-if="business_attachments" :href="business_attachments" target="_blank">Download file</a></span></p>
              </div>
              <div class="col-md-7">
                <p><span class="font-weight-bold mr-2">Remarks:</span> <span>{{quotations.business_remark}}</span></p>
              </div>
            </div>
            <div class="card shadow">
              <div class="row mb-2 px-3 py-3" v-for="quotesub in quotesubmission" :key="quotesub._id">
                <div class="col-md-9">
                  <a href="#" target="_blank" class="d-flex">
                    <img v-if="!quotesub.created_by.logo" src="https://nabnee.s3.me-south-1.amazonaws.com/1604657005846logo_ixina.png" class="avatar">
                    <img v-if="quotesub.created_by.logo" :src="quotesub.created_by.logo" class="avatar">
                    
                    <div class="d-inline">
                      <span class="ml-3 h5">{{quotesub.created_by.business_name_english}}</span>
                      <span class="small d-block ml-3 font-weight-400">View Profile</span>
                    </div>
                  </a>
                </div>
                <div class="col-md-3 align-self-lg-center text-right">
                  <base-button type="success" size="sm" icon="fa fa-plus" @click="selectedquote(quotesub)">Select</base-button>
                </div>
                <hr class="col-md-11 my-3">
                <div class="col-md-5">
                  <p class="mb-0 pl-1"><span class="font-weight-bold mr-2">Price:</span> <span>{{quotesub.price}}</span></p>
                  <p class="pl-1"><span class="font-weight-bold mr-2">Attachment:</span> <span v-for="attachments in quotesub.attachments" :key="attachments"><a v-if="attachments" :href="attachments">Download file</a></span></p>
                </div>
                <div class="col-md-7">
                  <p><span class="font-weight-bold mr-2">Remarks:</span> <span>{{quotesub.remark}}</span></p>
                </div>
              </div>
            </div>
          </form>
        </template>

        <template slot="footer">
            <base-button type="primary" id="updatebtn1" @click="viewquotations = false"><span v-if="lang=='arabic'">اغلاق</span><span v-if="lang=='english'">Close</span>
            </base-button>
        </template>
      </modal>
      
      <!-- request count reached to limit -->
      <modal :show.sync="openRequestLimitModal" modalClasses="modal-lg">
        <h6 class="modal-title" id="modal-title-default">
          <span v-if="lang=='english'">This user's request count reached to limit</span>
          <span v-if="lang=='arabic'">وصل عدد طلبك إلى الحد. يرجى الاتصال contact@nabnee.com</span>
        </h6>

        <template slot="footer">
          <base-button type="primary" id="updatebtn1" @click="openRequestLimitModal = false">
            <span v-if="lang=='arabic'">اغلاق</span><span v-if="lang=='english'">Close</span>
          </base-button>
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
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
        json_data: [],
        json_meta: [
          [{
            " key ": " charset ",
            " value ": " utf- 8 "
          }]
        ],
        search:'',
        searchData:[],
        categories: [],
        subcategories:[],
        material_name:'',
        project_name:'',
        contracts:[],
        imagearr:[],
        qindex:'',
        quotesubmission:[],
        quotes:[],
        contractData:[],
        quoteData:[],
        quotations:{},
        projecterror:false,
        startquote:false,
        projectplan:{},
        viewquotations:false,
        uploadPercentage:0,
        brands:[],
        deleteitem:false,
        blogData: [],
        quantitydata:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        materialData: [],
        path:'',
        reportedcaption: [],
        offset:0,
        u_offset:0,
        r_offset:0,
        modals: {
          editdesign:false,
          stats:false,
          item_name:'',
          item_name_ar:'',
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
          item_tags:'',
          optype:'Add',
          item_img:'',
          item_mentions:'',
          item_rate:'',
          created_by: '',
          status:''
        },
        lang: localStorage.getItem('lang') || 'english',
        model:{
          item_name:'',
          item_name_ar:'',
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
          item_tags:'',
          optype:'Add',
          item_img:'',
          item_mentions:'',
          item_rate:'',
          created_by: '',
          status:''
        },
        quote: {
          item_name:'',
          item_name_ar:'',
          attachment:'',
          quantity:1,
          details:'',
          item_type:'Design',
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
          row:{},
        },
        status: {
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
        openRequestLimitModal: false,
      }
    },
    mounted () {
      this.path = process.env.VUE_APP_API_ENDPOINT;
      axios.post(process.env.VUE_APP_API_ENDPOINT + 'read_materiallist', {"details": {}, "offset": "0"})
        .then(response => {
          console.log(response);
          if (response.data.details){
            let materialData = response.data.details;
            for (let x in materialData) {
              let object = materialData[x];
              object.userquantity = 1;
              object.remark = "";
              object.readonly = true;
              object.projecttype = "";
              this.materialData.push(object);
            }
            console.log(this.materialData);
          }
        });
    },
    methods: {
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
    deletecontract(row,position) {
      console.log(row);
      const querystring = require('querystring');
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
              let index = _this.materialData.findIndex(x => x._id ===row.materiallist_id._id);
              //window.location.reload()
              console.log(index);
              _this.contractData.splice(position, 1);
              _this.materialData[index].readonly=true;
              
            })
            })
           }
        });
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
    deletequote(row,position) {
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
              _this.quoteData.splice(position, 1);
              // _this.materialData[index].readonly=true;
              
            })
            })
           }
        });
    },
    // gettotalamount(id){
    //   this.materialData[id].total=this.materialData[id].userquantity*this.materialData[id].rate;
    // },
    startcontract(id){
      this.materialData[id].projecttype="contract";
      if(this.materialData[id].readonly){
        this.materialData[id].readonly=false;
      }else{
        this.materialData[id].readonly=true;
      }
      
    },
    startquotes(id){
      this.materialData[id].projecttype="quote";
      if(this.materialData[id].readonly){
        this.materialData[id].readonly=false;
      }else{
        this.materialData[id].readonly=true;
      }
    },
    openDesign: function(tcdata) {
      const querystring = require('querystring');
       console.log(tcdata);
       this.modals.editdesign = true;
       this.modals.item_name=tcdata.item_name;
       this.modals.item_name_ar=tcdata.item_name_ar;
       this.modals.item_description_ar=tcdata.item_description_ar;
       this.modals.item_description=tcdata.item_description;
       this.modals.item_visibility=tcdata.item_visibility;
       this.modals.item_category=tcdata.item_category._id+'#'+tcdata.item_category.inventory_category_name;

      //  axios.post(process.env.VUE_APP_API_ENDPOINT+'subcategories',querystring.stringify({ category_id:tcdata.category._id,token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdHVzZXIiLCJpYXQiOjE1NDk4OTE1ODQsImV4cCI6MTU4MTQyNzU4NH0.LXjF7LPkGplQj6nWnEgmdyK7GNceoiihf4mKoAmQQqc' }),this.auth)
      // .then(response => {
      //   console.log(response);
      //   if(response.data.subcategory_data){
      //   this.item_subcategory=response.data.subcategory_data;
      //   this.model.category_name=response.data.subcategory_data[0].category_name;
      //    }   
      //   })
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
       // if(tcdata.sub_category[0]){
       //  this.modals.sub_category={'sub_id':tcdata.sub_category[0].subcat_id,'name':tcdata.sub_category_name[0]};
       //  //this.modals.sub_category=tcdata.sub_category[0].subcat_id;
       //  this.model.sub_category_name=tcdata.sub_category_name[0];
       // }
       this.modals.item_id=tcdata.item_id;

       console.log(this.modals);

    },
    startplaning(){
      this.projecterror=false;
      this.materialData = this.materialData.filter(item => item.item_name.includes(this.project_name));
      if (localStorage.getItem('accessToken')) {
        if (this.project_name) {
            axios.post(process.env.VUE_APP_API_ENDPOINT+'create_projectplan',{projectplan_name :this.project_name,projectplan_name_ar:"",created_by: sessionStorage.getItem('selected_user__id'),status:"approved"},this.auth)
          .then(response => { 
            this.projectplan=response.data.details;
          })
            document.getElementById("plandetails").classList.remove('d-none');
            document.getElementById("createplan").classList.remove('d-none');
            document.getElementById("initialdiv").classList.add('d-none');
            document.getElementById("initialdiv1").classList.add('d-none');
            
          }else{
            this.projecterror=true;
          }
       } else {
        localStorage.setItem('url',window.location.pathname);
        this.$router.push('/login');
       }
    },
    createnewplan(){
      this.project_name="";
      document.getElementById("plandetails").classList.add('d-none');
        document.getElementById("createplan").classList.add('d-none');
        document.getElementById("initialdiv").classList.remove('d-none');
        document.getElementById("initialdiv1").classList.remove('d-none');
      },
    saveplan(){
      if(this.projectplan){
        document.getElementById("saveplan").innerHTML="Loading...";
        this.contracts=[];
        
        axios.post(process.env.VUE_APP_API_ENDPOINT+'delete_all_contractbyproject_id',{projectplan_id :this.projectplan._id},this.auth).then(response12 => { 
                console.log(response12);
                  for (let x in this.materialData) {
                      if(!this.materialData[x].readonly){
                           axios.post(process.env.VUE_APP_API_ENDPOINT+'create_contract',{materiallist_id :this.materialData[x]._id,projectplan_id :this.projectplan._id,item_name :this.materialData[x].item_name,item_name_ar :this.materialData[x].item_name_ar,type :this.materialData[x].type,rate :this.materialData[x].rate,quantity :this.materialData[x].userquantity,unit :this.materialData[x].unit,total :this.materialData[x].total,remark :this.materialData[x].remark,created_by:localStorage.getItem('_id'),status:"approved"},this.auth).then(response1 => { 
                            console.log(response1);
                              if(response1.data.success){
                                this.contracts.push(response1.data.details._id);
                              }
                            })
                       }
                      }
                })
        
                  let _this=this;
                  document.getElementById("saveplan").classList.remove('btn-primary');
                  document.getElementById("saveplan").classList.add('btn-success');
                  document.getElementById("saveplan").innerHTML="Data saved";
                  setTimeout(function(){
                  document.getElementById("saveplan").classList.remove('btn-success');
                  document.getElementById("saveplan").classList.add('btn-primary');
                  
                   
                    axios.post(process.env.VUE_APP_API_ENDPOINT+'update_projectplan',{projectplan_id :_this.projectplan.projectplan_id,projectplan_contracts:_this.contracts,created_by:localStorage.getItem('_id'),status:"approved"},_this.auth)
                      .then(response2 => {})
                    axios.post(process.env.VUE_APP_API_ENDPOINT+'read_contract',{"details":{"projectplan_id":_this.projectplan._id,"status":"approved"}},_this.auth).then(response3 => {
                          _this.contractData=response3.data.details;
                           for(let x in  _this.contractData) { 
                            console.log(x);
                            // console.log(this.supportwiseservey);
                            _this.json_data.push({'Material': _this.contractData[x].item_name,'Type': _this.contractData[x].type,'Quantity': _this.contractData[x].quantity,'Price': _this.contractData[x].total,'Remarks': _this.contractData[x].remark,'Quotation From': _this.contractData[x].created_by.business_name_english+'('+_this.contractData[x].created_by.user_phone+')'});
                            }
                             console.log(_this.json_data);
                      })
                    document.getElementById("saveplan").innerHTML="Save Plan";
                }, 3000);


           
        
        document.getElementById("savedplandetails").classList.remove('d-none');
        document.getElementById("plancontract").classList.remove('d-none');
      }else{
        this.projecterror=true;
      }
      
    },
  async hadleimage(event) {
            // Reference to the DOM input element
            console.log(event);
            console.log(this.$refs.file.files);
            this.uploadPercentage=0;
              for( var i = 0; i < this.$refs.file.files.length; i++ ){
                  let file = this.$refs.file.files[i];
                  if(file.size < 10000000){
                  console.log(file);
                  await this.upload(file,'add');
                  }else{
                    swal({
                      title:'File to large!',
                      text: 'Your file is larger than 10 MB. Please upload images which are less than 10 MB.',
                      icon:'warning',
                     }).then((result) => {
                       this.quotes.attachment=[]
                    })

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
          this.quote.attachment=this.imagearr;
          console.log(this.quote.attachment);
          //document.getElementById('addimage').value= null;
        }else{
          // this.editimagearr=this.modals.item_img;
          // this.editimagearr.push(response.data.imageUrl);
          // this.modals.item_img=this.editimagearr;
          // console.log(this.modals.item_img);
          // document.getElementById('editimage').value= null;
        }
        
     })

    },
    // hadleimage: function(event) {
    //         this.uploadPercentage =0;
    //         console.log(event.target);
    //         // Reference to the DOM input element
    //         var input = event.target;
    //         console.log(input.files[0].size);
    //         if(input.files[0].size < 5000000){
    //         // Ensure that you have a file before attempting to read it
    //         if (input.files && input.files[0]) {
    //             // create a new FileReader to read this image and convert to base64 format
    //             var reader = new FileReader();
    //             // Define a callback function to run, when FileReader finishes its job
    //             reader.onload = (e) => {
    //                 // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
    //                 // Read image as base64 and set to imageData
    //                 this.imageData = e.target.result;
    //             }
    //             // Start the reader job - read file as a data url (base64 format)
    //             reader.readAsDataURL(input.files[0]);

    //             this.selectedimage=input.files[0];
    //         }

    //         const fd= new FormData();
    //         fd.append('image',this.selectedimage,this.selectedimage.name);
    //         axios.post(process.env.VUE_APP_API_ENDPOINT+'image-upload',fd,{ headers: {'Content-Type': 'multipart/form-data'},onUploadProgress: function( progressEvent ) { this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) ); console.log(this.uploadPercentage)}.bind(this)})
    //         .then(response => {
    //           console.log(response);
    //           this.quote.attachment=response.data.imageUrl;
    //         })

    //       }else{

    //         swal({
    //           title:'File to large!',
    //           text: 'Your file is larger than 5 MB. Please upload images which are less than 5 MB.',
    //           icon:'warning',
    //          }).then((result) => {
               
    //         })

    //       }

    //    },
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
    openstartquote(row,id){
      console.log(row)
      if(this.materialData[id].readonly){
        // this.materialData[id].readonly=false;
      }else{
        this.materialData[id].readonly=true;
      }
      this.quote.row=row;
      this.material_name=row.item_name;
      this.quote.quantity=1;
      this.quote.remark='';
      this.uploadPercentage=0;
      document.getElementById("sendquote").classList.remove('btn-primary');
      document.getElementById("sendquote").classList.add('btn-success');
      document.getElementById('sendquote').innerHTML='Send query';
      document.getElementById('imagefile').value=null;
      this.startquote=true;

    },
    async sendquery(){
      const user_id = this.$route.params.user_id;
      let _this = this;
      let reachedToLimit = false;
      await axios.post(`${process.env.VUE_APP_API_ENDPOINT}get_request_count`, {
        data: {
          user_id,
        }
      },
      _this.auth)
        .then(response => {
          if (response.data.details.request_count >= response.data.details.request_limit) {
            reachedToLimit = true;
          }
        });
        
      if (reachedToLimit) {
        this.openRequestLimitModal = true;
      } else {
        document.getElementById('q'+this.quote.row._id).innerHTML='<i class="fa fa-check mr-2"></i> Quotation Sent';
        axios.post(process.env.VUE_APP_API_ENDPOINT+'create_quote', {
            materiallist_id :_this.quote.row._id,
            projectplan_id :_this.projectplan._id,
            item_name :_this.quote.row.item_name,
            item_name_ar :_this.quote.row.item_name_ar,
            type :_this.quote.row.type,
            type_ar :_this.quote.row.type_ar,
            rate :_this.quote.row.rate,
            quantity :_this.quote.quantity,
            unit :_this.quote.row.unit,
            remark :_this.quote.row.remark,
            business_remark:_this.quote.remark,
            business_attachments:_this.quote.attachment,
            created_by:localStorage.getItem('_id'),
            status:"approved",
            lang:this.lang
          },
          _this.auth
        ).then(response1 => {
          axios.post(`${process.env.VUE_APP_API_ENDPOINT}increase_request_count`, {
              data: {
                user_id,
              }
            },
            _this.auth);

          _this.quotes.push(response1.data.details._id);
          axios.post(process.env.VUE_APP_API_ENDPOINT+'update_projectplan', {
              projectplan_id :_this.projectplan.projectplan_id,
              projectplan_quotes:_this.quotes,
              created_by:localStorage.getItem('_id'),status:"approved"
            }, 
            _this.auth
          );
          axios.post(process.env.VUE_APP_API_ENDPOINT+'read_quote',{"details":{"projectplan_id":_this.projectplan._id,"status":"approved"}},_this.auth)
            .then(response3 => {
              _this.quoteData=response3.data.details;
              for(let x in  _this.quoteData) { 
                console.log(x);
                _this.json_data.push({'Material': _this.quoteData[x].item_name,'Type': _this.quoteData[x].type,'Quantity': _this.quoteData[x].quantity,'Price': _this.quoteData[x].total,'Remarks': _this.quoteData[x].remark,'Quotation From': _this.quoteData[x].created_by.business_name_english+'('+_this.quoteData[x].created_by.user_phone+')'});
              }
            });
        });
        
        document.getElementById('sendquote').innerHTML='Sending...';
        setTimeout(function(){
          document.getElementById("sendquote").classList.remove('btn-success');
          document.getElementById("sendquote").classList.add('btn-primary');
          document.getElementById('sendquote').innerHTML='Quotation Sent';
          document.getElementById("savedplandetails").classList.remove('d-none');
          document.getElementById("planquotes").classList.remove('d-none');
          document.getElementById('c'+_this.quote.row._id).disabled=true;
          _this.startquote=false;
        }, 2000);
      }
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
      this.viewquotations=false;
      },
    }
  };
</script>
<style>
.blog-excerpt {
  display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height:78px;
}
.blog-category {
  font-size: 0.875rem;
  color: #404040;
}
.blog-content img {
  height: auto;
  max-width: 100%;
}
.alert.alert-confirmation.alert-success {
    position: fixed;
    bottom: 0px;
    width: 100%;
    max-width: 1100px;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
