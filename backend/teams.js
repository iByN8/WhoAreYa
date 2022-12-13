import fs from 'fs';
import fetch from 'node-fetch'

const writepath = 'json/teams/'

fs.mkdirSync(writepath, {recursive:true})

try {
    // read leagues file into an array of lines
    const data = fs.readFileSync('teamIDs.txt', 'utf8').split("\n")
    data.forEach( (elem, idx) => {
           elem=elem.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
           const url = `https://cdn.sportmonks.com/images/soccer/teams/${elem%32}/${elem}.png`
           
            fetch(url).then(res => {
                // check status
                if (res.status === 200) {
                    res.body.pipe(fs.createWriteStream(`${writepath}${elem}.png`))
                } else {
                    console.log(`status: ${res.status} line: ${idx} elem:${elem} not found`)
                }
            })
            .catch(err => console.log(err))          
    })
    }catch (err) {
     console.error(err);
    }
