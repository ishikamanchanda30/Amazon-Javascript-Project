import { cart } from "./cart.js";
import { getProduct } from "./products.js";
import { formatCurrency } from "../scripts/utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];


export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

