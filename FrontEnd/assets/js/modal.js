// VARIABLES POUR LES SUPPRESSION DANS LA MODAL
const openGalleryModalBtn = document.querySelector("#editProjet")
const closeGalleryModalBtn = document.querySelector("#close-delete")
const modalDeleteWork = document.querySelector("#modalDelete")
const logoEditionBtn = document.querySelector(".edition-logo")

//VARAIABLES POUR LA MODAL D'AJOUT
const modalAddWork = document.querySelector("#modalAdd")
const modalAddPhoto = document.querySelector("#addPhoto")
const previousBtn = document.querySelector(".precedent")
const closeAddWorkModalBtn = document.querySelector("#close-add")

//VARIABLES POUR UPLOAD UNE IMAGE
const imageUpload = document.querySelector("#imageUpload")
const projectUpload = document.querySelector("#previewImage")
const contentUpload = document.querySelector("#previewDetails")
const projectSubmit = document.querySelector("#validAjout")
const previewBackGround = document.querySelector(".AddPhotoContainer")

const addProjectForm = document.querySelector("#add-form")

//VARIABLES POUR LA MODAL
const backgroundModal = document.querySelector("#modal")


const openGalleryModal = ()=>{
    modalDeleteWork.style.display="flex"
    backgroundModal.style.display = "block"
    addWorkModal()
}

const closeGalleryModal = ()=>{
    modalDeleteWork.style.display = "none"
    backgroundModal.style.display = "none"
}

const openAddWorkModal = ()=>{
    modalAddWork.style.display = "flex"
    backgroundModal.style.display = "block"
}

const closeAddWorkModal = ()=>{
    modalAddWork.style.display = "none"
    backgroundModal.style.display = "none"
}

//OUVRIR LES MODALS
if(logoEditionBtn){
    logoEditionBtn.addEventListener("click", openGalleryModal)
    closeAddWorkModal()
}

if(openGalleryModalBtn){
    openGalleryModalBtn.addEventListener("click", openGalleryModal)
    closeAddWorkModal()
}
if(modalAddPhoto){
    modalAddPhoto.addEventListener("click", ()=>{
        closeGalleryModal()
        openAddWorkModal()
    })
}

// FERMER LES MODALS

closeGalleryModalBtn.addEventListener("click",closeGalleryModal)
closeAddWorkModalBtn.addEventListener("click",closeAddWorkModal)

// FERMER LES MODALS EN CLIQUANT SUR L'ARRIERE PLAN

window.onclick = (e)=>{
    if(e.target==backgroundModal){
        closeGalleryModal()
        closeAddWorkModal()
    }
}

// FONCTION POUR LE BOUTON PRECEDENT

previousBtn.addEventListener("click", ()=>{
    closeAddWorkModal()
    openGalleryModal()
})

//FONCTION POUR SUPPRIMER DES PHOTOS

const deletWork = (event, id)=>{
    fetch('http://localhost:5678/api/works/' + id ,{
        method : "DELETE",
        headers : {
            Accept : 'application/json',
            'Authorization' : getAuth(),
            'Content-Type' : 'application/json',
        },
        params : {
            'id' : id
        }
    })
    .then(()=>{
        const imgDiv = event.target.parentNode
        imgDiv.remove()

        getWorks()
        
    })
    .catch((error)=>{
        console.log('Erreur: ', error);
    })
}

// FONCTION POUR AJOUTER DES PROJETS

async function sendWorkData(data) {
    const postWorkUrl = 'http://localhost:5678/api/works/';

    try {
        const res = await fetch(postWorkUrl, {
            method: 'POST',
            headers: {
                'Authorization': getAuth(),
            },
            body: data,
        });

        // Vérification du succès de la requête
        if (!res.ok) {
            throw new Error('La requête n\'a pas abouti');
        }

        // Extraction des données JSON de la réponse
        const newWorks = await res.json();

        // Utilisation des données newWorks
        /*addNewWorkModal(newWorks)*/
        addWorksGallery(newWorks)
        getWorks()
        addWorkModal()

    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
        throw error;
    }
}

async function addWorksGallery(newWork) {
    const fragment = document.createDocumentFragment();
    const gallery = document.getElementsByClassName("gallery")[0];

    // Création de l'élément figure et ses enfants pour chaque newWork
    const figure = document.createElement("figure");
    const div = document.createElement("div");
    const img = document.createElement("img");

    img.src = newWork.imageUrl;
    img.crossOrigin = "anonymous";

    const caption = document.createElement("figcaption");
    caption.textContent = newWork.title;

    figure.appendChild(div);
    div.appendChild(img);
    div.appendChild(caption);
    fragment.appendChild(figure);

    gallery.appendChild(fragment);
}


// FONCTION POUR GESTION DE L'ENVOI DU FORMULAIRE

async function handleForm(e){
    e.preventDefault()

    //Vérifier si tous les champs sont remplis

    if(!addProjectForm.checkValidity()){
        alert("Veuillez remplir tous les champs")
        return
    }

    //Récupérer toutes les valeurs du formulaire

    const file = imageUpload.files[0]
    const title = addProjectForm.querySelector("#titleAdd").value
    const category = addProjectForm.querySelector("#selectCategorie").value

    //Créer un objet formData pour envoyer les données
    
    const formData = new FormData()
    formData.append("image", file)
    formData.append("title", title)
    formData.append("category", category)

    try{
        const res = await sendWorkData(formData)
        console.log(res);
        const alert = document.querySelector(".alert")
        alert.innerHTML = "Votre photo a été ajoutée avec succès"
        alert.style.display = "block"
        setTimeout(()=>{alert.style.display = "none"}, 5000)
    }
     catch(error){
        console.log("Erreur:", error);
     }
}

//Fonction pour afficher l'image sélectionnée dans la modal d'ajout
imageUpload.addEventListener("change", function () {
    previewImage();
});

addProjectForm.addEventListener("submit", handleForm)

function previewImage() {
    // Vérifie si des fichiers sont sélectionnés
    if (imageUpload.files && imageUpload.files[0]) {
        const reader = new FileReader();
        const image = new Image();
        const fileName = imageUpload.files[0].name;
        // Définit l'action à effectuer lorsque le fichier est chargé
        reader.onload = event => {
            image.src = event.target.result;
            image.alt = fileName.split(".")[0]; // Utilise le nom de fichier comme alt texte
        };
        // Masque le contenu de l'upload initial
        contentUpload.style.display = "none";
        // Change la couleur de fond du bouton de soumission du projet
        projectSubmit.style.backgroundColor = "#1D6154";
        // Affiche l'élément de téléchargement du projet
        projectUpload.style.display = "block";
        // Change la couleur de fond de l'aperçu
        previewBackGround.style.backgroundColor = "#FFFFFF";
        // Lit le contenu du fichier en tant que URL de données
        reader.readAsDataURL(imageUpload.files[0]);
        // Ajoute l'image chargée au conteneur d'upload du projet
        projectUpload.appendChild(image);
    }
}
