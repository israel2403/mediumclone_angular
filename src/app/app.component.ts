import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Store } from '@ngrx/store'
import { authActions } from './auth/store/actions'
import { TopBarComponent } from './shared/components/top-bar/top-bar.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(authActions.getCurrentUser())
  }
}
