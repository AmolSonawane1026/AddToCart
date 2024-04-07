const api = "https://fakestoreapi.com/products";
const container = document.querySelector(".container");
const mainCart = document.querySelector(".mainCart");
// const card = document.querySelector(".card");
const cartImg = document.querySelector(".cart");
const dynamicCount = document.querySelector(".dynamicCount");
const emptyCartText = document.querySelector(".emptyCartText");
const yourCartItems = document.querySelector(".yourCartItems");
const totalPrice = document.querySelector(".totalPrice")

let cartArray = [];
let calculateTotal = [];

const myFunction = async () => {
  let response = await fetch(api);
  let cardData = await response.json();
  // console.log(cardData);

  cardData.map((data, key) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    // ================
    let creatImgElm = document.createElement("img");
    creatImgElm.setAttribute("src", `${data.image}`);
    // ========================
    let creatTitle = document.createElement("h4");
    let createTitleText = document.createTextNode(`${data.title}`);
    creatTitle.appendChild(createTitleText);
    // =====================
    let createPrice = document.createElement("H1");
    let createPriceText = document.createTextNode(`$${data.price}`);
    createPrice.appendChild(createPriceText);
    // ========================
    let createBtn = document.createElement("button");
    createBtn.setAttribute("class", "cartBtn");
    let createBtnText = document.createTextNode("Add to cart");
    createBtn.appendChild(createBtnText);
    // ============================================
    card.appendChild(creatImgElm);
    card.appendChild(creatTitle);
    card.appendChild(createPrice);
    card.appendChild(createBtn);
    // ==========================
    function addToCart(img, price) {
      emptyCartText.style.display = "none";
      yourCartItems.style.display = "block";
      cartArray.push({ image: img, price: price });
      // console.log(cartArray);
      dynamicCount.innerHTML++;
      alert(`${data.title} added to cart😍`);

      let cartBox = document.createElement("div");
      cartBox.setAttribute("class", "cartBox");
      // ==========
      let cartClose = document.createElement("i");
      cartClose.setAttribute("class", "fa-solid fa-xmark");
      // ========
      let cartBoxImg = document.createElement("img");
      cartBoxImg.setAttribute("src", img);
      // ===========
      let cartPrice = document.createElement("h3");
      let cartPriceText = document.createTextNode(`$${price}`);
      cartPrice.appendChild(cartPriceText);
      // =============

      let quantity = document.createElement("div");
      quantity.setAttribute("class", "quantity");
      // ====
      let cartPlusBtn = document.createElement("button");
      cartPlusBtn.setAttribute("class", "cartPlusBtn mainCartBtn");

      let cartPlusBtnText = document.createTextNode("+");
      cartPlusBtn.appendChild(cartPlusBtnText);
      // ====

      let quantityNumber = document.createElement("h2");
      let quantityNumberText = document.createTextNode(key);
      quantityNumber.appendChild(quantityNumberText);
      // =========
      let cartMinusBtn = document.createElement("button");
      cartMinusBtn.setAttribute("class", "cartMinusBtn mainCartBtn");

      let cartMinusBtnText = document.createTextNode("-");
      cartMinusBtn.appendChild(cartMinusBtnText);
      // ==========================
      quantity.appendChild(cartPlusBtn);
      quantity.appendChild(quantityNumber);
      quantity.appendChild(cartMinusBtn);

      // ===============
      cartBox.appendChild(cartClose);
      cartBox.appendChild(cartBoxImg);
      cartBox.appendChild(cartPrice);
      cartBox.appendChild(quantity);

      // ===========
      mainCart.appendChild(cartBox);
      // =======================
      calculateTotal.push(price);
      let myTotal = calculateTotal.reduce((accum, curval) => {
        return accum + curval;
      });
      // console.log(myTotal);
      totalPrice.innerHTML = `Total Price : $${myTotal}`

      // ===================

      cartClose.addEventListener("click", () => {
        yourCartItems.style.display = "none";
        alert(`Your order ${data.title} has succesfully removed from cart😔`);
        dynamicCount.innerHTML--;
        cartBox.remove();
      });

      
    }
    // ===================================

    createBtn.addEventListener("click", () =>
      addToCart(data.image, data.price)
    );

    container.appendChild(card);
  });
};

myFunction();
cartImg.addEventListener("click", () => {
  mainCart.style.visibility = "visible";
  mainCart.classList.toggle("cartActive");
});
