import {Injectable} from "@angular/core";

export class JRummyText {

    public PICK_FIRST_CARD: string = "On first turn, you must choose from the discard pile .Otherwise, allow computer to go first by clicking on the pass button";

    public NOT_PICKUP_TIME: string = "Not time to pickup";

    public GAME_IS_DRAW: string = "The game is a draw";

    public GAME_IS_DRAW_CONTINUE: string = "The game is a draw.Do you wish to continue?";

    public GAME_TITLE:string = "Beat Daryl @ Gin Rummy";

    public DARYL_WON_GAME:string="Daryl wins the game!";

    public PLAYER_WON_GAME:string="You win the game!";

    public DARYL_WON_ROUND:string="Daryl wins the round!";

    public PLAYER_WON_ROUND:string="You win the round!";

    public NO_CALL_ALLOWED="You can only call at the beginning of your turn, before selecting a card";


    public CONTINUE_TEXT:string ="Do you wish to continue?";

    public DARYL_CARDS:string ="Daryl's Cards";

    public PLAYER_CARDS:string="Player's Cards";

     public ROUND:string="Round";

     public COMPUTER_SCORE:string="Daryl's Score:";

     public PLAYER_SCORE:string="Your Score:";

     public BEGIN_PLAY_INSTRUCTIONS: string= "Ready to prove your worthiness? Play by pressing on either the discard or stock pile to select a new card. Once you have selected, discard one from your hand, by pressing on it. Try to get either sets or runs of 3 or more - press on the call button when you've got a winning hand! You can sort your cards by swiping them in either direction. Good Luck";

}