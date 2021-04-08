//function render data
function renderData(arr){
    fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json')
    .then(res => res.json())
    .then(data => {
   for(item of data) {
      const container = document.querySelector('.section-center')
      container.innerHTML+=`<article class="menu-item">
      <img src=${item.img} class="photo" alt=${item.title} />
      <div class="item-info">
        <header>
          <h4>${item.title}</h4>
          <h4 class="price">${item.price}</h4>
        </header>
        <p class="item-text">
          ${item.desc}
        </p>
      </div>
    </article>`
     } })
}
renderData()