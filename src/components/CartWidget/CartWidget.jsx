
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './CartWidget.css'
import { FaMoon, FaSun } from "react-icons/fa";
import { useCart } from '../../hooks/useCart'
import { useThemeContext } from '../../context/ThemeContext'




export default function CartWidget() {

  const {totalItems} = useCart();
  const {isDarkMode,changeTheme} = useThemeContext();
  return (
    <div className='contenedorclaro-carrito'>
      <button onClick={changeTheme}
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        {isDarkMode ? <FaMoon color="#ddd" size={15} /> : <FaSun color="yellow" size={16} />}
      </button>
      <div className='contenedor-cart'>
        <span className="cart-value" >{totalItems}</span>
        <Link to="/cart" >
          <FontAwesomeIcon icon={faCartShopping} className='cart-icon' />
        </Link>
      </div>
    </div>
 
  )
}


