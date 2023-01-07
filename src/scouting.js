export { oasStatements, challengeTypes, activityTypes };

const activityTypes = [
  "Regular Meet",
  "Camp",
  "Hike",
  "Overnight Hike",
  "Grey Wolf Hike",
  "Water Skills",
  "Canoeing",
  "Flying Day",
];

const challengeTypes = ["Community", "Outdoor", "Creative", "Personal Growth"];

const oasStatements = [
  {
    area: "Bushwalking",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can help pack a backpack for a day walk.",
          "I can dress myself for a day walk.",
          "I can list what food to bring on a day bushwalk.",
          "I know why it is important to stick to trails when outdoors.",
          "I know why to stop when I get lost in the bush.",
          "I can explain the buddy system.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can put together a small personal first aid kit for our bushwalk.",
          "I can identify the four main cardinal points of the compass.",
          "I can identify the main parts of the compass.",
          "I have attended at least one bushwalk of at least one hour's duration at this stage.",
          "I can behave safely while bushwalking.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed or learnt from going on a bushwalk.",
        ],
      },
    ],
  },
  {
    area: "Bushwalking",
    stage: 2,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can explain what clothing I should wear whilst bushwalking.",
          "I have explained what impact I can have on local vegetation when bushwalking.",
          "I have discussed the appropriate action I should take in the case of an accident.",
          "I can discuss what safety precautions I should take before going out for a hike.",
          "I know how and when to contact the emergency services in an emergency.",
          "I can draw or list all of the essential equipment to bring on a bushwalk.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can use a compass to find basic directions.",
          "I can protect myself when exposed to the sun while outdoors.",
          "I have attended at least two short bushwalks at this stage.",
          "I can show where and when I am allowed to go, before I start bushwalking.",
          "I have bushwalked a total distance of at least 10km.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I have talked about what I enjoyed, learnt, or improved upon from at least 2 walks.",
          "What I would do differently on a future walk to enjoy it more, to be safer, to learn.",
          "I have reviewed my list or picture of essential equipment with my Patrol & Leaders.",
        ],
      },
    ],
  },
  {
    area: "Bushwalking",
    stage: 3,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can help a Stage 1 Scout to pack their backpack for a bushwalk.",
          "I know how and where to get the latest weather forecast for where I'm bushwalking.",
          "I can help plan a balanced menu for bushwalking.",
          "I can list places where I can and cannot bushwalk.",
          "I can talk about different ways of keeping a group together while bushwalking.",
          "I have considered bushwalking etiquette when planning for a journey.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can be responsible for my safety and aware of my surroundings.",
          "I have run a small navigational activity for my fellow Scouts with Leader support.",
          "I can use different types of maps to help me throughout different activities.",
          "I have attended a day bushwalk at this stage of at least 6 hours duration.",
          "I have attended at least two bushwalking activities at this stage.",
          "I know how to avoid becoming lost, and I know what to do if I get lost.",
          "I know how to treat cuts and minor bleeding.",
          "I can teach the importance of the buddy system and other ways to stay safe.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can identify the features of a topographical map.",
          "I have given a presentation to my Patrol or my Council about one bushwalk.",
          "I have discussed the top five things I have learnt in Bushwalking Stages 1, 2 and 3.",
        ],
      },
    ],
  },
  {
    area: "Bushcraft",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I know why it is important to stick to trails when outdoors.",
          "I can explain the buddy system.",
          "I know to stop when I get lost on activities.",
          "I know my address and location in an emergency.",
          "I know three reasons for having a shelter when sleeping outdoors.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can strike a match.",
          "I can collect sticks for preparing a campfire.",
          "I can be safe around a campfire.",
          "I have participated in a game that required basic navigational skills.",
          "I can hang a clothesline at camp with a clove hitch or other knot.",
          "I know how to correctly pack ropes away.",
          "I know what is in a dilly bag / mess kit and can keep it clean at camp.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed, learnt, or improved by playing a navigational game.",
        ],
      },
    ],
  },
  {
    area: "Bushcraft",
    stage: 2,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I have explained the impact I can have on vegetation while participating in activities.",
          "I have discussed the appropriate action I should take in the case of an accident.",
          "I can discuss what safety precautions I should take before going out in the bush.",
          "I know how and when to contact the emergency services in an emergency.",
          "I can state how many degrees there are on a compass / degrees of cardinal points.",
          "I know the rules for hygiene at camp.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can protect myself when exposed to the sun while outdoors.",
          "I can cook a snack in a fire.",
          "I know how much water I should carry hiking or taking part in an outdoor activity.",
          "I can demonstrate a correct way to build a safe fireplace in the bush.",
          "I can find the four cardinal directions (north, south, east, west) without a compass.",
          "I can demonstrate three knots and apply them in an activity.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I have talked about what I enjoyed, learnt, or improved at least 2  bushcraft activities.",
          "I can suggest what I would do differently for a future bushcraft activity.",
        ],
      },
    ],
  },
  {
    area: "Bushcraft",
    stage: 3,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can explain the importance of wearing the right clothing while outdoors.",
          "I know about native flora and fauna and the risks or benefits they pose.",
          "I know how and where to get the latest weather forecast.",
          "I know the first aid treatment for burns from hot water, grease and food.",
          "I know how to treat cuts and minor bleeding.",
          "I know what DRSABCD stands for and how to apply it in first aid situations.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can cook a meal using a camp stove.",
          "Demonstrate how you would deal with five emergency situations.",
          "I can identify the Southern Cross in the night's sky and then find South.",
          "I can identify three other constellations in the night sky.",
          "I have set up and followed a simple compass trail using a local map with other Scouts.",
          "I can teach the importance of the buddy system to a Scout working on Stage 1.",
          "I have put together a personal outdoor survival kit.",
          "I can make a personal shelter out of plastic sheeting, rope & other things I've found.",
          "I can demonstrate 5 knots in an activity or camp setting (3 can be my Stage 2 knots).",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about how my Patrol worked together following a compass trail.",
          "I have identified improvements I can make to my shelter next time I try building one.",
        ],
      },
    ],
  },
  {
    area: "Camping",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can explain the buddy system.",
          "I know the boundaries of where I may go each time I go out camping.",
          "I know to stop when I get lost while camping.",
          "I know the basic elements that you need to make a fire.",
          "I know that I should follow directions from the leader of this activity.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can help pack a bag for camp.",
          "I can strike a match.",
          "I can help prepare food for cooking at camp.",
          "I have spent two nights at camps and/or Scout sleepovers.",
          "I know why it is important to set up camp in an existing campsite.",
          "I can set out my sleeping area at camp.",
          "I can care for my basic personal gear on an overnight camp.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed, learnt, or improved upon by participating in a camp.",
        ],
      },
    ],
  },
  {
    area: "Camping",
    stage: 2,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can explain what clothing I should wear whilst camping.",
          "I have explained what impact I can have on local vegetation when camping.",
          "I have discussed the appropriate action I should take in the case of an accident.",
          "I can discuss safety precautions you should take before going camping outdoors.",
          "I know about proper hygiene practices at camp.",
          "I know how and when to contact the emergency services in an emergency.",
          "I can draw and label a picture showing the essential equipment to bring on a camp.",
          "I know the benefits and risks associated with fire.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can demonstrate basic safe food handling and the importance of hygiene at camp.",
          "I can protect myself when exposed to the sun while outdoors.",
          "I can behave safely in tents and around fires at camp.",
          "I can demonstrate and explain why sleeping bags need to be aired out.",
          "I have spent 2 nights on camp in a tent at this Stage.",
          "I can help set up a tent and identify the main parts of a tent.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I have talked about what I enjoyed, learnt, and improved upon from at 2+ camps.",
          "I can suggest what I would do differently on a future camp.",
        ],
      },
    ],
  },
  {
    area: "Camping",
    stage: 3,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can pack my own bag for camp.",
          "I know how and where to get the latest weather forecast for the area I'm camping in.",
          "I can help plan a balanced meal for camp.",
          "I know the benefits of using gas to cook and can talk about what risks to watch out for",
          "I can list group equipment required for camp.",
          "I know how to maintain personal hygiene while camping.",
          "I can assemble a personal first aid kit for a camp.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I know what DRSABCD stands for and how to using it in first aid situations.",
          "I can demonstrate keeping myself safe from natural and man-made things at camp.",
          "I can help build a campfire and collect materials to do so.",
          "I can cook a meal on a campfire with assistance.",
          "I have used a gas cooker to help cook a camp meal.",
          "I can help run an activity at a camp.",
          "I can set up a tent, without help from a Leader.",
          "I have spent five nights on camp in a tent.",
          "I know how to treat cuts and minor bleeding.",
          "I can teach the importance of the buddy system to a Stage 1 Scout.",
          "I can demonstrate how to store food at camp.",
          "I have learnt 3 knots that can help me during a standing camp.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I have thought about the ways I can improve the activity that I helped run.",
          "I have thought about the camping I use and how improvements can be made.",
        ],
      },
    ],
  },
  {
    area: "Cycling",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I have discussed what the purpose of a helmet is in a cycling environment.",
          "I know how to wear and adjust a helmet.",
          "I know the limits of where I may go each time I go out riding.",
          "I know why to stop when I get lost cycling.",
          "I understand that I should follow directions from a leader.",
          "I know why I should care for my bike and helmet after use.",
          "I know the basic road rules relating to riding a bike.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can show the main parts of a bike (ABC check).",
          "I know about the 'Buddy' system in relation to cycling.",
          "I have taken part in a short cycling trip.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed by participating in a bike ride.",
        ],
      },
    ],
  },
  {
    area: "Cycling",
    stage: 2,
    requirements: [
      {
        type: "Plan",
        statements: [
          "Plan	I can explain what clothing I should wear whilst riding.",
          "I can put on my own helmet properly.",
          "Before I start riding, I can show where and when I am allowed to go.",
          "I have explained what impact I can have on local vegetation when riding.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can pump up my tyres.",
          "I can protect myself when exposed to the weather while outdoors.",
          "I have made a poster demonstrating the safety rules for riding.",
          "I have taken part in a skills activity involving cones, stops, balance, control etc.",
          "I can ride my bike in a straight line.",
          "I have taken part in an at least two bike rides.",
          "I have discussed the appropriate action I should take in the case of an accident.",
          "I know how and when to contact the emergency services in an emergency.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I have talked about what I enjoyed, learnt, or improved upon from at least 2 bike rides.",
          "I can suggest what could be done differently on a future bike riding journey.",
        ],
      },
    ],
  },
  {
    area: "Vertical",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can dress myself for a rock activity.",
          "I know not to break or damage trees when climbing them.",
          "I know what to do if I get lost at an activity.",
          "I can explain the buddy system.",
          "I have discussed what the purpose of a helmet is.",
          "I know the safety rules for climbing on rocks, trees, fences and man-made structures.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I have been to a rock playground and can play safely and cooperatively with others.",
          "I can take care of my personal equipment for the duration of a rock activity.",
          "I know how to wear and adjust a helmet.",
          "I know how and when to contact the emergency services in an emergency.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed, learnt, or improved upon in a rock-based activity.",
        ],
      },
    ],
  },
  {
    area: "Boating",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can dress myself for a boating trip.",
          "I can explain the buddy system.",
          "I know what a PFD is and why I have to wear one when on a boat.",
          "I know how to stay with my buddy and the boat if it tips over.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can take care of my equipment for the duration of a boating trip.",
          "I can tie a reef knot.",
          "I can swim 10 meters with a PFD.",
          "I can explain the risks of exposure to weather.",
          "I can get in and out of my watercraft safely.",
          "I have taken part in a short boating adventure of at least one hour.",
          "I can show where the bow and stern are on a boat.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed by participating in a boating trip.",
        ],
      },
    ],
  },
  {
    area: "Aquatics",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can explain what a Personal Flotation Device (PFD) is for.",
          "I can explain the buddy system.",
          "I know how to stay safe while playing around water.",
          "I know how to maintain my position when lost on the water.",
          "I know the importance of adult supervision when swimming and being around water.",
          "I can float for 15 seconds and glide for 5m on my front and back without assistance.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can swim 10 meters (any stroke) without assistance.",
          "I can put my face in the water and blow bubbles.",
          "I can get an object off the bottom of a pool in chest-deep water.",
          "I know three different animals that live in the ocean.",
          "I can practise signalling for help in the water.",
          "I have tried two swimming strokes.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed by participating in a swimming trip.",
        ],
      },
    ],
  },
  {
    area: "Aquatics",
    stage: 2,
    requirements: [
      {
        type: "Plan",
        statements: [
          "Before I go swimming, I can point out where I'm allowed to go.",
          "I know how and when to contact the emergency services in an emergency.",
          "I can discuss what safety precautions you should take before going swimming.",
          "I can pack a bag with all of the clothes & equipment I will need for a swimming trip.",
          "I can discuss rescue techniques for someone that's fallen in water & can't swim.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can put on a PFD by myself.",
          "I can swim with my head in the water.",
          "I can protect myself when exposed to the sun and other elements while outdoors.",
          "I can swim 25 metres (any stroke) without assistance.",
          "I can tread water for 30 seconds.",
          "I have taken part in a short snorkelling activity at this stage.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I have talked about what I enjoyed, learnt, or improved from at 2+ swimming trips.",
          "I can suggest what could be done differently on a future swimming activity.",
        ],
      },
    ],
  },
  {
    area: "Paddling",
    stage: 1,
    requirements: [
      {
        type: "Plan",
        statements: [
          "I can explain what a PFD is for.",
          "I can dress myself for a paddling trip.",
          "I can explain the buddy system.",
        ],
      },
      {
        type: "Do",
        statements: [
          "I can swim 10 meters with a PFD.",
          "I can float with my PFD for 2 minutes.",
          "I can explain the basic risks of cold water.",
          "I know what a forward and backward stroke are.",
          "I can demonstrate a forward and backward stroke.",
          "I have taken part in a short paddling adventure of at least one hour.",
          "I can take care of my equipment for the duration of a paddling trip.",
          "I can show where the bow and stern are in a canoe or kayak.",
        ],
      },
      {
        type: "Review",
        statements: [
          "I can talk about what I enjoyed by participating in a paddling trip.",
        ],
      },
    ],
  },
];
