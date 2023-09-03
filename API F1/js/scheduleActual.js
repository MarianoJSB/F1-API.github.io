const div = document.getElementById('contenido')

const table = document.createElement("tr")
for(let i=1; i<=6; i++) {
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
        case 5:
            th.textContent = "Time(UTC)"
            break;
        case 6:
            th.textContent = "Time(ARG)"
            break;
    }
    table.appendChild(th)
}
div.appendChild(table)


const datosApi = async () => {
    try {
        const respuesta = await fetch(`https://ergast.com/api/f1/current.json`, {
            "method": "GET"
        })
        
        const data = await respuesta.json()
        console.log(data)

        const eachGP = await data.MRData.RaceTable.Races
        // console.log(eachGP)

        eachGP.forEach((gp) => {

            let stringDate = new Date(gp.date)
            // console.log("original gp date")
            // console.log(gp.date)
            // console.log("date from " + gp.raceName)
            // console.log(stringDate)

            let dayNumber = stringDate.getDay()
            let daysWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            
            let monthNumber = stringDate.getMonth()
            let monthsYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

            // Formateo de Fecha "dn, dd mm"
            let dayName = daysWeek[dayNumber]
            let day = stringDate.getDate()
            let monthName = monthsYear[monthNumber]

            if(day < 10) day = `0${day}`

            let newDateGPTime = `${dayName}, ${day} ${monthName}`
            //console.log(newDateGPTime)

            // Formateo de tiempo UTC
            let time = new Date(gp.date)
            
            let timeUTCHours = gp.time.slice(0, 3)
            let timeUTCMinutes = gp.time.slice(3, 5)

            let timeUTCFull = `${timeUTCHours}${timeUTCMinutes}`

            // Formateo de tiempo MX
            // Calculamos la diferencia horaria entre UTC y MX
            let numberTime = gp.time.slice(0, 2)
            let utcDifferenceWithMX = numberTime - 6
            let timeARGHours = 0 + utcDifferenceWithMX
            let timeARGMinutes = time.getUTCMinutes()
            
            if(timeARGHours == 0) timeARGHours = 0
            if(timeARGHours < 0) timeARGHours = 1
            if(timeARGHours < 10 && timeARGHours >= 0) timeARGHours = `0${timeARGHours}`
            if(timeARGMinutes < 10) timeARGMinutes = `0${timeARGMinutes}`

            let timeARGFull = `${timeARGHours}:${timeARGMinutes}`
            // console.log(gp.raceName)
            // console.log("timeUTCFull")
            // console.log(timeUTCFull)

            // console.log("timeARGFull")
            // console.log(timeARGFull)

            const cell = document.createElement("tr")//Fila de contenido
            const round = document.createElement("td")//Columna de contenido
            const race = document.createElement("td")//Columna de contenido
            const circuit = document.createElement("td")//Columna de contenido
            const date = document.createElement("td")//Columna de contenido
            const timeUTC = document.createElement("td")//Columna de contenido
            timeUTC.classList.add("rightPoints")
            const timeARG = document.createElement("td")

            round.textContent = gp.round
            race.innerHTML = `${gp.raceName} <a href="${gp.url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height=".94em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#e22522}</style><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></a>`
            circuit.innerHTML = `${gp.Circuit.circuitName} <a href="${gp.Circuit.url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height=".94em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#e22522}</style><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></a>`
            date.textContent = newDateGPTime
            timeUTC.textContent = `${timeUTCFull}hs`
            timeARG.textContent = `${timeARGFull}hs`
            
            cell.appendChild(round)
            cell.appendChild(race)
            cell.appendChild(circuit)
            cell.appendChild(date)
            cell.appendChild(timeUTC)
            cell.appendChild(timeARG)

            div.appendChild(cell)

            // const infoButton = info.querySelector(".infoButton")

            // infoButton.addEventListener("click", () => {
            //     let circuitNameLS = gp.Circuit.circuitName
            //     localStorage.setItem("circuitNameLS", circuitNameLS)
            // })
        })
        const p = document.createElement("p")
        p.classList.add("informationSeasonP")
        p.innerHTML = `SCHEDULE 2023 FORMULA 1`
        informationSeason.appendChild(p)
    } catch(error) {
        console.log(error)
    }
}

datosApi()