import React from 'react';
import { Link, useLocation } from "react-router-dom"
import Lottie from 'react-lottie';
import SuccessLottie from "../../Assets/Icons/success.json"


function Success() {
    let successObj = {
        loop: true,
        autoplay: true,
        animationData : SuccessLottie,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div className="cart-content-container">
            <h2>Payment Successful</h2>
            
            <div className="empty-cart-message-container">
                    <Lottie options={successObj}
                        height={150}
                        width={150}
                        isStopped={false}
                        isPaused={false}
                    />
                    <h2>Thank you for your purchase</h2>
                    <Link to="/shop">
                        <button className=" solid-primary-btn">Go to shop</button>
                    </Link>
            </div>

        </div>
    );
}

export { Success };