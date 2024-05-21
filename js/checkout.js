document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const clearCartButton = document.getElementById('clear-cart');

  let cart;
  try {
    cart = JSON.parse(Cookies.get('cart') || '[]');
  } catch (e) {
    console.error('Error parsing cart cookie:', e);
    cart = [];
  }
  console.log('Cart on checkout page load:', cart);  // Debugging log

  function displayCart() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
                  <img src="${item.image}" alt="${item.name}">
                  <h2>${item.name}</h2>
                  <p>$${item.price} x ${item.quantity}</p>
                  <button class="delete-item" data-index="${index}">Delete</button>
              `;
        cartItemsContainer.appendChild(itemElement);
      });

      const deleteButtons = document.querySelectorAll('.delete-item');
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const index = button.getAttribute('data-index');
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
          } else {
            cart.splice(index, 1);
          }
          Cookies.set('cart', JSON.stringify(cart), { expires: 7, sameSite: 'Lax' });
          displayCart();
        });
      });
    }
  }

  clearCartButton.addEventListener('click', () => {
    cart = [];
    Cookies.set('cart', JSON.stringify(cart), { expires: 7, sameSite: 'Lax' });
    displayCart();
  });

  displayCart();
});
