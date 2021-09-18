//Load All Products from API
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3 class="title">${product.title}</h3>
      <p class="category">Category: ${product.category}</p>
      <h2 class="price">Price: $ ${product.price}</h2>
      <p class="product_rating">Rating:  ${product.rating.rate} Person: ${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now search-button btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn btn-info">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

//Get input Price and Tax and Delivery-charge price
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = Number(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = addDecimal(Math.abs(total));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = addDecimal(Math.abs(value).toFixed(2));
};

//Add dicimal
const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};
// updateTaxAndCharge();

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = addDecimal(Math.abs(grandTotal));
};