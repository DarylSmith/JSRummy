export var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["GameStart"] = 0] = "GameStart";
    GameStatus[GameStatus["PlayerPickup"] = 1] = "PlayerPickup";
    GameStatus[GameStatus["PlayerDiscard"] = 2] = "PlayerDiscard";
    GameStatus[GameStatus["ComputerTurn"] = 3] = "ComputerTurn";
    GameStatus[GameStatus["ComputerCall"] = 4] = "ComputerCall";
    GameStatus[GameStatus["PlayerCall"] = 5] = "PlayerCall";
    GameStatus[GameStatus["PlayerWon"] = 6] = "PlayerWon";
    GameStatus[GameStatus["ComputerWon"] = 7] = "ComputerWon";
    GameStatus[GameStatus["FirstTurnPlayerPickup"] = 8] = "FirstTurnPlayerPickup";
    GameStatus[GameStatus["FirstTurnComputerPickup"] = 9] = "FirstTurnComputerPickup";
})(GameStatus || (GameStatus = {}));
//this represents the location of cards for the computer to track
export var CardLocation;
(function (CardLocation) {
    CardLocation[CardLocation["InPlayerHand"] = 0] = "InPlayerHand";
    CardLocation[CardLocation["InDiscardPile"] = 1] = "InDiscardPile";
    CardLocation[CardLocation["InComputerHand"] = 2] = "InComputerHand";
})(CardLocation || (CardLocation = {}));
//# sourceMappingURL=enums.js.map