(async function() {
  // Event-based variables
  const checksumChangedEvent = new Event("checksumChanged");
  let checksum = -1;
  let checksumQueue = [];

  const downrankedIds = [11551, 11567, 11601];

  // Output variables
  const report = {
    players: []
  };

  // Utility functions
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

  function cleanString(str) {
    return str.replace(/,/g, '').replace(/'/g, "").trim();
  }

  // Script-specific functions
  function getPageChecksum() {
    let eligibleQueries = ['.summary-table', '.report-overview-boss-box'];
    let sum = 0;
    for (let eligibleQuery of eligibleQueries) {
      document.querySelectorAll(eligibleQuery).forEach(element => {
        sum += element.outerHTML.length;
      });
    }
    return sum;
  }

  function useParameters(parameterMap, callback) {
    let url ='https://' + window.location.host + window.location.pathname + '#';
    if (parameterMap != null) {
      var params = new URLSearchParams();
      params.set('difficulty', '0');
      params.set('boss', '-3');
      Object.keys(parameterMap).forEach(k => params.set(k, parameterMap[k]));
      url += params.toString();
    }
    console.debug('Rerouting:', url);
    window.location = url;
    return new Promise(function (resolve, _) {
      checksumQueue.push(function() {
        callback();
        resolve();
      });
    });
  }

  // Event-based listeners
  function onHashChange() {
    let currentChecksum = 0;
    waitFor(function() {
      currentChecksum = getPageChecksum();
      if (currentChecksum > 0 && currentChecksum != checksum) {
        checksum = currentChecksum;
        window.dispatchEvent(checksumChangedEvent);
      }
    }, 500);
  }

  function onChecksumChange() {
    console.debug('checksum:', checksum);
    for (let checksumTask of checksumQueue) {
      checksumTask();
    }
    checksumQueue = [];
  }

  // Set up listeners
  window.removeEventListener('hashchange', onHashChange);
  window.addEventListener('hashchange', onHashChange);
  window.removeEventListener('checksumChanged', onChecksumChange);
  window.addEventListener('checksumChanged', onChecksumChange);

  // Program defined functions / grabbers
  function findPlayer(toonName) {
    return report.players.find(p => p.toonName === toonName);
  }

  async function initialize() {
    await useParameters(null, function() {
      console.debug('Initial Checksum:', checksum);
    });
    console.debug('WCL Analytics Initialized');
  }

  async function grabPlayers() {
    console.debug('Grabbing players...');
    await useParameters({ 'type': 'summary' }, function() {
      document.querySelectorAll('.character-details .summary-table tr .name-and-spec').forEach(function(toonRow) {
        const toonName = cleanString(toonRow.querySelector('a').innerText);
        const toonClass = cleanString(toonRow.querySelector('a').className);
        const toonTalents = cleanString(toonRow.parentElement.parentElement.querySelector('.talents-cell').innerText);

        const player = findPlayer(toonName);
        if (player) { // update
          player.toonClass = player.toonClass || toonClass;
          player.toonTalents = player.toonTalents || toonTalents;
        } else { // initialize
          report.players.push({
            toonName,
            toonClass,
            toonTalents,
            casts: [],
          });
        }
      });
    });
    console.debug('Grabbed players!');
  }

  async function grabPlayerIds() {
    console.debug('Grabbing player IDs...');
    await useParameters({ type: 'casts' }, function() {
      document.querySelectorAll(".report-table-name").forEach(el => {
        const playerLink = el.querySelector('a');
        const player = findPlayer(cleanString(playerLink.innerText));
        player.id = parseInt(cleanString(playerLink.getAttribute('oncontextmenu').split("setFilterSource(")[1].split(",")[0]));
        player.active = parseFloat(cleanString(el.parentElement.querySelector('.main-table-active').innerText)) || 0;
        player.cpm = parseInt(cleanString(el.parentElement.querySelector('.main-per-second-amount').innerText)) || 0;
      });
    });
    console.debug('Grabbed player IDs!');
  }

  async function grabDamageStats() {
    console.debug('Grabbing damage stats...');
    await useParameters({ type: 'damage-done' }, function() {
      document.querySelectorAll(".report-table-name").forEach(el => {
        const playerLink = el.querySelector('a');
        const player = findPlayer(cleanString(playerLink.innerText));
        if (player) {
          player.damageTotal = cleanString(el.parentElement.querySelector('.report-amount-total').innerText);
          player.dpsTotal = parseFloat(cleanString(el.parentElement.querySelector('.main-per-second-amount').innerText));
        }
      });
    });
  }

  async function grabHealingStats() {
    console.debug('Grabbing healer stats...');
    await useParameters({ type: 'healing' }, function() {
      document.querySelectorAll(".report-table-name").forEach(el => {
        const playerLink = el.querySelector('a');
        const player = findPlayer(cleanString(playerLink.innerText));
        if (player) {
          player.healingTotal = cleanString(el.parentElement.querySelector('.report-amount-total').innerText);
          player.hpsTotal = parseFloat(cleanString(el.parentElement.querySelector('.main-per-second-amount').innerText));
        }
      });
    });
  }

  async function grabCasts() {
    console.debug('Grabbing casts...');
    for (let player of report.players) {
      if (!player.id) {
        console.debug('Player ID does not exist for toon: ' + player.toonName);
        continue;
      }

      function parseTable(pageType) {
        document.querySelectorAll('.summary-table.report tbody > tr[id*="main-table-row"]').forEach(function(toonRow) {
          const ability = toonRow.querySelector('.report-table-name a span');

          const castData = {
            id: parseInt(ability.id.split('ability-')[1].split('-')[0]),
            name: ability.innerText.trim(),
            uptime: 0,
            cpm: 0,
            damage: null,
            healing: null,
            hits: 0,
            avgHit: null,
            avgCast: null,
            crit: 0,
            miss: 0,
            dps: 0,
            hps: 0,
          };

          if (toonRow.querySelector('.uptime-percent')) {
            castData.uptime = parseFloat(cleanString(toonRow.querySelector('.uptime-percent').innerText)) || 0;
          }

          if (pageType !== 'damage' && pageType !== 'healing') {
            castData.casts = parseInt(cleanString(toonRow.querySelector('.report-table-amount .report-amount-total').innerText)) || 0;
            castData.cpm = parseFloat(cleanString(toonRow.querySelector('.main-per-second-amount').innerText)) || 0;
          } else if (pageType === 'healing') {
            castData.avgCast = parseInt(cleanString(toonRow.querySelector('.report-table-amount + .num + .num').innerText)) || 0;
            castData.healing = cleanString(toonRow.querySelector('.report-table-amount .report-amount-total').innerText);
            castData.hps = parseFloat(cleanString(toonRow.querySelector('.main-per-second-amount').innerText));
            castData.overheal = parseFloat(cleanString(toonRow.querySelector('.main-table-miss').innerText)) || 0;
          } else if (pageType === 'damage') {
            castData.damage = cleanString(toonRow.querySelector('.report-table-amount .report-amount-total').innerText);
            castData.miss = parseFloat(cleanString(toonRow.querySelector('.main-table-miss').innerText));
            castData.dps = parseFloat(cleanString(toonRow.querySelector('.main-per-second-amount').innerText));
            if (toonRow.querySelector('.main-table-hits + .num + .num')) {
              castData.crit = parseFloat(cleanString(toonRow.querySelector('.main-table-hits + .num + .num').innerText));
            }
          }

          if (pageType === 'damage' || pageType === 'healing') {
            castData.casts = parseInt(cleanString(toonRow.querySelector('.report-table-amount + .num').innerText)) || 0;
            castData.hits = parseInt(cleanString(toonRow.querySelector('.main-table-hits').innerText)) || 0;
            castData.avgHit = cleanString(toonRow.querySelector('.main-table-hits + .num').innerText); 
          }

          const cast = player.casts.find(c => c.name === castData.name);
          if (cast) {
            cast.uptime = cast.uptime || castData.uptime;
            cast.casts = cast.casts || castData.casts;
            cast.cpm = cast.cpm || castData.cpm;
            cast.damage = cast.damage || castData.damage;
            cast.healing = cast.healing || castData.healing;
            cast.overheal = cast.overheal || castData.overheal;
            cast.hits = cast.hits || castData.hits;
            cast.avgHit = cast.avgHit || castData.avgHit;
            cast.avgCast = cast.avgCast || castData.avgCast;
            cast.crit = cast.crit || castData.crit;
            cast.miss = cast.miss || castData.miss;
            cast.dps = cast.dps || castData.dps;
            cast.hps = cast.hps || castData.hps;
          } else {
            player.casts.push(castData);
          }
        });
      }

      await useParameters({ type: 'casts', source: player.id }, function() {
        parseTable('casts');
      });

      await useParameters({ type: 'damage-done', source: player.id }, function() {
        parseTable('damage');
      });

      
      await useParameters({ type: 'healing', source: player.id }, function() {
        parseTable('healing');
      });
    }
    console.log('Grabbed casts!');
  }



  await initialize();
  await grabPlayers();
  await grabPlayerIds();
  await grabDamageStats();
  await grabHealingStats();
  await grabCasts();

  console.log('report', report);
})();