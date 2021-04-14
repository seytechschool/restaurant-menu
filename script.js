const menuDisplay = document.querySelector('.section-center')
const filterBtns = document.querySelectorAll('.filter-btn');
let result = [];
let prevActive = filterBtns[0]

//fetching API
window.addEventListener("DOMContentLoaded",() => {
    fetch("https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json")
    .then(response => response.json())
    .then(data => {
      result = data;
      renderData(data)})
})

//rendering data
function renderData(menuItems){
    let menuData = menuItems.map(item => {
        return `<article class="menu-item">
        <img src=${item.img} class="photo" alt=${item.title}
         />
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class="price">$${item.price}</h4>
          </header>
          <p class="item-text">
           ${item.desc}
          </p>
        </div>
      </article>`
    })
    menuData = menuData.join('')
    menuDisplay.innerHTML = menuData
}


// adding "Active" to a current className
function changeClass(currentEl){  
  let newClass = prevActive.className.split(' ')[0];         
  prevActive.className = newClass; 
  currentEl.className += ' active';  
  prevActive = currentEl;             
} 

// adding filter functionality to the buttons

filterBtns.forEach(btn => {
  btn.addEventListener('click', function(e){
  changeClass(e.currentTarget)
  const category = e.currentTarget.dataset.id;
  const menuCategory = result.filter(resultItem =>{
      if(category === resultItem.category){
        return resultItem;
      }
    })
    if(category === 'all'){
      renderData(result);
    }else{
      renderData(menuCategory);
    }
  })
})

