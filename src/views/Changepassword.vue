<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-0 pt-5 pt-md-3"></base-header>
    <div class="container-fluid mt-3">
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
                <div class="col-4">
                  <h3 class="mb-0">
                   Change Password
                  </h3>
                </div>
                <div class="col-8">
                  <badge v-if="errmessage" type="danger">{{ errmessage }}</badge>
                  <badge v-if="successmessage" type="success">{{ successmessage }}</badge>
                </div>
              </div>
              
            </div>

            <template>
              <form @submit.prevent>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-12">
                      <base-input v-model="model.newpassword" alternative="" label="New Password" placeholder="New Password" input-classes="form-control-alternative"
                      />  
                    </div>
                    <div class="col-lg-12">
                      <base-input v-model="model.confirmpassword" alternative="" label="Confirm Password" placeholder="Confirm Password" input-classes="form-control-alternative"
                      />  
                    </div>
                    <div class="col-lg-12">
                      <base-input v-model="model.smtp_email" alternative="" label="SMTP email" placeholder="SMTP email" input-classes="form-control-alternative"
                      />  
                    </div>
                    <div class="col-lg-12">
                      <base-input v-model="model.smtp_password" alternative="" label="SMTP Password" placeholder="SMTP Password" input-classes="form-control-alternative"
                      />  
                    </div>
                  </div>      
                  <div class="text-center mt-3">
                    <base-button id="updatebtn" type="primary" @click="changepassword()">Change Password </base-button>
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
  export default {
    name: 'changePassword',
    data() {
      return {
        auth : {
          headers: { 'Content-Type':'application/x-www-form-urlencoded'}
        },
        path:'',
        model:{ newpassword:'',
                confirmpassword:'',
                smtp_email:localStorage.getItem('smtp_email'),
                smtp_password:localStorage.getItem('smtp_password')
              },
        errmessage:'',
        successmessage:'',
      }
    },
    mounted () {

      this.path=process.env.VUE_APP_API_ENDPOINT;
    },
    methods: {
    changepassword() {
       const querystring = require('querystring');

       if(this.model.newpassword.trim()===''){
        this.errmessage='New password can not be blank';
        return ;
       }
       if(this.model.newpassword===this.model.confirmpassword){
        this.errmessage='';
    axios
      .post(process.env.VUE_APP_API_ENDPOINT+'admin_changepassword',querystring.stringify({id:localStorage.getItem('_id'),admin_password:this.model.newpassword,smtp_email:this.model.smtp_email,smtp_password:this.model.smtp_password }),this.auth)
      .then(response => {
        this.successmessage=response.data.message;
        document.getElementById("updatebtn").classList.remove('btn-primary');
        document.getElementById("updatebtn").classList.add('btn-success');
        document.getElementById("updatebtn").innerHTML='Password changed';
        setTimeout(function(){
        document.getElementById("updatebtn").classList.remove('btn-success');
        document.getElementById("updatebtn").classList.add('btn-primary');
        document.getElementById("updatebtn").innerHTML="Change Password";
        }, 2000);
      })
     }else{
       this.errmessage='New password & confirm password not match';
     }
    }
  },
  };
</script>
<style></style>
