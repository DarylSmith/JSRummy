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
export var ModalComponent = (function () {
    function ModalComponent(jrummyText) {
        this.modalClosed = new EventEmitter();
    }
    ModalComponent.prototype.closeModal = function () {
        console.log('modal closed event');
        this.modalClosed.emit('closed');
    };
    ModalComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], ModalComponent.prototype, "modalBody", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], ModalComponent.prototype, "modalClosed", void 0);
    ModalComponent = __decorate([
        Component({
            selector: 'jrummy-modal',template:/*ion-inline-start:"C:\inetpub\wwwroot\jrummy-ionic\src\shared\modal.component.html"*/'<div class="modal-window" (click)="closeModal();">\n\n    <div class="modal-container">\n\n        <a href="javascript:void(0);" (click)="closeModal();">\n\n            <div class="modal-close"><span></span>\n\n            </div>\n\n        </a>\n\n        {{modalBody}}\n\n    </div>\n\n</div>'/*ion-inline-end:"C:\inetpub\wwwroot\jrummy-ionic\src\shared\modal.component.html"*/
        }), 
        __metadata('design:paramtypes', [JRummyText])
    ], ModalComponent);
    return ModalComponent;
}());
//# sourceMappingURL=modal.component.js.map