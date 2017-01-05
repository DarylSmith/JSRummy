import {Injectable} from "@angular/core";
import {JRummyText} from '../services/jrummyText'
import * as _ from 'lodash';
@Injectable()
export class Game {
    PlayerBonus: number;
    PlayerBDeadwood: number;
    ComputerDeadwood: number;

    ComputerBonus: number;
    ComputerPoints: number;
    Winner: string;
    CurrentStatus: GameStatus;
    ComputerSelectedDiscard:boolean;
}


export enum GameStatus {
    GameStart = 0,
    PlayerPickup,
    PlayerDiscard,
    ComputerTurn,
    ComputerCall,
    PlayerCall,
    PlayerWon,
    ComputerWon,
    FirstTurnPlayerPickup,
    FirstTurnComputerPickup
}

//this represents the location of cards for the computer to track
export enum CardLocation {
    InPlayerHand,
    InDiscardPile,
    InComputerHand
}

@Injectable()
export class Card {
    ID: string;
    Name: string;
    FaceValue: number;
    PointValue: number;
    FaceValueString: string;
    Suit: string;
    VPos: number;
    HPos: number;
    Meld: string;
    Location: CardLocation;
    PlayerDiscard: boolean;

    //these are the number of points the computer assigns to a cards based on others with the same face value
    HPoints: number;

    //these are the points a computer assigns based on runs
    VPoints: number;
    constructor(faceValue: number, suit: string, cardName: string, pointValue: number, faceValueString: string) {

        this.Name = cardName;
        this.FaceValue = faceValue;
        this.Suit = suit;
        this.PointValue = pointValue;
        this.Meld = 'none';
        this.FaceValueString = faceValueString;

    }


    public inMeld(): boolean {

        return this.Meld == 'set' || this.Meld == 'run';
    }
    toString(): string {

        return `${this.Name} of ${this.Suit}`
    }


}


@Injectable()
export class Hand {
    Cards: Array<Card>;

    constructor(public Name: string) {

        this.Cards = new Array<Card>();
    }

    public moveCardInHand(selectedCard: Card, targetCard: Card) {
        let old_index: number = _.findIndex(this.Cards, function (c: Card) { return selectedCard.Suit === c.Suit && selectedCard.Name === c.Name });
        let new_index: number = _.findIndex(this.Cards, function (c: Card) { return targetCard.Suit === c.Suit && targetCard.Name === c.Name }) + 1;
        this.Cards = this.moveItemInArray(old_index, new_index, this.Cards);
    }

    public getCurrentPoints() {
        let total: number = _.reduce(this.Cards, function (sum: number, c: Card) { return c.Meld === 'set' || c.Meld === 'run' ? sum : sum + c.PointValue }, 0);
        return total;
    }

    resetPointsInHand() {

        for (var i = 0; i < this.Cards.length; i++) {
            this.Cards[i].HPoints = 0;
            this.Cards[i].VPoints = 0;
            this.Cards[i].Meld = "none";
        }

    }

    public sortByValue(): void {



        //first, get all the cards in melds
        let cardsInMeld = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.inMeld() }), function (c: Card) { return c.FaceValue });

        //next get cards oppenent is collecting
        let oppenentCards = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld == "opponentcollecting" }), function (c: Card) { return c.PointValue });

        //then get all the cards with points
        let cardsWithTwoPoints = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 2) }), function (c: Card) { return (c.PointValue) });

        //then get all the cards with points
        let cardsWithOnePoint = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 1) }), function (c: Card) { return (c.PointValue) });

        //then get all the cards without points
        let cardsWithoutPoints = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'deadwood' || (c.Meld === 'none' && (c.VPoints + c.HPoints === 0)) }), function (c: Card) { return (c.PointValue) });

        //concatenate cards 
        let cardsSorted: Array<Card> = cardsInMeld.concat(cardsWithTwoPoints, oppenentCards, cardsWithOnePoint, cardsWithoutPoints);

        //new concatenate the arrays and return
        this.Cards = cardsSorted;
    }

    private moveItemInArray(old_index: number, new_index: number, target: Card[]): Card[] {
        if (new_index >= target.length) {
            var k = new_index - target.length;
            while ((k--) + 1) {
                target.push(undefined);
            }
        }
        target.splice(new_index, 0, target.splice(old_index, 1)[0]);
        return target;
    };

}


