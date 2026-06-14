const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const addButtons = document.querySelectorAll(".add-to-cart");
const clearCartButton = document.getElementById("clear-cart");
const cartStorageKey = "fern-flame-cart";

function readCart() {
  try {
    const raw = window.localStorage.getItem(cartStorageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(nextCart) {
  window.localStorage.setItem(cartStorageKey, JSON.stringify(nextCart));
}

let cart = readCart();

function renderCart() {
  if (!cartItems || !cartCount || !cartTotal) {
    return;
  }

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-cart";
    empty.textContent = "Your cart is empty. Add a few treasures from the sales section.";
    cartItems.appendChild(empty);
    cartCount.textContent = "0";
    cartTotal.textContent = "$0";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  cart.forEach((item) => {
    const row = document.createElement("li");
    row.innerHTML = `
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-meta">$${item.price}</span>
    `;
    cartItems.appendChild(row);
  });

  cartCount.textContent = String(cart.length);
  cartTotal.textContent = `$${total}`;
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cart.push({
      name: button.dataset.item,
      price: Number(button.dataset.price),
    });

    saveCart(cart);
    renderCart();
  });
});

if (clearCartButton) {
  clearCartButton.addEventListener("click", () => {
    cart = [];
    saveCart(cart);
    renderCart();
  });
}

renderCart();
