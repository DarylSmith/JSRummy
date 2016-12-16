var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { JRummy } from '../providers/jrummy/jrummy';
import { JRummyText } from '../providers/jrummy-text';
export var GameCompletedComponent = (function () {
    function GameCompletedComponent(_jrummy, _jrummyText) {
        this._jrummy = _jrummy;
        this._jrummyText = _jrummyText;
        this.modalClosed = new EventEmitter();
    }
    GameCompletedComponent.prototype.closeModal = function () {
        console.log('modal closed event');
        this.modalClosed.emit('closed');
    };
    GameCompletedComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Output(), 
        __metadata('design:type', (typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a) || Object)
    ], GameCompletedComponent.prototype, "modalClosed", void 0);
    GameCompletedComponent = __decorate([
        Component({
            selector: 'jrummy-completed',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\gamecompleted.component.html"*/'<div class="modal-window" (click)="closeModal();">\n\n    <div class="modal-container game-completed">\n\n        <a href="javascript:void(0);" (click)="closeModal();">\n\n            <div class="modal-close"><span></span>\n\n            </div>\n\n        </a>\n\n\n\n        <h2>DARYL Wins!</h2>\n\n\n\n        <h5>DARYL\'s Cards</h5>\n\n        <div class="hand">\n\n            <div *ngFor="let card of _jrummy.ComputerHand.Cards;let i = index ">\n\n                <div class="card {{card.Suit}} {{card.FaceValueString}} player-card"></div>\n\n            </div>\n\n\n\n        </div>\n\n\n\n\n\n          <h5>Your Cards</h5>\n\n\n\n        <div class="hand">\n\n            <div *ngFor="let card of _jrummy.PlayerHand.Cards;let i = index ">\n\n                    <div class="card {{card.Suit}} {{card.FaceValueString}} player-card"></div>\n\n            </div>\n\n\n\n        </div>\n\n\n\n    </div>\n\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\gamecompleted.component.html"*/
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof JRummy !== 'undefined' && JRummy) === 'function' && _b) || Object, (typeof (_c = typeof JRummyText !== 'undefined' && JRummyText) === 'function' && _c) || Object])
    ], GameCompletedComponent);
    return GameCompletedComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=gamecompleted.component.js.map