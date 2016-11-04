import { Component,ElementRef } from '@angular/core';
import {ModalComponent} from '../shared/modal.component'
import {Game, Card, Hand, Deck, JRummy, GameStatus} from '../services/jrummy'
import {JRummyText} from '../services/jrummyText'
import {AnimationCallback} from '../services/animationCallback'
import * as $ from 'jquery';
import * as _ from 'lodash';


@Component({
    selector: 'jrummy-game', 
    templateUrl: 'app/game/game.component.html',
    directives:[ModalComponent]
  
})
export class GameComponent {
    pageTitle: string = 'Beat Daryl @ ';

    private _jrummy: JRummy = new JRummy();

    public currentGame: Game;

    public computerCalls: boolean;

    public showAnimation:string = "none";

    public selectSortCard:Card;

    public selectedCardIndex:number;

    public playerSortActive:boolean=false;

    public modalIsActive:boolean=false;

    public modalBody:string;

    //this is a test method for running the computer by itself
    public getCard() {

        this._jrummy.computerPlay();
    }

    public CurrentGameStatus: GameStatus;

    constructor(jrummy: JRummy,private jrummyText:JRummyText, private elementRef:ElementRef,private animationCallback:AnimationCallback) {

        this._jrummy = jrummy;

        this.currentGame = new Game();

        this._jrummy.startGame(this.currentGame);

    }

    ngOnInit(){
        this.selectSortCard= this._jrummy.ComputerHand.Cards[0];
        let transitionEvent = this.animationCallback.whichAnimationEvent();
        let self = this;
         $(".card-container").on("animationend",
              function(event) {
                self.showAnimation = "none";
         });


    }


    public pickupPlayerCard(suit: string, name: string, isFromDiscardPile: boolean) {
        //special case for first round (must choose from discard pile in first round)
        if (this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup && !isFromDiscardPile) {
            this.displayModal(this.jrummyText.PICK_FIRST_CARD);

        }
        if (this.currentGame.CurrentStatus === GameStatus.PlayerPickup || this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup) {

            this._jrummy.addCardToPlayerHand(suit, name, isFromDiscardPile);
        }
        else {

            this.displayModal(this.jrummyText.NOT_PICKUP_TIME);
        }

    }

    //allows the computer to go first if this is first draw, and player doesn;t want discard
    public allowComputerFirstTurn() {
        this.currentGame.CurrentStatus = GameStatus.FirstTurnComputerPickup;
        this.computerCalls = this._jrummy.computerTurn();

    }

    public discardPlayerCard(suit: string, name: string) {

        if( this._jrummy.gameIsDraw())
        {
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
            else
            {
                this.showAnimation = "discard";

            }
        }
        else {
            //user can sort cards
                 //select a card for player to sort
            if(!this.playerSortActive)
            {
                console.log('Time to sort');
                this.selectSortCard = _.filter(this._jrummy.PlayerHand.Cards, function(c:Card){return c.Suit===suit && c.Name ===name})[0];
                this.selectedCardIndex =_.findIndex(this._jrummy.PlayerHand.Cards, function(c:Card){return c.Suit===suit && c.Name ===name});

                 this.playerSortActive=true;
            }
            //if the player clicks again, set to files
            else
            {
                this.playerSortActive=false;
                this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
            }

        }  

    }

    public playerCall() {
        console.log('player called');
        this._jrummy.CurrentGame.CurrentStatus = GameStatus.PlayerCall;
        this.scoreGameAndPlayAgain();
    }

    public movePlayerCard(suit: string, name: string) 
    {
        let  targetCard:Card = _.filter(this._jrummy.PlayerHand.Cards, function(c:Card){return c.Suit===suit && c.Name ===name})[0];
        this._jrummy.PlayerHand.moveCardInHand(this.selectSortCard, targetCard);
        this.playerSortActive=false;
        this.selectSortCard = this._jrummy.ComputerHand.Cards[0];
    }

    private scoreGameAndPlayAgain(): void {

        let result:string = this._jrummy.compareHands();

        let winningPlaterStr = this._jrummy.CurrentGame.CurrentStatus == GameStatus.ComputerWon ? "Computer Won" : "Player Won";

        this.startNewGame(winningPlaterStr + "Do you wish to continue?");
    }

    private startNewGame(message:string):void
    {
          if (window.confirm(message)) {
            this.currentGame = new Game();

            this._jrummy.startGame(this.currentGame);
          }
    }

    private displayModal(modalText:string):void
    {
        this.modalIsActive=true;
        this.modalBody=modalText;

    }
}