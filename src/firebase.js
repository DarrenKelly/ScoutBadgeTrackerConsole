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

const FB_ACTIVITY_KEY = "/group/2ndGordon/section/cubs/activities";
const FB_MEMBER_KEY = "/group/2ndGordon/members";
const FB_CONFIG_KEY = "/group/2ndGordon/config";

const activities = [];
const members = [];
let config = { hideOldActivities: false, hideArchivedMembers: false };
let user = null;

export {
  googlePopupLogin,
  writeMember,
  deleteMember,
  writeActivity,
  deleteActivity,
  initialise,
  setUser,
  getUser,
  members,
  activities,
  config,
};

//For testing only @todo remove later
export { FB_MEMBER_KEY, FB_ACTIVITY_KEY, FB_CONFIG_KEY };

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
      console.log("Google user=" + JSON.stringify(result.user));
    })
    .catch((error) => {
      console.error("Google Login error:" + error.errorMessage);
      console.error("Google Login error:", error);
    });
}

function removeUndefined(activity) {
  let obj = {};
  for (const [key, value] of Object.entries(activity)) {
    if (value != null) {
      obj[key] = value;
    }
  }
  return obj;
}

async function initialise(user) {
  initialiseActivities();
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

async function writeActivity(activity) {
  if (activity.id == null) {
    // This is a new activity
    try {
      const newActivityRef = await addDoc(
        collection(FireDB.getInstance(), FB_ACTIVITY_KEY),
        activity
      );
      console.log("Activity saved newActivityRef=" + newActivityRef.id);
      activity.id = newActivityRef.id;
    } catch (error) {
      console.log("Unable to save the new activity. " + error);
      alert("Unable to save the new activity. " + error);
    }
  } else {
    try {
      await setDoc(
        doc(FireDB.getInstance(), FB_ACTIVITY_KEY, activity.id),
        removeUndefined(activity)
      );
      console.log("Activity updated");
    } catch (error) {
      console.log(
        "Unable to update activity with ID=" + activity.id + ". " + error
      );
      alert("Unable to update the activity. " + error);
    }
  }
  return activity.id;
}

async function deleteMember(memberId) {
  try {
    await deleteDoc(doc(FireDB.getInstance(), FB_MEMBER_KEY, memberId));
  } catch (error) {
    alert("Unable to delete the member. " + error);
  }
}

async function deleteActivity(activityId) {
  try {
    await deleteDoc(doc(FireDB.getInstance(), FB_ACTIVITY_KEY, activityId));
  } catch (error) {
    alert("Unable to delete the activity. " + error);
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
        hideOldActivities: doc.data().hideOldActivities,
        hideArchivedMembers: doc.data().hideArchivedMembers,
      };
    }
  });

  return config;
}

// We don't ewant to load activities looking back to all time.
// Use this constant to define how many months of old activities
// the app should load by default.
const DEFAULT_LOOKBACK_MONTHS = 12;

async function initialiseActivities() {
  let lookbackDate = new Date();
  lookbackDate.setMonth(lookbackDate.getMonth() - DEFAULT_LOOKBACK_MONTHS);

  let lookbackStr = lookbackDate.toISOString().split("T")[0];

  const q = query(
    collection(FireDB.getInstance(), FB_ACTIVITY_KEY),
    where("date", ">=", lookbackStr)
  );

  let querySnapshot = await getDocs(q).catch((err) => {
    console.error("Error returned by server:" + err);
  });

  if (!querySnapshot) {
    console.warn(
      "querySnapshot is undefined, likely due to an error.  Check permissions and network connectivity."
    );
    return;
  }
  activities.length = 0;
  querySnapshot.forEach((doc) => {
    let newActivity = {
      id: doc.id,
      name: doc.data().name,
      type: doc.data().type,
      challengeType: doc.data().challengeType,
      date: doc.data().date,
      duration: doc.data().duration,
      location: doc.data().location,
      hikeKms: doc.data().hikeKms,
      theme: doc.data().theme,
      note: doc.data().note,
      participants: doc.data().participants,
      ican: doc.data().ican,
    };
    if (newActivity.ican == undefined) {
      newActivity.ican = new Array();
    }
    activities.push(newActivity);
  });

  activities.sort(compare);

  return activities;
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
      preferredname: doc.data().preferredname,
      familyname: doc.data().familyname,
      legalname: doc.data().legalname,
      parentname: doc.data().parentname,
      greywolf: doc.data().greywolf,
      scoutid: doc.data().scoutid,
      investdate: doc.data().investdate,
      section: doc.data().section,
      trial: doc.data().trial,
      archived: doc.data().archived,
      contactphone: doc.data().contactphone,
      contactemail: doc.data().contactemail,
      gender: doc.data().gender,
      patrol: doc.data().patrol,
      role: doc.data().role,
      dob: getISODate(doc.data().dob),
      joindate: getISODate(doc.data().joindate),
      membertype: doc.data().membertype,
      ican: [...new Set(doc.data().ican)],
    };
    members.push(newMember);
  });

  return members;
}
