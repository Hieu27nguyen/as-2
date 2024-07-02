$(document).ready(function() {
    const cards = [
        'img/img.1.jpg', 'img/img.1.jpg',
        'img/img.2.jpg', 'img/img.2.jpg',
        'img/img.3.jpg', 'img/img.3.jpg',
        'img/img.4.jpg', 'img/img.4.jpg'
    ]; // Array of card images, each image appears twice
    let flippedCards = [];
    let matchCount = 0;
    let moveCount = 0;
    let timer = null;
    let seconds = 0;
    const totalPairs = cards.length / 2;

    function shuffleCards(cardArray) {
        for (let i = cardArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
        }
    }

    function setupGame() {
        shuffleCards(cards);
        $('#game-board').empty();
        cards.forEach(card => {
            $('#game-board').append(`<div class="card"><img src="${card}" alt="Card Image" style="display: none;"></div>`);
        });
        $('.card').on('click', flipCard);
        resetGameStats();
    }

    function flipCard() {
        if ($(this).hasClass('flipped') || flippedCards.length === 2) {
            return; // Prevent flipping more than two cards
        }
        $(this).addClass('flipped');
        $(this).find('img').css('display', 'block');
        flippedCards.push(this);
    
        if (flippedCards.length === 1 && !timer) {  // Start timer on first flip if not already started
            startTimer();
        }
    
        if (flippedCards.length === 2) {
            moveCount++;
            $('#moveCount').text(`Moves: ${moveCount}`);
            setTimeout(checkForMatch, 1000);
        }
    }
    

    function checkForMatch() {
        if (flippedCards.length === 2) {
            const firstCard = $(flippedCards[0]);
            const secondCard = $(flippedCards[1]);
            if (firstCard.find('img').attr('src') === secondCard.find('img').attr('src')) {
                matchCount++;
                if (matchCount === totalPairs) {
                    stopTimer();
                    alert('Congratulations! All pairs matched.');
                }
                flippedCards = []; // Clear flipped cards array
            } else {
                setTimeout(() => {
                    firstCard.removeClass('flipped').find('img').css('display', 'none');
                    secondCard.removeClass('flipped').find('img').css('display', 'none');
                    flippedCards = [];
                }, 500);
            }
        }
    }

    function startTimer() {
        if (!timer) {
            timer = setInterval(() => {
                seconds++;
                $('#timer').text(`Time: ${formatTime(seconds)}`);
            }, 1000);
        }
    }

    function stopTimer() {
        clearInterval(timer);
        timer = null;
    }

    function resetGameStats() {
        moveCount = 0;
        matchCount = 0;
        seconds = 0;
        $('#moveCount').text('Moves: 0');
        $('#timer').text('Time: 00:00');
        if (timer) {
            stopTimer();
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    $('#restart').on('click', function() {
        resetGameStats();
        setupGame();
    });

    setupGame();  // Initialize the game on document ready
});
