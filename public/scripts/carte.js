//recupere le parametre slug de l'url
let url = new URLSearchParams(window.location.search)
let slug = url.get("slug");
console.log(slug)


//appelle l'api pour le perso en question grace au slug recuppere 
async function fetchHarry() {
    const reponse = await fetch('https://hp-api.lainocs.fr/characters/'+ slug)
    const data = await reponse.json()
    return data
}

//cree la page avec les infos de l'api
async function creerPage(){
    let boite = document.createElement("div")
    boite.className = "carte";
    const api = await fetchHarry()
    boite.innerHTML = `
    <div class="visuel">
        <div class="image">
            <img src="${api.image}" alt="" draggable="false">
        </div>
    </div>
    <div class="info">
        <h1 class="titre">${api.name}</h1>
        <div class="carte-infos">
        <p class="acteur">Acteur: ${api.actor}</p>
        <p class="maison">Maison: ${api.house}</p>
        <p class="Role">Role: ${api.role}</p>
    </div>
    `;

    document.querySelector('.centre').appendChild(boite)

    return api
}

async function updateLastCard() {

    const personnage = await creerPage()

    const response = await fetch("/lastcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        lastHouseVisited: personnage.house  
      }),
  
    });
    const data = await response.json();
    const card = data.message
    console.log("house:", card);
}

updateLastCard()