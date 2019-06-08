const CARDNAMES = [
    "unknown",
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King"
];

const SUITS = {
    SPADES: "Spades",
    HEARTS: "Hearts",
    DIAMONDS: "Diamonds",
    CLUBS: "Clubs"
};

const CARDVALUES = [
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    'J',
    'Q',
    'K'
]

class Card {
    constructor(suit, number) {
        this.suit = suit;
        this.value = number;
        this.strValue = CARDNAMES[number];
        this.imgName = (this.suit[0] + CARDVALUES[this.value]).toLowerCase();
    }

    show() {
        console.log(`${this.strValue} of ${this.suit}`);
    }

    getImgName() {
        return this.imgName;
    }

    getStrValue() {
        return this.strValue;
    }

    // get numerical value
    getValue() {
        return this.value;
    }
}


class Deck {
    constructor(numOfDecks=1) {
        this.numOfDecks = numOfDecks;

        this.reset();
    }

    addDeck() {
        for (var key in SUITS) {
            for (var i = 1; i <= 13; i++) {
                this.deck.push(new Card(SUITS[key], i));
            }
        }
    }

    reset() {
        this.deck = [];
        for (let i=0; i<this.numOfDecks; i++) {
            this.addDeck();
        }
    }

    showAll() {
        this.deck.forEach(function (card) {
            card.show();
        });
    }

    shuffle() {
        var m = this.deck.length, temp, rnd;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            rnd = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            temp = this.deck[m];
            this.deck[m] = this.deck[rnd];
            this.deck[rnd] = temp;
        }
    }

    dealCard() {
        return this.deck.pop();
    }

    getNumOfRemainingCards() {
        return this.deck.length;
    }
}


class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.isIn = true;
    }

    receiveDealtCard(card) {
        if (card instanceof Card)
            this.hand.push(card);
        else
            console.log("received invalid object " + card);
    }

    discardCard(card) {
        for (let i=0; i<this.hand.length; i++) {
            if (this.hand[i] == card)
                this.hand.splice(i);
        }
    }

    discardRandomCard() {
        let rnd = Math.floor(Math.random() * this.hand.length);
        let card = this.hand.splice(rnd);
        return card;
    }

    discardTopCard() {
        return this.hand.pop();
    }

    showHand() {
        this.hand.forEach(function(card) {
            card.show();
        });
    }

    discardHand() {
        this.hand = [];
    }

    getPlayerName() {
        return this.name;
    }

    getCardInHand(idx) {
        return this.hand[idx];
    }

    getHandSize() {
        return this.hand.length;
    }

    getIsIn() {
        return this.isIn;
    }

    setIsIn(val) {
        if (typeof val === "boolean")
            this.isIn = val;
    }
}
