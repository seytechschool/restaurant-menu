let center=document.querySelector(".section-center")

window.addEventListener("DOMContentLoaded",()=>{
    fetch ('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json')

    .then(response=>response.json())
    .then(data=>renderData(data))
})

function renderData(menuItem){
let menuData=menuItem.map(item=>{
    return ` <article class="menu-item">
    <img src= ${item.img} class="photo" alt=${item.title} />
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">$${item.price}</h4>
      </header>
      <p class="item-text">
        ${item.desc}
      </p>
    </div>
  </article> `
})
menuData=menuData.join("")
center.innerHTML=menuData
}