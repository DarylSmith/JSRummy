﻿/// <reference path="../../jsrummy/node_modules/lodash/lodash/index.d.ts" />
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
    Meld: string;

    //these are the number of points the computer assigns to a cards based on others with the same face value
    HPoints: number;
    
    //these are the points a computer assigns based on runs
    VPoints: number;
    constructor(faceValue: number, suit: string, cardName: string, pointValue: number) {

        this.Name = cardName;
        this.FaceValue = faceValue;
        this.Suit = suit;
        this.PointValue = pointValue;
        this.Meld = 'none';

    }

    toString():string {
        
        return `${this.Name} of ${this.Suit}`
    }

    resetPoints() {

        this.HPoints = 0;
        this.VPoints = 0;

    }
}

@Injectable()
export class Hand {
    Cards: Array<Card>;

    constructor(public Name:string) {

        this.Cards = new Array<Card>();
    }

    public sortByValue() {

        return _.sortBy(this.Cards, function (card: Card) { return card.HPoints + card.VPoints });

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
        this.ComputerHand = new Hand("Computer Hand");
        this.Pile = new Hand("Pile");
        this.PlayerHand = new Hand("Player Hand");
        this.DiscardPile = new Hand("Discard Pile");

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

    //will put this card on the top of the stack, so it will be picked by the computer and played
    public unitTestCard(suit: string, name:string) {

        //get the index of the item by name
        let testCard: Card = _.findWhere(this.Pile.Cards, { Name: name, Suit: suit });

        //add to the discardPile
        this.DiscardPile.Cards.unshift(testCard);

        //remove items from cards
        this.Pile.Cards = _.filter(this.Pile.Cards, function (card: Card) { return card.toString()!=testCard.toString()});

        this.computerPlaySolo();

    }

    //test to evaluation computer play
    //takes a card from pile, sorts cards by value, and returns the worst card
    @Injectable()
    computerPlaySolo() {
         //first, try the discarded cards
        if (this.cardRejectedByComputer(this.DiscardPile)) {
            console.log('Discard card was rejected.  Move to pile');

            //if the card is rejected, try again with the regular pile
            this.cardRejectedByComputer(this.Pile);
        }
        else {

            console.log('Discard card was accepted. continue');
        }     
    }

    //this the computer adding or removing a card (either from the discard or pile)
    cardRejectedByComputer(hand: Hand): boolean{

        var discardedCard: Card = hand.Cards.shift();
        console.log(`Added to comp hand from ${hand.Name}`);
        console.log(discardedCard);

        //first check if cards has any points - if it's 0, disregard
        discardedCard = this.evaluateCard(discardedCard)
        if (discardedCard.HPoints + discardedCard.VPoints < 1) {
            console.log('Card had no points. Continuing...');
            return true;
        }


        this.ComputerHand.Cards.push(discardedCard);

        
        //evaluate the current hand with card in it
        this.evaluateComputerHand(); 
        
        //next, take the top card from the top (the worst card, and discard)
        var deadwoodCard: Card = this.ComputerHand.Cards.shift();
        console.log(`Removed ${deadwoodCard.toString()} from comp hand because ${deadwoodCard.VPoints} and  ${deadwoodCard.HPoints}
                    and   ${discardedCard.toString()} had ${discardedCard.VPoints} and  ${discardedCard.HPoints}
                    `);
        console.log(deadwoodCard);

        this.DiscardPile.Cards.push(deadwoodCard);
        console.log(this.ComputerHand.Cards);

        //checks if the same card that was added was rejected
        return deadwoodCard.toString() === discardedCard.toString();
       
        
    }

    //this is the main evaluation algorithm, determining the worth of a card
    evaluateCard(card: Card): Card {
            
        //each hand, set the cards back to 0 and recalculate
        card.resetPoints();

        //first, determine the horizontal points by checking if other cards have the same hValue
        //make sure to exclude the current card, because it will always match itself!
        card.HPoints = _.filter(this.ComputerHand.Cards, function(c:Card){ return (c.Meld!='run' && c.toString()!=card.toString()) && (card.FaceValue==c.FaceValue) }).length;

        //next, determine the vPoints of the card (for a straight, by checking if anything higher or lower in the same suit
        var onePointHigher = card.FaceValue + 1;
        var onePointLower = card.FaceValue - 1;
        card.VPoints += _.filter(this.ComputerHand.Cards,function(c:Card){ return c.Meld!='set' &&  c.FaceValue== onePointHigher &&  c.Suit==card.Suit }).length;
        card.VPoints += _.filter(this.ComputerHand.Cards, function (c: Card) { return c.Meld != 'set' && c.FaceValue == onePointLower && c.Suit == card.Suit }).length;     //each hand, set the cards back to 0 and recalculate

        //if card is in set, note, flag that
        if (card.HPoints >= 2) {
            
            card.Meld = 'set';
        }
        
        //of the card is in run, flag this one, and the one below and above it
        if (card.VPoints >= 2) {
            
           card.Meld = 'run';
           _.findWhere(this.ComputerHand.Cards, { FaceValue: onePointHigher, Suit: card.Suit }).Meld = 'run';
           _.findWhere(this.ComputerHand.Cards, { FaceValue: onePointLower, Suit: card.Suit }).Meld = 'run';

        }
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