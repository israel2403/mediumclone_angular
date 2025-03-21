import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { BannerComponent } from '../../../shared/components/banner/banner.component'
import { FeedTogglerComponent } from '../../../shared/components/feed-toggler/feed-toggler.component'
import { FeedComponent } from '../../../shared/components/feed/feed.component'
import { PopularTagsComponent } from '../../../shared/components/pupular-tags/popular-tags.component'

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tag-feed.component.html',
  standalone: true,
  imports: [
    FeedComponent,
    BannerComponent,
    PopularTagsComponent,
    FeedTogglerComponent,
  ],
})
export class TagFeedComponent implements OnInit {
  apiUrl: string = ''
  tagName: string = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug']
      this.apiUrl = `/articles?tag=${this.tagName}`
    })
  }
}
