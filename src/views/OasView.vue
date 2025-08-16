<template>
  <div class="oas-view">
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
    <table class="oas-table">
      <thead>
        <tr class="category-row">
          <th rowspan="4">Scout</th>

          <th
            v-for="(statement, index) in myStatements"
            :key="index"
            :colspan="countAll(statement)"
          >
            {{ statement.area }} {{ statement.stage }}
          </th>
        </tr>
        <tr class="pdr-row">
          <th
            v-for="(pdr, index) in pdrColCount(myStatements)"
            :key="index"
            :colspan="pdr.columnSpan"
            :class="[index % 3 == 0 ? 'bk1' : index % 3 == 1 ? 'bk2' : 'bk3']"
          >
            {{ pdr.text }}
          </th>
        </tr>
        <tr class="statements-row">
          <th
            v-for="(i_can_text, index) in flatOasStatements"
            :key="index"
            :class="['statements', index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ i_can_text }}
          </th>
        </tr>
        <tr class="percentage-row">
          <th
            v-for="(i_can_text, index) in flatOasStatements"
            :key="index"
            :class="['percentage', index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ get_percentage(index) }}%
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scout in filteredScouts" :key="scout.id" class="scout-row">
          <td class="name-cell end-cell keeptogether">
            {{ scout.preferredname }} {{ scout.familyname }}
          </td>

          <td
            v-for="(value, index) in oasActivityAchievementMap.get(scout.id)
              .oasAchievements"
            :key="index"
            :class="[index % 2 == 0 ? 'c1' : 'c2']"
          >
            <button
              @click="() => onManualChange(index, scout, value[1])"
              :class="[value[0] ? 'cell-yes' : 'cell-no']"
            ></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import StyledButton from "@/components/widgets/StyledButton";
import { ref, computed, reactive, onBeforeUnmount } from "vue";
import { members, writeMember, activities } from "@/firebase";
import { oasStatements, allOasStatements } from "@/scouting";
/**
 * Processes all activities to create a map of OAS achievements for each scout.
 * This is more performant than the previous implementation.
 * @returns {Map<string, {scout: object, oasAchievements: [boolean, boolean][]}>}
 */
function processAllActivityAchievements() {
  // 1. Create a map of: statementText -> Set of scout IDs who achieved it via an activity
  const statementToScoutIds = new Map();
  allOasStatements.forEach((statement) =>
    statementToScoutIds.set(statement, new Set())
  );

  activities.forEach((activity) => {
    if (activity.ican) {
      activity.ican.forEach((statementText) => {
        if (activity.participants) {
          activity.participants.forEach((participant) => {
            if (statementToScoutIds.has(statementText)) {
              statementToScoutIds.get(statementText).add(participant.id);
            }
          });
        }
      });
    }
  });

  // 2. Create the final map for the view
  const achievementMap = new Map();
  members.forEach((scout) => {
    const scoutAchievements = allOasStatements.map((statementText) => {
      const achievedByActivity = statementToScoutIds
        .get(statementText)
        .has(scout.id);
      const achievedManually = scout.ican
        ? scout.ican.includes(statementText)
        : false;

      return [achievedByActivity || achievedManually, achievedByActivity];
    });

    achievementMap.set(scout.id, {
      scout: scout,
      oasAchievements: scoutAchievements,
    });
  });

  return achievementMap;
}

function filterScoutName(scout, filter) {
  if (scout.legalname) {
    return (
      scout.preferredname +
      " " +
      scout.legalname +
      " " +
      scout.familyname
    )
      .toLowerCase()
      .includes(filter.toLowerCase());
  }
  return (scout.preferredname + " " + scout.familyname)
    .toLowerCase()
    .includes(filter.toLowerCase());
}

function arrayContentMatches(array1, array2) {
  if (array1 == undefined || array1.length == 0) {
    if (array2 == undefined || array2.length == 0) {
      return true;
    }
  } else if (array2 == undefined || array1 == undefined) {
    return false;
  } else if (array1.sort().join(",") === array2.sort().join(",")) {
    return true;
  }
  return false;
}

