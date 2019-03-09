import { elements } from './base';

// get input value of search field for query
export const getInput = () => elements.searchInput.value;

// empty search field
export const clearInput = () => {
  elements.searchInput.value = '';
};

// function to be used to render results to page of query search
// this will set up the html for our page for one recipe
const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${recipe.title}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;

  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//use render recipe function for each result
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};

//empty search results list - happens after each query
export const clearResults = () => {
  elements.searchResList.innerHtml = '';
};
