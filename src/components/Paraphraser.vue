<template>
  <v-container fluid class="py-0">
    <v-subheader :inset="inset">Paraphraser</v-subheader>
    <v-row class="py-0">
      <v-col style = "max-height:85px" class="px-2">
        <v-text-field v-model="sentence" label="Sentence to paraphrase" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row :align="align" no-gutters style="height: 150px">
      <v-col class="px-2">
        <v-text-field label="Number of samples" placeholder="10" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-text-field label="Keep top" placeholder="2" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-btn depressed color="primary">Generate paraphrase</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Paraphraser",
  data: () => ({
    sentence: "",
    nb_samples: 10,
    top_n: 2
  })
};
</script>

<style>
</style>