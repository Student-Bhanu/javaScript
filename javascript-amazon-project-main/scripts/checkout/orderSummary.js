import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js'
import { products } from '../../data/products.js'
import { changeCurrencyFormat } from '../utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js' // default export, importing library from internet like this is called ESM library

import { deliveryOptions } from '../../data/deliveryOptions.js'

export function showCartItem() {
    let completePageHTML = ``;
    cart.forEach((cartItem, cartIDX) => {
        let matchItem;
        products.forEach((productItem) => {
            if (productItem.id === cartItem.productId) {
                matchItem = productItem;
            }
        });

        const deliveryID = cartItem.deliveryDateId;
        let deliveryDateString;
        deliveryOptions.forEach(items => {
            if (items.id === deliveryID) {
                const currentDate = dayjs();
                const deliveryDate = currentDate.add(items.deliveryDate, 'days');
                deliveryDateString = deliveryDate.format('dddd, MMMM D');
            }
        });
        let HTMLtemplate = `<div class="cart-item-container">
    <div class="delivery-date">
        Delivery date: ${deliveryDateString}
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchItem.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchItem.name}
        </div>
        <div class="product-price">
            $${changeCurrencyFormat(matchItem.pricePaisa)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
            Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchItem.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(cartIDX, cartItem)}
        </div>
    </div>
    </div>`;

        completePageHTML += HTMLtemplate;
    });
    document.querySelector('.js-order-summary').innerHTML = completePageHTML;

    document.querySelectorAll('.js-delete-link').forEach(deleteLink => {
        deleteLink.addEventListener('click', () => {
            const productId = deleteLink.dataset.productId;
            removeFromCart(productId);
            showCartItem();
        })
    });

    document.querySelectorAll('.js-delivery-option').forEach(option => {
        option.addEventListener('click', () => {
            console.log(option.dataset);
            const { productId, deliveryOptionId } = option.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            showCartItem();
        });
    });
}

function deliveryOptionsHTML(cartIDX, cartItem) {
    let HTMLString = '';
    deliveryOptions.forEach(deliveryItems => {
        const currentDate = dayjs();
        const deliveryDate = currentDate.add(deliveryItems.deliveryDate, 'days');
        const stringDate = deliveryDate.format('dddd, MMMM D');
        const deliveryPrice = changeCurrencyFormat(deliveryItems.pricePaisa);
        const isChecked = (deliveryItems.id === cartItem.deliveryDateId) ? 1 : 0;

        HTMLString += `
        <div data-product-id=${cartItem.productId} data-delivery-option-id=${deliveryItems.id} class="delivery-option js-delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${cartIDX + 1}">
            <div>
            <div class="delivery-option-date">
                ${stringDate}
            </div>
            <div class="delivery-option-price">
                ${deliveryPrice == 0 ? "Free" : '$' + deliveryPrice + ' - '} Shipping
            </div>
            </div>
        </div>`
    });
    return HTMLString;
}

showCartItem();


