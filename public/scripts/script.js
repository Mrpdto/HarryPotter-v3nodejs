"use strict";

let rechercheInput = document.querySelector("#search");
let rechercheResult = document.querySelector(".boite");
let dataArray = [];


document.addEventListener('click', (e) => {

  const target = e.target;
  
  if (target.matches(".filterBtn")) {

    const isActive = document.querySelector(".filterBtn.active");

    if (isActive && isActive !== target) {

      // On rend actif le filtre 
      isActive.classList.remove("active");
      target.classList.add("active");

      // On récupère la maison
      const filter = target.getAttribute("data-filter").toLowerCase();
      console.log(filter);
      const allCards = document.querySelectorAll('.carte');

      if (filter.toLowerCase() === "all") {
        allCards.forEach(card => {
          card.classList.remove("hidden");
        })

      } else {
        allCards.forEach(card => {
          if (card.getAttribute('data-house').toLowerCase() === filter) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        })
      }

    }

  } else if (target.closest('.carte')) {
    const slug = target.closest('.carte').getAttribute('slug');
    window.location.href = "carte.html?slug=" + slug;
  }

})


async function fetchHarry() {
  const reponse = await fetch('https://hp-api.lainocs.fr/characters')
  dataArray = await reponse.json()
  return dataArray;
}


// Se lance au chargement de la page
// Permet de créer les cartes pour chaque perso de l'api
function creerCartes(cards) {
      
  cards.forEach(card => {
    
    const cartePerso = document.createElement("div")
    cartePerso.classList.add("carte");
    cartePerso.setAttribute('data-house', card.house)
    cartePerso.setAttribute('data-name', card.name)
    cartePerso.setAttribute('slug', card.slug)
  
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

    rechercheResult.appendChild(cartePerso)
    
  });

}

// Function for the search input.
rechercheInput.addEventListener('input', (e) => {

  // Put all the cards hidden
  const allCards =  document.querySelectorAll('.carte');
  allCards.forEach(card => {
    card.classList.add('hidden');
  });

  // then get the search value in lowercase to use it for the filter (we remove the whites spaces too)
  const searchValue =  e.target.value.toLowerCase().replace(/\s/g, "");

  // if not empty, let's filter !
  if(searchValue) {
    let newArray = dataArray.filter(perso => perso.name.toLowerCase().startsWith(searchValue.toLowerCase()));
    
    // looking for the card
    if(newArray.length > 0) {
      for (let i = 0; i < newArray.length; i++) {
        const cardFiltered = document.querySelector(`[data-name="${newArray[i].name}"]`);
        cardFiltered.classList.remove('hidden');
      }
    }

  // if the search value is empty, put all cards visible. 
  } else {
    allCards.forEach(card => {
      card.classList.remove('hidden');
    })
  }
  
  
})

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


async function getLastcard() {

  const response = await fetch("/lastcard");
  const data = await response.json();
  const card = data.message
  // console.log("house:", card);
}


// IIFE : Immediately Invoked Function Expression 
(async () => {
  
  const cards = await fetchHarry()
  console.log(cards);
  creerCartes(cards)  
  
})();

getLastcard()