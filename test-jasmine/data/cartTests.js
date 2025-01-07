import {addToCart,calculateCartQuantity,cart,loadFromStorage} from '../../data/cart.js'

describe('Test Suite: addToCart', ()=> {
    it('adds in existing product to the cart', () => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=> {
            return JSON.stringify([{
                id:'aad29d11-ea98-41ee-9285-b916638cac4a',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        console.log(cart);
        loadFromStorage();
        console.log(cart);
        addToCart('aad29d11-ea98-41ee-9285-b916638cac4a');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('aad29d11-ea98-41ee-9285-b916638cac4a');
    } );
});

describe('Test Suite: addToCart', ()=> {
    it('adds a new product to the cart', () => {
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=> {
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('aad29d11-ea98-41ee-9285-b916638cac4a');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('aad29d11-ea98-41ee-9285-b916638cac4a');
    });
});