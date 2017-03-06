import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AudioManager } from '../../providers/audioManager'
import { GamePage } from '../game/game'
import { RulesPage } from '../rules/rules'
import { JRummyText } from '../../providers/jrummy-text'


/*
  Generated class for the Error page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-error',
  templateUrl: 'error.html'
})
export class ErrorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private audioManager: AudioManager,private jrummyText:JRummyText) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorPage');
  }

  public playGame(): void {
    this.audioManager.playSoundEffect("button_press.mp3");
    this.navCtrl.push(GamePage);
  }

  public getRules(): void {
    this.audioManager.playSoundEffect("button_press.mp3");
    this.navCtrl.push(RulesPage);
  }

}
