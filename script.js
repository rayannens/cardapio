const products = [
    { name: "Cheeseburger Duplo", price: 22.90, img: "assets/hamb-1.png" },
    { name: "Bacon Burger", price: 24.90, img: "assets/hamb-2.png" },
    { name: "Smash Burger", price: 20.90, img: "assets/hamb-3.png" },
    { name: "Frango Crispy", price: 19.90, img: "assets/hamb-4.png" },
    { name: "Chicken Burger", price: 18.90, img: "assets/hamb-5.png" },
    { name: "Salada Burger", price: 21.90, img: "assets/hamb-6.png" },
    { name: "Triplo Cheese", price: 27.90, img: "assets/hamb-7.png" },
    { name: "Veggie Burger", price: 23.90, img: "assets/hamb-8.png" },
    { name: "Coca-Cola Lata", price: 6.50, img: "assets/refri-1.png" },
    { name: "Guaraná Lata", price: 6.00, img: "assets/refri-2.png" },
];

let cart = [];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

products.forEach((p, index) => {
    const item = document.createElement("div");
    item.className = "flex justify-between items-center bg-white p-4 rounded shadow";
    item.innerHTML = `
        <div class="flex items-center space-x-4">
            <img src="${p.img}" alt="${p.name}" class="w-16 h-16 object-cover rounded">
            <div>
                <h3 class="font-bold">${p.name}</h3>
                <p class="text-gray-500">R$ ${p.price.toFixed(2)}</p>
            </div>
        </div>
        <button onclick="addToCart(${index})" class="bg-green-500 text-white px-3 py-1 rounded">+</button>
    `;
    productList.appendChild(item);
});



function addToCart(index) {
    cart.push(products[index]);
    updateCartCount();
}

function updateCartCount() {
    cartCount.textContent = `${cart.length} itens`;
}


document.getElementById("view-cart").addEventListener("click", () => {
    renderCartItems();
    cartModal.classList.remove("hidden");
});

document.getElementById("close-cart").addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

function renderCartItems() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
        total += item.price;
        const el = document.createElement("div");
        el.className = "flex justify-between items-center";
        el.innerHTML = `
            <span>${item.name}</span>
            <button onclick="removeFromCart(${i})" class="text-red-500">Remover</button>
        `;
        cartItems.appendChild(el);
    });
    cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function removeFromCart(i) {
    cart.splice(i, 1);
    renderCartItems();
    updateCartCount();
}
