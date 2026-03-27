import { renderOrderSummaryPage } from '../../scripts/checkout/orderSummary.js'
import { loadFromStorage, cart } from '../../data/cart.js'

describe('Test Suit: Render the order summary page', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    // hooks is the code which is sharable between tests
    // beforeEach runs before every tests
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        document.querySelector('.js-test-container')
            .innerHTML = `<div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>`;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryDateId: '1'
            },
            {
                productId: productId2,
                quantity: 2,
                deliveryDateId: '2'

            }]);
        });
        loadFromStorage();
        renderOrderSummaryPage();
    });

    afterEach(() => {
        document.querySelector('.js-test-container')
            .innerHTML = '';
    });

    it('Displays the cart', () => {
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);

        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 1');

        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 2');

    });

    it('Removes a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);

        expect(
            document.querySelector(`.js-delete-link-${productId1}`)
        ).toEqual(null);

        expect(
            document.querySelector(`.js-delete-link-${productId2}`)
        ).not.toEqual(null);

        expect(
            cart.length
        ).toEqual(1);

        expect(
            cart[0].productId
        ).toEqual(productId2);

    });
});