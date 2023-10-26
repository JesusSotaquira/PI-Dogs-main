import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaDog } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1em',
            backgroundColor: '#8F8F8F'
        }}>
            <a href="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                Perritos <FaDog style={{ marginLeft: '0.5em' }} />
            </a>
            <span style={{ color: 'white' }}>HUELLAS EN EL CORAZÓN, NO SOLO EN EL SUELO.</span>
            <div style={{ display: 'flex', gap: '1em' }}>
                {location.pathname !== "/" && <a href="/home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>}
                {location.pathname !== "/" && <a href="/create-dog" style={{ color: 'white', textDecoration: 'none' }}>Create Dog</a>}
            </div>
        </div>
    );
}

export default Navbar;
