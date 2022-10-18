const array = [];

const loadProducts = (url) => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         array.push(data);
         showProducts(data);
         // console.log(data);
      });
};

loadProducts('https://fakestoreapi.com/products?limit=12');

// show all product in UI
const showProducts = (products) => {
   // console.log(products);
   
   setInnerText('total_products', products.length);

   document.getElementById("all-products").innerHTML = "";

   const allProducts = products.map((pd) => pd);
   for (const product of allProducts) {
      const image = product.image;
      // console.log(product);
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>

      
      
      <button onclick="buyNow(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary border-0 w-100 rounded-0 bg-main py-2">Buy Now</button>
      `;
      document.getElementById('all-products').appendChild(div);
   }
};

let count = 0;

const buyNow = (id, price) => {
   count = count + 1;
   updatePrice('price', price);

   updateTaxAndCharge();
   updateTotal();
   document.getElementById('total-Products').innerText = count;
};


const getInputValue = (id) => {
   const element = document.getElementById(id).innerText;
   const converted = parseFloat(element);
   return converted;
};

// main price update function
const updatePrice = (id, value) => {
   const convertedOldPrice = getInputValue(id);
   const convertPrice = parseFloat(value);
   const total = convertedOldPrice + convertPrice;
   document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
   if(typeof value === "number"){
      value = Math.round(value);
   }
   document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue('price');
   if (priceConverted > 500) {
      setInnerText('delivery-charge', 60);
      setInnerText('total-tax', priceConverted * 0.4);
   }
   else if (priceConverted > 200) {
      setInnerText('delivery-charge', 30);
      setInnerText('total-tax', priceConverted * 0.2);
   }
   else if (priceConverted > 400) {
      setInnerText('delivery-charge', 50);
      setInnerText('total-tax', priceConverted * 0.3);
   }
   else{
      setInnerText('delivery-charge', 20);
   }
   
};

//finalTotal update function
const updateTotal = () => {
   const finalTotal =
      getInputValue('price') +
      getInputValue('delivery-charge') +
      getInputValue('total-tax');
   document.getElementById('total').innerText = finalTotal.toFixed(2);
};



