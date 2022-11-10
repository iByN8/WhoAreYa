import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import {setupRows} from "./rows.js";
import {autocomplete} from "./autocomplete.js"

function differenceInDays(date1) {
    const date = new Date()
  let fechaInicio = date1.getTime();
  let fechaFin = date.getTime();
  
  let dif = Math.abs(fechaFin - fechaInicio);

  //return (dif/(1000*60*60*24));
  return 16;
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

    autocomplete(document.getElementById("myInput"), game)

      // YOUR CODE HERE
    /*let addRow = setupRows( game );
    // get myInput object...
    let myInput =  document.getElementById('myInput')
      // when the user types a number an press the Enter key:
    myInput.addEventListener('keypress', function(event){
      if (event.key == "Enter"){
        addRow(myInput.value);
      }
        
    })
        */
    //  


  }
);