class RestaurantMenu {

	constructor(cart) {
		this.menu = [];
		this.categories = ['all'];
		this.cart = cart;
	}
	
	async fetchData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			this.menu = data;
		}
		catch(error) {
			console.error(error);
		}
	}
	 
	setCategories() {
		this.menu.forEach(item => {
			if(!this.categories.includes(item.category)) {
				this.categories.push(item.category);
			}
		})
	}
	
	handleFilter(event) {
		if (event.target.matches('.filter-btn')) {
			document.querySelectorAll('.filter-btn').forEach(button => {
				button.classList.remove('filter-active');
			})
			event.target.classList.add('filter-active');
			let category = event.target.dataset.id;
			if (category === this.categories[0]) {
				this.renderMenu(this.menu);
			}
			else {
				let filteredMenu = this.menu.filter(menuItem => {
					return menuItem.category === category;
				});
				this.renderMenu(filteredMenu);
			}
		}
	}
	
	handleSearch(event) {
		const searchInput = document.querySelector('.search-input');
		const minPriceInput = document.querySelector('.min-price');
		const maxPriceInput = document.querySelector('.max-price');
		if (event.target.matches('.search-btn')) {
			event.preventDefault();
			const keyword = searchInput.value.toLowerCase();
			const minPrice = minPriceInput.value || 0;
			const maxPrice = maxPriceInput.value || Infinity;
			let category = document.querySelector(".filter-active").dataset.id;
			let filteredMenu = [];
			if (category === this.categories[0]) {
				filteredMenu = this.menu.filter(item => {
					return item.title.includes(keyword) && item.price >= minPrice && item.price <= maxPrice;
				})
			}
			else {
				filteredMenu = this.menu.filter(item => {
					return item.category === category && item.title.includes(keyword) && item.price >= minPrice && item.price <= maxPrice;
				})
			}
            this.renderMenu(filteredMenu);
		}
	}

	renderButtons() {
		const buttonsContainer = document.querySelector('.btn-container');
		this.categories.forEach(category => {
			buttonsContainer.innerHTML += `<button class="filter-btn" type="button" data-id="${category}">${category}</button>`;
		})
		buttonsContainer.firstElementChild.classList.add('filter-active');
	}
	
	renderMenu(menu) {
		const menuContainer = document.querySelector('.section-center');
		if (menu.length === 0) {
			menuContainer.innerHTML = `<h3>Nothing found</h3>`;
		}
		else {
			menuContainer.innerHTML = '';
			for (let item of menu) {
				menuContainer.innerHTML +=
				`<article class="menu-item">
				<img src="${item.img}" class="photo" alt="${item.title}" />
				<div class="item-info">
					<header>
					<h4>${item.title}</h4>
					<h4 class="price">${item.price}</h4>
					</header>
					<p class="item-text">${item.desc}</p>
				</div>
				<button class="add-btn" data-item='${JSON.stringify({title: item.title, price: item.price})}'> Add to cart</button>
			</article>`;
			}
		}
	}
	
	async render() {
		const buttonsContainer = document.querySelector('.btn-container');
		const searchButton = document.querySelector('.search-btn');
	
		buttonsContainer.addEventListener('click', this.handleFilter.bind(this));
		searchButton.addEventListener('click', this.handleSearch.bind(this));

        this.setCategories();
		this.renderButtons();
		this.renderMenu(this.menu);
		this.cart.render();
	}
}


class Cart {
	constructor() {
		this.orders = [];
		this.total = 0;
	}
	handLeAddItem(event) {
		if (event.target.matches('.add-btn')) {
			let item = JSON.parse(event.target.dataset.item);
			for (let order of this.orders) {
				if( order.name === item.name) {
					order.quantity++;
					this.updateTotal();
					this.renderOrders();
					return;
				}
			};
			this.orders.push({
				title: item.title,
				totalPrice: item.price,
				quantity: 1,
			});
			this.updateTotal();
			this.renderOrders();
		}
	}
	handleRemoveItem(event) {
		if (event.target.matches('.remove-btn')) {
			let item = event.target.dataset.id;
			delete this.orders.item;
			this.updateTotal();
			this.renderOrders();
		}
	}

	handleDecrementQuantity(item) {
		this.orders.item.quantity--;
		this.orders.item.totalPrice-=item.price;
		this.updateTotal();
		this.renderOrders();
	}

	handleIncrementQuantity(item) {
		this.orders.item.quantity++;
		this.orders.item.totalPrice+=item.price;
		this.updateTotal();
		this.renderOrders();
	}

	updateTotal() {
		console.log(this.orders);
		for (let item of this.orders) {
			this.total = item.totalPrice;
		}
		console.log(this.total);
		const totalPriceH4 = document.querySelector('.total');
		totalPriceH4.innerText = `Total: ${this.total}`;
	}

	handleHide() {
		const sidebar = document.querySelector('.sidebar');
		sidebar.classList.remove('collapsed');
	}

	handleShow() {
		const sidebar = document.querySelector('.sidebar');
		sidebar.classList.add('collapsed');
	}
	renderOrders() {
		const ordersContainer = document.querySelector('.orders-container');
		for (let item of this.orders) {
			ordersContainer.innerHTML = `
			<div class="order">
            	<h4>${item.title}</h4>
             	<div class="qty-control">
                	<button class="decrease-btn"> - </button>
                	<p class="qty">qty: <span>${item.quantity}</span></p>
                	<button class="increase-btn"> + </button>
                	<p class="item-price">$${item.totalPrice}</p>
                <button class="remove-btn" data-id='${JSON.stringify(item)}'>remove</button>
              </div>
          	</div>
			`
		}
	}
	render() {
		const sidebarOpenButton = document.querySelector('.sidebar-open-btn');
		const sidebarCloseButton = document.querySelector('.sidebar-close-btn')
		const removeItemButton = document.querySelector('.remove-btn');
		const addToCartButton = document.querySelector('.add-btn');

		addToCartButton.addEventListener('click', this.handLeAddItem.bind(this));
		sidebarOpenButton.addEventListener('click', this.handleShow.bind(this));
		sidebarCloseButton.addEventListener('click', this.handleHide.bind(this));
		// removeItemButton.addEventListener('click', this.handleRemoveItem.bind(this));
	}
}


document.addEventListener("DOMContentLoaded", async () => {
	let url = "https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json";
	const team5RestaurantMenu = new RestaurantMenu(new Cart());
	await team5RestaurantMenu.fetchData(url);
	team5RestaurantMenu.render();
})