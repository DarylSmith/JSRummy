var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
export var StateManager = (function () {
    function StateManager() {
        console.log("sdfsdsfsdfsdf");
        var jsonState = localStorage.getItem("jrummy_state");
        if (jsonState === null) {
            this.isSet = false;
            console.log("nothing in local storge");
        }
        else {
            var jsonObj = JSON.parse(jsonState);
            this.computerScore = parseInt(jsonObj["computerScore"]);
            this.playerScore = parseInt(jsonObj["playerScore"]);
            this.currentRound = parseInt(jsonObj["currentRound"]);
            console.log(this.playerScore + '---' + this.playerScore);
            if (this.playerScore > 0 && this.computerScore > 0) {
                this.isSet = true;
            }
        }
    }
    StateManager.prototype.SaveState = function (ps, cs, cr) {
        this.computerScore = cs;
        this.playerScore = ps;
        this.currentRound = cr;
        var stateObj = { playerScore: ps, computerScore: cs, currentRound: cr };
        var jsonState = JSON.stringify(stateObj);
        localStorage.setItem("jrummy_state", jsonState);
    };
    StateManager.prototype.ClearState = function () {
        localStorage.removeItem("jrummy_state");
    };
    StateManager = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateManager);
    return StateManager;
}());
//# sourceMappingURL=stateManager.js.map