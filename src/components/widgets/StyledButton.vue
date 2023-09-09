<template>
  <button
    @click="onCLick()"
    :class="[this.isMobile() ? 'mobile_btn' : 'btn']"
    :style="{ background: colour }"
  >
    {{ button_text }}
  </button>
</template>

<script>
export default {
  name: "StyledButton",
  props: {
    button_text: String,
    colour: String,
  },
  methods: {
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
    onCLick() {
      console.log("Click " + this.button_text);
      this.$emit("clicked", this.button_text);
    },
  },
};
</script>
