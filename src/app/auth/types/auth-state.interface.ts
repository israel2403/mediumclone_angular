import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { BackendErrorsInterface } from './backend-errors.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
  isLoading: boolean
  validationErrors: BackendErrorsInterface | null
}
