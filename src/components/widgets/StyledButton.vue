<template>
  <button
    @click="onCLick()"
    :class="[isMobile ? 'mobile_btn' : 'btn']"
    :style="{ background: colour }"
  >
    {{ button_text }}
  </button>
</template>

<script>
import { useMobileDetection } from "@/composables/useMobileDetection.js";

export default {
  name: "StyledButton",
  props: {
    button_text: String,
    colour: String,
  },
  setup() {
    const { isMobile } = useMobileDetection();
    return { isMobile };
  },
  methods: {
    onCLick() {
      console.log("Click " + this.button_text);
      this.$emit("clicked", this.button_text);
    },
  },
};
</script>
