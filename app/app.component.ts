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

    //this is a test method for running the computer by itself
    public getCard(){
        
         this._jrummy.computerPlay();
    }

    public pickupPlayerCard(suit:string,name:string, isFromDiscardPile:boolean)
    {
        if (this.currentGame.CurrentStatus==GameStatus.PlayerPickup)
        {

            this._jrummy.addCardToPlayerHand(suit,name,isFromDiscardPile);
        }
        else
        {

            window.alert('Not time to pickup');
        }

    }

    public discardPlayerCard(suit:string,name:string)
    {

  if (this.currentGame.CurrentStatus==GameStatus.PlayerDiscard)
        {

            this._jrummy.discardFromPlayerHand(suit,name);
        }
        else
        {

            window.alert('Not time to discard');
        }

    }


    constructor(jrummy:JRummy) {

        this._jrummy = jrummy;

        this.currentGame = new Game();

        this.computerCalls = false;

        this._jrummy.startGame(this.currentGame);
    }
}