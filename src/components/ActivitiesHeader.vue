<template>
  <header>
    <h1>Events</h1>
    <StyledButton
      v-if="allowAdd"
      @clicked="onFormButtonClicked"
      :button_text="showForm ? 'Cancel' : 'Add Event'"
      :colour="showForm ? 'red' : 'green'"
    />
    <StyledButton
      @clicked="onFilterButtonClicked"
      :button_text="hideOldEvents ? 'Show Old' : 'Hide Old'"
      colour="blue"
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
  props: {
    hideOldEvents: Boolean,
    showForm: Boolean,
    allowAdd: Boolean,
  },
  emits: ["show-add-event-form", "filter-old-events"],
  methods: {
    onFormButtonClicked() {
      console.log("showForm=" + this.showForm);
      this.$emit("show-add-event-form");
    },
    onFilterButtonClicked() {
      this.$emit("filter-old-events");
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
