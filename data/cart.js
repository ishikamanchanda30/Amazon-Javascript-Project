export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [{
    id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      console.log(quantitySelector);
      let quantity = Number(quantitySelector.value);
  
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          id: productId,
          quantity: quantity,
        });
      }
      console.log("cart loading from cart.js " , cart);
      saveToStorage();
 };
  

export function deleteFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) 
      newCart.push(cartItem);
  });
  cart = newCart;
  
  saveToStorage();
};
console.log("cart loading from cart.js " , cart);

/*
Can do this also
cart.splice(productId,1);
*/