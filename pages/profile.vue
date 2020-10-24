<template>
  <div>
    <h1>Hello {{ user.email }}</h1>
    <h1>Hello user.name {{ user.name }}</h1>
    <img :src="user.photoURL" height="150" />
    <p>
      👩‍🍳 Hi, {{ user.displayName || 'friend' }} we know you like
      {{ user.favoriteFood || 'food' }}.
    </p>

    <form @submit.prevent="updateProfile">
      <h2>Zmień nazwę użytkownika</h2>
      <input v-model="displayName" placeholder="Your name" />
      <button>Update</button>
    </form>

    <form @submit.prevent="updateCustomDetails">
      <h2>Update Additional Details</h2>
      <input v-model="favoriteFood" placeholder="Your favorite food" />
      <button>Update</button>
    </form>
<!-- POPRAWNIE PONIOZEJ >>-->
          <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <ValidationProvider rules="required|email" name="Email" v-slot="{ errors, valid }">

            <b-field
          label="Email"
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
        >
          <b-input type="email" v-model="email"></b-input>
        </b-field>
      </ValidationProvider>
      <button class="button is-succes" @click="handleSubmit(updateEmail)">Aktualizuj email</button>
          </ValidationObserver>


    <form @submit.prevent="updatePassword">
      <h2>Update Password</h2>
      <input
        type="password"
        v-model="newPassword"
        placeholder="Your password"
      />
      <button>Update</button>
    </form>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full';


export default {
   components: {
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return{
      email:'',
    }
  },
  computed: {
    user() {
      return this.$store.getters['users/getUser']
    },
  },
  methods: {  
     updateProfile () {
        this.authUser.updateProfile({
          displayName: this.displayName,
          photoURL: this.photoURL
        })
      },
      updateCustomDetails () {
        firebase.database().ref('users').child(this.authUser.uid)
          .update({favoriteFood: this.favoriteFood})
      },
      updateEmail () {
         this.$store.dispatch('users/updateEmail', this.email) 
},
      updatePassword () {
        this.authUser.updatePassword(this.newPassword)
          .then(() => { this.newPassword = null })
          .catch(error => alert('🤕' + error.message))
      }
}
}
</script>

<style lang="scss" scoped>
</style>