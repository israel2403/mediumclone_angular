import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ArticleComponent {}
