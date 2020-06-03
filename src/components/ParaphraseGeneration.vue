<template>
  <v-container fluid class="py-0">
    <span>Paraphrase Generation</span>

    <v-row>
      <v-col>
        <v-text-field v-if="waitingParaphrase" loading disabled></v-text-field>
        <v-alert v-if="waitingParaphrase" type="info" v-text="paraphrases_status"></v-alert>
        <v-card v-else>
          <v-list class="overflow-y-auto">
            <v-list-item-group color="primary">
              <v-list-item
                @click="parseSentence(paraphrase)"
                style="min-height:0px"
                v-for="(paraphrase, i) in paraphrases"
                :key="i"
              >
                <span>{{paraphrase}}</span>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ParaphraseGeneration",
  data: () => ({}),
  computed: {
    paraphrases: {
      get() {
        console.log(this.$store.state.paraphrases);
        return this.$store.state.paraphrases;
      }
    },
    waitingParaphrase: {
      get() {
        return this.$store.state.waitingParaphrase;
      }
    },
    paraphrases_status: {
      get() {
        return this.$store.state.paraphrases_status;
      }
    }
  },
  methods: {
    parseSentence(sentence) {
      let message = {
        sentence: sentence
      };
      let task_address = this.$store.getters.server_address + "/parse_sentence";
      axios.post(task_address, message).then(reponse => {
        console.log(reponse.data["results"])
        this.$store.commit("updateParseTree", reponse.data["results"]);
      });
    }
  }
};
</script>

<style>
</style>