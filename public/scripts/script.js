"use strict";

async function fetchHarry() {
  const reponse = await fetch('https://hp-api.lainocs.fr/characters')
  return await reponse.json()
}

let filtreAll = document.querySelector(".filterAll")
let filtreGry = document.querySelector(".filterGry")
let filtreSerp = document.querySelector(".filterSerp")
let filtreSerd = document.querySelector(".filterSerd")
let filtrePouf = document.querySelector(".filterPouf")

let rechercheInput = document.querySelector("#search");
let rechercheResult = document.querySelector(".boite");


// Se lance au chargement de la page
// Permet de créer les cartes pour chaque perso de l'api
async function creerCartes() {
  let api = await fetchHarry()
  
  let filteredApi;

  

  if (filtreGry.classList.contains("active")) {
    let gryffindor = api.filter(card => card.house === "Gryffindor" || card.house === "Grynffindor" || card.house === "Grinffindor" || card.house === "Gyffindor");
    filteredApi = gryffindor;
    
  }
  if (filtreSerp.classList.contains("active")) {
    let slytherin = api.filter(card => card.house === "Slytherin");
    filteredApi = slytherin;
  }
  if (filtreSerd.classList.contains("active")) {
    let ravenclaw = api.filter(card => card.house === "Ravenclaw");
    filteredApi = ravenclaw;
  }
  if (filtrePouf.classList.contains("active")) {
    let hufflepuff = api.filter(card => card.house === "Hufflepuff");
    filteredApi = hufflepuff;
  }

  // If no filters are active, show all cards
  if (filtreAll.classList.contains("active") && rechercheInput.value === "") {
    filteredApi = api;
  }

  console.log(filteredApi);
  document.querySelector(".boite").innerHTML = "";

  rechercheInput.addEventListener("input", e =>{
    rechercheResult.innerHTML = "";
    const value = e.target.value.toLowerCase();
    let barreRecherche = api.filter(card => card.name.toLowerCase().includes(value));
    filteredApi = barreRecherche;
    console.log(filteredApi);
  })
  console.log(filteredApi);
  
  filteredApi.forEach(card => {
    
    const cartePerso = document.createElement("div")
    cartePerso.className = "carte";
    cartePerso.setAttribute('data-name', card.house)
    cartePerso.setAttribute('slug',card.slug)
  
    cartePerso.innerHTML = `
    <div class="tag">
        <span class="${card.house ? card.house : "autre"}">${card.house ? card.house : "autre"}</span>
        <span class="fav"><i class="fa-regular fa-heart"></i></span>
    </div>
    <img src="${card.image}" alt="" draggable="false">
    <div class="carte-texte">
        <h1 class="nom">${card.name}</h1>
        <p class="acteur">${card.actor}</p>
    </div>
    `

    let carteTexte = cartePerso.querySelector(".carte-texte");
    let carteImage = cartePerso.querySelector("img");
    rechercheResult.appendChild(cartePerso)

    //quand on clique sur une carte: redirige vers une page de carte avec comme parametre le slug(l'api utilise slug et non l'id) pour avoir une page de carte du personnage sur lequel on a cliqué
    carteTexte.addEventListener("click", function(){
      window.location.href = "carte.html?slug=" + card.slug;
    })
    carteImage.addEventListener("click", function(){
      window.location.href = "carte.html?slug=" + card.slug;
    })
    
  });
}




//favoris btn
// let favoris = document.querySelectorAll(".fav");
// element.addEventListener("click", function(){
//   favoris.forEach(element => {
//     element.classList.toggle("fa-solid");
//   })
// });

//Menu burger
document.addEventListener("DOMContentLoaded", function () {
  //obtient les references de licone du menu burger, du menu de navigation et de l'overlay
  const headerMobile = document.querySelector(".header-mobile");
  const navMobile = document.querySelector(".nav-mobile");
  const navMobileClose = document.querySelector(".nav-mobile-close")
  const mobileOverlay = document.querySelector(".mobile-overlay")
  //ajoute un evenement quand on clic sur l'icone du menu burger
  headerMobile.addEventListener("click", function () {
    //bascule la clsse 'active' pour affiche/masquer le menu de navigation et l'overlay
    navMobile.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
  });
  //ajoute un evenement quand on clic sur l'icone de croix dans le menu de navigation
  navMobileClose.addEventListener("click", function () {
    //bascule la clsse 'active' pour affiche/masquer le menu de navigation et l'overlay
    navMobile.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
  });
  //ajoute un evenement quand on clic sur l'overlay
  mobileOverlay.addEventListener("click", function () {
    //bascule la clsse 'active' pour affiche/masquer le menu de navigation et l'overlay
    navMobile.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
  });
});

//echange
document.addEventListener("DOMContentLoaded",function (){
  let btnFlottant = document.querySelector(".btnFlottant")
  let echangeForm = document.querySelector(".echangeForm")
  let closeEchanges = document.querySelector(".closeEchanges")
  btnFlottant.addEventListener("click",function(){
    echangeForm.classList.toggle("active");
  })
  closeEchanges.addEventListener("click", function(){
    echangeForm.classList.toggle("active");
  })
})






console.log(nom, pseudo)


