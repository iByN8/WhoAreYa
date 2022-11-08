import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";

function differenceInDays(date1) {
    const date = new Date()
    let fechaInicio = date1.getTime();
    let fehaFin = date.getTime();
    
    let dif = Math.abs(fechaFin - fechaInicio);
    return dif/(1000*60*60*24);


}

let difference_In_Days = differenceInDays(new Date("08-18-2022"));

window.onload = function () {
  document.getElementById(
    "gamenumber"
  ).innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
  guesses: [],
  solution: {},
  players: [],
  leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
    let jsonPlayers = fetchJSON(players);
    let jsonSolArray = fetchJSON(solutionArray);
    let solPlayer = jsonSolArray[difference_In_Days-1];
    let player = jsonPlayers.filter( r => r.id = solPlayer.id);
}

Promise.all([fetchJSON("fullplayers"), fetchJSON("solution")]).then(
  (values) => {

    let solution;
    
    [game.players, solution] = values;

    game.solution = getSolution(game.players, solution, difference_In_Days);
    
    console.log(game.solution);

    document.getElementById(
      "mistery"
    ).src = `https://playfootball.games/media/players/${
      game.solution.id % 32
    }/${game.solution.id}.png`;
  
  }
);
