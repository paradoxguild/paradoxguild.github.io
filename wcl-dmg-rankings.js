(async function() {
  /* Event-based variables */
  const checksumChangedEvent = new Event("checksumChanged");
  let checksum = -1;
  let checksumQueue = [];

  /* Output variables */
  const encounters = [];

  /* Utility functions */
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

  /* Script-specific functions */
  function getPageChecksum() {
    let eligibleQueries = ['.summary-table', '.report-overview-boss-box'];
    let sum = 0;
    for (let eligibleQuery of eligibleQueries) {
      document.querySelectorAll(eligibleQuery).forEach(function(element) {
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
      Object.keys(parameterMap).forEach(function(k) {
        params.set(k, parameterMap[k]);
      });
      url += params.toString();
    }
    console.debug('Rerouting:', url);
    window.location = url;
    return new Promise(function(resolve, _) {
      checksumQueue.push(function() {
        callback();
        resolve();
      });
    });
  }

  /* Event-based listeners */
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

  /* Set up listeners */
  window.removeEventListener('hashchange', onHashChange);
  window.addEventListener('hashchange', onHashChange);
  window.removeEventListener('checksumChanged', onChecksumChange);
  window.addEventListener('checksumChanged', onChecksumChange);

  async function initialize() {
    useParameters(null, function() {
      console.debug('Initial Checksum:', checksum);
    });
    onChecksumChange();
    console.debug('WCL Analytics Initialized');
  }

  async function grabEncounterData() {
    console.debug('Grabbing encounter data...');
    await useParameters({ type: 'damage-done' }, function() {
      document.querySelectorAll("a.Boss.actor-menu-link").forEach(function(anchor) {
        const encounterId = parseInt(cleanString(anchor.getAttribute('onclick').split("setFilterTarget(")[1].split(",")[0]));
        const encounterName = anchor.innerText;
        encounters.push({ id: encounterId, name: encounterName });
      })
    });
    console.debug('Grabbed encounter data');
  }

  async function grabRankings(fightId) {
    console.debug('Grabbing rankings for fight:', fightId);
    let playerRankings = [];
    await useParameters({ type: 'damage-done', target: fightId }, async function() {
      await sleep(500);
      let playerRank = 1;
      document.querySelectorAll("#summary-content table .main-table-link").forEach(function(td) {
        const playerName = cleanString(td.innerText);
        const playerClass = cleanString(td.querySelector('a').getAttribute('class'));
        playerRankings.push({ name: playerName, class: playerClass, rank: playerRank });
        playerRank++;
      });
    });
    console.debug('Grabbed rankings for fight:', fightId);
    return playerRankings;
  }

  await initialize();
  await grabEncounterData();

  for (let encounter of encounters) {
    encounter.rankings = await grabRankings(encounter.id);
  }

  console.log('encounters', encounters);
})();