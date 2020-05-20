<template>
  <v-container fluid>
    <span>Grammar Editor</span>
    <v-textarea
      style="line-height: 5px"
      class="pt-2"
      no-resize
      v-model="grammar"
      outlined
      rows="17"
    ></v-textarea>
  </v-container>
</template>

<script>
export default {
  name: "GrammarEditor",
  data: () => ({}),
  computed: {
    grammar: {
      get() {
        return this.$store.state.grammar;
      },
      set(value) {
        this.$store.commit("updateGrammar", value);
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