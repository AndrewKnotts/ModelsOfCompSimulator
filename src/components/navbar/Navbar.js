import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                Models Of Computation Simulator
            </Link>
            <ul>
                <CustomLink to="/">DFA</CustomLink>
                <CustomLink to="/nfa">NFA</CustomLink>
                <CustomLink to="/pda">PDA</CustomLink>
                <CustomLink to="/turing">Turing Machine</CustomLink>
            </ul>
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