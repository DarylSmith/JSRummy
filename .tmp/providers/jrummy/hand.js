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
import * as _ from 'lodash';
export var Hand = (function () {
    function Hand(Name) {
        this.Name = Name;
        this.Cards = new Array();
    }
    Hand.prototype.moveCardInHand = function (selectedCard, targetCard) {
        var old_index = _.findIndex(this.Cards, function (c) { return selectedCard.Suit === c.Suit && selectedCard.Name === c.Name; });
        var new_index = _.findIndex(this.Cards, function (c) { return targetCard.Suit === c.Suit && targetCard.Name === c.Name; }) + 1;
        this.Cards = this.moveItemInArray(old_index, new_index, this.Cards);
    };
    Hand.prototype.getCurrentPoints = function () {
        var total = _.reduce(this.Cards, function (sum, c) { return c.Meld === 'set' || c.Meld === 'run' ? sum : sum + c.PointValue; }, 0);
        return total;
    };
    Hand.prototype.resetPointsInHand = function () {
        for (var i = 0; i < this.Cards.length; i++) {
            this.Cards[i].HPoints = 0;
            this.Cards[i].VPoints = 0;
            this.Cards[i].Meld = "none";
        }
    };
    Hand.prototype.sortByValue = function () {
        //first, get all the cards in melds
        var cardsInMeld = _.sortBy(_.filter(this.Cards, function (c) { return c.inMeld(); }), function (c) { return c.FaceValue; });
        //next get cards oppenent is collecting
        var oppenentCards = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld == "opponentcollecting"; }), function (c) { return c.PointValue; });
        //then get all the cards with points
        var cardsWithTwoPoints = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 2); }), function (c) { return (c.PointValue); });
        //then get all the cards with points
        var cardsWithOnePoint = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'none' && (c.VPoints + c.HPoints == 1); }), function (c) { return (c.PointValue); });
        //then get all the cards without points
        var cardsWithoutPoints = _.sortBy(_.filter(this.Cards, function (c) { return c.Meld === 'deadwood' || (c.Meld === 'none' && (c.VPoints + c.HPoints === 0)); }), function (c) { return (c.PointValue); });
        //concatenate cards 
        var cardsSorted = cardsInMeld.concat(cardsWithTwoPoints, oppenentCards, cardsWithOnePoint, cardsWithoutPoints);
        //new concatenate the arrays and return
        this.Cards = cardsSorted;
    };
    Hand.prototype.moveItemInArray = function (old_index, new_index, target) {
        if (new_index >= target.length) {
            var k = new_index - target.length;
            while ((k--) + 1) {
                target.push(undefined);
            }
        }
        target.splice(new_index, 0, target.splice(old_index, 1)[0]);
        return target;
    };
    ;
    Hand = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [String])
    ], Hand);
    return Hand;
}());
//# sourceMappingURL=hand.js.map