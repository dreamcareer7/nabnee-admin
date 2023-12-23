<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
      <div class="container mt-5">
        <!-- Card stats -->
        <div class="row">
            <div class="col-xl-4 col-lg-4">
                <stats-card title="New Users Today"
                            type="gradient-red"
                            :sub-title="''+todayuser+''"
                            icon="fa fa-group"
                            class="mb-4 mb-xl-0 dash-stats"
                >
                </stats-card>
            </div>
            <div class="col-xl-4 col-lg-4">
                <stats-card title="New Users this Month"
                            type="gradient-orange"
                            :sub-title="''+monthusers+''"
                            icon="fa fa-group"
                            class="mb-4 mb-xl-0 dash-stats"
                >
                </stats-card>
            </div>
            <div class="col-xl-4 col-lg-4">
              <stats-card title="Business Users Today"
                          type="gradient-green"
                          :sub-title="''+todaybusinessuser+''"
                          icon="fa fa-briefcase"
                          class="mb-4 mb-xl-0 dash-stats"
              >
              </stats-card>
            </div>
        </div>
        <div class="row mt-3">
          <div class="col-xl-4 col-lg-4">
              <stats-card title="Business Users this Month"
                          type="gradient-info"
                          :sub-title="''+monthbusinessusers+''"
                          icon="fa fa-briefcase"
                          class="mb-4 mb-xl-0 dash-stats"
              >
              </stats-card>
          </div>
          <div class="col-xl-4 col-lg-4">
              <stats-card title="Quote Requests Sent Today"
                          type="gradient-primary"
                          :sub-title="''+quotesrequestcount+''"
                          icon="fa fa-send"
                          class="mb-4 mb-xl-0 dash-stats"
              >
              </stats-card>
          </div>
          <div class="col-xl-4 col-lg-4">
              <stats-card title="Quote Requests Sent this Month"
                          type="gradient-pink"
                          :sub-title="''+allquotescount+''"
                          icon="fa fa-send"
                          class="mb-4 mb-xl-0 dash-stats"
              >
              </stats-card>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-xl-4 col-lg-4">
              <stats-card title="Quotations Sent Today"
                          type="gradient-green"
                          :sub-title="''+quotessentcount+''"
                          icon="fa fa-reply"
                          class="mb-4 mb-xl-0 dash-stats"
              >
              </stats-card>
          </div>
          <div class="col-xl-4 col-lg-4">
              <stats-card title="Quotations Sent this Month"
                          type="gradient-blue"
                          :sub-title="''+allquotessentcount+''"
                          icon="fa fa-reply"
                          class="mb-4 mb-xl-0 dash-stats"
              >
              </stats-card>
          </div>
        </div>

        <hr>
        <h2>Design Search Stats</h2>
        <div class="row mt-3 mb-4">
          <div class="col-xl-6 col-lg-6">
            <div class="card card-stats mb-4 mb-xl-0 dash-stats dash-stats" show-footer-line="true">
              <div class="card-body bg-white">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Top 10 searches today</h5>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-primary">
                      <i class="fa fa-search"></i>
                    </div>
                  </div>
                </div>

                <div class="table-responsive mt-3 mb-0 text-sm">
                  <base-table class="table align-items-center table-flush" tbody-classes="list" :data="top10searchtodaydesign">
                    <template slot="columns">
                      <th>S.No.</th>
                      <th>Search Term</th>
                      <th>Search frequency</th>
                    </template>
                    <template slot-scope="{row,index}" v-if="index < 10">
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{index+1}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_term}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_count}} Searches</p>
                        </td>
                    </template>
                  </base-table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="card card-stats mb-4 mb-xl-0 dash-stats" show-footer-line="true">
              <div class="card-body bg-white">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Top 10 searches in last 30 days</h5>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-red">
                      <i class="fa fa-search"></i>
                    </div>
                  </div>
                </div>

                <div class="table-responsive mt-3 mb-0 text-sm">
                  <base-table class="table align-items-center table-flush" tbody-classes="list" :data="top10searchmonthdesign">
                    <template slot="columns">
                      <th>S.No.</th>
                      <th>Search Term</th>
                      <th>Search frequency</th>
                    </template>
                    <template slot-scope="{row,index}" v-if="index < 10">
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{index+1}}</p>
                        </td>
                        
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_term}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_count}} Searches</p>
                        </td>
                    </template>
                  </base-table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-5">
        <h2>Product Search Stats</h2>
        <div class="row mt-3 mb-4">
          <div class="col-xl-6 col-lg-6">
            <div class="card card-stats mb-4 mb-xl-0 dash-stats" show-footer-line="true">
              <div class="card-body bg-white">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Top 10 searches today</h5>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-primary">
                      <i class="fa fa-search"></i>
                    </div>
                  </div>
                </div>

                <div class="table-responsive mt-3 mb-0 text-sm">
                  <base-table class="table align-items-center table-flush" tbody-classes="list" :data="top10searchtodayproduct">
                    <template slot="columns">
                      <th>S.No.</th>
                      <th>Search Term</th>
                      <th>Search frequency</th>
                    </template>
                    <template slot-scope="{row,index}" v-if="index < 10">
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{index+1}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_term}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_count}} Searches</p>
                        </td>
                    </template>
                  </base-table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="card card-stats mb-4 mb-xl-0 dash-stats" show-footer-line="true">
              <div class="card-body bg-white">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Top 10 searches in last 30 days</h5>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-red">
                      <i class="fa fa-search"></i>
                    </div>
                  </div>
                </div>

                <div class="table-responsive mt-3 mb-0 text-sm">
                  <base-table class="table align-items-center table-flush" tbody-classes="list" :data="top10searchmonthproduct">
                    <template slot="columns">
                      <th>S.No.</th>
                      <th>Search Term</th>
                      <th>Search frequency</th>
                    </template>
                    <template slot-scope="{row,index}" v-if="index < 10">
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{index+1}}</p>
                        </td>
                        
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_term}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_count}} Searches</p>
                        </td>
                    </template>
                  </base-table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr class="mt-5">
        <h2>Business Search Stats</h2>
        <div class="row mt-3 mb-4">
          <div class="col-xl-6 col-lg-6">
            <div class="card card-stats mb-4 mb-xl-0 dash-stats" show-footer-line="true">
              <div class="card-body bg-white">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Top 10 searches today</h5>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-primary">
                      <i class="fa fa-search"></i>
                    </div>
                  </div>
                </div>
                <div class="table-responsive mt-3 mb-0 text-sm">
                  <base-table class="table align-items-center table-flush" tbody-classes="list" :data="top10searchtodaybusiness">
                    <template slot="columns">
                      <th>S.No.</th>
                      <th>Search Term</th>
                      <th>Search frequency</th>
                    </template>
                    <template slot-scope="{row,index}" v-if="index < 10">
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{index+1}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_term}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_count}} Searches</p>
                        </td>
                    </template>
                  </base-table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="card card-stats mb-4 mb-xl-0 dash-stats" show-footer-line="true">
              <div class="card-body bg-white">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Top 10 searches in last 30 days</h5>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape text-white rounded-circle shadow bg-gradient-red">
                      <i class="fa fa-search"></i>
                    </div>
                  </div>
                </div>

                <div class="table-responsive mt-3 mb-0 text-sm">
                  <base-table class="table align-items-center table-flush" tbody-classes="list" :data="top10searchmonthbusiness">
                    <template slot="columns">
                      <th>S.No.</th>
                      <th>Search Term</th>
                      <th>Search frequency</th>
                    </template>
                    <template slot-scope="{row,index}" v-if="index < 10">
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{index+1}}</p>
                        </td>
                        
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_term}}</p>
                        </td>
                        <td class="budget">
                          <p class="mb-0" style="text-transform: capitalize;">{{row.search_count}} Searches</p>
                        </td>
                    </template>
                  </base-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Charts-->
      <div class="container-fluid mt--7">
          <!-- <div class="row">
              <div class="col-xl-8 mb-5 mb-xl-0">
                  <card type="default" header-classes="bg-transparent">
                      <div slot="header" class="row align-items-center">
                          <div class="col">
                              <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                              <h5 class="h3 text-white mb-0">Sales value</h5>
                          </div>
                          <div class="col">
                              <ul class="nav nav-pills justify-content-end">
                                  <li class="nav-item mr-2 mr-md-0">
                                      <a class="nav-link py-2 px-3"
                                         href="#"
                                         :class="{active: bigLineChart.activeIndex === 0}"
                                         @click.prevent="initBigChart(0)">
                                          <span class="d-none d-md-block">Month</span>
                                          <span class="d-md-none">M</span>
                                      </a>
                                  </li>
                                  <li class="nav-item">
                                      <a class="nav-link py-2 px-3"
                                         href="#"
                                         :class="{active: bigLineChart.activeIndex === 1}"
                                         @click.prevent="initBigChart(1)">
                                          <span class="d-none d-md-block">Week</span>
                                          <span class="d-md-none">W</span>
                                      </a>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <line-chart
                              :height="350"
                              ref="bigChart"
                              :chart-data="bigLineChart.chartData"
                              :extra-options="bigLineChart.extraOptions"
                      >
                      </line-chart>

                  </card>
              </div>

              <div class="col-xl-4">
                  <card header-classes="bg-transparent">
                      <div slot="header" class="row align-items-center">
                          <div class="col">
                              <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                              <h5 class="h3 mb-0">Total orders</h5>
                          </div>
                      </div>

                      <bar-chart
                              :height="350"
                              ref="barChart"
                              :chart-data="redBarChart.chartData"
                      >
                      </bar-chart>
                  </card>
              </div>
          </div> -->
          <!-- End charts-->

          <!--Tables-->
          <!-- <div class="row mt-5">
              <div class="col-xl-8 mb-5 mb-xl-0">
                  <page-visits-table></page-visits-table>
              </div>
              <div class="col-xl-4">
                  <social-traffic-table></social-traffic-table>
              </div>
          </div> -->
          <!--End tables-->
      </div>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';

  import axios from "axios";

  export default {

    components: {
      LineChart,
      BarChart,
      PageVisitsTable,
      SocialTrafficTable,
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [0, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          }
        },
        todayuser:'',
        monthusers:'',
        todaybusinessuser:'',
        monthbusinessusers:'',
        top10searchtodaydesign:'',
        top10searchmonthdesign:'',
        top10searchtodayproduct:'',
        top10searchmonthproduct:'',
        top10searchtodaybusiness:'',
        top10searchmonthbusiness:'',
        quotesrequestcount:'',
        allquotescount:'',
        quotessentcount:'',
        allquotessentcount:'',

      };
    },
    methods: {
      initBigChart(index) {
         console.log("hi");
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    mounted() {
      this.initBigChart(0);

      const querystring = require('querystring');
      console.log(this.auth);
      var today= new Date();
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      console.log(yesterday.toISOString());
      today.setDate(today.getDate() + 1);
      console.log(today.toISOString());
      var monthbeforday= new Date();
      monthbeforday.setDate(monthbeforday.getDate() - 30);
      console.log(monthbeforday.toISOString());
         


      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_user_by_timeline',querystring.stringify({start:yesterday.toISOString(),end:today.toISOString()}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.todayuser=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.todayuser=0;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_user_by_timeline',querystring.stringify({start:monthbeforday.toISOString(),end:today.toISOString()}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.monthusers=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.monthusers=0;
        }
            
      })

      //business users

       axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_user_by_timeline',querystring.stringify({start:yesterday.toISOString(),end:today.toISOString()}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.todaybusinessuser=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.todaybusinessuser=0;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'read_business_user_by_timeline',querystring.stringify({start:monthbeforday.toISOString(),end:today.toISOString()}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.monthbusinessusers=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.monthbusinessusers=0;
        }
            
      })

      //Search term  design

       axios
      .post(process.env.VUE_APP_API_ENDPOINT+'search_stats',querystring.stringify({start:yesterday.toISOString(),end:today.toISOString(),search_type:'design'}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
          this.top10searchtodaydesign=response.data.details;
        }else if(response.data.message=='Data not found'){
          this.top10searchtodaydesign=0;
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'search_stats',querystring.stringify({start:monthbeforday.toISOString(),end:today.toISOString(),search_type:'design'}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.top10searchmonthdesign=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.top10searchmonthdesign=0;
        }
            
      })

      //Search term product

       axios
      .post(process.env.VUE_APP_API_ENDPOINT+'search_stats',querystring.stringify({start:yesterday.toISOString(),end:today.toISOString(),search_type:'product'}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.top10searchtodayproduct=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.top10searchtodayproduct=0;
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'search_stats',querystring.stringify({start:monthbeforday.toISOString(),end:today.toISOString(),search_type:'product'}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.top10searchmonthproduct=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.top10searchmonthproduct=0;
        }
            
      })

      //Search term business

       axios
      .post(process.env.VUE_APP_API_ENDPOINT+'search_stats',querystring.stringify({start:yesterday.toISOString(),end:today.toISOString(),search_type:'business'}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.top10searchtodaybusiness=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.top10searchtodaybusiness=0;
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'search_stats',querystring.stringify({start:monthbeforday.toISOString(),end:today.toISOString(),search_type:'business'}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.top10searchmonthbusiness=response.data.details;
        }else if(response.data.message=='Data not found'){
         this.top10searchmonthbusiness=0;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'numberOfQuotationEequestsCreatedToday',querystring.stringify({}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.quotesrequestcount=response.data.details.length;
        }else{
          this.quotesrequestcount=0;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'numberOfRequestsTillDate',{},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.allquotescount=response.data.details.length;
        }else{
          this.allquotescount=0;
        }
            
      })

      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'numberOfQuotationsSentToRequestsByBusinessesToday',querystring.stringify({}),this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.quotessentcount=response.data.details.length;
        }
            
      })
      axios
      .post(process.env.VUE_APP_API_ENDPOINT+'numberOfQuotationsSentToRequestsByBusinessesTillDate',{},this.auth)
      .then(response => {
        console.log(response);
        if(response.data.details){
        this.allquotessentcount=response.data.details.length;
        }
            
      })

      


    }
  };
</script>
<style>
  .dash-stats .card-body {
    background-color: white !important;
    border-radius: 5px;
  }
</style>
