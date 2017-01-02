import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';


//services
import {JRummy} from '../providers/jrummy/jrummy';
import {JRummyText}  from '../providers/jrummy-text';
import {AnimationCallback}  from '../providers/animation-callback';
import {Utilities} from '../providers/utilities';

//components
import {ModalComponent} from '../shared/modal.component';
import {GameCompletedComponent} from '../shared/gamecompleted.component';
import { MyApp } from './app.component';
import {PlayingCardComponent} from '../shared/playingcard.component';
import {DragulaModule, DragulaService} from "../../node_modules/ng2-dragula/ng2-dragula";

//pages
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { RulesPage } from '../pages/rules/rules';
//pipes 
import {SortHandPipe} from '../pipes/SortHandPipe';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalComponent,
    GameCompletedComponent,
    PlayingCardComponent,
    GamePage,
    RulesPage,
    SortHandPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    RulesPage,
    PlayingCardComponent
  ],
  providers: [JRummy,AnimationCallback,JRummyText,Utilities,DragulaModule, DragulaService,PlayingCardComponent]
})
export class AppModule {}
