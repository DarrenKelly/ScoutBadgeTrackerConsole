export { milestoneParticipate, milestoneAssist, milestoneLead };

function milestoneParticipate(scout, activities, target) {
  var outdoorChallengeCount = 0;
  var creativeChallengeCount = 0;
  var communityChallengeCount = 0;
  var personalGrowthChallengeCount = 0;

  activities.forEach(function (ev) {
    if (ev.participants) {
      let found = ev.participants.find((el) => {
        el.id == scout.id;
      });
      if (found && ev.challengeType != null) {
        switch (ev.challengeType) {
          case "Outdoor":
            outdoorChallengeCount = outdoorChallengeCount + 1;
            break;
          case "Creative":
            creativeChallengeCount = creativeChallengeCount + 1;
            break;
          case "Community":
            communityChallengeCount = communityChallengeCount + 1;
            break;
          case "Personal Growth":
            personalGrowthChallengeCount = personalGrowthChallengeCount + 1;
            break;
        }
      }
    }
  });

  return (
    outdoorChallengeCount >= target &&
    creativeChallengeCount >= target &&
    communityChallengeCount >= target &&
    personalGrowthChallengeCount >= target
  );
}

function milestoneAssist(scout, activities, target) {
  var outdoorChallengeCovered = false;
  var creativeChallengeCovered = false;
  var communityChallengeCovered = false;
  var personalGrowthChallengeCovered = false;
  var areasCovered = 0;

  activities.forEach(function (ev) {
    if (ev.participants) {
      let found = ev.participants.find((el) => {
        el.id == scout.id && el.role == "Helping";
      });
      if (found && ev.challengeType != null) {
        switch (ev.challengeType) {
          case "Outdoor":
            if (!outdoorChallengeCovered) {
              outdoorChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
          case "Creative":
            if (!creativeChallengeCovered) {
              creativeChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
          case "Community":
            if (!communityChallengeCovered) {
              communityChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
          case "Personal Growth":
            if (!personalGrowthChallengeCovered) {
              personalGrowthChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
        }
        if (areasCovered >= target) return true;
      }
    }
  });
  return false;
}

function milestoneLead(scout, activities, target) {
  var outdoorChallengeCovered = false;
  var creativeChallengeCovered = false;
  var communityChallengeCovered = false;
  var personalGrowthChallengeCovered = false;
  var areasCovered = 0;

  activities.forEach(function (ev) {
    if (ev.participants) {
      let found = ev.participants.find((el) => {
        el.id == scout.id && el.role == "Leader";
      });
      if (found && ev.challengeType != null) {
        switch (ev.challengeType) {
          case "Outdoor":
            if (!outdoorChallengeCovered) {
              outdoorChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
          case "Creative":
            if (!creativeChallengeCovered) {
              creativeChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
          case "Community":
            if (!communityChallengeCovered) {
              communityChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
          case "Personal Growth":
            if (!personalGrowthChallengeCovered) {
              personalGrowthChallengeCovered = true;
              areasCovered = areasCovered + 1;
            }
            break;
        }
        if (areasCovered >= target) return true;
      }
    }
  });
  return false;
}
