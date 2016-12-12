import { Injectable } from '@angular/core';
import {CardLocation} from './enums';

@Injectable()
export class Card {
    ID: string;
    Name: string;
    FaceValue: number;
    PointValue: number;
    FaceValueString: string;
    Suit: string;
    VPos: number;
    HPos: number;
    Meld: string;
    Location: CardLocation;
    PlayerDiscard: boolean;

    //these are the number of points the computer assigns to a cards based on others with the same face value
    HPoints: number;

    //these are the points a computer assigns based on runs
    VPoints: number;
    constructor(faceValue: number, suit: string, cardName: string, pointValue: number, faceValueString: string) {

        this.Name = cardName;
        this.FaceValue = faceValue;
        this.Suit = suit;
        this.PointValue = pointValue;
        this.Meld = 'none';
        this.FaceValueString = faceValueString;

    }


    public inMeld(): boolean {

        return this.Meld == 'set' || this.Meld == 'run';
    }
    toString(): string {

        return `${this.Name} of ${this.Suit}`
    }


}

