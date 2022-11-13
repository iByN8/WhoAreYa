import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import { getAge } from "./rows.js";

function differenceInDays(date1) {
    const date = new Date()
    let fechaInicio = date1.getTime();
    let fechaFin = date.getTime();
    
    let dif = Math.abs(fechaFin - fechaInicio);

    let emaitza = Math.round(dif/(1000*60*60*24));
  
    if(emaitza>39){
      return (emaitza % 39);
    }else{
      return emaitza;
    }

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
    let solPlayer = solutionArray[difference_In_Days-1];
    console.log(solPlayer)
    let player = players.filter(item => item.id == solPlayer.id);
    return player[0];
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
