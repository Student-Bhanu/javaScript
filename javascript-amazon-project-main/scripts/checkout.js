import { renderOrderSummaryPage } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-class.js' // it will run the whole code without importing anything

// import '../data/backend-practice.js';
import { loadProductsFromBackend } from '../data/products.js'

loadProductsFromBackend(() => {
    renderPaymentSummary();
    renderOrderSummaryPage();
});
