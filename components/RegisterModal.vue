<template>
  <section>
    <div class="click-me has-text-white" @click="isComponentModalActive = true">
      Rejstracja
    </div>

    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Rejstracja</p>
          </header>
          <section class="modal-card-body">
      <ValidationProvider rules="required|min:8|max:25" name="nick" v-slot="{ errors, valid }">
            <b-field label="Nazwa użytkownika"           :type="{ 'is-danger': errors[0], 'is-success': valid }"
>
              <b-input
                type="input"
                v-model="account.displayName"
                placeholder="Twój nick"
                required
              >
              </b-input>
            </b-field>
             <p class="has-text-danger">{{ errors[0] }}</p>
      </ValidationProvider>

      <ValidationProvider rules="required|email" name="Email" v-slot="{ errors, valid }">

            <b-field label="Email"           :type="{ 'is-danger': errors[0], 'is-success': valid }"
>
              <b-input
                type="email"
                v-model="account.email"
                placeholder="Twój email"
                required
              >
              </b-input>
            </b-field>
             <p class="has-text-danger">{{ errors[0] }}</p>
      </ValidationProvider>
      <ValidationProvider rules="required|min:8|max:25" name="account.password" v-slot="{ errors, valid }">

            <b-field label="Hasło"           :type="{ 'is-danger': errors[0], 'is-success': valid }"
>
              <b-input
                type="password"
                v-model="account.password"
                password-reveal
                placeholder="Twoje hasło"
                required
              >
              </b-input>
            </b-field>
             <p class="has-text-danger">{{ errors[0] }}</p>
      </ValidationProvider>
      <ValidationProvider rules="required|confirmed:account.password" name="Potwierdź hasło" v-slot="{ errors, valid }">

            <b-field label="Potwierdź hasło"           :type="{ 'is-danger': errors[0], 'is-success': valid }"
>
              <b-input
                type="password"
                v-model="confirmation"
                password-reveal
                placeholder="Potwierdź hasło"
                required
              >
              </b-input>
            </b-field>
             <p class="has-text-danger">{{ errors[0] }}</p>
      </ValidationProvider>
            <ValidationProvider rules="required" name="role" v-slot="{ errors }">

            <b-radio v-model="account.choices" native-value="Grafik">Grafik</b-radio>
            <b-radio v-model="account.choices" native-value="Zleceniodawca">Zleceniodawca</b-radio>
             <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="isComponentModalActive=false">
              Zamknij
            </button>
            <button class="button is-primary" @click="handleSubmit(register)">
              Zarejstruj
            </button>
          </footer>
        </div>
            </ValidationObserver>
      
    </b-modal>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full';

export default {
   components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      isComponentModalActive: false,
      account: {
        email: 'cookiesformnode@you.com',
        password: 'testing1',
      displayName: 'cookie',
      choices:'Grafik',
      },
      confirmation: '',
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
    register() {
      if (this.account.password === this.confirmation) {
        this.$store
          .dispatch('users/register', this.account)
          .then(() => {
          //  location.href = '/'
})
          .catch((error) => {
            this.isError = true
            this.errMsg = error.code

            setTimeout(() => {
              this.isError = false
            }, 5000)
          })
      } else alert("PASSSWORD DONT MATCH")
    },
  },
}
</script>

<style scoped>
.click-me {
  cursor: pointer;
}
.control.has-icons-left .icon, .control.has-icons-right .icon {
  pointer-events: auto !important;
}

</style>