export default {
  name: "OasView",
  components: { StyledButton },
  setup() {
    // --- STATE ---
    const filterText = ref("");
    const showArchived = ref(false);
    const oasActivityAchievementMap = reactive(new Map());

    // --- CONSTANTS ---
    // These are imported and don't need to be reactive
    const myStatements = oasStatements;
    const flatOasStatements = allOasStatements;

    // --- DATA PROCESSING ---
    const processedAchievements = processAllActivityAchievements();
    processedAchievements.forEach((value, key) => {
      oasActivityAchievementMap.set(key, value);
    });

    // --- COMPUTED ---
    const filteredScouts = computed(() => {
      let scoutsToFilter = members;

      // Filter for Youth members only
      scoutsToFilter = scoutsToFilter.filter(
        (scout) => scout.membertype === "Youth"
      );

      // Filter by archived status
      if (!showArchived.value) {
        scoutsToFilter = scoutsToFilter.filter((scout) => !scout.archived);
      }

      // Filter by text
      const filter = filterText.value;
      if (filter.length) {
        scoutsToFilter = scoutsToFilter.filter((scout) =>
          filterScoutName(scout, filter)
        );
      }

      // Sort by name
      return scoutsToFilter.sort((a, b) => {
        const nameA = `${a.preferredname} ${a.familyname}`.toLowerCase();
        const nameB = `${b.preferredname} ${b.familyname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    });

    // --- METHODS ---
    function get_percentage(statementIndex) {
      let count = 0;
      if (filteredScouts.value.length === 0) {
        return 0;
      }

      filteredScouts.value.forEach((scout) => {
        const achievementData = oasActivityAchievementMap.get(scout.id);
        if (
          achievementData &&
          achievementData.oasAchievements[statementIndex][0]
        ) {
          count++;
        }
      });
      return Math.round((100 * count) / filteredScouts.value.length);
    }

    function toggleArchived() {
      showArchived.value = !showArchived.value;
    }

    function onManualChange(statementIndex, scout, earnedByActivity) {
      if (!earnedByActivity) {
        const achievement = oasActivityAchievementMap.get(scout.id)
          .oasAchievements[statementIndex];
        achievement[0] = !achievement[0];
      }
    }

    function countAll(statementSet) {
      let count = 0;
      statementSet.requirements.forEach((el) => {
        count += el.statements.length;
      });
      return count;
    }

    function pdrColCount(statementSet) {
      let retVal = [];
      statementSet.forEach((set) => {
        set.requirements.forEach((el) => {
          retVal.push({ text: el.type, columnSpan: el.statements.length });
        });
      });
      return retVal;
    }

    // --- LIFECYCLE HOOKS ---
    onBeforeUnmount(() => {
      console.log("OasView onBeforeUnmount()");
      // Need to check if any of the individual scout's achievements need to be updated.
      members.forEach((scout) => {
        // for this scout, construct a list of individual achievements per the UI
        let statuses = oasActivityAchievementMap.get(scout.id).oasAchievements;
        let ui_ican = [];
        let index = 0;
        statuses.forEach((status) => {
          if (
            status[0] &&
            !status[1] &&
            !ui_ican.includes(flatOasStatements[index])
          ) {
            // UI says scout achieved this I can ... Statement
            // without attending a group activity.
            ui_ican.push(flatOasStatements[index]);
          }
          index++;
        });

        if (!arrayContentMatches(scout.ican, ui_ican)) {
          // Some element of the OAS statements for this scout has changed
          if (ui_ican.length === 0) {
            scout.ican = undefined;
          } else {
            scout.ican = ui_ican;
          }
          writeMember(scout);
        }
      });
    });

    return {
      filterText,
      showArchived,
      toggleArchived,
      filteredScouts,
      myStatements,
      flatOasStatements,
      oasActivityAchievementMap,
      get_percentage,
      onManualChange,
      countAll,
      pdrColCount,
    };
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}
.category-row {
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
.statements {
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
