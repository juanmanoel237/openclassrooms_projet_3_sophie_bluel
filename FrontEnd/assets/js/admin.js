const modeEdition = document.getElementsByClassName("mode-edition")[0];
const logout = document.querySelector('[href="login.html"]');
const btnEdit = document.getElementsByClassName("modifier");
const filters = document.querySelectorAll("#category");

if (isConnected()) {
  modeEdition.style.display = "flex";

  const logo = document.querySelector("#logo");
  logo.style.paddingTop = "20px";
  logo.style.fontSize = "15px";

  const headerNav = document.querySelector(".header-nav");
  headerNav.style.paddingTop = "20px";

  // Itérer sur la collection filters pour appliquer le style à chaque élément
  for (let i = 0; i < btnEdit.length; i++) {
    btnEdit[i].style.display = "flex";
  }

   // Itérer sur la collection btnEdit pour appliquer le style à chaque élément
  for (i = 0; i < filters.length; i++) {
    filters[i].style.display = "none"
  }

  logout.textContent = "logout";
  logout.setAttribute("href", "#");

  logout.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("userId");
    localStorage.removeItem("auth");
    window.location.reload();
  });
}
