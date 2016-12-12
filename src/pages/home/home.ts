import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {GamePage} from '../game/game'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public pageTitle: string = 'Dashboard';
  constructor(public navCtrl: NavController) {
    
  }

  public playGame():void
  {

    this.navCtrl.push(GamePage);
  }

}
