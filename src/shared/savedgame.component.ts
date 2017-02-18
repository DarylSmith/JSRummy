import { Component, Input,Output,OnInit,EventEmitter} from '@angular/core';
import {JRummyText} from '../providers/jrummy-text'

@Component({
    selector: 'jrummy-savedgame', 
    templateUrl: 'savedgame.component.html'
  
})
export class SavedGameComponent implements OnInit {

    @Input() public modalBody:string;
    @Output() modalClosed:EventEmitter<string> = new EventEmitter<string> ();
    private UseSavedScore:string="false";

    constructor(jrummyText:JRummyText) {

    }

    private closeModal():void{

        console.log('modal closed event');
        this.modalClosed.emit(this.UseSavedScore);

    }

    public setScore(choice:string)
    {
        this.UseSavedScore = choice;
        this.closeModal();
    }


    ngOnInit(){


    }

    
}