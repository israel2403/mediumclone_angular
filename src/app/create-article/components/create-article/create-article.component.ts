import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component'
import { ArticleFormValuesInterface } from '../../../shared/components/article-form/types/article-form-values.interface'
import { ArticleRequestInterface } from '../../../shared/types/article-request.interface'
import { createArticleActions } from '../../store/actions'
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers'

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent, CommonModule],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(private store: Store) {}

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    const request: ArticleRequestInterface = {
      article: articleFormValues,
    }

    this.store.dispatch(createArticleActions.createArticle({ request }))
  }
}
