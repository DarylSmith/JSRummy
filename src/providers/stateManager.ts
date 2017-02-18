import { Injectable } from "@angular/core";

@Injectable()
export class StateManager {

    playerScore:number;

    computerScore:number;

    currentRound:number;

    isSet:boolean;

    constructor(){
        let jsonState:string = localStorage.getItem("jrummy_state")
        if(jsonState===null)
        {
            this.isSet=false;
            console.log("nothing in local storge")
        }
        else
        {
            this.isSet=true;
            let jsonObj:any = JSON.parse(jsonState);
            this.playerScore = parseInt(jsonObj["computerScore"]);
            this.computerScore = parseInt(jsonObj["playerScore"]);
            this.currentRound = parseInt(jsonObj["currentRound"]);
            

        }
    }

    public SaveState(ps:number,cs:number,cr:number )
    {
        this.computerScore=cs;
        this.playerScore=ps;
        this.currentRound=cr;
        let stateObj = {playerScore:ps, computerScore:cs, currentRound:cr};
        let jsonState:string = JSON.stringify(stateObj);
        localStorage.setItem("jrummy_state",jsonState);
    }

    

}

