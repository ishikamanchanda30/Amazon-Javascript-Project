import { orders } from "../data/orders.js";
import { loadProductsFetch, getProduct } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const url = new URL(window.location.href);
console.log(url.searchParams.get("orderId"));
console.log(url.searchParams.get("productId"));

async function renderLoadPage() {
  let trackingHTML = ``;
  console.log("orders", orders)
  await loadProductsFetch();
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  let matchingOrder;
  let matchingProduct
  orders.forEach((order)=> {
    if (order.id === orderId) {
        matchingOrder = order;
        order.products.forEach((product)=> {
            console.log("inside for each products", product);
            if (product.productId === productId) {
                matchingProduct = product;
                console.log("matching prodyct", matchingProduct);
            }
        })
    }
    console.log("matching order",matchingOrder);

  })
  const product = getProduct(productId);
  trackingHTML = `      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productId.estimatedDeliveryTime).format("dddd D MMMM")}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProduct.quantity}
        </div>

        <img class="product-image" src=${product.image}>

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`;

  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
  console.log(trackingHTML);
}

renderLoadPage();
