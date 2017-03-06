import { Component } from '@angular/core';
import { AudioManager } from '../../providers/audioManager'
import { NavController } from 'ionic-angular';
import {GamePage} from '../game/game'
import {RulesPage} from '../rules/rules'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private audioManager:AudioManager) {
    
  }

  public playGame():void
  {
    this.audioManager.playSoundEffect("button_press.mp3");
    this.navCtrl.push(GamePage);
  }

    public getRules():void
  {
    this.audioManager.playSoundEffect("button_press.mp3");
    this.navCtrl.push(RulesPage);
  }


}
