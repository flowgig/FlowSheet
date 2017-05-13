<template>
  <div>
    <edit-song-info></edit-song-info>
  </div>

  
</template>

<script>
import EditSongInfo from './modals/EditSongInfo.vue'
 export default {
  name: 'modals',
  data () {
    return {
      test: 'testdata'
    }
  },
  components: {
    editSongInfo: EditSongInfo
  },
  created (){
  },
  computed: {},
  methods: {
  }
}
</script>

<style lang="css">

</style>
