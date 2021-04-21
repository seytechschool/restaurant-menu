// your code


const section = document.querySelector('.section-center');
let currentActiveClass = document.querySelector('.btn-container').children[0];
currentActiveClass.classList.add('active');
let quantity = document.querySelector('.quantity');
let totalPrice = document.querySelector('.total');
let deleteItem = document.querySelectorAll('.fa-trash-restore-alt');
let userData;
let data;
async function getData() {
	const response = await fetch(
		'https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json'
	);
	userData = await response.json();
    renderMenu(userData);
    addToCart()
}
getData();

// render data
function renderMenu(arr) {
	section.innerHTML = '';
			for (let i = 0; i < arr.length; i++) {
				section.innerHTML += `<article id="${arr[i].id}"class="menu-item" category="${arr[i].category}" >
                        <img src='${arr[i].img}' class="photo" alt="${arr[i].title}"/>
                        <div class="item-info">
                            <header>
                            <h4>${arr[i].title}</h4>
                            <h4 class="price">$${arr[i].price}</h4>
                            </header>
							<p class="item-text">${arr[i].desc}</p>
						</div>
						<div class="a-cart"><button id="${arr[i].id}"class="cart">Add To Cart</button></div>
                        </article>`;
                        
            }
          
}

// Show Active menu Issue #6
// Filter functionality Issue #3
const all = document.querySelectorAll('.filter-btn');
for (let i = 0; i < all.length; i++) {
	all[i].addEventListener('click', renderCurrentCategory);
}
function renderCurrentCategory(e) {
    let currentEvent = e.target;
    currentActiveClass.classList.remove('active');
    currentActiveClass = e.target;
    currentActiveClass.className = 'filter-btn active';

    let breakfast = userData.filter((item) => {
		return item.category == 'breakfast';
	});

	let lunch = userData.filter((item) => {
		return item.category == 'lunch';
	});

	let shakes = userData.filter((item) => {
		return item.category == 'shakes';
	});

	let dinner = userData.filter((item) => {
		return item.category == 'dinner';
	});

	// console.log(currentEvent.innerHTML);
	// console.log(currentEvent.innerHTML.trim());
	switch (currentEvent.innerHTML.trim()) {
		case 'all':
			renderMenu(userData);
			addToCart()
			break;
		case 'breakfast':
			data = breakfast;
			// console.log(breakfast)
			renderMenu(breakfast);
			addToCart();
			break;
		case 'lunch':
			data = lunch;
			renderMenu(lunch);
			addToCart();
			break;
		case 'shakes':
			data = shakes;
			renderMenu(shakes);
			addToCart();
			break;
		case 'dinner':
			data = dinner;
			renderMenu(dinner);
			addToCart();
			break;
	}
}
//Search Functionality issue #4:
const search = document.querySelector('.search');
search.addEventListener('keyup', function(){
    let searchValue = search.value;
    let newItem = userData.filter(
    (item) => item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchValue.toLowerCase())
);
    //console.log(newItem)
	renderMenu(newItem)
	addToCart()
})
//Search Functionality issue #4:
let minprice = document.querySelector('.min');
let maxprice = document.querySelector('.max');
const submitPrice = document.querySelector('.minmaxxbtn')

minprice.addEventListener("click",deletedPrice)
function deletedPrice() {
	maxprice.value = ''
	minprice.value = ''
}

submitPrice.addEventListener('click', function(){
    let maxpr = Number(maxprice.value)
    let minpr = Number(minprice.value)
    const newArr = userData.filter((item) => {
        if(item.price < maxpr && item.price > minpr){
            return item 
        }else if (item.price>minpr && maxpr == ''){
return item 
        }
    })
	renderMenu(newArr)
	addToCart()
})

// Add to card feature. Issue #9
const incartList = document.querySelector('.inCart');
var total = 0;
let count = 0;
function addToCart() {
	const addCartBtns = document.querySelectorAll('.cart');
	console.log(addCartBtns);
	addCartBtns.forEach((addbutton) => {
		addbutton.addEventListener('click', (event) => {
			event.preventDefault();
			let current = event.target;
			let currentId = current.id;
			quantity.innerHTML = `${(count += 1)}`;
			let n = userData.filter((el) => {
				if (el.id == currentId) {
					return true;
				}
			});
			// console.log(n[0].price);/
			incartList.innerHTML += `<li class="in-cart">${n[0].title} ${n[0].price}<i class="fas fa-trash-restore-alt" ></i></li>`;
			total += Number(n[0].price);
			totalPrice.innerHTML = `Total Price : ${total.toFixed(2)}`;
			const submit = document.querySelector('.total');
			quantity.style.display = 'unset';
			submit.style.display = 'unset';
			dltItem();
		});
	});
}
// deleted item from the cart
function dltItem() {
	let deleteItem = document.querySelectorAll('.fa-trash-restore-alt');
	deleteItem.forEach((el) => el.addEventListener('click', dltItem));
	function dltItem(e) {
		e.preventDefault();
		var c = this.parentNode;
		var price = c.innerText.split(' ');
		price = Number(price[price.length - 1]);
		total -= price;
		quantity.innerHTML = `${--count}`;
		totalPrice.innerHTML = `Total Price : ${total.toFixed(2)}`;
		c.innerText = '';
		if (quantity.innerHTML == 0) {
			totalPrice.style.display = 'none';
			quantity.style.display = 'none';
		}
	}
}
=======
const container = document.querySelector('.section-center');
const btnContainer = document.querySelector('.btn-container');
const foundEl = document.querySelector('#found');
const total = document.querySelector('.total');
let data = [];
let filtered = [];
/* Spinner */
foundEl.innerHTML = 'loading...'
//fetched data from API
async function fetchData() {
    const response = await fetch('https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json');
     data = await response.json();
        //after calling data called rendering functions with our data
        foundEl.innerHTML = '';
    renderData(data);
    renderButtons(data);
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
            <button class="add-cart filter-btn" data-id="${item.id}">Add To Cart</button>
        </div>
        </article>`;
    }
    // adding to the cart 
    const cartBtns = document.querySelectorAll('.add-cart')
    cartBtns.forEach(btn=>{
        btn.addEventListener('click', addToCart)
    })
}
let count = 0;
function addToCart(e){
    let id = e.target.dataset.id;
    for(let item of data){
        if(id===item.id.toString()){
            count += item.price;    
        }
    }
    total.innerHTML=count.toFixed(2);
}
// rendered category buttons
function renderButtons(arr) {
    //creating categories buttons
    const categories = arr.reduce(function(values, item){
        if(!values.includes(item.category)){
            values.push(item.category)
        }
        return values
    },['all']);
    const categoryBtns = categories.map(function(category){
        return `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`;
    }).join('');
    btnContainer.innerHTML = categoryBtns;
    //selecting and saving buttons
    const buttons = btnContainer.querySelectorAll('.filter-btn');
    buttons.forEach(button=>{
        button.addEventListener('click',filterCategories)
    })
    let currActive = document.querySelector('.filter-btn');
    buttons[0].click(); 
    currActive.classList.add('active-btn');
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
};
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
