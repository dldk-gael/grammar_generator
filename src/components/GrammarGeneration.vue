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
          <v-btn v-if="waitingSampling" block height="39px" color="red" @click="abortSample()">Abort</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0 px-2">
        <v-card>
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
    generations: []
  }),
  methods: {
    grammarSample() {
      console.log("grammar_sample");
      this.waitingSampling = true;
      let message = {
        order: "grammar_sample",
        number_of_samples: parseInt(this.number_of_samples),
        keep_top: parseInt(this.keep_top),
        use_gpt2: this.use_gpt2,
        strategy: this.strategy,
        grammar: this.$store.state.grammar
      };
      axios.post(this.$store.getters.server_address, message).then(reponse => {
        this.generations = reponse.data["generations"];
        this.waitingSampling = false;
      });
    }
  }
};
</script>

<style>
</style>