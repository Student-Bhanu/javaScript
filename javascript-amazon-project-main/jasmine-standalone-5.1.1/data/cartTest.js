import { cart, addToCart, loadFromStorage } from '../../data/cart.js'

describe('Test Suit: Add items in cart', () => {
    it('Add an existing product to the cart', () => {
        // mocking the setItem so it cannot save the data to localStorage
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryDateId: '1'
            }]);
        });

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('Add a new product in the cart', () => {
        // because cart is taking value from localstorage and there it can be some items in it, so we have to change the functionality of getitem function to return empty array so we can check if the code works or not
        spyOn(localStorage, 'getItem').and.callFake(() => {
            // returning the empty array as an JSON object, but we have to change it for cart file also
            return JSON.stringify([]);
        });

        // getItem has changed now getItem will return empty array
        loadFromStorage();

        //we are mocking setItem property because we don't want to change the permanent data in localStorage for testing
        spyOn(localStorage, 'setItem');
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // it will increase the length of cart array if initially it is zero
        expect(cart.length).toEqual(1); //ofcourse this test fail because it is guaranteed that always the length of array initally will be 0

        // checking if setItem is called or not, toHaveBeenCalledTimes(atleast how many times), this will work only if the method is mocked, means we have change it's personality
        // is more than one expect element has been written then test only passes if all expect passes

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});