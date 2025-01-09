// import { renderOrderSummary } from "../../scripts/Checkout/orderSummary.js";
// import {
//   addToCart,
//   calculateCartQuantity,
//   cart,
//   loadFromStorage,
// } from "../../data/cart.js";

// describe("Test Suite : renderOrderSUmmary", () => {
//   it("displayed the cart", () => {
//     document.querySelector(".js-test-container").innerHTML = `
//     <div class="js-order-summary> </div>
//     `;
//     spyOn(localStorage, "setItem");
//     spyOn(localStorage, "getItem").and.callFake(() => {
//       return JSON.stringify([
//         {
//           id: "aad29d11-ea98-41ee-9285-b916638cac4a",
//           quantity: 1,
//           deliveryOptionId: "2",
//         },
//         {
//           id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//           quantity: 4,
//           deliveryOptionId: "3",
//         },
//       ]);
//     });
//     console.log(cart);
//     loadFromStorage();
//     renderOrderSummary();
//   });
// });
