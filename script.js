const container = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
//fetched data from API
async function fetchData() {
    const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json');
    const data = await response.json();
    console.log(data)
        //after calling data called rendering functions with our data
    renderData(data)
    renderButtons(data)
}
fetchData()
    // rendered menu items
function renderData(arr) {
    for (let item of arr) {
        container.innerHTML += `<article class="menu-item">
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

// rendered buttons
function renderButtons(arr) {
    // let categories = ['all'];              
    // for(let item of arr){
    //     if(!categories.includes(item.category)){
    //         categories.push(item.category)
    //     }
    //  }
    //reduced data's categories reduced to an array
    const categories = arr.reduce(function(values, item) {
        if (!values.includes(item.category)) {
            values.push(item.category)
        }
        return values
    }, ['all']);

    //['all', 'breakfast', 'lunch', 'shakes', 'dinner']
    //button array created
    const categoryBtns = categories.map(function(category) {
            return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`;
        })
        //button array converted to a string
        .join('');
    //btn string setted as an inner html                    
    btnContainer.innerHTML = categoryBtns;
    const buttons = document.querySelectorAll('.filter-btn')
    let currActive = document.querySelector('.filter-btn');
    currActive.classList.add('active-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            container.innerHTML = '';
            currActive.classList.remove('active-btn');
            currActive = e.target;
            currActive.classList.add('active-btn')
            const id = e.target.dataset.id
            for (let item of arr) {
                if (item.category === id) {
                    renderData([item])
                }
            }
            if (id === 'all') {
                renderData(arr)
            }

        })
    })

}