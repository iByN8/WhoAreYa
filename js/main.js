import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import { getAge } from "./rows.js";

function differenceInDays(date1) {
    const date = new Date()
    let fechaInicio = date1.getTime();
    let fechaFin = date.getTime();
    
    let dif = Math.abs(fechaFin - fechaInicio);

    //return (dif/(1000*60*60*24));
    return 15;

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


function check(theKey, theValue) {

  switch (theKey) {
    /*case theKey === ("nationality" || "leagueId" || "teamId" || "position"):
      if (game.solution[theKey] == theValue){
        return true;

      }else{
        return false;

     }
    break;
    */
    case theKey === "birthdate":

      if (getAge(game.solution[theKey]) == getAge(theValue)){
          return true;

      }else if (getAge(game.solution[theKey]) >= getAge(theValue)){
          return "lower";

      }else{
          return "higher"

      }
        
    break;

    case theKey === "number":

      if (game.solution[theKey] == theValue){
        return true;

      }else if (game.solution[theKey] >= theValue){
        return "lower";

      }else{
        return "higher"

      }


    break;

    default:

      if (game.solution[theKey] == theValue){
        return true;

      }else{
        return false;

      }    
      break;
  }

}


function getPlayer(playerId){

  return game.players.filter(item => item.id == playerId)[0]

}