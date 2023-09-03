const form = document.getElementById("form").addEventListener("submit", submit => {
    const div = document.getElementById("contenido")
    let circuit = document.getElementById("circuit").value

    submit.preventDefault()

    const datosApi = async () => {
        try {
            // Fetch API
            const respuesta = await fetch(`https://v1.formula-1.api-sports.io/circuits?id=${circuit}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.formula-1.api-sports.io",
					"x-rapidapi-key": "4f885653079f2f027cce89f2d445f6d1"
                }
            })

            const data = await respuesta.json()
            //console.log(data)

            // Variables
            let circuitName = data.response[0].name
            let circuitImage = data.response[0].image
            //
            let circuitCompetitionName = data.response[0].competition.name
            let circuitCompetitionLocationCountry = data.response[0].competition.location.country
            let circuitCompetitionLocationCity = data.response[0].competition.location.city
            //
            let circuitFirstGP = data.response[0].first_grand_prix
            let circuitLaps = data.response[0].laps
            let circuitLength = data.response[0].length
            let circuitRaceDistance = data.response[0].race_distance
            //
            let circuitLapRecordTime = data.response[0].lap_record.time
            let circuitLapRecordDriver = data.response[0].lap_record.driver
            let circuitLapRecordYear = data.response[0].lap_record.year
            //
            let circuitCapacity = data.response[0].capacity
            let circuitOpened = data.response[0].opened

            // Mostrar contenido en el div
            setTimeout(() => {
                div.innerHTML =
                `
                <h2>${circuitName}</h2>
                <div class="containerImg">
                    <img src="${circuitImage}">
                </div>
                
                <h2>Competition</h2>
                
                <div class="containerDiv cMargin">
                    <div class="contentDiv1 content" style="z-index:1">
                        <h3>Name</h3><p>${circuitCompetitionName}</p>
                        <h3>Country</h3><p>${circuitCompetitionLocationCountry}</p>
                        <h3>City</h3><p>${circuitCompetitionLocationCity}</p>
                    </div>
                    <div class="contentDiv2 content" style="z-index:2">
                        <h3>First Grand Prix</h3><p>${circuitFirstGP}</p>
                        <h3>Laps</h3><p>${circuitLaps}</p>
                        <h3>Length</h3><p>${circuitLength}</p>
                        <h3>Race Distance</h3><p>${circuitRaceDistance}</p>
                    </div>
                </div>

                <h2>Lap Record</h2>
                <div class="containerDiv cMargin">
                    <h3>Time</h3><p>${circuitLapRecordTime}</p>
                    <h3>Driver</h3><p>${circuitLapRecordDriver}</p>
                    <h3>Year</h3><p>${circuitLapRecordYear}</p>
                </div>

                <div class="c">
                    <div class="contentDiv1">
                        <h3>Capacity</h3><p>${circuitCapacity}</p>
                    </div>
                    <div class="contentDiv2">
                        <h3>Year Opened</h3><p>${circuitOpened}</p>
                    </div>
                </div>
                `
            }, 1000)
            const p = document.createElement("p")
            p.classList.add("informationSeasonP")
            p.innerHTML = `${(circuitName).toUpperCase()} INFORMATION`
            informationSeason.appendChild(p)
        } catch(error) {
            console.log(error)
        }
    }
    // Invocamos la función
    datosApi()

})