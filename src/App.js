import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Listarticles from "./components/articles/Listarticles";
import Editarticle from "./components/articles/Editarticle";
import Insertarticle from "./components/articles/Insertarticle";
import Editcategorie from "./components/categories/Editcategorie";
import Insertcategorie from "./components/categories/Insertcategorie";
import Listcategories from "./components/categories/Listcategories";
import Editscategorie from "./components/scategories/Editscategorie";
import Insertscategorie from "./components/scategories/Insertscategorie";
import Listscategories from "./components/scategories/Listscategories";
import Menu from "./components/Menu";
import Register from "./components/admin/Register";
import Login from "./components/admin/Login";
import Logout from"./components/admin/Logout";
import Home from "./components/Home";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import './App.css';
import Cart from "./components/client/Cart";
import Listcard from "./components/client/Listcard";
import CheckoutSuccess from "./components/client/CheckoutSuccess";
import StripePayment from "./components/client/StripePayment";





function App() {
  return (
    <Router>
      
     <Routes>
      <Route element={<ProtectedRoutes/>}>
<Route path="/editarticle/:id" element={<Editarticle/>}/>
<Route path="/insertarticle" element={<Insertarticle/>}/>
<Route path="/listarticles" element={<Listarticles/>}/>
<Route path="/editcategorie/:id" element={<Editcategorie/>}/>
<Route path="/insertcategorie" element={<Insertcategorie/>}/>
<Route path="/listcategories" element={<Listcategories/>}/>
<Route path="/editscategorie/:id" element={<Editscategorie/>}/>
<Route path="/insertscategorie" element={<Insertscategorie/>}/>
<Route path="/listscategories" element={<Listscategories/>}/>

</Route>
<Route path="/register" element={<Register/>}/>n
<Route path="/login" element={<Login/>}/>
<Route path="/logout" element={<Logout/>}/>
<Route path="/" element={<Home/>}/>
<Route path="*" element={<p> Page Not Found:404!</p>}/>
<Route path="/menu" element={<Menu/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/client/products" element={<Listcard/>}/>
<Route path="/checkoutsuccess" element={<CheckoutSuccess/>}/>
<Route path='/pay/:total' element={<StripePayment/>}/>

      
      </Routes> 
    </Router>
  );
}

export default App;
