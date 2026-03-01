
// Catalog Arrays 
const items = ["Chair", "Recliner", "Table", "Umbrella"];
const prices = [25.50, 37.75, 49.95, 24.89];

// Purchased Arrays 
let purchasedItems = [];
let purchasedQty = [];

// State Arrays by Zone
const zone1 = ["ME","NJ","VT","NH","NY","CT","RI","MA"];
const zone2 = ["PA","MD","DE","VA","NC","SC","WV","OH","KY","IN"];
const zone3 = ["MN","WI","IL","LA","KS","MO","TN","GA","AL","GL"];
const zone4 = ["ND","SD","NE","CO","OK","AR","MS","LA","CA"];
const zone5 = ["WA","MT","OR","ID","WY","UT","NV","AZ","NM","TX"];
const zone6 = ["AK","HI"];

const taxRate = 0.15;

document.getElementById("purchaseBtn").addEventListener("click", startPurchase);

function startPurchase() {
    purchasedItems = [];
    purchasedQty = [];
    takeOrder();
}

function takeOrder() {

    let itemInput = prompt("What item would you like to buy today: Chair, Recliner, Table or Umbrella?");
    if (itemInput === null) return;

    itemInput = itemInput.trim().toLowerCase();

    let index = items.findIndex(i => i.toLowerCase() === itemInput);

    if (index === -1) {
        alert("Invalid item entered.");
        return takeOrder();
    }

    let qty = prompt("How many " + items[index] + " would you like to buy?");
    if (qty === null) return;

    qty = parseInt(qty);

    if (isNaN(qty) || qty <= 0) {
        alert("Invalid quantity entered.");
        return takeOrder();
    }

    purchasedItems.push(items[index]);
    purchasedQty.push(qty);

    let again = prompt("Continue shopping? y/n");
    if (again && again.toLowerCase() === "y") {
        takeOrder();
    } else {
        getState();
    }
}

function getState() {

    let state = prompt("Enter two-letter state abbreviation:");
    if (state === null) return;

    state = state.trim().toUpperCase();

    if (state.length !== 2) {
        alert("Invalid state abbreviation.");
        return getState();
    }

    calculateTotals(state);
}

function determineZone(state) {

    if (zone1.includes(state)) return 1;
    if (zone2.includes(state)) return 2;
    if (zone3.includes(state)) return 3;
    if (zone4.includes(state)) return 4;
    if (zone5.includes(state)) return 5;
    if (zone6.includes(state)) return 6;

    return 6; // default
}

function calculateTotals(state) {

    let subtotal = 0;

    for (let i = 0; i < purchasedItems.length; i++) {
        let index = items.indexOf(purchasedItems[i]);
        subtotal += prices[index] * purchasedQty[i];
    }

    let zone = determineZone(state);

    let shipping;

    switch (zone) {
        case 1: shipping = 0; break;
        case 2: shipping = 20; break;
        case 3: shipping = 30; break;
        case 4: shipping = 35; break;
        case 5: shipping = 45; break;
        case 6: shipping = 50; break;
        default: shipping = 50;
    }

    shipping = subtotal > 100 ? 0 : shipping;

    let tax = subtotal * taxRate;
    let total = subtotal + tax + shipping;

    displayInvoice(state, subtotal, shipping, tax, total);
}

function displayInvoice(state, subtotal, shipping, tax, total) {

    const invoiceDiv = document.getElementById("invoice");
    invoiceDiv.style.display = "block";

    let output = "<h2>Invoice</h2>";
    output += "<h3>Items Purchased:</h3>";

    for (let i = 0; i < purchasedItems.length; i++) {
        let index = items.indexOf(purchasedItems[i]);
        let lineTotal = prices[index] * purchasedQty[i];
        output += "<p>" + purchasedItems[i] + " x " + purchasedQty[i] + " = $" + lineTotal.toFixed(2) + "</p>";
    }

    output += "<hr>";

    output += "<h3>Transaction Details:</h3>";
    output += "<p>State: " + state + "</p>";
    output += "<p>Subtotal: $" + subtotal.toFixed(2) + "</p>";
    output += "<p>Shipping: $" + shipping.toFixed(2) + "</p>";
    output += "<p>Tax (15%): $" + tax.toFixed(2) + "</p>";
    output += "<p><strong>Total: $" + total.toFixed(2) + "</strong></p>";

    output += '<div class="centerBtn"><br><button onclick="location.reload()">Shop Again</button></div>';

    invoiceDiv.innerHTML = output;
}
