import { ADD_ITEM, GET_ITEMS, MANAGE_CART, UPDATE_CARD, UPDATE_QUANTITY } from "./actionType"




const initialState={
   items:[],
   cart:[],
   temp:[]
    
}

export const reducer=(state=initialState,{type,payload})=>{

    switch(type){
       case GET_ITEMS:{
        return{
            ...state,items:payload
        }
       }
       case ADD_ITEM:{
        return{
            ...state,items:[...state.items,payload]
        }
       }
       case UPDATE_CARD:{
        return{
            ...state,cart:[...state.cart,payload]
        }
       }
       case UPDATE_QUANTITY:{
        return{
            ...state,cart:payload
        }
       }
       case MANAGE_CART:{
        return{
            ...state,cart:[],temp:payload
        }
       }
       default:{
        return state
       }
    }

}