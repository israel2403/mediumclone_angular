import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { PopularTagType } from '../../../types/popular-tag.type'
import { PopularTagService } from '../services/popular-tag.service'
import { popularTagsActions } from './actions'

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagService = inject(PopularTagService)
  ) => {
    return actions$.pipe(
      // Listen for the getFeed action
      ofType(popularTagsActions.getPopularTags),
      // Call the getFeed function from the feed service
      switchMap(() => {
        return popularTagService.getPopularTags().pipe(
          // If the call is successful, dispatch the getFeedSuccess action
          map((popularTags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({ popularTags })
          }),
          // If the call fails, dispatch the getFeedFailure action
          catchError(() => of(popularTagsActions.getPopularTagsFailure()))
        )
      })
    )
  },
  // This flag tells NgRx that this effect is a functional effect and does not keep any state
  { functional: true }
)
