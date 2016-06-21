
import {Injectable} from "angular2/core";

@Injectable()
export class Game {
    PlayerBonus: number;
    PlayerBDeadwood: number;
    ComputerDeadwood: number;
    ComputerBonus: number;
    ComputerPoints: number;
    Winner: string
}

@Injectable()
export class Card {
    ID: string;
    Name: string;
    FaceValue: number;
    PointValue: number;
    FaceImagePath: string;
    Suit: string;
    VPos: number;
    HPos: number;

    //these are the number of points the computer assigns to a cards based on others with the same face value
    HPoints: number;
    
    //these are the points a computer assigns based on runs
    VPoints: number;
    constructor(faceValue: number, suit: string, cardName: string, pointValue: number) {

        this.Name = cardName;
        this.FaceValue = faceValue;
        this.Suit = suit;
        this.PointValue = pointValue;

    }

    resetPoints() {

        this.HPoints = 0;
        this.VPoints = 0;

    }
}

@Injectable()
export class Hand {
    Cards: Array<Card>;

    constructor() {

        this.Cards = new Array<Card>();
    }
}

@Injectable()
export class Deck {

    private _suits: Array<string> = ["spades", "hearts", "diamonds", "clubs"];
    private _cardName: Array<string> = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
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

                var myCard = new Card(this._faceValue[j], mySuit, this._cardName[j], this._pointValue[j]);
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

    CurrentGame: Game;
    CurrentDeck: Deck;
    PlayerHand: Hand;
    ComputerHand: Hand;
    DiscardPile: Hand;
    Pile: Hand;

    constructor() {
        this.CurrentDeck = new Deck();
    }

    startGame(game: Game) {
        
        //set game config values
        game = this.CurrentGame;
        this.CurrentDeck.shuffle();

        //instantiate all the hands
        this.ComputerHand = new Hand();
        this.Pile = new Hand();
        this.PlayerHand = new Hand();
        this.DiscardPile = new Hand();

        //divide the cards between player, computer and pile
        this.deal();

        //move first card to the discard pile
        this.moveToDiscardPile();

        this.computerPlay()
    }

    //add selected cards to each hand and remainder to pile
    deal() {
        this.PlayerHand.Cards = this.CurrentDeck.Cards.slice(0, 10);
        console.log(this.PlayerHand.Cards);
        this.ComputerHand.Cards = this.CurrentDeck.Cards.slice(10, 20);
        console.log(this.ComputerHand.Cards);
        this.Pile.Cards = this.CurrentDeck.Cards.slice(20);
        console.log(this.Pile.Cards);
    }

    //removes an item from the puts an item at the top of the discard pile
    moveToDiscardPile() {

        var discardedCard: Card = this.Pile.Cards.shift();

        this.DiscardPile.Cards.unshift(discardedCard);
        console.log(this.DiscardPile.Cards);
    }

    computerPlay() {
         
        //first, evaluate the current hand
        this.evaluateComputerHand();      

        //now, evaluate card from the discard pile
        // discardCard: Card = this.evaluateNewCard(this.DiscardPile[0])       
    }

    //test to evaluation computer play
    //takes a card from pile, sorts cards by value, and returns the worst card
    @Injectable()
    computerPlaySolo() {


        var discardedCard: Card = this.Pile.Cards.shift();
        console.log('Added to comp hand');
        console.log(discardedCard);
        this.ComputerHand.Cards.push(discardedCard);

        //first, evaluate the current hand
        this.evaluateComputerHand(); 
        
        //next, take the top card from the top (the worst card, and discard)
        var deadwoodCard: Card = this.ComputerHand.Cards.shift();
        console.log('Removed from comp hand');
        console.log(deadwoodCard);
     
        this.DiscardPile.Cards.push(deadwoodCard);
        console.log(this.ComputerHand.Cards);

        //now, evaluate card from the discard pile
        // discardCard: Card = this.evaluateNewCard(this.DiscardPile[0])       
    }

    //this is the main evaluation algorithm, determining the worth of a card
    evaluateCard(card: Card): Card {
            
        //each hand, set the cards back to 0 and recalculate
        card.resetPoints();

        //first, determine the horizontal points by checking if other cards have the same hValue
        //all cards will have an hPoint of 1, as they match themselves, so subtract that one.
        card.HPoints = (_.where(this.ComputerHand.Cards, { FaceValue: card.FaceValue }).length) - 1;

        //next, determine the vPoints of the card (for a straight, by checking if anything higher or lower in the same suit
        var onePointHigher = card.FaceValue + 1;
        var onePointLower = card.FaceValue - 1;
        card.VPoints += _.where(this.ComputerHand.Cards, { FaceValue: onePointHigher, Suit: card.Suit }).length;
        card.VPoints += _.where(this.ComputerHand.Cards, { FaceValue: onePointLower, Suit: card.Suit }).length;     //each hand, set the cards back to 0 and recalculate

        //if these cards are sets or runs of 3, multiply them by 100, as they are in a meld,
        card.VPoints = card.VPoints > 2 ? card.VPoints * 100 : card.VPoints;
        card.HPoints = card.HPoints > 2 ? card.HPoints * 100 : card.HPoints;
        return card;
    }

    //this is the algorithm for the computer determing the value of its hand
    //each time its turn is complete, the computer will run through and revaluate
    evaluateComputerHand() {

        var self = this;
        console.log(this.ComputerHand.Cards);
        this.ComputerHand.Cards.forEach(function (card) {
            
            console.log(self);
            card = self.evaluateCard(card);

        }); 

        //order the cards by value
        this.ComputerHand.Cards = _.sortBy(this.ComputerHand.Cards, function (card) { return card.VPoints + card.HPoints });

        console.log(this.ComputerHand);
    }





}