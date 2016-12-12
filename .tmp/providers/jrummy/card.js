var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
export var Card = (function () {
    function Card(faceValue, suit, cardName, pointValue, faceValueString) {
        this.Name = cardName;
        this.FaceValue = faceValue;
        this.Suit = suit;
        this.PointValue = pointValue;
        this.Meld = 'none';
        this.FaceValueString = faceValueString;
    }
    Card.prototype.inMeld = function () {
        return this.Meld == 'set' || this.Meld == 'run';
    };
    Card.prototype.toString = function () {
        return this.Name + " of " + this.Suit;
    };
    Card = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Number, String, String, Number, String])
    ], Card);
    return Card;
}());
//# sourceMappingURL=card.js.map