@Injectable()
export class Deck {

    private _suits: Array<string> = ["spades", "hearts", "diamonds", "clubs"];
    private _cardName: Array<string> = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    private _faceValueString: Array<string> = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
    private _faceValue: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    private _pointValue: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    private _cards: Array<Card> = [];

    //create cards and add to deck array	
    constructor() {
        var mySuit: string;
        var myCard: Card;
        for (var i = 0; i <= this._suits.length - 1; i++) {
            mySuit = this._suits[i];
            for (var j = 0; j <= this._faceValue.length - 1; j++) {

                var myCard = new Card(this._faceValue[j], mySuit, this._cardName[j], this._pointValue[j], this._faceValueString[j]);
                this._cards.push(myCard);
            }

        }

    }

    get Cards(): Array<Card> {
        return this._cards;
    }

    shuffle() {
        for (var i = this._cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this._cards[i];
            this._cards[i] = this._cards[j];
            this._cards[j] = temp;
        }
    }


}

@Injectable()
export class JRummy {

    PlayerPoints: number;
    ComputerPoints: number
    CurrentGame: Game;
    CurrentGameNumber: number;
    CurrentDeck: Deck;
    CurrentTurn: number;
    PlayerHand: Hand;
    ComputerHand: Hand;
    DiscardPile: Hand;
    PlayedCards: Hand;
    Pile: Hand;

    constructor() {

        this.reset();
    }

    public reset() {

        this.CurrentDeck = new Deck();
        this.CurrentTurn = 0;
        this.PlayerPoints = 0;
        this.ComputerPoints = 0;
        this.CurrentGameNumber = 1;
        
    }

    startGame(game: Game) {
        //set game config values
        this.CurrentGame = game;
        this.CurrentGame.CurrentStatus = GameStatus.GameStart;
        this.CurrentDeck.shuffle();
        //instantiate all the hands
        this.ComputerHand = new Hand("Computer Hand");

        //this is used to allow the computer to 'count cards'
        this.PlayedCards = new Hand("Played Cards");
        this.Pile = new Hand("Pile");
        this.PlayerHand = new Hand("Player Hand");
        this.DiscardPile = new Hand("Discard Pile");

        //divide the cards between player, computer and pile
        this.deal();

        //move first card to the discard pile
        this.moveToDiscardPile();

        //this.computerPlay();
        this.CurrentGame.CurrentStatus = GameStatus.FirstTurnPlayerPickup
    }

    //add selected cards to each hand and remainder to pile
    deal() {
        this.PlayerHand.Cards = this.CurrentDeck.Cards.slice(0, 10);
        this.ComputerHand.Cards = this.CurrentDeck.Cards.slice(10, 20);
        this.Pile.Cards = this.CurrentDeck.Cards.slice(20);
    }

    //removes an item from the puts an item at the top of the discard pile
    moveToDiscardPile() {

        var discardedCard: Card = this.Pile.Cards.shift();

        this.DiscardPile.Cards.unshift(discardedCard);

    }

    computerPlay() {

        //first, evaluate the current hand
        this.evaluateHand("ComputerHand");

        //now, evaluate card from the discard pile
        // discardCard: Card = this.evaluateNewCard(this.DiscardPile[0])       
    }

    addCardToPlayerHand(suit: string, name: string, isFromDiscardPile: boolean) {
        let card: Card;
        let targetHand: Card[] = isFromDiscardPile ? this.DiscardPile.Cards : this.Pile.Cards;
        //if it's not in the discard pile, it must be in the draw pile
        card = _.filter(targetHand, function (c: Card) { return c.Name == name && c.Suit == suit })[0];
        this.PlayerHand.Cards.push(card);

        //add item to computer memory
        this.addOrModifyCardInComputerMemory(card, CardLocation.InPlayerHand, false);
        this.CurrentGame.CurrentStatus = GameStatus.PlayerDiscard;

        //remove card from correct pile
        if (isFromDiscardPile) {
            this.DiscardPile.Cards = _.filter(targetHand, function (c: Card) { return c.toString() !== card.toString() });
        }
        else {
            this.Pile.Cards = _.filter(targetHand, function (c: Card) { return c.toString() !== card.toString() });
        }


    }


