export const createOrder=(userId, token, orderData)=>{
    const formData =new FormData()
    for(const name in orderData){
        formData.append(name, orderData[name])
    }
    return fetch(`${process.env.REACT_APP_BACKED}order/add/${userId}/${token}/`,{
        method: "POST",
        body: formData
    }).then(response=>{
        return response.json()
    })
    .catch(error => console.error(error))
}