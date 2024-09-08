<template>
  <div v-if="!isMobile()">
    <NavigationDesktop />
    <div class="container">
      <router-view v-if="hasLoadedData" />
      <p v-else>Loading...</p>
    </div>
  </div>
  <div v-else>
    <NavigationMobile />
    <div class="mob_container">
      <router-view v-if="hasLoadedData" />
      <p v-else>Loading...</p>
    </div>
  </div>
</template>
<script>
import NavigationDesktop from "@/components/NavigationDesktop.vue";
import NavigationMobile from "@/components/NavigationMobile.vue";
import { initialise } from "./firebase";

export default {
  name: "App",

  components: { NavigationDesktop, NavigationMobile },

  data() {
    return { hasLoadedData: false };
  },

  methods: {
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    initialise("darren");
    this.hasLoadedData = true;
  },
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
  /*max-width: 1080px;*/
  max-width: 100%;
  margin: 100px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid #622599;
  padding: 20px;
  border-radius: 5px;
}
.mob_container {
  max-width: 100%;
  margin: 0 auto 160px auto;
  overflow: auto;
  border: 1px solid #622599;
  border-radius: 5px;
}
</style>
