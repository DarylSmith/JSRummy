import { Injectable } from "@angular/core";

@Injectable()
export class AudioManager {

    public soundOn: boolean;

    private mainTrackAudio = new Audio('assets/audio/main_track.mp3');
    private cardSortAudio = new Audio('assets/audio/card_sort.mp3');;

    constructor() {

        this.soundOn = true;
    }

    public playMainTrack(): void {

        if (this.soundOn) {
            this.mainTrackAudio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            this.mainTrackAudio.play();
        }
    }

    public playCardSortTrack(): void {

        if (this.soundOn) {
            this.cardSortAudio.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            this.cardSortAudio.play();
        }
    }

    
    public stopMainTrack():void{

        this.mainTrackAudio.pause();
        this.mainTrackAudio.currentTime = 0;
    }

        public stopcardSortTrack():void{

        this.cardSortAudio.pause();
        this.cardSortAudio.currentTime = 0;
    }


    public playSoundEffect(track: string): void {
        if (this.soundOn) { 
        let myAudio = new Audio(`assets/audio/${track}`);
        myAudio.play();
    }
    }

}

