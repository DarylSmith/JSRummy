var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Game, JRummy, GameStatus } from '../../providers/jrummy/jrummy';
import { JRummyText } from '../../providers/jrummy-text';
import { AudioManager } from '../../providers/audioManager';
import { StateManager } from '../../providers/audioManager';
import { AnimationCallback } from '../../providers/animation-callback';
import { DragulaService } from "../../../node_modules/ng2-dragula/ng2-dragula";
import * as $ from 'jquery';
import * as _ from 'lodash';
export var GamePage = (function () {
    function GamePage(navCtrl, _jrummy, jrummyText, elementRef, animationCallback, drugalaService, stateManager, audioManager) {
        this.navCtrl = navCtrl;
        this._jrummy = _jrummy;
        this.jrummyText = jrummyText;
        this.elementRef = elementRef;
        this.animationCallback = animationCallback;
        this.drugalaService = drugalaService;
        this.stateManager = stateManager;
        this.audioManager = audioManager;
        this.pageTitle = 'Beat Daryl @ Gin Rummy';
        this.showAnimation = "none";
        this.reactionStyles = "53px -14px";
        this.playerSortActive = false;
        this.modalIsActive = false;
        this.gameCompletedResult = '';
        this.showlastDiscard = false;
        this.discardCard = 0;
        this.leftHandLocation = 0;
        this.turnText = "";
        this.showSharedModal = false;
        this.currentGame = new Game();
        this._jrummy.startGame(this.currentGame);
        console.log(this._jrummy.PlayerHand);
        console.log(this._jrummy.ComputerHand);
        console.log(this._jrummy.ComputerHand);
    }
    ;
    //this is a test method for running the computer by itself
    GamePage.prototype.getCard = function () {
        this._jrummy.computerPlay();
    };
    GamePage.prototype.ionViewWillEnter = function () {
        this._jrummy.reset();
    };
    GamePage.prototype.ionViewWillLeave = function () {
        this.audioManager.stopMainTrack();
    };
    GamePage.prototype.ionViewDidLoad = function () {
        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
        var transitionEvent = this.animationCallback.whichAnimationEvent();
        this.setPlayerAnimation();
        var self = this;
        $(".card-container").on("animationend", function (event) {
            self.showAnimation = "none";
            self.setDiscardCard(true);
            self.turnText = self.jrummyText.PLAYER_TURN;
        });
        $(".move-card-item").on("animationend", function (event) {
            self.showAnimation = "none";
            console.log('done');
            self.moveLeftHand(true);
        });
        this.audioManager.playMainTrack();
        this.turnText = this.jrummyText.PLAYER_TURN;
        if (this.stateManager.isSet) {
            this.showSharedModal = true;
            ;
        }
        else {
            this.displayModal(this.jrummyText.BEGIN_PLAY_INSTRUCTIONS);
        }
        this.drugalaService.drag.subscribe(function (value) {
            console.log("draggin'");
            self.audioManager.playCardSortTrack();
        });
        this.drugalaService.dragend.subscribe(function (value) {
            console.log("stoppin'");
            self.audioManager.stopcardSortTrack();
        });
    };
    GamePage.prototype.isFirstPickup = function () {
        return this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup;
    };
    GamePage.prototype.pickupPlayerCard = function (suit, name, isFromDiscardPile) {
        this.audioManager.playSoundEffect("player_card_select.mp3");
        //special case for first round (must choose from discard pile in first round)
        if (this.isFirstPickup() && !isFromDiscardPile) {
            this.displayModal(this.jrummyText.PICK_FIRST_CARD);
        }
        else if (this.currentGame.CurrentStatus === GameStatus.PlayerPickup || this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup) {
            this._jrummy.addCardToPlayerHand(suit, name, isFromDiscardPile);
        }
        else {
            this.displayModal(this.jrummyText.NOT_PICKUP_TIME);
        }
    };
    //allows the computer to go first if this is first draw, and player doesn;t want discard
    GamePage.prototype.allowComputerFirstTurn = function () {
        this.audioManager.playSoundEffect("button_press.mp3");
        this.setPlayerAnimation();
        this.currentGame.CurrentStatus = GameStatus.FirstTurnComputerPickup;
        this.computerCalls = this._jrummy.computerTurn();
        this.moveLeftHand(false);
    };
    GamePage.prototype.setPlayerAnimation = function () {
        var className = '';
        var vals = [1, 4, 2, 3, 4, 2, 3, 1, 2, 4];
        var version = vals[Math.floor(Math.random() * vals.length)];
        this.keyFrameAnimation = "give-to-player-" + version;
    };
    GamePage.prototype.getPlayerAnimation = function (animationClass) {
        var className = '';
        if (animationClass === this.showAnimation) {
            className = this.keyFrameAnimation;
        }
        return className;
    };
    GamePage.prototype.getPlayer = function () {
        var className = '';
        var vals = [0, 4, 2, 3, 4, 2, 2, 1, 3, 4];
        var version = vals[Math.floor(Math.random() * vals.length)];
        this.keyFrameAnimation = "give-to-player give-to-player-" + version;
    };
    GamePage.prototype.discardPlayerCard = function (suit, name) {
        this.turnText = this.jrummyText.DARYL_TURN;
        this.audioManager.playSoundEffect("player_card_select.mp3");
        this.lastDiscardCard = _.cloneDeep(_.filter(this._jrummy.PlayerHand.Cards, function (c) { return c.Name == name && c.Suit == suit; })[0]);
        if (this._jrummy.gameIsDraw()) {
            this.displayModal(this.jrummyText.GAME_IS_DRAW);
            this.startNewGame(this.jrummyText.GAME_IS_DRAW_CONTINUE);
        }
        else if (this.currentGame.CurrentStatus == GameStatus.PlayerDiscard) {
            //Check if the computer has called -- if it has companre cards
            if (this._jrummy.discardFromPlayerHand(suit, name)) {
                this.computerCalls = true;
                this._jrummy.CurrentGame.CurrentStatus = GameStatus.ComputerCall;
                this.scoreGameAndPlayAgain();
            }
            else {
                this.moveLeftHand(false);
            }
        }
        else {
            //user can sort cards
            //select a card for player to sort
            if (!this.playerSortActive) {
                console.log('Time to sort');
                this.selectSortCard = _.filter(this._jrummy.PlayerHand.Cards, function (c) { return c.Suit === suit && c.Name === name; })[0];
                this.selectedCardIndex = _.findIndex(this._jrummy.PlayerHand.Cards, function (c) { return c.Suit === suit && c.Name === name; });
                this.playerSortActive = true;
            }
            else {
                this.playerSortActive = false;
                this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
            }
        }
        //check if there are any errors if so, add a modal and restart the game
        if (this.currentGame.ErrorOccured) {
            this.currentGame.ErrorOccured = false;
            this.displayModal(this.jrummyText.ERROR_MESSAGE);
            this.startNewGame("");
        }
    };
    GamePage.prototype.playerCall = function () {
        this.audioManager.playSoundEffect("button_press.mp3");
        console.log('player called');
        if (this._jrummy.CurrentGame.CurrentStatus === GameStatus.PlayerPickup) {
            this._jrummy.CurrentGame.CurrentStatus = GameStatus.PlayerCall;
            this.scoreGameAndPlayAgain();
            this.turnText = this.jrummyText.GAME_OVER;
        }
        else {
            this.displayModal(this.jrummyText.NO_CALL_ALLOWED);
        }
    };
    GamePage.prototype.movePlayerCard = function (suit, name) {
        var targetCard = _.filter(this._jrummy.PlayerHand.Cards, function (c) { return c.Suit === suit && c.Name === name; })[0];
        this._jrummy.PlayerHand.moveCardInHand(this.selectSortCard, targetCard);
        this.playerSortActive = false;
        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
    };
    GamePage.prototype.scoreGameAndPlayAgain = function () {
        this.turnText = this.jrummyText.GAME_OVER;
        this.gameCompletedResult = this._jrummy.compareHands();
        this.stateManager.SaveState(this._jrummy.ComputerPoints, this._jrummy.PlayerPoints, this._jrummy.CurrentGameNumber);
    };
    GamePage.prototype.startNewGame = function (message) {
        //if it's a new round start, otherwise reset
        if (this.gameCompletedResult === "PLAYER_WON_GAME" || this.gameCompletedResult === "DARYL_WON_GAME") {
            this._jrummy.reset();
        }
        this.gameCompletedResult = "";
        this.currentGame = new Game();
        this.turnText = this.jrummyText.PLAYER_TURN;
        this._jrummy.startGame(this.currentGame);
    };
    GamePage.prototype.displayModal = function (modalText) {
        this.audioManager.stopMainTrack();
        this.modalIsActive = true;
        this.modalBody = modalText;
    };
    GamePage.prototype.onModalClosed = function (msg) {
        this.modalIsActive = false;
        this.audioManager.playMainTrack();
    };
    GamePage.prototype.onGameCompleted = function (completedAction) {
        if (completedAction === "play") {
            this.startNewGame('');
        }
        else {
            this.navCtrl.pop();
        }
    };
    GamePage.prototype.onSharedCompleted = function (completedAction) {
        if (completedAction === "true") {
            this._jrummy.ComputerPoints = this.stateManager.computerScore;
            this._jrummy.PlayerPoints = this.stateManager.playerScore;
            this._jrummy.CurrentGameNumber = this.stateManager.currentRound;
        }
        this.showSharedModal = false;
    };
    GamePage.prototype.setDiscardCard = function (darylDone) {
        if (darylDone) {
            this.discardCard = 0;
        }
        else {
            this.discardCard = this._jrummy.DiscardPile.Cards.length > 1 ? 1 : 0;
        }
    };
    GamePage.prototype.playerReaction = function () {
        var _this = this;
        var playerReactions = [1, 2, 1, 2, 1, 2];
        var reactionIndex = [53, -239, -544, -847, -1152];
        var xCoord = 158;
        var anIndex = 0;
        var index = 0;
        var reaction = playerReactions[Math.floor(Math.random() * playerReactions.length)];
        //no reaction if reaction is 0
        if (reaction > 0) {
            this.reactionInterval = setInterval(function () {
                if (index === (reactionIndex.length * 2) - 1) {
                    _this.setPlayerReaction(53, -14);
                    clearInterval(_this.reactionInterval);
                }
                else {
                    var yIndex = reaction === 2 ? -158 : -14;
                    if (index === 0) {
                        _this.setPlayerReaction(53, yIndex);
                    }
                    else {
                        _this.setPlayerReaction(reactionIndex[anIndex], yIndex);
                    }
                    index++;
                    anIndex = index > reactionIndex.length ? anIndex - 1 : anIndex + 1;
                }
                console.log("anindex " + index);
            }, 100);
        }
    };
    GamePage.prototype.setPlayerReaction = function (x, y) {
        this.reactionStyles = x + "px " + y + "px";
    };
    GamePage.prototype.moveLeftHand = function (moveIn) {
        var _this = this;
        var handIndex = moveIn ? [-304, -260, -222, -185, -146 - 209, -72, 0] : [0, -72, -109, -146, -185, -222, -260, -304];
        var index = 0;
        this.setDiscardCard(false);
        this.leftHandInterval = setInterval(function () {
            if (index === handIndex.length - 1) {
                clearInterval(_this.leftHandInterval);
                if (!moveIn) {
                    _this.setPlayerAnimation();
                    _this.showAnimation = _this._jrummy.CurrentGame.ComputerSelectedDiscard ? 'take-discard' : 'take-stock';
                    _this.audioManager.playSoundEffect('laser3.wav');
                }
                else {
                    _this.playerReaction();
                    _this.audioManager.playSoundEffect('laser2.wav');
                    _this.showAnimation = "discard";
                    index++;
                }
            }
            else {
                _this.leftHandLocation = handIndex[index];
                index++;
            }
        }, 100);
    };
    GamePage = __decorate([
        Component({
            selector: 'page-game',template:/*ion-inline-start:"C:\inetpub\wwwroot\jrummy-ionic\src\pages\game\game.html"*/'<div class="game-page">\n\n    <div class="game-header">\n\n        <div class="header-elem btn-back" (click)="navCtrl.pop()">\n\n            <img src="Images/btn_back.png" />\n\n        </div>\n\n        <div class="header-elem btn-play-again" (click)="startNewGame(\'Do you want to play again?\')">\n\n            <img src="Images/btn_play_again.png" />\n\n        </div>\n\n        <div class="header-elem-right game-round">\n\n            <span class="callout-beige header-callout">{{jrummyText.ROUND}}</span>\n\n            <div class="game-round-block">\n\n                <span class="callout-white callout-white-centered"> {{_jrummy.CurrentGameNumber}}</span>\n\n            </div>\n\n        </div>\n\n\n\n    </div>\n\n\n\n    <div class="top-container">\n\n        <div class="score-container-outer">\n\n\n\n            <div class="score-container-inner">\n\n                <h3> {{jrummyText.COMPUTER_SCORE}}</h3>\n\n\n\n                <span class="points-callout">{{_jrummy.ComputerPoints}}</span>\n\n\n\n            </div>\n\n\n\n            <div class="score-container-inner">\n\n                <h3> {{jrummyText.PLAYER_SCORE}}</h3>\n\n\n\n                <span class="points-callout">{{_jrummy.PlayerPoints}}</span>\n\n\n\n            </div>\n\n            <div class="score-container-inner">\n\n                <h3>{{turnText}}</h3>\n\n            </div>\n\n            <div class="player-buttons">\n\n                <div (click)="playerCall()"  *ngIf="_jrummy.PlayerHand.getCurrentPoints()<=10"  class="generic-btn-container">\n\n                    Call\n\n                </div>\n\n\n\n                <div *ngIf="isFirstPickup()" (click)="allowComputerFirstTurn() " class="generic-btn-container">\n\n                    Pass\n\n                </div>\n\n            </div>\n\n        </div>\n\n\n\n        <div class="player" [style.background-position]="reactionStyles">\n\n            <div class="player-hand-container">\n\n                <div class="left-hand" [ngStyle]="{\'background-position-x\':leftHandLocation + \'px\'}"></div>\n\n                <div class="card-back"></div>\n\n                <div class="card-back"></div>\n\n                <div class="card-back"></div>\n\n                <div class="card-back"></div>\n\n                <div class="card-back"></div>\n\n                <div class="card-back"></div>\n\n                <div class="card-back"></div>\n\n                <div class="card-back"></div>\n\n                <section class="card-container" [ngClass]="{\'card-container-selected\':showAnimation===\'discard\'}">\n\n                    <div id="selected-card" [ngClass]="{\'selected-card-selected\':showAnimation===\'discard\'}">\n\n                        <figure class="front"></figure>\n\n\n\n                        <figure class="back" *ngIf="_jrummy.DiscardPile.Cards.length >0 ">\n\n                            <jrummy-playingcard [suit]="_jrummy.DiscardPile.Cards[0].Suit" [face]="_jrummy.DiscardPile.Cards[0].FaceValueString"></jrummy-playingcard>\n\n                        </figure>\n\n                    </div>\n\n                </section>\n\n            </div>\n\n            <div class="right-hand" [ngClass]="{\'right-hand-selected\':showAnimation===\'discard\'}">\n\n                <img src="Images/righthand.png">\n\n            </div>\n\n\n\n        </div>\n\n\n\n        <div style="clear:both"></div>\n\n<div class="pile-container">\n\n    <div id="stock-pile" class="card" (click)="pickupPlayerCard(_jrummy.Pile.Cards[0].Suit,_jrummy.Pile.Cards[0].Name,false) ">\n\n\n\n        <img src="Images/card_back.png" class="move-card-item" style="display:none" [ngClass]="getPlayerAnimation(\'take-stock\')" />\n\n\n\n<img src="Images/card_back.png" />\n\n\n\n</div>\n\n\n\n\n\n<div class="move-card-item discard-move-card" [ngClass]="\'take-discard\' === this.showAnimation?\'give-to-player-discard\':\'\'">\n\n    <jrummy-playingcard *ngIf="lastDiscardCard!==undefined " id="discard-pile" [suit]="lastDiscardCard.Suit" [face]="lastDiscardCard.FaceValueString"></jrummy-playingcard>\n\n\n\n</div>\n\n\n\n\n\n<div *ngIf="_jrummy.DiscardPile.Cards.length >0 ">\n\n\n\n    <a href="javascript:void(0); " (click)="pickupPlayerCard(_jrummy.DiscardPile.Cards[0].Suit,_jrummy.DiscardPile.Cards[0].Name,true) ">\n\n\n\n\n\n\n\n        <jrummy-playingcard id="discard-pile" [suit]="_jrummy.DiscardPile.Cards[discardCard].Suit" [face]="_jrummy.DiscardPile.Cards[discardCard].FaceValueString"></jrummy-playingcard>\n\n    </a>\n\n\n\n\n\n</div>\n\n</div>\n\n</div>\n\n\n\n<div style="clear:both"></div>\n\n<div class="hand" [dragula]=\'"bag-one"\' *ngIf="turnText!==jrummyText.GAME_OVER" [dragulaModel]=\'_jrummy.PlayerHand.Cards\'>\n\n    <div *ngFor="let card of _jrummy.PlayerHand.Cards;let i = index ">\n\n        <a href="javascript:void(0); " (click)="discardPlayerCard(card.Suit,card.Name,true);">\n\n            <jrummy-playingcard [suit]="card.Suit" [face]="card.FaceValueString"> </jrummy-playingcard>\n\n\n\n\n\n        </a>\n\n    </div>\n\n\n\n</div>\n\n\n\n\n\n<jrummy-modal [modalBody]="modalBody" (modalClosed)="onModalClosed($event)" *ngIf="modalIsActive"></jrummy-modal>\n\n<jrummy-completed (gameCompletedAction)="onGameCompleted($event)" [gameCompletedResult]="gameCompletedResult" *ngIf="gameCompletedResult!==\'\'"></jrummy-completed>\n\n<jrummy-savedgame (modalClosed)="onSharedCompleted($event)"  *ngIf="showSharedModal==true"></jrummy-savedgame>\n\n</div>'/*ion-inline-end:"C:\inetpub\wwwroot\jrummy-ionic\src\pages\game\game.html"*/
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a) || Object, (typeof (_b = typeof JRummy !== 'undefined' && JRummy) === 'function' && _b) || Object, (typeof (_c = typeof JRummyText !== 'undefined' && JRummyText) === 'function' && _c) || Object, (typeof (_d = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _d) || Object, (typeof (_e = typeof AnimationCallback !== 'undefined' && AnimationCallback) === 'function' && _e) || Object, (typeof (_f = typeof DragulaService !== 'undefined' && DragulaService) === 'function' && _f) || Object, (typeof (_g = typeof StateManager !== 'undefined' && StateManager) === 'function' && _g) || Object, (typeof (_h = typeof AudioManager !== 'undefined' && AudioManager) === 'function' && _h) || Object])
    ], GamePage);
    return GamePage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());
//# sourceMappingURL=game.js.map