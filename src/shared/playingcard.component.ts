import { Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'jrummy-playingcard', 
    templateUrl: 'playingcard.component.html'
  
})

export class PlayingCardComponent{

public noseImageClass:string="nose-image-display-1";

@Input() public suit:string="spades";
@Input() public face:string="2";
@Input() public keyframe:string="";
@Input() public squeezed:boolean=false;


    constructor() {

    }

ngOnChanges(){

        let vals: number[] = [1,2];
        let version: number = vals[Math.floor(Math.random() * vals.length)];
        this.noseImageClass=`nose-image-display-${version}`;

}


    
}