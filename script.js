const container = document.querySelector('.section-center');
const buttons = document.querySelectorAll('.filter-btn');
console.log(buttons[1].dataset.id)
async function renderData(){
    const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json');
    const data = await response.json();
    console.log(data)
    for(let item of data){
        container.innerHTML+=`<article class="menu-item">
        <img src="${item.img}" class="photo" alt="${item.title}" />
        <div class="item-info">
            <header>
            <h4>${item.title}</h4>
            <h4 class="price">${item.price}</h4>
            </header>
            <p class="item-text">${item.desc}</p>
        </div>
        </article>`;
    }
}
renderData()

