export { fetchJSON };

async function fetchJSON(what) {
    return fetch("./json/"+what+".json").then(r=> r.json())
}
