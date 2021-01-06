<template>
  <section>
    <div class="block">
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="showSocial"> Show Social step </b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isAnimated"> Animated </b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isRounded"> Rounded </b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isStepsClickable"> Clickable Marker </b-switch>
        </div>
      </b-field>
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="hasNavigation"> Navigation Buttons </b-switch>
        </div>
        <div class="control">
          <b-switch v-model="customNavigation"> Custom Navigation </b-switch>
        </div>
        <div class="control">
          <b-switch v-model="isProfileSuccess">
            Set <code>is-success</code> for profile
          </b-switch>
        </div>
      </b-field>
      <b-field v-if="hasNavigation" grouped group-multiline>
        <b-field label="Prev icon">
          <b-select v-model="prevIcon">
            <option value="chevron-left">Chevron</option>
            <option value="arrow-left">Arrow</option>
          </b-select>
        </b-field>
        <b-field label="Next icon">
          <b-select v-model="nextIcon">
            <option value="chevron-right">Chevron</option>
            <option value="arrow-right">Arrow</option>
          </b-select>
        </b-field>
        <b-field label="Label position">
          <b-select v-model="labelPosition">
            <option value="bottom">Bottom</option>
            <option value="right">Right</option>
            <option value="left">Left</option>
          </b-select>
        </b-field>
        <b-field label="Mobile mode">
          <b-select v-model="mobileMode">
            <option :value="null">-</option>
            <option value="minimalist">Minimalist</option>
            <option value="compact">Compact</option>
          </b-select>
        </b-field>
      </b-field>
    </div>
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :rounded="isRounded"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      :label-position="labelPosition"
      :mobile-mode="mobileMode"
    >
      <b-step-item step="1" label="Profil" :clickable="isStepsClickable">
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
            <ValidationProvider
              rules="required|email"
              name="Email"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Email"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input type="email" v-model="email"></b-input>
              </b-field>
            </ValidationProvider>
            <button class="button is-succes" @click="handleSubmit(updateEmail)">
              Aktualizuj email
            </button>
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
      </b-step-item>

      <b-step-item
        step="2"
        label="Portfolio"
        :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }"
        >
        <div>
      <FileUploadNew
       :bucket_path="user.id"
      dbcol='portfolio'
      :dbdoc="user.id"
      />
      
    <div class="columns" v-for="(logos) in chunkedLogos" :key="logos.index">
      <div
        class="column"
        v-for="(logo) in logos"
        :key="logo.index"
      >
<img :src="logo" />
      </div>

      </div>
        </div>
      </b-step-item>
      <template
        v-if="customNavigation"
        slot="navigation"
        slot-scope="{ previous, next }"
      >
        <b-button
          outlined
          type="is-danger"
          icon-pack="fas"
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
          Previous
        </b-button>
        <b-button
          outlined
          type="is-success"
          icon-pack="fas"
          icon-right="forward"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next
        </b-button>
      </template>
    </b-steps>
  </section>
</template>


<script>
import {
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate/dist/vee-validate.full'
import FileUploadNew from '@/components/FileUploadNew.vue'
import _ from 'lodash'
import {storage} from '@/plugins/firebase'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    FileUploadNew
  },
  data() {
    return {
      activeStep: 0,

      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'minimalist',

      email: '',

      urls_to_go:[],
    }
  },
  computed: {
    user() {
      return this.$store.getters['users/getUser']
    },
    chunkedLogos() {
      return _.chunk(this.urls_to_go, 4)
    },
  },
created() {
console.log(this.user.id)
this.loadPortfolio(this.user.id)
},
  methods: {
    loadPortfolio(userid){
            this.urls_to_go = []
      let storageRef = storage.ref(userid)
      storageRef.listAll().then((result) => {
        try {
          result.items.forEach((imageRef) => {
            // And finally display them
            imageRef.getDownloadURL().then((url) => {
              this.urls_to_go.push(url)
            })

            imageRef.getMetadata().then((meta) => {
              console.log('meta: ', meta)
            })
          })
        } catch (err) {
          console.log('catched :   ', err)
        }
      })
      console.log(this.urls_to_go)
    },
    updateProfile() {
      this.authUser.updateProfile({
        displayName: this.displayName,
        photoURL: this.photoURL,
      })
    },
    updateCustomDetails() {
      firebase
        .database()
        .ref('users')
        .child(this.authUser.uid)
        .update({ favoriteFood: this.favoriteFood })
    },
    updateEmail() {
      this.$store.dispatch('users/updateEmail', this.email)
    },
    updatePassword() {
      this.authUser
        .updatePassword(this.newPassword)
        .then(() => {
          this.newPassword = null
        })
        .catch((error) => alert('🤕' + error.message))
    },
  },
}
</script>

<style lang="scss" scoped>
</style>