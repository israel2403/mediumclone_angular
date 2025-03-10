import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../../../environments/environment.development'
import { GetFeedResponseInterface } from '../types/get-feed-response.interface'

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string) {
    const fullUrl = environment.baseUrl + url
    return this.http.get<GetFeedResponseInterface>(fullUrl)
  }
}
