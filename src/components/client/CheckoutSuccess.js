import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getTotals } from "../../features/cartSlice";
import { Link } from "react-router-dom";
const CheckoutSuccess = () => {
const dispatch = useDispatch();
const cart = useSelector((state) => state.cart);
useEffect(() => {
dispatch(getTotals());
}, [cart, dispatch]);
return (
<>
<div className="cart-container">
<br/>
{cart.cartItems.length === 0 ? (
<div className="cart-empty">
<p>Your cart is currently empty</p>
<div className="continue-shopping">
<Link to="/">
<svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
fill="currentColor"
className="bi bi-arrow-left"
viewBox="0 0 16 16"
>
<path
fillRule="evenodd"
d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-
.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5
0 0 0 15 8z"
/>
</svg>
<span>Return Shopping</span>
</Link>
</div>
</div>
) : (
<div>
<h2>Checkout Successful</h2>
<div className="titles">
<h3 className="product-title">Product</h3>
<h3 className="price">Price</h3>
<h3 className="quantity">Quantity</h3>
<h3 className="total">Total</h3>
</div>
<div className="cart-items">
{cart.cartItems &&
cart.cartItems.map((cartItem) => (
<div className="cart-item" key={cartItem._id}>
<div className="cart-product">
<img
src={cartItem.imageart}
alt={cartItem.designation}/>
<div>
<h3>{cartItem.designation}</h3>
<p>{cartItem.marque}</p>
</div>
</div>
<div className="cart-product-price">{cartItem.prix}
TND</div>
<div className="cart-productprice">{cartItem.cartQuantity}</div>
<div className="cart-product-total-price">
{(cartItem.prix * cartItem.cartQuantity).toFixed(3)}
TND
</div>
</div>
))}
</div>
<div className="cart-summary">
<div className="cart-checkout">
<div className="subtotal">
<span>Subtotal</span>
<span className="amount">{cart.cartTotalAmount.toFixed(3)}
TND</span>
</div>
<div>
<button onClick={()=>{dispatch(clearCart())}}>
{ <Link to={"/pay/" + cart.cartTotalAmount}
style={{"color":"yellow"}}>
Validate and Pay
</Link>
}
</button>
</div>
<div>
<button className="clear-btn"
onClick={()=>{dispatch(clearCart())}}>
Clear Cart
</button>
</div>
<div>
<div className="continue-shopping">


<span>Print out PDF</span>

<Link to="/">
<svg
xmlns="http://www.w3.org/2000/svg"
width="20"
height="20"
fill="currentColor"
className="bi bi-arrow-left"
viewBox="0 0 16 16"
>
<path
fillRule="evenodd"
d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-
.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5
0 0 0 15 8z"
/>
</svg>
<span>Continue Shopping</span>
</Link>
</div>
</div>
</div>
</div>
</div>
)}
</div>
</>
);
};
export default CheckoutSuccess;