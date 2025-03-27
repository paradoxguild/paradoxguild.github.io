(async () => {
  var RPB_ROLES = [
    {
      name: "warrior",
      abilities: [
        { name: "Battle Shout" },
        { name: "Berserker Stance" },
        { name: "Bloodthirst" },
        { name: "Mortal Strike" },
        { name: "Sweeping Strikes" },
        { name: "Charge" },
        { name: "Defensive Stance" },
        { name: "Demoralizing Shout" },
        { name: "Disarm" },
        { name: "Execute" },
        { name: "Hamstring" },
        { name: "Heroic Strike" },
        { name: "Intercept" },
        { name: "Intimidating Shout" },
        { name: "Mocking Blow" },
        { name: "Overpower" },
        { name: "Pummel" },
        { name: "Revenge" },
        { name: "Shield Bash" },
        { name: "Shield Block" },
        { name: "Shield Slam" },
        { name: "Slam" },
        { name: "Sunder Armor" },
        { name: "Taunt" },
        { name: "Thunderclap" },
        { name: "Melee", viewArgs: { options: 66 } },
        { name: "Cleave" },
        { name: "Whirlwind" },
        { name: "Berserker Rage" },
        { name: "Challenging Shout" },
        { name: "Death Wish" },
        { name: "Last Stand" },
        { name: "Recklessness" },
        { name: "Shield Wall" },
      ],
    },
    {
      name: "rogue",
      abilities: [
        { name: "Ambush" },
        { name: "Backstab" },
        { name: "Cheap Shot" },
        { name: "Disarm Trap" },
        { name: "Distract" },
        { name: "Eviscerate" },
        { name: "Expose Armor" },
        { name: "Feint" },
        { name: "Garrote" },
        { name: "Gouge" },
        { name: "Hemmorrhage" },
        { name: "Kick" },
        { name: "Kidney Shot" },
        { name: "Rupture" },
        { name: "Sinister Strike" },
        { name: "Slice and Dice" },
        { name: "Melee", viewArgs: { options: 66 } },
        { name: "Blade Flurry" },
        { name: "Adrenaline Rush" },
        { name: "Evasion" },
        { name: "Vanish" },
      ],
    },
    {
      name: "Hunter",
      abilities: [
        { name: "Aimed Shot" },
        { name: "Arcane Shot" },
        { name: "Concussive Shot" },
        { name: "Distracting Shot" },
        { name: "Growl" },
        { name: "Mongoose Bite" },
        { name: "Raptor Strike" },
        { name: "Scorpid Sting" },
        { name: "Tranquilizing Shot" },
        { name: "Viper Sting" },
        { name: "Wing Clip" },
        { name: "Wyvern Sting" },
        { name: "Aspect of the Beast" },
        { name: "Aspect of the Cheetah" },
        { name: "Aspect of the Hawk" },
        { name: "Aspect of the Monkey" },
        { name: "Aspect of the Pack" },
        { name: "Aspect of the Wild" },
        { name: "Disengage" },
        { name: "Dismiss Pet" },
        { name: "Eagle Eye" },
        { name: "Eyes of the Beast" },
        { name: "Feign Death" },
        { name: "Flare" },
        { name: "Hunter's Mark" },
        { name: "Mend Pet" },
        { name: "Revive Pet" },
        { name: "Trueshot Aura" },
        { name: "Auto Shot" },
        { name: "Melee", viewArgs: { options: 66 } },
        { name: "Multi-Shot" },
        { name: "Volley" },
        { name: "Explosive Trap" },
        { name: "Freezing Trap" },
        { name: "Frost Trap" },
        { name: "Immolation Trap" },
        { name: "Bestial Wrath" },
        { name: "Deterrence" },
        { name: "Rapid Fire" },
        { name: "Readiness" },
      ],
    },
    {
      name: "Druid",
      abilities: [
        { name: "Faerie Fire" },
        { name: "Faerie Fire (Feral)" },
        { name: "Entangling Roots" },
        { name: "Insect Swarm" },
        { name: "Moonfire" },
        { name: "Starfire" },
        { name: "Thorns" },
        { name: "Wrath" },
        { name: "Hibernate" },
        { name: "Abolish Poison" },
        { name: "Cure Poison" },
        { name: "Remove Curse" },
        { name: "Gift of the Wild" },
        { name: "Mark of the Wild" },
        { name: "Healing Touch (Rank 1)", id: 5185 },
        { name: "Healing Touch (Rank 2)", id: 5186 },
        { name: "Healing Touch (Rank 3)", id: 5187 },
        { name: "Healing Touch (Rank 4)", id: 5188 },
        { name: "Healing Touch (Rank 5)", id: 5189 },
        { name: "Healing Touch (Rank 6)", id: 6778 },
        { name: "Healing Touch (Rank 7)", id: 8903 },
        { name: "Healing Touch (Rank 8)", id: 9758 },
        { name: "Healing Touch (Rank 9)", id: 9888 },
        { name: "Healing Touch (Rank 10)", id: 9889 },
        { name: "Healing Touch (Rank 11)", id: 25297 },
        { name: "Regrowth (Rank 1)", id: 8936 },
        { name: "Regrowth (Rank 2)", id: 8938 },
        { name: "Regrowth (Rank 3)", id: 8939 },
        { name: "Regrowth (Rank 4)", id: 8940 },
        { name: "Regrowth (Rank 5)", id: 8941 },
        { name: "Regrowth (Rank 6)", id: 9750 },
        { name: "Regrowth (Rank 7)", id: 9856 },
        { name: "Regrowth (Rank 8)", id: 9857 },
        { name: "Regrowth (Rank 9)", id: 9858 },
        { name: "Rejuvenation (Rank 1)", id: 774 },
        { name: "Rejuvenation (Rank 2)", id: 1058 },
        { name: "Rejuvenation (Rank 3)", id: 1430 },
        { name: "Rejuvenation (Rank 4)", id: 2090 },
        { name: "Rejuvenation (Rank 5)", id: 2091 },
        { name: "Rejuvenation (Rank 6)", id: 3627 },
        { name: "Rejuvenation (Rank 7)", id: 8910 },
        { name: "Rejuvenation (Rank 8)", id: 9839 },
        { name: "Rejuvenation (Rank 9)", id: 9840 },
        { name: "Rejuvenation (Rank 10)", id: 9841 },
        { name: "Rejuvenation (Rank 11)", id: 25299 },
        { name: "Swiftmend" },
        { name: "Melee", viewArgs: { options: 66 } },
        { name: "Bear Form" },
        { name: "Cat Form" },
        { name: "Dire Bear Form" },
        { name: "Bash" },
        { name: "Claw" },
        { name: "Cower" },
        { name: "Demoralizing Roar" },
        { name: "Enrage" },
        { name: "Ferocious Bite" },
        { name: "Growl" },
        { name: "Maul" },
        { name: "Pounce" },
        { name: "Prowl" },
        { name: "Rake" },
        { name: "Ravage" },
        { name: "Rip" },
        { name: "Shred" },
        { name: "Swipe" },
        { name: "Tiger's Fury" },
        { name: "Hurricane" },
        { name: "Challenging Roar" },
        { name: "Dash" },
        { name: "Frenzied Regeneration" },
        { name: "Innervate" },
        { name: "Nature's Swiftness" },
        { name: "Rebirth" },
        { name: "Tranquility" },
      ],
    },
    {
      name: "priest",
      abilities: [
        { name: "Mana Burn" },
        { name: "Mind Blast" },
        { name: "Mind Flay" },
        { name: "Shadow Word: Pain" },
        { name: "Vampiric Embrace" },
        { name: "Holy Fire" },
        { name: "Smite" },
        { name: "Starshards" },
        { name: "Shoot (wand)" },
        { name: "Melee", viewArgs: { options: 66 } },
        { name: "Abolish Disease" },
        { name: "Cure Disease" },
        { name: "Dispel Magic" },
        { name: "Divine Spirit" },
        { name: "Prayer of Spirit" },
        { name: "Power Word: Fortitude" },
        { name: "Prayer of Fortitude" },
        { name: "Shadow Protection" },
        { name: "Prayer of Shadow Protection" },
        { name: "Inner Fire" },
        { name: "Fade" },
        { name: "Mind Control" },
        { name: "Levitate" },
        { name: "Psychic Scream" },
        { name: "Shackle Undead" },
        { name: "Flash Heal (Rank 1)", id: 2061 },
        { name: "Flash Heal (Rank 2)", id: 9472 },
        { name: "Flash Heal (Rank 3)", id: 9473 },
        { name: "Flash Heal (Rank 4)", id: 9474 },
        { name: "Flash Heal (Rank 5)", id: 10915 },
        { name: "Flash Heal (Rank 6)", id: 10916 },
        { name: "Flash Heal (Rank 7)", id: 10917 },
        { name: "Greater Heal (Rank 1)", id: 2060 },
        { name: "Greater Heal (Rank 2)", id: 10963 },
        { name: "Greater Heal (Rank 3)", id: 10964 },
        { name: "Greater Heal (Rank 4)", id: 10965 },
        { name: "Greater Heal (Rank 5)", id: 25314 },
        { name: "Heal (Rank 1)", id: 2054 },
        { name: "Heal (Rank 2)", id: 2055 },
        { name: "Heal (Rank 3)", id: 6063 },
        { name: "Heal (Rank 4)", id: 6064 },
        { name: "Lesser Heal" },
        { name: "Power Word: Shield" },
        { name: "Renew (Rank 1)", id: 139 },
        { name: "Renew (Rank 2)", id: 6074 },
        { name: "Renew (Rank 3)", id: 6075 },
        { name: "Renew (Rank 4)", id: 6076 },
        { name: "Renew (Rank 5)", id: 6077 },
        { name: "Renew (Rank 6)", id: 6078 },
        { name: "Renew (Rank 7)", id: 10927 },
        { name: "Renew (Rank 8)", id: 10928 },
        { name: "Renew (Rank 9)", id: 10929 },
        { name: "Renew (Rank 10)", id: 25315 },
        { name: "Holy Nova (Rank 1)", id: 15237 },
        { name: "Holy Nova (Rank 2)", id: 15430 },
        { name: "Holy Nova (Rank 3)", id: 15431 },
        { name: "Holy Nova (Rank 4)", id: 27799 },
        { name: "Holy Nova (Rank 5)", id: 27800 },
        { name: "Holy Nova (Rank 6)", id: 27801 },
        { name: "Prayer of Healing (Rank 1)", id: 596 },
        { name: "Prayer of Healing (Rank 2)", id: 996 },
        { name: "Prayer of Healing (Rank 3)", id: 10960 },
        { name: "Prayer of Healing (Rank 4)", id: 10961 },
        { name: "Prayer of Healing (Rank 5)", id: 25316 },
        { name: "Desperate Prayer" },
        { name: "Devouring Plague" },
        { name: "Inner Focus" },
        { name: "Power Infusion" },
      ],
    },
  ];

  var sleep = async (ms) => {
    return new Promise(function (res, _) {
      setTimeout(function () {
        res();
      }, ms);
    });
  };

  var waitFor = async (func, ms = 500) => {
    while (!func()) {
      await sleep(ms);
    }
  };

  var setup = () => {
    if (
      !window._global ||
      !window._global.changeView ||
      !window._global.report_id
    ) {
      alert("RPB can only be ran on a WarcraftLogs Report");
      return false;
    }

    return { reportId: window._global.report_id };
  };

  var runExpression = async (expression, viewArgs = {}) => {
    const wrapper = document.querySelector("#main-table-0_wrapper");

    if (wrapper) {
      wrapper.remove();
    }

    const viewParams = Object.assign(
      {},
      {
        type: "casts",
        boss: -3,
        difficulty: 0,
        pins: "2$Separate$#244F4B$expression$" + expression,
      },
      viewArgs
    );

    window._global.changeView(viewParams);
    await waitFor(() => {
      return document.querySelectorAll("#main-table-0_wrapper").length;
    }, 50);

    return (
      document
        .querySelector("#main-table-0_wrapper > table > tbody > tr")
        .textContent.trim() !== "No data available in table"
    );
  };

  var createRPBContainer = () => {
    const container = document.createElement("div");
    container.id = "paradox-rpb-container";
    container.style.position = "fixed";
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.background = "#202020";
    container.style.zIndex = 500000000;
    container.style.overflow = "auto";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";

    var heading = document.createElement("h1");
    heading.classList.add("rpb-heading");
    heading.innerHTML = "RPB - Role Performance Breakdown";
    heading.style.textTransform = "capitalize";
    heading.style.textAlign = "center";

    var dropdown = document.createElement("select");
    dropdown.id = "rpb-role-dropdown";
    dropdown.style.width = "300px";
    dropdown.style.padding = "8px";

    for (let role of RPB_ROLES) {
      let option = document.createElement("option");
      option.value = role.name;
      option.innerHTML = role.name.at(0).toUpperCase() + role.name.substring(1);
      if (role.name === RPB_ROLES[0].name) {
        option.selected = true;
      }
      dropdown.appendChild(option);
    }

    var button = document.createElement("button");
    button.id = "rpb-run-button";
    button.innerHTML = "Run RPB";
    button.style.width = "300px";
    button.style.padding = "8px";
    button.style.marginTop = "8px";
    button.onclick = () => {
      button.disabled = true;
      runRPB(dropdown.value);
      button.disabled = false;
    };

    container.appendChild(heading);
    container.appendChild(dropdown);
    container.appendChild(button);

    return container;
  };

  var createTableContainer = () => {
    const container = document.createElement("div");
    container.classList.add("rpb-table-container");

    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.justifyContent = "center";
    container.style.gap = "30px";
    container.style.padding = "15px";

    return container;
  };

  var createLoader = () => {
    const el = document.createElement("div");
    el.classList.add("rpb-loading-icon");
    el.style.border = "16px solid rgb(243, 243, 243)";
    el.style.borderRadius = "50%";
    el.style.borderTop = "16px solid rgb(221, 46, 46)";
    el.style.width = "100px";
    el.style.height = "100px";
    el.style.marginTop = "15px";
    el.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 2000,
        iterations: Infinity,
      }
    );
    return el;
  };

  var createStatus = () => {
    const el = document.createElement("p");
    el.style.fontSize = "24px";
    el.style.color = "rgb(243, 243, 243)";
    el.style.textAlign = "center";
    el.style.width = "100%";
    return el;
  };

  var cloneActiveTable = (headerText, parentEl) => {
    var tableHtml = document
      .querySelector("#main-table-0_wrapper")
      .outerHTML.replace('id="main-table-0_wrapper"', "")
      .replace('id="main-table-0"', "");
    var container = document.createElement("div");
    var heading = document.createElement("h2");
    var tableWrapper = document.createElement("div");

    container.classList.add("rpb-table");
    container.style.maxWidth = "500px";

    heading.classList.add("rpb-h2");
    heading.innerHTML = headerText;
    heading.style.textAlign = "center";

    tableWrapper.innerHTML = tableHtml;
    tableWrapper.classList.add("rpb-wrapper");

    const buttons = tableWrapper.querySelector(".dt-buttons");
    if (buttons) {
      buttons.remove();
    }
    tableWrapper.querySelectorAll("a").forEach((a) => (a.target = "_blank"));

    container.appendChild(heading);
    container.appendChild(tableWrapper);
    parentEl.appendChild(container);
  };

  var runRPB = async (role) => {
    const roleObj = RPB_ROLES.find((r) => r.name === role);
    const abilities = roleObj.abilities;
    const status = createStatus();
    const loader = createLoader();

    const tableContainer = document.querySelector(
      "#paradox-rpb-container .rpb-table-container"
    );
    tableContainer.innerHTML = "";
    tableContainer.appendChild(status);
    tableContainer.appendChild(loader);

    const holder = document.createElement("div");

    for (let ability of abilities) {
      status.innerHTML = "Collecting casts: " + ability.name;

      const prop = ability.id ? "id" : "name";
      const value = ability.id ? ability.id : "'" + ability.name + "'";
      if (
        await runExpression(
          "source.class = '" +
            role +
            "' AND ability." +
            prop +
            " IN (" +
            value +
            ")",
          ability.viewArgs || {}
        )
      ) {
        cloneActiveTable(ability.name, holder);
      }
    }

    tableContainer.innerHTML = holder.innerHTML;
  };

  var showRPB = async () => {
    window._global.changeView({});

    const existingContainer = document.querySelector("#paradox-rpb-container");
    if (existingContainer) {
      existingContainer.style.display =
        existingContainer.style.display === "flex" ? "none" : "flex";
      return;
    }
    const container = createRPBContainer();
    const tableContainer = createTableContainer();

    container.appendChild(tableContainer);
    document.body.appendChild(container);
  };

  const data = setup();
  if (data) {
    showRPB();
  }
})();
