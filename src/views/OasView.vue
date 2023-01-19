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
          <th rowspan="3">Scout</th>

          <th
            v-for="(statement, index) in statements"
            :key="index"
            :colspan="countAll(statement)"
          >
            {{ statement.area }} {{ statement.stage }}
          </th>
        </tr>
        <tr class="pdr-row">
          <th
            v-for="(pdr, index) in pdrColCount(statements)"
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
      </thead>
      <tbody>
        <tr v-for="scout in filteredScouts" :key="scout.id" class="scout-row">
          <td
            v-if="scout.legalname !== undefined"
            class="name-cell end-cell keeptogether"
          >
            {{ scout.preferredname }} "{{ scout.legalname }}"
            {{ scout.familyname }}
          </td>
          <td
            v-if="scout.legalname == undefined"
            class="name-cell end-cell keeptogether"
          >
            {{ scout.preferredname }} {{ scout.familyname }}
          </td>
          <td
            v-for="(value, index) in oasActivityAchievementMap.get(scout.id)"
            :key="index"
            v-bind="value"
            :class="index % 2 == 0 ? 'c1' : 'c2'"
          >
            <OasButton
              @manual-change="onManualChange"
              :oasStatement="this.flatOasStatements[index]"
              :scoutId="scout.id"
              :initiallySetManually="this.manuallyAdded.get(scout.id)[index]"
              :activitySet="value"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { members, activities } from "@/firebase";
import { oasStatements, allOasStatements } from "@/scouting";
import OasButton from "@/components/widgets/OasButton";

// Get a mapping from scouts to OAS "I Can ..." statements that
// they have achieved by dint of attending an activity.
function allActivityAchievements() {
  // First, build a map from "I can ..." statements to activities
  let iCanActivities = new Map();
  activities.forEach((act) => {
    act.iCan.forEach((iCan) => {
      if (iCanActivities.has(iCan)) {
        let arr = iCanActivities.get(iCan);
        arr.push(act);
        iCanActivities.set(iCan, arr);
      } else {
        let arr = new Array();
        arr.push(act);
        iCanActivities.set(iCan, arr);
      }
    });
  });

  let retVal = new Map();
  members.forEach((scout) => {
    retVal.set(scout.id, []);
  });
  let count = 0;
  // For each "I can ..." statement look at the
  // related activities and mark all attending
  // scouts as having achieved the statement.
  allOasStatements.forEach((text) => {
    if (iCanActivities.has(text)) {
      iCanActivities.get(text).forEach((act) => {
        act.participants.forEach((scout) => {
          if (retVal.has(scout.id)) {
            retVal.get(scout.id).push(true);
          }
        });
      });
    }
    // scouts that were not at this activity
    retVal.forEach((arr) => {
      if (arr.length == count) {
        arr.push(false);
      }
    });

    count = count + 1;
  });
  return retVal;
}

// Extract achievements that are on the scout's individual
// records and return them in a Map.
function allManuallyAddedAchievements() {
  let retVal = new Map();
  members.forEach((scout) => {
    let scoutArray = new Array();

    retVal.set(scout.id, scoutArray);
    // @todo
    // For each "I can ..." statement look at the
    // this scout's manual OAS statemets and
    // mark it as true if presant, false otherwise
    allOasStatements.forEach((text) => {
      if (scout.iCan == undefined) {
        scoutArray.push(false);
      } else {
        if (scout.iCan.includes(text)) {
          scoutArray.push(true);
        } else {
          scoutArray.push(false);
        }
      }
    });
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

export default {
  name: "OasView",
  components: {
    OasButton,
  },
  setup() {
    const filterText = ref("");
    const filteredScouts = computed(() => {
      let filter = filterText.value;
      if (!filter.length) {
        console.log("No Filter");
        return members;
      }
      console.log("Filter=" + filter);
      return members.filter((scout) => filterScoutName(scout, filter));
    });
    const oasActivityAchievementMap = allActivityAchievements();
    return {
      filterText,
      filteredScouts,
      oasActivityAchievementMap,
    };
  },
  created() {
    console.log("OasView created()");
    this.manuallyAdded = allManuallyAddedAchievements();
  },
  data: function () {
    return {
      filterKey: "",
      scouts: members,
      statements: oasStatements,
      flatOasStatements: allOasStatements,
      manuallyAdded: [],
    };
  },
  computed: {},
  methods: {
    onManualChange(statement, scoutId, newValue) {
      console.log(
        "ManualChange to " +
          newValue +
          " for scout=" +
          scoutId +
          " ," +
          statement
      );
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
    allStatementsInSet(statementSet) {
      let retVal = [];
      statementSet.forEach((set) => {
        set.requirements.forEach((el) => {
          retVal = retVal.concat(el.statements);
        });
      });
      return retVal;
    },
    setAchievement(scoutID, oasIndex, newValue) {
      console.log(
        "setAchievement(" + scoutID + ", " + oasIndex + ", " + newValue + ")"
      );
      this.oasActivityAchievementMap.get(scoutID)[oasIndex] = newValue;
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
