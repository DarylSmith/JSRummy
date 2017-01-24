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
    AudioManager.prototype.stopMainTrack = function () {
        this.mainTrackAudio.pause();
        this.mainTrackAudio.currentTime = 0;
    };
    AudioManager.prototype.playSoundEffect = function (track) {
        if (this.soundOn) {
            var myAudio = new Audio("assets/audio/" + track + ".wav");
            myAudio.play();
        }
    };
    AudioManager = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], AudioManager);
    return AudioManager;
}());
//# sourceMappingURL=audioManager.js.map