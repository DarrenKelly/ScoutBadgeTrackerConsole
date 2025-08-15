<template>
  <div class="milestones">
    <div class="controls">
      <form id="filter">
        Filter <input name="query" v-model="filterText" />
      </form>
      <StyledButton
        @click="toggleArchived"
        :colour="showArchived ? 'purple' : 'teal'"
        :button_text="showArchived ? 'Hide Archived' : 'Show Archived'"
      />
    </div>
    <!-- component template -->
    <table class="ms-table">
      <thead>
        <col />
        <colgroup span="3"></colgroup>
        <colgroup span="3"></colgroup>
        <colgroup span="3"></colgroup>
        <col />
        <colgroup span="3"></colgroup>
        <tr class="ms-header-row">
          <td></td>
          <th colspan="3" scope="colgroup" class="ms-header end-cell">
            Milestone 1
          </th>
          <th colspan="3" scope="colgroup" class="ms-header end-cell">
            Milestone 2
          </th>
          <th colspan="3" scope="colgroup" class="ms-header end-cell">
            Milestone 3
          </th>
        </tr>
        <tr>
          <th class="name-header" end-cell>Name</th>
          <th class="role-header">Participate</th>
          <th class="role-header">Assist</th>
          <th class="role-header end-cell">Lead</th>
          <th class="role-header">Participate</th>
          <th class="role-header">Assist</th>
          <th class="role-header end-cell">Lead</th>
          <th class="role-header">Participate</th>
          <th class="role-header">Assist</th>
          <th class="role-header end-cell">Lead</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in filteredScouts" :key="scout.id">
          <td class="name-cell end-cell keeptogether">
            {{ scout.preferredname }} {{ scout.familyname }}
          </td>
          <td
            v-for="(value, index) in getMilestoneRow(scout)"
            :key="index"
            :class="[
              value == goalValues[index] &&
              mileStoneChallengesMet(
                scout,
                ['Participate', 'Assist', 'Lead'][index % 3],
                Math.floor(index / 3) + 1
              )
                ? 'count-cell-success'
                : value == goalValues[index]
                ? 'count-cell-challenge'
                : value == 0
                ? 'count-cell-not-started'
                : 'count-cell-wip',
              index % 3 == 2 ? 'end-cell' : '',
            ]"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}
.styled-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  cursor: pointer;
}
.ms-header {
  font-size: 20px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  background-color: #eee;
  color: black;
}
.styled-button.show-archived {
  background-color: #c82333;
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
.role-header {
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 20px;
  background-color: #c0504d;
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
}
.count-cell-success {
  background: #0aa817;
  color: black;
}
.count-cell-wip {
  background: #ff9900;
  color: black;
}
.count-cell-not-started {
  background: #eee;
  color: black;
}
.count-cell-challenge {
  background: #2eaf00;
  color: black;
}
.keeptogether {
  white-space: nowrap;
}
</style>

<script>
import StyledButton from "@/components/widgets/StyledButton";
import { ref, computed } from "vue";
import { members, activities } from "@/firebase";
import {
  milestoneParticipate,
  milestoneAssist,
  milestoneLead,
} from "@/milestoneRules";

export default {
  components: {
    StyledButton,
  },
  name: "MilestonesView",
  setup() {
    const filterText = ref("");
    const showArchived = ref(false);

    const goals = [
      {
        participate: 6 * 4, // 6 activities from each of the 4 Challenge Areas
        assist: 2,
        lead: 1,
      },
      {
        participate: 5 * 4, // 5 activities from each of the 4 Challenge Areas
        assist: 3,
        lead: 2,
      },
      {
        participate: 4 * 4, // 4 activities from each of the 4 Challenge Areas
        assist: 4,
        lead: 4,
      },
    ];

    const filteredScouts = computed(() => {
      let scoutsToFilter = members;

      // 1. Filter by archived status
      if (!showArchived.value) {
        scoutsToFilter = scoutsToFilter.filter((scout) => !scout.archived);
      }

      // 2. Filter by text
      const filter = filterText.value.toLowerCase();
      if (filter.length) {
        scoutsToFilter = scoutsToFilter.filter((scout) =>
          (scout.preferredname + " " + scout.familyname)
            .toLowerCase()
            .includes(filter)
        );
      }

      // 3. Sort by name
      return scoutsToFilter.sort((a, b) => {
        const nameA = `${a.preferredname} ${a.familyname}`.toLowerCase();
        const nameB = `${b.preferredname} ${b.familyname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    });

    const goalValues = computed(() => {
      return [
        goals[0].participate,
        goals[0].assist,
        goals[0].lead,
        goals[1].participate,
        goals[1].assist,
        goals[1].lead,
        goals[2].participate,
        goals[2].assist,
        goals[2].lead,
        100,
        100,
        100,
        100,
      ];
    });

    function toggleArchived() {
      showArchived.value = !showArchived.value;
    }

    function mileStoneChallengesMet(scout, type, milestone) {
      switch (type) {
        case "Participate":
          return milestoneParticipate(scout, activities, 7 - milestone);

        case "Assist":
          return milestoneAssist(scout, activities, milestone + 1);

        case "Lead":
          if (milestone === 1) {
            return milestoneLead(scout, activities, 1);
          } else if (milestone === 2) {
            return milestoneLead(scout, activities, 2);
          }
          return milestoneLead(scout, activities, 4);
      }
      return false;
    }

    // Return an array with the number of activites in each
    // cell for a given scout
    function getMilestoneRow(scout) {
      var participations = 0;
      var assists = 0;
      var leads = 0;

      // @todo: This is O(n2) when it could be done O(n)
      activities.forEach((ev) => {
        if (ev.participants) {
          ev.participants.forEach((participant) => {
            if (scout.id === participant.id) {
              switch (participant.role) {
                case "Leader":
                  leads++;
                  break;
                case "Helping":
                  assists++;
                  break;
                default:
                  participations++;
              }
            }
          });
        }
      });

      let retVal = [];
      for (let milestone = 0; milestone < 3; milestone++) {
        if (participations <= goals[milestone].participate || milestone === 2) {
          retVal.push(participations);
          participations = 0;
        } else {
          retVal.push(goals[milestone].participate);
          participations -= goals[milestone].participate;
        }

        if (assists <= goals[milestone].assist || milestone === 2) {
          retVal.push(assists);
          assists = 0;
        } else {
          retVal.push(goals[milestone].assist);
          assists -= goals[milestone].assist;
        }

        if (leads <= goals[milestone].lead || milestone === 2) {
          retVal.push(leads);
          leads = 0;
        } else {
          retVal.push(goals[milestone].lead);
          leads -= goals[milestone].lead;
        }
      }
      return retVal;
    }

    return {
      filterText,
      filteredScouts,
      goalValues,
      getMilestoneRow,
      mileStoneChallengesMet,
      showArchived,
      toggleArchived,
    };
  },
};
</script>