// Dark Mode
let theme = "light";
document.addEventListener("DOMContentLoaded", function (){
  let darkMode = document.querySelector(".dark-mode") 
  let darkTexte = document.querySelector(".dark-txt");
  let body = document.querySelector("body");
  let header = document.querySelector(".header");
  let icon = document.querySelectorAll("#menu")
  let headerMobile = document.querySelector(".header-mobile");
  let mainTitre = document.querySelector(".titre");
  let navMobile = document.querySelector(".nav-mobile");
  let navMobileClose = document.querySelector(".nav-mobile-close");
  let container= document.querySelector(".container");
  let container2 = document.querySelector(".containerInscription")
  let formTexte = document.querySelectorAll(".formTexte")
  let input = document.querySelectorAll("form .box input");
  let input2 = document.querySelectorAll("#form2 .boxInscription input")
  let close = document.querySelector(".close");
  let close2 = document.querySelector(".closeIncription");
  let menuT = document.querySelectorAll(".nav-mobile-menu a");
  let profilButton = document.querySelectorAll(".profilButton");
  let lienSocial = document.querySelectorAll(".liens");
  let filtreBtn = document.querySelector(".filtre-btn");
  let cartefiltreBtn = document.querySelectorAll(".cartes-filtres button");
  let RechercheBarre = document.querySelector(".barre-recherche");
  let inputBarre = document.querySelector(".barre-recherche input");
  let txtBibliotheque = document.querySelector(".bibliotheque-description");
  let bosterCarte = document.querySelector(".droite .boster-texte");
  let bosterPage = document.querySelector("#boster");
  let btnFlottant = document.querySelector(".btnFlottant")
  let echangeForm = document.querySelector(".echangeForm")
  let echangeClose = document.querySelector(".closeEchanges")
  let boxEchangeInput = document.querySelectorAll(".boxEchanges");

  darkMode.addEventListener("click",function (){
    if (theme=="light"){theme = "dark"}
    else{theme = "light"};
    darkMode.classList.toggle("dark");
    darkTexte.classList.toggle("dark");
    body.classList.toggle("dark");
    header.classList.toggle("dark");
    icon.forEach(element =>{
      element.classList.toggle("dark")
    })
    headerMobile.classList.toggle("dark");
    mainTitre.classList.toggle("dark");
    navMobile.classList.toggle("dark");
    navMobileClose.classList.toggle("dark");
    container.classList.toggle("dark");
    container2.classList.toggle("dark");
    input.forEach(element =>{
      element.classList.toggle("dark");
    })
    input2.forEach(element =>{
      element.classList.toggle("dark")
    })
    formTexte.forEach(element =>{
      element.classList.toggle("dark")
    })
    close.classList.toggle("dark");
    close2.classList.toggle("dark");
    menuT.forEach(element =>{
      element.classList.toggle("dark")
    })
    profilButton.forEach(element =>{
      element.classList.toggle("dark")
    })
    lienSocial.forEach(element =>{
      element.classList.toggle("dark")
    })
    filtreBtn.classList.toggle("dark")
    cartefiltreBtn.forEach(element =>{
      element.classList.toggle("dark")
    })
    RechercheBarre.classList.toggle("dark")
    inputBarre.classList.toggle("dark")
    txtBibliotheque.classList.toggle("dark")
    bosterCarte.classList.toggle("dark")
    bosterPage.classList.toggle("dark")
    btnFlottant.classList.toggle("dark")
    echangeForm.classList.toggle("dark")
    echangeClose.classList.toggle("dark")
    boxEchangeInput.forEach(element =>{
      element.classList.toggle("dark")
    })
  })

  darkMode.addEventListener("click",function (){
    let monLogo = document.querySelector("img").getAttribute('src');
    if (monLogo =="img/Harry_potter_logo.png"){
      document.querySelector("img").src = "img/Harry_potter_logo_blanc.png";
    } else {
      document.querySelector("img").src = "img/Harry_potter_logo.png";
    }
  })

})


//Barre de recherche (sans api)




creerCartes();



//Filtre (sans api)
let filtreEntree = document.querySelector(".filtre-btn");
let filtres = document.querySelector(".cartes-filtres");
let barreRecherche = document.querySelector(".barre-recherche")
let barreLabel = document.querySelector(".barre-recherche label")

barreLabel.addEventListener("click", function(){
  filtres.classList.toggle("activ");
  filtreEntree.classList.toggle("activ");
  barreRecherche.classList.toggle("active");
})

filtreEntree.addEventListener("click", function(){
  filtres.classList.toggle("activ");
  filtreEntree.classList.toggle("activ");
  barreRecherche.classList.toggle("active");
})


const filtreButton = document.querySelectorAll('.cartes-filtres button');
const filtreCarte = document.querySelectorAll('.carte');

const estFiltreCarte = (e) =>{
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");
  // console.log(e.target)

  // filtreCarte.forEach(card => {
  //   card.classList.add("hide");

  //   if (card.dataset.name === e.target.dataset.name || e.target.dataset.name === "tous"){
  //     card.classList.remove("hide");
  //   }
  // });
}

filtreButton.forEach(button => button.addEventListener("click", estFiltreCarte))

filtreAll.addEventListener("click", creerCartes);
filtreGry.addEventListener("click", creerCartes);
filtreSerp.addEventListener("click", creerCartes);
filtreSerd.addEventListener("click", creerCartes);
filtrePouf.addEventListener("click", creerCartes);


async function getLastcard() {

  const response = await fetch("/lastcard");
  const data = await response.json();
  const card = data.message
  console.log("house:", card);
}

getLastcard()