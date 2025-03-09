import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { PersistanceService } from '../../shared/services/persistance.service'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { AuthService } from '../services/auth.service'
import { authActions } from './actions'

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
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
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.registerSuccess({ currentUser })
          }),
          // the catchError function will catch any error that might happen
          // and it will return a new action of type registerFailure
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      })
    )
  },
  // this is a flag that will tell ngrx that this effect is a functional effect
  // and it should not keep any state
  { functional: true }
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => router.navigateByUrl('/'))
    )
  },
  { functional: true, dispatch: false }
)


export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    // this is an effect that will be triggered when the register action is dispatched
    // the effect will call the register function from the auth service
    // and then based on the result of the function it will dispatch either
    // the registerSuccess action or the registerFailure action
    return actions$.pipe(
      // ofType is a function that will filter the actions that are passed to the effect
      // it will only let the action that has the type of register pass
      ofType(authActions.login),
      // switchMap is a function that will cancel the previous inner observable
      // and return a new one
      switchMap(({ request }) => {
        // the register function from the auth service will be called
        // and it will return an observable
        return authService.login(request).pipe(
          // the map function will take the result of the register function
          // and it will return a new action of type registerSuccess
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.loginSuccess({ currentUser })
          }),
          // the catchError function will catch any error that might happen
          // and it will return a new action of type registerFailure
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      })
    )
  },
  // this is a flag that will tell ngrx that this effect is a functional effect
  // and it should not keep any state
  { functional: true }
)

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => router.navigateByUrl('/'))
    )
  },
  { functional: true, dispatch: false }
)
