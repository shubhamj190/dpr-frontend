import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/carthelper";
import PaymnetB from "./PaymnetB";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
      setProducts(loadCart)
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addFromCart={true}
            reload={reload}
            setReload={setReload}
            addtoCart={false}
          />
        ))}
      </div>
    );
  };
  const loadCheckout = () => {
    return (
      <div>
        <h1>load checkout</h1>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="cart checkout">
      <div className="row text-center">
        <div className="col-md-6">{loadAllProducts(products)}</div>
        <div className="col-md-6">
          {products.length > 0 ? (<PaymnetB
            products={products}
            setReload={!reload}
          />) : 
          (
            <h3>please login or add something to cart</h3>
          )}
        </div>
      </div>
    </Base>
  );
}
