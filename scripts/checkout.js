import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import {  loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import "../data/backend-practice.js";
//import '../data/cart-class.js';

async function loadPage() {
  console.log("load Page");
  try {
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      loadCart(() => {
        resolve("loaded cart");
      });
    });
  } catch (error) {
    console.log("Unexpected Error", error);
  }
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
