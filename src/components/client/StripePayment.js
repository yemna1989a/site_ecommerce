import '../../App.css';
import StripeCheckout from 'react-stripe-checkout';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate,useParams } from "react-router-dom";
const MySwal = withReactContent(Swal);
function StripePayment() {
let navigate=useNavigate();
const {total} = useParams();
const publishableKey =
'pk_test_51N4JalFVwuUqslAO7pRERJ04Mt1C8iNFq0TQGAT2Qy1E6cyWB62UaI9ZkaqUiLJpW8N6PARoUESEXSTYENvAPg6R00qh3REt5P';
const [product] = useState({
name: 'Total',
price: `${total}`,
});
const priceForStripe = product.price * 100;
const handleSuccess = () => {
MySwal.fire({
icon: 'success',
title: 'Payment was successful',
time: 4000,
});
navigate('/client/products')
};
const handleFailure = () => {
MySwal.fire({
icon: 'error',
title: 'Payment was not successful',
time: 4000,
});
navigate('/client/products')
};
const payNow = async (token) => { console.log(JSON.stringify(token))
try {
const response = await axios({
url: 'http://localhost:3002/api/payment',
method: 'post',
data: {
amount: product.price * 100,
token,
},
});
if (response.status === 200) {
handleSuccess();
}
} catch (error) {
handleFailure();
console.log(error);
}
};
return (
<div className="home-container">
<div className="products">
<div className="product">
<h2>Complete payment </h2>

<p> {product.name} </p>

<p> {product.price} TND </p>


<StripeCheckout
stripeKey={publishableKey}
label="Pay Now"
name="Pay With Credit Card"
billingAddress
shippingAddress
amount={priceForStripe}
description={`Your total is ${product.price} TND`}
token={payNow}
/>
</div>
</div>
</div>
);
}
export default StripePayment;