const encounterList = [];

const november = [
  require('./static/rankings/naxx/healing/2024-11-04.json'),
  require('./static/rankings/naxx/healing/2024-11-05.json'),
  require('./static/rankings/naxx/healing/2024-11-11.json'),
  require('./static/rankings/naxx/healing/2024-11-12.json'),
  require('./static/rankings/naxx/healing/2024-11-18.json'),
  require('./static/rankings/naxx/healing/2024-11-19.json')
];

encounterList.push(...november);

let players = [];

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

const allowedClasses = ['Priest', 'Paladin', 'Druid'];

players.sort((p1, p2) => p1.avgRank - p2.avgRank);
players = players.filter(p => allowedClasses.includes(p.toonClass));

console.log('===== Healing =====');
players.forEach((player, idx) => {
  console.log(`${idx + 1}) ${player.name} - ${player.toonClass}: #${player.avgRank} over ${player.rankings.length} boss fights`);
});