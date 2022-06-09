import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header(){
    const [show, setShow] = useState(false)
    const handelShow = () => {
        setShow(!show)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark mb-2 header">
            <div className="container">
                <a className="navbar-brand bold" href="#">uStock</a>
                <button className={(show) ? ("navbar-toggler") : ("navbar-toggler collapsed")} onClick={handelShow} type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={(show) ? ("collapse navbar-collapse show") : ("collapse navbar-collapse")} id="navbarsExample07">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/predict/costume">Costume</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header