import React, { useState } from "react";
import "../css/header.css"


function Header(){
    const [show, setShow] = useState(false)
    const handelShow = () => {
        setShow(!show)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">uStock</a>
                <button className={(show) ? ("navbar-toggler") : ("navbar-toggler collapsed")} onClick={handelShow} type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={(show) ? ("collapse navbar-collapse show") : ("collapse navbar-collapse")} id="navbarsExample07">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header