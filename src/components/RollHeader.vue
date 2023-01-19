<template>
  <header>
    <h1>Rollcall</h1>
    <StyledButton
      @clicked="onCancelButtonClicked"
      button_text="Cancel"
      colour="red"
    />
    <StyledButton
      @clicked="onSaveButtonClicked"
      button_text="Save"
      colour="green"
    />
  </header>
</template>

<script>
import StyledButton from "@/components/widgets/StyledButton";
export default {
  name: "RollHeader",
  components: {
    StyledButton,
  },
  props: {},
  emits: ["save-rollcall", "cancel-changes"],
  methods: {
    onCancelButtonClicked() {
      console.log("Rollcall Canceled");
      this.$emit("cancel-changes");
    },
    onSaveButtonClicked() {
      console.log("Rollcall Saving");
      this.$emit("save-rollcall");
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
