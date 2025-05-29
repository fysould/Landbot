// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.getElementById('cartButton');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsList = document.getElementById('cartItems');
  const totalPriceEl = document.getElementById('totalPrice');
  const clearBtn = cartSidebar.querySelector('.clear');
  const checkoutBtn = cartSidebar.querySelector('.checkout');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${formatPrice(item.price)}`;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.className = 'remove';
      removeBtn.title = 'Remover item';
      removeBtn.addEventListener('click', () => {
        cart.splice(index, 1);
        saveCart();
        updateCart();
      });

      li.appendChild(removeBtn);
      cartItemsList.appendChild(li);
      total += item.price;
    });
    totalPriceEl.textContent = `Total: ${formatPrice(total)}`;
    saveCart();
  }

  cartButton.addEventListener('click', () => {
    cartSidebar.classList.toggle('open');
  });

  clearBtn.addEventListener('click', () => {
    cart = [];
    saveCart();
    updateCart();
  });

  checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0){
      alert('O carrinho está vazio!');
      return;
    }
    alert('Compra efetuada');
    cart = [];
    saveCart();
    updateCart();
    cartSidebar.classList.remove('open');
  });

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));
      cart.push({ name, price });
      saveCart();
      updateCart();
      alert(`${name} adicionado ao carrinho!`);
    });
  });

  updateCart();
});

