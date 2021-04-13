// your code
const container = document.querySelector('.section-center');
const buttons = document.querySelector('.btn-container');
const searchBar = document.querySelector('#searchBar');

let menu = [];
const getData = async () => {
    const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json');
    data = await response.json();
    return data;
}
getData().then(data => {
    menu = data;
    renderData(data);
    renderMenu();
});
const renderData = data => {
    container.innerHTML = '';
    for(let item of data){
        container.innerHTML += 
        `<article class="menu-item">
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

const renderMenu = () => {
    let categories = ['all'];
    menu.forEach(menuItem => {
        if(!categories.includes(menuItem.category)){
            categories.push(menuItem.category);
        }
    });
    buttons.addEventListener('click', filterButtonHander);
    categories.forEach(category => {
        buttons.innerHTML += `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`
    })
}

const filterButtonHander = event => {
    if(event.target.tagName !== 'BUTTON') return;

    let filterBy = event.target.dataset.id;

    if(filterBy === 'all'){
        renderData(menu)
    }else{
        renderData(menu.filter(menuItem => menuItem.category === filterBy));
    }

    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-active'));
    event.target.classList.add('filter-active');
}

