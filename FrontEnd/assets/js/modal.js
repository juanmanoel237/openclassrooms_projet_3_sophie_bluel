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