import { Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'calendario', pathMatch: 'full' },
  { path: 'calendario', component: CalendarioComponent }
];