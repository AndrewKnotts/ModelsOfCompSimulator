import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css'
import logo1 from '../../images/logo1.png';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navbar() {
    return (
        <nav className="nav">
            <img src={logo1} alt="logo" className="img" />
            <h1 className="site-title">
                Models Of Computation Simulator
            </h1>
            <div className="navbar navbar-expand-md">
                <ul className="tabs">
                    <CustomLink to="/">DFA</CustomLink>
                    <CustomLink to="/nfa">NFA</CustomLink>
                    <CustomLink to="/pda">PDA</CustomLink>
                    <CustomLink to="/turing">Turing Machine</CustomLink>
                </ul>
            </div>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

var page = "";
export { page };