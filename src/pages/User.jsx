import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems, manageCart, updateCart, updateQuantity } from "../redux/action";
import { getBills, postBills } from "../redux/bills/action";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

export const User = () => {

  const [product, setproduct] = useState("item");
  const [list, setList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState({});
  const[total,setTotal]=useState(0)
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const items = useSelector((store) => {
    return store.itemReducer.items;
  });
  const cart = useSelector((store) => {
    return store.itemReducer.cart;
  });
  const bills = useSelector((store) => {
    return store.billsReducer.bills;
  });

  // for selecting product
  const handleProduct = (e) => {
    if (list.includes(e.name)) {
      alert("list alreday contain");
    } else {
      setproduct(e.name);
      setItem(e);
    }
  };

  // product add to cart
  const addToCart = () => {
    let obj = {
      id: item.id,
      name: product,
      quantity,
      price: item.price,
      total: item.price * quantity,
    };

    

    if (product == "item") {
      alert("select a item");
    } else {
      if (list.includes(product)) {
        alert("list alreday contain");
      } else {
        dispatch(updateCart(obj));
        setproduct("item");
        setQuantity(1)
      }
    }
  };

  // handle quantity in cart increase and decrease

  //increase

  const handleInc = (item) => {
    let arr = cart.map((e, i) => {
      if (item.id == e.id) {
        e.quantity++;
        e.total = e.quantity * e.price;
        return e;
      } else {
        return e;
      }
    });
    dispatch(updateQuantity(arr));
  };

  //decrease
  const handleDec = (item) => {
    let arr = cart.map((e, i) => {
      if (item.id == e.id) {
        e.quantity--;
        e.total = e.quantity * e.price;
        return e;
      } else {
        return e;
      }
    });
    dispatch(updateQuantity(arr));
  };

  // buying products in the cart

  const handleCheckout=()=>{

console.log(cart.length)
    if(cart.length==0){
    return alert("add item to cart")
    }

    let total=0;
    cart.forEach((e,i)=>{
      total+=e.total
    })
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // Note: getMonth() returns a zero-based index, so we add 1 to get the actual month
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;

    let bill={
      total,
      billno:`BILL000${bills.length+1}`,
      date:formattedDate
    }

    console.log(bill)
 dispatch(postBills(bill)).then((res)=>{
   dispatch(manageCart(cart))
    navigate("/check")
 })



  }

  // initial storing of cart data
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

  console.log(items, "items from user");
  console.log(bills, "bills ");

  return (
    <DIV>
      <div className="container">

     
      <div className="items" >
       
   
        {items.length > 0 &&
          items.map((e, i) => {
            return (
              <button
                key={i}
                style={{backgroundColor:list.includes(e.name)==true?"#68D391":"green"}}
                disabled={list.includes(e.name)}
                onClick={() => {
                  handleProduct(e);
                }}
              >
                {e.name}
              </button>
            );
          })}
      
      </div>

      <div className="addItem">
        <p> select a item </p>

        <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",marginBottom:"10px"}}>
        
        <h2>{product}</h2>
        <h3>Rs {item.price}/-</h3>
          
        </div>
        <input
          type="number"
          placeholder="quantity"
          className="quantity"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
       
        <button onClick={addToCart} className="add">Add to cart</button>
      </div>

      </div>

      <div className="cart" style={{ width: "40%"}}>
        <h1>cart List</h1>
        <div className="headCart">
          <p>Item Name</p>
          <p>Unit Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <div className="cartStore">
<p>{cart.length===0?"...cart is Empty":""}</p>
      
        {cart.length > 0 &&
          cart.map((e, i) => {
            return (
              <div key={i} className="singleCart">
                
                <p>{e.name}</p>
              
                <p>Rs {e.price}/-</p>
                <div style={{ display: "flex" }}>
                  <button
                    disabled={e.quantity == 1}
                    onClick={() => {
                      handleDec(e);
                    }}
                  >
                    -
                  </button>
               
                  <button>{e.quantity}</button>
                  <button
                    onClick={() => {
                      handleInc(e);
                    }}
                  >
                    +
                  </button>
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
        <button onClick={handleCheckout} className="check">check out</button>

      </div>
      </div>
    </DIV>
  );
};

const DIV=styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  margin-top: 40px;
  margin-left: 40px;
  .items{
    width: 100%;
    height: 270px;
    overflow: hidden;
      overflow-y: auto;
    /* border: 1px solid black; */
    background-color: white;
    border-radius: 10px;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 3px;
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  
  }

  .items button{
    /* background-color: green; */
    border-radius: 3px;
    height: 135px;
  }
  
  .addItem{
    width: 100%;
    padding: 0%;
    position: relative;
    background-color: white;
    height: 140px;
    top: 10px;
    /* border: 1px solid black; */
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
  }
  .addItem h1,h2,h3,input{
    padding: 0%;
    margin: 0%;
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

  .cartStore{
    height: 200px;
      overflow: hidden;
      overflow-y: auto;
     
  }

 .check{
    background-color: black;
    color:white;
    border: none;
    width: 100px;
    height: 25px;
  }
  
 .add{
    background-color: black;
    color:white;
    border: none;
    width: 90px;
    height: 25px;
    margin-left: 10px;
  }

  .divTotal{
    padding: 10px;
  }
  .container{
    width: 40%;
   // background-color: white;
    display: flex;
    flex-direction: column;
  }
  
  .quantity{
    border: none;
    border-bottom: 1px solid black;
  }

`
