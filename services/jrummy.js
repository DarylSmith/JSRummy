System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Game, Card, Hand, Deck, JRummy;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Game = (function () {
                function Game() {
                }
                Game = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Game);
                return Game;
            }());
            exports_1("Game", Game);
            Card = (function () {
                function Card(faceValue, suit, cardName, pointValue) {
                    this.Name = cardName;
                    this.FaceValue = faceValue;
                    this.Suit = suit;
                    this.PointValue = pointValue;
                }
                Card.prototype.resetPoints = function () {
                    this.HPoints = 0;
                    this.VPoints = 0;
                };
                Card = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Number, String, String, Number])
                ], Card);
                return Card;
            }());
            exports_1("Card", Card);
            Hand = (function () {
                function Hand() {
                    this.Cards = new Array();
                }
                Hand = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Hand);
                return Hand;
            }());
            exports_1("Hand", Hand);
            Deck = (function () {
                //create cards and add to deck array	
                function Deck() {
                    this._suits = ["spades", "hearts", "diamonds", "clubs"];
                    this._cardName = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
                    this._faceValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
                    this._pointValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
                    this._cards = [];
                    var mySuit;
                    var myCard;
                    for (var i = 0; i <= this._suits.length - 1; i++) {
                        mySuit = this._suits[i];
                        for (var j = 0; j <= this._faceValue.length - 1; j++) {
                            var myCard = new Card(this._faceValue[j], mySuit, this._cardName[j], this._pointValue[j]);
                            this._cards.push(myCard);
                        }
                    }
                }
                Object.defineProperty(Deck.prototype, "Cards", {
                    get: function () {
                        return this._cards;
                    },
                    enumerable: true,
                    configurable: true
                });
                Deck.prototype.shuffle = function () {
                    for (var i = this._cards.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                        var temp = this._cards[i];
                        this._cards[i] = this._cards[j];
                        this._cards[j] = temp;
                    }
                };
                Deck = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Deck);
                return Deck;
            }());
            exports_1("Deck", Deck);
            JRummy = (function () {
                function JRummy() {
                    this.CurrentDeck = new Deck();
                }
                JRummy.prototype.startGame = function (game) {
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
                    this.computerPlay();
                };
                //add selected cards to each hand and remainder to pile
                JRummy.prototype.deal = function () {
                    this.PlayerHand.Cards = this.CurrentDeck.Cards.slice(0, 10);
                    console.log(this.PlayerHand.Cards);
                    this.ComputerHand.Cards = this.CurrentDeck.Cards.slice(10, 20);
                    console.log(this.ComputerHand.Cards);
                    this.Pile.Cards = this.CurrentDeck.Cards.slice(20);
                    console.log(this.Pile.Cards);
                };
                //removes an item from the puts an item at the top of the discard pile
                JRummy.prototype.moveToDiscardPile = function () {
                    var discardedCard = this.Pile.Cards.shift();
                    this.DiscardPile.Cards.unshift(discardedCard);
                    console.log(this.DiscardPile.Cards);
                };
                JRummy.prototype.computerPlay = function () {
                    //first, evaluate the current hand
                    this.evaluateComputerHand();
                    //now, evaluate card from the discard pile
                    // discardCard: Card = this.evaluateNewCard(this.DiscardPile[0])       
                };
                //test to evaluation computer play
                //takes a card from pile, sorts cards by value, and returns the worst card
                JRummy.prototype.computerPlaySolo = function () {
                    var discardedCard = this.Pile.Cards.shift();
                    console.log('Added to comp hand');
                    console.log(discardedCard);
                    this.ComputerHand.Cards.push(discardedCard);
                    //first, evaluate the current hand
                    this.evaluateComputerHand();
                    //next, take the top card from the top (the worst card, and discard)
                    var deadwoodCard = this.ComputerHand.Cards.shift();
                    console.log('Removed from comp hand');
                    console.log(deadwoodCard);
                    this.DiscardPile.Cards.push(deadwoodCard);
                    console.log(this.ComputerHand.Cards);
                    //now, evaluate card from the discard pile
                    // discardCard: Card = this.evaluateNewCard(this.DiscardPile[0])       
                };
                //this is the main evaluation algorithm, determining the worth of a card
                JRummy.prototype.evaluateCard = function (card) {
                    //each hand, set the cards back to 0 and recalculate
                    card.resetPoints();
                    //first, determine the horizontal points by checking if other cards have the same hValue
                    //all cards will have an hPoint of 1, as they match themselves, so subtract that one.
                    card.HPoints = (_.where(this.ComputerHand.Cards, { FaceValue: card.FaceValue }).length) - 1;
                    //next, determine the vPoints of the card (for a straight, by checking if anything higher or lower in the same suit
                    var onePointHigher = card.FaceValue + 1;
                    var onePointLower = card.FaceValue - 1;
                    card.VPoints += _.where(this.ComputerHand.Cards, { FaceValue: onePointHigher, Suit: card.Suit }).length;
                    card.VPoints += _.where(this.ComputerHand.Cards, { FaceValue: onePointLower, Suit: card.Suit }).length; //each hand, set the cards back to 0 and recalculate
                    //if these cards are sets or runs of 3, multiply them by 100, as they are in a meld,
                    card.VPoints = card.VPoints > 2 ? card.VPoints * 100 : card.VPoints;
                    card.HPoints = card.HPoints > 2 ? card.HPoints * 100 : card.HPoints;
                    return card;
                };
                //this is the algorithm for the computer determing the value of its hand
                //each time its turn is complete, the computer will run through and revaluate
                JRummy.prototype.evaluateComputerHand = function () {
                    var self = this;
                    console.log(this.ComputerHand.Cards);
                    this.ComputerHand.Cards.forEach(function (card) {
                        console.log(self);
                        card = self.evaluateCard(card);
                    });
                    //order the cards by value
                    this.ComputerHand.Cards = _.sortBy(this.ComputerHand.Cards, function (card) { return card.VPoints + card.HPoints; });
                    console.log(this.ComputerHand);
                };
                __decorate([
                    core_1.Injectable(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], JRummy.prototype, "computerPlaySolo", null);
                JRummy = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], JRummy);
                return JRummy;
            }());
            exports_1("JRummy", JRummy);
        }
    }
});
//# sourceMappingURL=jrummy.js.map