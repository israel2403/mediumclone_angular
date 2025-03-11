import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import queryString from 'query-string'
import { combineLatest } from 'rxjs'
import { environment } from '../../../../environments/environment.development'
import { ErrorMessageComponent } from '../error-message/error-message.component'
import { LoadingComponent } from '../loading/loading.component'
import { PaginationComponent } from '../pagination/pagination.component'
import { feedActions } from './store/actions'
import { selectError, selectFeedData, selectIsLoading } from './store/reducers'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ErrorMessageComponent,
    LoadingComponent,
    PaginationComponent,
  ],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = ''

  limit = environment.limit

  baseUrl = this.router.url.split('?')[0]

  currentPage: number = 0

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    data: this.store.select(selectFeedData),
  })

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page'] || '1')
      this.fetchFeed()
    })
  }

  fetchFeed() {
    const offset = this.currentPage * this.limit - this.limit
    const parsedUrl = queryString.parseUrl(this.apiUrl)
    const stringifiedParams = queryString.stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    })
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
    this.store.dispatch(feedActions.getFeed({ url: apiUrlWithParams }))
  }
}
