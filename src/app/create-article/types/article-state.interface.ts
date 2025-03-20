import { BackendErrorsInterface } from "../../auth/types/backend-errors.interface"

export interface CreateArticleStateInterface {
  isSubmitting: boolean
  validationErrors: BackendErrorsInterface | null
}
