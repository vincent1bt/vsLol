export function makeUserTemplate(user, league = null) {
  let status = ``;
  if (league != null) {
    status = `<p>${league.tier} ${league.entries[0].division}</p>`;
  } else {
    status = `<p>No league</p>`;
  }
  return `<div class="user_icon">
               <div class="user_icon_image">
                 <img src="http://ddragon.leagueoflegends.com/cdn/6.5.1/img/profileicon/${user.profileIconId}.png" alt=${user.name} />
               </div>
               <div class="user_name">
                <p>${user.name}</p>
               </div>
               <div class="user_name">
                 ${status}
               </div>
             </div>`;
}

export function makeStatsTemplate(user) {
  let mainTemplate = ""
  user.games.map((game) => {
    let template = `<p class="import">`
    if (game.win) {
      template = `<p class="import gan">`;
    } else if (game.win === false) {
      template = `<p class="import per">`;
    }
    let div_template = template + `${game.type}<p>${game.wins}</p></p>`;
    mainTemplate += div_template;
  });
  return mainTemplate;
}
