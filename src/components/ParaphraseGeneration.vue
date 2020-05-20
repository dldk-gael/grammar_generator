<template>
  <v-container fluid class="py-0">
    <span>Paraphrase Generation</span>

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
        return this.$store.state.waitingParaphrase
      }
    }
  }
};
</script>

<style>
</style>