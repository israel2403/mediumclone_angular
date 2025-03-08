import { createFeature, createReducer, on } from '@ngrx/store'
import { AuthStateInterface } from '../types/auth-state.interface'
import { authActions } from './actions'

const initialState: AuthStateInterface = {
  isSubmitting: false,
}

// A feature state is a state object that is used to store a specific part of
// an application's state.  Feature states are used to organize the state of
// an application into smaller, more manageable pieces.  Each feature state
// has a unique name, and is used to store a specific part of the
// application's state.  Feature states are used by the NgRx store to store
// the state of an application.
//
// The `authFeature` variable is a feature state that is used to store the
// state of the authentication part of the application.  The `authFeature`
// feature state is created by calling the `createFeature` function and
// passing an object with two properties: `name` and `reducer`.
//
// The `name` property is a string that identifies the feature state (in
// this case, 'auth').  This string is used as the key in the global state
// object to store the value of the `reducer` property.
//
// The `reducer` property is the reducer function that will be used to handle
// actions for this feature state.  The reducer function takes the current
// state and an action as arguments, and returns a new state.
const authFeature = createFeature({
  // The `name` property is a string that identifies the feature state (in
  // this case, 'auth').  This string is used as the key in the global state
  // object to store the value of the `reducer` property.
  name: 'auth',
  // The `reducer` property is the reducer function that will be used to handle
  // actions for this feature state.  The reducer function takes the current
  // state and an action as arguments, and returns a new state.
  reducer: createReducer(
    // The initial state of the feature state is an object with a single
    // property, `isSubmitting`, which is set to `false`.
    initialState,
    // The `on` function is a higher-order function that takes an action creator
    // and a function that handles that action as arguments, and returns a
    // new function that will be used as the reducer function for that action.
    //
    // The `on` function is used here to handle the `register` action.  When the
    // `register` action is dispatched, the reducer function will be called with
    // the current state and the `register` action as arguments.  The reducer
    // function will then return a new state by calling the function passed to
    // the `on` function.
    on(authActions.register, (state) => ({
      // The new state is created by spreading the current state into a new
      // object, and then setting the `isSubmitting` property to `true`.
      ...state,
      isSubmitting: true,
    }))
  ),
})

// We're using the `createFeature` function from `@ngrx/store` to create a
// feature state for our authentication reducer.
//
// The `createFeature` function takes an options object with a `name` property
// and a `reducer` property.  The `name` property is a string that identifies
// the feature state (in this case, 'auth'), and the `reducer` property is the
// reducer function that will be used to handle actions for this feature state.
//
// The `createFeature` function returns an object with three properties: `name`
// and `reducer`, which have the same values as the `name` and `reducer`
// properties we passed in.  It also returns a `selectIsSubmitting` property,
// which is a selector function that can be used to select the `isSubmitting`
// property from the authentication state.
//
// We're using the destructuring assignment syntax to extract the `name`,
// `reducer`, and `selectIsSubmitting` properties from the object returned by
// `createFeature` and assign them to three new variables: `authFeatureKey`,
// `authReducer`, and `selectIsSubmitting`.
//
// `authFeatureKey` is a string that identifies the authentication feature
// state, `authReducer` is the reducer function that will be used to handle
// actions for this feature state, and `selectIsSubmitting` is a selector
// function that can be used to select the `isSubmitting` property from the
// authentication state.
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
} = authFeature
