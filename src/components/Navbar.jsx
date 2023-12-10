import { Link } from "react-router-dom"
import styled from 'styled-components';
export const Navbar=()=>{
    return(
        <DIV>
            <Link className="link" to={"/"} style={{paddingRight:"10px"}}>User</Link>
            <Link className="link" to={"/admin"}>Admin</Link>
           
        </DIV>
    )
}
const DIV=styled.div`
    width:"100vw";
   height: 50px;
     background-color: white;
     color:"white";
     display: flex;
     justify-content: center;
     align-items: center;

     .link{
        text-decoration: none;
        color: black;
     }
`