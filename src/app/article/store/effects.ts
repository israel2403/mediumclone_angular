import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { ArticleService as SharedArticleService } from '../../shared/services/article.service'
import { ArticleInterface } from '../../shared/types/article.interface'
import { ArticleService } from '../services/article.service'
import { articleActions } from './actions'

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      // Listen for the getFeed action
      ofType(articleActions.getArticle),
      // Call the getFeed function from the feed service
      switchMap(({ slug }) => {
        return articleService.getArticle(slug).pipe(
          // If the call is successful, dispatch the getFeedSuccess action
          map((article: ArticleInterface) => {
            return articleActions.getArticleSuccess({ article })
          }),
          // If the call fails, dispatch the getFeedFailure action
          catchError(() => of(articleActions.getArticleFailure()))
        )
      })
    )
  },
  // This flag tells NgRx that this effect is a functional effect and does not keep any state
  { functional: true }
)
export const deleteArticleEffect = createEffect(
  (actions$ = inject(Actions), articleService = inject(ArticleService)) => {
    return actions$.pipe(
      // Listen for the getFeed action
      ofType(articleActions.deleteArticle),
      // Call the getFeed function from the feed service
      switchMap(({ slug }) => {
        return articleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess()
          }),
          catchError(() => of(articleActions.deleteArticleFailure()))
        )
      })
    )
  },
  // This flag tells NgRx that this effect is a functional effect and does not keep any state
  { functional: true }
)

export const redirectAfterDeleteEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  { functional: true, dispatch: false }
)
