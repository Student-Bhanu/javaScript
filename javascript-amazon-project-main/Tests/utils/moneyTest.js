import { changeCurrencyFormat } from '../../scripts/utils/money.js'

describe('Test Suite: Formating currency', () => {
    it('changing paisa to rupay', () => {
        expect(changeCurrencyFormat(2095)).toEqual('20.95');
    });

    it('working with 0', () => {
        expect(changeCurrencyFormat(0)).toEqual('0.00');
    });

    it('Round off the number', () => {
        expect(changeCurrencyFormat(2000.4)).toEqual('20.00');
    });
});