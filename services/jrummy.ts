/// <reference path="../../jsrummy/node_modules/lodash/lodash/index.d.ts" />
import {Injectable} from "angular2/core";

@Injectable()
export class Game {
    PlayerBonus: number;
    PlayerBDeadwood: number;
    ComputerDeadwood: number;
    ComputerBonus: number;
    ComputerPoints: number;
    Winner: string;
    CurrentStatus: GameStatus;
}


export enum GameStatus {
    GameStart=0,
    PlayerPickup,
    PlayerDiscard,
    ComputerTurn,
    ComputerCall,
    PlayerCall,
    PlayerWon,
    ComputerWon
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

    public sortByValue():void {
        

        
        //first, get all the cards in melds
        let cardsInMeld = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld !== 'none' && c.Meld !== 'deadwood'  }), function (c: Card) { return c.FaceValue });

        //then get all the cards with points
        let cardsWithTwoPoints = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 2) }), function (c: Card) { return (c.PointValue)});

        //then get all the cards with points
        let cardsWithOnePoint = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 1) }), function (c: Card) { return (c.PointValue)  });

        //then get all the cards without points
        let cardsWithoutPoints = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld==='deadwood' ||  (c.Meld === 'none' && (c.VPoints + c.HPoints === 0)) }), function (c: Card) { return (c.PointValue) });

        //concatenate cards 
        let cardsSorted: Array<Card>= cardsInMeld.concat(cardsWithTwoPoints,cardsWithOnePoint, cardsWithoutPoints);

        //new concatenate the arrays and return
        this.Cards =  cardsSorted;
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
    CurrentRound: number;
    PlayerHand: Hand;
    ComputerHand: Hand;
    DiscardPile: Hand;
    Pile: Hand;

    constructor() {
        this.CurrentDeck = new Deck();
        this.CurrentRound = 0;
    }

    startGame(game: Game) {
        
        //set game config values
        this.CurrentGame = game;
        this.CurrentGame.CurrentStatus = GameStatus.GameStart;
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
        this.ComputerHand.Cards = this.CurrentDeck.Cards.slice(10, 20);
        this.Pile.Cards = this.CurrentDeck.Cards.slice(20);
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
    //boolean returns a true value of computer should call
    @Injectable()
    computerPlaySolo(): boolean {

          //check if computer should call
        if (this.ComputerShouldCall()) {

            return true;
        }
         //first, try the discarded cards
        if (this.cardRejectedByComputer(this.DiscardPile)) {
            console.log('Discard card was rejected.  Move to pile');

            //if the card is rejected, try again with the regular pile
            this.cardRejectedByComputer(this.Pile);
        }
        else {

            console.log('Discard card was accepted. continue');
        }   
        
        console.log(this.DiscardPile.Cards);  
        console.log(this.ComputerHand.Cards);
        console.log('Current Points for Computer:' + this.CountHandValue(this.ComputerHand));
        this.CurrentRound++;
        return false;
    }

    //this the computer adding or removing a card (either from the discard or pile)
    cardRejectedByComputer(hand: Hand): boolean{

        var discardedCard: Card = hand.Cards.shift();
        console.log(`Added to comp hand from ${hand.Name}`);
        console.log(discardedCard);

        //first check if cards has any points - if it's 0
        discardedCard = this.evaluateCard(discardedCard)
        if (discardedCard.HPoints + discardedCard.VPoints < 1) {

            //if there is another card that is higher points and fewer outs, keep this one
            let deadwood = _.filter(this.ComputerHand.Cards, function (c: Card) { return c.Meld=='deadwood' || (c.VPoints === 0 && c.HPoints=== 0 && c.PointValue > discardedCard.PointValue) });

            if (deadwood.length === 0) {

                //if the card isn't useful, put it back to the top of the stack
                this.DiscardPile.Cards.unshift(discardedCard);
                console.log('Card had no points. Continuing...');
                return true;
            }
        }
        //otherwise put it into the computer hand
        this.ComputerHand.Cards.push(discardedCard);

        //evaluate the current hand with card in it
        this.evaluateComputerHand(); 

        //next, take the top card from the top (the worst card, and discard)
        this.ComputerHand.sortByValue();
        var deadwoodCard: Card = this.ComputerHand.Cards.pop();
        console.log(`Removed ${deadwoodCard.toString()} from comp hand because ${deadwoodCard.VPoints} and  ${deadwoodCard.HPoints}
                    and   ${discardedCard.toString()} had ${discardedCard.VPoints} and  ${discardedCard.HPoints}
                    `);
        console.log(deadwoodCard);

        //take the unused cards and put into discard pile
        this.DiscardPile.Cards.unshift(deadwoodCard);
        console.log(this.ComputerHand.Cards);

        //checks if the same card that was added was rejected
        return deadwoodCard.toString() === discardedCard.toString();
       
        
    }

    //this is the main evaluation algorithm, determining the worth of a card
    evaluateCard(card: Card): Card {

            
        //each hand, set the cards back to 0 and recalculate
        card.resetPoints();

        //after a certain point, start removing unmelded high point cards
        if (this.checkForHighDeadwood(card).Meld == 'deadwood') {
            return card;
        }   

        //do not evaludate against high unmelded cards
        let cardsToEvaluateAgainst: Hand = _.filter(this.ComputerHand.Cards, function (c: Card) { return c.Meld !== 'deadwood' });

        //first, determine the horizontal points by checking if other cards have the same hValue
        //make sure to exclude the current card, because it will always match itself!
        card.HPoints = _.filter(cardsToEvaluateAgainst, function(c:Card){ return (c.Meld!='run' && c.toString()!=card.toString()) && (card.FaceValue==c.FaceValue) }).length;

        //next, determine the vPoints of the card (for a straight, by checking if anything higher or lower in the same suit
        var onePointHigher = card.FaceValue + 1;
        var onePointLower = card.FaceValue - 1;
        card.VPoints += _.filter(cardsToEvaluateAgainst,function(c:Card){ return c.Meld!='set' &&  c.FaceValue== onePointHigher &&  c.Suit==card.Suit }).length;
        card.VPoints += _.filter(cardsToEvaluateAgainst, function (c: Card) { return c.Meld != 'set' && c.FaceValue == onePointLower && c.Suit == card.Suit }).length;     //each hand, set the cards back to 0 and recalculate

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
            
           // console.log(self);
            card = self.evaluateCard(card);

        }); 

        //order the cards by value
        this.ComputerHand.Cards = _.sortBy(this.ComputerHand.Cards, function (card) { return card.VPoints + card.HPoints });

        console.log(this.ComputerHand);
    }

    //high unmatch cards are deadwood at a certain point in the game
    private checkForHighDeadwood(card: Card): Card {
        if (card.PointValue < 9 || card.Meld !== 'none') {

            return card;
        }
        let cutOffValue = 17;

        //cutoff number is the point at which a card is too high and should be discarded, even if matched
        let cutOffNumber: number = this.CurrentRound + card.PointValue;

        let numberOfCardsWithoutMeld:number = _.filter(this.ComputerHand.Cards, function (c: Card){return c.Meld==='none' || c.Meld==='deadwood'}).length;

        if ((cutOffNumber >= cutOffValue) || numberOfCardsWithoutMeld< 3 ) {
            card.Meld = 'deadwood';

            console.log(`${card.toString()} evaluated as deadwood (unmatched high card on round ${this.CurrentRound})`);
        }

        return card;
    }

    private ComputerShouldCall(): boolean {
        
        let computerPointCount = this.CountHandValue(this.ComputerHand);

        let upperLimitForCall = 7;

        let lowerLimitForCall = 2;

        let pointsNeededToCall = (upperLimitForCall - this.CurrentRound) >= lowerLimitForCall ? (upperLimitForCall - this.CurrentRound) : lowerLimitForCall;

        return computerPointCount <= pointsNeededToCall;


    }

    private CountHandValue(hand: Hand): number {

        let cardsWithPoints: Card[] = _.filter(hand.Cards, function (c: Card) { return c.Meld !== 'set' && c.Meld !== 'run' });
        
        let handPoints: number = _.reduce(cardsWithPoints, function (memo, c: Card) { return memo + c.PointValue }, 0);

        return handPoints;

        

    }





}