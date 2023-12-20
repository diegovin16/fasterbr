import type { CategoryType } from './category'

export interface TablePropsType {
  headers: string[]
  rows: {
    name: string
    category: CategoryType
    id: string
  }[]
}
