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
    }
    StateManager.prototype.SaveState = function (ps, cs, cr) {
        this.computerScore = cs;
        this.playerScore = ps;
        this.currentRound = cr;
        var stateObj = { playerScore: ps, computerScore: cs, currentRound: cr };
        var jsonState = JSON.stringify(stateObj);
        localStorage.setItem("jrummy_state", jsonState);
    };
    StateManager = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], StateManager);
    return StateManager;
}());
//# sourceMappingURL=stateManager.js.map