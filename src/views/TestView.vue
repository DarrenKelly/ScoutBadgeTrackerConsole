<template>
  <div class="test">
    <h1>This page is for testing only.</h1>
    <h2>You should not see this page</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Participate</th>
          <th>Assist</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="teamMember in teamMembers" :key="teamMember.id">
          <td v-for="value in getElements(teamMember)" :key="value">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TestView",
  data: function () {
    return {
      teamMembers: [
        { preferredname: "John", familyname: "Doe" },
        { preferredname: "Jane", familyname: "Doe" },
      ],
    };
  },
  methods: {
    getElements: function (person) {
      return [
        person.preferredname, // more complex in reality
        person.familyname,
        person.preferredname + person.familyname,
      ];
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
