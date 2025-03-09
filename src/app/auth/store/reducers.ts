import { routerNavigationAction } from '@ngrx/router-store'
import { createFeature, createReducer, on } from '@ngrx/store'
import { AuthStateInterface } from '../types/auth-state.interface'
import { authActions } from './actions'

// Define the initial state for the authentication feature.
// This state includes properties for tracking form submission status,
// loading status, the current user, and any validation errors.
const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
}

// Create a feature state for authentication using NgRx's createFeature function.
// This feature state is identified by the name 'auth' and is associated with
// a reducer function that handles actions related to authentication.
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
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    // Handle the registerSuccess action by updating the current user and setting isSubmitting to false.
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    // Handle the registerFailure action by updating validation errors and setting isSubmitting to false.
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    }))
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
