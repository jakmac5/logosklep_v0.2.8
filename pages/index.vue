<template>
  <div class="hp">
    <h1>home page</h1>
    <div class="fill"></div>
    <div class="bottom"></div>

    <div class="listaOgloszen">
      <ListaOgloszen />
    </div>
  </div>
</template>

<script>
import ListaOgloszen from '@/components/ListaOgloszen.vue'

export default {
  components: {
    ListaOgloszen,
  },

}
</script>

<style scoped>
.hp {
  position: table;
}

.bottom {
  height: 80px;
  position: absolute;
  bottom: 0%;
  width: 100%;
  background-color: #393838;
  opacity: 1;
}

.scroll {
  height: 2000px;
}

.listaOgloszen {
  position: sticky;
  width: 100%;
}
</style>
