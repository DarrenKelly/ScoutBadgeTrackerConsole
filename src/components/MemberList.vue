<template>
  <div v-for="member in patrolNameSort(members)" :key="member.id">
    <ScoutMember
      :enableEdit="enableEdit"
      :member="member"
      :initialState="getInitialState(member.id)"
      @update-member="updateMember"
      @delete-member="deleteMember"
      @change-participation="changeParticipation"
      v-if="!hideOldMembers || !member.archived"
    />
  </div>
</template>

<script>
import ScoutMember from "./ScoutMember";

function patrolName(a, b) {
  if (typeof a.patrol !== "undefined" && typeof b.patrol == "undefined")
    return -1;
  if (typeof a.patrol == "undefined" && typeof b.patrol !== "undefined")
    return 1;
  if (a.patrol < b.patrol) return -1;
  if (a.patrol > b.patrol) return 1;
  if (a.preferredname < b.preferredname) return -1;
  if (a.preferredname > b.preferredname) return 1;
  if (a.familyname < b.familyname) return -1;
  if (a.familyname > b.familyname) return 1;
  return 0;
}

export default {
  name: "MemberList",
  props: {
    members: Array,
    participants: Array,
    hideOldMembers: Boolean,
    enableEdit: Boolean,
  },
  components: {
    ScoutMember,
  },
  emits: ["update-member", "delete-member", "change-participation"],
  methods: {
    updateMember(modifiedMember) {
      console.log("MemberList updateMember with Id " + modifiedMember.id);
      this.$emit("update-member", modifiedMember);
    },
    deleteMember(memberId) {
      console.log("MemberList deleteMember with Id " + memberId);
      this.$emit("delete-member", memberId);
    },
    patrolNameSort(memberList) {
      console.log("MemberList patrolNameSort()");
      return [...memberList].sort(patrolName);
    },
    changeParticipation(memberId, state, adultOrYouth) {
      this.$emit("change-participation", memberId, state, adultOrYouth);
    },
    getInitialState(memberId) {
      if (this.participants == null) {
        return "";
      }
      let participant = this.participants.find((a) => a.id == memberId);

      if (participant == null) {
        return "";
      }
      console.log("role=" + participant.role);
      return participant.role;
    },
  },
  data() {
    return {};
  },
  beforeCreate() {
    console.log("MemberList beforeCreate()");
  },
  created() {
    console.log("MemberList created()");
  },
  beforeMount() {
    console.log("MemberList beforeMount()");
  },
  mounted() {
    console.log("MemberList mounted()");
  },
  beforeUnmount() {
    console.log("MemberList beforeUnmount()");
  },
  unmounted() {
    console.log("MemberList unmounted()");
  },
  beforeUpdate() {
    console.log("MemberList beforeUpdate()");
  },
  unpdate() {
    console.log("MemberList unpdate()");
  },
};
</script>
