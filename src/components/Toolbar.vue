<template>
  <v-toolbar app dark class="indigo" id="toolbar">
    <v-toolbar-title class="headline text-uppercase">
      <span>Context free grammar - Writer</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      label="python server"
      placeholder="localhost"
      outlined
      dense
      v-model="ip_adress"
      :rules="[validateAdress]"
      style="padding-top: 20px; padding-left:10px"
    ></v-text-field>
    <v-text-field
      label="port"
      placeholder="7777"
      outlined
      dense
      v-model="local_port"
      :rules="[validatePort]"
      style="padding-top: 20px; padding-left:10px; max-width=100px"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-alert
      style="margin-top: 10px"
      dense
      outlined
      type="success"
      v-if="is_connected"
    >Connected to python backend</v-alert>
    <v-alert
      style="margin-top: 10px"
      v-else
      dense
      outlined
      type="error"
    >Fail to connect to python backend</v-alert>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      is_connected: false,
      ip_adress: "",
      local_port: ""
    };
  }
};
</script>


<style>
#toolbar {
    align-items: stretch;
    height: 60px;
    max-height: 60px;
    width: 100vw;
    max-width: 100vw;
}
</style>