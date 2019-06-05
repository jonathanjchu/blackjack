var deck;
var dealer;
var players = [];

resetGame();

function clickHitPlayer(name) {
    hitPlayer(players.find(x => x.name == name));
}

function hitPlayer(player) {
    let card = deck.dealCard();
    player.receiveDealtCard(card);
    handSize = player.getHandSize();

    $(`#${player.name}-hand`).append(`<img src="img/${card.getImgName()}.png" alt="${card.getStrValue()}">`);

    if (countHandValue(player) > 21 || handSize >= 5) {
        playerOut(player);

        if (!areAnyPlayersStillIn()) {
            endGame();
        }
    }
}

function clickStay(name) {
    stay(players.find(x => x.name == name));
}

function stay(player) {
    playerOut(player);

    if (!areAnyPlayersStillIn()) {
        endGame();
    }
}

function areAnyPlayersStillIn() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].getIsIn()) {
            return true;
        }
    }
    return false;
}

function playerOut(player) {
    hidePlayerControls(player);
    player.setIsIn(false);
}

function endGame() {

    players.forEach(function (player) {
        let playerVal = countHandValue(player);

        // reveal dealer cards
        $("#dealer-card-2").attr("src", "img/" + dealer.getCardInHand(1).getImgName() + ".png");


        if (playerVal > 21) {
            // player busted, show results
            $(`#${player.name}-output`).append("Bust! House wins!");
        }
        else {
            // player did not bust
            // let dealer play
            dealerPlay();

            let dealerVal = countHandValue(dealer);

            if (dealerVal > 21) {
                $(`#${player.name}-output`).append("Dealer busted! Player wins!");
            }
            else if (playerVal > dealerVal) {
                $(`#${player.name}-output`).append("Player wins!");
            }
            else {
                $(`#${player.name}-output`).append("House wins!");
            }

        }

        $(`#${player.name}-output`).children(`#choices`).css("visibility", "hidden");
    });

    showRestartBtn();
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
    $("#btn-split").css("visibility", "hidden");
    $("#players").empty();

    deck = new Deck();
    deck.shuffle();

    dealer = new Player("Dealer");
    players = [];
    addPlayer();

    $("#dealer-hand").empty();

    // deal first cards
    players.forEach(player => hitPlayer(player));
    dealer.receiveDealtCard(deck.dealCard());
    $("#dealer-hand").append(`<img src="img/${dealer.getCardInHand(0).getImgName()}.png" alt="playing card" id="dealer-card-1" />`);

    // deal second cards
    players.forEach(player => hitPlayer(player));
    dealer.receiveDealtCard(deck.dealCard());
    $("#dealer-hand").append(`<img src="img/b1pr.png" alt="face down card" id="dealer-card-2" />`);

    redrawAllPlayers();
    hideRestartBtn();
    showAllPlayerControls();

    // check split
    players.forEach(function (player) {
        if (player.getCardInHand(0).getValue() == player.getCardInHand(1).getValue()) {
            $(`#${player.name}-split`).css("visibility", "visible");
        }
    });
}


function addPlayer() {
    let player = new Player("Player" + (players.length + 1));

    players.push(player);

    return player;
}

function split(name) {
    let splittingPlayer = players.find(x => x.name == name);

    card = splittingPlayer.discardTopCard();

    newPlayer = addPlayer();
    newPlayer.receiveDealtCard(card);

    redrawAllPlayers();
}

function redrawAllPlayers() {
    $("#players").empty();

    players.forEach(function (player) {
        drawPlayer(player);
        drawPlayerHand(player);
    })
}

function drawPlayer(player) {
    output = "";
    output += `<div class="col">`;
    output += `    <h3>${player.name}</h3>`;
    output += `    <div id="${player.name}-hand"></div>`;
    output += `</div>`;
    output += `<div class="row>`;
    output += `<div class="col" id="${player.name}-controls">`;
    output += `    <button class="btn btn-success" onclick="clickHitPlayer('${player.name}');">Hit</button>`;
    output += `    <button class="btn btn-success" onclick="clickStay('${player.name}');">Stay</button>`;
    output += `    <button class="btn btn-success split" onclick="split('${player.name}');" id="${player.name}-split">Split</button>`;
    output += `</div>`;
    output += `</div>`;
    output += `<div class="col" id="${player.name}-output" class="output">`;
    output += `</div>`;
    $("#players").append(output);
}

function drawPlayerHand(player) {
    for (let i = 0; i < player.getHandSize(); i++) {
        card = player.getCardInHand(i)
        $(`#${player.name}-hand`).append(`<img src="img/${card.getImgName()}.png" alt="${card.getStrValue()}">`);
    }
}

function hideRestartBtn() {
    $("#restart").css("visibility", "hidden");
}

function showRestartBtn() {
    $("#restart").css("visibility", "visible");
}

function showAllPlayerControls(player) {
    players.forEach(p => showPlayerControls(p));
}

function hidePlayerControls(player) {
    $(`#${player.name}-controls`).css("visibility", "hidden");
}

function showPlayerControls(player) {
    $(`#${player.name}-controls`).css("visibility", "visible");
}

function resetPlayerOutput(player) {
    $(`#${player.name}-output`).empty();
}

function playerOutput(player, msg) {
    $(`#${player.name}-output`).append(`<h3>${msg}</h3>`);
}