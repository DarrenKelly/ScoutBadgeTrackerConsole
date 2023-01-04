<template>
  <button class="imgbutton" @click="trashactivity()">
    <img
      src="@/assets/Trash.png"
      :class="[allowDelete ? 'icon' : 'gone', 'trash']"
    />
  </button>
  <form @submit.prevent="onSubmit" class="add-activity-form">
    <div class="form-control">
      <div class="typetable">
        <div>
          <label>Type</label>
          <select name="type" v-model="type">
            <option value="Regular Meet">Regular Meet</option>
            <option value="Camp">Camp</option>
            <option value="Hike">Hike</option>
            <option value="Overnight Hike">Overnight Hike</option>
            <option value="Grey Wolf Hike">Grey Wolf Hike</option>
            <option value="Water Skills">Water Skills</option>
            <option value="Canoeing">Canoeing</option>
            <option value="Flying Day">Flying Day</option>
          </select>
        </div>
        <div></div>
        <div>
          <img
            src="@/assets/Water.png"
            :class="[
              type && (type.includes('Water') || type.includes('Canoe'))
                ? 'icon'
                : 'gone',
            ]"
          />
          <img
            src="@/assets/Canoe.png"
            :class="[type && type.includes('Canoe') ? 'icon' : 'gone']"
          />
          <img
            src="@/assets/GreyWolf.png"
            :class="[type && type.includes('Wolf') ? 'icon' : 'gone']"
          />
          <img
            src="@/assets/CampFire.png"
            :class="[
              type && (type.includes('Camp') || type.includes('Overnight'))
                ? 'icon'
                : 'gone',
            ]"
          />
          <img
            src="@/assets/Hike.png"
            :class="[type && type.includes('Hike') ? 'icon' : 'gone']"
          />
          <img
            src="@/assets/Plane.png"
            :class="[type && type.includes('Fly') ? 'icon' : 'gone']"
          />
          <img
            src="@/assets/Fishing.png"
            :class="[type && type.includes('Fish') ? 'icon' : 'gone']"
          />
        </div>
      </div>
      <div class="form-control">
        <label>activity Name</label>
        <input
          type="text"
          v-model="name"
          name="name"
          placeholder="activity Name"
        />
      </div>
      <div class="form-control">
        <label>Day</label>
        <input
          type="date"
          v-model="date"
          name="date"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <div class="form-control">
        <label>Location</label>
        <input
          type="text"
          v-model="location"
          name="location"
          placeholder="Location"
        />
      </div>
      <div class="form-control">
        <label>Duration</label>
        <input
          type="text"
          v-model="duration"
          name="duration"
          placeholder="# Hrs/Days"
        />
      </div>
      <div :class="[type && type.includes('Hike') ? 'form-control' : 'gone']">
        <label>Hike Distance</label>
        <input
          type="text"
          v-model="hikeKms"
          name="Hiked Kms"
          placeholder="# Kms"
        />
      </div>
      <div class="form-control">
        <label>Theme</label>
        <input type="text" v-model="theme" name="theme" placeholder="" />
      </div>
      <div class="form-control">
        <label>Note</label>
        <input
          type="text"
          v-model="note"
          name="note"
          placeholder="Eg. Leader?"
        />
      </div>
    </div>

    <input type="submit" value="Save activity" class="btn btn-block" />
  </form>
</template>

<script>
export default {
  name: "activityForm",
  data() {
    return {
      name: "",
      date: "",
      location: "",
      duration: "",
      type: "",
      hikeKms: "",
      note: "",
    };
  },
  props: {
    prefill: Object,
    allowDelete: Boolean,
  },
  emits: ["update-activity", "delete-activity"],
  methods: {
    onSubmit() {
      if (!this.type) {
        alert("Please select an activity type");
        return;
      }
      if (!this.name) {
        alert("Please add an activity name");
        return;
      }
      const newactivity = {
        id: this.id,
        type: this.type,
        name: this.name,
        date: this.date,
        location: this.location,
        duration: this.duration,
        hikeKms: this.hikeKms,
        note: this.note,
      };
      console.log("Addactivity.vue emitting update-activity");
      this.$emit("update-activity", newactivity);
      this.type = "";
      this.name = "";
      this.date = "";
      this.location = "";
      this.duration = "";
      this.hikeKms = "";
      this.note = "";
    },
    trashactivity() {
      console.log("activityForm trashactivity()");
      if (confirm("Are you sure?")) {
        this.$emit("delete-activity", this.id);
      }
    },
  },
  created() {
    console.log("activityForm created()");
    this.id = this.prefill.id;
    this.type = this.prefill.type;
    this.name = this.prefill.name;
    this.date = this.prefill.date;
    this.location = this.prefill.location;
    this.duration = this.prefill.duration;
    this.hikeKms = this.prefill.hikeKms;
    this.theme = this.prefill.theme;
    this.note = this.prefill.note;
  },
};
</script>

<style scoped>
.add-activity-form {
  margin-bottom: 20px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 20px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.two-elements {
  display: grid;
  width: 100%;
  grid-template-columns: 256px 128px;
}

.typetable {
  display: grid;
  grid-template-columns: 100px 25px auto;
}
.icon {
  width: 45px;
  margin-left: 5px;
  height: auto;
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
</style>
