import React from 'react';
import {Switch,Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart";
import Default from "./components/Default";
import Modal from './components/Modal';
import { ThemeConsumer } from './components/context/ThemeContexts'
import Login from './components/Login';
import AddProduct from './components/Product/AddProduct';
import Signup from './components/Signup';

function App() {
  return (
    <ThemeConsumer>
    {({ theme }) => (
    <React.Fragment>
      <div className={theme? 'h-fit bg-slate-900' : 'h-fit'}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup}/>
        <Route exact path="/home" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route path="/addProduct" component={AddProduct}/>
        <Route component={Default} />
      </Switch>
      <Modal />
        </div>
     
    </React.Fragment>
       )}
       </ThemeConsumer>
  );
}

export default App;
