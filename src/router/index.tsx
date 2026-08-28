import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import CategoryListing from '../pages/CategoryListing'
import ProductDetail from '../pages/ProductDetail'
import Search from '../pages/Search'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import CheckoutResult from '../pages/CheckoutResult'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/category/:category"
            element={<CategoryListing />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/checkout/:result"
            element={<CheckoutResult />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}