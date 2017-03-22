var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { JRummy } from '../providers/jrummy/jrummy';
import { JRummyText } from '../providers/jrummy-text';
import { JrummyErrors } from '../providers/jrummy-errors';
import { AnimationCallback } from '../providers/animation-callback';
import { Utilities } from '../providers/utilities';
import { AudioManager } from '../providers/audioManager';
import { StateManager } from '../providers/audioManager';
import { ModalComponent } from '../shared/modal.component';
import { TrashTalkComponent } from '../shared/trashtalk.component';
import { GameCompletedComponent } from '../shared/gamecompleted.component';
import { SavedGameComponent } from '../shared/savedgame.component';
import { MyApp } from './app.component';
import { PlayingCardComponent } from '../shared/playingcard.component';
import { DragulaModule, DragulaService } from "../../node_modules/ng2-dragula/ng2-dragula";
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { RulesPage } from '../pages/rules/rules';
import { ErrorPage } from '../pages/error/error';
import { SortHandPipe } from '../pipes/SortHandPipe';
import { FilterHandPipe } from '../pipes/FilterHandPipe';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ErrorPage,
                ModalComponent,
                SavedGameComponent,
                TrashTalkComponent,
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
            providers: [{ provide: ErrorHandler, useClass: JrummyErrors }, JRummy, AnimationCallback, JRummyText, Utilities, DragulaModule, DragulaService, PlayingCardComponent, TrashTalkComponent, AudioManager, StateManager]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map