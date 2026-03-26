import { changeCurrencyFormat } from '../scripts/utils/money.js'

console.log('Test Suite: Formating currency');
console.log('changing paisa to rupay');
if (changeCurrencyFormat(2095) === '20.95') {
    console.log('Test Passed');
}
else {
    console.log('Test failed');
}

console.log('working with 0');
if (changeCurrencyFormat(0) === '0.00') {
    console.log('Test Passed');
}
else {
    console.log('Test failed');
}

console.log('round off the number');
if (changeCurrencyFormat(2000.4) === '20.00') {
    console.log('Test Passed');
}
else {
    console.log('Test failed');
}