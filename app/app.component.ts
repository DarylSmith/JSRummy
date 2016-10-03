import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import {JRummy} from './services/jrummy'
import {AnimationCallback} from './services/animationCallback'



@Component({
    selector: 'jrummy-app',
    templateUrl: 'app/shared/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers:[JRummy,AnimationCallback]
})

export class AppComponent {
    pageTitle: string = 'Beat Daryl@Gin Rummy';


    constructor() {

    }

  
}
