<template>
  <div id="Ogloszenie" v-if="firebase_error===false">
    <p>bucket path: {{ $route.params.id }}</p>
    <p>NAZWA OGLOSZENIA {{ ogloszenia.nazwa }}</p>
    <div v-html="ogloszenia.opis_html">fgdfgdghfdfg</div>
    <FileUploadNew
      :bucket_path="$route.params.id"
      dbcol="test_upload_konkurs"
      :dbdoc="$route.params.id"
    />
    <p>Liczba prac w konkursie: {{ urls_to_go.length }}</p>

    <div class="columns" v-for="(logos, i) in chunkedLogos" :key="logos.index">
      <div
        @mouseover="hover = [i, j]"
        @mouseleave="hover = false"
        class="column"
        v-for="(logo, j) in logos"
        :key="logo.index"
      >
        <div class="box">
        <figure class="element" v-if="hover[0] == i && hover[1] == j">
          <img :src="logo" @click="Like()" title="Like me" />
        <div class="text">
          <Heart />
        </div>
        </figure>
        <img v-else :src="logo" title="Like me" />
        </div>
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
import Heart from '@/assets/Heart.vue'
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
      firebase_error: false,
    }
  },
  computed: {
    chunkedLogos() {
      return _.chunk(this.urls_to_go, 3)
    },
  },
  mounted() {
    console.log(this.$route.params.id)
    this.getKonkursInfo(this.$route.params.id)
    // Now we get the references of these images
  },
  methods: {
    getKonkursInfo(konkursId) {
      try{
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
        /*
        if (!storageRef.exists){
          console.log('no such storage')
          return
        }
        */
      storageRef.listAll().then((result,reject) => {
        function reject(error){
          console.log(error)
          return
        }
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
          }
          catch(err){
            console.log(err)
            this.firebase_error=true
          }
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
    .box{
        position: relative;
        display: inline-block; /* Make the width of box same as image */
    }
    .box .text{
        position: absolute;
        z-index: 999;
        margin: 0 auto;
        left: 0;
        right: 0;
        top: 40%; /* Adjust this value to move the positioned div up and down */
        text-align: center;
        width: 60%; /* Set the width of the positioned div */
    }

</style>