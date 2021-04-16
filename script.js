// function renderdata

let result = [];
let cart = [];
let filteredResult = [];
const container = document.querySelector('.section-center');

async function loadDataOnLoad() { //initial function which trigged when page is loaded
  filteredResult = result = await getData();
  renderData(result);
  renderCategories();
  renderPriceFilter();
}
async function getData() {
  const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json');

  return await response.json();
}

function renderData(data) {
  container.innerHTML = '';
  for (item of data) {
    container.innerHTML += `<article class="menu-item">
        <img src=${item.img} class="photo" alt=${item.title} />
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">${item.price}</h4>
          </header>
          <p class="item-text">
            ${item.desc}
          </p>
          <button class='add-to-cart' id='${item.id}' onclick='addToCartHandler(window.event)'>Add to cart</button>
        </div>
      </article>`
  }
}
function addToCartHandler(event){
  for(let menuItem of result){
    if(menuItem.id === Number(event.target.id)){  //when clicked on add to cart, pushing item to the cart arr
      cart.push(menuItem);
    }
  }
  renderCartItems();
}


let ShoppingCartitems = document.querySelector('.shopping-cart-items');

function renderCartItems(){
  ShoppingCartitems.innerHTML = '';
  for(let item of cart){
    ShoppingCartitems.innerHTML += `
         <li class="clearfix">
           <img class="cart-img" src='${item.img}'/>
           <span class="item-name">${item.title}</span>
           <span class="item-price">${item.price}</span>
           <span id=${item.id} class="item-delete"><i onclick="removeItem(window.event)" class="fas fa-trash-alt"></i></span>
         </li>`
  }
}
 
function removeItem(event){
  for(let i = 0; i < cart.length; i++){
    if(event.target.parentNode.id == cart[i].id){
      cart.splice(i, 1);
      renderCartItems();
      return;
    }
  }
  
}

// Shopping cart animation
(function(){
  $('.shopping-cart').each(function() {
    var delay = $(this).index() * 50 + 'ms';
    $(this).css({
        '-webkit-transition-delay': delay,
        '-moz-transition-delay': delay,
        '-o-transition-delay': delay,
        'transition-delay': delay
    });
  });
  $('#cart, .shopping-cart').hover(function(e) {
    $(".shopping-cart").stop(true, true).addClass("hovered-active");
  }, function() {
    $(".shopping-cart").stop(true, true).removeClass("hovered-active");
  });  
})();

const buttonContainer = document.querySelector('.btn-container');

function renderCategories() {
  let categories = ['all'];
  result.forEach(menuItem => {
    if (!categories.includes(menuItem.category)) {
      categories.push(menuItem.category);
    }
  })

  for(let element of categories) {//add buttons to html
    buttonContainer.innerHTML += `<button class="filter-btn " type="button" data-id="${element}">${element}</button>`;
  }

  buttonContainer.addEventListener('click', (event) => { //filter functionality. adding eventlistener 
    if (event.target.tagName != 'BUTTON') {
      return;
    }

    let filterBy = event.target.dataset.id
    if (filterBy === 'all') {
      filteredResult = result;
    } else {
      filteredResult = result.filter(menuItem => menuItem.category === filterBy)
    }

    renderData(filteredResult);
    renderPriceFilter();

    let filterBtn = document.querySelectorAll('.filter-btn')
    filterBtn.forEach(button => button.classList.remove('active'))
    event.target.classList.add('active')
  })
}

let search = document.querySelector('#searchBar');
search.addEventListener('keyup',(e) => {
  const searchString= e.target.value.toLowerCase();
  const foundMenu = filteredResult.filter(menu => {
    return(menu.title.toLowerCase().includes(searchString) || menu.desc.toLowerCase().includes(searchString));
  });
  renderData(foundMenu);
});

function renderPriceFilter(){ // render price filter range
  const maxEdge = Math.floor(Math.max(...filteredResult.map(menuItem => menuItem.price)));
  const priceApprox = 10; // to determine bigger value for max than it is in result
  //creating a slider 
  $('#slider').slider({max: maxEdge + priceApprox, range: true, values: [0,maxEdge + priceApprox], change: () => {
    renderFilterData();
  }});
  renderFilterData();
}

const filterPrice = document.querySelector('#filterPrice');
filterPrice.addEventListener('click',()=>{
  const filterRange = getFilterRange();
  let filteredPrice = filteredResult.filter(menuItem =>{
   return  menuItem.price > filterRange.min && menuItem.price < filterRange.max
  })
  renderData(filteredPrice);
 });

 function renderFilterData(){
    const filterRange = getFilterRange();
    $('#range').text(`$${filterRange.min} - $${filterRange.max}`);
 }

 function getFilterRange(){
  let [min, max] = $('#slider').slider('option', 'values');
  return {min, max};
 }




