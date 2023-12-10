import axios from "axios"
import { GET_BILLS, UPDATE_BILLS } from "./actiontype"



export const getBills=()=>(dispatch)=>{
    axios.get("https://estore-op53.onrender.com/bills").then((res)=>{console.log(res)
    dispatch({type:GET_BILLS,payload:res.data})
    })
}

export const postBills=(data)=>(dispatch)=>{

 return   axios.post("https://estore-op53.onrender.com/bills",data)
    .then((res)=>{
        console.log(res.data,"post Bills")
       dispatch({type:UPDATE_BILLS,payload:res.data})

    })
}

