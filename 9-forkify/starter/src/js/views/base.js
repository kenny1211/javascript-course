//object where we select all of our variables from our dom
//so we do not have doc.queryS everywhere
//also if we change our html markup we will have a central location to change our DOM selectors

export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResList: document.querySelector('.results__list'),
  searchRes: document.querySelector('.results'),
  searchResPages: document.querySelector('.results__pages')
};

export const elementStrings = {
  loader: 'loader'
};

// function to show loading spinner while ajax requests being processed
// will be used in multiple places in views so base.js is a good place for the function
// argument will be parent element so we can add the loader as a child

export const renderLoader = parent => {
  const loader = `
  <div class="${elementStrings.loader}">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  // have to reselect element bc it is not immediately on page
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
