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

    public getCard(){
        
        this._jrummy.computerPlaySolo();
    

    }



    constructor(jrummy:JRummy) {

        this._jrummy = jrummy;

        this.currentGame = new Game();

        this._jrummy.startGame(this.currentGame);
    }
}