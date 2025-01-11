import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";
import { loadProducts, products } from "../data/products.js";
import "../data/backend-practice.js";
//import '../data/cart-class.js';

loadProducts(
  ()=>{
    renderOrderSummary();
    renderPaymentSummary();
  }
)