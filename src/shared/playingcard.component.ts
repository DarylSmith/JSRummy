import { Component, Input} from '@angular/core';

@Component({
    selector: 'jrummy-playingcard', 
    templateUrl: 'playingcard.component.html'
  
})

export class PlayingCardComponent{

@Input() public suit:string="spades";
@Input() public face:string="2";
@Input() public keyframe:string="";
@Input() public squeezed:boolean=false;

public get redSuit():string{

   return  this.suit=="hearts" || this.suit==="diamonds"? "red":"black";
}


public getCardSymbol(suit: string) {
        switch (suit) {
            case "hearts":
                return "♥"
            case "spades":
                return "♠"
            case "clubs":
                return "♣"
            default:
                return "♦"

        }

    }



    constructor() {

    }


    
}