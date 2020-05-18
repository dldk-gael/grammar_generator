<template>
  <v-container fluid class="py-0">
    <v-subheader :inset="inset">Sample from Grammar</v-subheader>
    <v-row>
      <v-btn-toggle v-model="toggle_exclusive">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on">
              <v-btn text small>
                MCTS
                <br />(GPT2Score)
              </v-btn>
            </v-btn>
          </template>
          <span>Use MonteCarlo TreeSearch strategy to sample from the grammar.</span>
        </v-tooltip>
        <v-btn>
          <v-btn text small>
            RandomSearch
            <br />(GPT2Score)
          </v-btn>
        </v-btn>
        <v-btn>
          <v-btn text small>
            RandomSearch
            <br />(no score)
          </v-btn>
        </v-btn>
      </v-btn-toggle>
    </v-row>

    <v-row class="pt-2" style="max-height:75px">
      <v-col class="pa-2">
        <v-text-field label="Number of samples" placeholder="10" outlined dense></v-text-field>
      </v-col>
      <v-col class="pa-2">
        <v-text-field label="Keep top" placeholder="2" outlined dense></v-text-field>
      </v-col>
      <v-col class="pa-2">
        <v-btn depressed color="primary">
          Sample
          <br />from grammar
        </v-btn>
      </v-col>
    </v-row>
      <v-card outlined max-height="300px" class="overflow-y-auto">
        <div v-for="generation in generations" :key="generation" v-text="generation"></div>
      </v-card>
  </v-container>
</template>


<script>
export default {
  name: "GrammarGeneration",
  data: () => ({
    generations: [
      "generation 1",
      "generation 2",
      "generation 3",
      "generation 2",
      "generation 3",
      "generation 2",
      "generation 3",
      "generation 2",
      "generation 3",
      "generation 2",
      "generation 3",
      "generation 2",
      "generation 3",
      "generation 2",
      "generation 3",
      "generation 2",
      "generation 3"
    ]
  })
};
</script>

<style>
</style>