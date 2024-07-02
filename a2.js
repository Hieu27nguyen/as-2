$(document).ready(function() {
    const cards = ['img/img.1.jpg', 'img/img.1.jpg', 'img/img.2.jpg', 'img/img.2.jpg', 'img/img.3.jpg', 'img/img.3.jpg', 'img/img.4.jpg', 'img/img.4.jpg'];
    let flippedCards = [], moveCount = 0, timer, seconds = 0;

    function shuffleCards() {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    function setupGame() {
        shuffleCards();
        $('#game-board').empty();
        cards.forEach(card => {
            $('#game-board').append(`<div class="card"><img src="${card}" alt="Card Image"></div>`);  // Removed 'hidden' attribute for simplicity
        });
        $('.card').on('click', flipCard);
    }

    function flipCard() {
        if (!$(this).hasClass('flipped') && flippedCards.length < 2) {
            $(this).addClass('flipped');
            $(this).find('img').css('display', 'block');
            flippedCards.push(this);
    
            if (flippedCards.length === 1 && !timer) {  // Start timer on the first flip
                startTimer();
            }
    
            if (flippedCards.length === 2) {
                moveCount++;
                $('#moveCount').text(`Moves: ${moveCount}`);
                setTimeout(checkForMatch, 1000);
            }
        }
    }
    
    
    function checkForMatch() {
        if (flippedCards.length < 2) {
            return;  // Make sure there are exactly two cards to compare
        }
        
        const firstCard = $(flippedCards[0]);
        const secondCard = $(flippedCards[1]);
        
        if (firstCard.find('img').attr('src') === secondCard.find('img').attr('src')) {
            // Cards match
            flippedCards = [];  // Clear the array for the next turn
        } else {
            // No match
            setTimeout(() => {
                firstCard.removeClass('flipped').find('img').css('display', 'none');
                secondCard.removeClass('flipped').find('img').css('display', 'none');
                flippedCards = [];  // Reset flipped cards
            }, 500);
        }
    }
    
    

    function startTimer() {
        timer = setInterval(() => {
            seconds++;
            $('#timer').text(`Time: ${formatTime(seconds)}`);
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timer);
        timer = null;
        seconds = 0;
        $('#timer').text(`Time: ${formatTime(seconds)}`);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    $('#restart').on('click', function() {
        resetTimer();
        moveCount = 0;
        $('#moveCount').text("Moves: 0");
        flippedCards = []; // Ensure you clear the array of flipped cards
        setupGame(); // Reinitialize the game
    });
    

    setupGame();  // Initialize the game setup
});
