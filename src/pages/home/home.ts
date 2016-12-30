import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {GamePage} from '../game/game'
import {RulesPage} from '../rules/rules'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  public playGame():void
  {

    this.navCtrl.push(GamePage);
  }

    public getRules():void
  {

    this.navCtrl.push(RulesPage);
  }


}
