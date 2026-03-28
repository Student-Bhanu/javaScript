class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    };

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryDateId: '1'
        },
        {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryDateId: '2'

        }];
    };

    saveToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchItem;
        this.cartItems.forEach(item => {
            if (productId === item.productId) {
                matchItem = item;
            }
        })
        if (matchItem) {
            matchItem.quantity++;
        } else {
            cart.push({
                productId,
                quantity: 1,
                deliveryDateId: '1'
            });
        }

        this.saveToLocalStorage();
    };

    removeFromCart(productId) {
        let newCart = [];
        this.cartItems.forEach(item => {
            if (item.productId !== productId) {
                newCart.push(item);
            }
        });
        this.cartItems = newCart;

        this.saveToLocalStorage();
    };

    updateCartQuantity() {
        let quantity = 0;
        this.cartItems.forEach(item => {
            quantity += item.quantity;
        });

        document.querySelector('.js-cart-quantity').innerHTML = (0 || quantity);
    };

    updateDeliveryOption(productId, deliveryOptionId) {
        this.cartItems.forEach(item => {
            if (item.productId === productId) {
                item.deliveryDateId = deliveryOptionId;
            }
        })
        this.saveToLocalStorage();
    };
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);