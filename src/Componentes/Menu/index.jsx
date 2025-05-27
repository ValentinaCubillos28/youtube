import "./style.css"
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Inicio</Link>
          <Link to="/Likes">Likes</Link>
          <Link to="/Usuarios">Usuarios</Link>
          <Link to="/Videos">Videos</Link>
        </nav>
    )
  }
 
  export default Menu