let menuItems = []
let cart = []
const sectionCenter = document.querySelector('.section-center');
const container = document.querySelector('.btn-container');
const btnCart = document.getElementById('btnCart');
const divCart = document.getElementById('cart');
const closeSpan = document.querySelector(".close");
const clearCartBtn = document.querySelector('.clear-cart');

window.addEventListener('DOMContentLoaded', function () {
   try {
      fetchMenuFromApi().then(menuItemsData => {
         menuItems = menuItemsData;
         displayMenuItems(menuItems);
         displayMenuButtons();
         renderCartTotal();
         setupCart();
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

function setupCart() {
   btnCart.addEventListener('click', function(e) {
      renderCartTable();
   })

   closeSpan.addEventListener('click', function(e) {
      divCart.style.display = 'none';
   })
   
   window.addEventListener('click', function(event) {
      if (event.target == divCart) {
         divCart.style.display = "none";
      }
   })

   clearCartBtn.addEventListener('click', function(e) {
      cart = [];
      renderCartTotal();
   })
}

function renderCartTable() {
   divCart.style.display = 'block';
   const tblCart = document.getElementById("tblCart");
   const tblBody = tblCart.getElementsByTagName("tbody")[0];

   const newTblBody = document.createElement('tbody');
   
   let subTotal = 0;
   cart.forEach(cartItem => {
      let newRow = newTblBody.insertRow();
      let titleCell = newRow.insertCell(0);
      let quantityCell = newRow.insertCell(1);
      let priceCell = newRow.insertCell(2);
      let totalCell = newRow.insertCell(3);

      titleCell.innerHTML = cartItem.menuItem.title;
      quantityCell.innerHTML = cartItem.quantity;
      priceCell.innerHTML = cartItem.menuItem.price;
      totalCell.innerHTML = cartItem.quantity * cartItem.menuItem.price;
      subTotal += cartItem.quantity * cartItem.menuItem.price;
   })

   tblCart.replaceChild(newTblBody, tblBody);

   const subTotalEl = document.getElementById('subTotal');
   subTotalEl.innerHTML = subTotal;
}

function displayMenuItems(menuItems) {
   let displayMenu = menuItems.map(function (item) {
      return `
         <article class="menu-item">
            <img src=${item.img} class="photo" alt=${item.title}/>
            <div class="item-info">
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
            <p class="item-text">
               ${item.desc}
            </p>
            </div>
            <button class="btn-add-cart" data-id=${item.id}>Add to cart</button>
         </article>
            `;
   });
   displayMenu = displayMenu.join("");
   sectionCenter.innerHTML = displayMenu;
   setupAddCartButtons();
}

function setupAddCartButtons() {
   const addToCartButtons = document.querySelectorAll('.btn-add-cart');
   addToCartButtons.forEach( function (btn) {
      btn.addEventListener('click', function(e) {
         let menuItem = menuItems.find(m=> m.id == btn.dataset.id);
         
         let alreadyAddedMenuItem = cart.find(c=>c.menuItem.id == menuItem.id);
         if (alreadyAddedMenuItem) {
            alreadyAddedMenuItem.quantity ++;
         } else {
            cart.push({menuItem: menuItem, quantity: 1});
         }
         renderCartTotal();
      })
   })
}

function renderCartTotal() {
   const cartTotal = document.querySelector('.total-count');
   let totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
   cartTotal.innerText = totalItems;
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
const minPrice = document.querySelector('.min-price');
const maxPrice = document.querySelector('.max-price');
const priceBtn = document.querySelector('.price-btn');
priceBtn.addEventListener('click', function () {
   const min = Number(minPrice.value)
   const max = Number(maxPrice.value)
   const range = menuItems.filter(item => {
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
