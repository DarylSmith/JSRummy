var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JRummy } from '../providers/jrummy/jrummy';
import { JRummyText } from '../providers/jrummy-text';
export var GameCompletedComponent = (function () {
    function GameCompletedComponent(_jrummy, _jrummyText) {
        this._jrummy = _jrummy;
        this._jrummyText = _jrummyText;
        this.gameCompletedAction = new EventEmitter();
    }
    GameCompletedComponent.prototype.completeGame = function (completedAction) {
        console.log('modal closed event');
        this.gameCompletedAction.emit(completedAction);
    };
    GameCompletedComponent.prototype.getCompletedGameText = function () {
        if (this.gameCompletedResult !== undefined) {
            this.headerText = this.gameCompletedResult = this._jrummyText[this.gameCompletedResult];
            console.log(this.headerText);
        }
    };
    GameCompletedComponent.prototype.sortByValue = function (hand) {
        this._jrummy.ComputerHand.sortByValue();
        console.log(this._jrummy.ComputerHand.Cards);
        return this._jrummy.ComputerHand.Cards;
    };
    GameCompletedComponent.prototype.ngOnChanges = function (changes) {
        this.getCompletedGameText();
    };
    GameCompletedComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Output(), 
        __metadata('design:type', (typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a) || Object)
    ], GameCompletedComponent.prototype, "gameCompletedAction", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], GameCompletedComponent.prototype, "gameCompletedResult", void 0);
    GameCompletedComponent = __decorate([
        Component({
            selector: 'jrummy-completed',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\gamecompleted.component.html"*/'<div class="modal-window">\n\n    <div class="modal-container game-completed">\n\n       \n\n\n\n        <div class="game-completed-header"><span>{{ headerText }}</span>\n\n            <ul>\n\n                <li><a href="javascript:void(0);" (click)="completeGame(\'play\')">Play Again</a></li>\n\n                <li><a href="javascript:void(0);" (click)="completeGame(\'quit\')">Quit</a></li>\n\n            </ul>\n\n        </div>\n\n\n\n        <h5>{{ _jrummyText.DARYL_CARDS}} -  {{_jrummy.ComputerHand.getCurrentPoints()}} Points</h5>\n\n        <div class="hand">\n\n            <div *ngFor="let card of  _jrummy.ComputerHand|SortHand;let i = index ">\n\n                <jrummy-playingcard [suit]="card.Suit"  [face]="card.FaceValueString" [squeezed]="true"></jrummy-playingcard>\n\n            </div>\n\n\n\n        </div>\n\n\n\n\n\n         <h5>{{ _jrummyText.PLAYER_CARDS}} - {{_jrummy.PlayerHand.getCurrentPoints()}}  Points</h5>\n\n\n\n        <div class="hand">\n\n            <div *ngFor="let card of _jrummy.PlayerHand|SortHand;let i = index ">\n\n                   <jrummy-playingcard [suit]="card.Suit"  [face]="card.FaceValueString"  [squeezed]="true"></jrummy-playingcard>\n\n            </div>\n\n\n\n        </div>\n\n\n\n    </div>\n\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\gamecompleted.component.html"*/
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof JRummy !== 'undefined' && JRummy) === 'function' && _b) || Object, (typeof (_c = typeof JRummyText !== 'undefined' && JRummyText) === 'function' && _c) || Object])
    ], GameCompletedComponent);
    return GameCompletedComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=gamecompleted.component.js.map