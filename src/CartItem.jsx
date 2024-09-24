import React from 'react';
import { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addCartTotal, remCartTotal, updateCartCostTotal   } from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const cartTot = useSelector(state => state.cart.cntCrt);
  //const cartCstTot = useSelector(state => state.cart.crtTotalCost);
  const addedToCart = useSelector(state => state.cart.addedToCart);
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(true);
  const [cartAddTotal, setCartAddTotal] = useState(cartTot);
  //const [cartCstTotal, setCartCstTotal] = useState(0);
  //const [cartItemsTotal, setCartItemsTotal] = useState(0);
  let totalC = 0;

  const styleObj={
    backgroundColor: '#4CAF50',
    color: '#fff!important',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignIems: 'center',
    fontSize: '20px',
   }
   const styleObjUl={
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
   }
   const styleA={
    color: 'white',
    fontSize: '30px',
    'text-align': 'center',
    textDecoration: 'none',
   }

const handlePlantsClick = (e) => {
    e.preventDefault();
    //setShowPlants(true); // Set showAboutUs to true when "About Us" link is clicked
    setShowCart(false); // Hide the cart when navigating to About Us
};

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    
    //console.log(cartCstTotal);
    addedToCart.forEach((item) => {
      totalC += parseInt(item.itemtotalcost);
        //state.crtTotalCost = (item.cost.replace("$","") * item.quantity);
      
    });
    
    //setCartCstTotal(totalC);
    ////dispatch(updateCartCostTotal(cartCstTotal));
    //console.log(totalC);
    
    return totalC;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(addCartTotal(item));
    //console.log(item.itemtotalcost)
    const item1 = {...item, quantity: item.quantity + 1, itemtotalcost: (parseInt(item.itemtotalcost) + parseInt(item.cost.replace("$","")) )};
    //console.log(item1.quantity)
    //const existingCartItem = state.addedToCart.find(item => item.name === action.payload.name);
    //existingCartItem.itemtotalcost += parseInt(existingCartItem.cost.replace("$",""))
    //console.log(existingCartItem.itemtotalcost)

    //console.log(item1.itemtotalcost)

    totalC += parseInt(item.cost.replace("$",""));
    //console.log(totalC);
    dispatch(updateQuantity(item1));
    calculateTotalAmount(item1);
    calculateTotalCost(item1);
    //dispatch(updateCartCostTotal());
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(remCartTotal(item));
      const item1 = {...item, quantity: item.quantity - 1, itemtotalcost: (parseInt(item.itemtotalcost) - parseInt(item.cost.replace("$","")) )};
      dispatch(updateQuantity(item1));
      totalC -= parseInt(item.cost.replace("$",""));
      calculateTotalAmount(item1);
      calculateTotalCost(item1);
      //dispatch(updateCartCostTotal());
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    //dispatch(updateCartCostTotal());
    //item.quantity;
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {

    
    

    return item.itemtotalcost;
  };

  useEffect(()=>{
    setCartAddTotal(cartTot);
    
    //console.log(cartAddTotal);
    //console.log(cart);
  },[cartTot])

  //useEffect(()=>{
  //  setCartCstTotal(cartCstTot);
    
    //console.log(cartAddTotal);
    //console.log(cart);
  //},[cartCstTot])


  return (
    <>
    {showCart? (
      <>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                    <a href="/" style={{textDecoration:'none'}}>
                        <div>
                        <h3 style={{color:'white'}}>Paradise Nursery</h3>
                        <i style={{color:'white'}}>Where Green Meets Serenity</i>
                        </div>
                        </a>
                    </div>
              
                </div>
                <div style={styleObjUl}>
                    <div style={{width: '70%', justifyContent: 'center', display: "flex", alignIems: 'centre'}}> <a href="#" onClick={(e)=>handlePlantsClick(e)} style={styleA}>Plants</a></div>
                    <div> 
                        <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <h1 className='cart'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                        <rect width="156" height="156" fill="none"></rect>
                        <circle cx="80" cy="216" r="12"></circle>
                        <circle cx="184" cy="216" r="12"></circle>
                        <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="mainIconPathAttribute"></path>
                        <text text-anchor="middle" x='130' y='160' className='cart-qty-total' >{cartAddTotal}</text>
                        </svg>
                        </h1>
                        </a>
                    </div>
                </div>
            </div>



    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {addedToCart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
    </>
    ) : (
      <ProductList />
    )}
    </>
  );
};

export default CartItem;


