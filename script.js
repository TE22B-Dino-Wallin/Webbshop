document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  let shoppingCart = [];

  const products = [
      { id: 1, name: 'Audi RS6', price: 1499999 },
      { id: 2, name: 'Audi RS7', price: 2999999 },
      { id: 3, name: 'Audi RS3', price: 1199999 },
      { id: 4, name: 'Audi RS e-tron GT', price: 2009999 },
      { id: 5, name: 'Audi RS Q8', price: 2500000 },
      { id: 6, name: 'Audi R8', price: 4000000 },
      { id: 7, name: 'Audi RS4', price: 1400000 },
      { id: 8, name: 'Audi dakar', price: 20000000 },
  ];

  function addToCart(productId) {
      let product = {
          id: productId,
          name: getProductName(productId),
          price: getProductPrice(productId)
      };

      shoppingCart.push(product);
      localStorage.setItem('cart', JSON.stringify(shoppingCart));
      updateCartUI();
  }

  function removeFromCart(productId) {
      const index = shoppingCart.findIndex(product => product.id === productId);
      if (index !== -1) {
          shoppingCart.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(shoppingCart));
          updateCartUI();
      }
  }

  function getProductName(productId) {
      const product = products.find(product => product.id == productId);
      return product ? product.name : '';
  }

  function getProductPrice(productId) {
      const product = products.find(product => product.id == productId);
      return product ? product.price : 0; // Lägg till detta för att returnera priset
  }

  function updateCartUI() {
      cartItemsContainer.innerHTML = '';

      shoppingCart.forEach(product => {
          let itemElement = document.createElement('div');
          itemElement.classList.add('cart-item');

          itemElement.textContent = `${product.name} - ${product.price}Kr`;

          let removeButton = document.createElement('button');
          removeButton.textContent = 'Ta bort';
          removeButton.classList.add('remove-button');
          removeButton.addEventListener('click', function () {
              removeFromCart(product.id);
          });

          itemElement.appendChild(removeButton);
          cartItemsContainer.appendChild(itemElement);
      });

      let totalPrice = shoppingCart.reduce((total, product) => total + product.price, 0);
      totalPriceElement.textContent = `Totalt: ${totalPrice}Kr`;
  }

  let addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach(button => {
      button.addEventListener('click', function (event) {
          let productId = parseInt(event.target.getAttribute('data-product-id'));
          addToCart(productId);
      });
  });

  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  shoppingCart = storedCart;
  updateCartUI();
});
