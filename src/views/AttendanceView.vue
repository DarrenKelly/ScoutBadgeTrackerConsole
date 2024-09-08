<template>
  <div class="milestones">
    <!-- component template -->
    <table class="attendance-table">
      <thead>
        <tr class="activity-row">
          <th>Scout</th>
          <th
            v-for="(activity, index) in this.activities"
            :key="index"
            :class="['activity', index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ activity.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in members" :key="scout.id" class="scout-row">
          <td class="name-cell end-cell keeptogether">
            {{ scout.preferredname }} {{ scout.familyname }}
          </td>

          <td
            v-for="(value, index) in activityAttendanceMap.get(scout.id)"
            :key="index"
            :class="[index % 2 == 0 ? 'c1' : 'c2']"
            v-bind="value"
          >
            <button :class="[value ? 'cell-yes' : 'cell-no']"></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { members, activities } from "@/firebase";

function buildParticipantMap() {
  const participantMap = new Map();

  activities.forEach((activity) => {
    activity.participants.forEach((participant) => {
      const participantId = participant.id || ""; // Get participant ID or empty string
      const role = participant.role || "";

      if (!participantMap.has(participantId)) {
        participantMap.set(
          participantId,
          new Array(activities.length).fill(false)
        );
      }

      const activityIndex = activities.findIndex(
        (act) => act.id === activity.id
      );
      participantMap.get(participantId)[activityIndex] = !!role; // Set true if role exists and is not empty
    });
  });

  return participantMap;
}

export default {
  name: "AttendanceView",
  components: {},
  setup() {
    console.log("AttendanceView setup()");
    console.log("activities = " + JSON.stringify(activities));
    // Get a mapping from scouts to attendance records

    const activityAttendanceMap = buildParticipantMap();

    console.log(
      "activityAttendanceMap = " + JSON.stringify(activityAttendanceMap)
    );
    return {
      activityAttendanceMap,
    };
  },
  data: function () {
    return {
      members: members,
      activities: activities,
    };
  },
  methods: {},
  beforeCreate() {
    console.log("AttendanceView beforeCreate()");
  },
  beforeMount() {
    console.log("AttendanceView beforeMount()");
  },
  mounted() {
    console.log("AttendanceView mounted()");
  },
  beforeUnmount() {
    console.log("AttendanceView beforeUnmount()");
  },
  unmounted() {
    console.log("AttendanceView unmounted()");
  },
  beforeUpdate() {
    console.log("AttendanceView beforeUpdate()");
  },
  unpdate() {
    console.log("AttendanceView unpdate()");
  },
};
</script>

<style scoped>
.activity-row {
  font-size: 20px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  background-color: rgb(171, 185, 231);
  color: black;
}
.ms-table {
  border-radius: 3px;
}
.end-cell {
  border-right: 1px solid #06362c;
}
.name-header {
  font-size: 20px;
  font-weight: bold;
  background-color: #eee;
  color: black;
}
.activity {
  font-size: 16px;
  max-height: 300px;
  font-weight: bold;
  margin-bottom: 20px;
  color: black;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  text-orientation: sideways;
  -webkit-writing-mode: vertical-rl;
  -webkit-text-orientation: sideways;
  padding-top: 12px;
  padding-bottom: 12px;
}
.bk1 {
  background-color: #bcdce6;
}
.bk2 {
  background-color: #83a9b4;
}
.bk3 {
  background-color: #427788;
}
td {
  text-align: center;
}
.name-cell {
  text-align: left;
}
.c1 {
  background: #eee;
}
.c2 {
  background: rgb(179, 213, 245);
}
.keeptogether {
  white-space: nowrap;
}
.header {
  display: flex;
}
.cell-yes {
  background: #83ac86;
  color: black;
}
.cell-yes::after {
  content: "👍";
}
.cell-no {
  background: #eee;
  color: black;
}
.cell-no::after {
  content: "⬜";
}
</style>
