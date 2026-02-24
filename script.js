/* 
STEP LIST
0 Load branded page with button
1 Ask item
2 Ask quantity
3 Continue shopping?
4 Ask state
5 Calculate
6 Display invoice
7 Shop again reset
*/

const items = ["chair", "recliner", "table", "umbrella"];
const prices = [25.50, 37.75, 49.95, 24.89];

const states = [
"WA","OR","CA","NV","ID","UT","AZ","MT","WY","CO","NM",
"ND","SD","NE","KS","OK","TX","MN","IA","MO","AR","LA",
"WI","IL","MS","MI","IN","KY","TN","AL","GA","FL",
"OH","WV","VA","NC","SC","PA","NY","VT","NH","ME",
"MA","CT","RI","NJ","DE","MD","AK","HI"
];

let purchasedItems = [];
let purchasedQty = [];

document.getElementById("purchaseBtn").addEventListener("click", startPurchase);

function startPurchase() {
    purchasedItems = [];
    purchasedQty = [];
    document.getElementById("invoice").style.display = "none";
    askItem();
}

function askItem() {

    const itemInput = prompt("What item would you like to buy today: Chair, Recliner, Table or Umbrella?");
    if (itemInput === null) {
        alert("Transaction cancelled.");
        return;
    }

    const itemLower = itemInput.toLowerCase();

    if (!items.includes(itemLower)) {
        alert("Invalid item. Please try again.");
        return askItem();
    }

    const qtyInput = prompt(`How many ${itemLower} would you like to buy?`);
    if (qtyInput === null) {
        alert("Transaction cancelled.");
        return;
    }

    const qty = parseInt(qtyInput);

    if (isNaN(qty) || qty <= 0) {
        alert("Invalid quantity.");
        return askItem();
    }

    purchasedItems.push(itemLower);
    purchasedQty.push(qty);

    const again = prompt("Continue shopping? y/n");
    if (again !== null && again.toLowerCase() === "y") {
        askItem();
    } else {
        askState();
    }
}

function askState() {

    const stateInput = prompt("Enter two-letter state abbreviation:", "I");
    if (stateInput === null) {
        alert("Transaction cancelled.");
        return;
    }

    const state = stateInput.toUpperCase();

    if (!states.includes(state)) {
        alert("Invalid state abbreviation.");
        return askState();
    }

    calculate(state);
}

function calculate(state) {

    let subtotal = 0;

    for (let i = 0; i < purchasedItems.length; i++) {
        const index = items.indexOf(purchasedItems[i]);
        subtotal += prices[index] * purchasedQty[i];
    }

    subtotal = parseFloat(subtotal.toFixed(2));

    const tax = parseFloat((subtotal * 0.15).toFixed(2));

    const zone = getZone(state);

    let shipping;

    shipping = subtotal > 100 ? 0 : getShippingCost(zone);

    const total = parseFloat((subtotal + tax + shipping).toFixed(2));

    displayInvoice(state, subtotal, tax, shipping, total);
}

function getZone(state) {

    switch(state) {
        case "WA": case "OR": case "CA": case "NV": case "ID": case "UT": case "AZ":
            return 5;
        case "MT": case "WY": case "CO": case "NM": case "ND": case "SD": case "NE":
        case "KS": case "OK": case "TX":
            return 4;
        case "MN": case "IA": case "MO": case "AR": case "LA":
            return 3;
        case "WI": case "IL": case "MS": case "MI": case "IN": case "KY": case "TN":
        case "AL": case "GA": case "FL":
            return 2;
        case "OH": case "WV": case "VA": case "NC": case "SC": case "PA": case "NY":
        case "VT": case "NH": case "ME": case "MA": case "CT": case "RI":
        case "NJ": case "DE": case "MD":
            return 1;
        case "AK": case "HI":
            return 6;
        default:
            return 1;
    }
}

function getShippingCost(zone) {

    switch(zone) {
        case 1: return 0;
        case 2: return 20;
        case 3: return 30;
        case 4: return 35;
        case 5: return 45;
        case 6: return 50;
        default: return 0;
    }
}

function displayInvoice(state, subtotal, tax, shipping, total) {

    const invoiceDiv = document.getElementById("invoice");
    invoiceDiv.style.display = "block";

    let html = "<h2>Invoice</h2>";
    html += `<p><strong>Shipping State:</strong> ${state}</p>`;
    html += "<h3>Items Purchased:</h3>";

    for (let i = 0; i < purchasedItems.length; i++) {
        const index = items.indexOf(purchasedItems[i]);
        const lineTotal = (prices[index] * purchasedQty[i]).toFixed(2);
        html += `<p>${purchasedItems[i]} x ${purchasedQty[i]} = $${lineTotal}</p>`;
    }

    html += "<hr>";

    html += "<h3>Transaction Summary:</h3>";
    html += `<p>Subtotal: $${subtotal.toFixed(2)}</p>`;
    html += `<p>Tax (15%): $${tax.toFixed(2)}</p>`;
    html += `<p>Shipping: $${shipping.toFixed(2)}</p>`;
    html += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;

    html += `<div class="center-btn">
                <button onclick="location.reload()">Shop Again</button>
             </div>`;

    invoiceDiv.innerHTML = html;
}
