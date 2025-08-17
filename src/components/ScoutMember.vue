<template>
  <div
    @click="onClick"
    :class="[
      isMobile ? 'mobile_member' : 'member',
      member.archived ? 'archived' : '',
      state == 'Helping'
        ? 'helper'
        : state == 'Leader'
        ? 'leader'
        : state == 'Attended'
        ? 'attended'
        : '',
      member.patrol == 'Red'
        ? 'red-patrol'
        : member.patrol == 'Orange'
        ? 'orange-patrol'
        : member.patrol == 'Purple'
        ? 'purple-patrol'
        : member.patrol == 'Yellow'
        ? 'yellow-patrol'
        : member.patrol == 'Blue'
        ? 'blue-patrol'
        : member.patrol == 'Green'
        ? 'green-patrol'
        : 'no-patrol',
    ]"
  >
    <div class="title">
      {{ member.preferredname }}
      {{ "member.legalname" ? member.legalname : "" }}
      {{ member.familyname }}
    </div>
    <div>
      <img
        src="@/assets/Helper.png"
        :class="[state == 'Helping' ? 'icon' : 'gone']"
      />
      <img
        src="@/assets/Leader.png"
        :class="[state == 'Leader' ? 'icon' : 'gone']"
      />
    </div>
    <div>
      {{ member.patrol }}{{ member.patrol ? " patrol," : "" }}
      {{ member.role ? member.role + ", " : "" }} Contact:{{
        member.parentname
      }}
      {{ member.contactphone }}
    </div>
  </div>
  <div v-if="enableEdit && showEditForm">
    <MemberForm
      @update-member="updateMember"
      @delete-member="deleteMember"
      :allow-delete="true"
      :prefill="member"
    />
  </div>
</template>

<script>
import MemberForm from "@/components/MemberForm.vue";
import { useMobileDetection } from "@/composables/useMobileDetection.js";

export default {
  name: "ScoutMember",
  setup() {
    const { isMobile } = useMobileDetection();
    return { isMobile };
  },
  data() {
    return {
      showEditForm: false,
      state: this.initialState,
    };
  },
  props: {
    member: Object,
    enableEdit: Boolean,
    initialState: String,
  },
  components: {
    MemberForm,
  },
  emits: ["update-member", "delete-member", "change-participation"],
  methods: {
    onClick() {
      console.log("Clicked on Member with Id " + this.member.id);
      if (this.enableEdit) {
        console.log("form enabled");
        this.showEditForm = !this.showEditForm;
      } else {
        console.log(" Changing state from '" + this.state + "'");
        switch (this.state) {
          case "":
            this.state = "Attended";
            break;
          case "Attended":
            this.state = "Helping";
            break;
          case "Helping":
            this.state = "Leader";
            break;
          case "Leader":
            this.state = "";
            break;
        }
        this.$emit(
          "change-participation",
          this.member.id,
          this.state,
          this.member.membertype
        );
      }
    },
    updateMember(modifiedMember) {
      console.log("ScoutMember updateMember with Id " + modifiedMember.id);
      this.$emit("update-member", modifiedMember);
      this.showEditForm = false;
    },
    deleteMember(memberId) {
      console.log("ScoutMember deleteMember with Id " + memberId);
      this.$emit("delete-member", memberId);
      this.showEditForm = false;
    },
  },
  created() {
    console.log("ScoutMember created() initialState=" + this.initialState);
  },
};
</script>

<style scoped>
.member {
  background: #f4f4f4;
  display: grid;
  grid-template-columns: auto 60px;
  font-size: 20px;
  height: 2cm;
  margin: 5px;
  padding: 10px 5px;
}
.mobile_member {
  background: #f4f4f4;
  display: grid;
  grid-template-columns: auto 60px;
  font-size: 24pt;
  height: 100px;
  margin: 5px;
  padding: 10px 5px;
}
.title {
  white-space: nowrap;
}
.helper {
  background: #a4d4a4;
}
.leader {
  background: #a4d4a4;
}
.attended {
  background: #a4d4a4;
}
.archived {
  border-left: 5px solid red;
}
.icon {
  width: 45px;
  height: auto;
}
.gone {
  display: none;
}
.red-patrol {
  border-left: 5pt solid #f0041f;
}
.orange-patrol {
  border-left: 5pt solid #f58206;
}
.purple-patrol {
  border-left: 5pt solid #b522ff;
}
.yellow-patrol {
  border-left: 5pt solid #ecd901;
}
.blue-patrol {
  border-left: 5pt solid #3030ff;
}
.green-patrol {
  border-left: 5pt solid #14c704;
}
.no-patrol {
  border-left: 5pt solid #aaaaaa;
}
</style>
