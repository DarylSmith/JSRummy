import { Injectable } from '@angular/core';
import {Card} from './card';

@Injectable()
export class Deck {

    private _suits: Array<string> = ["spades", "hearts", "diamonds", "clubs"];
    private _cardName: Array<string> = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    private _faceValueString: Array<string> = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
    private _faceValue: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    private _pointValue: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    private _cards: Array<Card> = [];

    //create cards and add to deck array	
    constructor() {
        var mySuit: string;
        var myCard: Card;
        for (var i = 0; i <= this._suits.length - 1; i++) {
            mySuit = this._suits[i];
            for (var j = 0; j <= this._faceValue.length - 1; j++) {

                var myCard = new Card(this._faceValue[j], mySuit, this._cardName[j], this._pointValue[j], this._faceValueString[j]);
                this._cards.push(myCard);
            }

        }

    }

    get Cards(): Array<Card> {
        return this._cards;
    }

    shuffle() {
        for (var i = this._cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this._cards[i];
            this._cards[i] = this._cards[j];
            this._cards[j] = temp;
        }
    }


}