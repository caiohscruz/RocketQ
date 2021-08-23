import Modal from "./modal.js"

const modal = Modal()

// capturando os elementos da modal
const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

// Pegar os botões do tipo "check"
const checkButtons = document.querySelectorAll(".actions a.check") 

checkButtons.forEach(button => {
    // adicionar escuta
    button.addEventListener("click", handleClick)
})

const cancelButtons = document.querySelectorAll('.button.cancel')

cancelButtons.forEach(button => {
    // adicionar escuta
    button.addEventListener("click", modal.close)
})

const deleteButtons = document.querySelectorAll('.actions a.delete')

deleteButtons.forEach(button => {
    // adicionar escuta
    button.addEventListener("click", (event) => handleClick (event, false))
})

function handleClick(event, check = true){

    // para as tags 'a' não se comportarem como links, para não alterarem a url
    event.preventDefault()

    const text =  check ? "marcar como lida" : "excluir"

    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector(".modal form")
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = check ? "Marcar como lida" : "Excluir pergunta"
    modalDescription.innerHTML = `Tem certeza que deseja ${text} esta pergunta` 
    modalButton.innerHTML = `Sim, ${text}`

    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')

    modal.open();
}