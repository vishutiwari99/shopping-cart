import './SideDrawer.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/loginActions';


function SideDrawer({ show, click }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const islogin = useSelector(state => state.login.isLogin);

    const sideDrawerClass = ["sidedrawer"];
    if (show) {
        sideDrawerClass.push("show");
    }

    const logoutHandler = () => {
        dispatch(logoutUser());
        history.push('/signin')

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
                    {/* {islogin && <Link to="/" onClick={logoutHandler} >Logout</Link>}
                    {!islogin && <Link to="/signin">Login</Link>} */}

                    {islogin ? <Link onClick={logoutHandler} >Logout</Link> : <Link to="/signin">Login</Link>}


                </li>
            </ul>
        </div>
    )
}

export default SideDrawer
