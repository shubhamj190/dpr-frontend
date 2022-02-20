export const getMeToken =(userId, token)=>{
    return fetch(`${process.env.REACT_APP_BACKED}payment/gettoken/${userId}/${token}/`,{
        method:"GET",

    }).then(response=>{
        console.log("This is a response",response)
        return response.json()})
        .catch(err=> {console.error(err)})
}

export const processPayment =(userId, token, paymentInfo)=>{
    const formData = new FormData()

    for(const name in paymentInfo){
        formData.append(name, paymentInfo[name])
    }
    return fetch(`${process.env.REACT_APP_BACKED}payment/process/${userId}/${token}/`,{
        method:"POST",
        body:formData
    }).then(response=>{
        return response.json()
    }).catch(err=> {console.error(err)})
    
}