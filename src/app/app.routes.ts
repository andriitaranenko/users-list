import { Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];
