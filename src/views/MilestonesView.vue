<template>
  <div class="milestones">
    <div>
      <form id="filter">
        Filter <input name="query" v-model="filterText" />
      </form>
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
          <td class="end-cell">&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <th colspan="3" scope="colgroup" class="ms-header">Scheduled</th>
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
          <th></th>
          <th class="role-header">Participate</th>
          <th class="role-header">Assist</th>
          <th class="role-header">Lead</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in filteredScouts" :key="scout.id">
          <td class="name-cell end-cell">
            {{ scout.givenname }}
            <div v-if="member.legalname">'{{ member.legalname }}'</div>
            {{ scout.familyname }}
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
.ms-header {
  font-size: 20px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  background-color: #eee;
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
  background: #aeeeb4;
  color: black;
}
.count-cell-not-started {
  background: #eee;
  color: black;
}
.count-cell-challenge {
  background: rgb(253, 153, 2);
  color: black;
}
</style>

<script>
import { ref, computed } from "vue";
import { members, activities } from "@/firebase";
import {
  milestoneParticipate,
  milestoneAssist,
  milestoneLead,
} from "@/milestoneRules";

export default {
  name: "MilestonesView",
  setup() {
    const filterText = ref("");
    const filteredScouts = computed(() => {
      let filter = filterText.value;
      if (!filter.length) {
        console.log("No Filter");
        return members;
      }
      console.log("Filter=" + filter);
      return members.filter((scout) =>
        (scout.givenname + " " + scout.familyname)
          .toLowerCase()
          .includes(filter.toLowerCase())
      );
    });
    return {
      members,
      filterText,
      filteredScouts,
    };
  },
  data: function () {
    return {
      filterKey: "",
      scouts: members,
      goals: [
        {
          participate: 1, // 6 activities from each of the 4 Challenge Areas
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
      ],
    };
  },
  computed: {
    goalValues() {
      return [
        this.goals[0].participate,
        this.goals[0].assist,
        this.goals[0].lead,
        this.goals[1].participate,
        this.goals[1].assist,
        this.goals[1].lead,
        this.goals[2].participate,
        this.goals[2].assist,
        this.goals[2].lead,
        100,
        100,
        100,
        100,
      ];
    },
  },
  methods: {
    mileStoneChallengesMet(scout, type, milestone) {
      console.log(
        "mileStoneChallengesMet(" +
          JSON.stringify(scout) +
          "," +
          type +
          "," +
          milestone +
          ")"
      );

      switch (type) {
        case "Participate":
          return milestoneParticipate(scout, activities, 7 - milestone);

        case "Assist":
          return milestoneAssist(scout, activities, milestone + 1);

        case "Lead":
          if (milestone == 1) {
            return milestoneLead(scout, activities, 1);
          } else if (milestone == 2) {
            return milestoneLead(scout, activities, 2);
          }
          return milestoneLead(scout, activities, 4);
      }
      return false;
    },
    getMilestoneRow: function (scout) {
      var participations = 0;
      var assists = 0;
      var leads = 0;

      // @todo: This is O(n2) when it could be done O(n)
      activities.forEach(function (ev) {
        if (ev.participants) {
          ev.participants.forEach(function (participant) {
            if (scout.id == participant.id) {
              switch (participant.role) {
                case "Leader":
                  leads = leads + 1;
                  break;
                case "Helping":
                  assists = assists + 1;
                  break;
                default:
                  participations = participations + 1;
              }
            }
          });
        }
      });

      let retVal = [];
      for (let milestone = 0; milestone < 3; milestone++) {
        if (
          participations <= this.goals[milestone].participate ||
          milestone == 2
        ) {
          retVal.push(participations);
          participations = 0;
        } else {
          retVal.push(this.goals[milestone].participate);
          participations = participations - this.goals[milestone].participate;
        }

        if (assists <= this.goals[milestone].assist || milestone == 2) {
          retVal.push(assists);
          assists = 0;
        } else {
          retVal.push(this.goals[milestone].assist);
          assists = assists - this.goals[milestone].assist;
        }

        if (leads <= this.goals[milestone].lead || milestone == 2) {
          retVal.push(leads);
          leads = 0;
        } else {
          retVal.push(this.goals[milestone].lead);
          leads = leads - this.goals[milestone].lead;
        }
      }
      return retVal;
    },
  },
};
</script>
