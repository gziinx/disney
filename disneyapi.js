'use strict'

async function fetchPersonagens(name) {
    const url = `https://api.disneyapi.dev/character?name=${name}`
    
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Erro ao buscar dados')
        }
        const data = await response.json()
        return data.data || []
    } catch (error) {
        console.error('Erro na requisição:', error)
        return []
    }
}

function criarCard(personagem) {
    const container = document.getElementById('container')
    const card = document.createElement('div')
    card.classList.add('card')

    const imagem = document.createElement('img')
    imagem.src = personagem.imageUrl

    const nome = document.createElement('h2')
    nome.textContent = personagem.name

    card.addEventListener('click', () => mostrarDetalhes(personagem))

    card.appendChild(imagem)
    card.appendChild(nome)
    container.appendChild(card)
}

function mostrarDetalhes(personagem) {
    const container = document.getElementById('container')

    container.style.display = 'none'

    const modal = document.createElement('div')
    modal.classList.add('modal');

    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')

    const closeButton = document.createElement('fechar');
    closeButton.classList.add('close-button')
    closeButton.innerHTML = '&times;'
    closeButton.addEventListener('click', () => {
        modal.remove()
        container.style.display = 'flex'   
    })

    const imagem = document.createElement('img')
    imagem.src = personagem.imageUrl

    const nome = document.createElement('h2')
    nome.textContent = personagem.name

    let filmes, tvShows, videoGames

if (personagem.films.length) {
  filmes = personagem.films.join(', ')
} else {
  filmes = 'Nenhum filme disponível'
}

if (personagem.tvShows.length) {
  tvShows = personagem.tvShows.join(', ')
} else {
  tvShows = 'Nenhum programa de TV disponível'
}

if (personagem.videoGames.length) {
  videoGames = personagem.videoGames.join(', ');
} else {
  videoGames = 'Nenhum jogo disponível';
}


    modalContent.innerHTML = `
        <h3>Detalhes de ${personagem.name}</h3>
        <p><strong>Filmes:</strong> ${filmes}</p>
        <p><strong>Programas de TV:</strong> ${tvShows}</p>
        <p><strong>Video Games:</strong> ${videoGames}</p>
    `;

    modalContent.prepend(closeButton, imagem, nome);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

async function preencherFotos() {
    const nomePersonagem = document.getElementById('personagem').value
    const personagens = await fetchPersonagens(nomePersonagem)
    const galeria = document.getElementById('container')

    galeria.replaceChildren()

    if (personagens.length === 0) {
        const noResultsMessage = document.createElement('p')
        noResultsMessage.textContent = 'Nenhum personagem encontrado'
        galeria.appendChild(noResultsMessage)
    } else {
        personagens.forEach(criarCard)
    }
}


document.getElementById('pesquisar')
    .addEventListener('click', preencherFotos)
    