<template>
  <div id="ListaOgloszen">
    <p>LISTA OGLOSZEN {{ ogloszenia.count }}</p>
    <div class="columns is-multiline">
      <div
        class="column is-one-third"
        v-for="(ogl, index) in ogloszenia.lista"
        v-bind:key="ogl.nazwa"
      >
        <nuxt-link
          :to="{ path: '/konkursy/' + ogloszenia.id_list[index] }"
          class="nav-link"
          >Overview</nuxt-link
        >
        {{ ogloszenia.id_list[index] }}
        {{ ogl.konkurs_id }}
        {{ ogl.autor }}
        {{ ogl.cena }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { db } from '@/plugins/firebase'

export default Vue.extend({
  name: 'ListaOgloszen',
  data() {
    return {
      ogloszenia: [],
    }
  },
  created() {
    db.collection('test_proceed_konkurs')
      .doc('lista_konkursow')
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let ogl = snapshot.data()
          //console.log(post)
          this.ogloszenia = ogl
        } else {
          // snapshot.data() will be undefined in this case
          console.log('No such document!')
        }
      })
  },
})
</script>
