import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Signup from './Components/Signup/Signup.jsx'
import Signin from './Components/Signin/Signin.jsx'
import Home from './Components/Home/Home.jsx'
import Products from './Components/Products/Products';
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart.jsx';
import UserContextProvider from './Context/UserContext/UserContext.js'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext/CartContext.js';
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList.jsx';
import OnlineCheckoutForm from './Components/OnlineCheckoutForm/OnlineCheckoutForm.jsx';
import NotFound from './Components/NotFound/NotFound';
import CashCheckoutForm from './Components/CashCheckoutForm/CashCheckoutForm.jsx';
import { Provider } from 'react-redux';
import { Store } from './Redux/store.js';
import Brands from './Components/Brands/Brands';
import BrandProducts from './Components/BrandProducts/BrandProducts';
import ForgotenPass from './Components/ForgotenPass/ForgotenPass';
import ResetPass from './Components/ResetPass/ResetPass';
import SetNewPassword from './Components/SetNewPassword/SetNewPassword';
const QueryClientCopy= new QueryClient(); 
const Routers=createHashRouter([{path:"",element:<Layout/>, children:[
  {path:'signup',element:<Signup/>},
  {path:'signin',element:<Signin/>},
  {path:'forgotenPass',element:<ForgotenPass/>},
  {path:'resetPass',element:<ResetPass/>},
  {path:'setNewPass',element:<SetNewPassword/>},
  {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
  // {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:'brandProducts/:brandId',element:<ProtectedRoute><BrandProducts/></ProtectedRoute>},
  {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
  {path:'OnlineCheckout/:cartId',element:<ProtectedRoute><OnlineCheckoutForm/></ProtectedRoute>},
  {path:'CashCheckout/:cartId',element:<ProtectedRoute><CashCheckoutForm/></ProtectedRoute>},
  {path:'*',element:<ProtectedRoute><NotFound/></ProtectedRoute>}
]
} 
]);

function App() {
  return <>
  <CartContextProvider>
  <QueryClientProvider client={QueryClientCopy}>
  <UserContextProvider>
  <Provider store={Store}>
  <RouterProvider router={Routers}>
  </RouterProvider>
  </Provider>
  </UserContextProvider>
  </QueryClientProvider>
  <Toaster/>
  </CartContextProvider>

  </>
}

export default App;
