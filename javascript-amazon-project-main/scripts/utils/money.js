export function changeCurrencyFormat(price) {
    return (price / 100).toFixed(2);
}

export default changeCurrencyFormat;

// a file can have only one default export