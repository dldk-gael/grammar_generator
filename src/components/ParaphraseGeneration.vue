<template>
  <v-container fluid class="py-0">
    <v-subheader :inset="inset">Paraphrase Generation</v-subheader>
    <v-card outlined max-height="200px" class="overflow-y-auto">
      <div v-for="paraphrase in paraphrases" :key="paraphrase" v-text="paraphrase"></div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ParaphraseGeneration",
  data: () => ({
    sentence: "",
    nb_samples: 10,
    paraphrases: ["Paraphrase 1", "Paraphrase 2", "Paraphrase 3"],
    top_n: 2
  })
};
</script>

<style>
</style>