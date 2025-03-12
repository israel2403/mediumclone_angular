import { PopularTagType } from "../../../types/popular-tag.type"

export interface PopularTagStateInterface {
  isLoading: boolean
  error: string | null
  data: PopularTagType[] | null
}
