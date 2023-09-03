const form = document.getElementById("form").addEventListener('submit', submit => {
    const div = document.getElementById("contenido")
    const season = document.getElementById("season").value
    
    submit.preventDefault()

    setTimeout(() => {
        const table = document.createElement("tr")
        for(let i=1; i<=5; i++) {
            const th = document.createElement("th")
            th.classList.add("right")

            switch(i) {
                case 1:
                    th.textContent = "Pos."
                    break;
                case 2:
                    th.textContent = "Driver"
                    break;
                case 3:
                    th.textContent = "Team"
                    break;
                case 4:
                    th.textContent = "Points"
                    break;
                case 5:
                    th.textContent = "Info."
                    break;
            }
            table.appendChild(th)
        }
        div.appendChild(table)
    }, 500)

    const datosApi = async () => {
        try {
            const respuesta = await fetch(`https://v1.formula-1.api-sports.io/rankings/drivers?season=${season}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v1.formula-1.api-sports.io",
                    "x-rapidapi-key": "4d83cea5868cb157a83ff598cac5ba8f"
                }
            })

            const data = await respuesta.json()
            //console.log(data)

            const ranking = data.response
            //console.log(ranking)//Imprimimos solamente la respuesta que nos da la informacion mas importante sobre nuestra peticion hecha

            ranking.forEach(driver => {
                if(driver.points == null){
                    driver.points = 0
                }
            
                //Creamos las constantes: cell, es para crear cada fila("tr") y los ("td") son cada una de las columnas
                const cell = document.createElement("tr")//Fila de contenido
                const position = document.createElement("td")//Columna de contenido
                const drive = document.createElement("td")//Columna de contenido
                const team = document.createElement("td")//Columna de contenido
                const points = document.createElement("td")//Columna de contenido
                points.classList.add("rightPoints")
                const info = document.createElement("td")

                //A cada una de las columnas le indicamos que van a tener un contenido y ese se va buscar array que convertimos a JSON
                position.textContent = driver.position
                drive.textContent = driver.driver.name
                team.textContent = driver.team.name
                points.textContent = driver.points
                info.innerHTML = `<a class="infoButton" href="../pages/driverProfile.html" target="_blank">View profile</a>`

                //Mediante el metodo appendChild() le agregamos cada contenido de las diferentes columnas a la fila que le corresponda
                cell.appendChild(position)
                cell.appendChild(drive)
                cell.appendChild(team)
                cell.appendChild(points)
                cell.appendChild(info)

                //Traemos por el HTML donde vamos a mostrar los datos y le pasamos como parametro al metodo cell, que serian todas las filas, con sus respectivas columnas del ranking
                div.appendChild(cell)

                const infoButton = info.querySelector(".infoButton")

                infoButton.addEventListener("click", () => {
                    let driverSelected = driver.driver.id
                    //console.log(`ID: ${driverSelected}`)
                    localStorage.setItem("driverSelected", driverSelected)
                })
            })

            const p = document.createElement("p")
            p.classList.add("informationSeasonP")
            p.innerHTML = `RANKING DRIVERS FORMULA 1 SEASON 2023`
            informationSeason.appendChild(p)
        } catch(error) {
            console.log(error)
        }
    }
    datosApi()
})