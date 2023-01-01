<template>
  <div class="test">
    <h1>This page is for testing only.</h1>
    <h2>You should not see this page</h2>
    <TestHeader
      @readEvents="onReadClicked"
      @commitTestEvents="onCommitClicked"
    />
    <EventList :events="events" />
  </div>
</template>

<script>
import TestHeader from "@/components/TestHeader";
import EventList from "@/components/EventList";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { FB_EVENT_KEY, FB_CONFIG_KEY } from "@/firebase";
import { FireDB } from "@/firebaseInit";

// async function writeEvents(newEvents) {
//   newEvents.forEach(async (newEvent) => {
//     try {
//       const docRef = await addDoc(collection(fdb, FB_EVENT_KEY), newEvent);

//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   });
// }

// async function writeMembers(newMembers) {
//   newMembers.forEach(async (newMember) => {
//     try {
//       const docRef = await addDoc(
//         collection(FireDB.getInstance(), FB_MEMBER_KEY),
//         newMember
//       );

//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   });
// }

async function writeConfig(config) {
  try {
    let userKey = FB_CONFIG_KEY;
    const docRef = await addDoc(
      collection(FireDB.getInstance(), userKey),
      config
    );

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default {
  name: "TestView",
  methods: {
    async onReadClicked() {
      const querySnapshot = await getDocs(
        collection(FireDB.getInstance(), FB_EVENT_KEY)
      );

      this.events = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().type}`);
        let newEvent = {
          name: doc.id,
          type: doc.data().type,
          date: doc.data().date,
          duration: doc.data().duration,
          location: doc.data().location,
          theme: doc.data().theme,
        };
        this.events = [...this.events, newEvent];
      });
    },
    async onCommitClicked() {
      let newConfig = {
        id: "darren",
        hideOldEvents: false,
        hideArchivedMembers: false,
      };
      writeConfig(newConfig);
    },
  },
  components: {
    TestHeader,
    EventList,
  },

  data() {
    return {
      events: [],
    };
  },
  created() {},
};
</script>
