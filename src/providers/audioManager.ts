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


    public stopMainTrack(): void {

        this.mainTrackAudio.pause();
        this.mainTrackAudio.currentTime = 0;
    }

    public stopcardSortTrack(): void {

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




@Injectable()
export class StateManager {

    playerScore: number;

    computerScore: number;

    currentRound: number;

    debugState:string;

    public isSet: boolean=false;;

    constructor() {
        this.debugState='';
        let jsonState: string = localStorage.getItem("jrummy_state")
        if (jsonState === null) {
            this.isSet = false;
            console.log("nothing in local storge")
        }
        else {
          
           let jsonObj: any = JSON.parse(jsonState);
            this.computerScore = parseInt(jsonObj["computerScore"]);
            this.playerScore = parseInt(jsonObj["playerScore"]);
            this.currentRound = parseInt(jsonObj["currentRound"]); 
            if(this.playerScore>100 || this.computerScore>100)  
                return;


            if(this.computerScore>0 || this.playerScore>0)
            {
                  this.isSet = true;
            }
        }
    }

    public SaveState(ps: number, cs: number, cr: number) {
        this.computerScore = cs;
        this.playerScore = ps;
        this.currentRound = cr;
        let stateObj = { playerScore: ps, computerScore: cs, currentRound: cr };
        let jsonState: string = JSON.stringify(stateObj);
        localStorage.setItem("jrummy_state", jsonState);
    }

    public ClearState(): void {
        localStorage.removeItem("jrummy_state");
    }



}



