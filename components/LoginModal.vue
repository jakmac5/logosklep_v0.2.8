<template>
  <section>
    <div class="click-me has-text-white" @click="isComponentModalActive = true">
      Login
    </div>
    <div v-if="isError" class="alert alert-danger">
      <p class="mb-0">{{ errMsg }}</p>
    </div>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
<section        :key="i"     v-for="i in wrongLogin"
>
              <b-notification
            type="is-danger"
            has-icon
            aria-close-label="Close notification"
            role="alert">
        Błędny email lub hasło.
        </b-notification>
</section>
      <form @submit.prevent="login" @submit.enter="login">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Login</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Email">
              <b-input
                type="email"
                v-model="account.email"
                placeholder="Twój email"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Hasło">
              <b-input
                type="password"
                v-model="account.password"
                placeholder="Twoje hasło"
                required
              >
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isComponentModalActive=false">
              Zamknij
            </button>
            <button class="button is-primary" type="submit" @click="login">
              Login
            </button>
          </footer>
        </div>
      </form>
    </b-modal>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isError: false,
      wrongLogin:0,
      errMsg: '',
      isComponentModalActive: false,
      account: {
        email: 'evan@you.com',
        password: 'testing',
      },
    }
  },

  methods: {
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      })
    },
    login(e) {
      e.preventDefault()
      this.$store
        .dispatch('users/login', this.account).catch(function(error) {
        if (error.code == "auth/user-not-found") {
            this.isComponentModalActive=true
            this.wrongLogin+=1
        }
        else this.wrongLogin=0
        })
        .then(() => {
          
          if (this.wrongLogin>0) {
                        this.isComponentModalActive=true

          }
          else{
            this.isComponentModalActive=false

            location.href = '/profile'
          }
        })
        .catch((error) => {
          this.isError = true
          this.errMsg = error.code

          setTimeout(() => {
            this.isError = false
          }, 5000)
        })
    },
  },
}
</script>

<style scoped>
.click-me {
  cursor: pointer;
}

.notification {
  margin-bottom:5px;
}
</style>
