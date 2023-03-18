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
// Update pricing 
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

let cart = JSON.parse(localStorage.getItem('cart')) || [];

class Roll {

    constructor(type, glazing, size, base) {
        this.type = type;
        this.glazing = glazing;
        this.size = size;
        this.base = base;
    }
}


if (window.location.href.indexOf("product-detail.html") > -1) {
    // get roll type from URL 
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const rollType = params.get("roll");
    // get base price and image file from roll type 
    const info = rolls[rollType];
    const basePrice = info["basePrice"];
    const imageFile = info["imageFile"];

    // Update the header text
    const headerElement = document.querySelector('#detailTitle');
    headerElement.innerText = rollType + ' Cinnamon Roll'; 

    // Update the image
    const productImage = document.querySelector('#productDetailImage');
    productImage.src = './assets/products/' + imageFile; 

    let price = document.querySelector('#price');
    price.innerText = '$ ' + basePrice;
    let packPrice = 1;
    let glazingPrice = 0; 
    let glazingText = 'Keep original';
    let packText = '1'; 
 
    function glazingChange() {
        const selectedOption = this.selectedOptions[0];    
        // get text of selected glazing option
        glazingText = selectedOption.innerText;    
        // get value of selected glazing option
        const glazingValue = selectedOption.value;
        
        glazingPrice = glazingValue;
        let total = (basePrice + parseFloat(glazingPrice)) * parseInt(packPrice);
        price.innerText = '$ ' + total.toFixed(2).toString();
    }
    
    function packSizeChange() {
        const selectedOption = this.selectedOptions[0];    
        // get text of selected pack size option
        packText = selectedOption.innerText;    
        // get value of selected pack size option
        const packValue = selectedOption.value;
        
        packPrice = packValue;
        let total = (basePrice + parseFloat(glazingPrice)) * parseInt(packPrice);
        price.innerText = '$ ' + total.toFixed(2).toString();
    }
    
    let selectGlaze = document.querySelector('#glazing');
    let selectPack = document.querySelector('#pack');
    
    for (const [glazing, price] of Object.entries(glazingOptions)) {
        const option = document.createElement("option");
        option.innerText = glazing;
        option.value = price;
        selectGlaze.appendChild(option);
    }
    
    for (const [pack, price] of Object.entries(packSizes)) {
        const option = document.createElement("option");
        option.innerText = pack;
        option.value = price;
        selectPack.appendChild(option);
    }
    
    selectGlaze.addEventListener('change', glazingChange);
    selectPack.addEventListener('change', packSizeChange);

    function addToCart () { 
        const rollInstance = new Roll(rollType, glazingText, packText, basePrice);
        cart.push(rollInstance); 
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(JSON.parse(localStorage.getItem('cart')));
    }
}


if (window.location.href.indexOf("cart.html") > -1) {
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
        priceTotalDocument.innerText = '$ ' + priceTotal.toFixed(2);
    }

    function removeFromCart(roll) {
        // Remove from cart array
        const index = cart.indexOf(roll);
        cart.splice(index, 1);

        // Remove from DOM 
        const itemToRemove = document.querySelectorAll(".cart")[index];
        itemToRemove.parentNode.removeChild(itemToRemove);

        // Remove from local storage and print updated cart 
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(JSON.parse(localStorage.getItem('cart')));

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
}