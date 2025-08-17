<template>
  <div>
    <button
      type="button"
      @click="toggleButtonClicked()"
      class="collapsable-toggle-btn"
    >
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
    console.log("CollapsableOptionSet created() " + this.selected);
    this.selectedStatements = this.selected;
  },
};
</script>

<style scoped>
.set-title {
  display: block;
  text-align: center;
  width: 100%;
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
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

.togglelist {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.togglelist li {
  margin: 20px 0;
}

.collapsable-toggle-btn {
  height: 40px;
  width: 100%;
  background-color: #e9ecef;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 0.2s ease;
}

.collapsable-toggle-btn:hover {
  background-color: #dee2e6;
  border-color: #adb5bd;
}

.collapsable-toggle-btn:active {
  background-color: #ced4da;
  transform: scale(0.98);
}
</style>
