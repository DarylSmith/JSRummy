var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
export var PlayingCardComponent = (function () {
    function PlayingCardComponent() {
        this.suit = "spades";
        this.face = "2";
        this.keyframe = "";
        this.squeezed = false;
    }
    Object.defineProperty(PlayingCardComponent.prototype, "redSuit", {
        get: function () {
            return this.suit == "hearts" || this.suit === "diamonds" ? "red" : "black";
        },
        enumerable: true,
        configurable: true
    });
    PlayingCardComponent.prototype.getCardSymbol = function (suit) {
        switch (suit) {
            case "hearts":
                return "♥";
            case "spades":
                return "♠";
            case "clubs":
                return "♣";
            default:
                return "♦";
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], PlayingCardComponent.prototype, "suit", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], PlayingCardComponent.prototype, "face", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], PlayingCardComponent.prototype, "keyframe", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PlayingCardComponent.prototype, "squeezed", void 0);
    PlayingCardComponent = __decorate([
        Component({
            selector: 'jrummy-playingcard',template:/*ion-inline-start:"C:\inetpub\wwwroot\jrummy-ionic\src\shared\playingcard.component.html"*/'<div class="card {{suit}} {{face}} {{keyframe}}" [ngClass]="squeezed?\'player-card-squeezed\':\'player-card\'">\n\n    <div class="top-row"><img src="Images/heart.png"/></div>\n\n    <div class="middle-row"></div>\n\n    <div class="bottom-row"><span>{{getCardSymbol(suit)}}</span></div> \n\n</div>'/*ion-inline-end:"C:\inetpub\wwwroot\jrummy-ionic\src\shared\playingcard.component.html"*/
        }), 
        __metadata('design:paramtypes', [])
    ], PlayingCardComponent);
    return PlayingCardComponent;
}());
//# sourceMappingURL=playingcard.component.js.map