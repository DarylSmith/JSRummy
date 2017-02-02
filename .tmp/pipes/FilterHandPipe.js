var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
import * as _ from 'lodash';
export var FilterHandPipe = (function () {
    function FilterHandPipe() {
    }
    FilterHandPipe.prototype.transform = function (hand, meldType) {
        console.log(hand);
        var cardAmount = _.filter(hand.Cards, function (c) { return c.Meld == meldType; }).length;
        return cardAmount;
    };
    FilterHandPipe = __decorate([
        Pipe({ name: 'FilterHand' }), 
        __metadata('design:paramtypes', [])
    ], FilterHandPipe);
    return FilterHandPipe;
}());
//# sourceMappingURL=FilterHandPipe.js.map