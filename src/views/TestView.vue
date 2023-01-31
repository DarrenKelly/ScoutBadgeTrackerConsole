<template>
  <div class="test">
    <h1>This page is for testing only.</h1>
    <h2>You should not see this page</h2>
  </div>

  <table>
    <tr v-for="y in myMap" :key="y[0]">
      <td>
        {{ y[0] }}
      </td>
      <td v-for="(value, index) in y[1]" :key="index" v-bind="value[0]">
        <button
          @click="(...args) => onManualChange(index, y[0])"
          :class="[value[0] ? 'cell-yes' : 'cell-no']"
        ></button>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "TestVue",
  data: function () {
    return {
      myMap: new Map(),
    };
  },
  created() {
    console.log("created()");
    this.myMap.set("Amy", [
      [true, true],
      [true, true],
      [true, false],
      [true, false],
    ]);
    this.myMap.set("Bob", [
      [false, true],
      [false, true],
      [false, true],
      [false, true],
    ]);
    this.myMap.set("Cam", [
      [true, false],
      [false, false],
      [true, false],
      [false, false],
    ]);
    console.log("created()-");
  },
  methods: {
    onManualChange(index, id) {
      console.log("onManualChange()");
      let isFixed = this.myMap.get(id)[index][1];
      if (!isFixed) {
        this.myMap.get(id)[index][0] = !this.myMap.get(id)[index][0];
      }
      console.log("onManualChange() - ");
    },
  },
};
</script>

<style scoped>
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
