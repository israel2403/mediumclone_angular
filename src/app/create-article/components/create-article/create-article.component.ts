import { Component } from '@angular/core'
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component'
import { ArticleFormValuesInterface } from '../../../shared/components/article-form/types/article-form-values.interface'

@Component({
  selector: 'mc-create-article',
  templateUrl: './create-article.component.html',
  standalone: true,
  imports: [ArticleFormComponent],
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  }

  onSubmit(articleFormValues: ArticleFormValuesInterface) {
    console.log('onSubmit in create-article', articleFormValues)
  }
}
