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
        this.noseImageClass = "nose-image-display-1";
        this.suit = "spades";
        this.face = "2";
        this.keyframe = "";
        this.squeezed = false;
    }
    PlayingCardComponent.prototype.ngOnChanges = function () {
        var vals = [1, 2];
        var version = vals[Math.floor(Math.random() * vals.length)];
        this.noseImageClass = "nose-image-display-" + version;
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
            selector: 'jrummy-playingcard',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\playingcard.component.html"*/'<div class="card {{suit}} {{face}} {{keyframe}} {{noseImageClass}}" [ngClass]="squeezed?\'player-card-squeezed\':\'player-card\'">\n\n    <div class="top-row"></div>\n\n    <div class="middle-row">\n\n\n\n        <svg version="1.1" id="first_face" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\n            width="69px" height="67px" viewBox="0 0 69 67" enable-background="new 0 0 69 67" xml:space="preserve">\n\n            <g>\n\n                <g>\n\n                    <path stroke="#000000" stroke-width="2" stroke-miterlimit="1" class="first_nose first_nose first_nose_1" d="M44.279,16.816c0.049,3.078,0.272,5.684,3.083,7.374c3.713,2.232,18.219,7.538,13.168,13.942\n\n			c-3.306,4.192-9.831,6.173-14.679,7.721c-5.554,1.773-11.155,2.679-16.985,2.347c-5.868-0.334-12.469-1.914-17.147-5.63\n\n			c-5.374-4.269-1.665-8.824,2.547-11.813c5.612-3.981,10.861-8.246,4.181-14.29c-1.43-1.294-3.559,0.821-2.121,2.121\n\n			c5.184,4.69-0.314,7.266-4.289,10.086c-3.105,2.203-5.872,4.793-6.141,8.783c-0.746,11.027,18.14,13.648,25.54,13.852\n\n			c6.008,0.165,12.018-1.453,17.656-3.368c5.046-1.714,10.712-4.076,14.099-8.37c3.309-4.195-0.431-8.801-3.557-11.875\n\n			c-2.315-2.276-5.526-3.693-8.437-5.019c-3.097-1.411-3.859-2.313-3.916-5.861C47.249,14.883,44.249,14.88,44.279,16.816\n\n			L44.279,16.816z"/>\n\n                </g>\n\n            </g>\n\n               <g>\n\n                <g>\n\n                    <path stroke="#000000" stroke-width="2" stroke-miterlimit="1" class="first_nose first_nose_2" d="M51.793,14.659c-12.359-4.338-41.457-4.174-43.248,13.732c-0.96,9.604,5.142,17.714,14.79,18.805\n\n			c10.617,1.2,21.413-2.656,31.09-6.618c1.765-0.723,0.993-3.626-0.798-2.893c-12.386,5.07-43.063,15.152-42.169-8.417\n\n			c0.615-16.229,29.177-15.353,39.538-11.716C52.826,18.194,53.606,15.295,51.793,14.659L51.793,14.659z" />\n\n                </g>\n\n            </g> \n\n            <g> \n\n                <g>\n\n                    <path  fill="#ffffff" stroke="#000000" stroke-width="2" stroke-miterlimit="1" class="first_mouth" d="M11.662,65.578c7.371-1.86,12.993-8.338,20.821-8.536c7.578-0.191,13.722,6.155,21.543,5.958c1.931-0.049,1.936-3.049,0-3\n\n			c-7.731,0.195-13.896-5.387-21.543-5.958c-8.036-0.6-14.247,6.783-21.619,8.644C8.99,63.158,9.785,66.051,11.662,65.578\n\n			L11.662,65.578z" />\n\n                </g>\n\n            </g>\n\n        </svg>\n\n\n\n\n\n\n\n    </div>\n\n    <div class="bottom-row"></div>\n\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\playingcard.component.html"*/
        }), 
        __metadata('design:paramtypes', [])
    ], PlayingCardComponent);
    return PlayingCardComponent;
}());
//# sourceMappingURL=playingcard.component.js.map