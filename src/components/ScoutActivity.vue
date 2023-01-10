<template>
  <div
    @click="onClick"
    :class="[
      activity.date < new Date().toISOString().split('T')[0] ? 'past' : '',
      selected ? 'selected' : '',
      'activity',
    ]"
  >
    <div class="title">
      {{ activity.name }}
      <p class="date">{{ activity.date }} {{ activity.location }}</p>
    </div>
    <div class="midblock">
      <img
        src="@/assets/Water.png"
        :class="[
          activity.type &&
          (activity.type.includes('Water') ||
            activity.type.includes('Canoe') ||
            activity.type.includes('Kayak'))
            ? 'icon'
            : 'gone',
        ]"
      />
      <img
        src="@/assets/Canoe.png"
        :class="[
          activity.type &&
          (activity.type.includes('Canoe') || activity.type.includes('Kayak'))
            ? 'icon'
            : 'gone',
        ]"
      />
      <img
        src="@/assets/GreyWolf.png"
        :class="[
          activity.type && activity.type.includes('Wolf') ? 'icon' : 'gone',
        ]"
      />
      <img
        src="@/assets/CampFire.png"
        :class="[
          activity.type &&
          (activity.type.includes('Camp') ||
            activity.type.includes('Overnight'))
            ? 'icon'
            : 'gone',
        ]"
      />
      <img
        src="@/assets/Hike.png"
        :class="[
          activity.type && activity.type.includes('Hike') ? 'icon' : 'gone',
        ]"
      />
      <img
        src="@/assets/Plane.png"
        :class="[
          activity.type && activity.type.includes('Fly') ? 'icon' : 'gone',
        ]"
      />
      <img
        src="@/assets/Fishing.png"
        :class="[
          activity.type && activity.type.includes('Fish') ? 'icon' : 'gone',
        ]"
      />
    </div>
    <div>
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
  components: {
    ActivityForm,
  },
  emits: [
    "update-activity",
    "delete-activity",
    "deselect-activity",
    "select-activity",
  ],
  methods: {
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
  grid-template-columns: auto auto 60px;
  height: 60px;
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
.type {
  font-size: 12px;
}
.date {
  font-size: 12px;
}
.icon {
  width: 45px;
  height: auto;
}
.gone {
  display: none;
}
.midblock {
  margin-left: auto;
  margin-right: 10px;
}
</style>
