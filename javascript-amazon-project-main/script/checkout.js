
let cartSummary='';
cart.forEach((cartItem)=>{

    const cartProductId=cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
        if(product.id==cartProductId){
            matchingProduct=product;
        }
    });
    // console.log(matchingProduct);
    cartSummary+=   
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
    Delivery date: {}
    </div>
    <div class="cart-item-details-grid">
      <img class="product-image"
      src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        $${(matchingProduct.priceCents/100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-cart" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>
      <div class="delivery-options js-delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionHTML(matchingProduct,cartItem)}
      </div>
    </div>
  </div>
`

   document.querySelector('.js-order-summary')
   .innerHTML=cartSummary;

   document.querySelectorAll('.js-delete-cart')
   .forEach((link) =>{
        link.addEventListener('click',()=>{
            const productId=link.dataset.productId;
           // console.log(productId);
          //  create new array, loop through the array, push the product which is not in the productId
           
            removeCart(productId);
            const container=document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
        });
        
    });
    function removeCart(productId)
{
    const newCart=[];
    cart.forEach((cartitem)=>{
        if(cartitem.productId!==productId)
        {
            newCart.push(cartitem);
        }

    });
    cart=newCart;
    saveToStorage();
}

function saveToStorage()
{
    localStorage.setItem("cart",JSON.stringify(cart));
}
   

});

function deliveryOptionHTML(matchingProduct,cartItem){
  let deliveryHTML='';
  deliveryOption.forEach((deliveryOption)=>{
      const today= dayjs();
      const deliveryDate=today.add(deliveryOption.deliveryDays,"days");

      const dateFormat=deliveryDate.format('dddd , MMMM , D');

      const price= deliveryOption.priceCents===0 ? 'FREE' : `${(deliveryOption.priceCents/100).toFixed(2)}`;

      const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
      deliveryHTML+=`<div class="delivery-option">
        <input type="radio"
        ${isChecked ? 'checked':''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            $${price} - Shipping
          </div>
        </div>
      </div>`

     
  });
  return deliveryHTML;
}
