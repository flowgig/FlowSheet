<template>
  <div v-html="htmlContent">
    
  </div>
</template>

<script>
  import * as quark from 'quark-gui';
  export default {
    name: 'editSongInfo',
    data () {
      return {
        test: 'testdata',
        htmlContent: quark.Molecules.Messaging.Modal.getModule({
        id: 'editSongInfo',
        title: 'testmodaltittel',
        content: `<input v-model='$parent.$parent.metaInfo.title' name=''><button>close</button>`
      })
      }
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
