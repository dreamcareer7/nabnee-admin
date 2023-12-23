import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      axios.post(process.env.VUE_APP_API_ENDPOINT+'admin_login', {
        ...loginData
      })
      .then(response => {
        if(response.data.success==true){
        localStorage.setItem('accessToken', response.data.user_token);
        localStorage.setItem('partner_name', response.data.user_details[0].admin_name);
        localStorage.setItem('admin_img', response.data.user_details[0].admin_img);
        localStorage.setItem('smtp_email', response.data.user_details[0].smtp_email);
        localStorage.setItem('smtp_password', response.data.user_details[0].smtp_password);
        localStorage.setItem('_id', response.data.user_details[0]._id);
        commit('loginStop', null);
        commit('updateAccessToken', response.data.user_token);
        router.push('/dashboard');
        }else{
          commit('loginStop','Invalid login details');
          commit('updateAccessToken', null);
        }
        
      })
      .catch(error => {
        commit('loginStop', error.response.data.errorMessage);
        commit('updateAccessToken', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    fetchUserdata({ commit }) {
      commit('UserDetails', localStorage.getItem('UserDetails'));
    },
    logout() {
      localStorage.removeItem('accessToken');
      router.push('/login');
    }
  }
})