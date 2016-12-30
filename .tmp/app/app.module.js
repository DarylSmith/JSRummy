var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { JRummy } from '../providers/jrummy/jrummy';
import { JRummyText } from '../providers/jrummy-text';
import { AnimationCallback } from '../providers/animation-callback';
import { Utilities } from '../providers/utilities';
import { ModalComponent } from '../shared/modal.component';
import { GameCompletedComponent } from '../shared/gamecompleted.component';
import { MyApp } from './app.component';
import { DragulaModule, DragulaService } from "../../node_modules/ng2-dragula/ng2-dragula";
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';
import { RulesPage } from '../pages/rules/rules';
import { SortHandPipe } from '../pipes/SortHandPipe';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                HomePage,
                ModalComponent,
                GameCompletedComponent,
                GamePage,
                RulesPage,
                SortHandPipe
            ],
            imports: [
                IonicModule.forRoot(MyApp), DragulaModule
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                HomePage,
                GamePage,
                RulesPage
            ],
            providers: [JRummy, AnimationCallback, JRummyText, Utilities, DragulaModule, DragulaService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map