export {updateStats, getStats, initState}

const stats = function () {
    const {totalGames, bestStreak, currentStreak, successRate, gamesFailed, winDistribution} = getStats("gameStats");

    let blocks = `<div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 dark:bg-gray-800"><div class="absolute right-4 top-4" id="closedialog"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="h-6 w-6 cursor-pointer dark:stroke-white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><div class="text-center"><h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="headlessui-dialog-title-7">Statistics</h3><div class="mt-2"><div class="flex justify-center my-2"><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${totalGames}</div><div class="text-xs">Total tries</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${successRate}%</div><div class="text-xs">Success rate</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${currentStreak}</div><div class="text-xs">Current streak</div></div><div class="items-center justify-center m-1 w-1/4 dark:text-white"><div class="text-3xl font-bold">${bestStreak}</div><div class="text-xs">Best streak</div></div></div><h4 class="cursor-pointer text-lg leading-6 font-medium text-gray-900 dark:text-gray-100" id="showHide">Show Guess Distribution</h4><div class="columns-1 justify-left m-2 text-sm dark:text-white">`

    let sum = winDistribution.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue;
    });

    blocks += "<div id='guesscontainer' style='display:none'>"
    for(let i=1; i<=8; i++){
        blocks += `<div class="flex justify-left m-1">
                        <div class="items-center justify-center w-2">${i}</div>
                        <div class="rounded-full w-full ml-2">
                            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 rounded-l-full" style="width: ${Math.ceil(winDistribution[i] / sum * 100) }%;">
                                ${winDistribution[i]}
                            </div>
                        </div>
                    </div>`
        }
    blocks += "</div>"

    blocks += `<div class="mt-2 justify-center items-center space-x-2 dark:text-white">
                    <div>
                        <h5>New footballer:</h5>
                        <span class="text-lg font-medium text-gray-900 dark:text-gray-100" id="nextPlayer"></span>
                    </div>
                   <!-- <button type="button" class="rounded-md border border-transparent shadow-sm px-4 pt-1 pb-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm" tabindex="0"><span class="block text-2xl tracking-wide font-bold leading-7">Share</span>
                   <span class="block text-xs tracking-tight font-light">#HashTag</span></button> -->
               </div>
               <div class="mt-3">
                <a class="font-bold dark:text-white text-lg space-x-2 flex items-center justify-center" href="https://twitter.com/juanan" target="_blank" rel="noreferrer">
                    <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                    <span>Follow on Twitter</span>
                </a>
               </div>
               <a href="https://ikasten.io" class="bg-black/10 dark:bg-white/10 border-t border-t-black/20 dark:border-t-white/20 py-4 sm:pb-6 px-4 sm:px-6 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 flex justify-between items-center mt-3 text-left">
               <div class="dark:text-white">
                   <div class="text-lg font-extrabold text-[#b837c6] dark:text-[#ceff27]" style="color: #ceff27">Web Sistemak</div>
                   <div class="text-sm">2022/2023 ikasturteko praktika</div>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" class="h-6 w-6 ml-2 cursor-pointer dark:stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
               </svg></a>
               
               </div></div></div></div>`

    return blocks
}

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

