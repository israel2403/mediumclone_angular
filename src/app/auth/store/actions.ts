import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { RegisterRequestInterface } from '../types/register-request.interface'

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': emptyProps(),
  },
})
