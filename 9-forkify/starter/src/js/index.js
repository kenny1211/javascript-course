// Global app controller
// https://www.food2fork.com/api/search
// 26b58ff329206e7d1c47ae6121fada7c

import axios from 'axios';

async function getRecipes(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const key = '26b58ff329206e7d1c47ae6121fada7c';
  try {
    const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    console.log(error);
  }
}

// getRecipes('pizza');
