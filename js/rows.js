// YOUR CODE HERE :  
// .... stringToHTML ....
import {stringToHTML} from "./fragments.js"
import { fetchJSON } from "./loaders.js";
// .... setupRows .....
export {setupRows}

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']
const competitions = await fetch("json/competitions.json").then(r => r.json()).then(r => r.competitions)

let setupRows = function (game) {


    function leagueToFlag(leagueId) {
        console.log(competitions.filter(item => item.plan == "TIER_ONE"))
        return competitions.filter(item => item.id == leagueId)[0]
        
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

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://crests.football-data.org/784.svg" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`
        ]
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

    let getPlayer = function (playerId) {
        return game.players.filter(item => item.id == playerId)[0]  
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}