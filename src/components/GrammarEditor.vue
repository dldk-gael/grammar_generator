<template>
  <v-container fluid class="py-0">
    <v-subheader :inset="inset">Grammar Editor</v-subheader>
    <v-textarea class="py-0" no-resize :value="grammar" outlined rows="15"></v-textarea>
    
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
</style>