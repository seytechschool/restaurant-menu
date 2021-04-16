let result = [];
const menuDisplay = document.querySelector('.section-center');
const filterBtns = document.querySelectorAll('.filter-btn');
let prevActive = filterBtns[0]
const searchIcon = document.querySelector(".fa");
const searchEl = document.querySelector('#search')

window.addEventListener('DOMContentLoaded', function(){
    fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json')
    .then(response => response.json())
    .then(data=> {
        result = data;
        renderData(data)
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
        </div>
    </article>`
    })
    menuData = menuData.join('');
    menuDisplay.innerHTML = menuData;
}
//Show Active menu Issue #6
function changeClass(currentEl){
    let newClass = prevActive.className.split(' ')[0];
    prevActive.className = newClass;
    currentEl.className += ' active'; 
    prevActive = currentEl;
} 

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

//search by item & desc
searchIcon.addEventListener("click", onSearch)

function onSearch(){
    //searching input value
    let val = searchEl.value;
    //creating new array of found elements
    const foundItems = result.filter(item => item.title.toLowerCase().includes(val.toLowerCase()) ||
                                     item.desc.toLowerCase().includes(val.toLowerCase()))
    //building DOM again based on found items
    renderData(foundItems)
    searchEl.value = '';
    
}




