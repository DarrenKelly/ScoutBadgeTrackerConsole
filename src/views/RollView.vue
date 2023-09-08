<template>
  <div class="activities">
    <ActivitiesHeader
      v-if="selectedActivityId == ''"
      @filter-old-activities="filterOldActivities"
      :showForm="false"
      :allowAdd="false"
      :hideOldActivities="hideOldActivities"
    />
    <RollHeader
      v-if="selectedActivityId != ''"
      @save-rollcall="saveRollcall"
      @toggle-archived="toggleArchived"
      @cancel-changes="cancelChanges"
    />
    <ActivityList
      @select-activity="selectActivity"
      @deselect-activity="deselectActivity"
      :activities="activitiesdata"
      :allowEdit="false"
      :selectedId="selectedActivityId"
      :hideOldActivities="hideOldActivities"
    />
    <MemberList
      @change-participation="changeParticipation"
      v-if="selectedActivityId != ''"
      :members="membersdata"
      :participants="participants"
      :enableEdit="false"
      :hideOldMembers="hideArchivedMembers"
    />
  </div>
</template>

<script>
import MemberList from "@/components/MemberList";
import ActivityList from "@/components/ActivityList";
import ActivitiesHeader from "@/components/ActivitiesHeader";
import RollHeader from "@/components/RollHeader";
import { members, activities, writeActivity } from "@/firebase";

export default {
  name: "RollView",
  components: {
    ActivitiesHeader,
    RollHeader,
    MemberList,
    ActivityList,
  },
  data() {
    return {
      selectedActivityId: "",
      activitiesdata: activities,
      participants: [],
      membersdata: members,
      hideOldActivities: true,
      hideArchivedMembers: true,
    };
  },
  methods: {
    selectActivity(activityId) {
      console.log("RollView selectActivity() " + activityId);
      this.selectedActivityId = activityId;
      let activity = activities.find((a) => a.id == activityId);

      if ("participants" in activity && activity.participants != null) {
        this.participants = activity.participants;
      } else {
        this.participants = [];
      }
    },
    deselectActivity() {
      console.log("RollView deselectActivity()");
      this.selectedActivityId = "";
    },
    filterOldActivities() {
      console.log("RollView filterOldActivities() ");
      this.hideOldActivities = !this.hideOldActivities;
    },
    saveRollcall() {
      console.log("RollView saveRollcall() ");

      let savedParticipants = [];
      this.participants.forEach((participant) => {
        if (participant.role != "") {
          savedParticipants.push(participant);
        }
      });
      let activity = activities.find((a) => a.id == this.selectedActivityId);
      activity.participants = savedParticipants;
      writeActivity(activity);

      this.selectedActivityId = "";
    },
    toggleArchived() {
      console.log("RollView toggleArchived()");
      this.hideArchivedMembers = !this.hideArchivedMembers;
    },
    cancelChanges() {
      console.log("RollView cancelChanges()");
      this.selectedActivityId = "";
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
        if (state == "") {
          this.participants.splice(this.participants.indexOf(participant), 1);
        }
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
    if (this.selectedActivityId != "") {
      this.saveRollcall();
    }
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
