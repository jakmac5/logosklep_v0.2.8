<template>
    <div id="graficy">
        <h2 class="title is-2">3 Najlepszych grafików:</h2>
         <div class="columns is-multiline">
      <div
        class="column is-one-third"
        v-for="(user, index) in graficy"
        v-bind:key="index"
      >
      <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{user.username}}</p>
        <p class="subtitle is-6">@Professional</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
      </div>
         </div>
    </div>
</template>

<script>
import {db} from '@/plugins/firebase'
// jak wyswietlac grafikow? 

// na start tych co maja prace w portfolio w
// potem tych co maja prace w portfolio i brali udzial w konkursie / zaplacili / wygrali konkurs

    export default {
        data(){
            return {
                graficy:[],
            }
        },
        methods:{
            async getBestUsers(){
                const snapshot = await db.collection('users').where('choice','==','Grafik').limit(3).get()
                if(snapshot.empty){
                    console.log("NO USERS!")
                }
                else{
                    snapshot.forEach(doc => {
                        this.graficy.push(doc.data())
                    })
                }

}
        },
        mounted(){
            this.getBestUsers()
        },
    }
</script>

<style scoped>

</style>