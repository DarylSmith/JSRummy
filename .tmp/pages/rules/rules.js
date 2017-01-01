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
/*
  Generated class for the Rules page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var RulesPage = (function () {
    function RulesPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RulesPage.prototype.ionViewDidLoad = function () {
    };
    RulesPage = __decorate([
        Component({
            selector: 'page-rules',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\rules\rules.html"*/'<div class="game-header">\n\n  <div class="header-elem btn-back" (click)="navCtrl.pop()">\n\n    <img src="http://lifespeak.s3.amazonaws.com/Images/btn_back.png" />\n\n  </div>\n\n</div>\n\n<div class="rules-page">\n\n  <h3>Beat Daryl @ Gin Rummy Rules</h3>\n\n\n\n  <p><strong>Objective</strong> The objective in gin rummy is to score points and reach an agreed number of points or more,\n\n    usually 100, before the opponent does.<br/> The basic game strategy is to improve one\'s hand by forming melds and eliminating\n\n    deadwood. Gin has two types of meld: Sets of 3 or 4 cards sharing the same rank, e.g. 8♥ 8♦ 8♠; and runs of 3 or more\n\n    cards in sequence, of the same suit. e.g. 3♥ 4♥ 5♥ or more. Deadwood cards are those not in any meld. Aces are considered\n\n    low—they can form a set with other aces but only the low end of runs (A♠ 2♠ 3♠ is a legal run but Q♠ K♠ A♠ is not). A\n\n    player can form any combination of melds within their hand, whether it contains all sets, all runs, or a mix of both.\n\n    A hand can contain three or fewer melds to knock or form legal gin.<br/> The deadwood count is the sum of the point values\n\n    of the deadwood cards—aces are scored at 1 point, face cards at 10, and others according to their numerical values. Intersecting\n\n    melds are not allowed; if a player has a 3-card set and a 3-card run sharing a common card, only one of the melds counts,\n\n    and the other two cards count as deadwood.*<br/> \n\n  </p>\n\n  <p><strong>Gameplay</strong>  The dealer deals 10 cards to both players, and then places the next card in the deck face up. This begins the discard pile. The face down pile is known as the stock pile. On the first turn of the round, the non-dealing player has first option of taking the upcard on the discard pile or passing.On each turn, a player must draw either the (face-up) top card of the discard pile, or the (face-down)\n\n    top card from the stock pile, and discard one card from his or her hand onto the discard pile. Players alternate taking\n\n    turns until one player ends the round by knocking, going Gin, or until only two cards remain in the stock pile, in which\n\n    case the round ends in a draw and no points are awarded. <br/>The game ends when a player reaches 100 or more points\n\n  </p>\n\n  <p><strong>Knocking</strong> A player with 10 or fewer points of deadwood may knock, by clicking on the knock button. The\n\n    cards will then be evaluated and scored.\n\n  </p>\n\n  <p><strong>Gin</strong> If all 10 cards in a player\'s hand fit into melds and thereby the player has no deadwood, he or she\n\n    can choose to go Gin in which case the round ends and the player going Gin receives a Gin bonus of 25 points (or another\n\n    established amount) plus any deadwood points in the opponent\'s hand\n\n  </p>\n\n  <strong>Scoring</strong>\n\n    <ul>\n\n      <li>After a player knocks, and the lay offs are made, the knocking player receives a score equal to the difference between\n\n        the two hands. For example, if a player knocks with 8, and the defender has 10 deadwood points in his or her hand\n\n        after laying off, the knocking player receives 2 points for the hand.</li>\n\n      <li>After going gin, a player receives a bonus of 25 points plus the entire count of deadwood in the opponent\'s hand. There\n\n        is no chance to lay off when a player goes gin.</li>\n\n      <li>An undercut occurs when the defending player has a deadwood count lower than or equal to that of the knocking player\n\n        (this can occur either naturally or by laying off after a knock). In this case, the defender scores an undercut bonus\n\n        of 25 points plus the difference between the two hands</li>\n\n\n\n    </ul>\n\n  \n\n  <p><strong>Laying off</strong> In some version of gin, players can lay off their cards by putting it the other players meld\n\n    after gameplay. However, in this version, there is no layoff--all melds after a knock are considered final\n\n  </p>\n\n  <sup>Source-Wkipedia</sup>\n\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\pages\rules\rules.html"*/
        }), 
        __metadata('design:paramtypes', [NavController, NavParams])
    ], RulesPage);
    return RulesPage;
}());
//# sourceMappingURL=rules.js.map