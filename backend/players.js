import fs from 'fs';
import fetch from 'node-fetch'

const writepath = 'json/players/'

fs.mkdirSync(writepath, {recursive:true})


try {
    // read leagues file into an array of lines
    const data = fs.readFileSync('players.txt', 'utf8').split("\n")
    data.forEach( (elem, idx) => {
        setInterval(function (elem, idx) {
           // elem=elem.replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
            const url = `https://media.api-sports.io/football/players/${elem}.png`
            fetch(url).then(res => {
                // check status
                if (res.status === 200) {
                    res.body.pipe(fs.createWriteStream(`${writepath}${elem}.png`))
                } else {
                    console.log(`status: ${res.status} line: ${idx} elem:${elem} not found`)
                }
            })
            .catch(err => console.log(err))
        },100)
            
    })
    }catch (err) {
     console.error(err);
    }

  
    
    