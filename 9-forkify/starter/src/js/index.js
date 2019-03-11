// // Global app controller
// // https://www.food2fork.com/api/search
// // 26b58ff329206e7d1c47ae6121fada7c

import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchview';
// // GLOBAL STATE OF APP
// /*
// -Search object
// -Current recipe object
// -Shopping list object
// -Liked recipes
// */

const state = {};

/* 
**
SEARCH CONTROLLER
**
*/

//method for handling user search
const controlSearch = async () => {
  //1. Get Query from view
  const query = searchView.getInput();

  if (query) {
    //2. New search object and add to state
    state.search = new Search(query);

    //3. Prep UI for result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //4. Search Recipes
      await state.search.getResults();

      //5. Render results to UI
      console.log(state.search.result);
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      console.log(err);
      alert('Something went wrong with the search :(');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
  const btn = event.target.closest('.btn-inline');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    console.log(goToPage);

    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/* 
**
RECIPE CONTROLLER
**
*/
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prep UI for changes
    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse Ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      // Calculate Servings and Time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render Recipe
      console.log(state.recipe);
    } catch (err) {
      console.log(err);
      alert('Error processing recipe :(');
    }
  }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
