<template>
  <div class="members">
    <MembersHeader
      @show-add-member-form="toggleAddMemberForm"
      @filter-old-members="filterOldMembers"
      :showForm="showForm"
      :hideOldMembers="hideOldMembers"
    />
    <div v-if="showForm">
      <MemberForm
        @update-member="addNewMember"
        :allow-delete="false"
        :prefill="prefill"
      />
    </div>
    <MemberList
      @update-member="modifyMember"
      @delete-member="localDeleteMember"
      :members="membersdata"
      :enableEdit="true"
      :hideOldMembers="hideOldMembers"
    />
  </div>
</template>

<script>
import MembersHeader from "@/components/MembersHeader";
import MemberList from "@/components/MemberList";
import MemberForm from "@/components/MemberForm.vue";
import { members, writeMember, deleteMember } from "@/firebase";

export default {
  name: "MemberView",
  components: {
    MembersHeader,
    MemberList,
    MemberForm,
  },
  data() {
    return {
      membersdata: members,
      hideOldMembers: true,
      showForm: false,
      prefill: {
        id: null,
        givenname: null,
        familyname: null,
        section: null,
        trial: null,
        waitlist: null,
        archived: null,
        contactphone: null,
        contactemail: null,
        gender: null,
        patrol: null,
        role: null,
        dob: null,
        joindate: null,
        membertype: null,
      },
    };
  },
  methods: {
    addNewMember(newMember) {
      console.log("MemberView onAddMember()");
      writeMember(newMember);
      this.membersdata.push(newMember);
      this.showForm = false;
    },
    modifyMember(modifiedMember) {
      console.log("MemberView modifyMember()");

      const found = this.membersdata.find((el) => el.id == modifiedMember.id);

      if (!found) {
        console.error(
          "MemberView modifyMember() could not find member with id " +
            modifiedMember.id
        );
        return;
      }

      console.log("modifiedMember=" + modifiedMember);

      found.givenname = modifiedMember.givenname;
      found.familyname = modifiedMember.familyname;
      found.section = modifiedMember.section;
      found.trial = modifiedMember.trial;
      found.waitlist = modifiedMember.waitlist;
      found.archived = modifiedMember.archived;
      found.contactphone = modifiedMember.contactphone;
      found.contactemail = modifiedMember.contactemail;
      found.gender = modifiedMember.gender;
      found.patrol = modifiedMember.patrol;
      found.role = modifiedMember.role;
      found.dob = modifiedMember.dob;
      found.joindate = modifiedMember.joindate;
      found.membertype = modifiedMember.membertype;

      writeMember(modifiedMember);
    },
    localDeleteMember(memberId) {
      console.log("MemberView localDeleteMember()");

      const found = this.membersdata.find((el) => el.id == memberId);
      const index = this.membersdata.indexOf(found);
      this.membersdata.splice(index, 1);

      deleteMember(memberId);
    },
    filterOldMembers() {
      console.log("MemberView filterOldMembers() ");
      this.hideOldMembers = !this.hideOldMembers;
    },
    toggleAddMemberForm() {
      console.log("MemberView toggleAddMemberForm()");
      this.showForm = !this.showForm;
    },
  },
  props: {},
  beforeCreate() {
    console.log("MemberView beforeCreate()");
  },
  created() {
    console.log("MemberView created()");
  },
  beforeMount() {
    console.log("MemberView beforeMount()");
  },
  mounted() {
    console.log("MemberView mounted()");
  },
  beforeUnmount() {
    console.log("MemberView beforeUnmount()");
  },
  unmounted() {
    console.log("MemberView unmounted()");
  },
  beforeUpdate() {
    console.log("MemberView beforeUpdate()");
  },
  unpdate() {
    console.log("MemberView unpdate()");
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
</style>
