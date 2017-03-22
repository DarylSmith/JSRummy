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
import { JRummy } from '../providers/jrummy/jrummy';
import { JRummyText } from '../providers/jrummy-text';
export var GameCompletedComponent = (function () {
    function GameCompletedComponent(_jrummy, _jrummyText) {
        this._jrummy = _jrummy;
        this._jrummyText = _jrummyText;
        this.gameCompletedAction = new EventEmitter();
        this.showCards = false;
    }
    GameCompletedComponent.prototype.completeGame = function (completedAction) {
        console.log('modal closed event');
        this.gameCompletedAction.emit(completedAction);
    };
    GameCompletedComponent.prototype.getCompletedGameText = function () {
        if (this.gameCompletedResult !== undefined) {
            this.headerText = this.gameCompletedResult = this._jrummyText[this.gameCompletedResult];
            console.log(this.headerText);
        }
    };
    GameCompletedComponent.prototype.sortByValue = function (hand) {
        this._jrummy.ComputerHand.sortByValue();
        console.log(this._jrummy.ComputerHand.Cards);
        return this._jrummy.ComputerHand.Cards;
    };
    GameCompletedComponent.prototype.toggleCardDisplay = function (val) {
        this.showCards = val;
    };
    GameCompletedComponent.prototype.ngOnChanges = function (changes) {
        this.getCompletedGameText();
    };
    GameCompletedComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], GameCompletedComponent.prototype, "gameCompletedAction", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', String)
    ], GameCompletedComponent.prototype, "gameCompletedResult", void 0);
    GameCompletedComponent = __decorate([
        Component({
            selector: 'jrummy-completed',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\gamecompleted.component.html"*/'<div class="modal-window">\n\n    <div class="modal-container game-completed">\n\n            <h6>{{ headerText }}</h6>\n\n            <div style="font-size:8px">{{_jrummy.PlayerCardEval}}</div>\n\n\n\n        <div class="game-completed-header">\n\n            <ul>\n\n                <li><a href="javascript:void(0);" [hidden]="showCards" (click)="toggleCardDisplay(true)">View Hand</a></li>\n\n                <li><a href="javascript:void(0);" [hidden]="!showCards" (click)="toggleCardDisplay(false)">View Score</a></li>\n\n                  <li><a href="javascript:void(0);" [hidden]="!showCards" (click)="toggleCardDisplay(false)">Player Eval</a></li>\n\n                <li><a href="javascript:void(0);" (click)="completeGame(\'play\')">Play Again</a></li>\n\n                <li><a href="javascript:void(0);" (click)="completeGame(\'quit\')">Quit</a></li>\n\n            </ul>\n\n        </div>\n\n        <div id="game-completed-card-display" [hidden]="showCards"></div>\n\n        <div id="game-completed-card-display" [hidden]="showCards">\n\n            <table>\n\n                <thead>\n\n                    <tr>\n\n                        <td>\n\n                        </td>\n\n                        <td>\n\n\n\n                            You\n\n                        </td>\n\n                        <td>\n\n                            Daryl\n\n                        </td>\n\n                    </tr>\n\n                </thead>\n\n                <tbody>\n\n                    <tr>\n\n                        <td>\n\n\n\n                            Cards in sets\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.PlayerHand|FilterHand:\'set\'}}\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.ComputerHand|FilterHand:\'set\'}}\n\n                        </td>\n\n                    </tr>\n\n                    <tr>\n\n                        <td>\n\n\n\n                            Cards in runs\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.PlayerHand|FilterHand:\'run\'}}\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.ComputerHand|FilterHand:\'run\'}}\n\n                        </td>\n\n                    </tr>\n\n                    <tr>\n\n                        <td>\n\n\n\n                            Deadwood Cards\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.PlayerHand|FilterHand:\'none\'}}\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.ComputerHand|FilterHand:\'none\'}}\n\n                        </td>\n\n                    </tr>\n\n                    <tr>\n\n                        <td>\n\n\n\n                            Deadwood Points (combined face value of deadwood)\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.PlayerHand.getCurrentPoints() }}\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.ComputerHand.getCurrentPoints()}}\n\n                        </td>\n\n                    </tr>\n\n                    <tr *ngIf="_jrummy.CurrentGame.UndercutBonus!=25">\n\n                        <td>\n\n\n\n                            Deadwood Score (difference between Winner and Loser Deadwood Points)\n\n                        </td>\n\n                        <td>\n\n                            {{ _jrummy.CurrentGame.Caller=="Player" ?_jrummy.ComputerHand.getCurrentPoints() - _jrummy.PlayerHand.getCurrentPoints():0 }}\n\n                        </td>\n\n                        <td>\n\n                            {{ _jrummy.CurrentGame.Caller=="Computer" ? _jrummy.PlayerHand.getCurrentPoints() - _jrummy.ComputerHand.getCurrentPoints():0 }}\n\n                        </td>\n\n                    </tr>\n\n                      <tr *ngIf="_jrummy.CurrentGame.UndercutBonus===25">\n\n                        <td>\n\n\n\n                            Deadwood Score (difference between Winner and Loser Deadwood Points)\n\n                        </td>\n\n                        <td>\n\n                            {{ _jrummy.CurrentGame.Caller=="Player" ?_jrummy.PlayerHand.getCurrentPoints() - _jrummy.ComputerHand.getCurrentPoints():0 }}\n\n                        </td>\n\n                        <td>\n\n                            {{ _jrummy.CurrentGame.Caller=="Computer" ? _jrummy.ComputerHand.getCurrentPoints() - _jrummy.PlayerHand.getCurrentPoints():0 }}\n\n                        </td>\n\n                    </tr>\n\n                    <tr>\n\n                        <td>\n\n\n\n                            Gin Bonus\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.CurrentGame.Caller=="Player" && _jrummy.CurrentGame.GinBonus==25?25:0 }}\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.CurrentGame.Caller=="Computer " && _jrummy.CurrentGame.GinBonus==25?25:0 }}\n\n                        </td>\n\n                    </tr>\n\n                    <tr>\n\n                        <td>\n\n\n\n                            Undercut Bonus\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.CurrentGame.Caller=="Computer" && _jrummy.CurrentGame.UndercutBonus==25?25:0 }}\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.CurrentGame.Caller=="Player" && _jrummy.CurrentGame.UndercutBonus==25?25:0 }}\n\n                        </td>\n\n                    </tr>\n\n                    <tr>\n\n                        <td>\n\n\n\n                            Final Score\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.CurrentGame.PlayerScore }}\n\n                        </td>\n\n                        <td>\n\n                            {{_jrummy.CurrentGame.ComputerScore}}\n\n                        </td>\n\n                    </tr>\n\n\n\n\n\n\n\n\n\n\n\n\n\n                </tbody>\n\n            </table>\n\n\n\n        </div>\n\n        <div id="game-completed-card-display" [hidden]="!showCards">\n\n            <h5>{{ _jrummyText.DARYL_CARDS}}</h5>\n\n            <div class="hand">\n\n                <div *ngFor="let card of  _jrummy.ComputerHand|SortHand;let i = index ">\n\n                    <jrummy-playingcard [suit]="card.Suit" [face]="card.FaceValueString" [squeezed]="true"></jrummy-playingcard>\n\n                </div>\n\n\n\n            </div>\n\n\n\n\n\n            <h5>{{ _jrummyText.PLAYER_CARDS}}</h5>\n\n\n\n            <div class="hand">\n\n                <div *ngFor="let card of _jrummy.PlayerHand.Cards;let i = index ">\n\n                    <jrummy-playingcard [suit]="card.Suit" [face]="card.FaceValueString" [squeezed]="true"></jrummy-playingcard>\n\n                </div>\n\n\n\n            </div>\n\n\n\n        </div>\n\n\n\n    </div>\n\n</div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\gamecompleted.component.html"*/
        }), 
        __metadata('design:paramtypes', [JRummy, JRummyText])
    ], GameCompletedComponent);
    return GameCompletedComponent;
}());
//# sourceMappingURL=gamecompleted.component.js.map