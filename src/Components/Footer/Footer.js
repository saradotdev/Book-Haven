import React from 'react'
import "./Footer.css"

function Footer() {
    return (
        <div className='footer-container'>
            <ul className='footer-list'>
                <li><h2>ABOUT</h2></li>
                <li><p>Contact us</p></li>
                <li><p>About us</p></li>
                <li><p>Careers</p></li>
                <li><p>Gift Cards</p></li>
            </ul>
            <ul className='footer-list'>
                <li><h2>HELP</h2></li>
                <li><p>Payments</p></li>
                <li><p>Shipping</p></li>
                <li><p>Cancellation & Returns</p></li>
                <li><p>FAQs</p></li>
            </ul>
            <ul className='footer-list'>
                <li><h2>SOCIALS</h2></li>
                <li>
                    <p>Linkedin</p>
                </li>
                <li>
                    <p>Github</p>
                </li>
                <li>
                    <p>Twitter</p>
                </li>
                <li>
                    <p>Instagram</p>
                </li>
            </ul>
        </div>
    )
}

export { Footer } 