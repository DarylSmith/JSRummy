System.register(['angular2/core', '.././services/jrummy'], function(exports_1, context_1) {
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
    var core_1, jrummy_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (jrummy_1_1) {
                jrummy_1 = jrummy_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(jrummy) {
                    this.pageTitle = 'Acme Product Management';
                    this._jrummy = jrummy;
                    this.currentGame = new jrummy_1.Game();
                    this._jrummy.startGame(this.currentGame);
                }
                //this is a test method for running the computer by itself
                AppComponent.prototype.getCard = function () {
                    this._jrummy.computerPlay();
                };
                AppComponent.prototype.pickupPlayerCard = function (suit, name, isFromDiscardPile) {
                    //special case for first round (must choose from discard pile in first round)
                    if (this.currentGame.CurrentStatus === jrummy_1.GameStatus.FirstTurnPlayerPickup && !isFromDiscardPile) {
                        window.alert("On first turn, you must choose from the discard pile\n           .Otherwise allow computer to go first");
                    }
                    if (this.currentGame.CurrentStatus === jrummy_1.GameStatus.PlayerPickup || this.currentGame.CurrentStatus === jrummy_1.GameStatus.FirstTurnPlayerPickup) {
                        this._jrummy.addCardToPlayerHand(suit, name, isFromDiscardPile);
                    }
                    else {
                        window.alert('Not time to pickup');
                    }
                };
                //allows the computer to go first if this is first draw, and player doesn;t want discard
                AppComponent.prototype.allowComputerFirstTurn = function () {
                    this.currentGame.CurrentStatus = jrummy_1.GameStatus.FirstTurnComputerPickup;
                    this.computerCalls = this._jrummy.computerTurn();
                };
                AppComponent.prototype.discardPlayerCard = function (suit, name) {
                    if (this.currentGame.CurrentStatus == jrummy_1.GameStatus.PlayerDiscard) {
                        //Check if the computer has called -- if it has companre cards
                        if (this._jrummy.discardFromPlayerHand(suit, name)) {
                            this.computerCalls = true;
                            this._jrummy.CurrentGame.CurrentStatus = jrummy_1.GameStatus.ComputerCall;
                            this.scoreGameAndPlayAgain();
                        }
                    }
                    else {
                        window.alert('Not time to discard');
                    }
                };
                AppComponent.prototype.playerCall = function () {
                    this._jrummy.CurrentGame.CurrentStatus = jrummy_1.GameStatus.PlayerCall;
                    this.scoreGameAndPlayAgain();
                };
                AppComponent.prototype.scoreGameAndPlayAgain = function () {
                    this._jrummy.compareHands();
                    var winningPlaterStr = this._jrummy.CurrentGame.CurrentStatus == jrummy_1.GameStatus.ComputerWon ? "Computer Won" : "Player Won";
                    if (window.confirm(winningPlaterStr + "Do you wish to continue?")) {
                        this.currentGame = new jrummy_1.Game();
                        this._jrummy.startGame(this.currentGame);
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'jrummy',
                        templateUrl: '/app/app.component.html',
                        providers: [jrummy_1.JRummy]
                    }), 
                    __metadata('design:paramtypes', [jrummy_1.JRummy])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map