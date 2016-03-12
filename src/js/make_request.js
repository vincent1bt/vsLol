import request from 'axios';

export function makeRequest(url, params){
  const key = "79b27674-b7c7-474e-a45b-c5f55d749d7a";
  const endPoint = "https://lan.api.pvp.net/api/lol/";
  if (params != null) {
    var url = `${endPoint}${url}?${params}&api_key=${key}`;
  } else {
    var url = `${endPoint}${url}?api_key=${key}`;
  }
  return request.get(url);
}

export function waitForRequests(requests, callback) {
  return request.all(requests).then(request.spread((firstUser, secondUser) => {
    callback(firstUser, secondUser);
  }));
}
