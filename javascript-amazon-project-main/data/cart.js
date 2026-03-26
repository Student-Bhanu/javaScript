// export keyword se sirf isi variable ko dusre file mein dekh skte he

export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryDateId: '1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryDateId: '2'

    }];
}

function saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
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
            quantity: 1,
            deliveryDateId: '1'
        });
    }

    saveToLocalStorage();
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach(item => {
        if (item.productId !== productId) {
            newCart.push(item);
        }
    });
    cart = newCart;

    saveToLocalStorage();
}

export function updateCartQuantity() {
    let quantity = 0;
    cart.forEach(item => {
        quantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = (0 || quantity);
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    cart.forEach(item => {
        if (item.productId === productId) {
            item.deliveryDateId = deliveryOptionId;
        }
    })
    saveToLocalStorage();
}