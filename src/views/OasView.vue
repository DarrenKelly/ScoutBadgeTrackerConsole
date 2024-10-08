<template>
  <div class="milestones">
    <div class="header">
      <form id="filter">
        Filter <input name="query" v-model="filterText" />
      </form>
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
            v-for="(i_can_text, index) in this.flatOasStatements"
            :key="index"
            :class="['statements', index % 2 == 0 ? 'c1' : 'c2']"
          >
            {{ i_can_text }}
          </th>
        </tr>
        <tr class="percentage-row">
          <th
            v-for="(i_can_text, index) in this.flatOasStatements"
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
            v-bind="value[0]"
          >
            <button
              @click="
                (...args) => onManualChange(index, scout, value[0], value[1])
              "
              :class="[value[0] ? 'cell-yes' : 'cell-no']"
            ></button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { members, writeMember, activities } from "@/firebase";
import { oasStatements, allOasStatements } from "@/scouting";

// Get a mapping from scouts to OAS "I Can ..." statements that
// they have achieved by either by dint of attending an activity,
// or by having been manually marked as having achieved it.
//
// returns a map  (S) -> {scout:scout_s, oasAchievements:[[O1,A1], [O2,A2], [O3,A4] ...]}
// Where:
// S is a scout ID
// scout_s is the scout structure for the scout with this ID
// Ox is true iff the scout has achieved OAS statement x
// Ax is true if this was by dint of attending an activity.
function allActivityAchievements(retVal) {
  // First, build a map from "I can ..." statements to activities
  let iCanActivities = new Map();
  activities.forEach((act) => {
    act.ican.forEach((ican) => {
      if (iCanActivities.has(ican)) {
        let arr = iCanActivities.get(ican);
        arr.push(act);
        iCanActivities.set(ican, arr);
      } else {
        let arr = new Array();
        arr.push(act);
        iCanActivities.set(ican, arr);
      }
    });
  });

  members.forEach((scout_o) => {
    retVal.set(scout_o.id, { scout: scout_o, oasAchievements: [] });
  });

  let statement_count = 0;
  // For each "I can ..." statement look at the
  // related activities and mark all attending
  // scouts as having achieved the statement.
  allOasStatements.forEach((text) => {
    if (iCanActivities.has(text)) {
      iCanActivities.get(text).forEach((act) => {
        act.participants.forEach((scout) => {
          if (retVal.has(scout.id)) {
            // First 'true' is for scout having achieved the statement.
            // Second one indicates that it is due to them having
            // attended an activity and is not, therefore, mutable.
            retVal.get(scout.id).oasAchievements.push([true, true]);
          }
        });
      });
    }
    // scouts that were not at this activity
    retVal.forEach((arr) => {
      // if arr.length = count, it means we did not just add
      //  a [true,true] for this OAS Statement.

      if (arr.oasAchievements.length == statement_count) {
        // For each "I can ..." statement look at
        // this scout's manual OAS statemets and
        // mark it as true if presant, false otherwise
        if (arr.scout.ican == undefined) {
          arr.oasAchievements.push([false, false]);
        } else {
          arr.oasAchievements.push([arr.scout.ican.includes(text), false]);
        }
      }
    });

    statement_count = statement_count + 1;
  });
  return retVal;
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
  components: {},
  setup() {
    const filterText = ref("");
    const filteredScouts = computed(() => {
      let filter = filterText.value;
      if (!filter.length) {
        console.log("No Filter");
        return members.filter(function (s) {
          return !s.archived;
        });
      }
      console.log("Filter=" + filter);
      return members.filter((scout) => filterScoutName(scout, filter));
    });
    return {
      filterText,
      filteredScouts,
    };
  },
  data: function () {
    return {
      filterKey: "",
      myStatements: oasStatements,
      flatOasStatements: allOasStatements,
      oasActivityAchievementMap: new Map(),
    };
  },
  created() {
    allActivityAchievements(this.oasActivityAchievementMap);
  },
  methods: {
    get_percentage: function (statementIndex) {
      let count = 0;
      members.forEach((scout) => {
        if (
          this.oasActivityAchievementMap.get(scout.id).oasAchievements[
            statementIndex
          ][0]
        ) {
          count = count + 1;
        }
      });
      return Math.round((100 * count) / this.oasActivityAchievementMap.size);
    },
    onManualChange(statementIndex, scout, oldValue, earnedByActivity) {
      if (!earnedByActivity) {
        this.oasActivityAchievementMap.get(scout.id).oasAchievements[
          statementIndex
        ][0] = !oldValue;
      }
    },
    countAll(statementSet) {
      let count = 0;
      statementSet.requirements.forEach((el) => {
        count = count + el.statements.length;
      });
      return count;
    },
    pdrColCount(statementSet) {
      let retVal = [];
      statementSet.forEach((set) => {
        set.requirements.forEach((el) => {
          retVal.push({ text: el.type, columnSpan: el.statements.length });
        });
      });
      return retVal;
    },
  },
  beforeCreate() {
    console.log("OasView beforeCreate()");
  },
  beforeMount() {
    console.log("OasView beforeMount()");
  },
  mounted() {
    console.log("OasView mounted()");
  },
  beforeUnmount() {
    console.log("OasView beforeUnmount()");
    // Need to check if any of the individual scout's achievements need to be updated.

    members.forEach((scout) => {
      // for this scout, construct a list of individual achievements per the UI
      let statuses = this.oasActivityAchievementMap.get(
        scout.id
      ).oasAchievements;
      let ui_ican = new Array();
      let index = 0;
      statuses.forEach((status) => {
        if (
          status[0] &&
          !status[1] &&
          !ui_ican.includes(this.flatOasStatements[index])
        ) {
          // UI says scout achieved this I can ... Statement
          // without attending a group activity.
          ui_ican.push(this.flatOasStatements[index]);
        }
        index = index + 1;
      });

      if (!arrayContentMatches(scout.ican, ui_ican)) {
        // Some element of the OAS statements for this scout has changed
        if (ui_ican.length == 0) {
          scout.ican = undefined;
        } else {
          scout.ican = ui_ican;
        }
        writeMember(scout);
      }
    });
  },
  unmounted() {
    console.log("OasView unmounted()");
  },
  beforeUpdate() {
    console.log("OasView beforeUpdate()");
  },
  unpdate() {
    console.log("OasView unpdate()");
  },
};
</script>

<style scoped>
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
