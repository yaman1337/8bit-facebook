import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {

    const returnToHome = () => {
        window.location.assign('/')
    }

    return (
        <nav>
           <div className="logo nes-pointer" onClick={returnToHome}>
           <i class="nes-icon facebook is-medium"></i>
           <span>8bit facebook</span>
           </div>

            <div className="links" style={{marginTop: '20px', fontSize: '2rem'}}>
                <ul>
                    <li><Link to='/'><i class="fas fa-home"></i></Link></li>
                    <li><Link to="/create"><i class="fas fa-user-edit"></i></Link></li>
                    <li><Link to="/friends"><i class="fas fa-users"></i></Link></li>
                </ul>
            </div>

            <div className="dashboard" style={{marginTop: '20px'}}>
                <ul>
                    <li style={{listStyle: 'none'}}>
                    <i class="fas fa-user-circle" style={{fontSize: "2rem"}} ></i>
                       <span style={{ marginLeft: "10px", textAlign:'center' }} >My Profile</span>
                       <span  style={{marginLeft: "10px", fontSize: '2rem', borderLeft: "1px solid black", padding: "5px"}} >
                      <Link to="/login"><i class="fas fa-sign-out-alt"></i></Link>
                       </span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
