

class Blackjack {
    constructor() {
        this.deck;
        this.dealer = new Player("Dealer");
        this.players = [];
    }

    newGame() {
        this.deck = new Deck();
        this.deck.shuffle();

        this.dealer = new Player("Dealer");
        this.players = [];

        this.addPlayer();

        // deal first cards
        this.players.forEach(player => this.hit(player));
        this.dealer.receiveDealtCard(this.deck.dealCard());

        // deal second cards
        this.players.forEach(player => this.hit(player));
        this.dealer.receiveDealtCard(this.deck.dealCard());

    }

    canSplit() {
        // check split
        for (let i=0; i<this.players.length; i++) {
            if (this.players[i].getCardInHand(0).getValue() == this.players[i].getCardInHand(1).getValue()) {
                return true;
            }
        }
        return false;
    }

    getListOfPlayers() {
        return this.players;
    }

    findPlayer(name) {
        return this.players.find(x => x.name == name);
    }

    addPlayer() {
        let player = new Player("Player" + (this.players.length + 1));

        this.players.push(player);

        return player;
    }

    getDealer() {
        return this.dealer;
    }

    playerOut(player) {
        hidePlayerControls(player);
        player.setIsIn(false);
    }


    stay(player) {
        this.playerOut(player);

        if (!this.areAnyPlayersStillIn()) {
            this.endGame();
        }
    }

    split(player) {
        let card = player.discardTopCard();
        let newPlayer = this.addPlayer();
        newPlayer.receiveDealtCard(card);
    }

    hit(player) {
        let card = this.deck.dealCard();
        player.receiveDealtCard(card);
        let handSize = player.getHandSize();

        if (this.countHandValue(player) > 21 || handSize >= 5) {
            this.playerOut(player);

            if (!this.areAnyPlayersStillIn()) {
                this.endGame();
            }
        }
    }

    areAnyPlayersStillIn() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getIsIn()) {
                return true;
            }
        }
        return false;
    }

    countHandValue(p) {
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

    dealerPlay() {
        console.log(this.dealer);
        while (this.countHandValue(this.dealer) < 16 && this.dealer.getHandSize() < 5) {
            // dealer hit
            let card = this.deck.dealCard();
            this.dealer.receiveDealtCard(card);
        }
    }

    isBlackjack(player) {
        return (player.handSize() == 2 && this.countHandValue(player) == 21);
    }

    endGame() {
        // this.players.forEach(function (player) {
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            let playerVal = this.countHandValue(player);

            // if (this.isBlackjack(dealer)) {

            // }
            // else if (this.isBlackjack(player)) {

            // }

            if (playerVal > 21) {
                // player busted, show results
                $(`#${player.name}-output`).append("Bust! House wins!");
            }
            else {
                // player did not bust
                // let dealer play
                this.dealerPlay();

                let dealerVal = this.countHandValue(this.dealer);

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
        };
    }
}

