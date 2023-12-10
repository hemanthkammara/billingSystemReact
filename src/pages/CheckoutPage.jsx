import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, updateCart, updateQuantity } from "../redux/action";
import { getBills, postBills } from "../redux/bills/action";
import styled from 'styled-components';

export const CheckoutPage=()=>{

    const [product, setproduct] = useState("select a item");
    const [list, setList] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState({});
    const[total,setTotal]=useState(0)
    const dispatch = useDispatch();
  
    const items = useSelector((store) => {
      return store.itemReducer.items;
    });
    const cart = useSelector((store) => {
      return store.itemReducer.temp;
    });
    const bills = useSelector((store) => {
      return store.billsReducer.bills;
    });

    useEffect(() => {
        dispatch(getItems());
        dispatch(getBills())
      }, []);
    
      // logic for disable for buttons
      useEffect(() => {
        let sum=0;
        let arr = cart.map((e) => {
          sum+=e.total
          return e.name;
        });
        console.log(arr);
        setList(arr);
        setTotal(sum)
      }, [cart]);
  

    return (
        <DIV>
            



    <div className="cart" style={{ width: "40%"}}>
       
                <h3>Bill</h3>
        <div className="bill">
                <h3>Bill No : {bills[bills.length-1].billno}</h3>
                <h3>Date : {bills[bills.length-1].date}</h3>
                
            </div>
        <div className="headCart">
          <p>Item Name</p>
          <p>Unit Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <div className="cartStore">
<h1>{cart.length===0?"...cart is Empty":""}</h1>
      
        {cart.length > 0 &&
          cart.map((e, i) => {
            return (
              <div key={i} className="singleCart">
                
                <p>{e.name}</p>
              
                <p>Rs {e.price}/-</p>
                <div style={{ display: "flex" }}>
               
               
                  <button>{e.quantity}</button>
                
                </div>
                <p>Rs {e.total}/-</p>
              </div>
            );
          })}
      </div>
      <div className="divTotal">
        <hr />
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <h3 >Items : {cart.length}</h3>
        <h3>Total : Rs {total}/-</h3>
        </div>
       

      </div>
      </div>
            
        </DIV>
    )
}
const DIV=styled.div`
display: flex;
justify-content: center;
margin-top: 45px;
gap: 15px;

.bill{

    border-radius: 10px;
   
    background-color: white;
    display: flex;
    justify-content: space-around;
  


  
}
      .cart{
    width: 40%;
    background-color: white;
    /* border: 1px solid black; */
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
    background-color: white;
  }
 
  /* .cart button{
   width: 40%;
    height: 25px;
  } */
  

  .headCart{
    width: 98%;
    display: flex;
    /* border: 1px solid black; */
    border-radius: 5px;
    justify-content: space-evenly;
    align-items: center;
    margin-left: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  .headCart p{
    width: 20%;
    /* border: 1px solid green; */
  }
  .singleCart{
    width: 98%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* border: 1px solid black; */
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    border-radius: 5px;
    margin: 4px;
  }


`