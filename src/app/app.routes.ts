import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    loadChildren: () =>
      import('./global-feed/global-feed.route').then((m) => m.routes),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./your-feed/your-feed.route').then((m) => m.routes),
  },
  {
    path: 'tags/:slug',
    loadChildren: () =>
      import('./tag-feed/tag-feed.route').then((m) => m.routes),
  }
]
