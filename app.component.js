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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var AuthGuard_1 = require('./AuthGuard');
var emsConfig_1 = require('./shared/emsConfig');
var AppComponent = (function () {
    function AppComponent(emsConfig, router) {
        this.emsConfig = emsConfig;
        this.router = router;
        this.pageTitle = 'LifeSpeak - Engagement Management System';
        var currentToken = this.emsConfig.getLoginToken();
        this.isLoggedIn = currentToken !== null && currentToken.IsValid;
    }
    AppComponent.prototype.logOut = function () {
        this.emsConfig.deleteLoginToken();
        this.router.navigateByUrl('/login');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'ems-app',
            templateUrl: 'app/shared/app.component.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [http_1.HTTP_PROVIDERS, AuthGuard_1.AuthGuard]
        }), 
        __metadata('design:paramtypes', [emsConfig_1.EmsConfig, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
