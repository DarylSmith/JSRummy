import { Component } from 'angular2/core';
import {Game, Card, Hand, Deck, JRummy} from '.././services/jrummy.js'

@Component({
    selector: 'jrummy',
    templateUrl:'/app/app.component.html',
    providers:[JRummy]
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    
    private _jrummy: JRummy;

    public currentGame: Game;

    public computerCalls: boolean;

    public unitTestCard(suit:string,name:string) {
        
        this._jrummy.unitTestCard(suit, name);

    }

    public getCard(){
        
        this.computerCalls =  this._jrummy.computerPlaySolo();

    

    }



    constructor(jrummy:JRummy) {

        this._jrummy = jrummy;

        this.currentGame = new Game();

        this.computerCalls = false;

        this._jrummy.startGame(this.currentGame);
    }
}