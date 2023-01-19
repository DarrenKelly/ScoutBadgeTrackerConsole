<template>
  <button
    @click="onCLick()"
    :class="[
      this.manuallySet || this.activitySet ? 'cell-success' : 'cell-wip',
    ]"
  ></button>
</template>

<script>
export default {
  name: "OasButton",
  props: {
    oasStatement: Number,
    scoutId: String,
    initiallySetManually: Boolean,
    activitySet: Boolean,
  },
  data: function () {
    return {
      manuallySet: Boolean,
    };
  },
  created() {
    this.manuallySet = this.initiallySetManually;
  },
  methods: {
    onCLick() {
      if (this.activitySet) {
        return;
      }
      this.manuallySet = !this.manuallySet;
      this.$emit(
        "manual-change",
        this.oasStatement,
        this.scoutId,
        this.manuallySet
      );
    },
  },
};
</script>
<style>
.cell-success {
  background: #83ac86;
  color: black;
}
.cell-success::after {
  content: "👍";
}
.cell-wip {
  background: #eee;
  color: black;
}
.cell-wip::after {
  content: "⬜";
}
</style>
