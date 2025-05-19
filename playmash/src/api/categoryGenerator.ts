// Utility for PlayMash frontend to call backend category generator
import type { Category } from '../stores/categories'

export interface CategoryGeneratorParams {
  theme: string
  num_categories: number
  num_options: number
}

export interface CategoryGeneratorResponse {
  theme: string;
  categories: Category[];
}

export async function fetchGeneratedCategories(
  params: CategoryGeneratorParams
): Promise<CategoryGeneratorResponse> {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!response.ok) {
    throw new Error('Failed to generate categories')
  }
  return await response.json()
}
