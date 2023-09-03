const form = document.getElementById("form").addEventListener("submit", submit => {
    const div = document.getElementById("contenido")
    const informationSeason = document.getElementById("informationSeason")
    const scheduleYear = document.getElementById("scheduleYear").value

    submit.preventDefault()

    const table = document.createElement("tr")
    div.appendChild(table)

    const datosApi = async () => {
        try {
            let newDateGPTime = "", timeUTCFull = "", timeARGFull = ""

            const respuesta = await fetch(`https://ergast.com/api/f1/${scheduleYear}.json`, {
                "method": "GET"
            })
            
            const data = await respuesta.json()
            console.log(data)
    
            const eachGP = await data.MRData.RaceTable.Races
            const season = await data.MRData.RaceTable.season
            const f1 = await (data.MRData.series).toUpperCase()
            console.log(eachGP)
    
            eachGP.forEach((gp) => {
                
                // Dates and TimeZones formatter section
                if(gp.date) {
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
        
                    newDateGPTime = `${dayName}, ${day} ${monthName}`
                    //console.log(newDateGPTime)

                    if(gp.time) {
                        // Formateo de tiempo UTC
                        let time = new Date(gp.date)
                        
                        let timeUTCHours = gp.time.slice(0, 3)
                        let timeUTCMinutes = gp.time.slice(3, 5)
            
                        timeUTCFull = `${timeUTCHours}${timeUTCMinutes}`
            
                        // Formateo de tiempo MX
                        // Calculamos la diferencia horaria entre UTC y MX
                        let numberTime = gp.time.slice(0, 2)
                        let utcDifferenceWithMX = numberTime - 6
                        let timeARGHours = 0 + utcDifferenceWithMX
                        let timeARGMinutes = gp.time.slice(3, 5)
                        
                        if(timeARGHours == 0) timeARGHours = 0
                        if(timeARGHours < 0) timeARGHours = 1
                        if(timeARGHours < 10 && timeARGHours >= 0) timeARGHours = `0${timeARGHours}`
                        if(timeARGMinutes < 10) timeARGMinutes = `0${timeARGMinutes}`
            
                        timeARGFull = `${timeARGHours}:${timeARGMinutes}`
                        // console.log(timeUTCFull)
                        
                        // console.log(timeARGFull)
                    }
                }
                
                // Verificación de contenido en cada sección para agregar información
                const cell = document.createElement("tr")//Fila de contenido
                
                if(gp.round !== null) {
                    const round = document.createElement("td")//Columna de contenido
                    round.textContent = gp.round
                    cell.appendChild(round)
                }
                
                if(gp.raceName !== null && gp.url !== null) {
                    const race = document.createElement("td")//Columna de contenido
                    race.innerHTML = `${gp.raceName} <a href="${gp.url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height=".94em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#e22522}</style><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></a>`
                    cell.appendChild(race)
                }

                if(gp.round !== null && gp.url !== null) {
                    const circuit = document.createElement("td")//Columna de contenido
                    circuit.innerHTML = `${gp.Circuit.circuitName} <a href="${gp.Circuit.url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height=".94em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#e22522}</style><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg></a>`
                    cell.appendChild(circuit)
                }
                
                if(gp.date !== null) {
                    const date = document.createElement("td")//Columna de contenido
                    date.textContent = newDateGPTime
                    cell.appendChild(date)
                }
                
                if(gp.time) {
                    const timeUTC = document.createElement("td")//Columna de contenido
                    timeUTC.classList.add("rightPoints")
                    timeUTC.textContent = `${timeUTCFull}hs`
                    cell.appendChild(timeUTC)
                }

                if(gp.time) {
                    const timeARG = document.createElement("td")
                    timeARG.textContent = `${timeARGFull}hs`
                    cell.appendChild(timeARG)
                }
                
                div.appendChild(cell)
    
                // const infoButton = info.querySelector(".infoButton")
    
                // infoButton.addEventListener("click", () => {
                //     let circuitNameLS = gp.Circuit.circuitName
                //     localStorage.setItem("circuitNameLS", circuitNameLS)
                // })
            })
            
            // FALTA CREAR LAS TABLAS NECESARIAS YA QUE NO DESDE 1950 QUE HAY TANTOS DATOS, HAY TABLAS QUE SE QUEDAN INCOMPLETAS
            if(eachGP.round !== null) {
                const th = document.createElement("th")
                th.classList.add("right")
                th.textContent = "Round"
                table.appendChild(th)
            }
            if(eachGP.raceName !== null && eachGP.url !== null) {
                const th = document.createElement("th")
                th.classList.add("right")
                th.textContent = "Race"
                table.appendChild(th)
            }
            if(eachGP.round !== null && eachGP.url !== null) {
                const th = document.createElement("th")
                th.classList.add("right")
                th.textContent = "Circuit"
                table.appendChild(th)
            }
            if(eachGP.date !== null) {
                const th = document.createElement("th")
                th.classList.add("right")
                th.textContent = "Date"
                table.appendChild(th)
            }
            if(eachGP.time !== null) {
                if(timeUTCFull) {
                    const th = document.createElement("th")
                    th.classList.add("right")
                    th.textContent = "Time(UTC)"
                    table.appendChild(th)
                }
                if(timeARGFull) {
                    const th = document.createElement("th")
                    th.classList.add("right")
                    th.textContent = "Time(ARG)"
                    table.appendChild(th)
                }
            }
            if(season !== null) {
                const p = document.createElement("p")
                p.classList.add("informationSeasonP")
                p.innerHTML = `SCHEDULE ${season} FORMULA 1`
                informationSeason.appendChild(p)
            }

        } catch(error) {
            console.log(error)
        }
    }

    datosApi()
})