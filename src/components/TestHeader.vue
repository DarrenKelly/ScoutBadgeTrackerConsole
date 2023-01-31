<template>
  <header>
    <h1>Test Page</h1>
    <StyledButton
      @clicked="onButtonClicked"
      button_text="Read Events"
      colour="green"
    />
    <StyledButton
      @clicked="onButtonClicked"
      button_text="Commmit Events"
      colour="red"
    />
  </header>

  <table class="oas-table">
    <tr v-for="y in yvals" :key="y.id">
      <td>
        {{ y.name }}
      </td>
      <td v-for="(value, index) in myMap.get(y.id)" :key="index" v-bind="value">
        <button
          @click="(...args) => onManualChange(index, y.id)"
          :class="[value ? 'cell-yes' : 'cell-no']"
        ></button>
      </td>
    </tr>
  </table>
</template>

<script>
import StyledButton from "@/components/widgets/StyledButton";
export default {
  name: "TestHeader",
  components: {
    StyledButton,
  },
  data: function () {
    return {
      myMap: [],
    };
  },
  created() {
    this.myMap.set("Amy", [true, true, true, true]);
    this.myMap.set("Bob", [false, false, false, false]);
    this.myMap.set("Cam", [true, false, true, false]);
  },
  methods: {
    onManualChange(index, id) {
      this.myMap.get(id)[index] = !this.myMap.get(id)[index];
    },
    onButtonClicked(text) {
      if (text == "Read Events") {
        console.log("readEvents");
      } else if (text == "Commmit Events") {
        console.log("commitTestEvents");
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cell-success {
  background: #83ac86;
  color: black;
}
.cell-success::after {
  content: "👍";
}
.cell-wip {
  background: #eee;
  color: black;
}
.cell-wip::after {
  content: "⬜";
}
</style>
