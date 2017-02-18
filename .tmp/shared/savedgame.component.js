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
import { JRummyText } from '../providers/jrummy-text';
export var SavedGameComponent = (function () {
    function SavedGameComponent(jrummyText) {
        this.modalClosed = new EventEmitter();
        this.UseSavedScore = "false";
    }
    SavedGameComponent.prototype.closeModal = function () {
        console.log('modal closed event');
        this.modalClosed.emit(this.UseSavedScore);
    };
    SavedGameComponent.prototype.setScore = function (choice) {
        this.UseSavedScore = choice;
        this.closeModal();
    };
    SavedGameComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], SavedGameComponent.prototype, "modalBody", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', (typeof (_a = typeof EventEmitter !== 'undefined' && EventEmitter) === 'function' && _a) || Object)
    ], SavedGameComponent.prototype, "modalClosed", void 0);
    SavedGameComponent = __decorate([
        Component({
            selector: 'jrummy-savedgame',template:/*ion-inline-start:"C:\inetpub\wwwroot\jrummy-ionic\src\shared\savedgame.component.html"*/'<div class="modal-window" (click)="closeModal();">\n\n    <div class="modal-container">\n\n\n\n        <div class="new-game-question"> Daryl was enjoying your last game. Would you like to continue it?</div>\n\n        <div class="new-game-button-container">\n\n            <div (click)="setScore(\'true\')" class="new-game-button generic-btn-container">\n\n                Yes\n\n            </div>\n\n            <div (click)="setScore(\'false\')" class="new-game-button generic-btn-container">\n\n                No\n\n            </div>\n\n\n\n        </div>\n\n\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\inetpub\wwwroot\jrummy-ionic\src\shared\savedgame.component.html"*/
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof JRummyText !== 'undefined' && JRummyText) === 'function' && _b) || Object])
    ], SavedGameComponent);
    return SavedGameComponent;
    var _a, _b;
}());
//# sourceMappingURL=savedgame.component.js.map