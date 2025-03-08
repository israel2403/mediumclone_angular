import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { AuthService } from '../services/auth.service'
import { authActions } from './actions'

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    // this is an effect that will be triggered when the register action is dispatched
    // the effect will call the register function from the auth service
    // and then based on the result of the function it will dispatch either
    // the registerSuccess action or the registerFailure action
    return actions$.pipe(
      // ofType is a function that will filter the actions that are passed to the effect
      // it will only let the action that has the type of register pass
      ofType(authActions.register),
      // switchMap is a function that will cancel the previous inner observable
      // and return a new one
      switchMap(({ request }) => {
        // the register function from the auth service will be called
        // and it will return an observable
        return authService.register(request).pipe(
          // the map function will take the result of the register function
          // and it will return a new action of type registerSuccess
          map((currentUser: CurrentUserInterface) => authActions.registerSuccess({ currentUser })),
          // the catchError function will catch any error that might happen
          // and it will return a new action of type registerFailure
          catchError(() => of(authActions.registerFailure()))
        )
      })
    )
  },
  // this is a flag that will tell ngrx that this effect is a functional effect
  // and it should not keep any state
  { functional: true }
)
