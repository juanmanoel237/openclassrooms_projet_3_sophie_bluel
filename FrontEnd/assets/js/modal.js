// VARIABLES POUR LES SUPPRESSION DANS LA MODAL
const openGalleryModalBtn = document.querySelector("#editProjet")
const closeGalleryModalBtn = document.querySelector("#close-delete")
const modalDeleteWork = document.querySelector("#modalDelete")

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

const deletWork = (id)=>{
    fetch(`http://localhost:5678/api/works/${id}`,{
        
    })
}