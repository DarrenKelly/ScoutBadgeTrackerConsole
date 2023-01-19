<template>
  <div class="toplevel">
    <div class="home">
      <HomeScreen />
    </div>
    <div class="buttoncontainer">
      <div v-if="!isLoggedIn">
        <img class="gimage" src="@/assets/GoogleG.png" />
        <StyledButton
          @clicked="onLoginClicked"
          :button_text="'Login with Google'"
          colour="blue"
        />
      </div>
      <div v-if="isLoggedIn">
        <StyledButton
          @clicked="onLogoutClicked"
          :button_text="'Logout'"
          colour="blue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeScreen from "@/components/HomeScreen";
import { googlePopupLogin, initialise } from "@/firebase";
import { FireAuth } from "@/firebaseInit";
import router from "@/router";
import { signOut, onAuthStateChanged } from "@firebase/auth";
import StyledButton from "@/components/widgets/StyledButton";

export default {
  name: "HomeView",
  components: {
    HomeScreen,
    StyledButton,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    onLoginClicked() {
      googlePopupLogin();
    },
    onLogoutClicked() {
      signOut(FireAuth.getInstance()).then(() => {
        router.push("/about");
      });
    },
  },
  mounted() {
    console.log("HomeScreen onMounted()");
    onAuthStateChanged(FireAuth.getInstance(), (user) => {
      if (user) {
        initialise(user);
        console.log("HomeScreen user=" + JSON.stringify(user));
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
.gimage {
  height: 50px;
  vertical-align: middle;
  padding-bottom: 2px;
}
.buttoncontainer {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}
.toplevel {
  text-align: center;
}
</style>
