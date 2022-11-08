export { fetchJSON };

async function fetchJSON(what) {
    return new Promise((resolve, reject)=>{
        fetch("json/"+what+".json").then(r=>{resolve(r.json())}).catch(e=>reject());
    })
}
