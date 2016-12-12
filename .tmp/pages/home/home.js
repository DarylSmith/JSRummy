var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamePage } from '../game/game';
export var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.pageTitle = 'Dashboard';
    }
    HomePage.prototype.playGame = function () {
        this.navCtrl.push(GamePage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\home\home.html"*/'<div class="panel panel-primary">\n    <div class="panel-heading">\n        {{pageTitle}}\n    </div>\n    <div class="panel-body">\n        <div class="title"> </div>\n        <div class="options">\n            <ul class="btn-options">\n                <li class="rules">\n                    <img src="/images/rules_bt_lg.jpg" />\n                </li>\n                <li class="play">\n                    <a href="javascript:void(0);" (click)="playGame();">\n                      <img src="/images/play_bt_lg.jpg" alt="play"/>\n                      </a>\n                </li>\n                <li class="hc">\n                    <img src="/images/hs_bt_lg.jpg" />\n                </li>\n\n            </ul>\n        </div>\n    </div>\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\home\home.html"*/
        }), 
        __metadata('design:paramtypes', [NavController])
    ], HomePage);
    return HomePage;
}());
//# sourceMappingURL=home.js.map