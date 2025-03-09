import { routerNavigationAction } from '@ngrx/router-store'
import { createFeature, createReducer, on } from '@ngrx/store'
import { AuthStateInterface } from '../types/auth-state.interface'
import { authActions } from './actions'

// Define the initial state for the authentication feature.
const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
}

// Create a feature state for authentication using NgRx's createFeature function.
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,

    // Handle the register action by setting isSubmitting to true and clearing validation errors.
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),

    // Handle the registerSuccess action by updating the current user and setting isSubmitting to false.
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),

    // Handle the registerFailure action by updating validation errors and setting isSubmitting to false.
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    // Handle the login action by setting isSubmitting to true and clearing validation errors.
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),

    // Handle the loginSuccess action by updating the current user and setting isSubmitting to false.
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),

    // Handle the loginFailure action by updating validation errors and setting isSubmitting to false.
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),

    // Handle the getCurrentUser action by setting isLoading to true.
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),

    // Handle the getCurrentUserSuccess action by updating the current user and setting isLoading to false.
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),

    // Handle the getCurrentUserFailure action by updating validation errors and setting isLoading to false.
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),

    // Handle the router navigation action by clearing validation errors.
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    })),
  ),
})

// Destructure the feature's properties for export, including:
// - authFeatureKey: a string key identifying the feature state.
// - authReducer: the reducer function to handle feature state updates.
// - selectIsSubmitting: a selector function to access the isSubmitting state.
// - selectCurrentUser: a selector function to access the currentUser state.
// - selectValidationErrors: a selector function to access validationErrors.
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature

