import { Injectable } from '@angular/core';
import {Card} from './card';
import {GameStatus,CardLocation} from './enums';
import * as _ from 'lodash';

@Injectable()
export class Hand {
    Cards: Array<Card>;

    constructor(public Name: string) {

        this.Cards = new Array<Card>();
    }

    public moveCardInHand(selectedCard: Card, targetCard: Card) {
        let old_index: number = _.findIndex(this.Cards, function (c: Card) { return selectedCard.Suit === c.Suit && selectedCard.Name === c.Name });
        let new_index: number = _.findIndex(this.Cards, function (c: Card) { return targetCard.Suit === c.Suit && targetCard.Name === c.Name }) + 1;
        this.Cards = this.moveItemInArray(old_index, new_index, this.Cards);
    }

    public getCurrentPoints() {
        let total: number = _.reduce(this.Cards, function (sum: number, c: Card) { return c.Meld === 'set' || c.Meld === 'run' ? sum : sum + c.PointValue }, 0);
        return total;
    }

    resetPointsInHand() {

        for (var i = 0; i < this.Cards.length; i++) {
            this.Cards[i].HPoints = 0;
            this.Cards[i].VPoints = 0;
            this.Cards[i].Meld = "none";
        }

    }

    public sortByValue(): void {



        //first, get all the cards in melds
        let cardsInMeld = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.inMeld() }), function (c: Card) { return c.FaceValue });

        //next get cards oppenent is collecting
        let oppenentCards = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld == "opponentcollecting" }), function (c: Card) { return c.PointValue });

        //then get all the cards with points
        let cardsWithTwoPoints = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 2) }), function (c: Card) { return (c.PointValue) });

        //then get all the cards with points
        let cardsWithOnePoint = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 1) }), function (c: Card) { return (c.PointValue) });

        //then get all the cards without points
        let cardsWithoutPoints = _.sortBy(_.filter(this.Cards, function (c: Card) { return c.Meld === 'deadwood' || (c.Meld === 'none' && (c.VPoints + c.HPoints === 0)) }), function (c: Card) { return (c.PointValue) });

        //concatenate cards 
        let cardsSorted: Array<Card> = cardsInMeld.concat(cardsWithTwoPoints, oppenentCards, cardsWithOnePoint, cardsWithoutPoints);

        //new concatenate the arrays and return
        this.Cards = cardsSorted;
    }

    private moveItemInArray(old_index: number, new_index: number, target: Card[]): Card[] {
        if (new_index >= target.length) {
            var k = new_index - target.length;
            while ((k--) + 1) {
                target.push(undefined);
            }
        }
        target.splice(new_index, 0, target.splice(old_index, 1)[0]);
        return target;
    };
 
}

