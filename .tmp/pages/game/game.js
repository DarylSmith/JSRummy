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
import { AnimationCallback } from '../../providers/animation-callback';
import { DragulaService } from "../../../node_modules/ng2-dragula/ng2-dragula";
import * as $ from 'jquery';
import * as _ from 'lodash';
export var GamePage = (function () {
    function GamePage(navCtrl, _jrummy, jrummyText, elementRef, animationCallback, drugalaService) {
        this.navCtrl = navCtrl;
        this._jrummy = _jrummy;
        this.jrummyText = jrummyText;
        this.elementRef = elementRef;
        this.animationCallback = animationCallback;
        this.drugalaService = drugalaService;
        this.pageTitle = 'Beat Daryl @ Gin Rummy';
        this.showAnimation = "none";
        this.playerSortActive = false;
        this.modalIsActive = false;
        this.gameCompletedResult = '';
        this.leftHandLocation = 0;
        this.currentGame = new Game();
        this._jrummy.startGame(this.currentGame);
        console.log(this._jrummy.PlayerHand);
        console.log(this._jrummy.ComputerHand);
        console.log(this._jrummy.ComputerHand);
    }
    //this is a test method for running the computer by itself
    GamePage.prototype.getCard = function () {
        this._jrummy.computerPlay();
    };
    GamePage.prototype.ionViewDidLoad = function () {
        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
        var transitionEvent = this.animationCallback.whichAnimationEvent();
        var self = this;
        $(".card-container").on("animationend", function (event) {
            self.showAnimation = "none";
        });
        $(".move-card-item").on("animationend", function (event) {
            self.showAnimation = "none";
            console.log('done');
            self.moveLeftHand(true);
        });
    };
    GamePage.prototype.isFirstPickup = function () {
        return this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup;
    };
    GamePage.prototype.pickupPlayerCard = function (suit, name, isFromDiscardPile) {
        //special case for first round (must choose from discard pile in first round)
        if (this.isFirstPickup() && !isFromDiscardPile) {
            this.displayModal(this.jrummyText.PICK_FIRST_CARD);
        }
        if (this.currentGame.CurrentStatus === GameStatus.PlayerPickup || this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup) {
            this._jrummy.addCardToPlayerHand(suit, name, isFromDiscardPile);
        }
        else {
            this.displayModal(this.jrummyText.NOT_PICKUP_TIME);
        }
    };
    //allows the computer to go first if this is first draw, and player doesn;t want discard
    GamePage.prototype.allowComputerFirstTurn = function () {
        this.setPlayerAnimation();
        this.currentGame.CurrentStatus = GameStatus.FirstTurnComputerPickup;
        this.computerCalls = this._jrummy.computerTurn();
        this.moveLeftHand(false);
    };
    GamePage.prototype.setPlayerAnimation = function () {
        var className = '';
        var vals = [0, 4, 2, 3, 0, 2, 0, 1, 0, 4];
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
        var vals = [0, 4, 0, 3, 0, 2, 0, 1, 0, 4];
        var version = vals[Math.floor(Math.random() * vals.length)];
        this.keyFrameAnimation = "give-to-player give-to-player-" + version;
    };
    GamePage.prototype.discardPlayerCard = function (suit, name) {
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
    };
    GamePage.prototype.playerCall = function () {
        console.log('player called');
        this._jrummy.CurrentGame.CurrentStatus = GameStatus.PlayerCall;
        this.scoreGameAndPlayAgain();
    };
    GamePage.prototype.movePlayerCard = function (suit, name) {
        var targetCard = _.filter(this._jrummy.PlayerHand.Cards, function (c) { return c.Suit === suit && c.Name === name; })[0];
        this._jrummy.PlayerHand.moveCardInHand(this.selectSortCard, targetCard);
        this.playerSortActive = false;
        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
    };
    GamePage.prototype.scoreGameAndPlayAgain = function () {
        this.gameCompletedResult = this._jrummy.compareHands();
    };
    GamePage.prototype.startNewGame = function (message) {
        //if it's a new round start, otherwise reset
        if (this.gameCompletedResult === "PLAYER_WON_GAME" || this.gameCompletedResult === "PLAYER_WON_GAME") {
            this._jrummy.reset();
        }
        this.gameCompletedResult = "";
        this.currentGame = new Game();
        this._jrummy.startGame(this.currentGame);
    };
    GamePage.prototype.displayModal = function (modalText) {
        this.modalIsActive = true;
        this.modalBody = modalText;
    };
    GamePage.prototype.onModalClosed = function (msg) {
        this.modalIsActive = false;
    };
    GamePage.prototype.onGameCompleted = function (completedAction) {
        if (completedAction === "play") {
            this.startNewGame('');
        }
        else {
            this.navCtrl.pop();
        }
    };
    GamePage.prototype.moveLeftHand = function (moveIn) {
        var _this = this;
        var handIndex = moveIn ? [-304, -260, -222, -185, -146 - 209, -72, 0] : [0, -72, -109, -146, -185, -222, -260, -304];
        var index = 0;
        this.leftHandInterval = setInterval(function () {
            if (index === handIndex.length - 1) {
                clearInterval(_this.leftHandInterval);
                if (!moveIn) {
                    _this.setPlayerAnimation();
                    _this.showAnimation = _this._jrummy.CurrentGame.ComputerSelectedDiscard ? 'take-discard' : 'take-stock';
                }
                else {
                    _this.showAnimation = "discard";
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
            selector: 'page-game',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\game\game.html"*/'<div class="game-header">\n\n    <div class="header-elem btn-back" (click)="navCtrl.pop()">\n\n        <img src="http://lifespeak.s3.amazonaws.com/Images/btn_back.png" />\n\n    </div>\n\n    <div class="header-elem btn-play-again" (click)="startNewGame(\'Do you want to play again?\')">\n\n        <img src="http://lifespeak.s3.amazonaws.com/Images/btn_play_again.png" />\n\n    </div>\n\n    <div class="header-elem-right game-round">\n\n        <span class="callout-beige header-callout">{{jrummyText.ROUND}}</span>\n\n        <div class="game-round-block">\n\n            <span class="callout-white callout-white-centered"> {{_jrummy.CurrentGameNumber}}</span>\n\n        </div>\n\n    </div>\n\n\n\n</div>\n\n\n\n\n\n\n\n\n\n<!--<div *ngFor="let card of _jrummy.ComputerHand.Cards">\n\n    {{card.Name}} -- {{card.Suit}}\n\n\n\n\n\n\n\n</div>-->\n\n<div class="top-container">\n\n    <div class="score-container-outer">\n\n\n\n        <div class="score-container-inner">\n\n            <h3> Computer Score:</h3>\n\n\n\n            <span class="points-callout">{{_jrummy.ComputerPoints}}</span>\n\n\n\n        </div>\n\n\n\n        <div class="score-container-inner">\n\n            <h3> Player Score:</h3>\n\n\n\n            <span class="points-callout">{{_jrummy.PlayerPoints}}</span>\n\n\n\n        </div>\n\n\n\n        <div *ngIf="_jrummy.PlayerHand.getCurrentPoints()<=30" (click)="playerCall()" class="generic-btn-container">\n\n            Call\n\n        </div>\n\n        \n\n        <div *ngIf="isFirstPickup()"  (click)="allowComputerFirstTurn() " class="generic-btn-container">\n\n           Pass\n\n        </div>\n\n\n\n    </div>\n\n\n\n    <div class="player">\n\n        <div class="player-hand-container">\n\n            <div class="left-hand" [ngStyle]="{\'background-position-x\':leftHandLocation + \'px\'}"></div>\n\n            <div class="card-back"></div>\n\n            <div class="card-back"></div>\n\n            <div class="card-back"></div>\n\n            <div class="card-back"></div>\n\n            <div class="card-back"></div>\n\n            <div class="card-back"></div>\n\n            <div class="card-back"></div>\n\n            <div class="card-back"></div>\n\n            <section class="card-container" [ngClass]="{\'card-container-selected\':showAnimation===\'discard\'}">\n\n                <div id="selected-card" [ngClass]="{\'selected-card-selected\':showAnimation===\'discard\'}">\n\n                    <figure class="front"></figure>\n\n\n\n                    <figure class="back  {{_jrummy.ComputerHand.Cards[0].Suit}} {{_jrummy.ComputerHand.Cards[0].FaceValueString}}"></figure>\n\n                </div>\n\n            </section>\n\n        </div>\n\n        <div class="right-hand" [ngClass]="{\'right-hand-selected\':showAnimation===\'discard\'}">\n\n            <img src="http://lifespeak.s3.amazonaws.com/Images/righthand.png">\n\n        </div>\n\n\n\n    </div>\n\n\n\n    <div style="clear:both"></div>\n\n    <div class="pile-container">\n\n        <div id="stock-pile" class="card" (click)="pickupPlayerCard(_jrummy.Pile.Cards[0].Suit,_jrummy.Pile.Cards[0].Name,false) ">\n\n\n\n            <img src="http://lifespeak.s3.amazonaws.com/Images/card_back.png" class="move-card-item" style="display:none" [ngClass]="getPlayerAnimation(\'take-stock\')" />\n\n\n\n            <img src="http://lifespeak.s3.amazonaws.com/Images/card_back.png" />\n\n\n\n        </div>\n\n\n\n\n\n        <div *ngIf="_jrummy.DiscardPile.Cards.length >0 ">\n\n\n\n            <a href="javascript:void(0); " (click)="pickupPlayerCard(_jrummy.DiscardPile.Cards[0].Suit,_jrummy.DiscardPile.Cards[0].Name,true) ">\n\n\n\n <!-- <div class="move-card-item card {{_jrummy.DiscardPile.Cards[0].Suit}} {{_jrummy.DiscardPile.Cards[0].FaceValueString}}"  style="display:none" [ngClass]="{\'give-to-player\':showAnimation===\'take-discard\'}"  ></div>-->\n\n\n\n                <div id="discard-pile" class="card {{_jrummy.DiscardPile.Cards[0].Suit}} {{_jrummy.DiscardPile.Cards[0].FaceValueString}}"></div>\n\n            </a>\n\n\n\n\n\n        </div>\n\n    </div>\n\n</div>\n\n\n\n<div style="clear:both"></div>\n\n<div class="hand" [dragula]=\'"bag-one"\' [dragulaModel]=\'_jrummy.PlayerHand.Cards\'>\n\n    <div *ngFor="let card of _jrummy.PlayerHand.Cards;let i = index ">\n\n        <a href="javascript:void(0); " (click)="discardPlayerCard(card.Suit,card.Name,true);">\n\n\n\n            <div class="card {{card.Suit}} {{card.FaceValueString}} player-card"></div>\n\n\n\n\n\n        </a>\n\n    </div>\n\n\n\n</div>\n\n\n\n\n\n<div *ngIf="_jrummy.CurrentGame.CurrentStatus===8 ">\n\n\n\n    <a href="javascript:void(0); " (click)="allowComputerFirstTurn() ">Allow computer to select first</a>\n\n\n\n</div>\n\n\n\n\n\n\n\n<jrummy-modal [modalBody]="modalBody" (modalClosed)="onModalClosed($event)" *ngIf="modalIsActive"></jrummy-modal>\n\n<jrummy-completed (gameCompletedAction)="onGameCompleted($event)" [gameCompletedResult]="gameCompletedResult" *ngIf="gameCompletedResult!==\'\'"></jrummy-completed>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\game\game.html"*/
        }), 
        __metadata('design:paramtypes', [NavController, JRummy, JRummyText, ElementRef, AnimationCallback, DragulaService])
    ], GamePage);
    return GamePage;
}());
//# sourceMappingURL=game.js.map