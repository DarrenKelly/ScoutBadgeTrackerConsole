<template>
  <header>
    <h1>Test Page</h1>
    <StyledButton
      @clicked="onButtonClicked"
      button_text="Read Events"
      colour="green"
    />
    <StyledButton
      @clicked="onButtonClicked"
      button_text="Commmit Events"
      colour="red"
    />
  </header>
</template>

<script>
import StyledButton from "@/components/widgets/StyledButton";
export default {
  name: "TestHeader",
  components: {
    StyledButton,
  },
  methods: {
    onButtonClicked(text) {
      if (text == "Read Events") {
        this.$emit("readEvents");
      } else if (text == "Commmit Events") {
        this.$emit("commitTestEvents");
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
