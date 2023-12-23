<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Forgot Password</small>
            <br>
            <badge v-if="forgotError" type="danger">{{ forgotError }}</badge>
            <badge v-if="forgotSuccess" type="success">{{ forgotSuccess }}</badge>
          </div>
          <form role="form">
            <base-input v-model="model.email" class="input-group-alternative mb-3"  placeholder="Email" addon-left-icon="ni ni-email-83"
            />
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="forgotPassword()"> Submit </base-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    name: 'Forgotpassword',
    data() {
      return {
        model: {
          email: ''
        },
        auth : {
          headers: { 'Content-Type':'application/x-www-form-urlencoded'}
        },
        forgotError:'',
        forgotSuccess:''
      }
    },
    mounted () {

    },
    methods: {

    forgotPassword() {
       const querystring = require('querystring');
    axios
      .post(process.env.VUE_APP_API_ENDPOINT+'admin_forgotpassword',querystring.stringify({admin_email:this.model.email}),this.auth)
      .then(response => {
        if(response.data.success==true){
           this.forgotSuccess='Password Sent to Mail Id';
           this.forgotError='';
        }else{
           this.forgotError='Email Not Exist';
           this.forgotSuccess='';
        }
     
      })
    }
  },
  };
</script>
<style>
</style>
