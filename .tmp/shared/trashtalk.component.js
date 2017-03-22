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
import { JRummy } from '../providers/jrummy/jrummy';
import * as $ from 'jquery';
export var TrashTalkComponent = (function () {
    function TrashTalkComponent(_jrummy) {
        this._jrummy = _jrummy;
        this.num = 0;
        this.listOfTalks = [
            'Begin by selecting a card from the discard pile',
            'Arrange your sets and runs by moving them to the left side of your hand',
            'Click the call button when you have a decent hand',
            'I will dominate all challengers',
            'Gin Rummy is in my blood',
            'You sure you want to do that?',
            'I should start playing for money',
            'Prepare to be crushed by Daryl',
            'I feel at one with my cards',
            'Really? That\'s your move?',
            'Wow! I\'m just on fire today!',
            'I just wish I could bottle and sell my Gin Rummy skils',
            'You can refer to me as the God of Gin Rummy'
        ];
    }
    TrashTalkComponent.prototype.ngOnInit = function () {
        var self = this;
        $(".move-card-item").on("animationend", function (event) {
            var currentRound = self._jrummy.CurrentTurn;
            if (currentRound < 3) {
                self.num = currentRound;
            }
            else {
                self.num = Math.floor(Math.random() * self.listOfTalks.length);
            }
        });
    };
    Object.defineProperty(TrashTalkComponent.prototype, "PlayerPhrase", {
        get: function () {
            var phrase = this.listOfTalks[this.num];
            return phrase;
        },
        enumerable: true,
        configurable: true
    });
    TrashTalkComponent = __decorate([
        Component({
            selector: 'trashtalk',template:/*ion-inline-start:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\trashtalk.component.html"*/'\n\n        <div class="trashtalk-container">\n\n            <div class="talk-bubble tri-right round border right-top">\n\n                <div class="talktext">\n\n                    <p>{{PlayerPhrase}}</p>\n\n                </div>\n\n            </div>\n\n        </div>'/*ion-inline-end:"c:\inetpub\wwwroot\jrummy-ionic\src\shared\trashtalk.component.html"*/
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof JRummy !== 'undefined' && JRummy) === 'function' && _a) || Object])
    ], TrashTalkComponent);
    return TrashTalkComponent;
    var _a;
}());
//# sourceMappingURL=trashtalk.component.js.map