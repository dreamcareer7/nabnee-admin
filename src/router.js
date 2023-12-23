import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/staging',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
         {
          path: '/design',
          name: 'Design',
          component: () => import(/* webpackChunkName: "demo" */ './views/Design.vue')
        },
        {
          path: '/viewcomments/:id',
          name: 'View Comments',
          component: () => import(/* webpackChunkName: "demo" */ './views/Viewcomments.vue')
        },
        {
          path: '/products',
          name: 'Products',
          component: () => import(/* webpackChunkName: "demo" */ './views/Products.vue')
        },
        {
          path: '/viewproduct/:id',
          name: 'View Products',
          component: () => import(/* webpackChunkName: "demo" */ './views/Viewproducts.vue')
        },
        {
          path: '/inventoryfilter',
          name: 'Inventory Filters',
          component: () => import(/* webpackChunkName: "demo" */ './views/Inventoryfilter.vue')
        },
        {
          path: '/viewcategory/:id/:name',
          name: 'View Category',
          component: () => import(/* webpackChunkName: "demo" */ './views/Viewcategory.vue')
        },
        {
          path: '/businesses',
          name: 'Businesses',
          component: () => import(/* webpackChunkName: "demo" */ './views/Businesses.vue')
        },
        {
          path: '/viewbusiness/:id',
          name: 'View Businesses',
          component: () => import(/* webpackChunkName: "demo" */ './views/Viewbusiness.vue')
        },
        {
          path: '/editbusiness/:id',
          name: 'Edit Businesses',
          component: () => import(/* webpackChunkName: "demo" */ './views/Editbusiness.vue')
        },
        {
          path: '/businessfilters',
          name: 'Business Filters',
          component: () => import(/* webpackChunkName: "demo" */ './views/Businessfilters.vue')
        },
        {
          path: '/viewbusinesscategory/:id/:name',
          name: 'View Business Category',
          component: () => import(/* webpackChunkName: "demo" */ './views/Viewbusinesscategory.vue')
        },
        {
          path: '/blog',
          name: 'Blog',
          component: () => import(/* webpackChunkName: "demo" */ './views/Blog.vue')
        },
        {
          path: '/blog/edit/:id',
          name: 'editBlog',
          component: () => import(/* webpackChunkName: "demo" */ './views/Editblog.vue')
        },
        {
          path: '/blog/details/:id',
          name: 'detailsBlog',
          component: () => import(/* webpackChunkName: "demo" */ './views/Detailsblog.vue')
        },
        {
          path: '/changepassword',
          name: 'Change Password',
          component: () => import(/* webpackChunkName: "demo" */ './views/Changepassword.vue')
        },
        {
          path: '/emailconfig',
          name: 'Email Config',
          component: () => import(/* webpackChunkName: "demo" */ './views/Emailconfig.vue')
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import(/* webpackChunkName: "demo" */ './views/Users.vue')
        },
        {
          path: "/smartplanner/:user_id",
          name: "smartplanner",
          component: () => import(/* webpackChunkName: "demo" */ './views/SmartPlanner.vue')
        },
        {
          path: "/plans/:user_id",
          name: "plans",
          component: () => import(/* webpackChunkName: "demo" */ './views/Plans.vue')
        },
        {
          path: '/country',
          name: 'Country',
          component: () => import(/* webpackChunkName: "demo" */ './views/Country.vue')
        },
        {
          path: '/material',
          name: 'Quote Material',
          component: () => import(/* webpackChunkName: "demo" */ './views/Material.vue')
        },
        {
          path: '/quotationrequests',
          name: 'Quotation Requests',
          component: () => import(/* webpackChunkName: "demo" */ './views/Quotationrequests.vue')
        },
        {
          path: '/quotations',
          name: 'Quotations',
          component: () => import(/* webpackChunkName: "demo" */ './views/Quotations.vue')
        },
        {
          path: '/seo',
          name: 'SEO Details',
          component: () => import(/* webpackChunkName: "demo" */ './views/Seo.vue')
        },
        {
          path: '/content',
          name: 'Content',
          component: () => import(/* webpackChunkName: "demo" */ './views/Content.vue')
        }
        
        
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/forgotpassword',
          name: 'forgotpassword',
          component: () => import(/* webpackChunkName: "demo" */ './views/Forgotpassword.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken');
  if (to.fullPath !== '/login' || to.fullPath === '/dashboard' ) {
    if (!store.state.accessToken) {
      console.log(store.state.accessToken);
      next({ 
                path: '/', 
                redirect: '/login'
            }) 
    }
  }
  if (to.fullPath === '/login') {
    if (store.state.accessToken) {
      next('/dashboard');
    }
  }
  next();
});

export default router;
