<template>
  <v-container fluid>
    <span>Sample from Grammar</span>
    <v-row class="px-1" dense style="max-height:40px">
      <v-col>
        <v-radio-group v-model="strategy" row class="pt-0 mt-1">
          <v-radio label="MCTS with GPT2 score" value="MCTS"></v-radio>
          <v-radio label="Random Sampling" value="Random Sampling"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row style="max-height:75px">
      <v-col class="px-2">
        <v-text-field
          v-if="strategy == 'MCTS'"
          label="Number of tree walks"
          v-model="number_of_samples"
          outlined
          dense
        ></v-text-field>
        <v-text-field v-else label="Number of samples" v-model="number_of_samples" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-text-field label="Keep top" v-if="strategy == 'MCTS'" v-model="keep_top" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-btn
          block
          height="39px"
          color="primary"
          v-if="waitingSampling == false"
          @click="grammarSample()"
        >
          Sample
          <br />from grammar
        </v-btn>
        <v-btn v-if="waitingSampling" block height="39px" color="red" @click="abort">Abort</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 px-2">
        <v-text-field v-if="waitingSampling" loading disabled></v-text-field>
        <v-card v-else>
          <v-list style="max-height: 377px" class="overflow-y-auto">
            <v-list-item style="min-height:0px" v-for="(generation, i) in generations" :key="i">
              <v-list-item-content style="padding:0px" v-text="generation"></v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  name: "GrammarGeneration",
  data: () => ({
    strategy: "Random Sampling",
    number_of_samples: 10,
    waitingSampling: false,
    keep_top: 2,
    generations: [],
    abort_location: ""
  }),
  methods: {
    grammarSample() {
      this.waitingSampling = true;
      let message = {};
      let task_address = {};
      if (this.strategy == "Random Sampling") {
        message = {
          number_of_samples: parseInt(this.number_of_samples),
          grammar: this.$store.state.grammar
        };
        task_address =
          this.$store.getters.server_address + "/grammar/random_search";
      } else {
        message = {
          number_of_samples: parseInt(this.number_of_samples),
          keep_top: parseInt(this.keep_top),
          grammar: this.$store.state.grammar
        };
        task_address = this.$store.getters.server_address + "/grammar/mcts";
      }
      axios.post(task_address, message).then(reponse => {
        this.abort_location = reponse.data["abort_location"];
        this.checkGenerationStatus(reponse.data["status_location"]);
      });
    },

    checkGenerationStatus(status_location) {
      console.log(status_location);
      axios
        .get(this.$store.getters.server_address + status_location)
        .then(reponse => {
          let status = reponse.data["status"];
          if (status == "SUCCESS") {
            this.generations = reponse.data["generations"];
            this.waitingSampling = false;
          } else if (status == "PENDING" || status == "PROGRESS") {
            setTimeout(() => {
              this.checkGenerationStatus(status_location);
            }, 500);
          } else {
            this.waitingSampling = false;
          }
        });
    },

    abort() {
      axios
        .get(this.$store.getters.server_address + this.abort_location)
        .then(() => {
          this.waitingSampling = false;
        });
    }
  }
};
</script>

<style>
</style>