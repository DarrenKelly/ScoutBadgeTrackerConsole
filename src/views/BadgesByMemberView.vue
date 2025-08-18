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
            {{ earnedBadgesMap.get(scout.id)?.has(badge) ? "🎖️" : "⬜" }}
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
      "Compass 2",
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

      console.log("activities=", activities);

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
        if (totalHikeKms >= 100) earned.add("100km bike");

        // --- Calculate total camping nights for this scout ---
        const totalCampNights = activities
          .filter(
            (activity) =>
              ["Camp", "Overnight Hike", "Grey Wolf Hike"].includes(
                activity.type
              ) && activity.campNights > 0
          )
          .reduce((total, activity) => {
            const isParticipant = activity.participants?.some(
              (p) => p.id === scout.id
            );
            if (isParticipant) {
              return total + (Number(activity.campNights) || 0);
            }
            return total;
          }, 0);

        if (totalCampNights >= 10) earned.add("10 nights camping");
        if (totalCampNights >= 25) earned.add("25 nights camping");

        // --- Check for sailing activity ---
        const hasSailed = activities.some(
          (activity) =>
            activity.type === "Sailing" &&
            activity.participants?.some((p) => p.id === scout.id)
        );
        if (hasSailed) earned.add("Sailing");

        // --- Check for Climbing activity ---
        const hasClimbed = activities.some(
          (activity) =>
            activity.type === "Vertical" &&
            activity.participants?.some((p) => p.id === scout.id)
        );
        if (hasClimbed) earned.add("Carabiner");

        // --- Check for Canoe activity ---
        const hasPaddled = activities.some(
          (activity) =>
            activity.type === "Canoeing" &&
            activity.participants?.some((p) => p.id === scout.id)
        );
        if (hasPaddled) earned.add("Paddles");

        // --- Check for Campfire activities ---
        const totalCamps = activities.filter(
          (activity) =>
            activity.type === "Camp" &&
            activity.participants?.some((p) => p.id === scout.id)
        ).length;
        if (totalCamps >= 1) earned.add("Camping");
        if (totalCamps >= 5) earned.add("Camping 2");
        if (totalCamps >= 10) earned.add("Camping 3");

        // --- Check for Campfire activities ---
        const totalCampfireMeets = activities.filter(
          (activity) =>
            activity.type === "Campfire" &&
            activity.participants?.some((p) => p.id === scout.id)
        ).length;
        if (totalCampfireMeets >= 2) earned.add("Campfire");
        if (totalCampfireMeets >= 5) earned.add("Campfire 2");
        if (totalCampfireMeets >= 10) earned.add("Campfire 3");

        // --- Check for Campfire activities ---
        const totalWaterSkillsMeets = activities.filter(
          (activity) =>
            ["Water Skills", "Sailing", "Canoeing"].includes(activity.type) &&
            activity.participants?.some((p) => p.id === scout.id)
        ).length;
        if (totalWaterSkillsMeets >= 2) earned.add("Water");
        if (totalWaterSkillsMeets >= 5) earned.add("Water 2");

        // --- Check for Campfire activities ---
        const totalBikeMeets = activities.filter(
          (activity) =>
            ["Cycling"].includes(activity.type) &&
            activity.participants?.some((p) => p.id === scout.id)
        ).length;
        if (totalBikeMeets >= 1) earned.add("Bike");
        if (totalBikeMeets >= 3) earned.add("Bike 2");

        // --- Check for Campfire activities ---
        const totalNavigtionMeets = activities.filter(
          (activity) =>
            activity.type === "Navigation" &&
            activity.participants?.some((p) => p.id === scout.id)
        ).length;
        if (totalNavigtionMeets >= 1) earned.add("Compass");
        if (totalNavigtionMeets >= 4) earned.add("Compass 2");

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
