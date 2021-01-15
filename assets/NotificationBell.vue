<template>
<div>
    <b-dropdown
           position="is-bottom-left"
           append-to-body
           aria-role="menu"
           trap-focus
       >
         <template #trigger>
        <b-tooltip label="Powiadomienia"
            type="is-dark"
            position="is-bottom">
    <div id="button-avatar-bell" aria-controls="contentIdForA11y1" @click="notif_num2=0" >
<svg id="ringbackground" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/></svg>
<svg id="bellsvg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"/></svg>
<svg id="smallring" :style="{opacity:opacity}" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12"/>
<text x="12" y="12" class="number_of_notif">{{notif_num2}}</text></svg>
    </div>
        </b-tooltip>
        </template>
     <b-dropdown-item
        aria-role="menu-item"
        :focusable="false"
        custom
        paddingless>
            <div class="modal-card" style="width:300px;">
                <section class="modal-card-body">
                    Tu beda wypisane powiadomienia
                </section>
            </div>
     </b-dropdown-item>
             </b-dropdown>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return{
            notif_num2: this.notif_num, 
            opacity: 1,
        }
    },
    props:['notif_num'],
    watch:{
        notif_num2: function(newVal,oldVal){
            if (newVal==0 || newVal=='0'){
            this.notif_num2 = ''
            this.opacity = 0
            }
            if (newVal!=0 && newVal!='0'){
            this.opacity = 1
            this.notif_num2 = newVal
            }
        }
    },
    mounted() {
        if(this.notif_num2==0 || this.notif_num2=='0'){
            this.notif_num2 = ''
            this.opacity = 0
        }
    }
})
</script>

<style scoped>
#bellsvg{
    position: relative;
        top:-38px;
    left: 7px; 
}

#ringbackground{
    fill: #CCCCCC;
    position: relative;
        top:0px;
    left: 0px;
}
#smallring{
    fill: #FA383E;
    position: relative;
    top:-50px;
    left: 0px;
}
.number_of_notif{
    fill:white;
    position: relative;
}
#button-avatar-bell{
    position: relative;
    padding:10px;
    float: left;
    cursor: pointer;
    width:40px;
    height: 40px;
}

</style>