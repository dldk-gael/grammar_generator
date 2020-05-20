<template>
  <v-container fluid class="py-0">
    <span>Paraphraser</span>
    <v-row class="py-0">
      <v-col style="max-height:85px" class="px-2">
        <v-text-field v-model="sentence" label="Sentence to paraphrase" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-combobox
          v-model="forbidden_words"
          label="Forbidden words"
          item-disabled=""
          multiple
          chips
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row style="height: 150px">
      <v-col class="px-2">
        <v-text-field label="Number of samples" v-model="number_of_samples" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-text-field label="Keep top" v-model="keep_top" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-btn block height="39px" color="primary" @click="paraphrase()">Generate paraphrase</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Paraphraser",
  data: () => ({
    forbidden_words: [],
    sentence: "",
    number_of_samples: 10,
    keep_top: 2
  }),
  computed: {
    words_in_sentence() {
      return this.sentence.split(" ");
    }
  },
  methods: {
    paraphrase() {
      var me = this;
      console.log("paraphrase");
      let message = {
        order: "paraphrase",
        number_of_samples: parseInt(this.number_of_samples),
        forbidden_words: this.forbidden_words,
        keep_top: parseInt(this.keep_top),
        sentence_to_paraphrase: this.sentence
      };
      axios.post(this.$store.getters.server_address, message).then(reponse => {
        me.$store.commit("updateParaphrases", reponse.data["paraphrases"]);
      });
    }
  }
};
</script>

<style>
</style>