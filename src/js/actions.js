import { getStats, getUserLeagueById, getUsersInfo } from 'core';

export function getUsersLeagues() {
  getUserLeagueById(1);
  getUserLeagueById(2);
}

export function getUsersStats() {
  getStats();
}

export function getUsers(players, callback) {
  return getUsersInfo(players, () => {
    callback();
  })
}
