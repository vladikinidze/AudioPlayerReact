import React from 'react';
import FooterList from "./FooterList";

function Footer({modal}) {
    return (
        <footer className="mt-auto mb-8 ml-6">
            <FooterList modal={modal}/>
        </footer>
    );
}

export default Footer;