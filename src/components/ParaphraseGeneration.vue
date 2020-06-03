<template>
  <v-container fluid class="py-0">
    <span>Paraphrase Generation</span>

    <v-row>
      <v-col>
        <v-text-field v-if="waitingParaphrase" loading disabled></v-text-field>
        <v-alert v-if="waitingParaphrase" type="info" v-text="paraphrases_status"></v-alert>
        <v-card v-else>
          <v-dialog v-model="dialog" width="85%">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>Parse Tree</v-card-title>
              <v-card-text>
                <center>
                  <pre>{{parse_tree}}</pre>
                </center>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">CLOSE</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-list style="max-height: 377px" dense class="overflow-y-auto">
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
  data: () => ({
    parse_tree: "",
    dialog: false
  }),
  computed: {
    paraphrases: {
      get() {
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
      this.dialog = true
      this.parse_tree = "";
      let message = {
        sentence: sentence
      };
      let task_address = this.$store.getters.server_address + "/parse_sentence";
      axios.post(task_address, message).then(reponse => {
        this.parse_tree = reponse.data["results"];
      });
    }
  }
};
</script>

<style>
</style>