    //removes a card from the playerhand and puts it in the pile
    discardFromPlayerHand(suit: string, name: string): boolean {

        let card: Card = _.filter(this.PlayerHand.Cards, function (c: Card) { return c.Name == name && c.Suit == suit })[0];
        this.DiscardPile.Cards.unshift(card);
        this.PlayerHand.Cards = _.filter(this.PlayerHand.Cards, function (c: Card) { return c.toString() !== card.toString() })

        //add this item to the computer memory
        this.addOrModifyCardInComputerMemory(card, CardLocation.InDiscardPile, true);
        this.CurrentGame.CurrentStatus == GameStatus.ComputerTurn;

        let self = this;

        this.evaluateHand("PlayerHand");
        return this.computerTurn();

    }

    //will put this card on the top of the stack, so it will be picked by the computer and played
    public unitTestCard(suit: string, name: string) {

        //get the index of the item by name
        let testCard: Card = _.filter(this.Pile.Cards, function (c: Card) { return c.Name == name && c.Suit == suit })[0];

        //add to the discardPile
        this.DiscardPile.Cards.unshift(testCard);

        //remove items from cards
        this.Pile.Cards = _.filter(this.Pile.Cards, function (card: Card) { return card.toString() != testCard.toString() });

        this.computerTurn();

    }


    //compare the cards and determine who won
    public compareHands(): string {
        //first get the score for player and computer
        let playerScore: number = this.PlayerHand.getCurrentPoints();
        let computerScore: number = this.ComputerHand.getCurrentPoints();

        if (this.CurrentGame.CurrentStatus === GameStatus.PlayerCall) {
            let result: number = this.getScore(playerScore, computerScore);
            if (result < 0) {
                this.ComputerPoints = this.ComputerPoints + (result * -1);
                this.CurrentGame.CurrentStatus = GameStatus.ComputerWon;
            }
            else {
                this.PlayerPoints = this.PlayerPoints + result;
                this.CurrentGame.CurrentStatus = GameStatus.PlayerWon;
            }
        }
        else {
            let result: number = this.getScore(computerScore, playerScore);
            if (result < 0) {
                this.PlayerPoints = this.PlayerPoints + (result * -1);
                this.CurrentGame.CurrentStatus = GameStatus.PlayerWon;
            }
            else {
                this.ComputerPoints = this.ComputerPoints + result;
                this.CurrentGame.CurrentStatus = GameStatus.ComputerWon;
            }

        }

        return this.getStatusOfGame();

    }


    //determines if the game is over, and if so, whether to continue on
    private getStatusOfGame(): string {

        let status:string ="";
        if (this.ComputerPoints >= 100) {
            status = "DARYL_WON_GAME";
        }
        else if (this.PlayerPoints >= 100) {
           status="PLAYER_WON_GAME";
        }
        else {
            this.CurrentGameNumber++;
            status = this.CurrentGame.CurrentStatus === GameStatus.ComputerWon?"COMPUTER_WON_ROUND" :"PLAYER_WON_ROUND";
        }
        return status
    }


    //test to evaluation computer play
    //takes a card from pile, sorts cards by value, and returns the worst card
    //boolean returns a true value of computer should call
    @Injectable()
    computerTurn(): boolean {

        //check if computer should call
        if (this.ComputerShouldCall()) {

            this.CurrentGame.CurrentStatus == GameStatus.ComputerCall;
            return true;
        }
        //first, try the discarded cards (also the computer must choose only the discard on first turn)
        if (this.cardRejectedByComputer(this.DiscardPile) == true) {
            console.log('Discard card was rejected.  Move to pile');

            //if the card is rejected, try again with the regular pile
            this.CurrentGame.ComputerSelectedDiscard=false;
            this.cardRejectedByComputer(this.Pile);
        }
        else {

            this.CurrentGame.ComputerSelectedDiscard=true;

            console.log('Discard card was accepted. continue');
        }


        //increment the round number and hand control back to the player
        this.CurrentTurn++;
        this.CurrentGame.CurrentStatus = GameStatus.PlayerPickup;

        //after the cards have been selected, re-evaluate
        this.evaluateHand("ComputerHand");
        this.logStatus();
        return false;
    }

