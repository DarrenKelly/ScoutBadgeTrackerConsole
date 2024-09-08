<template>
  <header>
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
  name: "RollFooter",
  components: {
    StyledButton,
  },
  props: {},
  emits: ["save-rollcall"],
  methods: {
    onSaveButtonClicked() {
      console.log("Rollcall Saving");
      this.$emit("save-rollcall");
    },
  },
};
</script>
