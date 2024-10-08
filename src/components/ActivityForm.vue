<template>
  <button class="imgbutton" @click="trashActivity()">
    <img
      src="@/assets/Trash.png"
      :class="[allowDelete ? 'icon trash' : 'gone']"
    />
  </button>
  <form @submit.prevent="onSubmit" class="add-activity-form">
    <div class="typetable">
      <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
        <label>Type</label>
        <select name="type" v-model="type" class="dropdown">
          <option
            v-for="(option, index) in this.activityOptions"
            v-bind:value="option"
            v-bind:key="index"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <ActivityIcon :icon_type="type" />
    </div>
    <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
      <label>Challenge Type</label>
      <select name="challenge" v-model="challengeType" class="dropdown">
        <option
          v-for="(option, index) in this.challengeOptions"
          v-bind:value="option"
          v-bind:key="index"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
      <label>Activity Name</label>
      <input
        type="text"
        v-model="name"
        name="name"
        placeholder="activity Name"
      />
    </div>
    <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
      <label>Day</label>
      <input type="date" v-model="date" name="date" placeholder="YYYY-MM-DD" />
    </div>
    <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
      <label>Location</label>
      <input
        type="text"
        v-model="location"
        name="location"
        placeholder="Location"
      />
    </div>
    <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
      <label>Duration</label>
      <input
        type="text"
        v-model="duration"
        name="duration"
        placeholder="# Hrs/Days"
      />
    </div>
    <div
      :class="[
        type && type.includes('Hike')
          ? isMobile()
            ? 'mob_form-control'
            : 'form-control'
          : 'gone',
      ]"
    >
      <label>Hike Distance</label>
      <input
        type="text"
        v-model="hikeKms"
        name="Hiked Kms"
        placeholder="# Kms"
      />
    </div>
    <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
      <label>Theme</label>
      <input type="text" v-model="theme" name="theme" placeholder="" />
    </div>
    <div :class="[isMobile() ? 'mob_form-control' : 'form-control']">
      <label>Note</label>
      <input type="text" v-model="note" name="note" placeholder="Eg. Leader?" />
    </div>
    <input
      type="submit"
      value="Save Activity"
      :class="[isMobile() ? 'mobile_btn mobile_btn-block' : 'btn btn-block']"
    />

    <div v-show="!this.isMobile()">
      <CollapsableOptionSet
        v-for="(oas, index) in oasOptions"
        :key="index"
        :sectionTitle="oas.area + ' ' + oas.stage"
        :labelset="oas.requirements"
        :selected="ican"
        @update="(list) => onUpdate(index, list)"
      />
    </div>
  </form>
</template>

<script>
import { activityTypes, challengeTypes, oasStatements } from "@/scouting.js";
import CollapsableOptionSet from "@/components/widgets/CollapsableOptionSet.vue";
import ActivityIcon from "@/components/widgets/ActivityIcon.vue";

function concatenateAll(arrayArray) {
  let retVal = new Array();
  arrayArray.forEach((array) => {
    array.forEach((el) => {
      if (!retVal.includes(el)) {
        retVal.push(el);
      }
    });
  });
  return retVal;
}

export default {
  name: "ActivityForm",
  components: {
    CollapsableOptionSet,
    ActivityIcon,
  },
  data() {
    return {
      name: "",
      date: "",
      location: "",
      duration: "",
      type: "",
      challengeType: "",
      hikeKms: "",
      note: "",
      participants: [],

      // Need to return the full list of "I can ..."
      // statements as as simple array.
      // However, as they are segmented into sections
      // for display purposes, we also need to track
      // them by the CollapsableOptionSet that groups
      // a subset of the statemets.
      ican: [], // unified list of statements
      selectedICanStatements: [], // grouped by area

      activityOptions: activityTypes,
      challengeOptions: challengeTypes,
      oasOptions: oasStatements,
    };
  },
  props: {
    prefill: Object,
    allowDelete: Boolean,
  },
  emits: ["update-activity", "delete-activity"],
  methods: {
    isMobile() {
      if (screen.width <= 760) {
        return true;
      } else {
        return false;
      }
    },
    onSubmit() {
      if (!this.type) {
        alert("Please select an activity type");
        return;
      }
      if (!this.name) {
        alert("Please add an activity name");
        return;
      }
      const newActivity = {
        id: this.id,
        type: this.type,
        challengeType: this.challengeType,
        name: this.name,
        date: this.date,
        location: this.location,
        duration: this.duration,
        hikeKms: this.hikeKms,
        note: this.note,
        participants: this.participants,
        ican: concatenateAll(this.selectedICanStatements),
      };
      console.log("AddActivity.vue emitting update-activity");
      console.log("AddActivity " + JSON.stringify(newActivity));
      this.$emit("update-activity", newActivity);
      this.type = "";
      this.challengeType = "";
      this.name = "";
      this.date = "";
      this.location = "";
      this.duration = "";
      this.hikeKms = "";
      this.note = "";
      this.participants = [];
      this.selectedICanStatements = [];
    },
    trashActivity() {
      console.log("ActivityForm trashActivity()");
      if (confirm("Are you sure?")) {
        this.$emit("delete-activity", this.id);
      }
    },
    onUpdate(index, textList) {
      this.selectedICanStatements[index] = textList;
    },
  },
  created() {
    console.log("ActivityForm created() " + this.prefill.ican);
    this.oasOptions.forEach(() => {
      this.selectedICanStatements.push([]);
    });

    this.id = this.prefill.id;
    this.type = this.prefill.type;
    this.challengeType = this.prefill.challengeType;
    this.name = this.prefill.name;
    this.date = this.prefill.date;
    this.location = this.prefill.location;
    this.duration = this.prefill.duration;
    this.hikeKms = this.prefill.hikeKms;
    this.theme = this.prefill.theme;
    this.note = this.prefill.note;
    this.participants = this.prefill.participants;
    this.ican = this.prefill.ican;

    oasStatements;
  },
};
</script>

<style scoped>
.add-activity-form {
  margin-bottom: 20px;
}

.form-control {
  margin: 20px 25px 0 0;
}
.mob_form-control {
  margin: 20px 25px 0 0;
  font-size: 25px;
}

.form-control label {
  display: flex;
}
.mob_form-control label {
  display: flex;
}

.form-control select {
  height: 50px;
  margin: 10px 0 0 0;
  padding: 10px 7px;
  font-size: 17px;
}
.mob_form-control select {
  height: 50px;
  margin: 10px 0 0 0;
  padding: 10px 7px;
  font-size: 20px;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 10px;
  padding: 10px 7px;
  font-size: 17px;
}
.mob_form-control input {
  height: 40px;
  margin: 10px;
  padding: 10px 7px;
  font-size: 20px;
}

.dropdown {
  width: 235px;
  height: 30px;
}

.two-elements {
  display: grid;
  width: 100%;
  grid-template-columns: 256px 128px;
}

.typetable {
  display: grid;
  grid-template-columns: 250px 25px auto;
}

.icon {
  width: 45px;
  margin-top: 35px;
  margin-left: 5px;
  height: 45px;
}

.gone {
  display: none;
}

.trash {
  display: block;
  height: 48px;
  width: 48px;
  padding: 0;
  margin: 0;
}

.imgbutton {
  padding: 0px;
  margin: 0px;
  margin-right: 2px;
  border: none;
  display: block;
  height: 48px;
  width: 48px;
  float: right;
}

.img-container {
  display: flex;
}
</style>
