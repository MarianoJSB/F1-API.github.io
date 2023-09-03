const div = document.getElementById("contenido")

const teamSelected = localStorage.getItem("teamSelected")

const datosApi = async () => {
    try {
        const respuesta = await fetch(`https://v1.formula-1.api-sports.io/teams?id=${teamSelected}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v1.formula-1.api-sports.io",
                "x-rapidapi-key": "4d83cea5868cb157a83ff598cac5ba8f"
            }
        })

        let data = await respuesta.json()
        //console.log(data)
        data = data.response[0]

        let profile = {
            name : data.name,
            logo : data.logo,
            base : data.base,
            firstTeamEntry : data.first_team_entry,
            worldChampionships : data.world_championships,
            highestRaceFinishPosition : data.highest_race_finish.position,
            highestRaceFinishNumber : data.highest_race_finish.number,
            polePositions : data.pole_positions,
            fastestLaps : data.fastest_laps,
            president : data.president,
            director : data.director,
            technicalManager : data.technical_manager,
            chassis : data.chassis,
            engine : data.engine,
            tyres : data.tyres
        }
        if(data.base == null){
            profile.base = "-"
        }
        if(data.first_team_entry == null){
            profile.firstTeamEntry = "-"
        }
        if(data.world_championships == null){
            profile.worldChampionships = "-"
        }
        if(data.highest_race_finish.position == null){
            profile.highestRaceFinishPosition = "-"
        }
        if(data.highest_race_finish.number == null){
            profile.highestRaceFinishNumber = "-"
        }
        if(data.pole_positions == null){
            profile.polePositions = "-"
        }
        if(data.fastest_laps == null){
            profile.fastestLaps = "-"
        }
        if(data.chassis == null){
            profile.chassis = "-"
        }
        setTimeout(() => {
            div.innerHTML =
            `
            <h1>${profile.name}</h1>
            <div class="containerImg">
                <img src="${profile.logo}" alt="${profile.name}">
            </div>
    
            <h2>Information</h2>
    
            <div class="containerDiv cMargin">
                <div class="contentDiv1 content" style="z-index:1">
                    <h3>Location</h3><p>${profile.base}</p>
                    <h3>First Team Entry</h3><p>${profile.firstTeamEntry}</p>
                    <h3>President</h3><p>${profile.president}</p>
                </div>
                <div class="contentDiv2 content" style="z-index:2">
                    <h3>Director</h3><p>${profile.director}</p>
                    <h3>Technical Manager</h3><p>${profile.technicalManager}</p>
                </div>
            </div>

            <h2>Achievements</h2>

            <div class="containerDiv cMargin">
                <div class="contentDiv1 content" style="z-index:1">
                    <h3>World Championships</h3><p>${profile.worldChampionships}</p>
                    <h3>Highest Race Finish Position</h3><p>${profile.highestRaceFinishPosition}</p>
                    <h3>Highest Race Finish Number</h3><p>${profile.highestRaceFinishNumber}</p>
                    <h3>Pole Positions</h3><p>${profile.polePositions}</p>
                </div>
                <div class="contentDiv2 content raceFinish" style="z-index:2">
                    <h3 class="tAR">Fastest Laps</h3><p>${profile.fastestLaps}</p>
                    <h3 class="tAR">Chassis</h3><p>${profile.chassis}</p>
                    <h3 class="tAR">Engine</h3><p>${profile.engine}</p>
                    <h3 class="tAR">Tyres</h3><p>${profile.tyres}</p>
                </div>
            </div>
            `
        }, 1000)
        const p = document.createElement("p")
        p.classList.add("informationSeasonP")
        p.innerHTML = `${(profile.name).toUpperCase()} INFORMATION`
        informationSeason.appendChild(p)
    } catch(error) {
        console.log(error)
    }
}
datosApi()