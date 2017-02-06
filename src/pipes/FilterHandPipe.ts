import { Pipe, PipeTransform } from '@angular/core';
import { Card, Hand, Deck } from '../providers/jrummy/jrummy'
import * as _ from 'lodash';


@Pipe({ name: 'FilterHand' })
export class FilterHandPipe implements PipeTransform {
  transform(hand: Hand, meldType: string) {
    console.log(hand);
    let cardAmount: number = 0;
    if (meldType === "none") {
      cardAmount = _.filter(hand.Cards, function (c: Card) { return c.Meld === "none" || c.Meld === "deadwood"}).length;
    }
    else {
      cardAmount = _.filter(hand.Cards, function (c: Card) { return c.Meld == meldType }).length;
    }
    return cardAmount;
  }
}