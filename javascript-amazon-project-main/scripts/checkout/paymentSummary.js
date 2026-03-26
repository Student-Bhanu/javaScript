import { cart } from '../../data/cart.js'
import { products } from '../../data/products.js'
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { changeCurrencyFormat } from '../utils/money.js';

export function renderPaymentSummary() {
    const itemDetails = {
        totalItems: 0,
        totalPrice: 0,
        shippingCharges: 0,
        totalTax: 0

    };
    cart.forEach(item => {
        itemDetails.totalItems += item.quantity;
        products.forEach(productItem => {
            if (productItem.id === item.productId) {
                itemDetails.totalPrice += item.quantity * productItem.pricePaisa;
            }
        })

        deliveryOptions.forEach(deliveryItem => {
            if (deliveryItem.id === item.deliveryDateId) {
                itemDetails.shippingCharges += deliveryItem.pricePaisa;
            }
        });

        itemDetails.totalTax += (itemDetails.totalPrice + itemDetails.shippingCharges) * 0.1;

    });

    const paymentPage = document.querySelector('.js-payment-summary');
    paymentPage.innerHTML = `<div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${itemDetails.totalItems}):</div>
          <div class="payment-summary-money">$${changeCurrencyFormat(itemDetails.totalPrice)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${changeCurrencyFormat(itemDetails.shippingCharges)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${changeCurrencyFormat(itemDetails.totalPrice + itemDetails.shippingCharges)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">${changeCurrencyFormat(itemDetails.totalTax)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${changeCurrencyFormat(itemDetails.totalPrice + itemDetails.totalTax + itemDetails.shippingCharges)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`;
}