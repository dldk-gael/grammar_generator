<template>
  <v-app>
    <toolbar></toolbar>
    <v-container class="grey lighten-5 pa-0">
      <v-row>
        <v-col class="py-0">
          <grammar-editor></grammar-editor>
        </v-col>
        <v-col class="py-0">
          <grammar-generation></grammar-generation>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <paraphraser></paraphraser>
        </v-col>
        <v-col class="py-0">
          <paraphrase-generation></paraphrase-generation>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar";
import GrammarEditor from "./components/GrammarEditor";
import GrammarGeneration from "./components/GrammarGeneration"
import Paraphraser from "./components/Paraphraser"
import ParaphraseGeneration from "./components/ParaphraseGeneration"
export default {
  name: "App",

  components: {
    Toolbar,
    GrammarEditor,
    GrammarGeneration,
    Paraphraser,
    ParaphraseGeneration
  },

  data: () => ({
    //
  })
};
</script>
