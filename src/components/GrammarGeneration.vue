<template>
  <v-container fluid>
    <v-header :inset="inset">Sample from Grammar</v-header>
    <v-row class="px-1" dense  style="max-height:40px">
      <v-col>
      <v-radio-group v-model="row" row class="pt-0 mt-1">
        <v-radio label="MCTS" value="radio-1"></v-radio>
        <v-radio label="RandomSearch" value="radio-2"></v-radio>
      </v-radio-group>
      </v-col>
      <v-col>
      <v-switch class="pt-0 mt-1" v-model="use_gpt2" label="Use GPT2 to score sentence"></v-switch>
      </v-col>
    </v-row>

    <v-row style="max-height:75px">
      <v-col class="px-2">
        <v-text-field label="Number of samples" placeholder="10" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-text-field label="Keep top" placeholder="2" outlined dense></v-text-field>
      </v-col>
      <v-col class="px-2">
        <v-btn block height="39px" color="primary">
          Sample
          <br />from grammar
        </v-btn>
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
export default {
  name: "GrammarGeneration",
  data: () => ({
    strategies: ["MCTS", "RandomSearch", "Random (No heuristic)"],
    use_gpt2: true,
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