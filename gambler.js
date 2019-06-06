
class Gambler extends Player {
    constructor(name, startingBalance) {
        super(name);
        this.balance = startingBalance;
        this.wager = 0;
    }

    setWager(amount) {
        this.wager = amount;
    }

    getWager(amount) {
        return this.wager;
    }

    loseWager() {
        this.balance -= this.wager;
        this.wager = 0;
    }

    winWager() {
        this.balance += this.wager;
        this.wager = 0;
    }
}