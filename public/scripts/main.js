const title = document.querySelectorAll(".userName");
const email = document.querySelectorAll(".userEmail");
const logout = document.getElementById("logout");

const fetchUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login.html";
    return;
  }

  const response = await fetch(`http://127.0.0.1:3000/getMyProfile`, {
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

  title.forEach(element => {
    element.innerHTML = user.name;
  });
  email.forEach(element => {
    element.innerHTML = user.email;
  });

  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    if (!localStorage.getItem("token")) {
      console.log("Token successfully removed");
    }
    window.location.href = "/login.html";
  });
};

fetchUser();