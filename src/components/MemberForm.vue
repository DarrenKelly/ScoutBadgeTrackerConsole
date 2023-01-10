<template>
  <button class="imgbutton" @click="trashMember()">
    <img
      src="@/assets/Trash.png"
      :class="[allowDelete ? 'icon trash' : 'gone']"
    />
  </button>
  <form @submit.prevent="onSubmit" class="member-form">
    <div class="form-control">
      <label>Member Type</label>
      <select name="membertype" v-model="membertype">
        <option value="Youth">Youth</option>
        <option value="Adult">Adult</option>
      </select>
    </div>
    <div class="form-control">
      <label>Gender</label>
      <select name="gender" v-model="gender">
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="-">Other</option>
      </select>
    </div>

    <div>
      <label>Section</label>
      <select name="section" v-model="section">
        <option value="Joey">Joey</option>
        <option value="Cubs">Cubs</option>
        <option value="Scouts">Scouts</option>
        <option value="Venturers">Venturers</option>
        <option value="Rovers">Rovers</option>
      </select>
    </div>

    <div class="form-control">
      <ToggleSwitch
        :checked="archived"
        :labelText="'Archived'"
        @unchecked="unarchive"
        @checked="archive"
      />
    </div>

    <div class="form-control">
      <ToggleSwitch
        :checked="trial"
        :labelText="'Trial'"
        @unchecked="untrial"
        @checked="entrial"
      />
    </div>
    <div class="form-control">
      <ToggleSwitch
        :checked="greywolf"
        :labelText="'Grey Wolf'"
        @unchecked="unwolf"
        @checked="enwolf"
      />
    </div>

    <div class="form-control">
      <label>Preferred Name</label>
      <input
        type="text"
        v-model="preferredname"
        name="preferredname"
        placeholder="Given Name"
      />
    </div>
    <div class="form-control">
      <label>Family Name</label>
      <input
        type="text"
        v-model="familyname"
        name="familyname"
        placeholder="Family Name"
      />
    </div>
    <div class="form-control">
      <label>Legal Given Name</label>
      <input
        type="text"
        v-model="legalname"
        name="legalname"
        placeholder="If different from Preferred Name"
      />
    </div>

    <div class="form-control">
      <label>Scout ID</label>
      <input
        type="text"
        v-model="scoutid"
        name="scoutid"
        placeholder="Scout ID"
      />
    </div>

    <div class="form-control">
      <label>Date of Birth</label>
      <input type="date" v-model="dob" name="dob" placeholder="YYYY-MM-DD" />
    </div>

    <div class="form-control">
      <label>Join Date</label>
      <input
        type="date"
        v-model="joindate"
        name="joindate"
        placeholder="YYYY-MM-DD"
      />
    </div>
    <div class="form-control">
      <label>Invest Date</label>
      <input
        type="date"
        v-model="investdate"
        name="investdate"
        placeholder="YYYY-MM-DD"
      />
    </div>
    <div class="form-control">
      <label>Parent's Name</label>
      <input
        type="text"
        v-model="parentname"
        name="parentname"
        placeholder="Parent's Name"
      />
    </div>

    <div class="form-control">
      <label>Contact Phone</label>
      <input
        type="text"
        v-model="contactphone"
        name="contactphone"
        placeholder="Contact Phone"
      />
    </div>
    <div class="form-control">
      <label>Contact Email</label>
      <input
        type="text"
        v-model="contactemail"
        name="contactemail"
        placeholder="Contact Email"
      />
    </div>

    <input type="submit" value="Save Member" class="btn btn-block" />
  </form>
</template>

<script>
import ToggleSwitch from "@/components/ToggleSwitch.vue";
export default {
  name: "MemberForm",
  components: {
    ToggleSwitch,
  },
  data() {
    return {
      id: "",
      archived: false,
      contactemail: "",
      contactphone: "",
      dob: "",
      familyname: "",
      legalname: "",
      parentname: "",
      greywolf: "",
      scoutid: "",
      investdate: "",
      gender: "",
      preferredname: "",
      joindate: "",
      membertype: "",
      patrol: "",
      section: "",
      trial: false,
    };
  },
  props: {
    prefill: Object,
    allowDelete: Boolean,
  },
  emits: ["update-member", "delete-member"],
  methods: {
    onSubmit() {
      if (!this.membertype) {
        alert("Please select an member type");
        return;
      }
      if (!this.familyname) {
        alert("Please add an member family name");
        return;
      }
      if (!this.preferredname) {
        alert("Please add an member given name");
        return;
      }
      const newMember = {
        id: this.id,
        archived: this.archived,
        contactemail: this.contactemail,
        contactphone: this.contactphone,
        dob: this.dob,
        familyname: this.familyname,
        legalname: this.legalname,
        parentname: this.parentname,
        greywolf: this.greywolf,
        scoutid: this.scoutid,
        investdate: this.investdate,
        gender: this.gender,
        preferredname: this.preferredname,
        joindate: this.joindate,
        membertype: this.membertype,
        patrol: this.patrol,
        section: this.section,
        trial: this.trial,
      };
      console.log("AddMember.vue emitting update-member");
      this.$emit("update-member", newMember);
      this.archived = false;
      this.contactemail = "";
      this.contactphone = "";
      this.dob = "";
      this.familyname = "";
      this.gender = "";
      this.preferredname = "";
      this.joindate = "";
      this.membertype = "";
      this.patrol = "";
      this.section = "";
      this.trial = false;
    },
    trashMember() {
      console.log("MemberForm trashMember()");
      if (confirm("Are you sure?")) {
        this.$emit("delete-member", this.id);
      }
    },
    unwolf() {
      this.greywolf = false;
    },
    enwolf() {
      this.greywolf = true;
    },
    untrial() {
      this.trial = false;
    },
    entrial() {
      this.trial = true;
    },
    unarchive() {
      this.archived = false;
    },
    archive() {
      this.archived = true;
    },
  },
  created() {
    console.log("MemberForm created()" + this.prefill.section);

    this.id = this.prefill.id;
    this.archived = this.prefill.archived;
    this.contactemail = this.prefill.contactemail;
    this.contactphone = this.prefill.contactphone;
    this.dob = this.prefill.dob;
    this.familyname = this.prefill.familyname;
    this.gender = this.prefill.gender;
    this.preferredname = this.prefill.preferredname;
    this.joindate = this.prefill.joindate;
    this.membertype = this.prefill.membertype;
    this.patrol = this.prefill.patrol;
    this.section = this.prefill.section;
    this.trial = this.prefill.trial;

    console.log("MemberForm exiting created()" + this.section);
  },
};
</script>

<style scoped>
.member-form {
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
ul li::marker {
  content: "";
}
</style>
