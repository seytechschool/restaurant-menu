let result = [];
const menuDisplay = document.querySelector('.section-center');
const containerBtn = document.querySelector('.btn-container');
const searchIcon = document.querySelector(".fa");
const searchEl = document.querySelector('#search');
let totItem = document.querySelector('#totItem')
let totPrice= document.querySelector('#totPrice')
let count = 0;
let price=0;
const price = document.querySelector('#priceSelect');
const alertEl = document.querySelector('#alert')


window.addEventListener('DOMContentLoaded', function(){
    fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json')
    .then(response => response.json())
    .then(data => {
        result = data;
        renderData(data)
        displayMenuBtns()
    })
})

// Render menu Issue #2
function renderData(menuItem){
    let menuData = menuItem.map(item => {
        
        return `<article class="menu-item">
        <img src=${item.img} class="photo" alt=${item.title} />
        <div class="item-info">
            <header>
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">${item.desc}</p>
            <button class = 'addToCart' id=${item.id}>Add to cart</button>

            
        </div>
    </article>`
    })
    menuData = menuData.join('');
    menuDisplay.innerHTML = menuData;
    addToCart();
}

// Displaying menu buttons dynamically
function displayMenuBtns(){
    const categories = result.reduce(function(values, item){
        if(!values.includes(item.category)){
            values.push(item.category)
        }
        return values
    }, ['all'])
    const categoryBtn = categories.map(function(category){
        return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`
    }).join('')
    containerBtn.innerHTML = categoryBtn;
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns[0].className = 'filter-btn active'
    // filter buttons
    filterBtns.forEach(btn => {
    btn.addEventListener('click', function(e){
    const category = e.currentTarget.dataset.id;
    changeClass(e.currentTarget)
    const menuCategory = result.filter(resultItem => {
        if(category === resultItem.category){
            return resultItem
        }
    })
    if(category === 'all'){
        renderData(result)
    } else(renderData(menuCategory))
    })
  });
  let prevActive = filterBtns[0];
  //Show Active menu Issue #6
  function changeClass(currentEl){
    let newClass = prevActive.className.split(' ')[0];
    prevActive.className = newClass;
    currentEl.className += ' active'; 
    prevActive = currentEl;
} 
}

//search by item & desc
searchIcon.addEventListener("click", onSearch)

function onSearch(){
    //searching input value
    let val = searchEl.value.toLowerCase();
    let priceLimit = price.options[price.options.selectedIndex].value
    console.log(priceLimit)
    //creating new array of found elements
    if(val === '' && priceLimit === 'price'){
        setTimeout(function() { 
            alertEl.innerHTML = 'Enter a valid input!' 
        }, 200);
    }
    const foundItems = result.filter(item => {
        if(priceLimit === 'price'){
            return item.title.includes(val) || item.desc.toLowerCase().includes(val)
        } 
        return (item.title.includes(val) || item.desc.toLowerCase().includes(val)) && item.price < priceLimit
    })
    //building DOM again based on found items
    renderData(foundItems)
    searchEl.value = '';
    alertEl.innerHTML = ''
}

// adding functionality

function addToCart(){
  const allAddBtns = document.querySelectorAll('.addToCart');
  allAddBtns.forEach((aBtn) => {
    aBtn.addEventListener('click', (event) => {
      let curnt = event.target;
      count++;
      totItem.innerText=count;
      for(let i=0; i<result.length; i++){
          if(curnt.id == result[i].id){
            price += Number(result[i].price);
          }
      }  
      totPrice.innerText=price.toFixed(2);   
    })
  })
}




