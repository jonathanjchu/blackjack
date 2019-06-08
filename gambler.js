
class Gambler extends Player {
    constructor(name, startingBalance=100) {
        super(name);
        this.balance = startingBalance;
        this.wager = 0;
        this.isExtraSeat = false;
    }

    setWager(amount) {
        this.wager = amount;
    }

    getWager() {
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

    getBalance() {
        return this.balance;
    }
}



class BlackjackGambler extends Gambler {
    constructor(name, startingBalance=100) {
        super(name, startingBalance);
        this.isSplitPlayer = false;
    }

    getIsSplitPlayer() {
        return this.isSplitPlayer;
    }

    setIsSplitPlayer(value) {
        this.isSplitPlayer = value;
    }
}
