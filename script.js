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
   filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
         removeActiveClassFromButtons(filterBtns);
         btn.className += " active";
         filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
               const category = e.currentTarget.dataset.id;
               const menuCategory = menu.filter(function (menuItem) {
                  if (menuItem.category === category) {
                     return menuItem;
                  }
               });
               if (category === 'all') {
                  displayMenuItems(menu)
               } else {
                  displayMenuItems(menuCategory);
               }
            });
         });
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
   let range = menu.filter(item => {
      if (item.price > min && item.price < max) {
         return item
      } else if (item.price > min && max == "") {
         return item
      }
      console.log(menu)
   })
   minPrice.value == ''
   maxPrice.value == ''
   displayMenuItems(range)
   console.log(range)
})
let searchBtn = document.querySelector('#search-btn');
let inputValue = document.querySelector('#search-input');

inputValue.addEventListener('keyup', searchFilt)
function searchFilt(e) {

   let val = inputValue.value
   let searchByName = menu.filter((item) => {
      item.title.toLowerCase().includes(val.toLowerCase()) ||
         item.desc.toLowerCase().includes(val.toLowerCase());
      console.log(inputValue.value)
 });
   displayMenuItems(searchByName)
}

