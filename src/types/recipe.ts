export interface Ingredient {
  name: string;
  amount: string;
}

export interface Instruction {
  step: number;
  title: string;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  calories?: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tips?: string[];
}

export interface GeneratedRecipe extends Omit<Recipe, 'id' | 'image'> {
  // Generated recipes might not have an ID until saved, and AI doesn't generate images
}
