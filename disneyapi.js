'use strict'

async function fetchPersonagens(name) {
    const url = `https://api.disneyapi.dev/character?name=${name}`
    const response = await fetch(url)
    const data = await response.json()

    return data.data || []
}

function criarCard(personagem) {
    const container = document.querySelector('#container')
    const card = document.createElement('div')
    card.classList.add('card')


    const imagem = document.createElement('img')
    imagem.src = personagem.imageUrl

    const nome = document.createElement('h2')
    nome.textContent = personagem.name

    card.appendChild(imagem)
    card.appendChild(nome)

    container.appendChild(card)
}


function criarImagem(personagem) {
    const galeria = document.getElementById('container')
    const imgg = document.createElement('img')
    imgg.src = personagem.imageUrl

    galeria.appendChild(imgg)
}

async function preencherFotos() {
    const raca = document.getElementById('personagem').value
    const fotos = await fetchPersonagens(raca)
    const galeria = document.getElementById('container')


    galeria.replaceChildren()

  
    fotos.forEach(criarCard)
    console.log(fotos)
}

document.getElementById('pesquisar')
    .addEventListener('click', preencherFotos)
