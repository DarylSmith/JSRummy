import { Component, Input,Output,OnInit,EventEmitter} from '@angular/core';
import {Game, Card, Hand, Deck, JRummy, GameStatus} from '../providers/jrummy/jrummy'
import {JRummyText} from '../providers/jrummy-text'


@Component({
    selector: 'jrummy-completed', 
    templateUrl: 'gamecompleted.component.html'
  
})
export class GameCompletedComponent implements OnInit {

    @Output() modalClosed:EventEmitter<string> = new EventEmitter<string> ();

    constructor(private _jrummy:JRummy, private _jrummyText:JRummyText) {

    }

    private closeModal():void{

        console.log('modal closed event');
        this.modalClosed.emit('closed');

    }
    ngOnInit(){


    }

    
}