import { Component, Input} from '@angular/core';

@Component({
    selector: 'jrummy-playingcard', 
    templateUrl: 'playingcard.component.html'
  
})

export class PlayingCardComponent{

@Input() public suit:string="spades";
@Input() public face:string="2";
@Input() public squeezed:boolean=false;


    constructor() {

    }


    
}