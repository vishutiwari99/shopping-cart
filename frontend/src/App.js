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


// Routing
import PrivateRoute from './components/routing/PrivateRoute'
import { useState } from 'react';

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
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />

          <Route exact path="/signin" component={FormScreen} />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordFormScreen}
          />
        </Switch>
      </main>
    </Router>

  );
}

export default App;
