import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { combineLatest } from 'rxjs'
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component'
import { authActions } from '../../store/actions'
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers'
import { RegisterRequestInterface } from '../../types/register-request.interface'

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, BackendErrorMessagesComponent],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    console.log('Form', this.form.getRawValue())
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({ request }))
  }
}
