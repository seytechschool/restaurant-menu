//START Render Data AIZHAN
let menu = []
const sectionCenter = document.querySelector('.section-center');
const container = document.querySelector('.btn-container');
window.addEventListener('DOMContentLoaded', function () {
  try {
    fetchMenuFromApi().then(menuItems => {
      displayMenuItems(menuItems);
      menu = menuItems;
      displayMenuButtons();
    });
  } catch (error) {
    console.log('Fetch error:', error);
  }
});
async function fetchMenuFromApi() {
  const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json')
  const menuItems = await response.json()
  return menuItems;
}
function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<article class="menu-item">
            <img src=${item.img} class="photo" alt=${item.title}/>
            <div class="item-info">
            </header>
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
            ${item.desc}
            </p>
            </div>
            </article>`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}
 //End Render Data Aizhan

 //Start Render Menu Nazira
function displayMenuButtons() {
  const categories = menu.reduce(function (values, item) {
    if (!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  },
    ['all']);
  const categoryBtns = categories.map(function (category) {
    return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
  })
    .join("");
  container.innerHTML = categoryBtns;
  const filterBtns = document.querySelectorAll('.filter-btn');
 //End Render Menu Nazira


 //Start Active Menu Indi

 //End Active Menu Indi


 //Start Filter Func Jama

 //End Filter Func Jama


 //Start Search Func Nazira

 //End Search Func Nazira


 //Start Search by Features Aizhan

 //End Search by Features Aizhan


 //Start Filter by Price Indi

 //End Filter by price Indi


 //Start Add Card Eliza
 
 //End Add Card Eliza




