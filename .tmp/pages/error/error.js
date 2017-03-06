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
import { NavController, NavParams } from 'ionic-angular';
import { AudioManager } from '../../providers/audioManager';
import { GamePage } from '../game/game';
import { RulesPage } from '../rules/rules';
import { JRummyText } from '../../providers/jrummy-text';
/*
  Generated class for the Error page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var ErrorPage = (function () {
    function ErrorPage(navCtrl, navParams, audioManager, jrummyText) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.audioManager = audioManager;
        this.jrummyText = jrummyText;
    }
    ErrorPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ErrorPage');
    };
    ErrorPage.prototype.playGame = function () {
        this.audioManager.playSoundEffect("button_press.mp3");
        this.navCtrl.push(GamePage);
    };
    ErrorPage.prototype.getRules = function () {
        this.audioManager.playSoundEffect("button_press.mp3");
        this.navCtrl.push(RulesPage);
    };
    ErrorPage = __decorate([
        Component({
            selector: 'page-error',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\error\error.html"*/'<div class="panel panel-primary">\n\n  <div class="panel-body">\n    <div style="font-size: 2.2em;\n    color: #ffffff; margin: 30px;">{{jrummyText.ERROR_PAGE_TEXT}} </div>\n    <div class="options">\n      <ul class="btn-options">\n        <li class="rules">\n          <a href="javascript:void(0);" (click)="getRules();">\n            <img src="Images/rules_bt_lg.jpg" />\n          </a>\n        </li>\n        <li class="play">\n          <a href="javascript:void(0);" (click)="playGame();">\n            <img src="Images/play_bt_lg.jpg" alt="play" />\n          </a>\n        </li>\n\n      </ul>\n    </div>\n  </div>\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\error\error.html"*/
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof NavController !== 'undefined' && NavController) === 'function' && _a) || Object, (typeof (_b = typeof NavParams !== 'undefined' && NavParams) === 'function' && _b) || Object, (typeof (_c = typeof AudioManager !== 'undefined' && AudioManager) === 'function' && _c) || Object, (typeof (_d = typeof JRummyText !== 'undefined' && JRummyText) === 'function' && _d) || Object])
    ], ErrorPage);
    return ErrorPage;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=error.js.map