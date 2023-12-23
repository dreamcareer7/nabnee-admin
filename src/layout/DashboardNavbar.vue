<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <!-- <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input> -->
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                  <img style="border: 2px solid #ffffff" v-if="admin_img" alt="Image placeholder" :src="admin_img">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{ name  }}</span>
                        </div>
                    </div>

                    <template>
                      <div class="dropdown-header noti-title">
                        <h6 class="text-overflow m-0">
                          Welcome!
                        </h6>
                      </div>
                      <router-link
                        to="/changepassword"
                        class="dropdown-item"
                      >
                        <i class="fa fa-key" />
                        <span>ChangePassword</span>
                      </router-link>
                      <div class="dropdown-divider" />
                      <button
                        class="dropdown-item"
                        @click="logoutu"
                      >
                        <i class="fa fa-sign-out" />
                        <span>Logout</span>
                      </button>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
    import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: '',
        name: localStorage.getItem('partner_name'),
        admin_img: localStorage.getItem('admin_img')
      };
    },
    methods: {
        ...mapActions([
      'logout'
    ]),
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      logoutu() {
      this.logout();
    }
    }
  };
</script>

<style>
@media (min-width: 768px) {
.navbar-expand-md .navbar-nav .dropdown-menu {
    position: absolute;
    right: 0;
    left: auto;
}
}
.delete-image {
  position: absolute;
  right: 10px;
  top: -10px;
  background: #ec3b5b;
  height: 25px;
  width: 25px;
  border-radius: 15px;
}
.delete-image i {
  padding-top: 3px;
  padding-left: 6px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
