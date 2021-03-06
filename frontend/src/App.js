import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import FormScreen from './screens/FormScreen'
import PaymentScreen from './screens/PaymentScreen'
import ResetPasswordFormScreen from './screens/ResetPasswordFormScreen'


// components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';
import Loading from './components/Loading'
import Category from './components/admin/Category'
import CreateProduct from './components/admin/CreateProduct'

// Routing
import PrivateRoute from './components/routing/PrivateRoute'
import { useState } from 'react';
import ProductDetailsScreen from './screens/ProductDetailsScreen';

import ManageProductScreen from './components/admin/ManageProductScreen';

function App() {
  const [sideToggle, setSideToggle] = useState(false)
  return (

    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Switch>
          <PrivateRoute exact path="/payment" component={PaymentScreen} />
          <Route exact path="/load" component={Loading} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product" component={ProductDetailsScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/signin" component={FormScreen} />
          <Route exact
            path={"/passwordreset/:resetToken"}
            component={ResetPasswordFormScreen}
          />
          <Route exact path="/cate" component={Category} />
          <Route path="/admin/pro/:id" component={CreateProduct} />
          <Route path="/admin/pro" component={CreateProduct} />
          <Route exact path="/m" component={ManageProductScreen} />
        </Switch>
      </main>
    </Router>

  );
}

export default App;
