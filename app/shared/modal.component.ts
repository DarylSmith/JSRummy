import { Component, Input,OnInit} from '@angular/core';


@Component({
    selector: 'jrummy-modal', 
    templateUrl: 'app/shared/modal.component.html'
  
})
export class ModalComponent implements OnInit {

    @Input() public modalBody:string;

    constructor() {

    }

    ngOnInit(){


    }

    
}