import { routerNavigatedAction } from '@ngrx/router-store'
import { createFeature, createReducer, on } from '@ngrx/store'
import { CreateArticleStateInterface } from '../types/article-state.interface'
import { createArticleActions } from './actions'

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
}

const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    initialState,
    on(createArticleActions.createArticle, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createArticleActions.createArticleSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createArticleActions.createArticleFailure, (state, action) => ({
      ...state,
      isLoading: false,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
})

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectIsSubmitting,
  selectValidationErrors,
} = createArticleFeature
