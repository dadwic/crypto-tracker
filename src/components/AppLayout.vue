<template>
  <v-app id="inspire">
    <v-app-bar app color="white" elevation="2">
      <v-container class="py-0 fill-height">
        <DialogForm />
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="noSymbol"
          @click="fetchSymbols"
          >Refresh</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn
          icon
          link
          href="https://github.com/dadwic/crypto-tracker"
          target="_blank"
        >
          <v-icon large>mdi-github</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet rounded="lg" elevation="2">
              <v-list color="transparent">
                <v-list-item v-if="noSymbol">
                  <v-list-item-content>
                    <v-list-item-title class="text-center"
                      >NO SYMBOL</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-for="(item, i) in $store.state.symbols"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{
                      item.symbol
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >{{ item.lastPrice }} -
                      {{ item.weightedAvgPrice }}</v-list-item-subtitle
                    >
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon @click="removeSymbol(item.symbol)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet class="pa-4" rounded="lg" elevation="2">
              <PieChart />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PieChart from "./Pie.vue";
import DialogForm from "./DialogForm.vue";
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "AppLayout",
  data() {
    return {
      polling: null
    };
  },
  components: {
    PieChart,
    DialogForm
  },

  computed: { ...mapGetters(["noSymbol"]), ...mapState(["loading"]) },
  methods: {
    ...mapActions(["addSymbol", "removeSymbol", "fetchSymbols"]),
    pollData() {
      // auto update every 20 mins
      this.polling = setInterval(() => {
        if (!this.$store.getters.noSymbol) {
          this.$store.dispatch("fetchSymbols");
        }
      }, 1000 * 60 * 20);
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    this.pollData();
  }
};
</script>
