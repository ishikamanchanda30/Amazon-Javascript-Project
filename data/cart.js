export const cart = [{
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity: 2
}, {
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1000
}];


export function addToCart(productId) {
    let matchingItem;
      cart.forEach((CartItem) => {
        if (productId === CartItem.productId) matchingItem = item;
      });
  
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      let quantity = Number(quantitySelector.value);
  
      if (matchingItem) {
        matchingItem.quantity +=quantity;
      } else {
        cart.push({
          productId: productId,
          quantity: quantity,
        });
      }
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMessage.classList.add("added-to-cart-visible");
      setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      },3000);
  };
