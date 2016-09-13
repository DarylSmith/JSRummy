import { Component, HostBinding } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    templateUrl: 'app/home/dashboard.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class DashboardComponent {
    public pageTitle: string = 'Dashboard';
}
