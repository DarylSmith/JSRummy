import { Pipe, PipeTransform } from '@angular/core';
import {Card, Hand, Deck} from '../providers/jrummy/jrummy'


@Pipe({ name: 'SortHand' })
export class SortHandPipe implements PipeTransform {
  transform(hand: Hand) {
    hand.sortByValue();
    return hand.Cards;
  }
}