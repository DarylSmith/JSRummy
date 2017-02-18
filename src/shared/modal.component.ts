import { Component, Input,Output,OnInit,EventEmitter} from '@angular/core';
import {JRummyText} from '../providers/jrummy-text'


@Component({
    selector: 'jrummy-modal', 
    templateUrl: 'modal.component.html'
  
})
export class ModalComponent implements OnInit {

    @Input() public modalBody:string;
    @Output() modalClosed:EventEmitter<string> = new EventEmitter<string> ();

    constructor(jrummyText:JRummyText) {
        
    }

    public closeModal():void{

        console.log('modal closed event');
        this.modalClosed.emit('closed');

    }


    ngOnInit(){


    }

    
}