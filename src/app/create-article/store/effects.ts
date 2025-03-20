import { HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { ArticleInterface } from '../../shared/types/article.interface'
import { CreateArticleService } from '../services/create-article.service'
import { createArticleActions } from './actions'

export const createArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    createArticleService = inject(CreateArticleService)
  ) => {
    return actions$.pipe(
      // Listen for the getFeed action
      ofType(createArticleActions.createArticle),
      // Call the getFeed function from the feed service
      switchMap(({ request }) => {
        return createArticleService.createArticle(request).pipe(
          map((article: ArticleInterface) => {
            return createArticleActions.createArticleSuccess({ article })
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              createArticleActions.createArticleFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        )
      })
    )
  },
  // This flag tells NgRx that this effect is a functional effect and does not keep any state
  { functional: true }
)

export const redirectAfterCreateEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(createArticleActions.createArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug])
      })
    )
  },
  { functional: true, dispatch: false }
)
