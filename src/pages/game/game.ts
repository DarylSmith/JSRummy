import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayingCardComponent } from '../../shared/playingcard.component'
import { ModalComponent } from '../../shared/modal.component'
import { GameCompletedComponent } from '../../shared/gamecompleted.component'
import { Game, Card, Hand, Deck, JRummy, GameStatus } from '../../providers/jrummy/jrummy'
import { JRummyText } from '../../providers/jrummy-text'
import { AudioManager } from '../../providers/audioManager'
import { StateManager } from '../../providers/audioManager';
import { AnimationCallback } from '../../providers/animation-callback'
import { DragulaModule, DragulaService } from "../../../node_modules/ng2-dragula/ng2-dragula"
import { ErrorPage } from '../error/error'

import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
    selector: 'page-game',
    templateUrl: 'game.html'
})
export class GamePage {
    pageTitle: string = 'Beat Daryl @ Gin Rummy';

    public currentGame: Game;

    public computerCalls: boolean;

    public showAnimation: string = "none";

    public selectSortCard: Card;

    public selectedCardIndex: number;

    public keyFrameAnimation: string;

    public reactionInterval: any;

    public reactionStyles: string = "53px -14px";

    public playerSortActive: boolean = false;

    public modalIsActive: boolean = false;

    public gameCompletedResult: string = '';

    public lastDiscardCard: Card;

    public showlastDiscard: boolean = false;

    public discardCard: number = 0;

    public modalBody: string;

    public leftHandLocation: number = 0;

    private leftHandInterval: any;

    public turnText: string = "";

    public showSharedModal: boolean = false;;



    //this is a test method for running the computer by itself
    public getCard() {

        this._jrummy.computerPlay();
    }


    constructor(public navCtrl: NavController, public _jrummy: JRummy, public jrummyText: JRummyText, private elementRef: ElementRef, private animationCallback: AnimationCallback, private drugalaService: DragulaService, private stateManager: StateManager, private audioManager: AudioManager, ) {

        this.currentGame = new Game();
        this._jrummy.startGame(this.currentGame);

        console.log(this._jrummy.PlayerHand)
        console.log(this._jrummy.ComputerHand)
        console.log(this._jrummy.ComputerHand)

    }

    ionViewWillEnter() {
        this._jrummy.reset();
    }

    ionViewWillLeave() {

        this.audioManager.stopMainTrack();
    }


    ionViewDidLoad() {

        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
        let transitionEvent = this.animationCallback.whichAnimationEvent();
        this.setPlayerAnimation();
        let self = this;
        $(".card-container").on("animationend",
            function (event) {
                self.showAnimation = "none";
                self.setDiscardCard(true);
                self.turnText = self.jrummyText.PLAYER_TURN;
            });

        $(".move-card-item").on("animationend",
            function (event) {
                self.showAnimation = "none";
                console.log('done');
                self.moveLeftHand(true);

            });

        $(document).on("jrummy-error-raised", function () {
            alert('an error occured');
            self.navCtrl.push(ErrorPage);

        }
        );



        this.audioManager.playMainTrack();
        this.turnText = this.jrummyText.PLAYER_TURN;

        if (this.stateManager.isSet) {
            this.showSharedModal = true;
        }
        else {
            this.displayModal(this.jrummyText.BEGIN_PLAY_INSTRUCTIONS);
        }
        this.drugalaService.drag.subscribe((value) => {
            console.log("draggin'");
            self.audioManager.playCardSortTrack();

        });

        this.drugalaService.dragend.subscribe((value) => {
            console.log("stoppin'");
            self.audioManager.stopcardSortTrack();
            self._jrummy.evaluatePlayerHand();

        });

    }



    public isFirstPickup(): boolean {
        return this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup;
    }

    public pickupPlayerCard(suit: string, name: string, isFromDiscardPile: boolean) {

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

    }

    //allows the computer to go first if this is first draw, and player doesn;t want discard
    public allowComputerFirstTurn() {
        this.audioManager.playSoundEffect("button_press.mp3");
        this.setPlayerAnimation();
        this.currentGame.CurrentStatus = GameStatus.FirstTurnComputerPickup;
        this.computerCalls = this._jrummy.computerTurn();
        this.moveLeftHand(false);

    }

