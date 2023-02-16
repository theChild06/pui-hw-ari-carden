let glazingOptions = {
  'Keep original': 0, 
  'Sugar milk': 0, 
  'Vanilla milk': 1/2,
  'Double chocolate': 3/2,
};

let packSizes = {
  '1': 1,
  '3': 3, 
  '6': 5, 
  '12': 10,
};

//default price
let price = document.querySelector('#price');
price.innerText = '$ 2.49';
let packPrice = 1;
let glazingPrice = 0; 

function glazingChange() {
  // get value of selected glazing option
  glazingPrice = this.value;  
  let total = (2.49 + parseFloat(glazingPrice)) * parseInt(packPrice);
  price.innerText = '$ ' + total.toFixed(2).toString();
}

function packSizeChange() {
  // get value of selected pack size
  packPrice = this.value; 
  let total = (2.49 + parseFloat(glazingPrice)) * parseInt(packPrice);
  price.innerText = '$ ' + total.toFixed(2).toString();
}

let selectGlaze = document.querySelector('#glazing');
let selectPack = document.querySelector('#pack');

for (i in glazingOptions) {
  var option = document.createElement('option');
  option.text = i; 
  option.value = glazingOptions[i];
  selectGlaze.add(option);
}

for (i in packSizes) {
  var option = document.createElement('option');
  option.text = i; 
  option.value = packSizes[i];
  selectPack.add(option);
}

selectGlaze.addEventListener('change', glazingChange);
selectPack.addEventListener('change', packSizeChange);


