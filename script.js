const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
});

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Fechar o modal no botão "Fechar"
closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
});

// Adicionar ao carrinho
menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        
        addToCart(name, price);
    }
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }

    updateCartModal();
}

// Atualiza o modal do carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>
            </div>
        `
        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
}

// Remover item do carrinho
cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name");
        
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}


// Finalizar pedido
checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        alert("RESTAURANTE FECHADO NO MOMENTO!");
        return;
    }

    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    // Enviar o pedido para a API do WhatsApp
    const cartItems = cart.map((item) => {
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price} |`
        )
    }).join("");

    const message = encodeURIComponent(cartItems);
    const phone = "SEUNUMERODOWHATSAPP"; // Coloque seu número aqui

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");

    cart = [];
    updateCartModal();
})

// Verificar a hora e manipular o card do horário
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22; // True - restaurante está aberto
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
function lojaAbertaAgora() {
  const agora = new Date();
  const hora = agora.getHours();
  return hora >= 18 && hora <= 23; // aberto 18h–23h
}

function atualizaStatusLoja() {
  const el = document.getElementById('statusLoja');
  if (lojaAbertaAgora()) {
    el.textContent = 'Aberto agora';
    el.className = 'text-sm px-2 py-1 rounded-full bg-emerald-100 text-emerald-700';
  } else {
    el.textContent = 'Fechado no momento';
    el.className = 'text-sm px-2 py-1 rounded-full bg-red-100 text-red-700';
  }
}

const carrinho = [];
const elCarrinho = document.getElementById('carrinho');
const elItens = document.getElementById('itensCarrinho');
const elTotal = document.getElementById('total');
const btnWp = document.getElementById('btnWhatsapp');

function formata(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function abrirCarrinho() { 
  elCarrinho.classList.remove('hidden'); 
  elCarrinho.classList.add('show'); 
}
function fecharCarrinho() { 
  elCarrinho.classList.remove('show'); 
  setTimeout(() => elCarrinho.classList.add('hidden'), 300);
}

document.getElementById('btnAbrirCarrinho').addEventListener('click', abrirCarrinho);
document.getElementById('btnFecharCarrinho').addEventListener('click', fecharCarrinho);
document.getElementById('overlayCarrinho').addEventListener('click', fecharCarrinho);

function render() {
  elItens.innerHTML = '';
  carrinho.forEach((item, i) => {
    const li = document.createElement('div');
    li.className = 'flex items-center justify-between border rounded-xl p-3';
    li.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <p class="text-sm text-neutral-600">
          Qtd:
          <button class="px-2 border rounded" data-i="${i}" data-op="-">-</button>
          <span class="mx-2">${item.qtd}</span>
          <button class="px-2 border rounded" data-i="${i}" data-op="+">+</button>
        </p>
      </div>
      <div class="text-right">
        <p>${formata(item.price)}</p>
        <button class="text-xs text-red-600" data-i="${i}" data-op="x">remover</button>
      </div>
    `;
    elItens.appendChild(li);
  });

  const total = carrinho.reduce((acc, it) => acc + it.price * it.qtd, 0);
  elTotal.textContent = formata(total);

  const linhas = carrinho.map(it => `• ${it.name} x${it.qtd} — ${formata(it.price * it.qtd)}`);
  const cabecalho = lojaAbertaAgora()
    ? 'Olá! Quero fazer um pedido:'
    : 'Olá! Quero deixar um pedido agendado:';
  const msg = encodeURIComponent([cabecalho, '', ...linhas, '', `Total: ${formata(total)}`].join('\n'));
  btnWp.href = `https://wa.me/55SEUNUMERO?text=${msg}`; // coloque seu número
}

document.addEventListener('click', (e) => {
  const add = e.target.closest('.add-to-cart');
  if (add) {
    const name = add.dataset.name;
    const price = Number(add.dataset.price);
    const idx = carrinho.findIndex(i => i.name === name);
    if (idx >= 0) carrinho[idx].qtd += 1;
    else carrinho.push({ name, price, qtd: 1 });
    render();
    abrirCarrinho();
  }

  if (e.target.dataset && e.target.dataset.op) {
    const i = Number(e.target.dataset.i);
    const op = e.target.dataset.op;
    if (op === '+') carrinho[i].qtd += 1;
    if (op === '-' && carrinho[i].qtd > 1) carrinho[i].qtd -= 1;
    if (op === 'x') carrinho.splice(i, 1);
    render();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  atualizaStatusLoja();
  render();
});
