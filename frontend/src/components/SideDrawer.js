import { Link } from 'react-router-dom';
import './SideDrawer.css'
function SideDrawer({ show, click }) {
    const sideDrawerClass = ["sidedrawer"];
    if (show) {
        sideDrawerClass.push("show");
    }
    return (
        <div className={sideDrawerClass.join(" ")}>
            <ul className="sidedrawer__links" onClick={click}>
                <li>
                    <Link to="/cart">
                        <span>
                            <i className="fas fa-shopping-cart"></i>
                        </span>
                        Cart <span className="sidedrawer__cartbadge"> 0</span>
                    </Link>
                </li>
                <li>
                    <Link to="/">Shop</Link>
                </li>
            </ul>
        </div>
    )
}

export default SideDrawer
