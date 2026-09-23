const fs = require('fs');

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Pasta', 'Chicken', 'Vegetarian', 'Vegan', 'Quick meals', 'Healthy'];
const tagsPool = ['Quick', 'Easy', 'Healthy', 'Vegan', 'High Protein', 'Keto', 'Italian', 'Asian', 'Comfort Food', 'Spicy'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const ingredientsPool = [
  { name: 'Chicken Breast', amount: '200g' },
  { name: 'Rice', amount: '1 cup' },
  { name: 'Pasta', amount: '200g' },
  { name: 'Olive Oil', amount: '2 tbsp' },
  { name: 'Garlic', amount: '2 cloves' },
  { name: 'Onion', amount: '1 medium' },
  { name: 'Tomato', amount: '2 medium' },
  { name: 'Eggs', amount: '2 large' },
  { name: 'Milk', amount: '1/2 cup' },
  { name: 'Flour', amount: '1 cup' },
  { name: 'Sugar', amount: '2 tbsp' },
  { name: 'Salt', amount: '1 tsp' },
  { name: 'Black Pepper', amount: '1/2 tsp' },
];

const generateRecipes = (count) => {
  const recipes = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    const difficulty = difficulties[i % difficulties.length];
    const numIngredients = 4 + (i % 5);
    const recipeIngredients = [];
    for (let j = 0; j < numIngredients; j++) {
      recipeIngredients.push(ingredientsPool[(i + j) % ingredientsPool.length]);
    }
    
    recipes.push({
      id: `recipe-${i}`,
      title: `${category} Delight ${i}`,
      description: `A delicious and easy to make ${category.toLowerCase()} dish perfectly balanced in flavors.`,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      category: category,
      tags: [tagsPool[i % tagsPool.length], tagsPool[(i + 1) % tagsPool.length]],
      prepTime: 10 + (i % 20),
      cookTime: 15 + (i % 30),
      servings: 2 + (i % 3),
      difficulty: difficulty,
      calories: 300 + (i % 400),
      ingredients: recipeIngredients,
      instructions: [
        { step: 1, title: 'Preparation', description: 'Gather all ingredients and prepare your workstation.' },
        { step: 2, title: 'Cooking', description: 'Combine ingredients and cook according to the heat levels required.' },
        { step: 3, title: 'Serving', description: 'Garnish appropriately and serve warm.' }
      ],
      tips: ['Adjust seasoning according to taste.', 'Can be stored in the fridge for up to 2 days.']
    });
  }
  return recipes;
};

const data = generateRecipes(105);
fs.writeFileSync('./src/data/recipes.json', JSON.stringify(data, null, 2));
console.log('Successfully generated 105 recipes!');
