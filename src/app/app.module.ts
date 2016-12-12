import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';


//services
import {JRummy} from '../providers/jrummy/jrummy'
import {JRummyText}  from '../providers/jrummy-text'
import {AnimationCallback}  from '../providers/animation-callback'
import {Utilities} from '../providers/utilities'

//components
import {ModalComponent} from '../shared/modal.component'
import { MyApp } from './app.component';
import {DragulaModule, DragulaService} from "../../node_modules/ng2-dragula/ng2-dragula"

//pages
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalComponent,
    GamePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage
  ],
  providers: [JRummy,AnimationCallback,JRummyText,Utilities,DragulaModule, DragulaService]
})
export class AppModule {}
