export { fetchJSON };

async function fetchJSON(what) {
    return await fetch(what).then(r=>r.json());
}
