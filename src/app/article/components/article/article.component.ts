import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest, filter, map } from 'rxjs'
import { selectCurrentUser } from '../../../auth/store/reducers'
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component'
import { LoadingComponent } from '../../../shared/components/loading/loading.component'
import { TagListComponent } from '../../../shared/components/tag-list/tag-list.component'
import { CurrentUserInterface } from '../../../shared/types/current-user.interface'
import { articleActions } from '../../store/actions'
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (currentUser): currentUser is CurrentUserInterface | null =>
            currentUser !== undefined
        )
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false
      }
      return article.author.username === currentUser.username
    })
  )

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  })

  constructor(private store: Store, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }))
  }

  deleteArticle() {
    this.store.dispatch(articleActions.deleteArticle({ slug: this.slug }))
  }
}
