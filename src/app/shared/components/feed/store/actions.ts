import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { GetFeedResponseInterface } from '../types/get-feed-response.interface'

export const feedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Get Feed': props<{ url: string }>(),
    'Get Feed Success': props<{ feed: GetFeedResponseInterface }>(),
    'Get Feed Failure': emptyProps(),
  },
})
