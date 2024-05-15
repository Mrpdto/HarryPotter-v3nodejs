const formulaire = document.getElementById("inscription-form");
const email = document.getElementById("email");
const password = document.getElementById("password");


formulaire.addEventListener("submit", async (event) => {

  event.preventDefault();

  if (document.querySelector("input[name='signup']")) {
    await inscription()
  } else {
    await connexion()
  }

})


async function inscription() {

  const name = document.getElementById("name");

  try {
    
    const response = await fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
      }),
    });
  
    if (response.ok) {
      const result = await response.json();
      const token = result.token;
      localStorage.setItem("token", token);
      window.location.href = "/index.html";
    } else {
      const result = await response.json();
      alert(result.message);
    }

  } catch (error) {
    
    alert(error.message)
  }
}

async function connexion() {
  
  try {
    
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
  
    if (response.ok) {
      const result = await response.json();
      const token = result.token;
      localStorage.setItem("token", token);
      window.location.href = "/index.html";
    } else {
      const result = await response.json();
      alert(result.message);
    }

  } catch (error) {
    
    alert(error.message)
  }
}