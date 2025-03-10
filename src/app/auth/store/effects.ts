import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { PersistanceService } from '../../shared/services/persistance.service'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { AuthService } from '../services/auth.service'
import { authActions } from './actions'

/*
  This effect will be triggered when the getCurrentUser action is dispatched
  It will call the getCurrentUser function from the auth service
  and then based on the result of the function it will dispatch either
  the getCurrentUserSuccess action or the getCurrentUserFailure action
*/
export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistanceService.get('accessToken')
        if (!token) {
          return of(authActions.getCurrentUserFailure())
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getCurrentUserSuccess({ currentUser })
          }),
          catchError(() => of(authActions.getCurrentUserFailure()))
        )
      })
    )
  },
  // this is a flag that will tell ngrx that this effect is a functional effect
  // and it should not keep any state
  { functional: true }
)

/*
  This effect will be triggered when the register action is dispatched
  It will call the register function from the auth service
  and then based on the result of the function it will dispatch either
  the registerSuccess action or the registerFailure action
*/
export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.registerSuccess({ currentUser })
          }),
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

/*
  This effect will be triggered when the registerSuccess action is dispatched
  It will redirect the user to the root route
*/
export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => router.navigateByUrl('/'))
    )
  },
  { functional: true, dispatch: false }
)

/*
  This effect will be triggered when the login action is dispatched
  It will call the login function from the auth service
  and then based on the result of the function it will dispatch either
  the loginSuccess action or the loginFailure action
*/
export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.loginSuccess({ currentUser })
          }),
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

/*
  This effect will be triggered when the loginSuccess action is dispatched
  It will redirect the user to the root route
*/
export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => router.navigateByUrl('/'))
    )
  },
  { functional: true, dispatch: false }
)
