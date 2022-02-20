import React, {useState, useEffect} from 'react'
import Base from './Base'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'


export default function Home() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () =>{
        getProducts().then(
            data=>{
                if(data.error || data===undefined){
                    console.log("DATA IS UNDEFINED")
                    setError(data.error)
                }
                else{
                    console.log("DAT IS NOT UNDEFINED")
                    setProducts(data && data)
                }
            }
        ).catch(error =>{console.log(error)})
    }


    useEffect(() => {
        loadAllProducts()
    }, [])

    return (
        <Base title="Home Page" description="Welcome to Tshirt store">
      <h1>Home component</h1>
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-4 mb-4">
              <Card
              product={product}
               />
            </div>
          );
        })}
      </div>
    </Base>

    )
}


