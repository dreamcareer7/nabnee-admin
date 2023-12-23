<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <!-- <div class="card-header bg-transparent pb-5">
                        <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
                        <div class="btn-wrapper text-center">
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a>
                        </div>
                    </div> -->
                    <div class="card-body px-lg-5 py-lg-5">
                        <div class="text-center text-muted mb-4">
                            <small>Or sign in with credentials</small>
                            <br />
                            <badge v-if="loginError" type="danger">{{ loginError }}</badge>
                            <badge v-if="accessToken" type="success">Login Successful</badge>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3" placeholder="Email" addon-left-icon="ni ni-email-83" v-model="email">
                            </base-input>

                            <base-input class="input-group-alternative" placeholder="Password" type="password" addon-left-icon="ni ni-lock-circle-open" v-model="password">
                            </base-input>
                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" v-on:click="loginSubmit()">Sign in</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6">
                        <a href="#/forgotpassword" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <div class="col-6 text-right">
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    layout: 'AuthLayout',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapState([
        'loggingIn',
        'loginError',
        'accessToken'
      ])
    },
    methods: {
      ...mapActions([
        'doLogin'
      ]),
      loginSubmit() {
        this.doLogin({
          admin_email: this.email,
          admin_password: this.password
        });
      }
    }
  }
</script>
<style>
</style>
