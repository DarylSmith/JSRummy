import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges} from '@angular/core';
import {Game, Card, Hand, Deck, JRummy, GameStatus} from '../providers/jrummy/jrummy'

import * as $ from 'jquery';


   @Component(
        {
         selector:'trashtalk',
         templateUrl:'trashtalk.component.html'
        })
export class TrashTalkComponent{

    private num:number=0;
    listOfTalks:Array<string>=[
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

    ]
    constructor(private _jrummy:JRummy){}

    ngOnInit(){
   
            let self = this;
             $(".move-card-item").on("animationend",
            function (event) {
              
                  let currentRound:number =self._jrummy.CurrentTurn;

                  if(currentRound<3)
                  {
                      self.num=currentRound;
                  }
                 
                 else
                 {
                    self.num =  Math.floor(Math.random() * self.listOfTalks.length);
                    
                 }

            });


    }

    public get PlayerPhrase():string {
        let phrase:string = this.listOfTalks[this.num];
        return phrase;

    }

    

}