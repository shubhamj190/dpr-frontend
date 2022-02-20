import { cartEmpty } from "../../core/helper/carthelper"

export const signup = (user) =>{
    return fetch(`${process.env.REACT_APP_BACKED}user/`, {
    method:"POST",
    headers:{
    Accept:"application/json",
    "Content-Type":"application/json",

},
    body: JSON.stringify(user)
}).then((response)=>{
    return response.json()
}).catch((err)=>console.log(err))
}

export const signin = (user) =>{
    const formData=new FormData()

    for(const name in user){
        formData.append(name, user[name])
    }

    // the more explanation version of this 
    // destructuring the data 
    // const {email, password} =user
    // const formData = new FormData
    // formData.append('email',email)
    // formData.append('password',password)

    // for( var key in formData.keys()){
    //     console.log(key)
    // }

    return fetch(`http://localhost:8000/api/user/login/`,{
        method:"POST",
        body: formData
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}

export const authenticate = (data, next)=>{
    if(typeof window!=undefined){
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated =() =>{
    if (typeof window==undefined) {
        // compare jwt with json token
        return false
        
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}

export const signout = (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id;
  
    console.log("USERID: ", userId);
  
    if (typeof window !== undefined) {
      localStorage.removeItem("jwt");
      cartEmpty(() => {});
      //next();
  
      return fetch(`http://localhost:8000/api/user/logout/${userId}`, {
        method: "GET",
      })
        .then((response) => {
          console.log("Signout success");
          next();
        })
        .catch((err) => console.log(err));
    }
}