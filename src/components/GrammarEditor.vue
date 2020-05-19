<template>
  <v-container fluid>
    <v-header :inset="inset">Grammar Editor</v-header>
    <v-textarea style="line-height: 5px" class="pt-2" no-resize :value="grammar" outlined rows="17"></v-textarea>
  </v-container>
</template>

<script>
export default {
  name: "GrammarEditor",
  data: () => ({
    grammar: "s -> n v\nn -> 'gael'\nv->'play' | 'plays"
  })
};
</script>

<style>
.text-area-row {
    height: 50vh;
    margin-right: 0px !important;
    margin-left: 0px !important;
}
</style>