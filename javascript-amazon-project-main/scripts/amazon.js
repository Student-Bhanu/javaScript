import { cart, addToCart, updateCartQuantity } from '../data/cart.js' // .. is for exiting from current folder, / for opening in folder, {} brackets ke ander variable ka name likhna he jisko import krna hai

import { products } from '../data/products.js'
import { changeCurrencyFormat } from './utils/money.js'
updateCartQuantity();


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
          <img class="product-rating-stars" src="${product.getUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
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
    addToCart(productId);

    updateCartQuantity();
  })
});