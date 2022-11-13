export {updateStats, getStats, initState}


let initState = function(what, solutionId) { 

    let emaitza = [];
    if(localStorage.getItem(what) !== undefined){
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
    // YOUR CODE HERE
}

let getStats = function(what) {
    // YOUR CODE HERE
    //
};


function updateStats(t){
 // YOUR CODE HERE
};


let gamestats = getStats('gameStats');

