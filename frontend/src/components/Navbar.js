import './Navbar.css';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/loginActions';


function Navbar({ click }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const cart = useSelector(state => state.cart);
    const islogin = useSelector(state => state.login.isLogin);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + item.qty, 0);
    }

    const logoutHandler = () => {
        dispatch(logoutUser());
        history.push('/signin')

    }

    return (
        <nav className="navbar">
            {/* logo */}
            <div className="navbar__logo">
                <Link to="/">
                    <h2>Shopping Cart</h2>
                </Link>
            </div>
            {/* links */}
            <ul className="navbar__links">
                <li>
                    <Link to="/cart" className="cart__link">
                        <i className="fa fa-shopping-cart"></i>
                        <span>
                            Cart
                        <span className="cartlogo__badge">{getCartCount()}</span>
                        </span>

                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Shop
                    </Link>
                </li>
                <li>
                    {islogin && <h3 onClick={logoutHandler} >Logout</h3>}
                    {!islogin && <Link to="/signin">Login</Link>}

                </li>
            </ul>
            <div className="hamburger__menu" onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}

export default Navbar
