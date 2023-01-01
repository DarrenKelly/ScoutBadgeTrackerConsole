<template>
  <header>
    <h1>Events</h1>
    <StyledButton
      @clicked="onButtonClicked"
      button_text="Add Event"
      colour="green"
    />
  </header>
</template>

<script>
import StyledButton from "./StyledButton";
export default {
  name: "EventsHeader",
  components: {
    StyledButton,
  },
  methods: {
    onButtonClicked() {
      // Toggle form visibility
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
