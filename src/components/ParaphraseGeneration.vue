<template>
  <v-container fluid class="py-0">
    <span>Paraphrase Generation</span>

    <v-row>
      <v-col>
        <v-text-field v-if="waitingParaphrase" loading disabled></v-text-field>
        <v-alert v-if="waitingParaphrase" type="info" v-text="paraphrases_status"></v-alert>
        <v-card v-else>
          <v-list class="overflow-y-auto">
            <v-list-item style="min-height:0px" v-for="(paraphrase, i) in paraphrases" :key="i">
            <span>{{i+1}}. {{paraphrase}}</span>
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
  data: () => ({}),
  computed: {
    paraphrases: {
      get() {
        console.log(this.$store.state.paraphrases)
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
        return this.$store.state.paraphrases_status
      }
    }
  }
};
</script>

<style>
</style>