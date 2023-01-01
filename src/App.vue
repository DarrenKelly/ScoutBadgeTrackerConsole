<template>
  <TheNavigation />
  <div class="container">
    <router-view v-if="hasLoadedData" />
    <p v-else>Loading...</p>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation.vue";
import { initialise } from "./firebase";

export default {
  components: { TheNavigation },

  data() {
    return { hasLoadedData: false };
  },
  created() {
    initialise("darren");
    this.hasLoadedData = true;
  },
  methods: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 1080px;
  margin: 15px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 20px;
  border-radius: 5px;
}
</style>
