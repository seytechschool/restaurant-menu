// function renderdata

let result = [];
const container = document.querySelector('.section-center');

async function loadDataOnLoad() {
  result = await getData();
  renderData(result);
  renderMenu();
  renderData(foundMenu);
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
        </div>
      </article>`
  }
}

const buttonContainer = document.querySelector('.btn-container');



function renderMenu() {
  let categories = ['all'];
  result.forEach(menuItem => {
    if (!categories.includes(menuItem.category)) {
      categories.push(menuItem.category);
    }
  })
  for (let element of categories) {
    buttonContainer.innerHTML += `<button class="filter-btn " type="button" data-id="${element}">${element}</button>`;
  }
  buttonContainer.addEventListener('click', (event) => {
    if (event.target.tagName != 'BUTTON') {
      return
    }

    let filterBy = event.target.dataset.id
    if (filterBy === 'all') {
      renderData(result)

    } else {
      let filteredResult = result.filter(menuItem => menuItem.category === filterBy)
      console.log(filteredResult)
      renderData(filteredResult)
    }
    let filterBtn = document.querySelectorAll('.filter-btn')
    filterBtn.forEach(button => button.classList.remove('active'))
    event.target.classList.add('active')
  })

}


let search = document.querySelector('#searchBar');
search.addEventListener('keyup',(e)=>{
  const searchString= e.target.value.toLowerCase();
  const foundMenu = result.filter(menu =>{
    return(
    menu.title.toLowerCase().includes(searchString) ||
    menu.desc.toLowerCase().includes(searchString)
    );
 });
  renderData(foundMenu);

});




