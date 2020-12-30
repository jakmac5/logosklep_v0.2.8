<template>
  <section>
    <b-steps
      v-model="activeStep"
      :has-navigation="false"
      type="is-black"
      mobile-mode="compact"
    >
      <b-step-item :clickable="true" step="1" label="Design">
        Design: zacznijmy od określenia designów, które lubisz. Pomożesz
        grafikowi zrozumieć jaki styl lubisz.
      </b-step-item>
      <b-step-item :clickable="true" step="2" label="Styl marki">
        <h1 class="Opis">
          Określiliśmy Twój styl na podstawie wybranych prac, możesz go poprawić
          teraz, lub w trakcie trwania konkursu.
        </h1>

        <div class="container">
          <div class="table-row">
            <div class="cell-text">Classic</div>
            <div class="icon-left is-medium" @click="addclassic">
              <fa :icon="['fas', 'arrow-alt-circle-left']"></fa>
            </div>

            <b-progress class="sliders" :value="classicmodern"></b-progress>
            <div class="icon-right is-medium" @click="addmodern">
              <fa :icon="['fas', 'arrow-alt-circle-right']"></fa>
            </div>
            <div class="cell-text">Modern</div>
          </div>
          <div class="table-row">
            <div class="cell-text">Mature</div>

            <div class="icon-left is-medium" @click="addmature">
              <fa :icon="['fas', 'arrow-alt-circle-left']"></fa>
            </div>

            <b-progress class="sliders" :value="mature"></b-progress>
            <div class="icon-right is-medium" @click="addyouthful">
              <fa :icon="['fas', 'arrow-alt-circle-right']"></fa>
            </div>
            <div class="cell-text">Youthful</div>
          </div>
          <div class="table-row">
            <div class="cell-text">Feminine</div>

            <div class="icon-left is-medium" @click="addfeminine">
              <fa :icon="['fas', 'arrow-alt-circle-left']"></fa>
            </div>

            <b-progress class="sliders" :value="femine"></b-progress>
            <div class="icon-right is-medium" @click="addmasculine">
              <fa :icon="['fas', 'arrow-alt-circle-right']"></fa>
            </div>
            <div class="cell-text">Masculine</div>
          </div>
          <div class="table-row">
            <div class="cell-text">Playful</div>

            <div class="icon-left is-medium" @click="addplayful">
              <fa :icon="['fas', 'arrow-alt-circle-left']"></fa>
            </div>

            <b-progress class="sliders" :value="playful"></b-progress>
            <div class="icon-right is-medium" @click="addsophisticated">
              <fa :icon="['fas', 'arrow-alt-circle-right']"></fa>
            </div>
            <div class="cell-text">Sophisticated</div>
          </div>
          <div class="table-row">
            <div class="cell-text">Economical</div>

            <div class="icon-left is-medium" @click="addeconomical">
              <fa :icon="['fas', 'arrow-alt-circle-left']"></fa>
            </div>

            <b-progress class="sliders" :value="economical"></b-progress>
            <div class="icon-right is-medium" @click="addluxurious">
              <fa :icon="['fas', 'arrow-alt-circle-right']"></fa>
            </div>
            <div class="cell-text">Luxurious</div>
          </div>
          <div class="table-row">
            <div class="cell-text">Geometric</div>

            <div class="icon-left is-medium" @click="addgeometric">
              <fa :icon="['fas', 'arrow-alt-circle-left']"></fa>
            </div>

            <b-progress class="sliders" :value="geometric"></b-progress>
            <div class="icon-right is-medium" @click="addorganic">
              <fa :icon="['fas', 'arrow-alt-circle-right']"></fa>
            </div>
            <div class="cell-text">Organic</div>
          </div>
          <div class="table-row">
            <div class="cell-text">Abstract</div>

            <div class="icon-left is-medium" @click="addabstract">
              <fa :icon="['fas', 'arrow-alt-circle-left']"></fa>
            </div>

            <b-progress class="sliders" :value="abstract"></b-progress>
            <div class="icon-right is-medium" @click="addliteral">
              <fa :icon="['fas', 'arrow-alt-circle-right']"></fa>
            </div>
            <div class="cell-text">Literal</div>
          </div>
        </div>
      </b-step-item>
      <b-step-item :clickable="true" step="3" label="Kolory">
        Jakie kolory preferujesz?
      </b-step-item>
      <b-step-item :clickable="true" step="4" label="Informacje">
        Autor: {{ user.email }} Podaj czas trwania konkursu
        <input v-model="dni" /> Podaj nazwe <input v-model="nazwa" /> Podaj opis
        <input v-model="opis" />
        <section>
          <p class="content"><b>selected</b>: {{ kategoria }}</p>
          <b-field>
            <b-select multiple native-size="8" v-model="kategoria">
              <option value="Strona internetowa">Strona internetowa</option>
              <option value="Baner">Baner</option>
              <option value="Logo">Logo</option>
              <option value="Inne">Inne</option>
            </b-select>
          </b-field>
        </section>
      </b-step-item>
      <b-step-item :clickable="true" step="5" label="Płatność">
        Podaj cene <input v-model="cena" />
        <section>
          <b-button @click="getdate">Click Me</b-button>
        </section>
      </b-step-item>
    </b-steps>
    <div id="footer-new">
      {{ activeStep + 1 }}
    </div>
  </section>
