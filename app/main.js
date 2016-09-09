"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
// Add these symbols to override the `LocationStrategy`
var common_1 = require('@angular/common');
// Our main component
var app_component_1 = require('./app.component');
// Our main routes
var app_routes_1 = require('./app.routes');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.APP_ROUTER_PROVIDERS,
    { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
]).catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map