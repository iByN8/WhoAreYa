

let comp = await fetch('../competitions.json').then(r=>r.json()).then(r => r)

function start(){

alert(comp.competitions[7])





}
window.onload() = start