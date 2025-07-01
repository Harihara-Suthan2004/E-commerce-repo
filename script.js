const bar=document.getElementById('menuicon');
const closed=document.getElementById('close');
const nav=document.getElementById('h-List');
if(bar){
    bar.addEventListener('click',()=>{
    nav.classList.add('flag');
    });
}
if(close){
    closed.addEventListener('click',()=>{
    nav.classList.remove('flag');
    });
}

//cart codeing for vesibility of the cart

const cartIcon=document.getElementById("cartpic");
const cart=document.querySelector(".cart");
const cartClose=document.getElementById("cart-close");
cartIcon.addEventListener("click",()=>cart.classList.add("active"));
cartClose.addEventListener("click",()=>cart.classList.remove("active"));

//adding the items in the cart

const addCartButtons=document.querySelectorAll(".add-cart");
addCartButtons.forEach(button=>{
    button.addEventListener("click", Event=>{
        const productBox=Event.target.closest(".pro");
        addToCart(productBox);
    });
});



const cartContent=document.querySelector(".cart-content")
const addToCart=productBox => {
    const productImgSrc=productBox.querySelector("img").src;
    const productTitle=productBox.querySelector(".BlazerTitle").textContent;
    const productPrice=productBox.querySelector(".BlazerPrice").textContent;

    //alert msg configuration

    const cartItem = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItem) {
        if (item.textContent.trim() === productTitle.trim()) {
            alert("This item is already in the cart.");
            return;
        }
    }

    const CartBox=document.createElement("div");
    CartBox.classList.add("cart-box");
    CartBox.innerHTML=`
         <img src="${productImgSrc}" alt="added image">
            <div class="cart-detail">
                <h2 class="cart-product-title"> ${productTitle}</h2>
                <span class="cart-price">${productPrice}</span>
                <div class="cart-quantity">
                    <button id="decrement">-</button>
                    <span class="cart-number">1</span>
                    <button id="increment">+</button>
                </div>
            </div>
            <i class="fas fa-trash cart-remove"></i>
    `;

    cartContent.appendChild(CartBox);
//remove the item from the cart
    CartBox.querySelector(".cart-remove").addEventListener("click",() => {
        CartBox.remove();

       updateCartCount(-1); 
    updateTotalPrice();
    });
    CartBox.querySelector(".cart-quantity").addEventListener("click",Event => {
        const numberElement=CartBox.querySelector(".cart-number");
        const decrementButton=CartBox.querySelector("#decrement");
        let quantity=numberElement.textContent;
        if(Event.target.id==="decrement" && quantity >1){
            quantity--;
            if(quantity===1)
            {
                decrementButton.style.color="#999";
            }
        } else if(Event.target.id==="increment"){
            quantity++;
            decrementButton.style.color="#333";
        }
        numberElement.textContent=quantity;
        updateTotalPrice();

    });
updateCartCount(1);

    updateTotalPrice();

};

//total price

const updateTotalPrice=()=>
{
    const totalPriceElement=document.querySelector(".total-price");
    const CartBoxes=cartContent.querySelectorAll(".cart-box");
    let total=0;
    CartBoxes.forEach(CartBox=>{
        const priceElement=CartBox.querySelector(".cart-price");
        const quantityElement=CartBox.querySelector(".cart-number");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(quantityElement.textContent);
        total+=price*quantity;
    });
    totalPriceElement.textContent=`$${total}`;
};
//cart visibility

let cartItemCount=0;
const updateCartCount= change=>{
    const cartItemCountBadge=document.querySelector(".cart-item-count");
    cartItemCount+=change;
    if(cartItemCount>0){
        cartItemCountBadge.style.visibility="visible";
        cartItemCountBadge.textContent=cartItemCount;
    }
    else{
        cartItemCountBadge.style.visibility="hidden";
        cartItemCountBadge.textContent="";
    }
};





