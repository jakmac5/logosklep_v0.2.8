<template>
  <div id="Ogloszenie">
    <p>bucket path: {{ $route.params.id }}</p>
    <p>NAZWA OGLOSZENIA {{ ogloszenia.nazwa }}</p>
    <div v-html="ogloszenia.opis_html">fgdfgdghfdfg</div>
    <FileUploadNew
      :bucket_path="$route.params.id"
      dbcol="test_upload_konkurs"
      :dbdoc="$route.params.id"
    />
    <p>Liczba aktywnych konkursów: {{ urls_to_go.length }}</p>

    <div class="columns" v-for="(logos, i) in chunkedLogos" :key="logos.index">
      <div
        @mouseover="hover = [i, j]"
        @mouseleave="hover = false"
        class="column"
        v-for="(logo, j) in logos"
        :key="logo.index"
      >
        <figure class="element" v-if="hover[0] == i && hover[1] == j">
          <Heart />

          <img :src="logo" @click="Like()" title="Like me" />
        </figure>

        <img v-else :src="logo" title="Like me" />
      </div>
    </div>
  </div>
</template>

<script>
// TODO > wczytanie konkursu poprawnego np /konkursy/poprawneid i przeladowanie bezposrednio na niepoprawny /konkurs/niepoprawneid zostawia dane z fs o poprawnymid
// 2 > zmienic konkursid z doc id na index z listy  ?
import Vue from 'vue'
import { db } from '@/plugins/firebase'
import FileUploadNew from '@/components/FileUploadNew.vue'
import { storage } from '@/plugins/firebase'
import Heart from '@/components/Heart.vue'
import _ from 'lodash'

//console.log(storageRef)

export default Vue.extend({
  name: 'Ogloszenie',
  components: { FileUploadNew, Heart },
  data() {
    return {
      ogloszenia: [],
      urls_to_go: [],
      loading: false,
      error: null,
      post: null,
      hover: false,
    }
  },
  computed: {
    chunkedLogos() {
      return _.chunk(this.urls_to_go, 3)
    },
  },
  created() {
    console.log(this.$route.params.id)
    this.getKonkursInfo(this.$route.params.id)
    // Now we get the references of these images
  },
  methods: {
    getKonkursInfo(konkursId) {
      db.collection('test_upload_konkurs')
        .doc(konkursId)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            let ogl = snapshot.data()
            //console.log(post)
            this.ogloszenia = ogl
          } else {
            // snapshot.data() will be undefined in this case
            console.log('No such document!')
          }
        })

      this.urls_to_go = []
      let storageRef = storage.ref(konkursId)
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
        console.log(this.urls_to_go)
      })
    },
  },
})
</script>

<style scoped>
.logo {
  width: 300px;
  overflow: hidden;
}

.element {
  cursor: pointer;
}
</style>