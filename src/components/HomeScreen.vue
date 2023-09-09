<template>
  <div :class="[isMobile() ? 'mob_container' : 'logo_container']">
    <h1>2nd Gordon Cubs</h1>
    <img
      src="@/assets/NSWScoutsLogo.png"
      alt="NSW Scouts Logo"
      :class="[isMobile() ? 'mob_logo' : 'logo']"
    />
  </div>
</template>
<script>
export default {
  name: "HomeScreen",
  methods: {
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.logo_container {
  width: 90%;
}
.mob_container {
  object-fit: cover;
}
.logo {
  width: 95%;
}
.mob_logo {
  width: 600px;
  height: 300px;
  object-fit: contain;
}
</style>
