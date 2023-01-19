<template>
  <header>
    <h1>Activities</h1>
    <StyledButton
      v-if="allowAdd"
      @clicked="onFormButtonClicked"
      :button_text="showForm ? 'Cancel' : 'Add Activity'"
      :colour="showForm ? 'red' : 'green'"
    />
    <StyledButton
      @clicked="onFilterButtonClicked"
      :button_text="hideOldActivities ? 'Show Old' : 'Hide Old'"
      colour="blue"
    />
  </header>
</template>

<script>
import StyledButton from "./widgets/StyledButton";
export default {
  name: "ActivitiesHeader",
  components: {
    StyledButton,
  },
  props: {
    hideOldActivities: Boolean,
    showForm: Boolean,
    allowAdd: Boolean,
  },
  emits: ["show-add-activity-form", "filter-old-activities"],
  methods: {
    onFormButtonClicked() {
      console.log("showForm=" + this.showForm);
      this.$emit("show-add-activity-form");
    },
    onFilterButtonClicked() {
      this.$emit("filter-old-activities");
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
