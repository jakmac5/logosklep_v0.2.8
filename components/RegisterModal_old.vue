<template>
  <section>
    <div class="click-me has-text-white" @click="isComponentModalActive = true">
      Rejstracja
    </div>

    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <form>
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">Rejstracja</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Nazwa użytkownika">
              <b-input
                type="input"
                :value="username"
                placeholder="Twój nick"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Email">
              <b-input
                type="email"
                :value="account.email"
                placeholder="Twój email"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Hasło">
              <b-input
                type="password"
                :value="account.password"
                password-reveal
                placeholder="Twoje hasło"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Potwierdź hasło">
              <b-input
                type="password"
                :value="passwordConfirm"
                password-reveal
                placeholder="Potwierdź hasło"
                required
              >
              </b-input>
            </b-field>

            <b-checkbox>Grafik</b-checkbox>
            <b-checkbox>Zleceniodawca</b-checkbox>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="$parent.close()">
              Zamknij
            </button>
            <button class="button is-primary" @click="login()">
              Zarejstruj
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
      isComponentModalActive: false,
      account: {
        email: 'cookiesformnode@you.com',
        password: 'testing1',
      },
      passwordConfirm: 'testing1',
      username: 'cookie',
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
    login() {
      if (this.account.password === this.passwordConfirm) {
        this.$store
          .dispatch('users/login', this.account)
          .then(() => {
            location.href = '/'
          })
          .catch((error) => {
            this.isError = true
            this.errMsg = error.code

            setTimeout(() => {
              this.isError = false
            }, 5000)
          })
      } else {
        alert('Hasła nie są identyczne, onSignup()')
      }
    },
  },
}
</script>

<style scoped>
.click-me {
  cursor: pointer;
}

.control.has-icons-left .icon,
.control.has-icons-right .icon {
  pointer-events: auto !important;
}
</style>
