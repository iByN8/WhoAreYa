export {initState}

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



