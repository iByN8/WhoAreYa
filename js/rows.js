// YOUR CODE HERE :  
// .... stringToHTML ....
import {stringToHTML} from "./fragments.js";
import { fetchJSON } from "./loaders.js";
import {higher,lower} from "./fragments.js";
// .... setupRows .....
export {setupRows}


const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']
const competitions = await fetch("json/competitions.json").then(r => r.json()).then(r => r.competitions)

let setupRows = function (game) {


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
      if( theKey == ('nationality')){
        if (game.solution[theKey] == theValue){
          return "correct";
  
        }else{
          return "incorrect";
  
       }
      }
      
      if( theKey == ('leagueId')){
        if (game.solution[theKey] == theValue){
          return "correct";
  
        }else{
          return "incorrect";
  
       }
      }

      if( theKey == ('teamId')){
        if (game.solution[theKey] == theValue){
          return "correct";
  
        }else{
          return "incorrect";
  
       }
      }
     
      if( theKey == ('position')){
        if (game.solution[theKey] == theValue){
          return "correct";
  
        }else{
          return "incorrect";
  
       }
      }

      if(theKey == 'birthdate') {
        if (getAge(game.solution[theKey]) == getAge(theValue)){
            return "correct";
  
        }else if (getAge(game.solution[theKey]) <= getAge(theValue)){
            return "lower";
  
        }else{
            return "higher"
  
        }}
     
        
    /*
        if( theKey == 'position'){
    
          if (game.solution[theKey] == theValue){
            return true;
    
          }else if (game.solution[theKey] >= theValue){
            return "lower";
    
          }else{
            return "higher"
    
          }
    
    
        }
        
        default:
    
          if (game.solution[theKey] == theValue){
            return true;
    
          }else{
            return false;
    
          }    
          break;
      }*/
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