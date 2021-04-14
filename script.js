const container = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
const foundEl = document.querySelector('#found');
let data = []
let filtered = [];
/* Spinner */
foundEl.innerHTML = 'loading...'
//fetched data from API
async function fetchData() {
    const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json');
    const data = await response.json();
    //after calling data called rendering functions with our data
    foundEl.innerHTML = '';
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

// rendered category buttons
function renderButtons(arr) {

    //reduced data categories reduced to an array
    const categories = arr.reduce(function(values, item) {
        if (!values.includes(item.category)) {
            values.push(item.category);
        }
        return values;
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

     //selecting and saving buttons
     const buttons = btnContainer.querySelectorAll('.filter-btn');
     buttons.forEach(button=>{
         button.addEventListener('click',filterCategories)
     })
     let currActive = document.querySelector('.filter-btn');
     buttons[0].click(); 
     currActive.classList.add('active-btn');
     
     //add event listener to the category buttons
     function filterCategories(e){
         container.innerHTML='';
         currActive.classList.remove('active-btn');
         currActive = e.target;
         let id = e.target.dataset.id;
         e.target.classList.add('active-btn');
         if(id==='all'){
             filtered = arr;
         } else {
             filtered = arr.filter(item=>item.category===id);
         }
         renderData(filtered);
 }

}

//A function for Input search
function filterInput(arr, searchItem){
    let filteredChar = arr.filter(item => {
        return item.title.toLowerCase().includes(searchItem) || item.desc.toLowerCase().includes(searchItem)
    })
    renderData(filteredChar)
}
 

 //Input search
 const inputSearch = document.querySelector('#search');
 inputSearch.addEventListener('keyup', searching)
 function searching(){
     container.innerHTML = '';
     let searchString = inputSearch.value.toLowerCase() || undefined;
     if(filtered){
         filterInput(filtered, searchString)
         if(inputSearch.value === ''){
             renderData(filtered)
         }
     }
 }
 //Price inputs
 const priceContainer = document.querySelector(".price");
 numberS = priceContainer.querySelectorAll("input[type=number]");
 numberS.forEach(number=>{
     number.addEventListener('keyup', filterByPrice)
 function filterByPrice(){
     container.innerHTML='';
     let min = Number(numberS[0].value);
     let max = Number(numberS[1].value);
     if(filtered){
         let filterByPrice = filtered.filter(item => {
             return (item.price < max && item.price > min); 
         })
         renderData(filterByPrice)
         if(numberS[0].value === '' && numberS[1].value===''){
            renderData(filtered)
        }
     }
}
})
