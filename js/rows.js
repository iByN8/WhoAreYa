// .... stringToHTML ....
import {stringToHTML} from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import {higher,lower} from "./fragments.js";
import { initState } from "./stats.js";
// .... setupRows .....
export {setupRows}
// .... initState ....
//
// From: https://stackoverflow.com/a/7254108/243532
function pad(a, b){
    return(1e15 + a + '').slice(-b);
}


const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {

    let x = game.guesses.length
    let inp = document.getElementById("myInput")
    inp.placeholder = "Guess "+(x+1)+" of 8"

    let [state, updateState] = initState('WAYgameState', game.solution.id)


    function leagueToFlag(leagueId) {
        const leagues = {
            564:{id:"es1"},
            8:{id:"en1"},
            82:{id:"de1"},
            384:{id:"it1"},
            301:{id:"fr1"}
          }
          return leagues[leagueId].id
    }


    function getAge(dateString) {
        var edad = 0;
        var arraySeparado = dateString.split("-");
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        if(mm<arraySeparado[1]){
            edad=edad+1;
        }else if(mm=arraySeparado[1] && dd<arraySeparado[2]){
            edad=edad+1;
        }

        edad=edad+(yyyy-arraySeparado[0]-1);
        return edad;
    }
    
    let check = function (theKey, theValue) {
        if(theKey == 'birthdate') {
            if (getAge(game.solution[theKey]) == getAge(theValue)){
                return "correct";
      
            }else if (getAge(game.solution[theKey]) <= getAge(theValue)){
                return "lower";
      
            }else{
                return "higher"
      
            }}else{
              if (game.solution[theKey] == theValue){
                return "correct";
        
              }else{
                return "incorrect";
        
             }
            }
    }

        function unblur(outcome) {
        return new Promise( (resolve, reject) =>  {
            setTimeout(() => {
                document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
                document.getElementById("combobox").remove()
                let color, text
                if (outcome=='success'){
                    color =  "bg-blue-500"
                    text = "Awesome"
                } else {
                    color =  "bg-rose-500"
                    text = "The player was " + game.solution.name
                }
                document.getElementById("picbox").innerHTML += `<div class="animate-pulse fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color} text-white"><div class="p-4"><p class="text-sm text-center font-medium">${text}</p></div></div>`
                resolve();
            }, "2000")
        })
    }


    function showStats(timeout) {
        return new Promise( (resolve, reject) =>  {
            setTimeout(() => {
                document.body.appendChild(stringToHTML(headless(stats())));
                document.getElementById("showHide").onclick = toggle;
                bindClose();
                resolve();
            }, timeout)
        })
    }

    function bindClose() {
        document.getElementById("closedialog").onclick = function () {
            document.body.removeChild(document.body.lastChild)
            document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
        }
    }


    function setContent(guess) {
        if(check("birthdate",guess.birthdate)=="lower"){
            return [
              `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
              `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
              `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
              `${guess.position}`,
              `${getAge(guess.birthdate)+lower}`
          ]
          }else if (check("birthdate",guess.birthdate)=="higher"){
            return [
              `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
              `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
              `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
              `${guess.position}`,
              `${getAge(guess.birthdate)+higher}`
          ]
          }else{
            return [
              `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
              `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
              `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
              `${guess.position}`,
              `${getAge(guess.birthdate)}`
          ]
          } 
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }


    function resetInput(){
        let x = game.guesses.length
        let inp = document.getElementById("myInput")
        if(x<8){
            inp.placeholder = "Guess "+(x+1)+" of 8"
            inp.value = ""
      }
    }

    let getPlayer = function (playerId) {
        return game.players.filter(item => item.id == playerId)[0]    
    }


    function gameEnded(lastGuess){
        if(game.solution.id == lastGuess || game.guesses.length == 8){
            return true;
          }else{
            return false;  
          }
    }


    //resetInput();

    function success(){

        unblur('success')
  
      }
  
      function gameOver(){
  
        unblur('gameOver')
  
      }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)

        game.guesses.push(playerId)
        updateState(playerId)

        resetInput();

         if (gameEnded(playerId)) {
            // updateStats(game.guesses.length);

            if (playerId == game.solution.id) {
                success();
            }

            if (game.guesses.length == 8) {
                gameOver();
            }


                  let interval = /* YOUR CODE HERE */ 2


         }


        showContent(content, guess)
    }
}
