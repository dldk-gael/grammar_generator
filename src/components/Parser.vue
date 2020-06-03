<template>
  <v-container fluid>
    <center>
        <pre>{{parse_tree}}</pre>
    </center>
  </v-container>
</template>

<script>
export default {
  name: "Parser",
  data: () => ({}),
  computed: {
    parse_tree: {
      get() {
        return this.$store.state.parse_tree
      } 
    }
  }
};
</script>

<style>
.text-area-row {
  height: 50vh;
  margin-right: 0px !important;
  margin-left: 0px !important;
}
</style>