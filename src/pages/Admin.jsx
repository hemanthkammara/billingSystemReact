import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItems, updateCart, updateQuantity } from "../redux/action";
import { getBills, postBills } from "../redux/bills/action";
import styled from "styled-components";

export const Admin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  const items = useSelector((store) => {
    return store.itemReducer.items;
  });
  const cart = useSelector((store) => {
    return store.itemReducer.cart;
  });
  const bills = useSelector((store) => {
    return store.billsReducer.bills;
  });

  const addToStore = () => {
    let item={
        name,price
    }

    dispatch(addItem(item)).then((res)=>{
        alert(("item added successfully"))
    })


  };

  useEffect(() => {
    dispatch(getItems());
    dispatch(getBills());
  }, []);

  return (
    <DIV>
      <div className="addItem">
        {/* <h1>items in store {items.length}</h1> */}
        <h2>add item</h2>

<label htmlFor="">name :-</label>
<br />

        <input
          type="text"
          placeholder="enter "
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <label htmlFor="">price :-</label>
        <br />
        <input
          type="number"
          placeholder="enter"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <button onClick={addToStore}>Add Item</button>
        <h1>items in store {items.length}</h1>
      </div>

      <div className="bills">
        {bills.length > 0 &&
          bills.map((e, i) => {
            return (
              <div key={i} className="singleBill">
                <p>BillNo :{e.billno}</p>
                <p>Total : Rs {e.total} /-</p>
                <p>date : {e.date}</p>
              </div>
            );
          })}
      </div>
    </DIV>
  );
};
const DIV=styled.div`

display: flex;
margin-top: 25px;
justify-content: center;



.addItem{
    width: 20%;
    background-color: white;
    padding:10px;
 height: 280px;
}

.bills{
    width: 40%;
    background-color: white;
    margin-left: 25px;
    height: 600px;
      overflow: hidden;
      overflow-y: auto;
}

button{
    background-color: black;
    border: none;
    color: white;
    width: 30%;
    height: 20px;
    margin: 4px;
    margin-top: 10px;
}

.singleBill{
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  margin: 10px;
  padding: 5px;
  
}
input{
    width: 90%;
    border: none;
    border-bottom: 1px solid black;

}

label{
    margin-left: -70%;
}


`