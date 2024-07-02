$(document).ready(function(){
    const cards = ['img/img.1.jpg', 'img/img.1.jpg', 'img/img.2.jpg', 'img/img.2.jpg','img/img.3.jpg','img/img.3.jpg','img/img.4.jpg','img/img.4.jpg'];

    function shuffleCards(cardArray) {
        for (let i = cardArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
        }
    }

    function setupGame() {
        console.log("Shuffling cards...");
        shuffleCards(cards);
        $('#game-board').empty();
        cards.forEach(card => {
            $('#game-board').append(`<div class="card"><img src="${card}" alt="Card Image"></div>`);
        });
        $('.card').on('click',flipCard);
    }

    function flipCard(){
        if ($(this).hasClass('flipped') || flippedCards.length === 2) {
            return;
        }
        $(this).addClass('flipped');
        flippedCards.push($(this));
        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
        if (!timer) {
            startTimer();
        }
    }

    setupGame();  // Initialize the game setup when the document is ready
});
