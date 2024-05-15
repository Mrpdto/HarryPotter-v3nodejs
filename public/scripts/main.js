const title = document.querySelectorAll(".userName");
const email = document.querySelectorAll(".userEmail");
const logout = document.getElementById("logout");
const token = localStorage.getItem("token");
const btnBooster = document.getElementById("btnBooster");

// Event Delegation
document.addEventListener('click', (e) => {

  const target = e.target;

  if (target.id === 'logout') {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
  }
})

btnBooster.addEventListener('click', async () => {
  await openBooster()
})

const fetchUser = async () => {

  const response = await fetch(`/getMyProfile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    window.location.href = "/login.html";
    return;
  } else if (response.status === 403) {
    window.location.href = "/login.html";
    return;
  }

  const user = await response.json();

  return user;

};

const fetchCards = async () => {

  try {
    
    const response = await fetch('/user/cards', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    if (response.ok) {
      const { cards, total } = await response.json();
      return { cards, total }
    } else  {
      const { message } = await response.json();
      alert(message)  
    }

  } catch (error) {
    
  }

};

const openBooster = async () => {

  try {
    
    const response = await fetch('/booster/open', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })

    if (response.ok) {
      const { cards, nextBooster } = await response.json();
      
      boosterTimer(nextBooster)

    } else {
      const { message } = await response.json();
      alert(message)
    }

  } catch (error) {
    
    alert(error.message)
  }
}

function showUserCards(cards, total) {

  const rechercheResult = document.querySelector(".cardsContainer");

  cards.forEach(card => {
    
    const cardData = dataArray.find(el => el.id === card.cardId)

    const cartePerso = document.createElement("div")
    cartePerso.classList.add("carte");
    cartePerso.setAttribute('data-house', cardData.house)
    cartePerso.setAttribute('data-name', cardData.name)
    cartePerso.setAttribute('slug', cardData.slug)
  
    cartePerso.innerHTML = `
    <div class="tag">
      <span class="${cardData.house ? cardData.house : "autre"}">${cardData.house ? cardData.house : "autre"}</span>
    </div>
    <img src="${cardData.image}" alt="" draggable="false">
    <div class="carte-texte">
      <h1 class="nom">${cardData.name}</h1>
      <p class="acteur">${cardData.actor}</p>
    </div>
    <span class="cardQuantity">${card.quantity}</span>
    `

    rechercheResult.appendChild(cartePerso)
    
  });

  document.querySelector(".totalCardsNumber").innerHTML = total;

}

function updateProfile(user) {

  title.forEach((element) => {
    element.textContent = user.name;
  });

  email.forEach((element) => {
    element.textContent = user.email;
  });

  boosterTimer(user.nextBooster)

}

function boosterTimer(timerBooster) {

  let nextBoosterTimer = Number(timerBooster) - Date.now()

  if (nextBoosterTimer <= 0) {
    btnBooster.innerText = "Tirez"
    return;
  }

  setInterval(() => {
    const time = new Date(nextBoosterTimer)
    const hour = time.getUTCHours(time)
    const minutes = time.getUTCMinutes(time)
    const seconds = time.getUTCSeconds(time)

    btnBooster.innerText = `${hour}:${minutes}:${seconds}`
    nextBoosterTimer-= 1000;
    if (nextBoosterTimer <= 0) {
      btnBooster.innerText = "Tirez"
      clearInterval()
      return;
    }
  }, 1000) 
}


(async () => {

  const user = await fetchUser();
  updateProfile(user)
  const { cards, total } = await fetchCards();
  showUserCards(cards, total)

})();