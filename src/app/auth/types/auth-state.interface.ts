import { CurrentUserInterface } from '../../shared/types/current-user.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
}
