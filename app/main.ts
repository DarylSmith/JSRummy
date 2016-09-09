import { bootstrap } from '@angular/platform-browser-dynamic';
// Add these symbols to override the `LocationStrategy`
import { LocationStrategy,
         HashLocationStrategy } from '@angular/common';
// Our main component
import { AppComponent } from './app.component';

// Our main routes
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy }
  
]).catch(err => console.error(err));
