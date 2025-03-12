import { CommonModule } from '@angular/common'
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import queryString from 'query-string'
import { combineLatest } from 'rxjs'
import { environment } from '../../../../environments/environment.development'
import { ErrorMessageComponent } from '../error-message/error-message.component'
import { LoadingComponent } from '../loading/loading.component'
import { PaginationComponent } from '../pagination/pagination.component'
import { TagListComponent } from '../tag-list/tag-list.component'
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
    TagListComponent,
  ],
})
export class FeedComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    // Check if the `apiUrl` input property has changed and it's not the first change
    const isApiUrlChanged =
      !changes['apiUrl'].firstChange &&
      changes['apiUrl'].currentValue !== changes['apiUrl'].previousValue

    // If `apiUrl` has changed, fetch the new feed data
    if (isApiUrlChanged) {
      this.fetchFeed()
    }
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