</template>

<script>
// created, destroyed and handleResize() is for screen width - currently not in use
import { db } from '@/plugins/firebase'

export default {
  data() {
    return {
      activeStep: 0,
      classicmodern: 50,
      mature: 50,
      femine: 50,
      playful: 50,
      economical: 50,
      geometric: 50,
      abstract: 50,
      width: 0,
      dni: 0,
      kategoria: [],
      nazwa: '',
      opis: '',
      cena: 0,
    }
  },
  // there is better way than process.browser (plugin way)?
  created() {
    if (process.browser) {
      window.addEventListener('resize', this.handleResize)
      this.handleResize()
    }
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('resize', this.handleResize)
    }
  },

  methods: {
    UploadNew(cena, dni, data, autor, nazwa, opis, kategoria) {
      let testcollection = db.collection('test_upload_konkurs') // unikatowa nazwa dokumentu change name to autor

      testcollection.add({
        // time
        // konkurs_id: db.collection('test_upload_konkurs').doc().id,
        cena: cena,
        dni: dni,
        czas: data,
        autor: autor,
        nazwa: nazwa,
        opis_html: opis,
        kategoria: kategoria,
      })
    },
    getdate() {
      let currentDate = new Date()
      //alert(currentDate)
      let currentDateWithFormat = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '/')
      console.log(currentDateWithFormat)
      this.UploadNew(
        this.cena,
        this.dni,
        currentDateWithFormat,
        this.user.email,
        this.nazwa,
        this.opis,
        this.kategoria
      )
    },
    handleResize() {
      if (process.browser) {
        this.width = window.innerWidth
      }
    },
    addclassic() {
      if (this.classicmodern <= 10) this.classicmodern = 0
      else this.classicmodern -= 10
    },
    addmodern() {
      if (this.classicmodern >= 90) this.classicmodern = 100
      else this.classicmodern += 10
    },
    addmature() {
      if (this.mature <= 10) this.mature = 0
      else this.mature -= 10
    },
    addyouthful() {
      if (this.mature >= 90) this.mature = 100
      else this.mature += 10
    },
    addfeminine() {
      if (this.femine <= 10) this.femine = 0
      else this.femine -= 10
    },
    addmasculine() {
      if (this.femine >= 90) this.femine = 100
      else this.femine += 10
    },
    addplayful() {
      if (this.playful <= 10) this.playful = 0
      else this.playful -= 10
    },
    addsophisticated() {
      if (this.playful >= 90) this.playful = 100
      else this.playful += 10
    },
    addeconomical() {
      if (this.economical <= 10) this.economical = 0
      else this.economical -= 10
    },
    addluxurious() {
      if (this.economical >= 90) this.economical = 100
      else this.economical += 10
    },
    addgeometric() {
      if (this.geometric <= 10) this.geometric = 0
      else this.geometric -= 10
    },
    addorganic() {
      if (this.geometric >= 90) this.geometric = 100
      else this.geometric += 10
    },
    addabstract() {
      if (this.abstract <= 10) this.abstract = 0
      else this.abstract -= 10
    },
    addliteral() {
      if (this.abstract >= 90) this.abstract = 100
      else this.abstract += 10
    },
  },
  computed: {
    screenwidth() {
      if (this.window.innerWidth < 769) return true
    },

    user() {
      return this.$store.getters['users/getUser']
    },

    baseSteps() {
      return [
        {
          label: 'Design',
          content:
            'Design: zacznijmy od określenia designów, które lubisz. Pomożesz grafikowi zrozumieć jaki styl lubisz.',
          displayed: true,
        },
        {
          label: 'Styl marki',
          content:
            'Określiliśmy Twój styl na podstawie wybranych prac, możesz go poprawić teraz, lub w trakcie trwania konkursu',
          displayed: true,
        },
        {
          label: 'Kolory',
          content: 'Jakie kolory preferujesz?',
          displayed: true,
        },
        {
          label: 'Informacje',
          content: 'Uzupełnij formualrz.',
          displayed: true,
        },
        {
          label: 'Płatność',
          content: 'to be content',
          displayed: true,
        },
      ]
    },
    steps() {
      const steps = [...this.baseSteps]
      return steps
    },
  },
}
</script>

<style scoped>
#footer-new {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: grey;
  height: 50px;
}

.container {
  display: table;

  border-spacing: 0 30px;
}

.cell-text {
  display: table-cell;
  padding: 1rem;
}

input {
  color: red;
}

.margin-top {
  margin-top: 30px;
}

.table-row {
  display: table-row;
}

.sliders {
  width: 300px;
  display: table-cell;
  padding: 10px;
}

.icon-left {
  display: table-cell;
  cursor: pointer;
}
.icon-right {
  display: table-cell;
  cursor: pointer;
}

.icon-button-left {
  float: left;
}

.icon-button-right {
  float: left;
}

.Opis {
  margin-left: auto;
  margin-right: auto;
}
</style>
