import React from 'react'

export default function Imagehelper({product}) {
    const imageurl=product ?(product.image) :("https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260")
    return (
        <div className="rounded p-2">
            <img src={imageurl}
                style={{maxWidth:"100%", maxHeight:"100%"}}
                className="mb-3 rounded"
                alt="this is aimage"

            />
        </div>
    )
}
