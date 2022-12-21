export {updateStats, getStats, initState}



let initState = function(what, solutionId) { 

    let emaitza = [];
    if(localStorage.getItem(what) != null){
        emaitza[0] = localStorage.getItem(what);
    }else{
        localStorage.setItem(what, solutionId);
        emaitza[0] = localStorage.getItem(what);
    }
    //función anónima
    emaitza[1] = function(playerId){
        localStorage.setItem('WAYgameState', playerId)
    }
    return emaitza;
}

function successRate (e){
    return e['successRate'][0];
}

let getStats = function(what) {
    if(JSON.parse(localStorage.getItem(what)) != null){
        return JSON.parse(localStorage.getItem(what));
    }else{
        let estadisticas = {
            winDistribution: [0,0,0,0,0,0,0,0,0],
            gamesFailed: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalGames: 0,
            successRate: 0
            }
        localStorage.setItem(what, JSON.stringify(estadisticas));
        console.log(estadisticas)
        return estadisticas;
    }
};


function updateStats(t){
  //let gamestats = localStorage.getItem('gameStats');
  let gamestats = getStats('gameStats');
  //console.log(gamestats)
  gamestats['totalGames'] += 1;
  
  if(t<8){
    gamestats.currentStreak +=1;
    gamestats.winDistribution[t] += 1;
  }else{
    gamestats.gamesFailed += 1;
    gamestats.currentStreak = 0;
  }

  if(gamestats.currentStreak>gamestats.bestStreak){
    gamestats.bestStreak = gamestats.currentStreak;
  }
  gamestats.successRate = Math.round((gamestats.totalGames-gamestats.gamesFailed)/gamestats.totalGames*100);

  localStorage.setItem('gameStats', JSON.stringify(gamestats));
}




