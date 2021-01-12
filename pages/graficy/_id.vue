<template>
    <div>
        Hello graficy web page
            <p>params id: {{ $route.params.id }}</p>
<Portfolio :username="$route.params.id"/>
    </div>
</template>

<script>
import Portfolio from '@/components/Portfolio.vue';

export default {
    components: {Portfolio},
    data() {
        return {
    }
        },

  
}
</script>

<style scoped>


</style>