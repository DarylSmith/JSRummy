import { provideRouter, RouterConfig } from '@angular/router';
import { DashboardComponent } from './home/dashboard.component';
import { GameComponent } from './game/game.component';

//to secure a route add the [AuthGuard] decorator
//for pages that only allow system admins, use AuthGuardSysAdmin
export const routes: RouterConfig = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'game', component: GameComponent }

  
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
