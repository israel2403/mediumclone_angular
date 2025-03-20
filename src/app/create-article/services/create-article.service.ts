import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { ArticleResponseInterface } from '../../shared/components/feed/types/article-response.interface'
import { ArticleRequestInterface } from '../../shared/types/article-request.interface'
import { ArticleInterface } from '../../shared/types/article.interface'

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  constructor(private http: HttpClient) {}
  createArticle(
    articleRequest: ArticleRequestInterface
  ): Observable<ArticleInterface> {
    const fullUrl = `${environment.baseUrl}/articles`

    return this.http
      .post<ArticleResponseInterface>(fullUrl, articleRequest)
      .pipe(map((response) => response.article))
  }
}
