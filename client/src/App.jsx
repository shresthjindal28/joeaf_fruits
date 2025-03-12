import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
import Loader from "./components/Loader";
import Footar from "./components/Footar";
import ErrorPage from "./pages/ErrorPage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/Authentication";
import AllProducts from "./pages/AllProducts";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import AddNewProduct from "./pages/AddNewProduct";
import SingleProduct from "./pages/SingleProduct";
import UpdateProduct from "./pages/UpdateProduct";
import { selectUserInfo } from "./redux/slices/UserInfoSlice";

function App() {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col min-w-screen min-h-screen max-w-screen max-h-screen">
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <Navbar />
        </div>
        <div className="flex flex-col h-full w-full pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/:id/profile" element={<ProfilePage />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/addproduct" element={<AddNewProduct />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/product/:id/update" element={<UpdateProduct />} />
          </Routes>
        </div>
        <Footar />
      </div>
    </>
  )
}

export default App
