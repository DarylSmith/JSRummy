import {Injectable} from "@angular/core";

export class JRummyText {

    public PICK_FIRST_CARD: string = "On first turn, you must choose from the discard pile .Otherwise, allow computer to go first by clicking on the pass button";

    public NOT_PICKUP_TIME: string = "Nice try! You need to discard before you can pick up another card";

    public CANT_CALL_YET: string = "Sorry, you can can't call unless you have 10 points or less";

    public GAME_IS_DRAW: string = "The game is a draw";

    public GAME_IS_DRAW_CONTINUE: string = "The game is a draw.Do you wish to continue?";

    public GAME_TITLE:string = "Beat Daryl @ Gin Rummy";

    public DARYL_WON_GAME:string="Daryl wins the game!";

    public PLAYER_WON_GAME:string="You win the game!";

    public DARYL_WON_ROUND:string="Daryl wins the round!";

    public PLAYER_WON_ROUND:string="You win the round!";

    public NO_CALL_ALLOWED="You can only call at the beginning of your turn, before selecting a card";

     public ERROR_MESSAGE ="Oops, something went wrong. Let's start this round again.";

      public SAVED_GAME_MESSAGE ="Daryl was enjoying your last game. Would you like to continue it?";

    public PLAYER_TURN="Your Turn";

    public DARYL_TURN="Daryl's Turn";

    public GAME_OVER="Game Over";

    public CONTINUE_TEXT:string ="Do you wish to continue?";

    public DARYL_CARDS:string ="Daryl's Cards";

    public PLAYER_CARDS:string="Player's Cards";

     public ROUND:string="Round";

     public COMPUTER_SCORE:string="Daryl's Score:";

     public PLAYER_SCORE:string="Your Score:";

    public ERROR_PAGE_TEXT ="Oops, something went wrong. Daryl still wants to play though. Click the button below to return to your game";

     public BEGIN_PLAY_INSTRUCTIONS: string= "Play by pressing on either the discard or stock pile to select a new card. Once you have selected, discard one from your hand, by pressing on it. Each time you get a set or a run, sort them by moving them to the left side of your pile. When your hand is ready, click on the call button.  Good Luck!";

}