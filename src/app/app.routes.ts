import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(mod => mod.MainComponent)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/cocktail-details/cocktail-details.component').then(mod => mod.CocktailDetailsComponent)
  }
];
