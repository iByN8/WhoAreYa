export {initState}

let initState = function(what, solutionId) { 
    let emaitza = [];
    if(localStorage.getItem(what) !== undefined){
        emaitza[0] = localStorage.getItem(what);
    }else{
        localStorage.setItem('WAYgameState', what);
        emaitza[0] = localStorage.getItem(what);
    }
    //función anónima
}



