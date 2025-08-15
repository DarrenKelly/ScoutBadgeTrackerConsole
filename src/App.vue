<template>
  <div v-if="!isMobile">
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
import { ref, computed, onMounted, onBeforeUnmount, watchEffect } from "vue";
import NavigationDesktop from "@/components/NavigationDesktop.vue";
import NavigationMobile from "@/components/NavigationMobile.vue";
import { initialise } from "./firebase";

export default {
  name: "App",
  components: { NavigationDesktop, NavigationMobile },
  setup() {
    // For debugging environment variables
    console.log(
      "VUE_APP_BACKGROUND_COLOR:",
      process.env.VUE_APP_BACKGROUND_COLOR
    );
    // --- STATE ---
    const hasLoadedData = ref(false);
    const isMobile = ref(false);

    // --- COMPUTED ---
    const backgroundColor = computed(() => {
      return process.env.VUE_APP_BACKGROUND_COLOR || "#fff";
    });

    watchEffect(() => {
      // This is a robust way to set a global CSS variable from component state.
      // It runs once on setup and automatically re-runs if backgroundColor
      // were to ever change.
      document.documentElement.style.setProperty(
        "--scoutpurple",
        backgroundColor.value
      );
    });

    // --- METHODS ---
    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const handleMediaQueryChange = (e) => {
      isMobile.value = e.matches;
    };

    // --- LIFECYCLE HOOKS ---
    onMounted(async () => {
      // Initial check
      handleMediaQueryChange(mediaQuery);
      // Add listener for changes
      mediaQuery.addEventListener("change", handleMediaQueryChange);

      await initialise("darren");
      hasLoadedData.value = true;
    });

    onBeforeUnmount(() => {
      // Clean up the listener to prevent memory leaks
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    });

    return { hasLoadedData, isMobile, backgroundColor };
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
  border: 1px solid var(--scoutpurple);
  padding: 20px;
  border-radius: 5px;
}
.mob_container {
  max-width: 100%;
  margin: 0 auto 160px auto;
  overflow: auto;
  border: 1px solid var(--scoutpurple);
  border-radius: 5px;
}
</style>
