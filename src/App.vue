<template>
  <v-app>
    <v-main>
      <AppLayout />
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import AppLayout from "./components/AppLayout";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  data: () => ({
    //
  }),
};
</script>
