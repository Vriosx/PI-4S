document.addEventListener('DOMContentLoaded', function() {
    const cardData = [
        {
            title: 'Clareamento',
            text: 'Sorriso mais branco com nosso tratamento de clareamento dental.'
        },
        {
            title: 'Canal',
            text: 'Trate infecções dentárias com segurança e eficiência.'
        },
        {
            title: 'Implantes',
            text: 'Recupere sua confiança com nossos implantes dentários.'
        }
    ];

    const cardContainer = document.getElementById('card-container');

    cardData.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('col-md-4');
        cardElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.text}</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    });
});
