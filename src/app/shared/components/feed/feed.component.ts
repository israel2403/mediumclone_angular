import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { feedActions } from './store/actions'
import { selectError, selectFeedData, selectIsLoading } from './store/reducers'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [],
})
export class FeedComponent implements OnInit {
  @Input() apiUrl: string = ''
  constructor(private store: Store) {}

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    data: this.store.select(selectFeedData),
  })

  ngOnInit(): void {
    this.store.dispatch(feedActions.getFeed({ url: this.apiUrl }))
  }
}
