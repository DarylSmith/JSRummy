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
    var Game, GameStatus, CardLocation, Card, Hand, Deck, JRummy;
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
                GameStatus[GameStatus["FirstTurnPlayerPickup"] = 8] = "FirstTurnPlayerPickup";
                GameStatus[GameStatus["FirstTurnComputerPickup"] = 9] = "FirstTurnComputerPickup";
            })(GameStatus || (GameStatus = {}));
            exports_1("GameStatus", GameStatus);
            //this represents the location of cards for the computer to track
            (function (CardLocation) {
                CardLocation[CardLocation["InPlayerHand"] = 0] = "InPlayerHand";
                CardLocation[CardLocation["InDiscardPile"] = 1] = "InDiscardPile";
                CardLocation[CardLocation["InComputerHand"] = 2] = "InComputerHand";
            })(CardLocation || (CardLocation = {}));
            exports_1("CardLocation", CardLocation);
            Card = (function () {
                function Card(faceValue, suit, cardName, pointValue) {
                    this.Name = cardName;
                    this.FaceValue = faceValue;
                    this.Suit = suit;
                    this.PointValue = pointValue;
                    this.Meld = 'none';
                }
                Card.prototype.inMeld = function () {
                    return this.Meld == 'set' || this.Meld == 'run';
                };
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
                Hand.prototype.getCurrentPoints = function () {
                    var total = _.reduce(this.Cards, function (sum, c) { return c.Meld === 'set' || c.Meld === 'run' ? sum : sum + c.PointValue; }, 0);
                    return total;
                };
                Hand.prototype.sortByValue = function () {
                    //first, get all the cards in melds
                    var cardsInMeld = _.sortBy(_.filter(this.Cards, function (c) { return c.inMeld(); }), function (c) { return c.FaceValue; });
                    //next get cards oppenent is collecting
                    var oppenentCards = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld == "opponentcollecting"; }), function (c) { return c.PointValue; });
                    //then get all the cards with points
                    var cardsWithTwoPoints = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 2); }), function (c) { return (c.PointValue); });
                    //then get all the cards with points
                    var cardsWithOnePoint = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 1); }), function (c) { return (c.PointValue); });
                    //then get all the cards without points
                    var cardsWithoutPoints = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'deadwood' || (c.Meld === 'none' && (c.VPoints + c.HPoints === 0)); }), function (c) { return (c.PointValue); });
                    //concatenate cards 
                    var cardsSorted = cardsInMeld.concat(cardsWithTwoPoints, oppenentCards, cardsWithOnePoint, cardsWithoutPoints);
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
                    this.PlayerPoints = 0;
                    this.ComputerPoints = 0;
                }
                JRummy.prototype.startGame = function (game) {
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
                    this.CurrentGame.CurrentStatus = GameStatus.FirstTurnPlayerPickup;
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
                    //add item to computer memory
                    this.addOrModifyCardInComputerMemory(card, CardLocation.InPlayerHand, false);
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
                    //add this item to the computer memory
                    this.addOrModifyCardInComputerMemory(card, CardLocation.InDiscardPile, true);
                    this.CurrentGame.CurrentStatus == GameStatus.ComputerTurn;
                    var self = this;
                    this.PlayerHand.Cards.forEach(function (card) {
                        card = self.evaluateCard(card, self.PlayerHand);
                    });
                    return this.computerTurn();
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
                //compare the cards and determine who won
                JRummy.prototype.compareHands = function () {
                    //first get the score for player and computer
                    var playerScore = this.PlayerHand.getCurrentPoints();
                    var computerScore = this.ComputerHand.getCurrentPoints();
                    if (this.CurrentGame.CurrentStatus === GameStatus.PlayerCall) {
                        var result = this.getScore(playerScore, computerScore);
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
                        var result = this.getScore(computerScore, playerScore);
                        if (result < 0) {
                            this.PlayerPoints = this.PlayerPoints + (result * -1);
                            this.CurrentGame.CurrentStatus = GameStatus.PlayerWon;
                        }
                        else {
                            this.ComputerPoints = this.ComputerPoints + result;
                            this.CurrentGame.CurrentStatus = GameStatus.ComputerWon;
                        }
                    }
                };
                //test to evaluation computer play
                //takes a card from pile, sorts cards by value, and returns the worst card
                //boolean returns a true value of computer should call
                JRummy.prototype.computerTurn = function () {
                    //check if computer should call
                    if (this.ComputerShouldCall()) {
                        this.CurrentGame.CurrentStatus == GameStatus.ComputerCall;
                        return true;
                    }
                    //first, try the discarded cards (also the computer must choose only the discard on first turn)
                    if (this.cardRejectedByComputer(this.DiscardPile) || this.CurrentGame.CurrentStatus !== GameStatus.FirstTurnComputerPickup) {
                        console.log('Discard card was rejected.  Move to pile');
                        //if the card is rejected, try again with the regular pile
                        this.cardRejectedByComputer(this.Pile);
                    }
                    else {
                        console.log('Discard card was accepted. continue');
                    }
                    //increment the round number and hand control back to the player
                    this.CurrentRound++;
                    this.CurrentGame.CurrentStatus = GameStatus.PlayerPickup;
                    this.logStatus();
                    return false;
                };
                //this the computer adding or removing a card (either from the discard or pile)
                JRummy.prototype.cardRejectedByComputer = function (hand) {
                    var discardedCard = hand.Cards.shift();
                    console.log("Added to comp hand from " + hand.Name);
                    console.log(discardedCard);
                    //first check if cards has any points - if it's 0
                    discardedCard = this.evaluateCard(discardedCard, this.ComputerHand);
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
                    //log this in the computer memory (since it's no longer in the computer hand, remove from the )
                    this.addOrModifyCardInComputerMemory(discardedCard, CardLocation.InComputerHand, false);
                    //evaluate the current hand with card in it
                    this.evaluateComputerHand();
                    //next, take the top card from the top (the worst card, and discard)
                    this.ComputerHand.sortByValue();
                    var deadwoodCard = this.ComputerHand.Cards.pop();
                    console.log("Removed " + deadwoodCard.toString() + " from comp hand because " + deadwoodCard.VPoints + " and  " + deadwoodCard.HPoints + "\n                    and   " + discardedCard.toString() + " had " + discardedCard.VPoints + " and  " + discardedCard.HPoints + "\n                    ");
                    console.log(deadwoodCard);
                    //take the unused cards and put into discard pile
                    this.DiscardPile.Cards.unshift(deadwoodCard);
                    //log this in computer memory
                    this.addOrModifyCardInComputerMemory(deadwoodCard, CardLocation.InDiscardPile, false);
                    //checks if the same card that was added was rejected
                    return deadwoodCard.toString() === discardedCard.toString();
                };
                //this is the main evaluation algorithm, determining the worth of a card
                JRummy.prototype.evaluateCard = function (card, hand) {
                    //after a certain point, start removing unmelded high point cards
                    if (hand.Name === "Computer Hand" && this.checkForHighDeadwood(card).Meld == 'deadwood') {
                        return card;
                    }
                    //each hand, set the cards back to 0 and recalculate
                    card.resetPoints();
                    //do not evaludate against high unmelded cards
                    var cardsToEvaluateAgainst = _.filter(hand.Cards, function (c) { return c.Meld !== 'deadwood'; });
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
                        _.filter(hand.Cards, function (c) { return c.FaceValue == onePointHigher && c.Suit == card.Suit; })[0].Meld = 'run';
                        _.filter(hand.Cards, function (c) { return c.FaceValue == onePointLower && c.Suit == card.Suit; })[0].Meld = 'run';
                    }
                    //check if the oppenent is trying to collect this card
                    if (!card.inMeld() && this.oppenentCollectingCard(card)) {
                        card.Meld = "opponentcollecting";
                    }
                    return card;
                };
                //this is the algorithm for the computer determing the value of its hand
                //each time its turn is complete, the computer will run through and revaluate
                JRummy.prototype.evaluateComputerHand = function () {
                    var self = this;
                    this.ComputerHand.Cards.forEach(function (card) {
                        // console.log(self);
                        card = self.evaluateCard(card, self.ComputerHand);
                    });
                    //order the cards by value
                    this.ComputerHand.Cards = _.sortBy(this.ComputerHand.Cards, function (card) { return card.VPoints + card.HPoints; });
                };
                //high unmatch cards are deadwood at a certain point in the game
                JRummy.prototype.checkForHighDeadwood = function (card) {
                    if (card.PointValue < 10 || card.Meld !== 'none') {
                        return card;
                    }
                    var cutOffValue = 13;
                    //cutoff number is the point at which a card is too high and should be discarded, even if matched
                    var cutOffNumber = this.CurrentRound + card.PointValue;
                    var numberOfCardsWithoutMeld = _.filter(this.ComputerHand.Cards, function (c) { return c.Meld === 'none' || c.Meld === 'deadwood'; }).length;
                    console.log("Cutoff value:" + cutOffValue + ", cutoffNumber:" + cutOffNumber);
                    if ((cutOffNumber >= cutOffValue) || numberOfCardsWithoutMeld < 3) {
                        card.Meld = 'deadwood';
                        console.log(card.toString() + " evaluated as deadwood (unmatched high card on round " + this.CurrentRound + ")");
                    }
                    //this evaulates high cards with sets -- if there is more than match in the discard pile, evealuate as deadwood
                    if (card.HPoints > 0) {
                        var discardsWithSameValue = _.filter(this.PlayedCards.Cards, function (c) { return c.FaceValue === card.FaceValue; }).length;
                        if (discardsWithSameValue > 0) {
                            card.Meld = 'deadwood';
                            console.log(card.toString() + " evaluated as deadwood because matching cards have already been discarded or added to player hand");
                        }
                    }
                    return card;
                };
                JRummy.prototype.ComputerShouldCall = function () {
                    var computerPointCount = this.CountHandValue(this.ComputerHand);
                    var upperLimitForCall;
                    if (this.CurrentRound < 5) {
                        upperLimitForCall = 10;
                    }
                    else if (this.CurrentRound >= 5 && this.CurrentRound < 9) {
                        upperLimitForCall = 6;
                    }
                    else if (this.CurrentRound >= 9) {
                        upperLimitForCall = 2;
                    }
                    return computerPointCount <= upperLimitForCall;
                };
                JRummy.prototype.CountHandValue = function (hand) {
                    var cardsWithPoints = _.filter(hand.Cards, function (c) { return c.Meld !== 'set' && c.Meld !== 'run'; });
                    var handPoints = _.reduce(cardsWithPoints, function (memo, c) { return memo + c.PointValue; }, 0);
                    return handPoints;
                };
                //this acts as the computer's 'memory' -- keeping track of what cards have been played and what is still in the deck
                JRummy.prototype.addOrModifyCardInComputerMemory = function (card, location, playerDiscard) {
                    //card exists already exists in played card list
                    var cardInPlayedHand = _.filter(this.PlayedCards.Cards, function (c) { return c.toString() === card.toString(); });
                    //all we need to do is change the location 
                    if (cardInPlayedHand.length > 0) {
                        cardInPlayedHand[0].Location = location;
                        cardInPlayedHand[0].PlayerDiscard = playerDiscard;
                    }
                    else {
                        var clonedCard = _.cloneDeep(card);
                        clonedCard.Location = location;
                        clonedCard.PlayerDiscard = playerDiscard;
                        this.PlayedCards.Cards.push(clonedCard);
                    }
                };
                //hold onto a card if oppenent is collecting, only for cards less than 6
                JRummy.prototype.oppenentCollectingCard = function (card) {
                    if (card.FaceValue > 5)
                        return false;
                    var playerCards = _.filter(this.PlayedCards.Cards, function (c) { return c.PlayerDiscard; });
                    return _.filter(playerCards, function (c) { return c.FaceValue === card.FaceValue; }).length > 1;
                };
                //removes and cards from the played hand list if it's been removed
                JRummy.prototype.removeCardFromComputerMemory = function (card) {
                    _.remove(this.PlayedCards.Cards, function (c) { c.toString() === card.toString(); });
                };
                JRummy.prototype.logStatus = function () {
                    console.log("Current Status at the end of round " + this.CurrentRound);
                    console.log('---------------------------------------------------------');
                    console.log('DiscardPile:');
                    console.log(this.DiscardPile.Cards);
                    console.log('Played Cards');
                    console.log(this.PlayedCards.Cards);
                    console.log('Player Cards:');
                    console.log(this.PlayerHand.Cards);
                    console.log('Computer Projected PlayerCards');
                    console.log(_.filter(this.PlayedCards.Cards, function (c) { return c.Location === CardLocation.InPlayerHand; }));
                    console.log('Cards discarded by Player');
                    console.log(_.filter(this.PlayedCards.Cards, function (c) { return c.PlayerDiscard; }));
                    console.log('Computer Cards');
                    console.log(this.ComputerHand.Cards);
                    console.log('Player Points:' + this.PlayerHand.getCurrentPoints());
                    console.log('Computer Points:' + this.CountHandValue(this.ComputerHand));
                };
                //returns a positive integer for a caller win, negative for an opponent win
                JRummy.prototype.getScore = function (callerPoints, opponentPoints) {
                    //if a runner gets gin, 25+ oppenent points
                    if (callerPoints === 0) {
                        return 25 + opponentPoints;
                    }
                    else if (callerPoints - opponentPoints >= 0) {
                        var diff = callerPoints - opponentPoints;
                        return -25 - diff;
                    }
                    else {
                        return opponentPoints - callerPoints;
                    }
                };
                __decorate([
                    core_1.Injectable(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', Boolean)
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