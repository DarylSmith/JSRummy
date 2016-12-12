import { Injectable } from '@angular/core';
import {Card} from './card';
import {GameStatus,CardLocation} from './enums';

@Injectable()
export class Game {
    PlayerBonus: number;
    PlayerBDeadwood: number;
    ComputerDeadwood: number;

    ComputerBonus: number;
    ComputerPoints: number;
    Winner: string;
    CurrentStatus: GameStatus;
}