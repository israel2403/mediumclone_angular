import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { PopularTagType } from '../../../types/popular-tag.type'

export const popularTagsActions = createActionGroup({
  source: 'Popular Tags',
  events: {
    'Get Popular Tags': emptyProps(),
    'Get Popular Tags Success': props<{ popularTags: PopularTagType[] }>(),
    'Get Popular Tags Failure': emptyProps(),
  },
})
