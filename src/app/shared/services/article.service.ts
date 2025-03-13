import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../../environments/environment.development'
import { ArticleResponseInterface } from '../components/feed/types/article-response.interface'
import { ArticleInterface } from '../types/article.interface'

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<ArticleInterface> {
    const fullUrl = `${environment.baseUrl}/articles/${slug}`
    return this.http
      .get<ArticleResponseInterface>(fullUrl)
      .pipe(map((response: ArticleResponseInterface) => response.article))
  }
}
