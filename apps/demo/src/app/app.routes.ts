import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'basic-tree',
    loadComponent: () =>
      import('./components/examples/basic-store/basic-store.component').then(
        (c) => c.BasicTreeComponent
      ),
  },
  {
    path: 'nested-tree',
    loadComponent: () =>
      import('./components/examples/nested-store.component').then(
        (c) => c.NestedTreeComponent
      ),
  },
  {
    path: 'batching-comparison',
    loadComponent: () =>
      import(
        './components/examples/performance/batching-comparison.component'
      ).then((c) => c.BatchingComparisonComponent),
  },
  {
    path: 'version-comparison',
    loadComponent: () =>
      import(
        './components/examples/performance/version-comparison.component'
      ).then((c) => c.VersionComparisonComponent),
  },
  {
    path: 'entity-crud',
    loadComponent: () =>
      import('./components/examples/entities/entity-crud.component').then(
        (c) => c.EntityCrudComponent
      ),
  },
  {
    path: 'form-validation',
    loadComponent: () =>
      import('./components/examples/forms/form-validation.component').then(
        (c) => c.FormValidationComponent
      ),
  },
  // Redirect any unknown routes to home
  {
    path: '**',
    redirectTo: '',
  },
];
