import { cart, calculateCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  console.log("wtf");
  console.log("carty", cart);

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalProductQuantity = calculateCartQuantity();
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.id);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  console.log("Products: ", productPriceCents);
  console.log("Shipping: ", shippingPriceCents);
  const totalBeforetaxCents = productPriceCents + shippingPriceCents;
  console.log("Price Before Tax : ", totalBeforetaxCents);
  const taxCents = totalBeforetaxCents * 0.1;
  console.log("Tax (10%) : ", taxCents);
  const totalCents = taxCents + totalBeforetaxCents;
  console.log("Price After Tax (10%) : ", totalCents);

  const paymentSummaryHTML = `<br>
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalProductQuantity}):
            </div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>

          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:
            </div>
            <div class="payment-summary-money"$>
            ${formatCurrency(totalBeforetaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
