import { createActionGroup, props } from '@ngrx/store'
import { BackendErrorsInterface } from '../../auth/types/backend-errors.interface'
import { ArticleRequestInterface } from '../../shared/types/article-request.interface'
import { ArticleInterface } from '../../shared/types/article.interface'

export const createArticleActions = createActionGroup({
  source: 'Create Article',
  events: {
    'Create Article': props<{ request: ArticleRequestInterface }>(),
    'Create Article Success': props<{ article: ArticleInterface }>(),
    'Create Article Failure': props<{ errors: BackendErrorsInterface }>(),
  },
})
