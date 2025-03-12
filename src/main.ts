import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { isDevMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideRouterStore, routerReducer } from '@ngrx/router-store'
import { provideState, provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { AppComponent } from './app/app.component'
import { appRoutes } from './app/app.routes'
import * as authEffects from './app/auth/store/effects'
import { authFeatureKey, authReducer } from './app/auth/store/reducers'
import * as feedEffects from './app/shared/components/feed/store/effects'
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/store/reducers'
import * as popularTagsEffects from './app/shared/components/pupular-tags/store/effects'
import {
  popularTagsFeatureKey,
  popularTagsReducer,
} from './app/shared/components/pupular-tags/store/reducers'
import { authInterceptors } from './app/shared/services/auth-interceptor'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptors])),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideState(popularTagsFeatureKey, popularTagsReducer),
    provideEffects(authEffects, feedEffects, popularTagsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
})
