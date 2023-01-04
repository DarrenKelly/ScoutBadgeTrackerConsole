<template>
  <div class="activitys">
    <ActivitiesHeader
      @show-add-activity-form="toggleAddActivityForm"
      @filter-old-activities="filterOldActivities"
      :showForm="showForm"
      :allowAdd="true"
      :hideOldActivities="hideOldActivities"
    />
    <div v-if="showForm">
      <ActivityForm
        @update-activity="addNewActivity"
        :allow-delete="false"
        :prefill="prefill"
      />
    </div>
    <ActivityList
      @update-activity="modifyActivity"
      @delete-activity="removeActivity"
      :activitys="activitysdata"
      :allowEdit="true"
      :hideOldActivities="hideOldActivities"
      :selectedId="''"
    />
  </div>
</template>

<script>
import ActivitiesHeader from "@/components/ActivitiesHeader";
import ActivityList from "@/components/ActivityList";
import ActivityForm from "@/components/ActivityForm.vue";
import { activities, writeActivity, deleteActivity } from "@/firebase";

export default {
  name: "activityView",
  components: {
    ActivitiesHeader,
    ActivityList,
    ActivityForm,
  },
  data() {
    return {
      activitysdata: activities,
      selectedId: null,
      hideOldactivitys: true,
      showForm: false,
      prefill: {
        id: null,
        type: null,
        name: null,
        date: null,
        location: null,
        duration: null,
        hikeKms: null,
        note: null,
      },
    };
  },
  methods: {
    onAddActivity(newactivity) {
      console.log("activityView onAddActivity()");
      writeActivity(newactivity);
      this.activitysdata.push(newactivity);
      this.showForm = false;
    },
    modifyActivity(modifiedActivity) {
      console.log("activityView modifyActivity()");

      const found = this.activitiesData.find(
        (el) => el.id == modifiedActivity.id
      );

      found.type = modifiedActivity.type;
      found.name = modifiedActivity.name;
      found.date = modifiedActivity.date;
      found.location = modifiedActivity.location;
      found.duration = modifiedActivity.duration;
      found.hikeKms = modifiedActivity.hikeKms;
      found.theme = modifiedActivity.theme;
      found.note = modifiedActivity.note;
      found.participants = modifiedActivity.participants;

      writeActivity(modifiedActivity);
    },
    removeActivity(activityId) {
      console.log("activityView deleteActivity()");

      const found = this.activitysdata.find((el) => el.id == activityId);
      const index = this.activitysdata.indexOf(found);
      this.activitysdata.splice(index, 1);

      deleteActivity(activityId);
    },
    filterOldActivities() {
      console.log("activityView filterOldActivities() ");
      this.hideOldActivities = !this.hideOldActivities;
    },
    toggleAddActivityForm() {
      console.log("activityView toggleAddActivityForm()");
      this.showForm = !this.showForm;
    },
  },
  props: {},
  beforeCreate() {
    console.log("activityView beforeCreate()");
  },
  created() {
    console.log("activityView created()");
  },
  beforeMount() {
    console.log("activityView beforeMount()");
  },
  mounted() {
    console.log("activityView mounted()");
  },
  beforeUnmount() {
    console.log("activityView beforeUnmount()");
  },
  unmounted() {
    console.log("activityView unmounted()");
  },
  beforeUpdate() {
    console.log("activityView beforeUpdate()");
  },
  unpdate() {
    console.log("activityView unpdate()");
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
