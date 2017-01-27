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
import { AudioManager } from '../../providers/audioManager';
import { NavController } from 'ionic-angular';
import { GamePage } from '../game/game';
import { RulesPage } from '../rules/rules';
export var HomePage = (function () {
    function HomePage(navCtrl, audioManager) {
        this.navCtrl = navCtrl;
        this.audioManager = audioManager;
    }
    HomePage.prototype.playGame = function () {
        this.navCtrl.push(GamePage);
    };
    HomePage.prototype.getRules = function () {
        this.navCtrl.push(RulesPage);
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\home\home.html"*/'<div class="panel panel-primary">\n\n\n\n    <div class="panel-body">\n\n\n\n        <div class="cbx-container">\n\n    <span>Audio</span>\n\n  <div class="row press">\n\n    <input type="checkbox" id="unchecked" [(ngModel)]="audioManager.soundOn" class="cbx hidden"/>\n\n    <label for="unchecked" class="lbl"></label>    \n\n  </div>\n\n</div>\n\n\n\n\n\n        <div class="title"> </div>\n\n        <div class="options">\n\n            <ul class="btn-options">\n\n                <li class="rules">\n\n                    <a href="javascript:void(0);" (click)="getRules();">\n\n                        <img src="Images/rules_bt_lg.jpg" />\n\n                    </a>\n\n                </li>\n\n                <li class="play">\n\n                    <a href="javascript:void(0);" (click)="playGame();">\n\n                        <img src="Images/play_bt_lg.jpg" alt="play" />\n\n                    </a>\n\n                </li>\n\n                <li class="hc">\n\n                    <img src="Images/hs_bt_lg.jpg" />\n\n                </li>\n\n\n\n            </ul>\n\n        </div>\n\n    </div>\n\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\home\home.html"*/
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a) || Object, (typeof (_b = typeof AudioManager !== 'undefined' && AudioManager) === 'function' && _b) || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}());
//# sourceMappingURL=home.js.map