// TCSS 460: Sample Code for Assignment 2
$(document).ready(function() {
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    let flippedCards = [], matchedPairs = 0;

    // Initializes the game by shuffling cards and setup the game board (grid)
    function initializeGame() {
        $('#game-board').empty().append(shuffleArray(cards).map(card => 
            `<div class="card" data-card="${card}">${card}</div>`
        ).join(''));
        $('.card').on('click', handleCardFlip);
        $('#restart').hide();
        flippedCards = [];
        matchedPairs = 0;
    }

    // When a card is flipped, we add the flipped class to the card (see CSS stylesheet)
    // Then, we check for a match if two cards were flipped.
    function handleCardFlip() {
        if ($(this).hasClass('flipped') || flippedCards.length === 2) return;
        $(this).addClass('flipped');
        flippedCards.push($(this));
        if (flippedCards.length === 2) setTimeout(checkForMatch, 500);
    }

    // Check to see when two flipped cards match, increment the matched pairs count. 
    // If all pairs match, then display a winning message. Otherwise, flip card back.
    function checkForMatch() {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.data('card') === secondCard.data('card')) {
            if (++matchedPairs === cards.length / 2) {
                alert('Game Completed! Good Job.');
                $('#restart').show();
            }
        } else {
            firstCard.removeClass('flipped');
            secondCard.removeClass('flipped');
        }
        flippedCards = [];
    }

    // Shuffle the arraing and randomize. Then, return the shuffled array.
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Add an onClick event listener when the restart button is clicked to initializeGame. 
    $('#restart').on('click', initializeGame);

    // Initialize the game when the document is ready
    initializeGame();
});
