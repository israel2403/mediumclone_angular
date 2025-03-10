import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../../../environments/environment.development'
import { GetFeedResponseInterface } from '../types/get-feed-response.interface'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<GetFeedResponseInterface> {
    const fullUrl = environment.baseUrl + url
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
