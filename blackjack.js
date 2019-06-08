


class Blackjack {
    constructor() {
        this.shoe = new Deck(6);
        this.shoe.shuffle();
        this.dealer = new Player("Dealer");
        this.players = [];
        this.results = {};
    }

    newRound() {
        // reshuffle if shoe is <75%
        if (this.shoe.getNumOfRemainingCards() < 52 * 6 * 0.25) {
            console.log("Reshuffling Shoe");
            this.shoe = new Deck(6);
            this.shoe.shuffle();
        }

        this.dealer = new Player("Dealer");
        for (let i=0; i<this.players.length; i++) {
            if (this.players[i].getIsSplitPlayer()) {
                this.players.splice(i);
            }
            else {
                this.players[i].discardHand(); 
                this.players[i].setIsIn(true);               
            }
        }

    }

    dealInitialCards() {
        // deal first cards
        this.players.forEach(player => this.hit(player));
        this.dealer.receiveDealtCard(this.shoe.dealCard());

        // deal second cards
        this.players.forEach(player => this.hit(player));
        this.dealer.receiveDealtCard(this.shoe.dealCard());
    }

    canSplit() {
        // check split
        for (let i = 0; i < this.players.length; i++) {
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

    addPlayer(wager=100) {
        let player = new BlackjackGambler("Player" + (this.players.length + 1), wager);

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

    hit(player) {
        player.receiveDealtCard(this.shoe.dealCard());
        let handSize = player.getHandSize();

        if (this.countHandValue(player) > 21) {
            this.playerOut(player);

            this.checkEndGame();
        }
    }

    stay(player) {
        this.playerOut(player);

        this.checkEndGame();
    }

    split(player) {
        let card = player.discardTopCard();
        let newPlayer = this.addPlayer();
        newPlayer.setIsSplitPlayer(true);
        newPlayer.receiveDealtCard(card);

        player.receiveDealtCard(this.shoe.dealCard());
        newPlayer.receiveDealtCard(this.shoe.dealCard());
    }

    push(player) {

    }

    surrender(player) {
        this.playerOut(player);
        player.setWager(player.getWager() / 2);
        player.loseWager();

        this.checkEndGame();
    }

    doubleDown(player) {
        player.setWager(player.getWager() * 2);
        this.hit(player);
        if (player.getIsIn())
            this.stay(player);
        
    }

    checkEndGame() {
        if (!this.areAnyPlayersStillIn()) {
            this.endGame();
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
        while (this.countHandValue(this.dealer) <= 16) {
            // dealer hit
            let card = this.shoe.dealCard();
            this.dealer.receiveDealtCard(card);
        }
    }

    getResults() {
        return this.results;
    }

    isBlackjack(player) {
        return (player.getHandSize() == 2 && this.countHandValue(player) == 21);
    }

    endGame() {
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            let playerVal = this.countHandValue(player);

            let isDealerBJ = this.isBlackjack(this.dealer);
            let isPlayerBJ = this.isBlackjack(player);

            console.log(player);

            if (isDealerBJ && isPlayerBJ) {
                push(player);
                player.setWager(0);
                this.results[player.name] = "Draw...";
            }
            if (isDealerBJ) {
                player.loseWager();
                this.results[player.name] = "House wins!";
            }
            else if (isPlayerBJ) {
                player.setWager(player.getWager() * 1.5);
                player.winWager();
                this.results[player.name] = "Blackjack! Player wins!";
            }
            else {
                if (playerVal > 21) {
                    // player busted, show results
                    player.loseWager();
                    this.results[player.name] = "Bust! House wins!";
                }
                else {
                    // player did not bust
                    // let dealer play
                    this.dealerPlay();

                    let dealerVal = this.countHandValue(this.dealer);

                    if (dealerVal > 21) {
                        player.winWager();
                        this.results[player.name] = "Dealer busted! Player wins!";
                    }
                    else if (playerVal == dealerVal) {
                        this.push(player);
                        player.setWager(0);
                        this.results[player.name] = "Draw...";
                    }
                    else if (playerVal > dealerVal) {
                        player.winWager();
                        this.results[player.name] = "Player wins!";
                    }
                    else {
                        player.loseWager();
                        this.results[player.name] = "House wins!";
                    }
                }
            }
        };
    }
}
