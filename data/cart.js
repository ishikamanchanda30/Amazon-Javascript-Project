export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [{
    id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId : '3'
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
      let quantity = Number(quantitySelector.value);
  
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        cart.push({
          id: productId,
          quantity: quantity,
          deliveryOptionId : '1'
        });
      }
      saveToStorage();
 };
  
export function deleteFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
};

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
};
/*
Can do this also
cart.splice(productId,1);
*/

export function updateDeliveryOption(productId,deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {

      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}