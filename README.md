# MediumcloneAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

# NgRx Registration Flow

## Overview
This document explains the sequence of events that occur when the line:

```typescript
this.store.dispatch(authActions.register({ request }))
```

is executed in `register.component.ts`.

## Flow Breakdown

### 1. Dispatching the Action
- The `register` action is dispatched to the NgRx store.
- This action is an object that describes the event of a user attempting to register, along with the payload (`request`).

### 2. Reducer Handling
- The dispatched action is immediately processed by the reducer defined in `reducers.ts`.
- The reducer function associated with the `register` action updates the state by setting `isSubmitting` to `true` and clearing any `validationErrors`.

```typescript
on(authActions.register, (state) => ({
  ...state,
  isSubmitting: true,
  validationErrors: null,
}))
```

### 3. Effect Handling
- NgRx Effects listen for dispatched actions. When the `register` action is dispatched, the `registerEffect` defined in `effects.ts` is triggered.
- The `registerEffect` listens for the `register` action using the `ofType` operator and then performs an asynchronous operation (e.g., calling the `register` function from `AuthService`).

```typescript
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
  { functional: true }
)
```

### 4. Effect Result
- Based on the result of the asynchronous operation, the effect dispatches either a `registerSuccess` or `registerFailure` action.
- These actions are then processed by the reducer to update the state accordingly.

```typescript
on(authActions.registerSuccess, (state, action) => ({
  ...state,
  isSubmitting: false,
  currentUser: action.currentUser,
}))

on(authActions.registerFailure, (state, action) => ({
  ...state,
  isSubmitting: false,
  validationErrors: action.errors,
}))
```

## Summary
- **Reducers:** Handle synchronous state updates immediately when an action is dispatched.
- **Effects:** Listen for dispatched actions and handle asynchronous operations. They can dispatch new actions based on the results of these operations.
- **Flow:** The action first goes through the reducer for immediate state updates and then triggers any associated effects for handling side effects and further state updates based on asynchronous operations.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
