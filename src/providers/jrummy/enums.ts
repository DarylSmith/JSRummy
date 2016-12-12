export enum GameStatus {
    GameStart = 0,
    PlayerPickup,
    PlayerDiscard,
    ComputerTurn,
    ComputerCall,
    PlayerCall,
    PlayerWon,
    ComputerWon,
    FirstTurnPlayerPickup,
    FirstTurnComputerPickup
}

//this represents the location of cards for the computer to track
export enum CardLocation {
    InPlayerHand,
    InDiscardPile,
    InComputerHand
}
