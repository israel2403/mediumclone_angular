import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '../../../../../environments/environment.development'
import { PopularTagType } from '../../../types/popular-tag.type'
import { GetPopularTagsResponseInterface } from '../types/get-popular-tags-response.interface'

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.baseUrl + '/tags'
    return this.http
      .get<GetPopularTagsResponseInterface>(url)
      .pipe(map((response: GetPopularTagsResponseInterface) => response.tags))
  }
}
