// Save the data
let products_grid = '';

// Dumping data on webPage
products.forEach(product => {
  products_grid += `<div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${(product.pricePaisa / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected product="1">1</option>
            <option product="2">2</option>
            <option product="3">3</option>
            <option product="4">4</option>
            <option product="5">5</option>
            <option product="6">6</option>
            <option product="7">7</option>
            <option product="8">8</option>
            <option product="9">9</option>
            <option product="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;
});

const products_grid_element = document.querySelector('.js-products-grid');
products_grid_element.innerHTML = products_grid;

const listAddToCart = document.querySelectorAll('.js-add-to-cart');
listAddToCart.forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    let matchItem;
    cart.forEach(item => {
      if (productId === item.productId) {
        matchItem = item;
      }
    })
    if (matchItem) {
      matchItem.quantity++;
    } else {
      cart.push({
        productId,
        quantity: 1
      });
    }
    let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  })
});