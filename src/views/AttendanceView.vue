<template>
  <div class="milestones">
    <!-- component template -->
    <table class="attendance-table">
      <thead>
        <tr class="activity-row">
          <th>Scout</th>
          <th
            v-for="(activity, index) in activities"
            :key="index"
            :class="['activity', index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ activity.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in activeMembers" :key="scout.id" class="scout-row">
          <td class="name-cell end-cell keeptogether">
            {{ scout.preferredname }} {{ scout.familyname }}
          </td>

          <td
            v-for="(role, index) in activityAttendanceMap.get(scout.id) || []"
            :key="index"
            :class="[index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ getRoleIcon(role) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { computed } from "vue";
import { members, activities } from "@/firebase";

export default {
  name: "AttendanceView",
  components: {},
  setup() {
    const activeMembers = computed(() => {
      return members
        .filter((member) => !member.archived)
        .sort((a, b) => {
          const nameA = `${a.preferredname} ${a.familyname}`.toLowerCase();
          const nameB = `${b.preferredname} ${b.familyname}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
    });

    const activityAttendanceMap = computed(() => {
      const participantMap = new Map();

      // Initialize map for all active members to ensure every scout has a row.
      // The default value for each activity is null (did not attend).
      activeMembers.value.forEach((member) => {
        participantMap.set(member.id, new Array(activities.length).fill(null));
      });

      // Populate the map with actual attendance data and roles.
      activities.forEach((activity, activityIndex) => {
        if (activity.participants) {
          activity.participants.forEach((participant) => {
            const { id: participantId, role } = participant;
            if (participantId && participantMap.has(participantId)) {
              participantMap.get(participantId)[activityIndex] = role;
            }
          });
        }
      });

      return participantMap;
    });

    const getRoleIcon = (role) => {
      switch (role) {
        case "Leader":
          return "🚩";
        case "Helping":
          return "🤝";
        case "Attended":
          return "👍";
        default:
          return "⬜";
      }
    };

    return {
      activityAttendanceMap,
      activeMembers,
      activities,
      getRoleIcon,
    };
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
</style>
