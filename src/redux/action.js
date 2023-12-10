import axios from "axios"
import { ADD_ITEM, GET_ITEMS, MANAGE_CART, UPDATE_CARD, UPDATE_QUANTITY } from "./actionType"



export const getItems=()=>(dispatch)=>{
    axios.get("https://estore-op53.onrender.com/store")
    .then((res)=>{console.log(res.data)
    dispatch({type:GET_ITEMS,payload:res.data})
    })
}

export const addItem=(data)=>(dispatch)=>{
  return  axios.post("https://estore-op53.onrender.com/store",data)
    .then((res)=>{console.log(res.data)
    dispatch({type:ADD_ITEM,payload:res.data})
    })
}

export const updateCart=(data)=>(dispatch)=>{
 dispatch({type:UPDATE_CARD,payload:data});
 
}
export const updateQuantity=(data)=>(dispatch)=>{
 dispatch({type:UPDATE_QUANTITY,payload:data});

}

export const manageCart=(data)=>(dispatch)=>{
    dispatch({type:MANAGE_CART,payload:data})
}