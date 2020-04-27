<template>
 <v-app id="inspire">
      <ListUser></ListUser>
 </v-app>
</template>
<script>
import ListUser from './ListUser'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = false
    },
    components:{
      ListUser
    }
  }
</script>