    //this the computer adding or removing a card (either from the discard or pile)
    cardRejectedByComputer(hand: Hand): boolean {
        if (this.ComputerHand.Cards.length === 11)
        { }

        var discardedCard: Card = hand.Cards.shift();
        console.log(`Added to comp hand from ${hand.Name}`);
        console.log(discardedCard);

        //first check if cards has any points - if it's 0
        discardedCard = this.evaluateCard(discardedCard, this.ComputerHand)
        if (discardedCard.HPoints + discardedCard.VPoints < 1) {

            //if there is another card that is higher points and fewer outs, keep this one
            let deadwood = _.filter(this.ComputerHand.Cards, function (c: Card) { return c.Meld == 'deadwood' || (c.VPoints === 0 && c.HPoints === 0 && c.PointValue > discardedCard.PointValue) });

            if (deadwood.length === 0) {

                //if the card isn't useful, put it back to the top of the stack
                this.DiscardPile.Cards.unshift(discardedCard);
                console.log(`Card in ${hand.Name} had no points. Continuing...`);
                return true;
            }
        }
        //otherwise put it into the computer hand
        this.ComputerHand.Cards.push(discardedCard);

        //log this in the computer memory (since it's no longer in the computer hand, remove from the )
        this.addOrModifyCardInComputerMemory(discardedCard, CardLocation.InComputerHand, false);

        //evaluate the current hand with card in it
        this.evaluateHand("ComputerHand");

        //next, take the top card from the top (the worst card, and discard)
        this.ComputerHand.sortByValue();

        if (this.ComputerHand.Cards.length < 11) {
            console.log(`Attempt to remove extra card!`);
            console.log(discardedCard);
            console.log(deadwoodCard);
            return false;

        }
        else {
            var deadwoodCard: Card = this.ComputerHand.Cards.pop();
            console.log(`Removed ${deadwoodCard.toString()} from comp hand because ${deadwoodCard.VPoints} and  ${deadwoodCard.HPoints}
                    and   ${discardedCard.toString()}   in ${hand.Name} had ${discardedCard.VPoints} and  ${discardedCard.HPoints}
                    `);
            console.log(deadwoodCard);

            //take the unused cards and put into discard pile
            this.DiscardPile.Cards.unshift(deadwoodCard);

            //log this in computer memory
            this.addOrModifyCardInComputerMemory(deadwoodCard, CardLocation.InDiscardPile, false);
        }

        //checks if the same card that was added was rejected
        return deadwoodCard.toString() === discardedCard.toString();


    }

    //this is the main evaluation algorithm, determining the worth of a card
    evaluateCard(card: Card, hand: Hand): Card {

        //after a certain point, start removing unmelded high point cards
        if (hand.Name === "Computer Hand" && this.checkForHighDeadwood(card).Meld == 'deadwood') {
            return card;
        }


        //do not evaludate against high unmelded cards
        let cardsToEvaluateAgainst: Card[] = _.filter(hand.Cards, function (c: Card) { return c.Meld !== 'deadwood' });

        //first, determine the horizontal points by checking if other cards have the same hValue
        //make sure to exclude the current card, because it will always match itself!
        card.HPoints = _.filter(cardsToEvaluateAgainst, function (c: Card) { return (c.Meld != 'run' && c.toString() != card.toString()) && (card.FaceValue == c.FaceValue) }).length;

        //next, determine the vPoints of the card (for a straight, by checking if anything higher or lower in the same suit
        var onePointHigher = card.FaceValue + 1;
        var onePointLower = card.FaceValue - 1;
        card.VPoints += _.filter(cardsToEvaluateAgainst, function (c: Card) { return c.Meld != 'set' && c.FaceValue == onePointHigher && c.Suit == card.Suit }).length;
        card.VPoints += _.filter(cardsToEvaluateAgainst, function (c: Card) { return c.Meld != 'set' && c.FaceValue == onePointLower && c.Suit == card.Suit }).length;     //each hand, set the cards back to 0 and recalculate

        //if card is in set, note, flag that
        if (card.HPoints >= 2 && card.Meld !== "run") {

            card.Meld = 'set';
        }

        //of the card is in run, flag this one, and the one below and above it
        if (card.VPoints >= 2 && card.Meld !== "set") {

            card.Meld = 'run';

            let lowerCard: Card[] = _.filter(hand.Cards, function (c: Card) { return c.FaceValue == onePointHigher && c.Suit == card.Suit });
            let upperCard: Card[] = _.filter(hand.Cards, function (c: Card) { return c.FaceValue == onePointLower && c.Suit == card.Suit });

            //if the cards cannot be matched, something is seriously wrong here.  Make sure to log the exception
            if (lowerCard.length == 0 || upperCard.length == 0) {
                console.log(`Error occured in evaluation of ${hand.Name}. ${card.toString()} was flagged as a run, but could't find matched cards `);
                console.log(hand.Cards);

            }
            else {
                lowerCard[0].Meld = "run";
                upperCard[0].Meld = "run";
            }

        }

        //check if the oppenent is trying to collect this card
        if (!card.inMeld() && this.oppenentCollectingCard(card)) {
            card.Meld = "opponentcollecting"

        }


        return card;
    }

