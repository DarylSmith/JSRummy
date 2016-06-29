System.register(['angular2/core', '.././services/jrummy.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, jrummy_js_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (jrummy_js_1_1) {
                jrummy_js_1 = jrummy_js_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(jrummy) {
                    this.pageTitle = 'Acme Product Management';
                    this._jrummy = jrummy;
                    this.currentGame = new jrummy_js_1.Game();
                    this._jrummy.startGame(this.currentGame);
                }
                AppComponent.prototype.unitTestCard = function (suit, name) {
                    this._jrummy.unitTestCard(suit, name);
                };
                AppComponent.prototype.getCard = function () {
                    this._jrummy.computerPlaySolo();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'jrummy',
                        templateUrl: '/app/app.component.html',
                        providers: [jrummy_js_1.JRummy]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof jrummy_js_1.JRummy !== 'undefined' && jrummy_js_1.JRummy) === 'function' && _a) || Object])
                ], AppComponent);
                return AppComponent;
                var _a;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map