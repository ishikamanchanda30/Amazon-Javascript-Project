export let cart;

loadFromStorage();
export function loadFromStorage() {
   cart = JSON.parse(localStorage.getItem('cart'));

if(!cart) {
  cart = [{
    id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId : '3'
  }];
}
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}



export function addToCart(productId) {
    let matchingItem;
      cart.forEach((cartItem) => {
        console.log(cartItem.id);
        if (productId === cartItem.id) {
          matchingItem = cartItem;
        }
      });
      let quantity = 1;
      try {
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
         quantity = Number(quantitySelector.value);
      }
      catch (e) {
        quantity = 1;
      }
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        console.log("else");
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
  console.log(cart);

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
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    console.log("load cart");
  
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}