import './Navbar.css';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Navbar({ click }) {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + item.qty, 0);
    }
    return (
        <nav className="navbar">
            {/* logo */}
            <div className="navbar__logo">
                <h2>Shopping Cart</h2>
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
