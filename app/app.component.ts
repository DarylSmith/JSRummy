import { Component } from 'angular2/core';
import {Game, Card, Hand, Deck, JRummy,GameStatus} from '.././services/jrummy'

@Component({
    selector: 'jrummy',
    templateUrl:'/app/app.component.html',
    providers:[JRummy]
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    
    private _jrummy: JRummy;

    public currentGame: Game;

    public computerCalls:boolean;

    //this is a test method for running the computer by itself
    public getCard(){
        
         this._jrummy.computerPlay();
    }

    public  CurrentGameStatus : GameStatus;

    public pickupPlayerCard(suit:string,name:string, isFromDiscardPile:boolean)
    {
       //special case for first round (must choose from discard pile in first round)
       if(this.currentGame.CurrentStatus ===GameStatus.FirstTurnPlayerPickup  && !isFromDiscardPile)
       {
           window.alert(`On first turn, you must choose from the discard pile
           .Otherwise allow computer to go first`);

       }

       
        if (this.currentGame.CurrentStatus===GameStatus.PlayerPickup || this.currentGame.CurrentStatus===GameStatus.FirstTurnPlayerPickup  )
        {

            this._jrummy.addCardToPlayerHand(suit,name,isFromDiscardPile);
        }
        else
        {

            window.alert('Not time to pickup');
        }

    }

    //allows the computer to go first if this is first draw, and player doesn;t want discard
    public allowComputerFirstTurn()
    {
        this.currentGame.CurrentStatus=GameStatus.FirstTurnComputerPickup;
       this.computerCalls = this._jrummy.computerTurn();

    }

    public discardPlayerCard(suit:string,name:string)
    {

  if (this.currentGame.CurrentStatus==GameStatus.PlayerDiscard)
        {

            this.computerCalls = this._jrummy.discardFromPlayerHand(suit,name);
        }
        else
        {

            window.alert('Not time to discard');
        }

    }


    constructor(jrummy:JRummy) {

        this._jrummy = jrummy;

        this.currentGame = new Game();

        this._jrummy.startGame(this.currentGame);
        
    }
}