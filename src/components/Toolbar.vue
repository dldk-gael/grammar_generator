<template>
  <v-toolbar app dark class="indigo" id="toolbar">
    <v-toolbar-title class="headline text-uppercase">
      <span>Context free grammar - Writer</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      label="python server"
      outlined
      dense
      v-model="domain"
      @change="tryConnect()"
      style="padding-top: 20px; padding-left:10px"
    ></v-text-field>
    <v-text-field
      label="port"
      outlined
      dense
      v-model="port"
      style="padding-top: 20px; padding-left:10px; max-width:100px"
      @change="tryConnect()"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-alert
      style="margin-top: 10px"
      dense
      type="success"
      v-if="is_connected"
    >Connected to python backend</v-alert>
    <v-alert
      style="margin-top: 10px"
      v-else
      dense
      type="error"
    >Fail to connect to python backend</v-alert>
  </v-toolbar>
</template>

<script>
import axios from "axios";
export default {
  name: "Toolbar",
  data() {
    return {
      is_connected: false
    };
  },

  computed: {
    domain: {
      get() {
        return this.$store.state.backend_domain;
      },
      set(value) {
        this.$store.commit("updateBackendDomain", value);
      }
    },
    port: {
      get() {
        return this.$store.state.backend_port;
      },
      set(value) {
        this.$store.commit("updateBackendPort", value);
      }
    }
  },

  methods: {
    tryConnect() {
      let me = this;
      axios
        .get(me.$store.getters.server_address + "/ping")
        .then(response => {
          me.is_connected = true;
          console.log(me.$store.getters.server_address);
          console.log(response.data);
        })
        .catch(error => {
          me.is_connected = false;
          console.log(error);
        });
    }
  },
  created() {
    this.tryConnect();
    setInterval(this.tryConnect, 5000);
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