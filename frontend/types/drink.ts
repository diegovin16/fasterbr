import type { CategoryType } from './category'

export interface DrinkType {
  id: string
  name: string
  image?: string
  description?: string
  category: CategoryType
  categoryId: string
  createdAt: Date
  updatedAt: Date
}
