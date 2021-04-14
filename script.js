let menuItems = []
const sectionCenter = document.querySelector('.section-center');
const container = document.querySelector('.btn-container');
window.addEventListener('DOMContentLoaded', function () {
   try {
      fetchMenuFromApi().then(menuItemsData => {
         displayMenuItems(menuItemsData);
         menuItems = menuItemsData;
         displayMenuButtons();
      });
   } catch (error) {
      console.log('Fetch error:', error);
   }
});
async function fetchMenuFromApi() {
   const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json')
   const menuItemsData = await response.json()
   return menuItemsData;
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
function displayMenuButtons() {
   const categories = menuItems.reduce(function (values, item) {
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
   filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
         searchInput.value = "";
         removeActiveClassFromButtons(filterBtns);
         btn.className += " active";
         renderMenuItems();
      })
   });
}
function removeActiveClassFromButtons(filterBtns) {
   filterBtns.forEach(function (btn) {
      btn.className = btn.className.replace(" active", "");
   })
}
let minPrice = document.querySelector('.min-price');
let maxPrice = document.querySelector('.max-price');
let priceBtn = document.querySelector('.price-btn');
priceBtn.addEventListener('click', function () {
   let min = Number(minPrice.value)
   let max = Number(maxPrice.value)
   let range = menuItems.filter(item => {
      if (item.price > min && item.price < max) {
         return item
      } else if (item.price > min && max == "") {
         return item
      }
      console.log(menuItems)
   })
   minPrice.value == ''
   maxPrice.value == ''
   displayMenuItems(range)
   console.log(range)
})
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');
const searchOptions = document.getElementById('search-options');

searchInput.addEventListener('input', renderMenuItems);
searchOptions.addEventListener('change', renderMenuItems);

function renderMenuItems() {
   let result = menuItems;
   let val = searchInput.value.trim().toLowerCase();
   if (val) {
      const searchOptions = getSearchOptions();
      if (searchOptions == "byTitle") {
         result = menuItems.filter(dish => dish.title.toLowerCase().includes(val));
      } else if (searchOptions == "byDescription") {
         result = menuItems.filter(dish => dish.desc.toLowerCase().includes(val));
      } else {
         result = menuItems.filter(dish => dish.title.toLowerCase().includes(val) || dish.desc.toLowerCase().includes(val));
      }
   }
   result = filterByCategory(result);
   displayMenuItems(result);
}

function filterByCategory(menuItems) {
   let activeCategory = getActiveCategory();
   if (activeCategory) {
      return menuItems.filter(m => m.category == activeCategory);
   } else {
      return menuItems;
   }
}

function getActiveCategory() {
   const activeBtn = document.querySelector('.filter-btn.active');
   if (activeBtn) {
      const category = activeBtn.dataset.id.toLowerCase().replace("all", "");
      return category;
   }
   return "";
}

function getSearchOptions() {
   return searchOptions.value.trim();
}