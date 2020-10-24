<template>
  <div class="DodajKonkurs">
    <div id="app" class="container">
      <section>
        <b-field>
          <b-input
            placeholder="Nazwa ogłoszenia"
            v-model="nazwa_ogloszenia"
            size="is-large"
            icon="calendar"
          >
          </b-input>
        </b-field>
        <div class="block">
          <b-field label="Ustal cene">
            <div class="control">
              <b-slider
                v-model="maxHeight"
                :min="200"
                :max="3000"
                rounded
                :disabled="isScrollable"
              >
                <template v-for="val in [500, 1000, 1500]">
                  <b-slider-tick :value="val" :key="val">{{
                    val
                  }}</b-slider-tick>
                </template>
              </b-slider>
            </div>
          </b-field>
        </div>

        <b-dropdown
          :scrollable="isScrollable"
          :max-height="maxHeight"
          v-model="currentMenu"
          aria-role="list"
        >
          <button class="button is-primary" type="button" slot="trigger">
            <template>
              <b-icon :icon="currentMenu.icon"></b-icon>
              <span>{{ currentMenu.text }}</span>
            </template>
            <b-icon icon="menu-down"></b-icon>
          </button>

          <b-dropdown-item
            v-for="(menu, index) in menus"
            :key="index"
            :value="menu"
            aria-role="listitem"
          >
            <div class="media">
              <b-icon class="media-left" :icon="menu.icon"></b-icon>
              <div class="media-content">
                <h3>{{ menu.text }}</h3>
              </div>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </section>
      <section class="margin-top">
        <b-field>
          <b-button
            @click="$refs.datepicker.toggle()"
            icon-left="calendar-today"
            type="is-primary"
          />
          <b-datepicker
            ref="datepicker"
            expanded
            placeholder="Data zakończenia konkursu"
          >
          </b-datepicker>
        </b-field>
      </section>
    </div>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore' //db.timestamp
// 539 i 117

//const testcollection = database.collection('test_upload_konkurs').doc(autor+'_dokument') // unikatowa nazwa dokumentu

export default {
  name: 'DodajKonkurs',
  components: {},

  data: () => ({
    b_p: 'bucket_path_hello',
    konkurs_id: 12502,
    cena: 500,
    slider: 45,
    creation_date: firebase.firestore.Timestamp.fromDate(new Date()),
    autor_nick: '',
    kategoria: '',
    nazwa_ogloszenia: '',
    content: '<h1>Some juicy text</h1>',
    customToolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image', 'code-block'],
    ],
    rules: [
      (value) => !!value || 'Pole obowiązkowe',
      (value) => (value && value.length >= 10) || 'Min 10 characters',
    ],
    kategorie: ['Logo', 'Baner', 'Wizytówka', 'Strona internetowa'],
    isScrollable: false,
    maxHeight: 200,
    currentMenu: { icon: 'account-group', text: 'Logo' },
    menus: [
      { icon: 'account-group', text: 'Logo' },
      { icon: 'credit-card-multiple', text: 'Wizytówka' },
      { icon: 'web', text: 'Strona internetowa' },
      { icon: 'cart-arrow-right', text: 'Baner' },
    ],
  }),

  methods: {
    UploadNew(cena, slider, creation_date, author, name, opis, kategoria) {
      let testcollection = db.collection('test_upload_konkurs') // unikatowa nazwa dokumentu change name to autor

      testcollection.add({
        // time
        // konkurs_id: db.collection('test_upload_konkurs').doc().id,
        cena: cena,
        dni: slider,
        czas: creation_date,
        autor: author,
        nazwa: name,
        opis_html: opis,
        kategoria: kategoria,
      })
    },
  },
}
</script>

<style scoped>
input {
  color: red;
}

.margin-top {
  margin-top: 30px;
}
</style>
