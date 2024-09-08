<template>
  <div id="mobnav">
    <router-link to="/"><img src="@/assets/mobilenav/home.png" /></router-link>
    <router-link to="/activities"
      ><img src="@/assets/mobilenav/activities.png"
    /></router-link>
    <router-link to="/members"
      ><img src="@/assets/mobilenav/members.png"
    /></router-link>
    <router-link to="/rollcall"
      ><img src="@/assets/mobilenav/rollcall.png"
    /></router-link>
    <router-link to="/about"
      ><img src="@/assets/mobilenav/about.png"
    /></router-link>
    <!-- <router-link to="/test">Test</router-link> -->
  </div>
</template>

<script>
export default {
  name: "NavigationMobile",
};
</script>
