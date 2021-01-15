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
{{interval}}
  <b-carousel  :pause-info="false" :repeat="true" :pause-hover="false" :autoplay="autoplay[index]" :interval="interval[index]"  >
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i" >
           <img v-on:mouseover="mouseover(index)"
    v-on:mouseleave="mouseleave(index)" :src="carousel.url">
        </b-carousel-item>
    </b-carousel>
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
import Vue from 'vue'
// jak wyswietlac grafikow? 

// na start tych co maja prace w portfolio w
// potem tych co maja prace w portfolio i brali udzial w konkursie / zaplacili / wygrali konkurs


// zmienic interval na pierwszym wyswietlanym zdjeciu na 0 a potem 2000
    export default 
    Vue.extend({
        data(){
            return {
                graficy:[],
                   carousels: [
                { text: 'Slide 1', url: 'https://firebasestorage.googleapis.com/v0/b/grfikapp.appspot.com/o/Wqv3eSBiulTMBoiLlVdDuPXsVA22%2F00119530-4ffb-11eb-b38d-0d9514ffb46b.png?alt=media&token=fb403c76-f579-4f99-ab23-b6526b4cc92a' },
                { text: 'Slide 2', url: 'https://firebasestorage.googleapis.com/v0/b/grfikapp.appspot.com/o/Wqv3eSBiulTMBoiLlVdDuPXsVA22%2F00119530-4ffb-11eb-b38d-0d9514ffb46b.png?alt=media&token=fb403c76-f579-4f99-ab23-b6526b4cc92a' },
                { text: 'Slide 3', url: 'https://firebasestorage.googleapis.com/v0/b/grfikapp.appspot.com/o/Wqv3eSBiulTMBoiLlVdDuPXsVA22%2F00119530-4ffb-11eb-b38d-0d9514ffb46b.png?alt=media&token=fb403c76-f579-4f99-ab23-b6526b4cc92a' },
            ],
            autoplay: [false, false, false],
            interval:[1880,1880,1880],
            }
        },
        methods:{
              mouseover: function(i){
      Vue.set(this.autoplay,i,true)        
    },    
    mouseleave: function(i){
      Vue.set(this.autoplay,i,false)
    },
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
    })
</script>

<style scoped>

</style> 