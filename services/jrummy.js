System.register(["angular2/core", 'lodash'], function(exports_1, context_1) {
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
    var core_1, _;
    var Game, GameStatus, Card, Hand, Deck, JRummy;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (_1) {
                _ = _1;
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
            (function (GameStatus) {
                GameStatus[GameStatus["GameStart"] = 0] = "GameStart";
                GameStatus[GameStatus["PlayerPickup"] = 1] = "PlayerPickup";
                GameStatus[GameStatus["PlayerDiscard"] = 2] = "PlayerDiscard";
                GameStatus[GameStatus["ComputerTurn"] = 3] = "ComputerTurn";
                GameStatus[GameStatus["ComputerCall"] = 4] = "ComputerCall";
                GameStatus[GameStatus["PlayerCall"] = 5] = "PlayerCall";
                GameStatus[GameStatus["PlayerWon"] = 6] = "PlayerWon";
                GameStatus[GameStatus["ComputerWon"] = 7] = "ComputerWon";
            })(GameStatus || (GameStatus = {}));
            exports_1("GameStatus", GameStatus);
            Card = (function () {
                function Card(faceValue, suit, cardName, pointValue) {
                    this.Name = cardName;
                    this.FaceValue = faceValue;
                    this.Suit = suit;
                    this.PointValue = pointValue;
                    this.Meld = 'none';
                }
                Card.prototype.toString = function () {
                    return this.Name + " of " + this.Suit;
                };
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
                function Hand(Name) {
                    this.Name = Name;
                    this.Cards = new Array();
                }
                Hand.prototype.sortByValue = function () {
                    //first, get all the cards in melds
                    var cardsInMeld = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld !== 'none' && c.Meld !== 'deadwood'; }), function (c) { return c.FaceValue; });
                    //then get all the cards with points
                    var cardsWithTwoPoints = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 2); }), function (c) { return (c.PointValue); });
                    //then get all the cards with points
                    var cardsWithOnePoint = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 1); }), function (c) { return (c.PointValue); });
                    //then get all the cards without points
                    var cardsWithoutPoints = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'deadwood' || (c.Meld === 'none' && (c.VPoints + c.HPoints === 0)); }), function (c) { return (c.PointValue); });
                    //concatenate cards 
                    var cardsSorted = cardsInMeld.concat(cardsWithTwoPoints, cardsWithOnePoint, cardsWithoutPoints);
                    //new concatenate the arrays and return
                    this.Cards = cardsSorted;
                };
                Hand = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [String])
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
                    this.CurrentRound = 0;
                }
                JRummy.prototype.startGame = function (game) {
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
                    this.computerPlay();
                    this.CurrentGame.CurrentStatus = GameStatus.PlayerPickup;
                };
                //add selected cards to each hand and remainder to pile
                JRummy.prototype.deal = function () {
                    this.PlayerHand.Cards = this.CurrentDeck.Cards.slice(0, 10);
                    this.ComputerHand.Cards = this.CurrentDeck.Cards.slice(10, 20);
                    this.Pile.Cards = this.CurrentDeck.Cards.slice(20);
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
                JRummy.prototype.addCardToPlayerHand = function (suit, name, isFromDiscardPile) {
                    var card;
                    var targetHand = isFromDiscardPile ? this.DiscardPile.Cards : this.Pile.Cards;
                    //if it's not in the discard pile, it must be in the draw pile
                    card = _.filter(targetHand, function (c) { return c.Name == name && c.Suit == suit; })[0];
                    this.PlayerHand.Cards.push(card);
                    this.CurrentGame.CurrentStatus = GameStatus.PlayerDiscard;
                    //remove card from correct pile
                    if (isFromDiscardPile) {
                        this.DiscardPile.Cards = _.filter(targetHand, function (c) { return c.toString() !== card.toString(); });
                    }
                    else {
                        this.Pile.Cards = _.filter(targetHand, function (c) { return c.toString() !== card.toString(); });
                    }
                };
                //removes a card from the playerhand and puts it in the pile
                JRummy.prototype.discardFromPlayerHand = function (suit, name) {
                    var card = _.filter(this.PlayerHand.Cards, function (c) { return c.Name == name && c.Suit == suit; })[0];
                    this.DiscardPile.Cards.unshift(card);
                    this.PlayerHand.Cards = _.filter(this.PlayerHand.Cards, function (c) { return c.toString() !== card.toString(); });
                    this.CurrentGame.CurrentStatus == GameStatus.ComputerTurn;
                    this.computerTurn();
                };
                //will put this card on the top of the stack, so it will be picked by the computer and played
                JRummy.prototype.unitTestCard = function (suit, name) {
                    //get the index of the item by name
                    var testCard = _.filter(this.Pile.Cards, function (c) { return c.Name == name && c.Suit == suit; })[0];
                    //add to the discardPile
                    this.DiscardPile.Cards.unshift(testCard);
                    //remove items from cards
                    this.Pile.Cards = _.filter(this.Pile.Cards, function (card) { return card.toString() != testCard.toString(); });
                    this.computerTurn();
                };
                //test to evaluation computer play
                //takes a card from pile, sorts cards by value, and returns the worst card
                //boolean returns a true value of computer should call
                JRummy.prototype.computerTurn = function () {
                    //check if computer should call
                    if (this.ComputerShouldCall()) {
                        this.CurrentGame.CurrentStatus == GameStatus.ComputerCall;
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
                    //increment the round number and hand control back to the player
                    this.CurrentRound++;
                    this.CurrentGame.CurrentStatus = GameStatus.PlayerPickup;
                };
                //this the computer adding or removing a card (either from the discard or pile)
                JRummy.prototype.cardRejectedByComputer = function (hand) {
                    var discardedCard = hand.Cards.shift();
                    console.log("Added to comp hand from " + hand.Name);
                    console.log(discardedCard);
                    //first check if cards has any points - if it's 0
                    discardedCard = this.evaluateCard(discardedCard);
                    if (discardedCard.HPoints + discardedCard.VPoints < 1) {
                        //if there is another card that is higher points and fewer outs, keep this one
                        var deadwood = _.filter(this.ComputerHand.Cards, function (c) { return c.Meld == 'deadwood' || (c.VPoints === 0 && c.HPoints === 0 && c.PointValue > discardedCard.PointValue); });
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
                    var deadwoodCard = this.ComputerHand.Cards.pop();
                    console.log("Removed " + deadwoodCard.toString() + " from comp hand because " + deadwoodCard.VPoints + " and  " + deadwoodCard.HPoints + "\n                    and   " + discardedCard.toString() + " had " + discardedCard.VPoints + " and  " + discardedCard.HPoints + "\n                    ");
                    console.log(deadwoodCard);
                    //take the unused cards and put into discard pile
                    this.DiscardPile.Cards.unshift(deadwoodCard);
                    console.log(this.ComputerHand.Cards);
                    //checks if the same card that was added was rejected
                    return deadwoodCard.toString() === discardedCard.toString();
                };
                //this is the main evaluation algorithm, determining the worth of a card
                JRummy.prototype.evaluateCard = function (card) {
                    //each hand, set the cards back to 0 and recalculate
                    card.resetPoints();
                    //after a certain point, start removing unmelded high point cards
                    if (this.checkForHighDeadwood(card).Meld == 'deadwood') {
                        return card;
                    }
                    //do not evaludate against high unmelded cards
                    var cardsToEvaluateAgainst = _.filter(this.ComputerHand.Cards, function (c) { return c.Meld !== 'deadwood'; });
                    //first, determine the horizontal points by checking if other cards have the same hValue
                    //make sure to exclude the current card, because it will always match itself!
                    card.HPoints = _.filter(cardsToEvaluateAgainst, function (c) { return (c.Meld != 'run' && c.toString() != card.toString()) && (card.FaceValue == c.FaceValue); }).length;
                    //next, determine the vPoints of the card (for a straight, by checking if anything higher or lower in the same suit
                    var onePointHigher = card.FaceValue + 1;
                    var onePointLower = card.FaceValue - 1;
                    card.VPoints += _.filter(cardsToEvaluateAgainst, function (c) { return c.Meld != 'set' && c.FaceValue == onePointHigher && c.Suit == card.Suit; }).length;
                    card.VPoints += _.filter(cardsToEvaluateAgainst, function (c) { return c.Meld != 'set' && c.FaceValue == onePointLower && c.Suit == card.Suit; }).length; //each hand, set the cards back to 0 and recalculate
                    //if card is in set, note, flag that
                    if (card.HPoints >= 2) {
                        card.Meld = 'set';
                    }
                    //of the card is in run, flag this one, and the one below and above it
                    if (card.VPoints >= 2) {
                        card.Meld = 'run';
                        _.filter(this.ComputerHand.Cards, function (c) { return c.FaceValue == onePointHigher && c.Suit == card.Suit; })[0].Meld = 'run';
                        _.filter(this.ComputerHand.Cards, function (c) { return c.FaceValue == onePointLower && c.Suit == card.Suit; })[0].Meld = 'run';
                    }
                    return card;
                };
                //this is the algorithm for the computer determing the value of its hand
                //each time its turn is complete, the computer will run through and revaluate
                JRummy.prototype.evaluateComputerHand = function () {
                    var self = this;
                    console.log(this.ComputerHand.Cards);
                    this.ComputerHand.Cards.forEach(function (card) {
                        // console.log(self);
                        card = self.evaluateCard(card);
                    });
                    //order the cards by value
                    this.ComputerHand.Cards = _.sortBy(this.ComputerHand.Cards, function (card) { return card.VPoints + card.HPoints; });
                    console.log(this.ComputerHand);
                };
                //high unmatch cards are deadwood at a certain point in the game
                JRummy.prototype.checkForHighDeadwood = function (card) {
                    if (card.PointValue < 9 || card.Meld !== 'none') {
                        return card;
                    }
                    var cutOffValue = 17;
                    //cutoff number is the point at which a card is too high and should be discarded, even if matched
                    var cutOffNumber = this.CurrentRound + card.PointValue;
                    var numberOfCardsWithoutMeld = _.filter(this.ComputerHand.Cards, function (c) { return c.Meld === 'none' || c.Meld === 'deadwood'; }).length;
                    if ((cutOffNumber >= cutOffValue) || numberOfCardsWithoutMeld < 3) {
                        card.Meld = 'deadwood';
                        console.log(card.toString() + " evaluated as deadwood (unmatched high card on round " + this.CurrentRound + ")");
                    }
                    return card;
                };
                JRummy.prototype.ComputerShouldCall = function () {
                    var computerPointCount = this.CountHandValue(this.ComputerHand);
                    var upperLimitForCall = 7;
                    var lowerLimitForCall = 2;
                    var pointsNeededToCall = (upperLimitForCall - this.CurrentRound) >= lowerLimitForCall ? (upperLimitForCall - this.CurrentRound) : lowerLimitForCall;
                    return computerPointCount <= pointsNeededToCall;
                };
                JRummy.prototype.CountHandValue = function (hand) {
                    var cardsWithPoints = _.filter(hand.Cards, function (c) { return c.Meld !== 'set' && c.Meld !== 'run'; });
                    var handPoints = _.reduce(cardsWithPoints, function (memo, c) { return memo + c.PointValue; }, 0);
                    return handPoints;
                };
                __decorate([
                    core_1.Injectable(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], JRummy.prototype, "computerTurn", null);
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