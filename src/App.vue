<template>
  <v-app>
    <v-main>
      <AppLayout />
    </v-main>
  </v-app>
</template>

<script>
import AppLayout from "./components/AppLayout";

export default {
  name: "App",

  components: {
    AppLayout
  },

  data: () => ({
    //
  })
};
</script>
