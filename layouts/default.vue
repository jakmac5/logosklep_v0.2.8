<template>
  <div id="app">
    
    <div class="navbar-user">
      <div class="is-pulled-right" v-if="userIsAuthenticated()">
        <nuxt-link :to="{path: '/profile'}"> 
          <a class="profile-text has-text-black">Profil</a>
        </nuxt-link>
        <a class="profile-text has-text-black" @click="logout"> Wyloguj się</a>
      </div>
      <div v-else>
        <a> User is logged out</a>
      </div>
    </div>
    

    <div class="columns is-mobile is-multiline is-centered is-vcentered">
      <div class="column">
        <logoIcon />
      </div>
      <div @click="dodaj_konkurs" v-if="userIsAuthenticated()" id="add_new" class="column is-one-fifth has-text-centered">
          <a class="text has-text-white is-size-2">Dodaj konkurs</a>
    </div>
         <div @click="confirm" v-if="!userIsAuthenticated()" id="add_new" class="column is-one-fifth has-text-centered">
          <a class="text has-text-white is-size-2">Dodaj konkurs</a>
    </div>
    </div>

    <nav class="level is-multiline is-mobile is-centered is-vcentered">
      <div>
        <nuxt-link to="/">
          <p class="level-item has-text-centered has-text-white">Home</p>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="about">
          <p class="level-item has-text-centered has-text-white">About</p>
        </nuxt-link>
      </div>
            <div>
        <nuxt-link to="graficy">
          <p class="level-item has-text-centered has-text-white">Graficy</p>
        </nuxt-link>
      </div>
      <LoginModal />
      <RegisterModal />
    </nav>

    <nuxt />
  </div>
</template>

<script>
import logoIcon from '@/components/Logo.vue'
import RegisterModal from '@/components/RegisterModal.vue'
import LoginModal from '@/components/LoginModal.vue'
import { auth,db } from '@/plugins/firebase'
import Cookie from 'js-cookie'

export default {
  components: {
    logoIcon,
    RegisterModal,
    LoginModal,
  },

  computed:{
    user_info(){
      return this.$store.getters['users/getUser']
    }
  },
  watch:{

    user_info(newVal,old) {
      console.log(newVal)
      if(newVal.userId){
        if(newVal.choice===null){
          console.log("watched choice is null")
        }
        else console.log("watched choice is not null")
      }
    }
  },
    
  
  methods: {
    async logout() {
      this.$store.dispatch('users/logout').then(() => (location.href = '/'))
    },
    userIsAuthenticated() {
      return (
        this.$store.getters['users/getUser'] !== null &&
        this.$store.getters['users/getUser'] !== undefined &&
        this.$store.getters['users/getUser'] !== 0
      )
    },
    
confirm() {
            this.$buefy.dialog.confirm({
                type:"is-primary",
                message: 'Musisz być zalogowany :(',
                onConfirm: () => this.$buefy.toast.open('Potwierdzono')
            })
        },
        dodaj_konkurs(){
          location.href= "/dodaj_konkurs"
        }
  },
}
</script>

<style scoped>
.profile-text {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
}

.text {
  font-family: 'Lato', sans-serif;
  font-weight: 900;
}

body {
  font-family: 'Lato', sans-serif;
}
.navbar {
  width: 100%;
}
.columns {
  margin: 0 !important;
}
.navbar-user {
  background-color: #64d2b8;
  height: 56px;
}
.navbar {
  margin-bottom: 0;
}

.level {
  background-color: #ff5700;
  height: 42px;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
}

#add_new {
  background-color: #ff5700;
  cursor: pointer;
} 
</style>
