import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PlayingCardComponent} from '../../shared/playingcard.component'
import {ModalComponent} from '../../shared/modal.component'
import {GameCompletedComponent} from '../../shared/gamecompleted.component'
import {Game, Card, Hand, Deck, JRummy, GameStatus} from '../../providers/jrummy/jrummy'
import {JRummyText} from '../../providers/jrummy-text'
import {AnimationCallback} from '../../providers/animation-callback'
import {DragulaModule, DragulaService} from "../../../node_modules/ng2-dragula/ng2-dragula"
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

    public keyFrameAnimation:string;

    public playerSortActive: boolean = false;

    public modalIsActive: boolean = false;

    public gameCompletedResult: string = '';

    public discardCard:number=0;

    public modalBody: string;

    public leftHandLocation: number = 0;

    private leftHandInterval: any;


    //this is a test method for running the computer by itself
    public getCard() {

        this._jrummy.computerPlay();
    }


    constructor(public navCtrl: NavController, public _jrummy: JRummy, public jrummyText: JRummyText, private elementRef: ElementRef, private animationCallback: AnimationCallback, private drugalaService: DragulaService) {

        this.currentGame = new Game();
        this._jrummy.startGame(this.currentGame);

        console.log(this._jrummy.PlayerHand)
        console.log(this._jrummy.ComputerHand)
        console.log(this._jrummy.ComputerHand)

    }

    ionViewWillEnter()
    {
        this._jrummy.reset();
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
            });

        $(".move-card-item").on("animationend",
            function (event) {
                self.showAnimation = "none";
                console.log('done');
                self.moveLeftHand(true);

            });

            this.PlayMainTrack();

    }



    public isFirstPickup():boolean
    {
        return this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup;
    }

    public pickupPlayerCard(suit: string, name: string, isFromDiscardPile: boolean) {
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
        this.setPlayerAnimation();
        this.currentGame.CurrentStatus = GameStatus.FirstTurnComputerPickup;
        this.computerCalls = this._jrummy.computerTurn();
        this.moveLeftHand(false);

    }

    public setPlayerAnimation(): void {
        let className: string = '';
            let vals: number[] = [0, 4, 2, 3, 0, 2, 0, 1, 0, 4];
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

        if (this._jrummy.gameIsDraw()) {
            this.displayModal(this.jrummyText.GAME_IS_DRAW);

            this.startNewGame(this.jrummyText.GAME_IS_DRAW_CONTINUE);

        }

        else if (this.currentGame.CurrentStatus == GameStatus.PlayerDiscard) {

            //Check if the computer has called -- if it has companre cards
            if (this._jrummy.discardFromPlayerHand(suit, name)) {

                this.computerCalls = true;
                this._jrummy.CurrentGame.CurrentStatus = GameStatus.ComputerCall;
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

    }





    public playerCall() {
        console.log('player called');
        this._jrummy.CurrentGame.CurrentStatus = GameStatus.PlayerCall;
        this.scoreGameAndPlayAgain();
    }

    public movePlayerCard(suit: string, name: string) {
        let targetCard: Card = _.filter(this._jrummy.PlayerHand.Cards, function (c: Card) { return c.Suit === suit && c.Name === name })[0];
        this._jrummy.PlayerHand.moveCardInHand(this.selectSortCard, targetCard);
        this.playerSortActive = false;
        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
    }

    private scoreGameAndPlayAgain(): void {

        this.gameCompletedResult = this._jrummy.compareHands();
    }

    public startNewGame(message: string): void {
        //if it's a new round start, otherwise reset
        if (this.gameCompletedResult === "PLAYER_WON_GAME" || this.gameCompletedResult === "PLAYER_WON_GAME") {
            this._jrummy.reset();
        }
        this.gameCompletedResult = "";
        this.currentGame = new Game();
        this._jrummy.startGame(this.currentGame);
    }

    private displayModal(modalText: string): void {
        this.modalIsActive = true;
        this.modalBody = modalText;

    }

    private onModalClosed(msg: string): void {
        this.modalIsActive = false

    }

    private onGameCompleted(completedAction: string) {
        if (completedAction === "play") {
            this.startNewGame('');
        }
        else {
            this.navCtrl.pop();
        }

    }

    public setDiscardCard(darylDone:boolean)
    {
        if(darylDone)
        {
            this.discardCard = 0;
        }
        else
        {
            this.discardCard = this._jrummy.DiscardPile.Cards.length>1?1:0;
        }
    }

    private PlayMainTrack():void{

        let myAudio = new Audio('assets/audio/main_track.mp3'); 
        myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
        }, false);
        myAudio.play();
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
                }
                else {
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



}
