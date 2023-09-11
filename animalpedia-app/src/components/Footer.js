import React from 'react';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 " style={{ background: "#cebaa3" }}>
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;