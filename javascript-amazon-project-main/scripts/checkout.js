import { renderOrderSummaryPage } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import '../data/cart-oop.js' // it will run the whole code without importing anything
 
renderPaymentSummary();
renderOrderSummaryPage();