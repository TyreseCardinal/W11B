document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const product = button.parentElement;
      const name = product.getAttribute('data-name');
      const price = product.getAttribute('data-price');
      const image = product.getAttribute('data-image');

      let cart;
      try {
        cart = JSON.parse(Cookies.get('cart') || '[]');
      } catch (e) {
        console.error('Error parsing cart cookie:', e);
        cart = [];
      }

      const itemIndex = cart.findIndex(item => item.name === name);

      if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      Cookies.set('cart', JSON.stringify(cart), { expires: 7, sameSite: 'Lax' });
      console.log('Cart after adding item:', cart);  // Debugging log
      alert(`${name} added to cart`);
    });
  });
});
