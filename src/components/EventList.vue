<template>
  <div v-for="event in events" :key="event.id">
    <ScoutEvent
      @update-event="updateEvent"
      @delete-event="deleteEvent"
      @select-event="selectEvent"
      @deselect-event="deselectEvent"
      :event="event"
      :selected="event.id == selectedId"
      :allowEdit="allowEdit"
      v-if="
        selectedId == event.id ||
        (selectedId == '' &&
          (!hideOldEvents ||
            event.date >= new Date().toISOString().split('T')[0]))
      "
    />
  </div>
</template>

<script>
import ScoutEvent from "./ScoutEvent";

export default {
  name: "EventList",
  props: {
    events: Array,
    selectedId: String,
    hideOldEvents: Boolean,
    allowEdit: Boolean,
  },
  components: {
    ScoutEvent,
  },
  emits: ["update-event", "delete-event", "deselect-event", "select-event"],
  methods: {
    updateEvent(modifiedEvent) {
      console.log("EventList updateEvent with Id " + modifiedEvent.id);
      this.$emit("update-event", modifiedEvent);
    },
    deleteEvent(eventId) {
      console.log("EventList deleteEvent with Id " + eventId);
      this.$emit("delete-event", eventId);
    },
    deselectEvent(eventId) {
      console.log("EventList deselectEvent with Id " + eventId);
      this.$emit("deselect-event", eventId);
    },
    selectEvent(eventId) {
      console.log("EventList selectEvent with Id " + eventId);
      this.$emit("select-event", eventId);
    },
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log("EventList beforeCreate()");
  },
  created() {
    console.log("EventList created()");
  },
  beforeMount() {
    console.log("EventList beforeMount()");
  },
  mounted() {
    console.log("EventList mounted()");
  },
  beforeUnmount() {
    console.log("EventList beforeUnmount()");
  },
  unmounted() {
    console.log("EventList unmounted()");
  },
  beforeUpdate() {
    console.log("EventList beforeUpdate()");
    console.log("events=" + this.events);
  },
  unpdate() {
    console.log("EventList unpdate()");
  },
};
</script>
