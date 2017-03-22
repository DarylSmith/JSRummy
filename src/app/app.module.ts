import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';


//services
import { JRummy } from '../providers/jrummy/jrummy';
import { JRummyText } from '../providers/jrummy-text';
import { JrummyErrors } from '../providers/jrummy-errors';
import { AnimationCallback } from '../providers/animation-callback';
import { Utilities } from '../providers/utilities';
import { AudioManager } from '../providers/audioManager';
import { StateManager } from '../providers/audioManager';
//components
import { ModalComponent } from '../shared/modal.component';
import { GameCompletedComponent } from '../shared/gamecompleted.component';
import { SavedGameComponent } from '../shared/savedgame.component';
import { MyApp } from './app.component';
import { PlayingCardComponent } from '../shared/playingcard.component';
import { DragulaModule, DragulaService } from "../../node_modules/ng2-dragula/ng2-dragula";

//pages
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { RulesPage } from '../pages/rules/rules';
import { ErrorPage } from '../pages/error/error';
//pipes 
import { SortHandPipe } from '../pipes/SortHandPipe';
import { FilterHandPipe } from '../pipes/FilterHandPipe';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ErrorPage,
    ModalComponent,
    SavedGameComponent,
    GameCompletedComponent,
    PlayingCardComponent,
    GamePage,
    RulesPage,
    SortHandPipe,
    FilterHandPipe,

  ],
  imports: [
    IonicModule.forRoot(MyApp), DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    RulesPage,
    ErrorPage
  ],
  providers: [{ provide: ErrorHandler, useClass: JrummyErrors }, JRummy, AnimationCallback, JRummyText, Utilities, DragulaModule, DragulaService, PlayingCardComponent, AudioManager, StateManager]
})
export class AppModule { }
