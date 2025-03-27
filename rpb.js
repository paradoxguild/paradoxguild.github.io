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
    el.style.marginTop = "35px";
    el.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 2000,
        iterations: Infinity,
      }
    );
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
    const loader = createLoader();

    const tableContainer = document.querySelector(
      "#paradox-rpb-container .rpb-table-container"
    );
    tableContainer.innerHTML = "";
    tableContainer.appendChild(loader);

    const holder = document.createElement("div");

    for (let ability of abilities) {
      if (
        await runExpression(
          "source.class = '" +
            role +
            "' AND ability.name IN ('" +
            ability.name +
            "')",
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
