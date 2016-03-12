import { getUsersLeagues, getUsersStats, getUsers } from 'actions';

const headerButton = document.querySelector("#headerButton");
const cancelButton = document.querySelector("#cancel_button");
const fightButton = document.querySelector("#fight_button");

const searchDisplay = document.querySelector("#searchDisplay");
const search = document.querySelector('#search');
let user1 = document.querySelector("#user1");
let user2 = document.querySelector("#user2");
let region1 = document.querySelector("#region1");
let region2 = document.querySelector("#region2");

search.classList.remove('bounceOut');
search.classList.add('animated');
search.classList.add('bounceIn');

function fadeOutSearch() {
  search.classList.remove('bounceIn');
  search.classList.add('bounceOut');
  setTimeout(function() {
    searchDisplay.style.display = 'none';
  },800);
}

fightButton.onclick = function() {
  let name = user1.value.trim();
  let name2 = user2.value.trim();
  let re1 = region1.options[region1.selectedIndex].text.toLowerCase();
  let re2 = region2.options[region2.selectedIndex].text.toLowerCase();

  if (name === "" || name2 === "") {
    return;
  }

  let players = {
    "player1": {
      "name": name,
      "region": re1
    },
    "player2": {
      "name": name2,
      "region": re2
    }
  };

  getUsers(players, () => {
    getUsersLeagues();
    getUsersStats();
  }).then(() => {
    fadeOutSearch();
  }).catch(() => {
    alert("Alguno de los usuarios esta mal escrito");
  });

}

cancelButton.onclick = function() {
  fadeOutSearch();
};

headerButton.onclick = function() {
  search.classList.remove('bounceOut');
  cancelButton.style.display = "inline-block";
  searchDisplay.style.display = 'block';
  search.classList.add('animated');
  search.classList.add('bounceIn');
}
