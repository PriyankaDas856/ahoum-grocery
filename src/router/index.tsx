import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import AppShell from '../components/layout/AppShell'

import Splash from '../pages/Splash'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import CategoryListing from '../pages/CategoryListing'
import ProductDetail from '../pages/ProductDetail'
import Search from '../pages/Search'
import Filters from '../pages/Filters'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import CheckoutResult from '../pages/CheckoutResult'

import Welcome from '../pages/Welcome'
import Auth from '../pages/Auth'
import MobileNumber from '../pages/MobileNumber'
import Otp from '../pages/Otp'
import Location from '../pages/Location'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

import Favourite from '../pages/Favourite'
import Account from '../pages/Account'
import Orders from '../pages/Orders'
import AccountDetails from '../pages/AccountDetails'
import DeliveryAddress from '../pages/DeliveryAddress'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Splash Screen */}
        <Route
          path="/"
          element={<Splash />}
        />

        {/* Onboarding / Authentication */}
        <Route
          path="/welcome"
          element={<Welcome />}
        />

        <Route
          path="/auth"
          element={<Auth />}
        />

        <Route
          path="/auth/phone"
          element={<MobileNumber />}
        />

        <Route
          path="/auth/otp"
          element={<Otp />}
        />

        <Route
          path="/auth/location"
          element={<Location />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Filters */}
        <Route
          path="/filters"
          element={<Filters />}
        />

        {/* Main Application */}
        <Route element={<AppShell />}>
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/explore"
            element={<Explore />}
          />

          <Route
            path="/category/:category"
            element={<CategoryListing />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/favourites"
            element={<Favourite />}
          />

          {/* Account */}
          <Route
            path="/account"
            element={<Account />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/account/details"
            element={<AccountDetails />}
          />

          <Route
            path="/account/address"
            element={<DeliveryAddress />}
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/checkout/:result"
            element={<CheckoutResult />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}