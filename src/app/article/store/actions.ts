import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { ArticleInterface } from '../../shared/types/article.interface'

export const articleActions = createActionGroup({
  source: 'Article',
  events: {
    'Get Article': props<{ slug: string }>(),
    'Get Article Success': props<{ article: ArticleInterface }>(),
    'Get Article Failure': emptyProps(),

    'Delete Article': props<{ slug: string }>(),
    'Delete Article Success': emptyProps(),
    'Delete Article Failure': emptyProps(),
  },
})
