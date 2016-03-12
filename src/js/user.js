export function getDataUser(id) {
  const player = sessionStorage.getItem(`player${id}`);
  return JSON.parse(player)
}

export function saveUser(data, user, id) {
  const player = data[`${user.name}`];
  player["region"] = user.region;
  const playerInfo = JSON.stringify(player);
  sessionStorage.setItem(`player${id}`, playerInfo);
}
