import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import { getArticles } from "../../features/articleSlice";
import { getTotals } from "../../features/cartSlice";
import {useEffect} from 'react'
import Clientnavbar from "./Clientnavbar";
const Listcard = () => {
const {articles} = useSelector((state) => state.storearticles);
const dispatch = useDispatch();
let navigate=useNavigate();
useEffect(() => {
dispatch(getArticles());
dispatch(getTotals());
}, dispatch);
const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(getTotals());
//navigate("/cart");
};
return (
    
    
<div className="home-container">
<div><Clientnavbar/>
    </div>
<h2>New Arrivals</h2>
<div className="products">
{articles &&
articles?.map((product) => (
<div key={product._id} className="product">
<h3 style={{height:40}}>{product.designation}</h3>
<img
src={product.imageart}
alt={product.designation} height="200"/>
<div className="details">
<span>{product.marque}</span>
<span className="price"> {product.prix} TND</span>
</div>
<button onClick={() => handleAddToCart(product)}
style={{height:40}}>
Add To Cart
</button>
</div>
))}
</div>
</div>
);
};
export default Listcard;