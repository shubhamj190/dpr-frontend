import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";
import Imagehelper from "./helper/Imagehelper";
import {isAuthenticated} from '../auth/helper/index'

const Card = ({ product, addtoCart = true, removeFromCart = false ,reload=undefined, setReload=f=>f }) => {

  const [redirect, setRedirect] = useState(false);


  const addToCart = () => {
      if (isAuthenticated()) {
        addItemToCart(product,()=>setRedirect(true))
      console.log("added to cart");
    } else {
      console.log("login please");
    }
  };

  const getaRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    } else {
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id)
            setReload(!reload)
              console.log("product removed from cart")
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card">
      <div className="card-header lead">
        <strong>{product.name}</strong>
        {getaRedirect(redirect)}
      </div>
      <div className="card-body">
        <Imagehelper product={product} />
        <p className="lead font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
