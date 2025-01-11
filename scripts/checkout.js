import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import "../data/backend-practice.js";
//import '../data/cart-class.js';

Promise.all([

  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve("loaded cart");
    });
  }),
  
]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
