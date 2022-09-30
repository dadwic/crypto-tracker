<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template #activator="{ on, attrs }">
      <v-btn
        v-if="$store.state.symbols.length > 0"
        dark
        class="mr-2"
        color="primary"
        v-bind="attrs"
        v-on="on"
        >Add / Update</v-btn
      >
      <v-btn
        v-else
        dark
        class="mr-2"
        color="primary"
        v-bind="attrs"
        v-on="on"
        >Add Stock</v-btn
      >
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Symbol search</span>
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          multiple
          clearable
          item-text="symbol"
          item-value="symbol"
          label="Search for a coin..."
          return-object
          solo
        >
          <template #no-data>
            <v-list-item>
              <v-list-item-title>
                Search for your favorite
                <strong>Cryptocurrency</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template #selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-bitcoin</v-icon>
              <span>{{ item.symbol }}</span>
            </v-chip>
          </template>
          <template #item="{ item }">
            <v-list-item-avatar
              color="indigo"
              class="text-h5 font-weight-light white--text"
            >
              {{ item.symbol.charAt(0) }}
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.symbol }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.symbol
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-bitcoin</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model">
          <v-list-item v-for="(item, i) in model" :key="i">
            <v-list-item-content>
              <v-list-item-title>{{ item.symbol }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.lastPrice
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-if="getBySymbol(item.symbol)"
                icon
                @click="removeSymbol(item.symbol)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-btn v-else icon @click="addSymbol(item)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    isLoading: false,
    items: [],
    model: null,
    search: null
  }),
  computed: mapGetters(["getBySymbol"]),
  methods: mapActions(["addSymbol", "removeSymbol"]),
  // eslint-disable-next-line vue/order-in-components
  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api2.binance.com/api/v3/ticker/24hr")
        .then((res) => res.clone().json())
        .then((res) => {
          this.items = res;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>
