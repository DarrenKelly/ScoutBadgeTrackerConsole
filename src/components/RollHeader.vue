<template>
  <header>
    <h1>Rollcall</h1>
    <StyledButton
      @clicked="onSaveButtonClicked"
      button_text="Save"
      colour="green"
    />
    <StyledButton
      @clicked="onArchivedButtonClicked"
      button_text="Show Archived"
      colour="blue"
    />
    <StyledButton
      @clicked="onCancelButtonClicked"
      button_text="Cancel"
      colour="red"
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
    onArchivedButtonClicked() {
      console.log("Toggling Archived");
      this.$emit("toggle-archived");
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