    public setPlayerAnimation(): void {
        let className: string = '';
        let vals: number[] = [1, 4, 2, 3, 4, 2, 3, 1, 2, 4];
        let version: number = vals[Math.floor(Math.random() * vals.length)];
        this.keyFrameAnimation = `give-to-player-${version}`
    }

    public getPlayerAnimation(animationClass: string): string {
        let className: string = '';
        if (animationClass === this.showAnimation) {

            className = this.keyFrameAnimation;
        }
        return className;

    }


    public getPlayer(): void {
        let className: string = '';
        let vals: number[] = [0, 4, 2, 3, 4, 2, 2, 1, 3, 4];
        let version: number = vals[Math.floor(Math.random() * vals.length)];
        this.keyFrameAnimation = `give-to-player give-to-player-${version}`
    }
    public discardPlayerCard(suit: string, name: string) {

        this.turnText = this.jrummyText.DARYL_TURN;

        this.audioManager.playSoundEffect("player_card_select.mp3");

        this.lastDiscardCard = _.cloneDeep(_.filter(this._jrummy.PlayerHand.Cards, function (c: Card) { return c.Name == name && c.Suit == suit })[0]);


        if (this._jrummy.gameIsDraw()) {
            this.displayModal(this.jrummyText.GAME_IS_DRAW);

            this.startNewGame(this.jrummyText.GAME_IS_DRAW_CONTINUE);

        }

        else if (this.currentGame.CurrentStatus == GameStatus.PlayerDiscard) {

            //Check if the computer has called -- if it has companre cards
            if (this._jrummy.discardFromPlayerHand(suit, name)) {

                this.computerCalls = true;
                this._jrummy.CurrentGame.CurrentStatus = GameStatus.ComputerCall;
                this._jrummy.evaluatePlayerHand();
                this.scoreGameAndPlayAgain()


            }
            //play animation for computer discarding
            else {
                this.moveLeftHand(false);
            }
        }
        else {
            //user can sort cards
            //select a card for player to sort
            if (!this.playerSortActive) {
                console.log('Time to sort');
                this.selectSortCard = _.filter(this._jrummy.PlayerHand.Cards, function (c: Card) { return c.Suit === suit && c.Name === name })[0];
                this.selectedCardIndex = _.findIndex(this._jrummy.PlayerHand.Cards, function (c: Card) { return c.Suit === suit && c.Name === name });

                this.playerSortActive = true;
            }
            //if the player clicks again, set to files
            else {
                this.playerSortActive = false;
                this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
            }

        }

        //check if there are any errors if so, add a modal and restart the game
        if (this.currentGame.ErrorOccured) {

            this.ExecuteErrorRestart();

        }

    }


    private ExecuteErrorRestart() {
        this.currentGame.ErrorOccured = false;
        alert("Sorry, an error occured. We'll start again ");
        this.startNewGame("");


    }


    public playerCall() {
        this.audioManager.playSoundEffect("button_press.mp3");
        console.log('player called');
        if (this._jrummy.PlayerHand.cardsMissing()) {
            this.ExecuteErrorRestart();
            return;
        }

        if(this._jrummy.PlayerHand.getCurrentPoints()>100)
        {
          this.displayModal(this.jrummyText.CANT_CALL_YET);
          return;
        }

         this._jrummy.evaluatePlayerHand();
        if (this._jrummy.CurrentGame.CurrentStatus === GameStatus.PlayerPickup) {
            this._jrummy.CurrentGame.CurrentStatus = GameStatus.PlayerCall;
            this.scoreGameAndPlayAgain();
            this.turnText = this.jrummyText.GAME_OVER;
        }
        else {
            this.displayModal(this.jrummyText.NO_CALL_ALLOWED);
        }
    }


    public movePlayerCard(suit: string, name: string) {
        let targetCard: Card = _.filter(this._jrummy.PlayerHand.Cards, function (c: Card) { return c.Suit === suit && c.Name === name })[0];
        this._jrummy.PlayerHand.moveCardInHand(this.selectSortCard, targetCard);
        this.playerSortActive = false;
        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
    }

