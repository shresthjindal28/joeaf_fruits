import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import AllProducts from "./pages/AllProducts";
import AuthPage from "./pages/Authentication";
import AddNewProduct from "./pages/AddNewProduct";
import SingleProduct from "./pages/SingleProduct";
import UpdateProduct from "./pages/UpdateProduct";
import { selectUserInfo } from "./redux/slices/UserInfoSlice";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import Footar from "./components/Footar";

function App() {
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo])

  return (
    <div className="flex flex-col min-w-screen min-h-screen max-w-screen max-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddNewProduct />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/product/:id/update" element={<UpdateProduct />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/:id/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
