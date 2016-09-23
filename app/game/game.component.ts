import { Component } from '@angular/core';
import {Game, Card, Hand, Deck, JRummy, GameStatus} from '../services/jrummy'

@Component({
    selector: 'jrummy-game',
    templateUrl: 'app/game/game.component.html',
  
})
export class GameComponent {
    pageTitle: string = 'Acme Product Management';

    private _jrummy: JRummy = new JRummy();

    public currentGame: Game;

    public computerCalls: boolean;

    //this is a test method for running the computer by itself
    public getCard() {

        this._jrummy.computerPlay();
    }

    public CurrentGameStatus: GameStatus;

    constructor(jrummy: JRummy) {

        this._jrummy = jrummy;

        this.currentGame = new Game();

        this._jrummy.startGame(this.currentGame);

    }


    public pickupPlayerCard(suit: string, name: string, isFromDiscardPile: boolean) {
        //special case for first round (must choose from discard pile in first round)
        if (this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup && !isFromDiscardPile) {
            window.alert(`On first turn, you must choose from the discard pile
           .Otherwise allow computer to go first`);

        }


        if (this.currentGame.CurrentStatus === GameStatus.PlayerPickup || this.currentGame.CurrentStatus === GameStatus.FirstTurnPlayerPickup) {

            this._jrummy.addCardToPlayerHand(suit, name, isFromDiscardPile);
        }
        else {

            window.alert('Not time to pickup');
        }

    }

    //allows the computer to go first if this is first draw, and player doesn;t want discard
    public allowComputerFirstTurn() {
        this.currentGame.CurrentStatus = GameStatus.FirstTurnComputerPickup;
        this.computerCalls = this._jrummy.computerTurn();

    }

    public discardPlayerCard(suit: string, name: string) {

        if (this.currentGame.CurrentStatus == GameStatus.PlayerDiscard) {

            //Check if the computer has called -- if it has companre cards
            if (this._jrummy.discardFromPlayerHand(suit, name)) {

                this.computerCalls = true;
                this._jrummy.CurrentGame.CurrentStatus = GameStatus.ComputerCall;
                this.scoreGameAndPlayAgain()

            }
        }
        else {

            window.alert('Not time to discard');
        }

    }

    public playerCall() {

        this._jrummy.CurrentGame.CurrentStatus = GameStatus.PlayerCall;
        this.scoreGameAndPlayAgain();
    }



    private scoreGameAndPlayAgain(): void {

        this._jrummy.compareHands();

        let winningPlaterStr = this._jrummy.CurrentGame.CurrentStatus == GameStatus.ComputerWon ? "Computer Won" : "Player Won";


        if (window.confirm(winningPlaterStr + "Do you wish to continue?")) {

            this.currentGame = new Game();

            this._jrummy.startGame(this.currentGame);

        }

    }
}