"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./home/login.component');
var dashboard_component_1 = require('./home/dashboard.component');
var authGuard_1 = require('./authGuard');
exports.routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [authGuard_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes), authGuard_1.AuthGuard
];
