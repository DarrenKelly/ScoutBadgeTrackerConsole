<template>
  <button type="button" @click="toggleButtonClicked()">
    {{ sectionTitle }}
  </button>
  <div :class="['content', this.contentVisible ? 'visible' : 'invisible']">
    <ul v-for="(set, index) in labelset" :key="index">
      <label class="set-title">{{ set.type }}</label>
      <ul class="togglelist">
        <li v-for="(label, index) in set.statements" :key="index">
          <ToggleSwitch
            :checked="this.selected.includes(label)"
            :labelText="label"
            @unchecked="removeText"
            @checked="addText"
          />
        </li>
      </ul>
    </ul>
  </div>
</template>
<script>
import ToggleSwitch from "@/components/widgets/ToggleSwitch.vue";
export default {
  name: "CollapsableOptionSet",
  components: {
    ToggleSwitch,
  },
  data() {
    return {
      contentVisible: false,
      selectedStatements: [],
    };
  },
  props: {
    sectionTitle: String,
    labelset: { type: Array, required: true },
    selected: { type: Array, required: true },
  },
  emits: ["update"],
  methods: {
    toggleButtonClicked() {
      console.log(
        "toggleButtonClicked() " + this.sectionTitle + " " + this.contentVisible
      );
      this.contentVisible = !this.contentVisible;
    },
    addText(text) {
      console.log("Adding " + text);
      this.selectedStatements.push(text);
      this.$emit("update", this.selectedStatements);
    },
    removeText(text) {
      console.log("Removing " + text);
      var index = this.selectedStatements.indexOf(text);
      if (index !== -1) {
        this.selectedStatements.splice(index, 1);
      }
      this.$emit("update", this.selectedStatements);
    },
  },
  created() {
    console.log("CollapsableOptionSet created()");
    this.selectedStatements = this.selected;
  },
};
</script>

<style scoped>
.set-title {
  display: flex;
  justify-content: center;
  text-align: center;
  background: #ccc;
  width: 75%;
  height: 15px;
}

.visible {
  display: block;
}
.invisible {
  display: none;
}

ul li::marker {
  content: "";
}

ul {
  display: flex;
  flex-wrap: wrap;
}

.togglelist li {
  float: left;
  margin: 20px 0;
}

button {
  height: 35px;
  width: 80%;
  background-color: #bbb;
  color: black;
}
</style>
