<template>
  <v-container fluid class="py-0">
    <v-header :inset="inset">Paraphrase Generation</v-header>

    <v-row>
      <v-col>
        <v-card>
          <v-list class="overflow-y-auto">
            <v-list-item style="min-height:0px" v-for="(paraphrase, i) in paraphrases" :key="i">
              <v-list-item-content style="padding:0px" v-text="paraphrase"></v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
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