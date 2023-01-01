<template>
  <div class="events">
    <EventsHeader
      @show-add-event-form="toggleAddEventForm"
      @filter-old-events="filterOldEvents"
      :showForm="showForm"
      :allowAdd="true"
      :hideOldEvents="hideOldEvents"
    />
    <div v-if="showForm">
      <EventForm
        @update-event="addNewEvent"
        :allow-delete="false"
        :prefill="prefill"
      />
    </div>
    <EventList
      @update-event="modifyEvent"
      @delete-event="deleteEvent"
      :events="eventsdata"
      :allowEdit="true"
      :hideOldEvents="hideOldEvents"
      :selectedId="''"
    />
  </div>
</template>

<script>
import EventsHeader from "@/components/EventsHeader";
import EventList from "@/components/EventList";
import EventForm from "@/components/EventForm.vue";
import { events, writeEvent, deleteEvent } from "@/firebase";

export default {
  name: "EventView",
  components: {
    EventsHeader,
    EventList,
    EventForm,
  },
  data() {
    return {
      eventsdata: events,
      selectedId: null,
      hideOldEvents: true,
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
    addNewEvent(newEvent) {
      console.log("EventView onAddEvent()");
      writeEvent(newEvent);
      this.eventsdata.push(newEvent);
      this.showForm = false;
    },
    modifyEvent(modifiedEvent) {
      console.log("EventView modifyEvent()");

      const found = this.eventsdata.find((el) => el.id == modifiedEvent.id);

      found.type = modifiedEvent.type;
      found.name = modifiedEvent.name;
      found.date = modifiedEvent.date;
      found.location = modifiedEvent.location;
      found.duration = modifiedEvent.duration;
      found.hikeKms = modifiedEvent.hikeKms;
      found.theme = modifiedEvent.theme;
      found.note = modifiedEvent.note;
      found.participants = modifiedEvent.participants;

      writeEvent(modifiedEvent);
    },
    deleteEvent(eventId) {
      console.log("EventView deleteEvent()");

      const found = this.eventsdata.find((el) => el.id == eventId);
      const index = this.eventsdata.indexOf(found);
      this.eventsdata.splice(index, 1);

      deleteEvent(eventId);
    },
    filterOldEvents() {
      console.log("EventView filterOldEvents() ");
      this.hideOldEvents = !this.hideOldEvents;
    },
    toggleAddEventForm() {
      console.log("EventView toggleAddEventForm()");
      this.showForm = !this.showForm;
    },
  },
  props: {},
  beforeCreate() {
    console.log("EventView beforeCreate()");
  },
  created() {
    console.log("EventView created()");
  },
  beforeMount() {
    console.log("EventView beforeMount()");
  },
  mounted() {
    console.log("EventView mounted()");
  },
  beforeUnmount() {
    console.log("EventView beforeUnmount()");
  },
  unmounted() {
    console.log("EventView unmounted()");
  },
  beforeUpdate() {
    console.log("EventView beforeUpdate()");
  },
  unpdate() {
    console.log("EventView unpdate()");
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
