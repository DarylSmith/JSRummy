import { Injectable } from "@angular/core";

@Injectable()
export class StateManager {

    playerScore: number;

    computerScore: number;

    currentRound: number;

    public isSet: boolean;

    constructor() {

             console.log("sdfsdsfsdfsdf" );
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
            console.log(this.playerScore + '---'+this.playerScore );
            if (this.playerScore > 0 || this.computerScore > 0) {
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

