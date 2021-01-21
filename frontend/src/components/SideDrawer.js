import './SideDrawer.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
function SideDrawer({ show, click }) {
    const sideDrawerClass = ["sidedrawer"];
    if (show) {
        sideDrawerClass.push("show");
    }

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + item.qty, 0);
    }
    return (
        <div className={sideDrawerClass.join(" ")}>
            <ul className="sidedrawer__links" onClick={click}>
                <li>
                    <Link to="/cart">
                        <span>
                            <i className="fas fa-shopping-cart"></i>
                        </span>
                        Cart <span className="sidedrawer__cartbadge"> {getCartCount()}</span>
                    </Link>
                </li>
                <li>
                    <Link to="/">Shop</Link>
                </li>
                <li>
                    <Link to="/signin">Login</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideDrawer
