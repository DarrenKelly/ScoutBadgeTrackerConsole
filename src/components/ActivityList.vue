<template>
  <div v-for="activity in activities" :key="activity.id">
    <ScoutActivity
      @update-activity="updateActivity"
      @delete-activity="deleteActivity"
      @select-activity="selectActivity"
      @deselect-activity="deselectActivity"
      :activity="activity"
      :selected="activity.id == selectedId"
      :allowEdit="allowEdit"
      v-if="
        selectedId == activity.id ||
        (selectedId == '' &&
          (!hideOldActivities ||
            activity.date >= new Date().toISOString().split('T')[0]))
      "
    />
  </div>
</template>

<script>
import ScoutActivity from "./ScoutActivity";

export default {
  name: "activityList",
  props: {
    activities: Array,
    selectedId: String,
    hideOldActivities: Boolean,
    allowEdit: Boolean,
  },
  components: {
    ScoutActivity,
  },
  emits: [
    "update-activity",
    "delete-activity",
    "deselect-activity",
    "select-activity",
  ],
  methods: {
    updateActivity(modifiedActivity) {
      console.log("activityList updateActivity with Id " + modifiedActivity.id);
      this.$emit("update-activity", modifiedActivity);
    },
    deleteActivity(activityId) {
      console.log("activityList deleteActivity with Id " + activityId);
      this.$emit("delete-activity", activityId);
    },
    deselectActivity(activityId) {
      console.log("activityList deselectActivity with Id " + activityId);
      this.$emit("deselect-activity", activityId);
    },
    selectActivity(activityId) {
      console.log("activityList selectActivity with Id " + activityId);
      this.$emit("select-activity", activityId);
    },
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log("activityList beforeCreate()");
  },
  created() {
    console.log("activityList created()");
    console.log("activities = " + JSON.stringify(this.activities));
  },
  beforeMount() {
    console.log("activityList beforeMount()");
  },
  mounted() {
    console.log("activityList mounted()");
  },
  beforeUnmount() {
    console.log("activityList beforeUnmount()");
  },
  unmounted() {
    console.log("activityList unmounted()");
  },
  beforeUpdate() {
    console.log("activityList beforeUpdate()");
  },
  unpdate() {
    console.log("activityList unpdate()");
  },
};
</script>
