<template>
  <div class="badges-by-member">
    <table class="badges-table">
      <thead>
        <tr class="header-row">
          <th>Scout</th>
          <th
            v-for="(badge, index) in badges"
            :key="index"
            :class="['rotated-header', index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ badge }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="scout in activeYouthMembers"
          :key="scout.id"
          class="scout-row"
        >
          <td class="name-cell end-cell keeptogether">
            {{ scout.preferredname }} {{ scout.familyname }}
          </td>

          <td
            v-for="(badge, index) in badges"
            :key="index"
            :class="[index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ earnedBadgesMap.get(scout.id)?.has(badge) ? "✔️" : "⬜" }}
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
  name: "BadgesByMemberView",
  setup() {
    const badges = [
      "Milestone 1",
      "Milestone 2",
      "Milestone 3",
      "10 km hike",
      "30 km hike",
      "100km bike",
      "Sailing",
      "10 nights camping",
      "25 nights camping",
      "Paddles",
      "Carabiner",
      "Camping",
      "Camping 2",
      "Camping 3",
      "Campfire",
      "Campfire 2",
      "Campfire 3",
      "Bike",
      "Bike 2",
      "Water",
      "Water 2",
      "Compass",
      "Compass 3",
    ];

    const activeYouthMembers = computed(() => {
      return members
        .filter((member) => !member.archived && member.membertype !== "leader")
        .sort((a, b) => {
          const nameA = `${a.preferredname} ${a.familyname}`.toLowerCase();
          const nameB = `${b.preferredname} ${b.familyname}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });
    });

    const earnedBadgesMap = computed(() => {
      const map = new Map();

      activeYouthMembers.value.forEach((scout) => {
        const earned = new Set();

        // --- Calculate total hike kms for this scout ---
        const totalHikeKms = activities
          .filter(
            (activity) => activity.type === "Hike" && activity.hikeKms > 0
          )
          .reduce((total, activity) => {
            const isParticipant = activity.participants?.some(
              (p) => p.id === scout.id
            );
            if (isParticipant) {
              return total + (Number(activity.hikeKms) || 0);
            }
            return total;
          }, 0);

        if (totalHikeKms >= 10) earned.add("10 km hike");
        if (totalHikeKms >= 30) earned.add("30 km hike");

        // Future badge logic will be added here

        map.set(scout.id, earned);
      });

      return map;
    });

    return {
      activeYouthMembers,
      badges,
      earnedBadgesMap,
    };
  },
};
</script>

<style scoped>
.header-row {
  font-size: 20px;
  font-weight: bold;
  background-color: rgb(171, 185, 231);
  color: black;
}
.end-cell {
  border-right: 1px solid #06362c;
}
.rotated-header {
  font-size: 16px;
  max-height: 300px;
  font-weight: bold;
  color: black;
  transform: rotate(180deg);
  writing-mode: vertical-rl;
  text-orientation: sideways;
  padding-top: 12px;
  padding-bottom: 12px;
}
td {
  text-align: center;
}
.name-cell {
  text-align: left;
  padding-left: 5px;
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
</style>
