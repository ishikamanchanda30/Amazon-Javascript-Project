function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
      
        loadFromStorage() {
          this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      
          if (!this.cartItems) {
            this.cartItems = [
              {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: "3",
              },
            ];
          }
        },
      
        saveToStorage() {
          localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
      
        addToCart(productId) {
          let matchingItem;
          console.log("ARTITEMS",this.cartItems);
          this.cartItems.forEach((cartItem) => {
            console.log(cartItem.id,"cartitemm");
            if (productId === cartItem.id) {
              matchingItem = cartItem;
            }
          });
          let quantity = 1;
          try {
            const quantitySelector = document.querySelector(
              `.js-quantity-selector-${productId}`
            );
            quantity = Number(quantitySelector.value);
          } catch (e) {
            quantity = 1;
          }
          if (matchingItem) {
            matchingItem.quantity += quantity;
          } else {
            console.log("else");
            this.cartItems.push({
              id: productId,
              quantity: quantity,
              deliveryOptionId: "1",
            });
          }
          this.saveToStorage();
        },
      
        deleteFromCart(productId) {
          const newCart = [];
          cart.forEach((cartItem) => {
            if (cartItem.id !== productId) {
              newCart.push(cartItem);
            }
          });
          this.cartItems = newCart;
          this.saveToStorage();
        },
      
        updateDeliveryOption(productId, deliveryOptionId) {
          let matchingItem;
          this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.id) {
              matchingItem = cartItem;
            }
          });
      
          matchingItem.deliveryOptionId = deliveryOptionId;
          this.saveToStorage();
        },
      }; 
    return cart;
}
const cart = Cart();
const businessCart = Cart();


cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

