function loadData() {
    const url = window.location.pathname;
    const url_parcionada = url.split('/');
    const ordenacao = url_parcionada[2];

    fetch(`/api/dados/${ordenacao}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const botao = document.getElementById(`btn${ordenacao}`);
        if (botao) {
            botao.classList.add('active');
        }
        
        let personagemHTML = '';
        const divPersonagem = document.getElementById('container-personagem');

        data.personagens.forEach(personagem => {
            const statusColor = personagem.status === 'Alive' ? 'success' : 
                              personagem.status === 'Dead' ? 'danger' : 'warning';
            
            personagemHTML += `
            <div class="col">
                <div class="card h-100 character-card shadow-sm">
                    <div class="position-relative">
                        <img src="${personagem.image}" class="card-img-top" alt="${personagem.name}">
                        <span class="position-absolute top-0 end-0 badge bg-${statusColor} m-2">
                            ${personagem.status}
                        </span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-center mb-4">${personagem.name}</h5>
                        <div class="card-text">
                            <p class="mb-2">
                                <i class="fas fa-map-marker-alt text-primary"></i>
                                <strong>Última localização:</strong><br>
                                ${personagem.location.name}
                            </p>
                            <p class="mb-2">
                                <i class="fas fa-dna text-info"></i>
                                <strong>Espécie:</strong> ${personagem.species}
                            </p>
                            <hr>
                            <h6 class="text-center mb-3">Aparições por Temporada</h6>
                            <div class="row text-center">
                                <div class="col">
                                    <div class="p-2 bg-light rounded">
                                        <small class="text-muted">T1</small><br>
                                        <strong>${personagem.episodeForSeason[0]}</strong>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-2 bg-light rounded">
                                        <small class="text-muted">T2</small><br>
                                        <strong>${personagem.episodeForSeason[1]}</strong>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="p-2 bg-light rounded">
                                        <small class="text-muted">T3</small><br>
                                        <strong>${personagem.episodeForSeason[2]}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
        
        divPersonagem.innerHTML = personagemHTML;
    })
    .catch(error => {
        console.error('Erro ao carregar dados:', error);
        const divPersonagem = document.getElementById('container-personagem');
        divPersonagem.innerHTML = `
            <div class="col-12 text-center">
                <div class="alert alert-danger" role="alert">
                    Erro ao carregar os dados. Por favor, tente novamente mais tarde.
                </div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', loadData);