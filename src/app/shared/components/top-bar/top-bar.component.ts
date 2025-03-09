import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  standalone: true,
})
export class TopBarComponent {
  constructor(private store: Store) {}
}
