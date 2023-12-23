<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item :link="{name: 'Dashboard', icon: 'fa fa-tachometer text-primary',  path: '/dashboard' }" />
        <sidebar-item :link="{name: 'Design', icon: 'fa fa-file-image-o text-green', path: '/design'}" />
        <sidebar-item :link="{name: 'Products', icon: 'fa fa-bath text-green', path: '/products'}" />
        <sidebar-item :link="{name: 'Inventory Filters', icon: 'fa fa-filter text-green', path: '/inventoryfilter'}" />
        <sidebar-item :link="{name: 'Businesses', icon: 'fa fa-briefcase text-info', path: '/businesses'}" />
        <sidebar-item :link="{name: 'Business Filters', icon: 'fa fa-filter text-info', path: '/businessfilters'}" />
        <sidebar-item :link="{name: 'Blog', icon: 'fa fa-newspaper-o text-orange', path: '/blog'}" />
        <!-- <sidebar-item :link="{name: 'Email Config', icon: 'fa fa-key text-yellow', path: '/emailconfig'}" /> -->
        <sidebar-item :link="{name: 'Users', icon: 'fa fa-users text-red', path: '/users'}" />
        <sidebar-item :link="{name: 'Country', icon: 'fa fa-flag text-red', path: '/country'}" />
        <sidebar-item :link="{name: 'Quote Material', icon: 'fa fa-dollar text-green', path: '/material'}" />
        <sidebar-item :link="{name: 'Quotation Requests', icon: 'fa fa-send text-green', path: '/quotationrequests'}" />
        <sidebar-item :link="{name: 'Quotations', icon: 'fa fa-reply text-green', path: '/quotations'}" />
        <sidebar-item :link="{name: 'SEO Details', icon: 'fa fa-google text-primary', path: '/seo'}" />
        <sidebar-item :link="{name: 'Content', icon: 'fa fa-quote-left text-body text-primary', path: '/content'}" />

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    created: function () {
        var _this = this;
        $.getJSON('https://geoip-db.com/json/', function (json) {
            _this.json = json;
            console.log(_this.json)
            localStorage.setItem('country_name',_this.json.country_name);
            if(localStorage.getItem('location_lat')){
                localStorage.setItem('location_lat',_this.json.latitude);
                localStorage.setItem('location_long',_this.json.longitude);
            }
            
           });
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style>
@media (min-width: 768px) {
.navbar-vertical.navbar-expand-md .navbar-brand-img {
    max-height: 4.5rem !important;
}
}
.media-comment {
  margin-top: 2rem;
}
.media-comment-avatar {
    margin-top: -1rem;
    margin-right: -2rem;
    position: relative;
    z-index: 1;
    border: 4px solid #fff;
    -webkit-transition: all .15s ease;
    transition: all .15s ease;
}
.avatar-lg {
    width: 58px;
    height: 58px;
    font-size: .875rem;
}
.media-comment-text {
    border-radius: .4375rem;
    border-top-left-radius: 0;
    position: relative;
    background-color: #f6f9fc;
    padding: 1rem 1.25rem 1rem 2.5rem;
    border: 1px solid #cccccc61;
}
.media-comment:hover .media-comment-avatar {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.modal-title {
  font-size: 1rem;
}
.card-title {
    margin-bottom: 1.25rem;
    text-transform: capitalize;
}
.full-modal .modal-content {
  box-shadow: none;
}
.full-modal .close > span:not(.sr-only) {
  font-size: 2rem;
  font-weight: 300;
}
.full-modal .modal-header .close {
    background-color: #eaeaea;
    border-radius: 50%;
}
.dashed {
  border-style: dashed;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}
</style>
