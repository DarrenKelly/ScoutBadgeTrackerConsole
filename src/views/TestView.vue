<template>
  <StyledButton
    @clicked="onButtonClicked"
    :button_text="'GO!'"
    :colour="'green'"
  />
  <div class="test">
    <h1>This page is for testing only.</h1>
    <h2>You should not see this page</h2>
    <table>
      <tr v-for="(teamMember, index) in this.teamMembers" :key="index">
        <td v-for="value in getElements(teamMember)" :key="value">
          {{ value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { writeMember } from "@/firebase";
import StyledButton from "@/components/widgets/StyledButton";

const exportedMemberData = [
  {
    preferredname: "Matteo",
    familyname: "Logan",
    parentname: "Eugene Logan",
    archived: false,
    contactphone: "0418 063 419",
    contactemail: "mfleming@yahoo.com",
    greywolf: false,
    gender: "M",
    patrol: "Blue",
    section: "Cubs",
    trial: false,
    dob: "2013-03-11",
    membertype: "Youth",
    joindate: "2020-08-02",
    scoutid: 1276592,
    investdate: "2020-12-06",
    linked: false,
  },
  {
    preferredname: "Azaan",
    familyname: "Mahoney",
    parentname: "Carlene Mahoney",
    archived: false,
    contactphone: "0423 932 518",
    contactemail: "sokol@sbcglobal.net",
    greywolf: false,
    gender: "M",
    patrol: "Blue",
    section: "Cubs",
    trial: false,
    dob: "2012-10-18",
    membertype: "Youth",
    joindate: "2022-01-30",
    scoutid: 1427812,
    investdate: "2022-05-21",
    linked: false,
  },
  {
    preferredname: "Paul",
    familyname: "Dudley",
    parentname: "Shawn Dudley",
    archived: false,
    contactphone: "0429 185 851",
    contactemail: "wetter@verizon.net",
    greywolf: false,
    gender: "M",
    patrol: "Blue",
    section: "Cubs",
    trial: false,
    dob: "2014-03-03",
    membertype: "Youth",
    joindate: "2022-07-24",
    scoutid: 1279571,
    investdate: "2021-06-09",
    linked: true,
  },
  {
    preferredname: "Marley",
    familyname: "Herman",
    parentname: "Enoch Herman",
    archived: false,
    contactphone: "0440 850 018",
    contactemail: "jfriedl@verizon.net",
    role: "PL",
    greywolf: true,
    gender: "M",
    patrol: "Blue",
    section: "Cubs",
    trial: false,
    dob: "2012-06-05",
    membertype: "Youth",
    joindate: "2020-02-02",
    scoutid: 1855727,
    investdate: "2020-05-03",
    linked: false,
  },
  {
    preferredname: "Oisin",
    familyname: "Morris",
    parentname: "Ross Morris",
    archived: false,
    contactphone: "0453 952 524",
    contactemail: "dkeeler@att.net",
    role: "UL",
    greywolf: true,
    gender: "M",
    patrol: "Blue",
    section: "Cubs",
    trial: false,
    dob: "2011-11-28",
    membertype: "Youth",
    joindate: "2019-07-28",
    scoutid: 1444882,
    investdate: "2019-10-11",
    linked: false,
  },
  {
    preferredname: "Sami",
    familyname: "Mays",
    parentname: "Tommy Mays",
    archived: false,
    contactphone: "0459 476 832",
    contactemail: "sonnen@icloud.com",
    greywolf: false,
    gender: "M",
    patrol: "Blue",
    section: "Cubs",
    trial: false,
    dob: "2013-11-12",
    membertype: "Youth",
    joindate: "2022-01-30",
    scoutid: 1683161,
    investdate: "2021-09-01",
    linked: true,
  },
  {
    preferredname: "Seth",
    familyname: "Andrews",
    parentname: "Denise Andrews",
    archived: false,
    contactphone: "0465 853 821",
    contactemail: "cosimo@yahoo.com",
    greywolf: false,
    gender: "M",
    patrol: "Blue",
    section: "Cubs",
    trial: false,
    dob: "2014-01-14",
    membertype: "Youth",
    joindate: "2022-01-30",
    scoutid: 1119311,
    investdate: "2022-05-21",
    linked: false,
  },
  {
    preferredname: "Lulu",
    familyname: "Kaufman",
    parentname: "Lupe Kaufman",
    archived: false,
    contactphone: "0469 345 162",
    contactemail: "telbij@outlook.com",
    greywolf: false,
    gender: "F",
    patrol: "Blue",
    section: "Cubs",
    trial: true,
    dob: "2014-05-26",
    membertype: "Youth",
    joindate: "2023-02-05",
    scoutid: 1085385,
    linked: true,
  },
  {
    preferredname: "Alanna",
    familyname: "Clark",
    parentname: "Evangeline Clark",
    archived: true,
    contactphone: "0498 283 314",
    contactemail: "wildfire@optonline.net",
    role: "APL",
    greywolf: false,
    gender: "F",
    patrol: "DGO",
    section: "Cubs",
    trial: false,
    dob: "2009-05-28",
    membertype: "Youth",
    joindate: "2019-02-03",
    scoutid: 1320353,
    investdate: "2020-03-08",
    linked: false,
    notes: "Transitioned to Scouts on 5 Feb 2021",
  },
  {
    preferredname: "Kaitlin",
    familyname: "Mcgrath",
    parentname: "Amie Mcgrath",
    archived: true,
    contactphone: "0491 570 156",
    contactemail: "irving@att.net",
    greywolf: false,
    gender: "F",
    patrol: "DGO",
    section: "Cubs",
    trial: false,
    dob: "2011-11-23",
    membertype: "Youth",
    joindate: "2019-10-27",
    scoutid: 1696643,
    investdate: "2020-02-16",
    linked: false,
    notes: "Moved interstate Dec 2022",
  },
  {
    preferredname: "Natalia",
    familyname: "Li",
    legalname: "Ailbhe",
    parentname: "Brittany Li",
    archived: true,
    contactphone: "0428 921 025",
    contactemail: "dowdy@hotmail.com",
    greywolf: false,
    gender: "F",
    patrol: "DGO",
    section: "Cubs",
    trial: false,
    dob: "2012-07-27",
    membertype: "Youth",
    joindate: "2021-11-14",
    scoutid: 1431859,
    investdate: "2022-06-26",
    linked: false,
    notes: "Dropped out end T2 2022",
  },
  {
    preferredname: "Teddy",
    familyname: "Chang",
    legalname: "Brân",
    parentname: "Sarah Chang",
    archived: true,
    contactphone: "0443 327 526",
    contactemail: "horrocks@me.com",
    role: "PL",
    greywolf: true,
    gender: "F",
    patrol: "DGO",
    section: "Cubs",
    trial: false,
    dob: "2010-07-23",
    membertype: "Youth",
    joindate: "2019-02-03",
    scoutid: 1550149,
    investdate: "2020-03-08",
    linked: false,
    notes: "Transitioned to Scouts end T1 2022",
  },
  {
    preferredname: "Brogan",
    familyname: "Burton",
    parentname: "Ezekiel Burton",
    archived: true,
    contactphone: "0450 913 079",
    contactemail: "evilopie@aol.com",
    role: "PL",
    greywolf: false,
    gender: "F",
    patrol: "DGO",
    section: "Cubs",
    trial: false,
    dob: "2009-08-27",
    membertype: "Youth",
    joindate: "2018-02-04",
    scoutid: 1188169,
    investdate: "2018-11-25",
    linked: false,
    notes: "Dropped out end T1 2021",
  },
  {
    preferredname: "Jannat",
    familyname: "Valenzuela",
    parentname: "Jeanne Valenzuela",
    archived: true,
    contactphone: "0465 813 975",
    contactemail: "singh@sbcglobal.net",
    greywolf: false,
    gender: "F",
    patrol: "DGO",
    section: "Cubs",
    trial: false,
    dob: "2013-11-03",
    membertype: "Youth",
    scoutid: 1546425,
    investdate: "2021-03-17",
    linked: true,
    notes: "Dropped out end T3 2022",
  },
  {
    preferredname: "Neo",
    familyname: "Snyder",
    legalname: "Muirne",
    parentname: "Jean Snyder",
    archived: true,
    contactphone: "0468 120 092",
    contactemail: "malattia@comcast.net",
    role: "PL",
    greywolf: true,
    gender: "F",
    patrol: "DGO",
    section: "Cubs",
    trial: false,
    dob: "2011-01-20",
    membertype: "Youth",
    joindate: "2019-05-12",
    scoutid: 1192818,
    investdate: "2020-02-23",
    linked: false,
    notes: "Transitioned to Scouts end T2 2022",
  },
  {
    preferredname: "Roosevelt",
    familyname: "Benitez",
    parentname: "Reynaldo Benitez",
    archived: true,
    contactphone: "0494 761 862",
    contactemail: "jonathan@live.com",
    role: "PL",
    greywolf: true,
    gender: "M",
    patrol: "FNL",
    section: "Cubs",
    trial: false,
    dob: "2010-11-20",
    membertype: "Youth",
    joindate: "2019-02-03",
    scoutid: 1785991,
    investdate: "2020-03-08",
    linked: false,
    notes: "Transitioned to Scouts end T1 2022",
  },
  {
    preferredname: "Charles",
    familyname: "Atkins",
    parentname: "Patricia Atkins",
    archived: true,
    contactphone: "0495 951 031",
    contactemail: "mdielmann@me.com",
    greywolf: false,
    gender: "M",
    patrol: "FNL",
    section: "Cubs",
    trial: false,
    dob: "2013-11-24",
    membertype: "Youth",
    joindate: "2021-08-15",
    scoutid: 1789867,
    investdate: "2021-09-01",
    linked: true,
    notes: "Dropped out end T1 2022",
  },
  {
    preferredname: "Vera",
    familyname: "Bullock",
    parentname: "Fritz Bullock",
    archived: true,
    contactphone: "0491 570 158",
    contactemail: "aaribaud@me.com",
    role: "APL",
    greywolf: false,
    gender: "F",
    patrol: "FNL",
    section: "Cubs",
    trial: false,
    dob: "2011-11-06",
    membertype: "Youth",
    joindate: "2020-11-22",
    scoutid: 1779214,
    linked: false,
    notes: "Dropped out Nov 2022",
  },
  {
    preferredname: "Halle",
    familyname: "Tate",
    parentname: "Haley Tate",
    archived: true,
    contactphone: "0491 570 159",
    contactemail: "wonderkid@msn.com",
    greywolf: false,
    gender: "F",
    patrol: "FNL",
    section: "Cubs",
    trial: false,
    dob: "2011-03-24",
    membertype: "Youth",
    joindate: "2020-09-06",
    scoutid: 1215191,
    investdate: "2020-12-06",
    linked: false,
    notes: "Left Scouts",
  },
  {
    preferredname: "Jessie",
    familyname: "Houston",
    parentname: "Trey Houston",
    archived: true,
    contactphone: "0437 147 650",
    contactemail: "skippy@yahoo.ca",
    role: "APL",
    greywolf: false,
    gender: "F",
    patrol: "FNL",
    section: "Cubs",
    trial: false,
    dob: "2010-04-22",
    membertype: "Youth",
    joindate: "2020-02-09",
    scoutid: 1959779,
    investdate: "2020-04-19",
    linked: false,
    notes: "Transitioned to Scouts Jan 2022",
  },
  {
    preferredname: "Adelaide",
    familyname: "Coleman",
    parentname: "Weston Coleman",
    archived: true,
    contactphone: "0451 143 196",
    contactemail: "dartlife@gmail.com",
    greywolf: false,
    gender: "F",
    patrol: "FNL",
    section: "Cubs",
    trial: false,
    dob: "2011-12-21",
    membertype: "Youth",
    joindate: "2020-11-22",
    scoutid: 1392740,
    linked: false,
    notes: "Dropped out Nov 2022",
  },
  {
    preferredname: "Xander",
    familyname: "Weaver",
    parentname: "Ariel Weaver",
    archived: false,
    contactphone: "0420 016 493",
    contactemail: "chaikin@yahoo.ca",
    greywolf: false,
    gender: "M",
    patrol: "Green",
    section: "Cubs",
    trial: false,
    dob: "2012-12-12",
    membertype: "Youth",
    joindate: "2020-12-13",
    scoutid: 1609319,
    investdate: "2021-11-07",
    linked: false,
  },
  {
    preferredname: "Dalton",
    familyname: "Tran",
    legalname: "Ler",
    parentname: "Jennie Tran",
    archived: false,
    contactphone: "0436 219 423",
    contactemail: "jonathan@aol.com",
    greywolf: false,
    gender: "M",
    patrol: "Green",
    section: "Cubs",
    trial: false,
    dob: "2014-04-15",
    membertype: "Youth",
    joindate: "2022-05-01",
    scoutid: 1077786,
    investdate: "2021-09-01",
    linked: true,
  },
  {
    preferredname: "Barney",
    familyname: "Zamora",
    parentname: "Humberto Zamora",
    archived: false,
    contactphone: "0442 057 584",
    contactemail: "ribet@aol.com",
    greywolf: true,
    gender: "M",
    patrol: "Green",
    section: "Cubs",
    trial: false,
    dob: "2014-06-03",
    membertype: "Youth",
    joindate: "2022-10-09",
    scoutid: 1897799,
    linked: false,
  },
  {
    preferredname: "Chris",
    familyname: "Hawkins",
    parentname: "Hilario Hawkins",
    archived: false,
    contactphone: "0442 801 249",
    contactemail: "konit@me.com",
    greywolf: false,
    gender: "M",
    patrol: "Green",
    section: "Cubs",
    trial: false,
    dob: "2012-08-07",
    membertype: "Youth",
    joindate: "2021-02-07",
    scoutid: 1219766,
    investdate: "2021-11-14",
    linked: false,
  },
  {
    preferredname: "Gethin",
    familyname: "Ortega",
    parentname: "Mara Ortega",
    archived: false,
    contactphone: "0458 915 235",
    contactemail: "sokol@verizon.net",
    greywolf: false,
    gender: "M",
    patrol: "Green",
    section: "Cubs",
    trial: false,
    dob: "2013-09-01",
    membertype: "Youth",
    joindate: "2022-01-30",
    scoutid: 1047194,
    investdate: "2022-09-04",
    linked: false,
  },
  {
    preferredname: "Frederick",
    familyname: "Gomez",
    parentname: "Barbara Gomez",
    archived: false,
    contactphone: "0476 962 485",
    contactemail: "tedrlord@sbcglobal.net",
    greywolf: false,
    gender: "M",
    patrol: "Green",
    section: "Cubs",
    trial: false,
    dob: "2013-09-17",
    membertype: "Youth",
    joindate: "2022-05-01",
    scoutid: 1038451,
    linked: false,
  },
  {
    preferredname: "Junaid",
    familyname: "Joyce",
    parentname: "Harriett Joyce",
    archived: false,
    contactphone: "0479 596 251",
    contactemail: "oneiros@yahoo.ca",
    greywolf: false,
    gender: "M",
    patrol: "Green",
    section: "Cubs",
    trial: true,
    dob: "2014-10-17",
    membertype: "Youth",
    joindate: "2023-02-05",
    scoutid: 1631956,
    linked: false,
  },
  {
    preferredname: "Remi",
    familyname: "Robinson",
    parentname: "Becky Robinson",
    archived: true,
    contactphone: "0419 748 903",
    contactemail: "elmer@mac.com",
    role: "PL",
    greywolf: false,
    gender: "F",
    patrol: "Green",
    section: "Cubs",
    trial: false,
    dob: "2011-04-04",
    membertype: "Youth",
    joindate: "2019-06-16",
    scoutid: 1335564,
    investdate: "2019-10-25",
    linked: false,
    notes: "Dropped out end T4 2022",
  },
  {
    preferredname: "Levi",
    familyname: "Stein",
    parentname: "Dorsey Stein",
    archived: true,
    contactphone: "0491 570 110",
    contactemail: "drolsky@mac.com",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2010-11-09",
    membertype: "Youth",
    joindate: "2020-08-09",
    scoutid: 1008891,
    investdate: "2019-02-01",
    linked: false,
    notes: "Left Scouts Jan 2022",
  },
  {
    preferredname: "Hallie",
    familyname: "Mendez",
    parentname: "Scott Mendez",
    archived: true,
    contactphone: "0420 914 390",
    contactemail: "matloff@live.com",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2011-04-07",
    membertype: "Youth",
    joindate: "2021-04-25",
    scoutid: 1664260,
    linked: false,
    notes: "Dropped out end T1 2022",
  },
  {
    preferredname: "Ty",
    familyname: "Mclaughlin",
    parentname: "Maryellen Mclaughlin",
    archived: true,
    contactphone: "0428 327 490",
    contactemail: "killmenow@yahoo.ca",
    role: "APL",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2010-10-23",
    membertype: "Youth",
    joindate: "2021-04-25",
    scoutid: 1205943,
    investdate: "2021-11-07",
    linked: false,
    notes: "Transitioned to Scouts end T1 2022",
  },
  {
    preferredname: "Ellis",
    familyname: "Mccann",
    parentname: "Issac Mccann",
    archived: true,
    contactphone: "0441 954 018",
    contactemail: "maratb@me.com",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2011-08-17",
    membertype: "Youth",
    joindate: "2020-11-22",
    scoutid: 1868277,
    investdate: "2021-11-14",
    linked: false,
    notes: "Dropped out end T4 2021",
  },
  {
    preferredname: "Yusra",
    familyname: "Barton",
    parentname: "Melvin Barton",
    archived: true,
    contactphone: "0442 324 521",
    contactemail: "claesjac@live.com",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2012-11-06",
    membertype: "Youth",
    joindate: "2021-11-21",
    scoutid: 1352994,
    linked: false,
    notes: "Dropped out end T3 2022",
  },
  {
    preferredname: "Dante",
    familyname: "Oliver",
    legalname: "Dhaukod",
    parentname: "Sophia Oliver",
    archived: true,
    contactphone: "0450 651 157",
    contactemail: "bhima@outlook.com",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2009-06-28",
    membertype: "Youth",
    joindate: "2020-08-16",
    scoutid: 1782281,
    linked: false,
    notes: "Transitioned to Scouts on 5 Feb 2021",
  },
  {
    preferredname: "Alyssa",
    familyname: "Solomon",
    parentname: "Bryon Solomon",
    archived: true,
    contactphone: "0451 280 091",
    contactemail: "mbalazin@aol.com",
    role: "PL",
    greywolf: true,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2009-07-03",
    membertype: "Youth",
    joindate: "2018-01-28",
    scoutid: 1638267,
    investdate: "2018-03-15",
    linked: false,
    notes: "Transitioned to Scouts on 5 Feb 2021",
  },
  {
    preferredname: "Maggie",
    familyname: "Preston",
    legalname: "Feidlimid",
    parentname: "Clyde Preston",
    archived: true,
    contactphone: "0452 137 164",
    contactemail: "qrczak@verizon.net",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2011-05-01",
    membertype: "Youth",
    joindate: "2019-07-28",
    scoutid: 1662729,
    investdate: "2019-10-11",
    linked: false,
    notes: "Left Scouts Jan 2002. Clash with sport",
  },
  {
    preferredname: "Iona",
    familyname: "Turner",
    parentname: "Betty Turner",
    archived: true,
    contactphone: "0453 450 059",
    contactemail: "martyloo@outlook.com",
    role: "PL",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2010-07-06",
    membertype: "Youth",
    joindate: "2020-03-01",
    scoutid: 1158077,
    investdate: "2020-04-19",
    linked: false,
    notes: "Dropped out end T1 2022",
  },
  {
    preferredname: "Macie",
    familyname: "Gay",
    parentname: "Wendi Gay",
    archived: true,
    contactphone: "0465 285 490",
    contactemail: "gfody@me.com",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2010-12-05",
    membertype: "Youth",
    joindate: "2019-10-20",
    scoutid: 1697100,
    investdate: "2020-02-16",
    linked: false,
    notes: "Dropped out end T1 2022",
  },
  {
    preferredname: "Fannie",
    familyname: "Robbins",
    parentname: "Jarrett Robbins",
    archived: true,
    contactphone: "0467 082 120",
    contactemail: "phyruxus@sbcglobal.net",
    role: "PL",
    greywolf: false,
    gender: "F",
    patrol: "LYB",
    section: "Cubs",
    trial: false,
    dob: "2009-12-01",
    membertype: "Youth",
    joindate: "2019-10-27",
    scoutid: 1127645,
    investdate: "2020-02-16",
    linked: false,
    notes: "Transitioned to Scouts Nov 2021",
  },
  {
    preferredname: "Zaki",
    familyname: "Burnett",
    parentname: "Benito Burnett",
    archived: false,
    contactphone: "0404 814 206",
    contactemail: "gbacon@aol.com",
    greywolf: false,
    gender: "M",
    patrol: "Orange",
    section: "Cubs",
    trial: false,
    dob: "2013-08-04",
    membertype: "Youth",
    joindate: "2022-01-28",
    scoutid: 1746290,
    investdate: "2022-09-04",
    linked: false,
  },
  {
    preferredname: "Armaan",
    familyname: "Garza",
    parentname: "Robby Garza",
    archived: false,
    contactphone: "0408 136 497",
    contactemail: "rande@me.com",
    greywolf: false,
    gender: "M",
    patrol: "Orange",
    section: "Cubs",
    trial: true,
    dob: "2014-05-27",
    membertype: "Youth",
    joindate: "2023-02-05",
    scoutid: 1565290,
    linked: false,
  },
  {
    preferredname: "Kaylum",
    familyname: "Baldwin",
    parentname: "Ismael Baldwin",
    archived: false,
    contactphone: "0417 235 917",
    contactemail: "sagal@icloud.com",
    greywolf: false,
    gender: "M",
    patrol: "Orange",
    section: "Cubs",
    trial: false,
    dob: "2014-04-25",
    membertype: "Youth",
    joindate: "2022-05-01",
    scoutid: 1526469,
    investdate: "2021-06-02",
    linked: true,
  },
  {
    preferredname: "Jonas",
    familyname: "Goodwin",
    parentname: "Roger Goodwin",
    archived: false,
    contactphone: "0430 802 167",
    contactemail: "jbarta@hotmail.com",
    greywolf: false,
    gender: "M",
    patrol: "Orange",
    section: "Cubs",
    trial: false,
    dob: "2014-04-15",
    membertype: "Youth",
    joindate: "2022-07-24",
    scoutid: 1759659,
    investdate: "2021-09-08",
    linked: true,
  },
  {
    preferredname: "Arron",
    familyname: "Booth",
    legalname: "Brigit",
    parentname: "Sabrina Booth",
    archived: false,
    contactphone: "0478 641 826",
    contactemail: "cyrus@outlook.com",
    greywolf: false,
    gender: "M",
    patrol: "Orange",
    section: "Cubs",
    trial: false,
    dob: "2013-10-30",
    membertype: "Youth",
    joindate: "2022-01-30",
    scoutid: 1364222,
    linked: false,
  },
  {
    preferredname: "Willard",
    familyname: "Lin",
    parentname: "Garfield Lin",
    archived: false,
    contactphone: "0492 074 316",
    contactemail: "nasor@yahoo.com",
    role: "PL",
    greywolf: true,
    gender: "M",
    patrol: "Orange",
    section: "Cubs",
    trial: false,
    dob: "2012-05-24",
    membertype: "Youth",
    joindate: "2021-10-24",
    scoutid: 1829983,
    investdate: "2022-05-21",
    linked: false,
  },
  {
    preferredname: "Rebekah",
    familyname: "Fuller",
    parentname: "Jane Fuller",
    archived: false,
    contactphone: "0492 740 467",
    contactemail: "dcoppit@aol.com",
    greywolf: false,
    gender: "M",
    patrol: "Orange",
    section: "Cubs",
    trial: false,
    dob: "2014-07-16",
    membertype: "Youth",
    joindate: "2022-10-09",
    scoutid: 1931949,
    linked: false,
  },
  {
    preferredname: "Kacper",
    familyname: "Good",
    parentname: "Emily Good",
    archived: false,
    contactphone: "0424 678 185",
    contactemail: "heckerman@icloud.com",
    greywolf: false,
    gender: "M",
    patrol: "Purple",
    section: "Cubs",
    trial: false,
    dob: "2012-10-23",
    membertype: "Youth",
    joindate: "2020-07-19",
    scoutid: 1994990,
    investdate: "2021-03-26",
    linked: false,
  },
  {
    preferredname: "Abdullah",
    familyname: "Gaines",
    parentname: "Zack Gaines",
    archived: false,
    contactphone: "0426 054 836",
    contactemail: "esokullu@sbcglobal.net",
    role: "PL",
    greywolf: true,
    gender: "M",
    patrol: "Purple",
    section: "Cubs",
    trial: false,
    dob: "2012-02-25",
    membertype: "Youth",
    joindate: "2020-02-09",
    scoutid: 1198540,
    investdate: "2020-04-19",
    linked: false,
  },
  {
    preferredname: "Angelo",
    familyname: "Park",
    parentname: "Carmelo Park",
    archived: false,
    contactphone: "0450 309 690",
    contactemail: "moonlapse@live.com",
    greywolf: false,
    gender: "M",
    patrol: "Purple",
    section: "Cubs",
    trial: false,
    dob: "2013-11-21",
    membertype: "Youth",
    joindate: "2022-05-01",
    scoutid: 1495125,
    investdate: "2021-09-08",
    linked: true,
  },
  {
    preferredname: "Renee",
    familyname: "Deleon",
    parentname: "Royal Deleon",
    archived: false,
    contactphone: "0470 345 928",
    contactemail: "lpalmer@aol.com",
    greywolf: false,
    gender: "M",
    patrol: "Purple",
    section: "Cubs",
    trial: false,
    dob: "2013-09-04",
    membertype: "Youth",
    joindate: "2021-12-31",
    scoutid: 1800920,
    investdate: "2021-03-17",
    linked: true,
  },
  {
    preferredname: "George",
    familyname: "Wolfe",
    parentname: "Billy Wolfe",
    archived: false,
    contactphone: "0474 359 203",
    contactemail: "dhwon@sbcglobal.net",
    greywolf: false,
    gender: "M",
    patrol: "Purple",
    section: "Cubs",
    trial: false,
    dob: "2013-03-06",
    membertype: "Youth",
    joindate: "2022-01-30",
    scoutid: 1552483,
    investdate: "2022-09-04",
    linked: false,
  },
  {
    preferredname: "Heath",
    familyname: "Ashley",
    legalname: "Loukya",
    parentname: "Melissa Ashley",
    archived: false,
    contactphone: "0484 649 940",
    contactemail: "tamas@live.com",
    greywolf: false,
    gender: "M",
    patrol: "Purple",
    section: "Cubs",
    trial: false,
    dob: "2013-06-04",
    membertype: "Youth",
    joindate: "2022-01-30",
    scoutid: 1374269,
    linked: false,
  },
  {
    preferredname: "Amelia",
    familyname: "Lane",
    parentname: "Daphne Lane",
    archived: false,
    contactphone: "0470 043 728",
    contactemail: "rande@yahoo.ca",
    greywolf: false,
    gender: "F",
    patrol: "Purple",
    section: "Cubs",
    trial: true,
    dob: "2014-08-05",
    membertype: "Youth",
    joindate: "2023-02-05",
    scoutid: 1154683,
    linked: true,
  },
  {
    preferredname: "Sasha",
    familyname: "Johnson",
    parentname: "Beulah Johnson",
    archived: false,
    contactphone: "0407 124 498",
    contactemail: "jginspace@gmail.com",
    greywolf: false,
    gender: "M",
    patrol: "Red",
    section: "Cubs",
    trial: false,
    dob: "2012-12-27",
    membertype: "Youth",
    joindate: "2021-02-07",
    scoutid: 1037499,
    investdate: "2021-03-26",
    linked: false,
  },
  {
    preferredname: "Tim",
    familyname: "Knapp",
    parentname: "Rob Knapp",
    archived: false,
    contactphone: "0435 124 637",
    contactemail: "timlinux@msn.com",
    greywolf: false,
    gender: "M",
    patrol: "Red",
    section: "Cubs",
    trial: false,
    dob: "2013-12-27",
    membertype: "Youth",
    joindate: "2022-05-01",
    scoutid: 1682826,
    investdate: "2021-03-17",
    linked: true,
  },
  {
    preferredname: "Arun",
    familyname: "Ryan",
    parentname: "Stanley Ryan",
    archived: false,
    contactphone: "0440 472 925",
    contactemail: "jfriedl@comcast.net",
    role: "PL",
    greywolf: true,
    gender: "M",
    patrol: "Red",
    section: "Cubs",
    trial: false,
    dob: "2012-04-19",
    membertype: "Youth",
    joindate: "2020-11-22",
    scoutid: 1039240,
    investdate: "2021-03-26",
    linked: false,
  },
  {
    preferredname: "Meredith",
    familyname: "Cline",
    parentname: "Dino Cline",
    archived: false,
    contactphone: "0472 560 306",
    contactemail: "sjava@me.com",
    greywolf: false,
    gender: "M",
    patrol: "Red",
    section: "Cubs",
    trial: false,
    dob: "2012-09-03",
    membertype: "Youth",
    joindate: "2022-05-01",
    scoutid: 1747435,
    linked: false,
  },
  {
    preferredname: "Cian",
    familyname: "Tate",
    parentname: "Coy Tate",
    archived: false,
    contactphone: "0474 509 784",
    contactemail: "miyop@optonline.net",
    greywolf: false,
    gender: "M",
    patrol: "Red",
    section: "Cubs",
    trial: false,
    dob: "2012-05-28",
    membertype: "Youth",
    joindate: "2020-07-19",
    scoutid: 1058089,
    investdate: "2021-03-26",
    linked: false,
  },
  {
    preferredname: "Luna",
    familyname: "Cole",
    parentname: "Hosea Cole",
    archived: false,
    contactphone: "0487 076 536",
    contactemail: "mastinfo@sbcglobal.net",
    greywolf: false,
    gender: "M",
    patrol: "Red",
    section: "Cubs",
    trial: false,
    dob: "2013-08-22",
    membertype: "Youth",
    joindate: "2021-11-07",
    scoutid: 1241566,
    investdate: "2022-05-21",
    linked: false,
  },
  {
    preferredname: "Darcy",
    familyname: "Evans",
    parentname: "Robt Evans",
    archived: false,
    contactphone: "0490 902 097",
    contactemail: "jlbaumga@att.net",
    greywolf: false,
    gender: "M",
    patrol: "Red",
    section: "Cubs",
    trial: false,
    dob: "2013-02-10",
    membertype: "Youth",
    joindate: "2022-05-01",
    scoutid: 1723205,
    linked: false,
  },
  {
    preferredname: "Judith",
    familyname: "Duarte",
    parentname: "Rupert Duarte",
    archived: true,
    contactphone: "0491 570 157",
    contactemail: "maradine@verizon.net",
    role: "UL",
    greywolf: true,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2010-10-21",
    membertype: "Youth",
    joindate: "2018-09-09",
    scoutid: 1152114,
    investdate: "2018-10-14",
    linked: false,
    notes: "Transitioned to Scouts end T3 2021",
  },
  {
    preferredname: "Traci",
    familyname: "Stanton",
    parentname: "Elroy Stanton",
    archived: true,
    contactphone: "0423 402 623",
    contactemail: "madanm@yahoo.com",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2010-09-08",
    membertype: "Youth",
    joindate: "2021-04-25",
    scoutid: 1200924,
    investdate: "2021-11-14",
    linked: false,
    notes: "Transitioned to Scouts 21 Jan 2022",
  },
  {
    preferredname: "Caoimhe",
    familyname: "Orr",
    parentname: "Dong Orr",
    archived: true,
    contactphone: "0428 106 502",
    contactemail: "crowemojo@gmail.com",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2010-06-28",
    membertype: "Youth",
    joindate: "2018-01-21",
    scoutid: 1385806,
    investdate: "2018-03-15",
    linked: false,
    notes: "Transitioned to Scouts Nov 2021",
  },
  {
    preferredname: "Hafsa",
    familyname: "Herman",
    parentname: "Emory Herman",
    archived: true,
    contactphone: "0429 703 824",
    contactemail: "aschmitz@yahoo.ca",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2012-12-30",
    membertype: "Youth",
    joindate: "2021-10-31",
    scoutid: 1076990,
    linked: false,
    notes: "Dropped out end T1 2022",
  },
  {
    preferredname: "Mariam",
    familyname: "Henson",
    parentname: "Elsa Henson",
    archived: true,
    contactphone: "0430 723 703",
    contactemail: "leocharre@yahoo.com",
    role: "PL",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2010-04-10",
    membertype: "Youth",
    joindate: "2020-02-02",
    scoutid: 1158716,
    investdate: "2020-04-19",
    linked: false,
    notes: "Dropped out Nov 2022",
  },
  {
    preferredname: "Spencer",
    familyname: "Ortega",
    parentname: "Christa Ortega",
    archived: true,
    contactphone: "0442 821 470",
    contactemail: "peoplesr@outlook.com",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2011-04-23",
    membertype: "Youth",
    joindate: "2021-04-18",
    scoutid: 1930868,
    linked: false,
    notes: "May re-join 2022",
  },
  {
    preferredname: "Sami",
    familyname: "Ochoa",
    parentname: "Derick Ochoa",
    archived: true,
    contactphone: "0443 091 597",
    contactemail: "leslie@mac.com",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2010-12-17",
    membertype: "Youth",
    joindate: "2021-02-07",
    scoutid: 1263171,
    investdate: "2021-03-26",
    linked: false,
    notes: "Dropped out end T1 2022",
  },
  {
    preferredname: "Alisha",
    familyname: "Dodson",
    parentname: "Tamika Dodson",
    archived: true,
    contactphone: "0448 754 862",
    contactemail: "sblack@optonline.net",
    role: "PL",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2010-09-13",
    membertype: "Youth",
    joindate: "2020-08-16",
    scoutid: 1812672,
    investdate: "2021-03-26",
    linked: false,
    notes: "Transitioned to Scouts end T1 2022",
  },
  {
    preferredname: "Katie",
    familyname: "Fisher",
    parentname: "Josef Fisher",
    archived: true,
    contactphone: "0467 283 178",
    contactemail: "lbecchi@icloud.com",
    greywolf: false,
    gender: "F",
    patrol: "TAD",
    section: "Cubs",
    trial: false,
    dob: "2012-09-04",
    membertype: "Youth",
    joindate: "2021-11-14",
    scoutid: 1595288,
    linked: false,
    notes: "Dropped out end T1 2022 - Soccer Clash",
  },
  {
    preferredname: "Robert",
    familyname: "Krueger",
    parentname: "Ava Krueger",
    archived: false,
    contactphone: "0434 127 709",
    contactemail: "parksh@att.net",
    greywolf: false,
    gender: "M",
    patrol: "Yellow",
    section: "Cubs",
    trial: false,
    dob: "2014-03-20",
    membertype: "Youth",
    joindate: "2022-07-31",
    scoutid: 1529039,
    investdate: "2021-11-10",
    linked: true,
  },
  {
    preferredname: "Nelson",
    familyname: "Ibarra",
    legalname: "Honeyshine",
    parentname: "Janis Ibarra",
    archived: false,
    contactphone: "0434 973 702",
    contactemail: "stakasa@yahoo.ca",
    greywolf: false,
    gender: "M",
    patrol: "Yellow",
    section: "Cubs",
    trial: false,
    dob: "2013-08-20",
    membertype: "Youth",
    joindate: "2022-10-09",
    scoutid: 1344207,
    linked: false,
  },
  {
    preferredname: "Euan",
    familyname: "Owen",
    legalname: "Taliesin",
    parentname: "Bert Owen",
    archived: false,
    contactphone: "0450 031 013",
    contactemail: "dmouse@gmail.com",
    greywolf: false,
    gender: "M",
    patrol: "Yellow",
    section: "Cubs",
    trial: false,
    dob: "2012-10-02",
    membertype: "Youth",
    joindate: "2021-04-25",
    scoutid: 1168658,
    linked: false,
  },
  {
    preferredname: "Matthew",
    familyname: "Greene",
    legalname: "Heilyn",
    parentname: "Valentine Greene",
    archived: false,
    contactphone: "0451 208 163",
    contactemail: "ilikered@msn.com",
    greywolf: false,
    gender: "M",
    patrol: "Yellow",
    section: "Cubs",
    trial: false,
    dob: "2013-03-29",
    membertype: "Youth",
    joindate: "2021-04-25",
    scoutid: 1887971,
    linked: false,
  },
  {
    preferredname: "Damon",
    familyname: "Schroeder",
    legalname: "Cáel",
    parentname: "Simon Schroeder",
    archived: false,
    contactphone: "0453 610 139",
    contactemail: "granboul@yahoo.com",
    greywolf: false,
    gender: "M",
    patrol: "Yellow",
    section: "Cubs",
    trial: false,
    dob: "2013-03-14",
    membertype: "Youth",
    joindate: "2021-10-17",
    scoutid: 1722666,
    investdate: "2021-03-17",
    linked: true,
  },
  {
    preferredname: "Krish",
    familyname: "Noble",
    legalname: "Fangchen",
    parentname: "Deirdre Noble",
    archived: false,
    contactphone: "0460 465 087",
    contactemail: "rjones@comcast.net",
    role: "PL",
    greywolf: true,
    gender: "M",
    patrol: "Yellow",
    section: "Cubs",
    trial: false,
    dob: "2012-02-14",
    membertype: "Youth",
    joindate: "2020-02-02",
    scoutid: 1875700,
    investdate: "2020-05-03",
    linked: false,
  },
  {
    preferredname: "Elena",
    familyname: "James",
    parentname: "Cornelius James",
    archived: false,
    contactphone: "0491 680 084",
    contactemail: "bastian@yahoo.com",
    greywolf: false,
    gender: "M",
    patrol: "Yellow",
    section: "Cubs",
    trial: false,
    dob: "2013-04-22",
    membertype: "Youth",
    joindate: "2021-04-18",
    scoutid: 1472506,
    investdate: "2021-11-07",
    linked: false,
  },
  {
    preferredname: "Marvin",
    familyname: "Miles",
    parentname: "Sheree Miles",
    archived: false,
    contactphone: "0410 637 824",
    contactemail: "sassen@verizon.net",
    role: "TCSL",
    greywolf: false,
    gender: "M",
    section: "Cubs",
    trial: false,
    membertype: "Adult",
    scoutid: 1066709,
    linked: false,
  },
  {
    preferredname: "Harrison",
    familyname: "Bird",
    parentname: "Audrey Bird",
    archived: false,
    contactphone: "0419 194 236",
    contactemail: "rande@me.com",
    role: "CSL",
    greywolf: false,
    gender: "M",
    section: "Cubs",
    trial: false,
    membertype: "Adult",
    scoutid: 1474301,
    linked: false,
  },
  {
    preferredname: "Henri",
    familyname: "Wilkins",
    parentname: "Sal Wilkins",
    archived: false,
    contactphone: "0421 952 369",
    contactemail: "dinther@msn.com",
    role: "ACSL",
    greywolf: false,
    gender: "M",
    section: "Cubs",
    trial: false,
    membertype: "Adult",
    scoutid: 1861001,
    linked: false,
  },
  {
    preferredname: "Zeeshan",
    familyname: "Conley",
    parentname: "Clara Conley",
    archived: false,
    contactphone: "0429 189 617",
    contactemail: "scato@live.com",
    role: "AH",
    greywolf: false,
    gender: "M",
    section: "Cubs",
    trial: false,
    membertype: "Adult",
    scoutid: 1258699,
    linked: false,
  },
  {
    preferredname: "Cade",
    familyname: "Chavez",
    parentname: "Jame Chavez",
    archived: false,
    contactphone: "0440 837 973",
    contactemail: "bester@comcast.net",
    role: "ACSL",
    greywolf: false,
    gender: "M",
    section: "Cubs",
    trial: false,
    membertype: "Adult",
    scoutid: 1545637,
    linked: false,
  },
  {
    preferredname: "Keane",
    familyname: "Coffey",
    parentname: "Aubrey Coffey",
    archived: false,
    contactphone: "0468 384 237",
    contactemail: "lcheng@live.com",
    role: "TCSL",
    greywolf: false,
    gender: "M",
    section: "Cubs",
    trial: false,
    membertype: "Adult",
    scoutid: 1544679,
    linked: false,
  },
  {
    preferredname: "Blaine",
    familyname: "Owens",
    parentname: "Javier Owens",
    archived: false,
    contactphone: "0483 584 271",
    contactemail: "lamprecht@verizon.net",
    role: "ACSL",
    greywolf: false,
    gender: "M",
    section: "Cubs",
    trial: false,
    membertype: "Adult",
    scoutid: 1317635,
    linked: false,
  },
];

export default {
  name: "TestView",
  components: {
    StyledButton,
  },
  data: function () {
    return {
      teamMembers: exportedMemberData,
    };
  },
  methods: {
    getElements: function (person) {
      let retVal = [];

      Object.keys(person).forEach(function (prop) {
        retVal.push(person[prop]);
      });
      return retVal;
    },
    onButtonClicked: function () {
      this.teamMembers.forEach(function (person) {
        writeMember(person);
      });
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
