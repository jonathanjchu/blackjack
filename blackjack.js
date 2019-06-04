var deck;
var dealer;
var player;

resetGame();

function hitPlayer() {
    let card = deck.dealCard();
    player.receiveDealtCard(card);
    handSize = player.getHandSize();

    $("#player-hand").append(`<img src="img/${card.getImgName()}.png" alt="${card.getStrValue()}">`);


    if (countHandValue(player) > 21 || handSize >= 5) {
        endGame();
    }
}

function endGame() {
    let playerVal = countHandValue(player);

    // reveal dealer cards
    $("#dealer-card-2").attr("src", "img/" + dealer.getCardInHand(1).getImgName() + ".png");


    if (playerVal > 21) {
        // player busted, show results
        $("#results").append("Bust! House wins!");
    }
    else {
        // player did not bust
        // let dealer play
        dealerPlay();

        let dealerVal = countHandValue(dealer);

        if (dealerVal > 21) {
            $("#results").append("Dealer busted! Player wins!");
        }
        else if (playerVal > dealerVal) {
            $("#results").append("Player wins!");
        }
        else {
            $("#results").append("House wins!");
        }
        
    }

    $("#choices").css("visibility", "hidden");
    $("#restart").css("visibility", "visible");
}

function countHandValue(p) {
    let totalVal = 0;
    let countAces = 0;

    // total up player's cards
    for (let i = 0; i < p.getHandSize(); i++) {

        let card = p.getCardInHand(i);

        if (card.getStrValue() == "Ace") {
            countAces++;
            totalVal += 11;
        }
        else if (card.getValue() > 10) {
            totalVal += 10;
        }
        else {
            totalVal += card.getValue();
        }
    }

    // handle aces
    while (countAces > 0 && totalVal > 21) {
        totalVal -= 10;
        countAces--;
    }

    return totalVal;
}

function dealerPlay() {
    while (countHandValue(dealer) < 16 && dealer.getHandSize() < 5) {
        // dealer hit
        let card = deck.dealCard();
        dealer.receiveDealtCard(card);

        // show card
        $("#dealer-hand").append(`<img src="img/${card.getImgName()}.png" alt"${card.getStrValue()}">`);
    }
}

function resetGame() {
    $("#restart").css("visibility", "hidden");
    $("#choices").css("visibility", "visible");
    $("#btn-split").css("visibility", "hidden");
    $("#results").empty();


    deck = new Deck();
    deck.shuffle();

    dealer = new Player("Dealer");
    player = new Player("Player1");

    $("#player-hand").empty();
    $("#dealer-hand").empty();


    // deal cards
    hitPlayer();
    dealer.receiveDealtCard(deck.dealCard());
    $("#dealer-hand").append(`<img src="img/${dealer.getCardInHand(0).getImgName()}.png" alt="playing card" id="dealer-card-1" />`);
    

    hitPlayer();
    dealer.receiveDealtCard(deck.dealCard());
    $("#dealer-hand").append(`<img src="img/b1pr.png" alt="face down card" id="dealer-card-2" />`);

    // check split
    if (player.getCardInHand(0).getValue() == player.getCardInHand(1).getValue()) {
        $("#btn-split").css("visibility", "visible");
    }
    
}