    //if there are only 2 cards left in the pile, the game is over;
    public gameIsDraw(): boolean {
        return this.Pile.Cards.length < 3;

    }

    //this is the algorithm for the computer determing the value of its hand
    //each time its turn is complete, the computer will run through and revaluate
    evaluateHand(handName: string) {

        var self = this;
        this[handName].resetPointsInHand();
        this[handName].Cards.forEach(function (card: Card) {
            // console.log(self);
            card = self.evaluateCard(card, self[handName]);

        });

        //if there is a conflict between a run and a set, the run always takes precedent
        let cardWithConflict: Card[] = _.filter(this[handName].Cards, function (c: Card) { return (c.VPoints === 2 && c.HPoints === 2) || (c.Meld === "run" && c.HPoints === 2) });
        if (cardWithConflict.length > 0) {
            let card: Card = cardWithConflict[0];
            console.log(`found conflict with ${card.toString()}`);
            cardWithConflict[0].Meld = "run";
            let matchedCards: Card[] = _.filter(this[handName].Cards, function (c: Card) { return (card.toString() != c.toString()) && (card.FaceValue == c.FaceValue) });

            matchedCards.forEach(function (matchedCard: Card) {
                if (matchedCard.Meld === "set") {
                    matchedCard.Meld = "none";
                }
            });
            console.log(matchedCards);
        }

        //order the cards by value
        if (handName === "ComputerHand") {
            this.ComputerHand.Cards = _.sortBy(this.ComputerHand.Cards, function (card: Card) { return card.VPoints + card.HPoints });
        }

    }




    //high unmatch cards are deadwood at a certain point in the game
    private checkForHighDeadwood(card: Card): Card {
        if (card.PointValue < 10 || card.Meld !== 'none') {

            return card;
        }
        let cutOffValue = 13;

        //cutoff number is the point at which a card is too high and should be discarded, even if matched
        let cutOffNumber: number = this.CurrentTurn + card.PointValue;

        let numberOfCardsWithoutMeld: number = _.filter(this.ComputerHand.Cards, function (c: Card) { return c.Meld === 'none' || c.Meld === 'deadwood' }).length;

        console.log(`Cutoff value:${cutOffValue}, cutoffNumber:${cutOffNumber}`)

        if ((cutOffNumber >= cutOffValue) || numberOfCardsWithoutMeld < 3) {
            card.Meld = 'deadwood';

            console.log(`${card.toString()} evaluated as deadwood (unmatched high card on round ${this.CurrentTurn})`);
        }

        //this evaulates high cards with sets -- if there is more than match in the discard pile, evealuate as deadwood
        if (card.HPoints > 0) {
            let discardsWithSameValue: number = _.filter(this.PlayedCards.Cards, function (c: Card) { return c.FaceValue === card.FaceValue }).length;

            if (discardsWithSameValue > 0) {
                card.Meld = 'deadwood';
                console.log(`${card.toString()} evaluated as deadwood because matching cards have already been discarded or added to player hand`);

            }

        }

        return card;
    }

