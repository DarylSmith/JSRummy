import { Component, Input,Output,OnInit,EventEmitter} from '@angular/core';
import {Game, Card, Hand, Deck, JRummy, GameStatus} from '../providers/jrummy/jrummy'
import {JRummyText} from '../providers/jrummy-text'


@Component({
    selector: 'jrummy-completed', 
    templateUrl: 'gamecompleted.component.html'
  
})
export class GameCompletedComponent implements OnInit {

    @Output() gameCompletedAction:EventEmitter<string> = new EventEmitter<string> ();

    @Input() gameCompletedResult:string;
 
    constructor(private _jrummy:JRummy, private _jrummyText:JRummyText) {

    }

    public completeGame(completedAction:string):void{

        console.log('modal closed event');
        this. gameCompletedAction.emit(completedAction);

    }

    public getCompletedGameText()
    {

        return this.gameCompletedResult = this._jrummyText[this.gameCompletedResult];
    }

    ngOnInit(){

    }

    
}