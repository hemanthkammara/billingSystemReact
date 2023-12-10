import { Route, Routes } from "react-router-dom"
import { User } from "../pages/User"
import { Admin } from "../pages/Admin"
import { CheckoutPage } from "../pages/CheckoutPage"

export const MainRoutes=()=>{
return(
    <Routes>
        <Route path="/" element={<User/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/check" element={<CheckoutPage/>}></Route>
    </Routes>
)
}