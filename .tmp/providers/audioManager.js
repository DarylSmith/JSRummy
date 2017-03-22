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
export var AudioManager = (function () {
    function AudioManager() {
        this.mainTrackAudio = new Audio('assets/audio/main_track.mp3');
        this.cardSortAudio = new Audio('assets/audio/card_sort.mp3');
        this.soundOn = true;
    }
    ;
    AudioManager.prototype.playMainTrack = function () {
        if (this.soundOn) {
            this.mainTrackAudio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            this.mainTrackAudio.play();
        }
    };
    AudioManager.prototype.playCardSortTrack = function () {
        if (this.soundOn) {
            this.cardSortAudio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            this.cardSortAudio.play();
        }
    };
    AudioManager.prototype.stopMainTrack = function () {
        this.mainTrackAudio.pause();
        this.mainTrackAudio.currentTime = 0;
    };
    AudioManager.prototype.stopcardSortTrack = function () {
        this.cardSortAudio.pause();
        this.cardSortAudio.currentTime = 0;
    };
    AudioManager.prototype.playSoundEffect = function (track) {
        if (this.soundOn) {
            var myAudio = new Audio("assets/audio/" + track);
            myAudio.play();
        }
    };
    AudioManager = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], AudioManager);
    return AudioManager;
}());
export var StateManager = (function () {
    function StateManager() {
        this.isSet = false;
        this.debugState = '';
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
            if (this.playerScore > 100 || this.computerScore > 100)
                return;
            if (this.computerScore > 0 || this.playerScore > 0) {
                this.isSet = true;
            }
        }
    }
    ;
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
//# sourceMappingURL=audioManager.js.map