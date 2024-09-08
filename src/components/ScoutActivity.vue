<template>
  <div
    @click="onClick"
    :class="[
      this.isMobile() ? 'mobile_list_element' : '',
      activity.date < new Date().toISOString().split('T')[0] ? 'past' : '',
      selected ? 'selected' : '',
      this.isMobile() ? 'mobile_activity' : 'activity',
    ]"
  >
    <div :class="[isMobile() ? 'mob_title' : 'title']">
      {{ activity.name }}

      <p :class="[isMobile() ? 'mob_date' : 'date']">
        {{ activity.date }} {{ activity.location }}
      </p>
    </div>
    <div :class="[this.isMobile() ? 'mobile_midblockl' : 'midblockl']">
      <div v-show="!this.isMobile()">Rollcall attendees:</div>
      ({{ activity.participants.length }} inc. {{ countYouths }} youths )
    </div>
    <div class="midblockr">
      <ActivityIcon :icon_type="activity.type" :compact="!this.isMobile()" />
    </div>
    <div v-show="!this.isMobile()">
      <i class="type">{{ activity.type }}</i>
    </div>
  </div>
  <div v-if="showEditForm">
    <ActivityForm
      @update-activity="updateActivity"
      @delete-activity="deleteActivity"
      :allowDelete="true"
      :prefill="activity"
    />
  </div>
</template>

<script>
import ActivityForm from "@/components/ActivityForm.vue";
import ActivityIcon from "@/components/widgets/ActivityIcon.vue";

export default {
  name: "ScoutActivity",
  data() {
    return {
      showEditForm: false,
    };
  },
  props: {
    activity: Object,
    allowEdit: Boolean,
    selected: Boolean,
  },
  computed: {
    countYouths() {
      return this.activity.participants.filter(
        (item) => item.membertype === "Youth"
      ).length;
    },
  },
  components: {
    ActivityForm,
    ActivityIcon,
  },
  emits: [
    "update-activity",
    "delete-activity",
    "deselect-activity",
    "select-activity",
  ],
  methods: {
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
    onClick() {
      console.log(
        "Clicked on Activity with Id " +
          this.activity.id +
          " selected=" +
          this.selected
      );
      if (this.allowEdit) {
        this.showEditForm = !this.showEditForm;
      } else if (this.selected) {
        this.$emit("deselect-activity", this.activity.id);
      } else {
        this.$emit("select-activity", this.activity.id);
      }
    },
    updateActivity(modifiedActivity) {
      console.log(
        "ScoutActivity updateActivity with Id " + modifiedActivity.id
      );
      this.$emit("update-activity", modifiedActivity);
      this.showEditForm = false;
    },
    deleteActivity(activityId) {
      console.log("ScoutActivity deleteActivity with Id " + activityId);
      this.$emit("delete-activity", activityId);
      this.showEditForm = false;
    },
  },
};
</script>

<style scoped>
.activity {
  background: #f4f4f4;
  display: grid;
  grid-template-columns: auto auto auto 60px;
  height: 60px;
  margin: 5px;
  padding: 10px 5px;
}
.mobile_activity {
  background: #f4f4f4;
  display: grid;
  grid-template-columns: auto auto auto 60px;
  height: 200px;
  margin: 5px;
  padding: 10px 5px;
}
.activity.selected {
  background: #a4f4a4;
}
.activity.past {
  border-left: 5px solid red;
}
.title {
  align-items: left;
}
.mob_title {
  align-items: left;
  font-size: 60px;
}
.type {
  font-size: 12px;
}
.date {
  font-size: 12px;
}
.mob_date {
  font-size: 30px;
}
.mobile_midblockl {
  margin-left: 5px;
  margin-right: auto;
  font-size: 25px;
}
.midblockl {
  margin-left: 10px;
  margin-right: auto;
}
.midblockr {
  margin-left: auto;
  margin-right: 10px;
}
</style>
