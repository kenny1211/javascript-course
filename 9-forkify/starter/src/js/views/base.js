//object where we select all of our variables from our dom
//so we do not have doc.queryS everywhere
//also if we change our html markup we will have a central location to change our DOM selectors

export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResList: document.querySelector('.results__list')
};
