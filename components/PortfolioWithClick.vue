<template>
    <div class="portfolio-display">
      selected: {{ selected_tab }}
    <div class="columns" v-for="(logos) in chunkedLogos" :key="logos.index">
      <div
        class="column"
        v-for="(logo) in logos"
        :key="logo.index"
        @click="selectPhoto(logo)"
        v-bind:class="{'selected': selected_tab.includes(logo)}"
      >
<img :src="logo" />
      </div>
    </div>
      <b-button type="is-link" @click="selectedToDB()">Link it</b-button>
    </div>

</template>

<script>
import _ from 'lodash'
import {db} from '@/plugins/firebase'
import {storage} from '@/plugins/firebase'

    export default {
        name:'portfolio-display',
        data(){
            return {
                urls_to_go:[],
                user: [],
                selected_tab: [],
               // current: [],
            }
        },
        props:['username'],
        computed:{
            chunkedLogos() {
            return _.chunk(this.urls_to_go, 4)
            },
        },
        
mounted() {
this.sync_portfolio()
},
  methods: {
   async selectedToDB(){
      const snap = await db.collection('users').where('userId','==',this.username).get()
      if(snap.empty){
        console.log('lipa')
      }
      else{
        snap.forEach(doc => {
          doc.ref.update({ best_of_3: this.selected_tab})
        })
      }
    },
     arrayRemove(arr, value) { 
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    },
    
     alert() {
                this.$buefy.dialog.alert('Możesz wybrać tylko 3')
            },

    selectPhoto(logo){
      if (this.selected_tab.includes(logo)){
        this.selected_tab = this.arrayRemove(this.selected_tab, logo);
 
      }
      else{
        this.selected_tab.length === 3 ?  this.alert()  :  this.selected_tab.push(logo);
      }
    },

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
    
    async sync_portfolio() {
            
            
        console.log(this.username)
        const snapshot = await db.collection('users').where('username', '==', this.username.toString()).get()
        
        if (snapshot.empty) {
            const snapshot2 = await db.collection('users').where('userId', '==', this.username.toString()).get()
        if (snapshot2.emmpty){
            console.log("snapshot graficy/username empty")
        }
        else{
            snapshot2.forEach(doc => {
            this.user = doc.data();
         this.loadPortfolio(this.user.userId)
});  
        }
    }
    else{
snapshot.forEach(doc => {
  this.user = doc.data();
  this.loadPortfolio(this.user.userId)
});    }    
    },
    
    },
    }
</script>

<style scoped>

.selected{
  opacity: 0.2
}
</style>