    private scoreGameAndPlayAgain(): void {

        this.turnText = this.jrummyText.GAME_OVER;
        this.gameCompletedResult = this._jrummy.compareHands();
        this.stateManager.SaveState(this._jrummy.ComputerPoints, this._jrummy.PlayerPoints, this._jrummy.CurrentGameNumber);
    }

    public startNewGame(message: string): void {
        //if it's a new round start, otherwise reset
        if (this.gameCompletedResult === "PLAYER_WON_GAME" || this.gameCompletedResult === "DARYL_WON_GAME") {
            this._jrummy.reset();
            this.stateManager.ClearState();
        }
        this.gameCompletedResult = "";
        this.currentGame = new Game();
        this.turnText = this.jrummyText.PLAYER_TURN;
        this._jrummy.startGame(this.currentGame);
        this._jrummy.evaluatePlayerHand();
    }

    private displayModal(modalText: string): void {
        this.audioManager.stopMainTrack();

        this.modalIsActive = true;
        this.modalBody = modalText;

    }

    private onModalClosed(msg: string): void {
        this.modalIsActive = false
        this.audioManager.playMainTrack();


    }

    private onGameCompleted(completedAction: string) {
        if (completedAction === "play") {
            this.startNewGame('');
        }
        else {
            this.navCtrl.pop();
        }

    }

    public onSharedCompleted(completedAction: string) {

        if (completedAction === "true") {
            this._jrummy.ComputerPoints = this.stateManager.computerScore;
            this._jrummy.PlayerPoints = this.stateManager.playerScore;
            this._jrummy.CurrentGameNumber = this.stateManager.currentRound;

        }
        this.showSharedModal = false;
    }


    public setDiscardCard(darylDone: boolean) {
        if (darylDone) {
            this.discardCard = 0;
        }
        else {
            this.discardCard = this._jrummy.DiscardPile.Cards.length > 1 ? 1 : 0;
        }
    }


    public playerReaction(): void {

        let playerReactions: number[] = [1, 2, 1, 2, 1, 2];
        let reactionIndex: number[] = [53, -239, -544, -847, -1152];
        let xCoord: number = 158;
        let anIndex = 0;
        let index = 0;
        let reaction: number = playerReactions[Math.floor(Math.random() * playerReactions.length)];

        //no reaction if reaction is 0
        if (reaction > 0) {
            this.reactionInterval = setInterval(() => {
                if (index === (reactionIndex.length * 2) - 1) {
                    this.setPlayerReaction(53, -14);
                    clearInterval(this.reactionInterval);

                }
                else {

                    let yIndex = reaction === 2 ? -158 : -14;
                    if (index === 0) {

                        this.setPlayerReaction(53, yIndex);
                    }
                    else {
                        this.setPlayerReaction(reactionIndex[anIndex], yIndex);
                    }

                    index++;
                    anIndex = index > reactionIndex.length ? anIndex - 1 : anIndex + 1;

                }
                console.log(`anindex ${index}`)
            }, 100);
        }


    }

    private setPlayerReaction(x: number, y: number): void {

        this.reactionStyles = `${x}px ${y}px`

    }



    public moveLeftHand(moveIn: boolean) {

        let handIndex: number[] = moveIn ? [-304, -260, -222, -185, -146 - 209, -72, 0] : [0, -72, -109, -146, -185, -222, -260, -304];
        let index = 0;
        this.setDiscardCard(false);

        this.leftHandInterval = setInterval(() => {
            if (index === handIndex.length - 1) {
                clearInterval(this.leftHandInterval);
                if (!moveIn) {
                    this.setPlayerAnimation();
                    this.showAnimation = this._jrummy.CurrentGame.ComputerSelectedDiscard ? 'take-discard' : 'take-stock';
                    this.audioManager.playSoundEffect('laser3.wav');

                }
                else {
                    this.playerReaction();
                    this.audioManager.playSoundEffect('laser2.wav');
                    this.showAnimation = "discard";
                    index++;
                }
            }
            else {


                this.leftHandLocation = handIndex[index];
                index++;

            }

        }, 100);



    }

    //dragula events




}
