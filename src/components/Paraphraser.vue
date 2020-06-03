<template>
  <v-container fluid class="py-0">
    <span>Paraphraser</span>
    <v-row class="py-0">
      <v-col>
        <v-list color="transparent" style="max-height: 377px" dense class="overflow-y-auto, py-0">
          <v-list-item
            style="min-height:0px"
            v-for="(paraphrase_input, i) in paraphraseInput"
            :key="i"
          >
            <v-btn class="mx-2" fab x-small color="primary">
              <v-icon @click="deleteParaphraseInput(i)">mdi-minus</v-icon>
            </v-btn>
            <v-text-field class="py-0" v-model="paraphraseInput[i]" single-line></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-btn class="mx-2" fab x-small color="primary">
              <v-icon @click="addParaphraseInput">mdi-plus</v-icon>
            </v-btn>
            <v-text-field
              v-on:keyup.enter="addParaphraseInput"
              v-model="sentence"
              label="Add a sentence to paraphrase"
            ></v-text-field>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-combobox v-model="forbidden_words" label="Forbidden words" item-disabled multiple chips></v-combobox>
      </v-col>
    </v-row>
    <v-row style="height: 150px">
      <v-col class="px-2">
        <v-text-field label="Number of generations" v-model="number_of_samples" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-text-field label="Keep top" v-model="keep_top" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-btn
          block
          height="39px"
          color="primary"
          v-if="waitingParaphrase == false"
          @click="paraphrase()"
        >Generate paraphrase</v-btn>
        <v-btn block height="39px" color="red" v-if="waitingParaphrase" @click="abort()">Abort</v-btn>
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
    keep_top: 2,
    status_addr: ""
  }),
  computed: {
    waitingParaphrase: {
      get() {
        return this.$store.state.waitingParaphrase;
      }
    },
    paraphraseInput: {
      get() {
        return this.$store.state.paraphrase_input;
      }
    }
  },

  created() {
    this.$store.commit("updateWaitingParaphrase", false);
  },

  methods: {
    paraphraseInputIdx(i) {
      console.log(i);
    },
    words_in_sentence() {
      return this.sentence.split(" ");
    },
    paraphrase() {
      this.$store.commit("updateWaitingParaphrase", true);
      console.log("paraphrase");
      let message = {
        number_of_samples: parseInt(this.number_of_samples),
        forbidden_words: this.forbidden_words,
        keep_top: parseInt(this.keep_top),
        sentences_to_paraphrase: this.$store.state.paraphrase_input
      };
      axios
        .post(this.$store.getters.server_address + "/paraphrase", message)
        .then(reponse => {
          console.log(reponse.data);
          this.abort_location = reponse.data["abort_location"];
          this.check_paraphrase_status(reponse.data["status_location"]);
        });
    },

    check_paraphrase_status(status_location) {
      console.log(status_location);
      axios
        .get(this.$store.getters.server_address + status_location)
        .then(reponse => {
          console.log(reponse.data);
          let status = reponse.data["status"];
          let paraphrases_status = status;
          if (status == "PROGRESS") {
            paraphrases_status = status.concat(": ", reponse.data["details"]);
          }
          this.$store.commit("updateParaphrasesStatus", paraphrases_status);
          if (status == "SUCCESS") {
            this.$store.commit("updateParaphrases", reponse.data["results"]);
            this.$store.commit("updateWaitingParaphrase", false);
          } else if (status == "PENDING" || status == "PROGRESS") {
            setTimeout(() => {
              this.check_paraphrase_status(status_location);
            }, 2000);
          } else {
            this.$store.commit("updateWaitingParaphrase", false);
          }
        });
    },
    abort() {
      axios
        .get(this.$store.getters.server_address + this.abort_location)
        .then(() => {
          this.$store.commit("updateWaitingParaphrase", false);
        });
    },
    deleteParaphraseInput(i) {
      this.$store.commit("removeParaphraseInput", i);
    },
    addParaphraseInput() {
      this.$store.commit("addParaphraseInput", this.sentence);
      this.sentence = "";
    }
  }
};
</script>

<style>
</style>