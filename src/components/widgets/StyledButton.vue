<template>
  <button @click="onCLick()" class="btn" :style="{ background: colour }">
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
    onCLick() {
      console.log("Click " + this.button_text);
      this.$emit("clicked", this.button_text);
    },
  },
};
</script>
