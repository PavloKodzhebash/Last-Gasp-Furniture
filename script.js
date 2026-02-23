document.addEventListener("DOMContentLoaded", function () {

  const items = ["chair", "recliner", "table", "umbrella"];
  const prices = [25.50, 37.75, 49.95, 24.89];
  const taxRate = 0.15;

  const statesZone1 = ["WA"];
  const statesZone2 = ["OR"];
  const statesZone3 = ["CA"];
  const statesZone4 = ["NV"];
  const statesZone5 = ["TX"];
  const statesZone6 = ["HI", "AK"];

  document.getElementById("purchaseBtn").addEventListener("click", makePurchase);

  function makePurchase() {

    let purchasedItems = [];
    let purchasedQuantities = [];
    let continueShopping = true;

    while (continueShopping) {

      let itemInput = prompt("What item would you like to buy today: Chair, Recliner, Table or Umbrella?");
      if (!itemInput) return;

      itemInput = itemInput.toLowerCase();

      if (!items.includes(itemInput)) {
        alert("Invalid item.");
        continue;
      }

      let quantityInput = prompt("How many " + itemInput + " would you like to buy?");
      if (!quantityInput) return;

      let quantity = parseInt(quantityInput);

      if (isNaN(quantity) || quantity <= 0) {
        alert("Invalid quantity.");
        continue;
      }

      purchasedItems.push(itemInput);
      purchasedQuantities.push(quantity);

      let more = prompt("Continue shopping? y/n");
      if (!more) return;

      if (more.toLowerCase() !== "y") {
        continueShopping = false;
      }
    }

    let state = prompt("Enter two letter state abbreviation");
    if (!state) return;

    state = state.toUpperCase();

    if (state.length !== 2) {
      alert("Invalid state.");
      return;
    }

    let subtotal = 0;

    for (let i = 0; i < purchasedItems.length; i++) {
      let index = items.indexOf(purchasedItems[i]);
      subtotal += prices[index] * purchasedQuantities[i];
    }

    let shipping = 0;

    switch (true) {
      case statesZone1.includes(state):
        shipping = 0;
        break;
      case statesZone2.includes(state):
        shipping = 20;
        break;
      case statesZone3.includes(state):
        shipping = 30;
        break;
      case statesZone4.includes(state):
        shipping = 35;
        break;
      case statesZone5.includes(state):
        shipping = 45;
        break;
      case statesZone6.includes(state):
        shipping = 50;
        break;
      default:
        alert("Invalid state.");
        return;
    }

    shipping = subtotal > 100 ? 0 : shipping;

    let tax = subtotal * taxRate;
    let total = subtotal + tax + shipping;

    subtotal = subtotal.toFixed(2);
    tax = tax.toFixed(2);
    shipping = shipping.toFixed(2);
    total = total.toFixed(2);

    displayInvoice(purchasedItems, purchasedQuantities, state, subtotal, tax, shipping, total);
  }

  function displayInvoice(itemsArr, qtyArr, state, subtotal, tax, shipping, total) {

    let invoiceDiv = document.getElementById("invoice");
    let output = "<h2>Invoice</h2>";

    output += "<ul>";

    for (let i = 0; i < itemsArr.length; i++) {
      output += "<li>" + itemsArr[i] + " x " + qtyArr[i] + "</li>";
    }

    output += "</ul>";

    output += "<hr>";

    output += "<p>State: " + state + "</p>";
    output += "<p>Subtotal: $" + subtotal + "</p>";
    output += "<p>Tax (15%): $" + tax + "</p>";
    output += "<p>Shipping: $" + shipping + "</p>";
    output += "<p><strong>Total: $" + total + "</strong></p>";

    output += '<button class="shop-again" onclick="location.reload()">Shop Again</button>';

    invoiceDiv.innerHTML = output;
  }

});
