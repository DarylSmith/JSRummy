"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var jrummy_1 = require('./services/jrummy');
var animationCallback_1 = require('./services/animationCallback');
var angular2_modal_1 = require('angular2-modal');
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = 'Beat Daryl@Gin Rummy';
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'jrummy-app',
            templateUrl: 'app/shared/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [jrummy_1.JRummy, animationCallback_1.AnimationCallback, angular2_modal_1.ModalModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map