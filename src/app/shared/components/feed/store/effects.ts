import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { FeedService } from '../services/feed.service'
import { GetFeedResponseInterface } from '../types/get-feed-response.interface'
import { feedActions } from './actions'

/**
 * This effect listens for the getFeed action and calls the getFeed function from the feed service.
 * If the call is successful, it dispatches the getFeedSuccess action with the feed data.
 * If the call fails, it dispatches the getFeedFailure action.
 */
export const getFeedEffect = createEffect(
  (actions$ = inject(Actions), feedService = inject(FeedService)) => {
    return actions$.pipe(
      // Listen for the getFeed action
      ofType(feedActions.getFeed),
      // Call the getFeed function from the feed service
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          // If the call is successful, dispatch the getFeedSuccess action
          map((feed: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({ feed })
          }),
          // If the call fails, dispatch the getFeedFailure action
          catchError(() => of(feedActions.getFeedFailure()))
        )
      })
    )
  },
  // This flag tells NgRx that this effect is a functional effect and does not keep any state
  { functional: true }
)
