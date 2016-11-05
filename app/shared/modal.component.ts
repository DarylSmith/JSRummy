import { Component, Input,Output,OnInit,EventEmitter} from '@angular/core';


@Component({
    selector: 'jrummy-modal', 
    templateUrl: 'app/shared/modal.component.html'
  
})
export class ModalComponent implements OnInit {

    @Input() public modalBody:string;
    @Output() modalClosed:EventEmitter<string> = new EventEmitter<string> ();

    constructor() {

    }

    private closeModal():void{

        console.log('modal closed event');
        this.modalClosed.emit('closed');

    }
    ngOnInit(){


    }

    
}