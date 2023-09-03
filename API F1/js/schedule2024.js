const div = document.getElementById('contenido')

const table = document.createElement("tr")
for(let i=1; i<=4; i++) {
    const th = document.createElement("th")
    th.classList.add("right")

    switch(i) {
        case 1:
            th.textContent = "Round"
            break;
        case 2:
            th.textContent = "Race"
            break;
        case 3:
            th.textContent = "Circuit"
            break;
        case 4:
            th.textContent = "Date"
            break;
    }
    table.appendChild(th)
}
div.appendChild(table)

const scheduleComplete = [
    {
        round: 0,
        gpName: "Bahrain Grand Prix",
        linkGPName: "",
        circuit: "Bahrain International Circuit",
        linkCircuit: "",
        date: "Saturday, 02 March"
    },
    {
        round: 0,
        gpName: "Saudi Arabian Grand Prix",
        linkGPName: "",
        circuit: "Jeddah Corniche Circuit",
        linkCircuit: "",
        date: "Saturday, 09 March"
    },
    {
        round: 0,
        gpName: "Australian Grand Prix",
        linkGPName: "",
        circuit: "Albert Park Grand Prix Circuit",
        linkCircuit: "",
        date: "Sunday, 24 March"
    },
    {
        round: 0,
        gpName: "Japan Grand Prix",
        linkGPName: "",
        circuit: "Suzuka Circuit",
        linkCircuit: "",
        date: "Sunday, 07 April"
    },
    {
        round: 0,
        gpName: "China Grand Prix",
        linkGPName: "",
        circuit: "Shanghai International Circuit",
        linkCircuit: "",
        date: "Sunday, 21 April"
    },
    {
        round: 0,
        gpName: "Miami Grand Prix",
        linkGPName: "",
        circuit: "Miami International Autodrome",
        linkCircuit: "",
        date: "Sunday, 05 May"
    },
    {
        round: 0,
        gpName: "Emilia Romagna Grand Prix",
        linkGPName: "",
        circuit: "Autodromo Internazionale Enzo e Dino Ferrari",
        linkCircuit: "",
        date: "Sunday, 19 May"
    },
    {
        round: 0,
        gpName: "Monaco Grand Prix",
        linkGPName: "",
        circuit: "Circuit de Monaco",
        linkCircuit: "",
        date: "Sunday, 26 May"
    },
    {
        round: 0,
        gpName: "Canadian Grand Prix",
        linkGPName: "",
        circuit: "Circuit Gilles Villeneuve",
        linkCircuit: "",
        date: "Sunday, 09 June"
    },
    {
        round: 0,
        gpName: "Spanish Grand Prix",
        linkGPName: "",
        circuit: "Circuit de Barcelona-Catalunya",
        linkCircuit: "",
        date: "Sunday, 23 June"
    },
    {
        round: 0,
        gpName: "Austrian Grand Prix",
        linkGPName: "",
        circuit: "Red Bull Ring",
        linkCircuit: "",
        date: "Sunday, 30 June"
    },
    {
        round: 0,
        gpName: "British Grand Prix",
        linkGPName: "",
        circuit: "Silverstone Circuit",
        linkCircuit: "",
        date: "Sunday, 07 July"
    },
    {
        round: 0,
        gpName: "Hungarian Grand Prix",
        linkGPName: "",
        circuit: "Hungaroring",
        linkCircuit: "",
        date: "Sunday, 21 July"
    },
    {
        round: 0,
        gpName: "Belgian Grand Prix",
        linkGPName: "",
        circuit: "Circuit de Spa-Francorchamps",
        linkCircuit: "",
        date: "Sunday, 28 July"
    },
    {
        round: 0,
        gpName: "Dutch Grand Prix",
        linkGPName: "",
        circuit: "Circuit Park Zandvoort",
        linkCircuit: "",
        date: "Sunday, 25 August"
    },
    {
        round: 0,
        gpName: "Italian Grand Prix",
        linkGPName: "",
        circuit: "Autodromo Nazionale di Monza",
        linkCircuit: "",
        date: "Sunday, 01 September"
    },
    {
        round: 0,
        gpName: "Azerbaijan Grand Prix",
        linkGPName: "",
        circuit: "Baku City Circuit",
        linkCircuit: "",
        date: "Sunday, 15 September"
    },
    {
        round: 0,
        gpName: "Singapore Grand Prix",
        linkGPName: "",
        circuit: "Marina Bay Street Circuit",
        linkCircuit: "",
        date: "Sunday, 22 September"
    },
    {
        round: 0,
        gpName: "United States Grand Prix",
        linkGPName: "",
        circuit: "Circuit of the Americas",
        linkCircuit: "",
        date: "Sunday, 20 October"
    },
    {
        round: 0,
        gpName: "Mexico City Grand Prix",
        linkGPName: "",
        circuit: "Autódromo Hermanos Rodríguez",
        linkCircuit: "",
        date: "Sunday, 27 October"
    },
    {
        round: 0,
        gpName: "São Paulo Grand Prix",
        linkGPName: "",
        circuit: "Autódromo José Carlos Pace",
        linkCircuit: "",
        date: "Sunday, 03 November"
    },
    {
        round: 0,
        gpName: "Las Vegas Grand Prix",
        linkGPName: "",
        circuit: "Las Vegas Strip Street Circuit",
        linkCircuit: "",
        date: "Saturday, 23 November"
    },
    {
        round: 0,
        gpName: "Qatar Grand Prix",
        linkGPName: "",
        circuit: "Losail International Circuit",
        linkCircuit: "",
        date: "Sunday, 01 December"
    },
    {
        round: 0,
        gpName: "Abu Dhabi Grand Prix",
        linkGPName: "",
        circuit: "Yas Marina Circuit",
        linkCircuit: "",
        date: "Sunday, 08 December"
    }
]

