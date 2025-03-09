import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { BackendErrorsInterface } from '../types/backend-errors.interface'
import { LoginRequestInterface } from '../types/login-request.interface'
import { RegisterRequestInterface } from '../types/register-request.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorsInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login Success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorsInterface }>(),

    'Get Current User': emptyProps(),
    'Get Current User Success': props<{ currentUser: CurrentUserInterface }>(),
    'Get Current User Failure': emptyProps(),
  },
})
