import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Rules page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rules',
  templateUrl: 'rules.html'
})
export class RulesPage {

  public textDisplay:string="objective";

  public displayText(elem:string):void
  {
    this.textDisplay=elem;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  
  }

}
