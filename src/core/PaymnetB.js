import React, { useState, useEffect } from "react";
import { Redirect } from "react-router";
import { cartEmpty } from "./helper/carthelper";
import { getMeToken, processPayment } from "./helper/paymnethelper";
import { createOrder } from "./helper/orderhelper";
import { isAuthenticated, signout } from "../auth/helper/index";
import DropIn from "braintree-web-drop-in-react";

const PaymnetB = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
        signout(() => <Redirect to="/signin" />);
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);


  const onPurchase =() =>{
      let nonce;
      let getNonce = info.instance.requestPaymentMethod()
      .then(data=>{
          console.log("MY DATA", data)
          nonce =data.nonce
          const paymentData={
            paymentMethodNonce: nonce,
            amount:getAmount()
          }
          processPayment(userId, token, paymentData)
          .then(response=>{
              if(response.error){
                  if (response.code ==1){
                      console.log("Payment failed")
                      signout(()=>{
                          return <Redirect to="/"/>
                      })
                  }
              }
              else{
                  setInfo({...info, success:response.success, loading:false})
                  console.log("PAYMENT SUCCESS")
                  let products_name=""
                  products.forEach(function(item){
                      products_name+= item.name + ','
                  });
                  const orderData={
                      products:products_name,
                      transaction_id:response.transaction.id,
                      amount:response.transaction.amount,

                  }
                  createOrder(userId, token, orderData)
                  .then(response =>{
                      if (response.error) {
                          if (response.code==1) {
                              console.log("order failed")
                          }
                          signout(()=>{
                              return <Redirect to="/"/>
                          })
                          
                      }else{
                          if (response.success==true) {
                              console.log("order success")
                              
                          }
                      }
                  }).catch(error=>{
                      setInfo({loading:false, success:false})
                      console.log("ORDER CATCH", error)})

              }
          })
          .catch(error=>{console.log("PAYMENTPROCESS error", error)})
          cartEmpty(()=>{
              console.log("cart is empty out")
              setReload(!reload)
          })
      })
      .catch((error) => {console.log(error)})
  }

  const showBtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
              
            /> 
            <button className="btn btn-success btn-lg" onClick={onPurchase}>Buy</button>

          </div>
        ) : (
          <h3>please login or add something payment to the cart</h3>
        )}
      </div>
    );
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseInt(p.price);
    });
    return amount;
  };

  return (
    <div>
      <h3>your bill is {getAmount()}</h3>
      {showBtnDropIn()}
    </div>
  );
};

export default PaymnetB;
