const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

const glazingOptions = {
    'Keep original': 0, 
    'Sugar milk': 0, 
    'Vanilla milk': 1/2,
    'Double chocolate': 3/2,
};
  
const packSizes = {
    '1': 1,
    '3': 3, 
    '6': 5, 
    '12': 10,
};

class Roll {

    constructor(type, glazing, size, base) {
        this.type = type;
        this.glazing = glazing;
        this.size = size;
        this.base = base;
    }
}

const cart = [];
let totalPrice = 0; 

const rollA = new Roll('Original', 'Sugar milk', 1, 2.49);
const rollB = new Roll('Walnut', 'Vanilla milk', 12, 3.49);
const rollC = new Roll('Raisin', 'Sugar milk', 3, 2.99);
const rollD = new Roll('Apple', 'Keep original', 3, 3.49);
cart.push(rollA);
cart.push(rollB);
cart.push(rollC);
cart.push(rollD);

let itemTotalRounded;
function cartDisplay(roll) {
    const incart = document.getElementById("incart");
  
    const item = document.createElement("div");
    item.className = "cart";

    const cartItem = document.createElement("div"); 
    cartItem.className = "cart-item"; 
    item.appendChild(cartItem);
  
    const rollImage = document.createElement("img");
    const rollTypeInfo = rolls[roll.type];
    const rollImageFile = rollTypeInfo["imageFile"];
    rollImage.src = './assets/products/' + rollImageFile;
    rollImage.className = "cart-images";
    cartItem.appendChild(rollImage);

    const lineBreak = document.createElement("br");
    cartItem.appendChild(lineBreak);

    const removeButton = document.createElement("button");
    removeButton.className = "cart-remove";
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(roll);
    cartItem.appendChild(removeButton);

    item.appendChild(lineBreak);

    const cartDescription = document.createElement("div");
    cartDescription.className = "cart-description";
    item.appendChild(cartDescription);

    const rollName = document.createElement("div");
    rollName.textContent = roll.type + ' Cinnamon Roll';
    cartDescription.appendChild(rollName);

    cartDescription.appendChild(lineBreak);

    const glazingName = document.createElement("div");
    glazingName.textContent = 'Glazing: ' + roll.glazing;
    cartDescription.appendChild(glazingName);

    cartDescription.appendChild(lineBreak);

    const packName = document.createElement("div");
    packName.textContent = 'Pack Size: ' + roll.size; 
    cartDescription.appendChild(packName);

    cartDescription.appendChild(lineBreak);
    cartDescription.appendChild(lineBreak);

    const cartPrice = document.createElement("div");
    const itemTotal = (roll.base + glazingOptions[roll.glazing])*(packSizes[roll.size]);
    itemTotalRounded = itemTotal.toFixed(2);
    cartPrice.className = "cart-price";
    cartPrice.textContent = "$ " + itemTotalRounded;
    item.appendChild(cartPrice);

    cartItem.appendChild(lineBreak); 

    incart.appendChild(item);
}

let priceTotal = 0; 
let priceTotalDocument = document.querySelector('#total-price');
for (const element of cart) {
    cartDisplay(element);
    priceTotal += parseFloat(itemTotalRounded);
    priceTotalDocument.innerText = '$ ' + priceTotal;
}

function removeFromCart(roll) {
    // Remove from cart array
    const index = cart.indexOf(roll);
    cart.splice(index, 1);

    // Remove from DOM 
    const itemToRemove = document.querySelectorAll(".cart")[index];
    itemToRemove.parentNode.removeChild(itemToRemove);

    // Change price total
    const itemTotal = (roll.base + glazingOptions[roll.glazing])*(packSizes[roll.size]);
    itemTotalRounded = itemTotal.toFixed(2);
    if (cart.length == 0) {
        priceTotal = 0;
      } else {
        priceTotal -= parseFloat(itemTotalRounded);
    };
    const priceTotalRounded = priceTotal.toFixed(2);
    priceTotalDocument.innerText = '$ ' + priceTotalRounded;
}


