<template>
  <div id="ListaOgloszen">

    <p>LISTA OGLOSZEN {{ ogloszenia.count }}</p>
    
    
    <section>
        <div class="columns is-multiline">
      <div
        class="column is-one-third"
        v-for="(num, index) in iterations"
        v-bind:key="index"
      >
        <div class="card" aria-id="contentIdForA11y3">
            <div
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                    <template v-if="!loading">  <nuxt-link
          :to="{ path: '/konkursy/' + ogloszenia.id_list[index] }"
          class="nav-link"
          >Overview</nuxt-link
        > </template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </p>
            </div>
            <div class="card-content">
                <div class="content">
                    <template v-if="!loading">
     ogloszenia.id_list[index]:  {{ ogloszenia.id_list[index] }}

                     </template>
                    <b-skeleton size="is-large" :active="loading" :count="2"></b-skeleton>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item">
                    <template v-if="!loading">
                       konkurs_id:       {{ ogloszenia.lista[index].konkurs_id }}
                    </template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </a>
                <a class="card-footer-item">
                    <template v-if="!loading">
Autor: {{ ogloszenia.lista[index].autor }}

                    </template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </a>
                <a class="card-footer-item">
                    <template v-if="!loading">Cena
                              {{ ogloszenia.lista[index].cena }}
                       </template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </a>
            </footer>
        </div>
      </div>
        </div>
    </section>

    
    
    
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
      loading: true,
      iterations: [1,2,3,4,5]
    }
  },
/*
    mounted() {
        setInterval(() => {
            this.loading = !this.loading
               }, 3 * 1000)
    },
  */
  created() {
    db.collection('test_proceed_konkurs')
      .doc('lista_konkursow')
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          let ogl = snapshot.data()
          //console.log(post)
          this.ogloszenia = ogl
          console.log(ogl)
          this.loading = !this.loading
    } else {
          // snapshot.data() will be undefined in this case
          console.log('No such document!')
        }
      })
  },
})
</script>
