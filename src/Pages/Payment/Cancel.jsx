import React from 'react';
import { useEffect } from "react";
import jwt_decode from "jwt-decode"
import axios from "axios";
import { Link, useLocation } from "react-router-dom"
import { 
    ProductOrderCard,
    useWishlist,
    useCart,
    useOrders
} from "../../index"
import Lottie from 'react-lottie';
import CancelLottie from "../../Assets/Icons/cancel.json"


function Cancel() {
    const { userWishlist, dispatchUserWishlist } = useWishlist()
    const { userCart, dispatchUserCart } = useCart()
    const { userOrders, dispatchUserOrders } = useOrders()
    let cancelObj = {
        loop: true,
        autoplay: true,
        animationData : CancelLottie,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(()=>{
        const token=localStorage.getItem('token')

        if(token)
        {
            const user = jwt_decode(token)
            if(!user)
            {
                localStorage.removeItem('token')
            }
            else
            {
                if(userOrders.length===0)
                {
                    (async function getUpdatedWishlistAndCart()
                    {
                        let updatedUserInfo = await axios.get(
                        "https://bookztron-server.vercel.app/api/user",
                        {
                            headers:
                            {
                            'x-access-token': localStorage.getItem('token'),
                            }
                        })
                        if(updatedUserInfo.data.status==="ok")
                        {
                            dispatchUserOrders({type: "UPDATE_USER_ORDERS",payload: updatedUserInfo.data.user.orders})                   
                            if(userWishlist.length===0)
                            {
                                dispatchUserWishlist({type: "UPDATE_USER_WISHLIST",payload: updatedUserInfo.data.user.wishlist})
                                
                            }
                            if(userCart.length===0)
                            {
                                dispatchUserCart({type: "UPDATE_USER_CART",payload: updatedUserInfo.data.user.cart})
                            }
                        }
                    })()
                }
            }
        }
        else
        {
            dispatchUserOrders({type: "UPDATE_USER_ORDERS",payload: []})
        }   
    },[])

    return (
        <div className="cart-content-container">
            <h2>Payment Cancelled</h2>
            
            <div className="empty-cart-message-container">
                    <Lottie options={cancelObj}
                        height={200}
                        width={200}
                        isStopped={false}
                        isPaused={false}
                    />
                    <h2>Your payment was not completed</h2>
                    <Link to="/shop">
                        <button className=" solid-primary-btn">Go to shop</button>
                    </Link>
            </div>

        </div>
    );
}

export { Cancel };