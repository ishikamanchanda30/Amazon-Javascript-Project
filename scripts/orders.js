import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "../scripts/utils/money.js";

async function loadPage() {
  await loadProductsFetch();

  console.log(orders);
  let orderHTML = ``;

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime).format("D MMMM YYYY");
    orderHTML += `
        <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>`;
  });

  function productsListHTML(order) {
    let productsHTML = ``;
    order.products.forEach((product) => {
      const productDetails = getProduct(product.productId);
      console.log(productDetails);
      productsHTML += `<div class="product-image-container">
          <img src="../${productDetails.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${productDetails.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format(
              "MMMM D"
            )}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${
        productDetails.id
      }">
            <button class="track-package-button button-secondary">
              Track package
            </button>
        </a>
        </div>`;
    });
    return productsHTML;
  }
  document.querySelector(".js-order-grid").innerHTML = orderHTML;
}

loadPage();
