import {
  collection,
  doc,
  query,
  where,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FireAuth, FireDB } from "./firebaseInit";

const FB_EVENT_KEY = "/group/2ndGordon/section/cubs/events";
const FB_MEMBER_KEY = "/group/2ndGordon/members";
const FB_CONFIG_KEY = "/group/2ndGordon/config";

const events = [];
const members = [];
let config = { hideOldEvents: false, hideArchivedMembers: false };
let user = null;

export {
  googlePopupLogin,
  writeMember,
  deleteMember,
  writeEvent,
  deleteEvent,
  initialise,
  setUser,
  getUser,
  members,
  events,
  config,
};

//For testing only @todo remove later
export { FB_MEMBER_KEY, FB_EVENT_KEY, FB_CONFIG_KEY };

function setUser(newUser) {
  user = newUser;
}

function getUser() {
  return user;
}

function compare(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

const provider = new GoogleAuthProvider();
function googlePopupLogin() {
  console.log("googlePopupLogin()");
  signInWithPopup(FireAuth.getInstance(), provider)
    .then((result) => {
      console.log("Google user=" + result.user);
    })
    .catch((error) => {
      console.log("Google Login error:" + error.errorMessage);
    });
}

function removeUndefined(event) {
  let obj = {};
  for (const [key, value] of Object.entries(event)) {
    if (value != null) {
      obj[key] = value;
    }
  }
  return obj;
}

async function initialise(user) {
  initialiseEvents();
  initialiseMembers();
  initialiseConfig(user);
}

async function writeMember(member) {
  console.log("writeMember " + member.id);
  if (member.id == null) {
    try {
      const newMemberRef = await addDoc(
        collection(FireDB.getInstance(), FB_MEMBER_KEY),
        member
      );
      member.id = newMemberRef.id;
      console.log("Member saved. New Id=" + member.id);
    } catch (error) {
      alert("Unable to save the new member. " + error);
    }
  } else {
    try {
      await setDoc(
        doc(FireDB.getInstance(), FB_MEMBER_KEY, member.id),
        removeUndefined(member)
      );
      console.log("Member updated");
    } catch (error) {
      alert("Unable to update the member. " + error);
    }
  }
  return member.id;
}

async function writeEvent(event) {
  if (event.id == null) {
    // This is a new event
    try {
      const newEventRef = await addDoc(
        collection(FireDB.getInstance(), FB_EVENT_KEY),
        event
      );
      console.log("Event saved newEventRef=" + newEventRef.id);
      event.id = newEventRef.id;
    } catch (error) {
      alert("Unable to save the new event. " + error);
    }
  } else {
    try {
      await setDoc(
        doc(FireDB.getInstance(), FB_EVENT_KEY, event.id),
        removeUndefined(event)
      );
      console.log("Event updated");
    } catch (error) {
      alert("Unable to update the event. " + error);
    }
  }
  return event.id;
}

async function deleteMember(memberId) {
  try {
    await deleteDoc(doc(FireDB.getInstance(), FB_MEMBER_KEY, memberId));
  } catch (error) {
    alert("Unable to delete the member. " + error);
  }
}

async function deleteEvent(eventId) {
  try {
    await deleteDoc(doc(FireDB.getInstance(), FB_EVENT_KEY, eventId));
  } catch (error) {
    alert("Unable to delete the event. " + error);
  }
}

async function initialiseConfig(user) {
  const querySnapshot = await getDocs(
    collection(FireDB.getInstance(), FB_CONFIG_KEY)
  );

  querySnapshot.forEach((doc) => {
    if (doc.data().id == user) {
      config = {
        id: doc.id,
        name: doc.data().id,
        hideOldEvents: doc.data().hideOldEvents,
        hideArchivedMembers: doc.data().hideArchivedMembers,
      };
    }
  });

  return config;
}

// We don't ewant to load  events looking back to all time.
// Use this constant to define how many months of old events
// the app should load by default.
const DEFAULT_LOOKBACK_MONTHS = 12;

async function initialiseEvents() {
  let lookbackDate = new Date();
  lookbackDate.setMonth(lookbackDate.getMonth() - DEFAULT_LOOKBACK_MONTHS);

  let lookbackStr = lookbackDate.toISOString().split("T")[0];

  const q = query(
    collection(FireDB.getInstance(), FB_EVENT_KEY),
    where("date", ">=", lookbackStr)
  );

  let querySnapshot = await getDocs(q).catch((err) => {
    console.log("Error returned by server:" + err);
  });

  events.length = 0;
  querySnapshot.forEach((doc) => {
    let newEvent = {
      id: doc.id,
      name: doc.data().name,
      type: doc.data().type,
      date: doc.data().date,
      duration: doc.data().duration,
      location: doc.data().location,
      hikekms: doc.data().hikekms,
      theme: doc.data().theme,
      note: doc.data().note,
      participants: doc.data().participants,
    };
    events.push(newEvent);
  });

  events.sort(compare);

  return events;
}

function getISODate(inDate) {
  if (inDate == null) {
    return "";
  }
  if (inDate instanceof Date) {
    return inDate.toISOString().split("T")[0];
  }
  return ("" + inDate).split("T")[0];
}

async function initialiseMembers() {
  const querySnapshot = await getDocs(
    collection(FireDB.getInstance(), FB_MEMBER_KEY)
  );

  members.length = 0;
  querySnapshot.forEach((doc) => {
    let newMember = {
      id: doc.id,
      givenname: doc.data().givenname,
      familyname: doc.data().familyname,
      section: doc.data().section,
      trial: doc.data().trial,
      waitlist: doc.data().waitlist,
      archived: doc.data().archived,
      contactphone: doc.data().contactphone,
      contactemail: doc.data().contactemail,
      gender: doc.data().gender,
      patrol: doc.data().patrol,
      role: doc.data().role,
      dob: getISODate(doc.data().dob),
      joindate: getISODate(doc.data().joindate),
      membertype: doc.data().membertype,
    };
    members.push(newMember);
  });

  return members;
}
