<template>
  <div
    @click="onClick"
    :class="[
      event.date < new Date().toISOString().split('T')[0] ? 'past' : '',
      selected ? 'selected' : '',
      'event',
    ]"
  >
    <div class="title">
      {{ event.name }}
      <p class="date">{{ event.date }} {{ event.location }}</p>
    </div>
    <div class="midblock">
      <img
        src="@/assets/Water.png"
        :class="[
          event.type &&
          (event.type.includes('Water') ||
            event.type.includes('Canoe') ||
            event.type.includes('Kayak'))
            ? 'icon'
            : 'gone',
        ]"
      />
      <img
        src="@/assets/Canoe.png"
        :class="[
          event.type &&
          (event.type.includes('Canoe') || event.type.includes('Kayak'))
            ? 'icon'
            : 'gone',
        ]"
      />
      <img
        src="@/assets/GreyWolf.png"
        :class="[event.type && event.type.includes('Wolf') ? 'icon' : 'gone']"
      />
      <img
        src="@/assets/CampFire.png"
        :class="[
          event.type &&
          (event.type.includes('Camp') || event.type.includes('Overnight'))
            ? 'icon'
            : 'gone',
        ]"
      />
      <img
        src="@/assets/Hike.png"
        :class="[event.type && event.type.includes('Hike') ? 'icon' : 'gone']"
      />
      <img
        src="@/assets/Plane.png"
        :class="[event.type && event.type.includes('Fly') ? 'icon' : 'gone']"
      />
      <img
        src="@/assets/Fishing.png"
        :class="[event.type && event.type.includes('Fish') ? 'icon' : 'gone']"
      />
    </div>
    <div>
      <i class="type">{{ event.type }}</i>
    </div>
  </div>
  <div v-if="showEditForm && allowEdit">
    <EventForm
      @update-event="updateEvent"
      @delete-event="deleteEvent"
      :allow-delete="true"
      :prefill="event"
    />
  </div>
</template>

<script>
import EventForm from "@/components/EventForm.vue";

export default {
  name: "ScoutEvent",
  data() {
    return {
      showEditForm: false,
    };
  },
  props: {
    event: Object,
    allowEdit: Boolean,
    selected: Boolean,
  },
  components: {
    EventForm,
  },
  emits: ["update-event", "delete-event", "deselect-event", "select-event"],
  methods: {
    onClick() {
      console.log(
        "Clicked on Event with Id " +
          this.event.id +
          " selected=" +
          this.selected
      );
      if (this.allowEdit) {
        this.showEditForm = !this.showEditForm;
      } else if (this.selected) {
        this.$emit("deselect-event", this.event.id);
      } else {
        this.$emit("select-event", this.event.id);
      }
    },
    updateEvent(modifiedEvent) {
      console.log("ScoutEvent updateEvent with Id " + modifiedEvent.id);
      this.$emit("update-event", modifiedEvent);
      this.showEditForm = false;
    },
    deleteEvent(eventId) {
      console.log("ScoutEvent deleteEvent with Id " + eventId);
      this.$emit("delete-event", eventId);
      this.showEditForm = false;
    },
  },
};
</script>

<style scoped>
.event {
  background: #f4f4f4;
  display: grid;
  grid-template-columns: auto auto 60px;
  height: 60px;
  margin: 5px;
  padding: 10px 5px;
}
.event.selected {
  background: #a4f4a4;
}
.event.past {
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
