<template>
  <div class="events">
    <EventsHeader
      v-if="selectedEventId == ''"
      @filter-old-events="filterOldEvents"
      :showForm="false"
      :allowAdd="false"
      :hideOldEvents="hideOldEvents"
    />
    <RollHeader
      v-if="selectedEventId != ''"
      @save-rollcall="saveRollcall"
      @cancel-changes="cancelChanges"
    />
    <EventList
      @select-event="selectEvent"
      @deselect-event="deselectEvent"
      :events="eventsdata"
      :allowEdit="false"
      :selectedId="selectedEventId"
      :hideOldEvents="hideOldEvents"
    />
    <MemberList
      @change-participation="changeParticipation"
      v-if="selectedEventId != ''"
      :members="membersdata"
      :participants="participants"
      :enableEdit="false"
      :hideOldMembers="true"
    />
  </div>
</template>

<script>
import MemberList from "@/components/MemberList";
import EventList from "@/components/EventList";
import EventsHeader from "@/components/EventsHeader";
import RollHeader from "@/components/RollHeader";
import { members, events, writeEvent } from "@/firebase";

export default {
  name: "RollView",
  components: {
    EventsHeader,
    RollHeader,
    MemberList,
    EventList,
  },
  data() {
    return {
      selectedEventId: "",
      eventsdata: events,
      participants: [],
      membersdata: members,
      hideOldEvents: true,
    };
  },
  methods: {
    selectEvent(eventId) {
      console.log("RollView selectEvent() " + eventId);
      this.selectedEventId = eventId;
      let event = events.find((a) => a.id == eventId);

      if ("participants" in event && event.participants != null) {
        this.participants = event.participants;
      } else {
        this.participants = [];
      }
    },
    deselectEvent() {
      console.log("RollView deselectEvent()");
      this.selectedEventId = "";
    },
    filterOldEvents() {
      console.log("RollView filterOldEvents() ");
      this.hideOldEvents = !this.hideOldEvents;
    },
    saveRollcall() {
      console.log("RollView saveRollcall() ");

      let savedParticipants = [];
      this.participants.forEach((participant) => {
        if (participant.role != "") {
          savedParticipants.push(participant);
        }
      });
      let event = events.find((a) => a.id == this.selectedEventId);
      event.participants = savedParticipants;
      writeEvent(event);

      this.selectedEventId = "";
    },
    cancelChanges() {
      console.log("RollView cancelChanges() ");
      this.selectedEventId = "";
    },
    changeParticipation(memberId, state) {
      console.log(
        "RollView changeParticipation( " + memberId + ", " + state + " )"
      );
      console.log("this.participants = " + this.participants);
      let participant = this.participants.find((a) => a.id == memberId);
      console.log("RollView changeParticipation participant = " + participant);
      if (participant == null) {
        participant = { id: memberId, role: state };
        console.log("New participant = " + participant);
        this.participants.push(participant);
      } else {
        participant.role = state;
        console.log("New participant role " + participant);
      }
    },
  },
  props: {},
  beforeCreate() {
    console.log("RollView beforeCreate()");
  },
  created() {
    console.log("RollView created()");
  },
  beforeMount() {
    console.log("RollView beforeMount()");
  },
  mounted() {
    console.log("RollView mounted()");
  },
  beforeUnmount() {
    console.log("RollView beforeUnmount()");
  },
  unmounted() {
    console.log("RollView unmounted()");
  },
  beforeUpdate() {
    console.log("RollView beforeUpdate()");
  },
  unpdate() {
    console.log("RollView unpdate()");
  },
};
</script>
