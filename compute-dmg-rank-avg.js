const encounterList = [];

const november = [
  require('./static/rankings/naxx/dmg/2024-11-04.json'),
  require('./static/rankings/naxx/dmg/2024-11-05.json'),
  require('./static/rankings/naxx/dmg/2024-11-11.json'),
  require('./static/rankings/naxx/dmg/2024-11-12.json'),
  require('./static/rankings/naxx/dmg/2024-11-18.json'),
  require('./static/rankings/naxx/dmg/2024-11-19.json')
];

encounterList.push(...november);

const players = [];

const findPlayer = (playerName, playerClass) => {
  let player = players.find(p => p.name === playerName);
  if (!player) {
    player = { name: playerName, rankings: [], toonClass: playerClass };
    players.push(player);
  }
  return player;
}

const arraySum = (array) => array.reduce((acc, curr) => acc + curr, 0);

for (let encounterItems of encounterList) {
  for (let encounter of encounterItems) {
    for (let ranking of encounter.rankings) {
      const player = findPlayer(ranking.name, ranking.class);
      player.rankings.push(ranking.rank);
    }
  }
}

for (let player of players) {
  player.avgRank = (arraySum(player.rankings) / player.rankings.length).toFixed(2);
}

players.sort((p1, p2) => p1.avgRank - p2.avgRank);

const playersByClass = {};
for (let player of players) {
  if (!playersByClass[player.toonClass]) {
    playersByClass[player.toonClass] = [];
  }
  if (!playersByClass[player.toonClass].filter(p => p.name === player.name).length) {
    playersByClass[player.toonClass].push(player);
  }
}

Object.keys(playersByClass).forEach(classKey => {
  console.log(`===== ${classKey} =====`);
  playersByClass[classKey].forEach((player, idx) => {
    console.log(`${idx + 1}) ${player.name} - ${player.toonClass}: #${player.avgRank} over ${player.rankings.length} boss fights`);
  });
  console.log();
  console.log();
});
