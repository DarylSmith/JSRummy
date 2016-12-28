import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges} from '@angular/core';
import {Game, Card, Hand, Deck, JRummy, GameStatus} from '../providers/jrummy/jrummy'
import {JRummyText} from '../providers/jrummy-text'


@Component({
    selector: 'jrummy-completed',
    templateUrl: 'gamecompleted.component.html'

})
export class GameCompletedComponent implements OnInit {

    @Output() public gameCompletedAction: EventEmitter<string> = new EventEmitter<string>();

    @Input() public gameCompletedResult: string;

    private sortedPlayerHand: Hand;

    public headerText: string;

    constructor(public _jrummy: JRummy, public _jrummyText: JRummyText) {

    }

    public completeGame(completedAction: string): void {

        console.log('modal closed event');
        this.gameCompletedAction.emit(completedAction);

    }

    public getCompletedGameText() {

        if (this.gameCompletedResult !== undefined) {
            
            this.headerText = this.gameCompletedResult = this._jrummyText[this.gameCompletedResult];
            console.log(this.headerText);
        }
    }

    public sortByValue(hand: Hand): Card[] {

        this._jrummy.ComputerHand.sortByValue();
        console.log(this._jrummy.ComputerHand.Cards);
        return this._jrummy.ComputerHand.Cards;

    }

    ngOnChanges(changes: SimpleChanges) {
        this.getCompletedGameText();
    }

    ngOnInit() {

    }


}