    private ComputerShouldCall(): boolean {

        let computerPointCount = this.CountHandValue(this.ComputerHand);

        let upperLimitForCall: number;

        if (this.CurrentTurn < 5) {

            upperLimitForCall = 10;
        }
        else if (this.CurrentTurn >= 5 && this.CurrentTurn < 9) {

            upperLimitForCall = 6
        }
        else if (this.CurrentTurn >= 9) {

            upperLimitForCall = 2;
        }

        return computerPointCount <= upperLimitForCall;


    }

    private CountHandValue(hand: Hand): number {

        let cardsWithPoints: Card[] = _.filter(hand.Cards, function (c: Card) { return c.Meld !== 'set' && c.Meld !== 'run' });

        let handPoints: number = _.reduce(cardsWithPoints, function (memo: any, c: Card) { return memo + c.PointValue }, 0);

        return handPoints;



    }

    //this acts as the computer's 'memory' -- keeping track of what cards have been played and what is still in the deck
    private addOrModifyCardInComputerMemory(card: Card, location: CardLocation, playerDiscard: boolean) {

        //card exists already exists in played card list
        let cardInPlayedHand: Card[] = _.filter(this.PlayedCards.Cards, function (c: Card) { return c.toString() === card.toString() });

        //all we need to do is change the location 
        if (cardInPlayedHand.length > 0) {
            cardInPlayedHand[0].Location = location;
            cardInPlayedHand[0].PlayerDiscard = playerDiscard;
        }
        //otherwise, we'll need to make a shallow copy of this card
        else {
            let clonedCard: Card = _.cloneDeep(card);
            clonedCard.Location = location;
            clonedCard.PlayerDiscard = playerDiscard;
            this.PlayedCards.Cards.push(clonedCard);


        }

    }

    //hold onto a card if oppenent is collecting, only for cards less than 6
    private oppenentCollectingCard(card: Card): boolean {
        if (card.FaceValue > 5)
            return false;

        let playerCards: Card[] = _.filter(this.PlayedCards.Cards, function (c: Card) { return c.PlayerDiscard });

        return _.filter(playerCards, function (c: Card) { return c.FaceValue === card.FaceValue }).length > 1;

    }

    //removes and cards from the played hand list if it's been removed
    private removeCardFromComputerMemory(card: Card) {
        _.remove(this.PlayedCards.Cards, function (c: Card) { c.toString() === card.toString() });

    }

    private logStatus() {
        console.log(`Current Status at the end of turn ${this.CurrentTurn}`);
        console.log('---------------------------------------------------------');
        console.log('DiscardPile:');
        console.log(this.DiscardPile.Cards);
        console.log('Played Cards');
        console.log(this.PlayedCards.Cards);
        console.log('Player Cards:');
        console.log(this.PlayerHand.Cards);
        console.log('Computer Projected PlayerCards');
        console.log(_.filter(this.PlayedCards.Cards, function (c: Card) { return c.Location === CardLocation.InPlayerHand }));
        console.log('Cards discarded by Player');
        console.log(_.filter(this.PlayedCards.Cards, function (c: Card) { return c.PlayerDiscard }));
        console.log('Computer Cards');
        console.log(`${this.ComputerHand.Cards.length} cards in computer hand`);
        console.log(this.ComputerHand.Cards);
        console.log('Player Points:' + this.PlayerHand.getCurrentPoints());
        console.log('Computer Points:' + this.CountHandValue(this.ComputerHand));

    }



    //returns a positive integer for a caller win, negative for an opponent win
    private getScore(callerPoints: number, opponentPoints: number) {
        //if a runner gets gin, 25+ oppenent points
        if (callerPoints === 0) {
            return 25 + opponentPoints;

        }

        //in the case of undercutting, the opponent gets 25 + 
        else if (callerPoints - opponentPoints >= 0) {
            let diff: number = callerPoints - opponentPoints;

            return -25 - diff;

        }
        else {
            return opponentPoints - callerPoints;
        }
    }








}