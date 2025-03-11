import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { ErrorMessageComponent } from '../error-message/error-message.component'
import { LoadingComponent } from '../loading/loading.component'
import { feedActions } from './store/actions'
import { selectError, selectFeedData, selectIsLoading } from './store/reducers'

@Component({
  selector: 'mc-feed',
  templateUrl: './feed.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, ErrorMessageComponent, LoadingComponent],
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
