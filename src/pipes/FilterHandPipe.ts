import { Pipe, PipeTransform } from '@angular/core';
import {Card, Hand, Deck} from '../providers/jrummy/jrummy'
import * as _ from 'lodash';


@Pipe({ name: 'FilterHand' })
export class FilterHandPipe implements PipeTransform {
  transform(hand: Hand, meldType:string) {
    console.log(hand);
    
   let cardAmount:number =  _.filter(hand.Cards, function (c: Card) { return c.Meld ==meldType}).length;
    
    return cardAmount;
  }
}