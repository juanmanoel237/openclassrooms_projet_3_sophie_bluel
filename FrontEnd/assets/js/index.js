const catUrl = "http://localhost:5678/api/categories";
const worksUrl = "http://localhost:5678/api/works";

getWorks();
getCategories();

// Fonction pour récupérer les différents travaux de la bdd

async function getWorks() {
  try {
    const res = await fetch(worksUrl);
    const data = await res.json();
    let works = data;
    localStorage.setItem("travaux", JSON.stringify(data));
    createDocWorks(works);
  } catch (error) {
    console.log("Error fetching works:", error);
  }
}

// Fontion pour afficher tous les projets sous le filtre tous

function showAllWorks() {
  const works = JSON.parse(localStorage.getItem("travaux"));
  createDocWorks(works);
}

// Fonction pour récupérer les différentes catégories de l'API

async function getCategories() {
  try {
    const res = await fetch(catUrl);
    const data = await res.json();

    //On garde les données dans la mémoire locale du navigateur
    localStorage.setItem("categories", JSON.stringify(data));

    const fragment = document.createDocumentFragment();
    // On fait une boucle forEach pour afficher
    //dynamiquement les differentes catégories avec leurs liens
    data.forEach((category) => {
      const link = document.createElement("a");
      link.textContent = category.name;
      link.classList.add("subcat");
      link.setAttribute("tabindex", "0");
      link.className.replace("active", "");
      link.addEventListener("click", () => findBycategory(category.id));
      fragment.appendChild(link);
    });
    document.getElementById("category").appendChild(fragment);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
}

// Fonction pour filtrer les travaux par catégories
function findBycategory(id) {
  const works = JSON.parse(localStorage.getItem("travaux"));
  const workList = works.filter((work) => work.category.id === id);
  console.log(workList);
  createDocWorks(workList);
}

// Fonction pour afficher dynamiquement les projets dans la
function createDocWorks(works) {
  const fragment = document.createDocumentFragment();
  const gallery = document.getElementsByClassName("gallery")[0];

  gallery.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.src = work.imageUrl;
    img.crossOrigin = "anonymus";

    const caption = document.createElement("figcaption");
    caption.textContent = work.title;
    fragment.appendChild(figure);
    figure.appendChild(div);
    div.appendChild(img);
    div.appendChild(caption);
  });
  gallery.appendChild(fragment);
}
