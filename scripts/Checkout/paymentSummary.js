import { cart, calculateCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalProductQuantity = calculateCartQuantity();
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforetaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforetaxCents * 0.1;
  const totalCents = taxCents + totalBeforetaxCents;

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

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
        `;
        console.log(paymentSummaryHTML);
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document.querySelector(".js-place-order")
    .addEventListener("click", async () => {
      try {
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
        console.log(response);

        const order = await response.json();
        addOrder(order);
        console.log(order);
      } catch (error) {
        console.log("Unexpected Error, try Again Later");
      }
      window.location.href = "orders.html";
    });
}
