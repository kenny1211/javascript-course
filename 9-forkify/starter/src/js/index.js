// // Global app controller
// // https://www.food2fork.com/api/search
// // 26b58ff329206e7d1c47ae6121fada7c

import Search from './models/Search';
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

    //4. Search Recipes
    await state.search.getResults();

    //5. Render results to UI
    console.log(state.search.result);
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  controlSearch();
});
