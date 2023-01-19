<template>
  <header>
    <h1>Members</h1>
    <StyledButton
      @clicked="onFormButtonClicked"
      :button_text="showForm ? 'Cancel' : 'Add Member'"
      :colour="showForm ? 'red' : 'green'"
    />
    <StyledButton
      @clicked="onFilterButtonClicked"
      :button_text="hideOldMembers ? 'Show Old' : 'Hide Old'"
      colour="blue"
    />
  </header>
</template>

<script>
import StyledButton from "@/components/widgets/StyledButton";
export default {
  name: "MembersHeader",
  components: {
    StyledButton,
  },
  props: {
    hideOldMembers: Boolean,
    showForm: Boolean,
  },
  emits: ["show-add-member-form", "filter-old-members"],
  methods: {
    onFormButtonClicked() {
      console.log("showForm=" + this.showForm);
      this.$emit("show-add-member-form");
    },
    onFilterButtonClicked() {
      this.$emit("filter-old-members");
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
