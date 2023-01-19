<template>
  <StyledButton
    @clicked="onButtonClicked"
    :button_text="'GO!'"
    :colour="'green'"
  />
  <div class="test">
    <h1>This page is for testing only.</h1>
    <h2>You should not see this page</h2>
    <table>
      <tr v-for="(teamMember, index) in this.teamMembers" :key="index">
        <td v-for="value in getElements(teamMember)" :key="value">
          {{ value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { writeMember } from "@/firebase";
import StyledButton from "@/components/widgets/StyledButton";

const exportedMemberData = [];

export default {
  name: "TestView",
  components: {
    StyledButton,
  },
  data: function () {
    return {
      teamMembers: exportedMemberData,
    };
  },
  methods: {
    getElements: function (person) {
      let retVal = [];

      Object.keys(person).forEach(function (prop) {
        retVal.push(person[prop]);
      });
      return retVal;
    },
    onButtonClicked: function () {
      this.teamMembers.forEach(function (person) {
        writeMember(person);
      });
    },
  },
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid;
}
</style>
