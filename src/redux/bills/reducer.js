import { GET_BILLS, UPDATE_BILLS } from "./actiontype"




const initialState={
  
    bills:[],
     
 }
 
 export const reducer=(state=initialState,{type,payload})=>{
 
     switch(type){
        case GET_BILLS:{
         return{
             ...state,bills:payload
         }
        }
        case UPDATE_BILLS:{
         return{
             ...state,bills:[...state.bills,payload]
         }
        }
        default:{
         return state
        }
     }
 
 }