import { makeRequest, waitForRequests } from 'make_request';
import { getDataUser, saveUser } from 'user';
import { makeUserTemplate, makeStatsTemplate } from 'templates';

//Obtener informacion sobre el usuario por su nombre
function getUserInfoByName(user) {
  const endPoint = `${user.region}/v1.4/summoner/by-name/${user.name}`;
  return makeRequest(endPoint, null);
}

//obtener estadisticas del usuario por su id
function getUserStatsById(id) {
  const user = getDataUser(id);
  const url = `${user.region}/v1.3/stats/by-summoner/${user.id}/summary`;
  return makeRequest(url, "season=SEASON2016");
}

function requestUserStats(callback) {
  waitForRequests([getUserStatsById(1), getUserStatsById(2)], (firstUser, secondUser) => {
    const userOne = firstUser.data.playerStatSummaries;
    const userTwo = secondUser.data.playerStatSummaries;
    callback(winner(userOne, userTwo));
  });
}

function passUsersStatsToTemplates() {
  requestUserStats((users) => {
    statsTemplate(1, users.player1);
    statsTemplate(2, users.player2);
  });
}

function statsTemplate(id, user) {
  const template = makeStatsTemplate(user);
  const div = document.querySelector("#stats");
  div.querySelector(`#stats${id}`).innerHTML = template;
}


function winner(userOne, userTwo) {
  let users = {
    "player1": {
      games: []
    },
    "player2": {
      games: []
    }
  };
  mapUser(userOne, users.player1);
  mapUser(userTwo, users.player2);
  comparateUsers(users);
  return users;
}

function mapUser(user, player){
  user.map((stat) => {
    if(stat.playerStatSummaryType === "AramUnranked5x5") {
      pushGame(player, "Aram", stat.wins);
    } else if(stat.playerStatSummaryType === "CAP5x5") {
      pushGame(player, "Personalizada", stat.wins);
    } else if(stat.playerStatSummaryType === "Unranked") {
      pushGame(player, "Normal", stat.wins);
    } else if(stat.playerStatSummaryType === "RankedSolo5x5") {
      pushGame(player, "Ranked-Solo", stat.wins);
    } else if(stat.playerStatSummaryType === "RankedTeam5x5" ) {
      pushGame(player, "Ranked-Team", stat.wins);
    } else if (stat.playerStatSummaryType === "Unranked3x3") {
      pushGame(player, "Arbol", stat.wins);
    }
  });
}

function pushGame(player, type, wins) {
  player.games.push({
    type: type,
    wins: wins,
    win: null
  });
}

function comparateUsers(users) {
  let gamesUserOne = users.player1.games;
  let gamesUserTwo = users.player2.games;
  for(var i = 0; i <= 5; i++) {
    if(gamesUserOne[i].wins > gamesUserTwo[i].wins) {
      gamesUserOne[i].win = true;
      gamesUserTwo[i].win = false;
    } else if(gamesUserOne[i].wins < gamesUserTwo[i].wins){
      gamesUserOne[i].win = false;
      gamesUserTwo[i].win = true;
    }
  }
}
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//obtener la liga de usuario por su id
export function getUserLeagueById(id) {
  const user = getDataUser(id);
  const endPoint = `${user.region}/v2.5/league/by-summoner/${user.id}/entry`;
  const div = document.querySelector("#user_info");

  makeRequest(endPoint, null).then((response) => {
    if (response.status == 200) {
      var template = makeUserTemplate(user, response.data[`${user.id}`][0]);
    }
    div.querySelector(`#user${id}`).innerHTML = template;
  }).catch(response => {
    var template = makeUserTemplate(user);
    div.querySelector(`#user${id}`).innerHTML = template;
  });
}

export function getStats() {
  passUsersStatsToTemplates();
}

export function getUsersInfo(players, callback) {
  return waitForRequests([getUserInfoByName(players.player1), getUserInfoByName(players.player2)], (firstUser, secondUser) => {
    if (firstUser.status === 200 && secondUser.status === 200) {
      saveUser(firstUser.data, players.player1, 1);
      saveUser(secondUser.data, players.player2, 2);
      callback();
    }
  });
}
