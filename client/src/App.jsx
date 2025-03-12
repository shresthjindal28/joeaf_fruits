import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "./redux/slices/UserInfoSlice";
import Loader from "./components/Loader";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const AuthPage = lazy(() => import("./pages/Authentication"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AddNewProduct = lazy(() => import("./pages/AddNewProduct"));
const SingleProduct = lazy(() => import("./pages/SingleProduct"));
const UpdateProduct = lazy(() => import("./pages/UpdateProduct"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

// Layouts
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));
const GuestLayout = lazy(() => import("./layouts/GuestLayout"));

function App() {
  const userInfo = useSelector(selectUserInfo);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!userInfo);
    setAuthChecked(true);
  }, [userInfo]);

  if (!authChecked) return <Loader />;

  // Common routes for all users
  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <AboutPage /> },
    { path: "/contact", element: <ContactPage /> },
    { path: "/allproducts", element: <AllProducts /> },
    { path: "/product/:id", element: <SingleProduct /> },
    { path: "*", element: <ErrorPage /> }
  ];

  // Protected routes
  const protectedRoutes = [
    { path: "/:id/profile", element: <ProfilePage /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/addproduct", element: <AddNewProduct /> },
    { path: "/product/:id/update", element: <UpdateProduct /> }
  ];

  const router = createBrowserRouter([
    {
      element: <GuestLayout />,
      children: [
        ...commonRoutes,
        { path: "/auth", element: <AuthPage /> },
        {
          path: "/",
          element: isAuthenticated ? <AuthLayout /> : <GuestLayout />,
          children: isAuthenticated ? protectedRoutes : []
        }
      ]
    }
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;