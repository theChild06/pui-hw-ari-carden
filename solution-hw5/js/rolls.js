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

const cart = [];

class Roll {

    constructor(type, glazing, size, base) {
        this.type = type;
        this.glazing = glazing;
        this.size = size;
        this.base = base;
    }
}

function addToCart () { 
    const rollInstance = new Roll(rollType, glazingText, packText, basePrice);
    cart.push(rollInstance); 
    console.log(cart);
}