(async function() {
  async function sleep(ms) {
    return new Promise(function(res, _) {
      setTimeout(function() { res(); }, ms);
    });
  }

  async function waitFor(func, ms = 500) {
    while (!func()) {
      await sleep(ms);
    }
  }

  function rowCount() {
    var table = document.querySelector("table[id*='main-table']");
    return table ? table.querySelectorAll("tr").length : 0;
  }

  function selectPlayers() {
    return [...document.querySelectorAll("table[id*='main-table'] .main-table-name")].map(function(n) {
      return n.textContent.trim();
    });
  }

  function isRootBuffTableShowing() {
    return [...document.querySelectorAll(".dialog-title")].find(e => [
      "Major Group Cooldown", "Major Individual Cooldown", "Damage Buffs", "Healing Buffs",
      "Movement Buffs", "Raid Buffs", "Stances, Forms, and Seals", "Toy Buffs", "Uncategorized Buffs"
    ].includes(e.textContent.trim()));
  }

  function isRootBuffTableHidden() {
    return !isRootBuffTableShowing();
  }
  
  function isRootBuffTableFilled() {
    return isRootBuffTableShowing() && rowCount() > 0;
  }

  async function readBuffData(buff) {
    return new Promise(async function(res, _) {
      var buffElement = document.querySelector("a[id*='ability-" + buff.id + "']");
      if (buffElement) {
        buffElement.click();
        await waitFor(isRootBuffTableHidden);
        var players = selectPlayers();
        document.querySelector("#filter-ability-selection-dropdown .filter-clear-box").click();
        await waitFor(isRootBuffTableFilled);
        players.sort();
        res(players);
      } else {
        res([]);
      }
    });
  }

  var buffs = [
    { name: "Rallying Cry", id: 355363 },
    { name: "Spirit of Zandalar", id: 355365 },
    { name: "Songflower Serenade", id: 15366 },
    { name: "Mol'dar's Moxie", id: 22818 },
    { name: "Slip'kik's Savvy", id: 22820 },
    { name: "Fengus' Ferocity", id: 22817 },
    { name: "Warchief's Blessing", id: 355366 },
    { name: "Rage of the Ages", id: 10667 },
    { name: "Strike of the Scorpok", id: 10669 },
    { name: "Spirit of Boar", id: 10668 },
    { name: "Infallible Mind", id: 10690 },
    { name: "Spiritual Domination", id: 10691 },
    { name: "Sayge's Dark Fortune of Damage", id: 23768 },
    { name: "Sayge's Dark Fortune of Intelligence", id: 23766 },
    { name: "Sayge's Dark Fortune of Spirit", id: 23738 },
    { name: "Might of Stormwind", id: 460940 }
  ];

  var buffData = [];

  for (var buff of buffs) {
    var playersWithBuff = await readBuffData(buff);
    buffData.push({ buff: buff.name, players: playersWithBuff });
  }

  var buffsPerPlayer = {};

  buffData.forEach(function(data) {
    data.players.forEach(function(player) {
      if (!buffsPerPlayer[player]) {
        buffsPerPlayer[player] = [];
      }
      buffsPerPlayer[player].push(data.buff);
    });
  });

  var playerKeys = Object.keys(buffsPerPlayer);
  playerKeys.sort(function(a, b) {
    return buffsPerPlayer[b].length - buffsPerPlayer[a].length;
  });

  var win = window.open("", "_blank");
  var pStyle = "margin-top: 2px; margin-bottom: 2px;";
  var checkboxStyle = "accent-color: #32afa5;";

  function ptag(msg) {
    return '<p style="' + pStyle + '">' + msg + '</p>';
  }

  playerKeys.forEach(function(player) {
    var buffCount = buffsPerPlayer[player].length;
    var dkp = buffCount * 2; /* 2 dkp per WB */
    var checkbox = '<input type="checkbox" style="' + checkboxStyle + '">';
    var content = [checkbox, player, "(" + buffCount + " buffs, " + dkp + " DKP):", buffsPerPlayer[player].join(', ')].join(' ');
    win.document.write(ptag(content));
  });

  win.document.write("<p>===========================================</p>");

  win.document.write(ptag("Players with buffs: " + playerKeys.length));
  buffData.forEach(function(data) {
    win.document.write(ptag([data.buff, data.players.length, "players"].join(" ")));
  });

  win.document.body.style.backgroundColor = '#121212';
  win.document.body.style.color = '#32afa5';
})();