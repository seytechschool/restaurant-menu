// your code


const section = document.querySelector('.section-center');
let userData;
async function getData() {
	const response = await fetch(
		'https://gist.githubusercontent.com/maratgaip/44060c688fcf5f2b7b3985a6d15fdb1d/raw/e93c3dce0826d08c8c6e779cb5e6d9512c8fdced/restaurant-menu.json'
	);
	userData = await response.json();
    renderMenu(userData);
    
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
						<div class="a-cart"></div>
                        </article>`;
                        
            }
          
}