const datosApi = async () => {
    try {
        // Fetch API https://ergast.com/mrd/
        const response = await fetch("https://ergast.com/api/f1/current.json", {
            "method": "GET"
        })

        const data = await response.json()
        const circuitName = data.MRData.RaceTable.Races
        
        //console.log("circuitName")
        //console.log(circuitName)
        
        for(let i=0; i<=circuitName.length + 1; i++) {
            scheduleComplete[i].round = i + 1
            
            // Fetch API Wikipedia
            const gpNameInfoWiki = await fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${scheduleComplete[i].gpName}`, {
                method: "GET"
            })
            const gpNameInfoWikiData = await gpNameInfoWiki.json()
            //console.log(`${scheduleComplete[i].gpName} ${scheduleComplete[i].round}`)
            
            scheduleComplete[i].linkGPName = gpNameInfoWikiData[3][0]
            //console.log(scheduleComplete[i].linkGPName)
        


            // Fetch API Wikipedia
            const circuitInfoWiki = await fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${scheduleComplete[i].circuit}`, {
                method: "GET"
            })
            const circuitInfoWikiData = await circuitInfoWiki.json()
            //console.log(circuitInfoWikiData[3][0])
            //console.log(`${scheduleComplete[i].circuit} ${scheduleComplete[i].round}`)

            scheduleComplete[i].linkCircuit = circuitInfoWikiData[3][0]
            //console.log(scheduleComplete[i].linkCircuit)
        }
        
        //console.log("scheduleComplete")
        console.log(scheduleComplete)
        
        scheduleComplete.forEach((gp) => {
            const cell = document.createElement("tr")//Fila de contenido
            const round = document.createElement("td")//Columna de contenido
            const race = document.createElement("td")//Columna de contenido
            const circuit = document.createElement("td")//Columna de contenido
            circuit.classList.add("rightPoints")
            const date = document.createElement("td")//Columna de contenido

            round.textContent = gp.round
            race.innerHTML = `${gp.gpName} <a href="${gp.linkGPName}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height=".94em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#e22522}</style><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></a>`
            circuit.innerHTML = `${gp.circuit} <a href="${gp.linkCircuit}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height=".94em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#e22522}</style><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></a>`
            date.textContent = gp.date

            cell.appendChild(round)
            cell.appendChild(race)
            cell.appendChild(circuit)
            cell.appendChild(date)

            div.appendChild(cell)
        })
        const p = document.createElement("p")
        p.classList.add("informationSeasonP")
        p.innerHTML = `SCHEDULE 2024 FORMULA 1`
        informationSeason.appendChild(p)
    } catch(error) {
        console.log(error)
    }
}

datosApi()