<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/activities">Activities</router-link>
    <router-link to="/members">Members</router-link>
    <router-link to="/rollcall">Roll Call</router-link>
    <router-link to="/milestones">Milestones</router-link>
    <router-link to="/oas">OAS</router-link>
    <Badges title="Badges" />
    <router-link to="/attendance">Attendance</router-link>
    <router-link to="/about">About</router-link>
    <!-- <router-link to="/test">Test</router-link> -->
  </div>
</template>

<script>
import Badges from "../components/Badges";
export default {
  name: "NavigationDesktop",
  components: {
    Badges,
  },
};
</script>
